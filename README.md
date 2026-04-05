# EYESAP TECHNOLOGY - Website

A modern, full-stack website for **EYESAP TECHNOLOGY**, an IT consulting company specializing in SAP Implementation, SAP Staffing & Resourcing, and SAP Training.

---

## Tech Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Frontend | React 19, Tailwind CSS, Shadcn UI, Framer Motion |
| Backend  | FastAPI (Python 3.11+)                          |
| Database | MongoDB                                         |
| Auth     | JWT + bcrypt (httpOnly cookies)                 |

---

## Features

- **Marketing Pages** — Home (parallax hero), About Us, SAP Implementation, SAP Staffing, SAP Training, Careers, Privacy Policy, Terms & Conditions
- **Blog CMS** — Full CRUD with admin panel, publish/draft toggle, tags, cover images
- **Contact Form** — Saves submissions to MongoDB, viewable in admin dashboard
- **Admin Dashboard** — Manage blog posts & contact submissions behind JWT auth
- **Responsive Design** — Mobile-first with glass-morphism navbar, animated sections

---

## Project Structure

```
/app
├── backend/
│   ├── server.py            # FastAPI application (auth, blogs, contacts APIs)
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Backend environment variables
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js           # Routes & layout
│   │   ├── index.js         # Entry point
│   │   ├── index.css        # Global styles & Tailwind
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── ui/          # Shadcn UI components
│   │   └── pages/
│   │       ├── HomePage.js
│   │       ├── AboutPage.js
│   │       ├── SAPImplementationPage.js
│   │       ├── SAPStaffingPage.js
│   │       ├── SAPTrainingPage.js
│   │       ├── BlogsPage.js
│   │       ├── BlogDetailPage.js
│   │       ├── ContactPage.js
│   │       ├── CareersPage.js
│   │       ├── PrivacyPolicyPage.js
│   │       ├── TermsPage.js
│   │       ├── AdminLoginPage.js
│   │       └── AdminDashboardPage.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env                 # Frontend environment variables
└── README.md
```

---

## Local Development Setup

### Prerequisites

- **Node.js** >= 18 & **Yarn** >= 1.22
- **Python** >= 3.11
- **MongoDB** running locally on `mongodb://localhost:27017`

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd app
```

### 2. Backend setup

```bash
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate   # Linux/Mac
# venv\Scripts\activate    # Windows

# Install dependencies
pip install -r requirements.txt
```

Create **`backend/.env`**:

```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="eyesap_db"
CORS_ORIGINS="*"
JWT_SECRET="<generate-a-random-64-char-hex-string>"
ADMIN_EMAIL="admin@eyesap.com"
ADMIN_PASSWORD="EyesapAdmin@123"
FRONTEND_URL="http://localhost:3000"
```

> **Tip:** Generate a JWT secret with `python -c "import secrets; print(secrets.token_hex(32))"`

Start the backend:

```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The API is now available at `http://localhost:8001`. On first start the admin user and sample blog posts are automatically seeded.

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
yarn install
```

Create **`frontend/.env`**:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Start the frontend:

```bash
yarn start
```

The site is now available at `http://localhost:3000`.

### 4. Verify

| Check           | URL / Command                                      |
| --------------- | -------------------------------------------------- |
| API health      | `curl http://localhost:8001/api/`                   |
| Admin login     | `POST http://localhost:8001/api/auth/login` with `{"email":"admin@eyesap.com","password":"EyesapAdmin@123"}` |
| Frontend        | Open `http://localhost:3000` in a browser           |
| Admin dashboard | Navigate to `http://localhost:3000/admin/login`     |

---

## Production Deployment

### Option A — Docker (Recommended)

#### docker-compose.yml

```yaml
version: "3.9"
services:
  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    ports:
      - "8001:8001"
    env_file: ./backend/.env
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    env_file: ./frontend/.env
    depends_on:
      - backend

volumes:
  mongo_data:
```

#### backend/Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

#### frontend/Dockerfile

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

#### frontend/nginx.conf

```nginx
server {
    listen 3000;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Run:

```bash
docker-compose up -d --build
```

### Option B — Manual / VPS

1. **MongoDB** — Use a managed service (MongoDB Atlas) or self-host.
2. **Backend** — Deploy with `gunicorn` + `uvicorn` workers behind Nginx:
   ```bash
   gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8001
   ```
3. **Frontend** — Build static assets and serve via Nginx:
   ```bash
   cd frontend && yarn build
   # Copy build/ to your web server root
   ```
4. **Nginx** — Reverse proxy `/api/` to the backend, serve frontend for everything else. Use the `nginx.conf` above as reference.

### Option C — Cloud Platforms

| Platform       | Backend                              | Frontend                        |
| -------------- | ------------------------------------ | ------------------------------- |
| Railway        | Deploy `backend/` as a Python service | Deploy `frontend/` as static    |
| Render         | Web Service (Python)                 | Static Site                     |
| AWS            | ECS / App Runner                     | S3 + CloudFront                 |
| Vercel         | —                                    | Import `frontend/`, set env var |
| DigitalOcean   | App Platform (Python)                | App Platform (Static)           |

> In all cases, set the correct `REACT_APP_BACKEND_URL` in the frontend build and `FRONTEND_URL` in the backend `.env` for CORS.

---

## Environment Variables Reference

### Backend (`backend/.env`)

| Variable        | Description                          | Required |
| --------------- | ------------------------------------ | -------- |
| `MONGO_URL`     | MongoDB connection string            | Yes      |
| `DB_NAME`       | Database name                        | Yes      |
| `JWT_SECRET`    | Secret for signing JWT tokens        | Yes      |
| `ADMIN_EMAIL`   | Seeded admin account email           | Yes      |
| `ADMIN_PASSWORD`| Seeded admin account password        | Yes      |
| `FRONTEND_URL`  | Frontend origin URL (for CORS)       | Yes      |
| `CORS_ORIGINS`  | Additional CORS origins (comma-sep)  | No       |

### Frontend (`frontend/.env`)

| Variable                   | Description             | Required |
| -------------------------- | ----------------------- | -------- |
| `REACT_APP_BACKEND_URL`   | Backend API base URL    | Yes      |

---

## API Endpoints

### Public

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| GET    | `/api/`               | Health check             |
| GET    | `/api/blogs`          | List published blogs     |
| GET    | `/api/blogs/:id`      | Single blog detail       |
| POST   | `/api/contact`        | Submit contact form      |

### Auth

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/auth/login`     | Admin login              |
| POST   | `/api/auth/logout`    | Logout (clears cookies)  |
| GET    | `/api/auth/me`        | Current user info        |
| POST   | `/api/auth/refresh`   | Refresh access token     |

### Admin (requires auth)

| Method | Endpoint                    | Description                  |
| ------ | --------------------------- | ---------------------------- |
| GET    | `/api/blogs?published_only=false` | List all blogs (inc. drafts) |
| POST   | `/api/blogs`                | Create blog post             |
| PUT    | `/api/blogs/:id`            | Update blog post             |
| DELETE | `/api/blogs/:id`            | Delete blog post             |
| GET    | `/api/contacts`             | List contact submissions     |
| PUT    | `/api/contacts/:id/read`    | Mark contact as read         |
| DELETE | `/api/contacts/:id`         | Delete contact submission    |

---

## Default Admin Credentials

| Field    | Value               |
| -------- | ------------------- |
| Email    | admin@eyesap.com    |
| Password | EyesapAdmin@123     |

> Change these in `backend/.env` before deploying to production.

---

## License

Proprietary — EYESAP Technology. All rights reserved.
