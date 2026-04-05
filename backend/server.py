from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
import bcrypt
import jwt
import secrets
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone, timedelta

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Password Hashing ---
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

# --- JWT ---
def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(minutes=60), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

# --- Auth Helper ---
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# --- Pydantic Models ---
class LoginRequest(BaseModel):
    email: str
    password: str

class BlogCreate(BaseModel):
    title: str
    excerpt: str = ""
    content: str
    cover_image: str = ""
    tags: List[str] = []
    published: bool = True

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    subject: str = ""
    message: str

# --- Auth Endpoints ---
@api_router.post("/auth/login")
async def login(request: Request, response: Response, body: LoginRequest):
    email = body.email.lower().strip()
    password = body.password
    # Brute force check
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier}, {"_id": 0})
    if attempt and attempt.get("count", 0) >= 5:
        lockout_until = attempt.get("locked_until")
        if lockout_until and datetime.now(timezone.utc) < lockout_until:
            raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")
        else:
            await db.login_attempts.delete_one({"identifier": identifier})

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"locked_until": datetime.now(timezone.utc) + timedelta(minutes=15)}},
            upsert=True
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_one({"identifier": identifier})
    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=3600, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    return {"id": user_id, "email": user["email"], "name": user.get("name", ""), "role": user.get("role", "user"), "token": access_token}

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out"}

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return user

@api_router.post("/auth/refresh")
async def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        access_token = create_access_token(str(user["_id"]), user["email"])
        response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=3600, path="/")
        return {"message": "Token refreshed", "token": access_token}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

# --- Blog Endpoints ---
@api_router.get("/blogs")
async def get_blogs(published_only: bool = True):
    query = {"published": True} if published_only else {}
    blogs = await db.blogs.find(query).sort("created_at", -1).to_list(100)
    for blog in blogs:
        blog["id"] = str(blog["_id"])
        del blog["_id"]
    return blogs

@api_router.get("/blogs/{blog_id}")
async def get_blog(blog_id: str):
    try:
        blog = await db.blogs.find_one({"_id": ObjectId(blog_id)})
    except Exception:
        raise HTTPException(status_code=404, detail="Blog not found")
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    blog["id"] = str(blog["_id"])
    del blog["_id"]
    return blog

@api_router.post("/blogs")
async def create_blog(body: BlogCreate, request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    doc = body.model_dump()
    doc["author"] = user.get("name", user["email"])
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.blogs.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id", None)
    return doc

@api_router.put("/blogs/{blog_id}")
async def update_blog(blog_id: str, body: BlogUpdate, request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    update_data = {k: v for k, v in body.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    try:
        result = await db.blogs.update_one({"_id": ObjectId(blog_id)}, {"$set": update_data})
    except Exception:
        raise HTTPException(status_code=404, detail="Blog not found")
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    blog = await db.blogs.find_one({"_id": ObjectId(blog_id)})
    blog["id"] = str(blog["_id"])
    del blog["_id"]
    return blog

@api_router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str, request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    try:
        result = await db.blogs.delete_one({"_id": ObjectId(blog_id)})
    except Exception:
        raise HTTPException(status_code=404, detail="Blog not found")
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"message": "Blog deleted"}

# --- Contact Endpoints ---
@api_router.post("/contact")
async def create_contact(body: ContactCreate):
    doc = body.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["read"] = False
    result = await db.contacts.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id", None)
    return {"message": "Thank you for contacting us! We'll get back to you soon.", "id": doc["id"]}

@api_router.get("/contacts")
async def get_contacts(request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
    for c in contacts:
        c["id"] = str(c["_id"])
        del c["_id"]
    return contacts

@api_router.put("/contacts/{contact_id}/read")
async def mark_contact_read(contact_id: str, request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    await db.contacts.update_one({"_id": ObjectId(contact_id)}, {"$set": {"read": True}})
    return {"message": "Marked as read"}

@api_router.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: str, request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    await db.contacts.delete_one({"_id": ObjectId(contact_id)})
    return {"message": "Deleted"}

# --- Health ---
@api_router.get("/")
async def root():
    return {"message": "EYESAP TECHNOLOGY API"}

# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@eyesap.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "EyesapAdmin@123")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({"email": admin_email, "password_hash": hashed, "name": "Admin", "role": "admin", "created_at": datetime.now(timezone.utc).isoformat()})
        logger.info(f"Admin user seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Admin password updated")
    # Seed sample blogs
    blog_count = await db.blogs.count_documents({})
    if blog_count == 0:
        sample_blogs = [
            {
                "title": "Why SAP S/4HANA is the Future of Enterprise Resource Planning",
                "excerpt": "Discover how SAP S/4HANA is transforming businesses with real-time analytics, simplified data models, and intelligent automation.",
                "content": "<h2>The Evolution of ERP</h2><p>Enterprise Resource Planning has come a long way from its origins. SAP S/4HANA represents the next generation of ERP, built on an in-memory database that processes transactions and analytics simultaneously.</p><h2>Key Benefits</h2><p><strong>Real-time Analytics:</strong> With HANA's in-memory computing, businesses get instant insights without batch processing delays.</p><p><strong>Simplified Data Model:</strong> S/4HANA eliminates redundant tables and aggregate tables, reducing data footprint by up to 10x.</p><p><strong>Intelligent Automation:</strong> Built-in AI and machine learning capabilities automate routine tasks, from invoice matching to demand forecasting.</p><h2>Implementation Approach</h2><p>At EYESAP Technology, we follow a proven methodology for S/4HANA implementations, ensuring smooth transitions with minimal business disruption. Our certified consultants bring deep industry expertise to every project.</p>",
                "cover_image": "https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBkYXRhJTIwbmV0d29ya3xlbnwwfHx8fDE3NzUzNzUyNzJ8MA&ixlib=rb-4.1.0&q=85",
                "tags": ["SAP", "S/4HANA", "ERP", "Digital Transformation"],
                "published": True,
                "author": "Admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "title": "Building a Strong SAP Team: The Key to Successful Implementations",
                "excerpt": "Learn why having the right SAP talent is crucial for project success and how staffing solutions can bridge the skills gap.",
                "content": "<h2>The SAP Talent Challenge</h2><p>Finding qualified SAP professionals is one of the biggest challenges organizations face during digital transformation projects. The demand for skilled SAP consultants far exceeds the available supply.</p><h2>Strategic Staffing Solutions</h2><p><strong>Contract Staffing:</strong> Engage experienced SAP consultants for specific project phases without long-term commitments.</p><p><strong>Permanent Placement:</strong> Build your core SAP team with top-tier talent through our extensive network of professionals.</p><p><strong>Team Augmentation:</strong> Scale your existing team quickly with pre-vetted consultants who can hit the ground running.</p><h2>Our Approach</h2><p>EYESAP Technology maintains a curated pool of SAP professionals across all modules. Our rigorous screening process ensures you get consultants who not only have the technical skills but also the industry experience to drive results.</p>",
                "cover_image": "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDB8fHx8MTc3NTM3NTI2MXww&ixlib=rb-4.1.0&q=85",
                "tags": ["SAP Staffing", "IT Recruitment", "Team Building"],
                "published": True,
                "author": "Admin",
                "created_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat(),
                "updated_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat()
            },
            {
                "title": "Accelerate Your Career with SAP Training Programs",
                "excerpt": "Explore how structured SAP training can fast-track your IT career and open doors to lucrative opportunities worldwide.",
                "content": "<h2>Why SAP Training Matters</h2><p>SAP skills are among the most sought-after in the IT industry. Organizations worldwide rely on SAP systems, creating a constant demand for trained professionals.</p><h2>Our Training Programs</h2><p><strong>SAP FICO:</strong> Master Financial Accounting and Controlling, the backbone of any SAP implementation.</p><p><strong>SAP MM/SD:</strong> Learn Materials Management and Sales & Distribution for end-to-end supply chain expertise.</p><p><strong>SAP ABAP:</strong> Develop programming skills for SAP customization and enhancement.</p><p><strong>SAP Basis:</strong> Gain system administration skills for SAP landscape management.</p><h2>Hands-on Learning</h2><p>Our training methodology emphasizes practical, hands-on experience with real-world scenarios. Students work on live SAP systems, preparing them for immediate productivity in professional environments.</p>",
                "cover_image": "https://images.pexels.com/photos/1970801/pexels-photo-1970801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "tags": ["SAP Training", "Career Development", "IT Education"],
                "published": True,
                "author": "Admin",
                "created_at": (datetime.now(timezone.utc) - timedelta(days=7)).isoformat(),
                "updated_at": (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
            }
        ]
        await db.blogs.insert_many(sample_blogs)
        logger.info("Sample blogs seeded")

    # Write test credentials
    os.makedirs("/app/memory", exist_ok=True)
    with open("/app/memory/test_credentials.md", "w") as f:
        f.write(f"# Test Credentials\n\n## Admin\n- Email: {admin_email}\n- Password: {admin_password}\n- Role: admin\n\n## Auth Endpoints\n- POST /api/auth/login\n- POST /api/auth/logout\n- GET /api/auth/me\n- POST /api/auth/refresh\n")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
