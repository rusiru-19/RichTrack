# **Richtracker**

**Richtracker** is a platform built to track students' extracurricular activities, store personal data, and analyze their achievements across clubs and the school. It allows students, teachers, and administrators to manage and view student data, activities, and accomplishments.

## **Tech Stack**

- **Frontend**: Next.js (TypeScript)
- **Backend**: Next.js API Routes (JavaScript)
- **Database**: NeonDB (PostgreSQL)
- **CSS**: Tailwind CSS

## **Features**

- **Tracking Students' Extracurricular Activities**: Allows students to record and track their extracurricular activities.
- **Student Personal Data Storage**: Stores student personal details for easy access and management.
- **Analysis of Student Achievements**: Administrators can analyze achievements by club or by school.
- **Club Management**: Students can join clubs, and teachers/admins can manage and track club-related activities.
- **Role-Based Access Control**: Three user roles:
  - **Admin**: Full control over data, user management, and student achievements.
  - **Teacher**: Can manage student activities and achievements within their assigned clubs.
  - **Student**: Can view and update their own extracurricular activities and achievements.

## **Demo**

You can explore the live demo of the project here:  
[Richtracker Demo](https://rich-track-git-main-evildevs-projects.vercel.app/)

### **Login Details for Demo**

- **Admin Login**:
  - Username: `admin`
  - Password: `admin123`

# Database Schema

The following tables are part of the database:

| Schema  | Name              | Type   | Owner       |
|---------|-------------------|--------|-------------|
| public  | achievements       | table  | rits-db_owner |
| public  | activities         | table  | rits-db_owner |
| public  | club_memberships   | table  | rits-db_owner |
| public  | clubs              | table  | rits-db_owner |
| public  | students           | table  | rits-db_owner |
| public  | teachers           | table  | rits-db_owner |
| public  | users              | table  | rits-db_owner |

## Security

### JWT Authentication for Session Management

In this project, **JSON Web Tokens (JWT)** are used for secure session management, enabling authentication for users. JWT provides a compact and self-contained way to securely transmit information between parties.

#### How JWT is used in Richtracker:

1. **Login Process:**
   - Users log in using their credentials (username and password).
   - Upon successful login, the server generates a JWT containing user-specific data and returns it to the frontend.
   - The JWT is then stored on the client-side (in `localStorage` ).

2. **Session Management:**
   - Each time the user interacts with the backend, the JWT is sent in the `Authorization` header of HTTP requests (as a Bearer token).
   - The backend verifies the JWT to authenticate the user and ensure the request is coming from a valid session.





