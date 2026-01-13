# 📘 Course Scheme Management System

A web-based application to manage and view academic course schemes based on **branch**, **semester**, and **user role** (Student, Faculty, Administrator).


## Project Overview

The **Course Scheme Management System** simplifies the management and access of academic course structures in an institution.

- **Students** can view courses relevant to their branch and semester.
- **Faculty** can view all courses of their assigned branch.
- **Administrators** can manage the entire course scheme.

Role-based access ensures proper data visibility and security.


## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Vanilla JS)

### Backend
- Node.js
- Express.js

### Database
- MySQL


## User Roles & Features

### Student
- Login using credentials
- View courses **only for their branch and semester**
- Read-only access

### Faculty
- Login using credentials
- View **all courses of their branch**
- Semester-independent access
- Read-only access

### Administrator
- Full access to the system
- Add new courses
- Delete existing courses
- View courses of all branches and semesters

## Database Design

### Users Table

| Column    | Description |
|----------|-------------|
| id       | Primary Key |
| username | User login name |
| password | User password |
| role     | student / faculty / admin |
| branch   | User branch |
| semester | User semester (students only) |

---

### Courses Table

| Column       | Description |
|-------------|------------|
| id          | Primary Key |
| course_code | Course code |
| course_name | Course name |
| L           | Lecture hours |
| T           | Tutorial hours |
| P           | Practical hours |
| credits     | Course credits |
| branch      | Branch |
| semester    | Semester |

---

## Application Flow

1. User logs in using credentials
2. Backend validates user role and details
3. User information is stored in `localStorage`
4. User is redirected based on role
5. Courses are fetched from backend
6. Data visibility is controlled by role, branch, and semester

## Backend API Routes

### Authentication
- `POST /api/auth/login` – Login user
- `POST /api/auth/register` – Register new user

### Courses
- `GET /api/courses` – Fetch courses (role-based filtering)
- `POST /api/courses` – Add new course (Admin only)
- `DELETE /api/courses/:id` – Delete course (Admin only)


## How to Run the Project Locally

### 1 Setup Database
- Start MySQL
- Create a database (e.g., `course_scheme`)
- Create `users` and `courses` tables
- Update credentials in `backend/db.js`

---

### 2 Start Backend Server

```bash
cd backend
npm install
node server.js

### 3 Run Frontend

Open frontend/index.html in a browser
OR

Use Live Server extension in VS Code