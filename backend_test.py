import requests
import sys
import json
from datetime import datetime

class EyesapAPITester:
    def __init__(self, base_url="https://eyesap-consulting.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.session = requests.Session()

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=test_headers)
            elif method == 'POST':
                response = self.session.post(url, json=data, headers=test_headers)
            elif method == 'PUT':
                response = self.session.put(url, json=data, headers=test_headers)
            elif method == 'DELETE':
                response = self.session.delete(url, headers=test_headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.text and response.status_code < 500 else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test API health check"""
        success, response = self.run_test(
            "API Health Check",
            "GET",
            "api/",
            200
        )
        return success

    def test_admin_login(self):
        """Test admin login and get token"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/auth/login",
            200,
            data={"email": "admin@eyesap.com", "password": "EyesapAdmin@123"}
        )
        if success and 'token' in response:
            self.token = response['token']
            print(f"   Token obtained: {self.token[:20]}...")
            return True
        return False

    def test_get_me(self):
        """Test get current user"""
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "api/auth/me",
            200
        )
        return success and response.get('role') == 'admin'

    def test_get_blogs(self):
        """Test get all blogs"""
        success, response = self.run_test(
            "Get All Blogs",
            "GET",
            "api/blogs",
            200
        )
        if success:
            print(f"   Found {len(response)} blogs")
        return success

    def test_create_blog(self):
        """Test create a new blog"""
        blog_data = {
            "title": f"Test Blog {datetime.now().strftime('%H%M%S')}",
            "excerpt": "This is a test blog excerpt",
            "content": "<h2>Test Content</h2><p>This is test content for the blog post.</p>",
            "cover_image": "https://images.unsplash.com/photo-1644325349124-d1756b79dd42",
            "tags": ["Test", "API"],
            "published": True
        }
        
        success, response = self.run_test(
            "Create Blog Post",
            "POST",
            "api/blogs",
            200,
            data=blog_data
        )
        
        if success and 'id' in response:
            self.created_blog_id = response['id']
            return True
        return False

    def test_get_single_blog(self):
        """Test get single blog by ID"""
        if not hasattr(self, 'created_blog_id'):
            print("❌ No blog ID available for testing")
            return False
            
        success, response = self.run_test(
            "Get Single Blog",
            "GET",
            f"api/blogs/{self.created_blog_id}",
            200
        )
        return success

    def test_update_blog(self):
        """Test update blog"""
        if not hasattr(self, 'created_blog_id'):
            print("❌ No blog ID available for testing")
            return False
            
        update_data = {
            "title": "Updated Test Blog",
            "excerpt": "Updated excerpt"
        }
        
        success, response = self.run_test(
            "Update Blog Post",
            "PUT",
            f"api/blogs/{self.created_blog_id}",
            200,
            data=update_data
        )
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+91-9876543210",
            "subject": "Test Contact",
            "message": "This is a test contact message"
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=contact_data
        )
        
        if success and 'id' in response:
            self.created_contact_id = response['id']
            return True
        return False

    def test_get_contacts(self):
        """Test get all contacts (admin only)"""
        success, response = self.run_test(
            "Get All Contacts",
            "GET",
            "api/contacts",
            200
        )
        if success:
            print(f"   Found {len(response)} contacts")
        return success

    def test_mark_contact_read(self):
        """Test mark contact as read"""
        if not hasattr(self, 'created_contact_id'):
            print("❌ No contact ID available for testing")
            return False
            
        success, response = self.run_test(
            "Mark Contact as Read",
            "PUT",
            f"api/contacts/{self.created_contact_id}/read",
            200
        )
        return success

    def test_delete_blog(self):
        """Test delete blog"""
        if not hasattr(self, 'created_blog_id'):
            print("❌ No blog ID available for testing")
            return False
            
        success, response = self.run_test(
            "Delete Blog Post",
            "DELETE",
            f"api/blogs/{self.created_blog_id}",
            200
        )
        return success

    def test_delete_contact(self):
        """Test delete contact"""
        if not hasattr(self, 'created_contact_id'):
            print("❌ No contact ID available for testing")
            return False
            
        success, response = self.run_test(
            "Delete Contact",
            "DELETE",
            f"api/contacts/{self.created_contact_id}",
            200
        )
        return success

    def test_logout(self):
        """Test logout"""
        success, response = self.run_test(
            "Admin Logout",
            "POST",
            "api/auth/logout",
            200
        )
        if success:
            self.token = None
        return success

def main():
    print("🚀 Starting EYESAP Technology API Tests")
    print("=" * 50)
    
    tester = EyesapAPITester()
    
    # Test sequence
    tests = [
        ("API Health Check", tester.test_health_check),
        ("Admin Login", tester.test_admin_login),
        ("Get Current User", tester.test_get_me),
        ("Get All Blogs", tester.test_get_blogs),
        ("Create Blog Post", tester.test_create_blog),
        ("Get Single Blog", tester.test_get_single_blog),
        ("Update Blog Post", tester.test_update_blog),
        ("Contact Form Submission", tester.test_contact_submission),
        ("Get All Contacts", tester.test_get_contacts),
        ("Mark Contact as Read", tester.test_mark_contact_read),
        ("Delete Blog Post", tester.test_delete_blog),
        ("Delete Contact", tester.test_delete_contact),
        ("Admin Logout", tester.test_logout),
    ]
    
    failed_tests = []
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            if not result:
                failed_tests.append(test_name)
        except Exception as e:
            print(f"❌ {test_name} - Exception: {str(e)}")
            failed_tests.append(test_name)
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if failed_tests:
        print(f"\n❌ Failed Tests:")
        for test in failed_tests:
            print(f"   - {test}")
    else:
        print("\n✅ All tests passed!")
    
    print("=" * 50)
    return 0 if len(failed_tests) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())