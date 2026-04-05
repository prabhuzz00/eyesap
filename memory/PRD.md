# EYESAP TECHNOLOGY - PRD

## Problem Statement
Build a website for EYESAP TECHNOLOGY - IT company specializing in SAP Implementation, SAP Staffing and Training. Modern white + #1ab69e theme, parallax animations, blog CMS, admin panel, contact form.

## Architecture
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Frontend**: React + Tailwind CSS + Shadcn UI + Framer Motion
- **Auth**: JWT + bcrypt + httpOnly cookies
- **Database**: MongoDB (collections: users, blogs, contacts, login_attempts)

## User Personas
1. **Visitors** - Potential clients exploring SAP services
2. **Job Seekers** - Professionals looking for SAP training/career info
3. **Admin** - Content manager for blogs and contact submissions

## Core Requirements
- 5 main navigation tabs: Home, Services (dropdown), About, Blogs, Contact
- SAP Implementation, Staffing & Resourcing, Training detail pages
- Blog CMS with full CRUD (admin-protected)
- Working contact form saving to MongoDB
- Admin login + dashboard
- Parallax hero, animated sections, modern UI

## What's Been Implemented (Dec 2025)
- Full backend API with auth, blog CRUD, contact management
- All frontend pages: Home, About, SAP Implementation, SAP Staffing, SAP Training, Blogs, Blog Detail, Contact, Admin Login, Admin Dashboard
- JWT auth with admin seeding
- 3 sample blog posts seeded
- Glass-morphism navbar, parallax hero, animated sections
- Responsive design with mobile menu
- All tests passing (100% backend, 95% frontend)

## Backlog
### P0
- Email notification for contact form submissions (user requested but needs SMTP config)

### P1
- Rich text editor for blog content (currently HTML input)
- Image upload for blog covers
- SEO meta tags per page

### P2
- Client testimonials section
- Partner logos marquee
- Blog search & tag filtering
- Analytics dashboard
