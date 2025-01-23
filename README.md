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
- **Schedule**: Admin/Teachers can mark dates on calender(time+date of practices) and teachers can mark the attendance of that particular event
-**Notifications**: Students get live notifcations to their dashboard when a teacher set a new event. Notifications will only received to the club members of that particular event.
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

- **student Login**:
  - Username: `rusiru`
  - Password: `admin123`
- **Teacher Login**:
  - Username: `achini`
  - Password: `admin123`

# ***About the Project***
### Task
Bob, a talented developer, has been entrusted with an exciting project for his school. His task is to design and implement a comprehensive student tracking system for the school administration. Bob envisions a system that not only keeps a detailed record of each student's personal information but also highlights their extracurricular activities and achievements, providing a hulistic view of every student's journey. He wants the system to be intuitive, efficient, and user-friendly, empowering both students and staff.

Bob has reached out to you for help, giving you the creative freedom to design a robust system that fulfills these requirements and includes any additional features you believe would enhance its functionality. This is an opportunity to build something impactful for the school community, making the lives of students, teachers, and administrators easier.

### Admin portal
The **Admin Portal** is the dedicated platform for website administrators, offering comprehensive management capabilities for users and dynamic site content. Designed for scalability and seamless integration with the backend, the portal ensures efficient operation and growth.

#### Key Features

##### 1. User Management
- Add new users with unique credentials.
- Update passwords securely for existing users.
- Remove inactive or unauthorized users with ease.

##### 2. Content Management
- Add and manage clubs dynamically to maintain an updated list of opportunities.
- Create and assign achievements to recognize accomplishments.

##### 3. Dynamic Integration
- The portal leverages a robust backend, ensuring real-time updates and effortless scalability.

##### 4. User Insights
- Access detailed personal information for each user, including:
  - Basic personal details.
  - Associated clubs and memberships.
  - Achievements and milestones.

##### 5. Event Managment
- Create and manage events for clubs and activities.
 - Can mark the attendance of the students in the events.
 - Update event details and send notifications to relevant users.


### Teachers Portal 

The Teachers portal is dedicated to control center for teachers, providing them with a comprehensive platform to manage students extra-curricular activities. The portal is designed to be user-friendly and efficient.

##### 1. User Insights
- Access detailed personal information for each user, including:
  - Basic personal details.
  - Associated clubs and memberships.
  - Achievements and milestones.


##### 2. Content Management
- Add and manage clubs dynamically to maintain an updated list of opportunities.
- Create and assign achievements to recognize accomplishments.

##### 3. Event Managment
- Create and manage events for clubs and activities.
 - Can mark the attendance of the students in the events.
 - Update event details and send notifications to relevant users.

#### 4. School Progress 
- A timeline of school acheivements by the students.
 - Provide basic infomation about the student acheivements.


### Student Portal

#### 1. User Insights
- Access detailed personal information of the student
- Associated clubs and memberships
- Achievements and milestones.

#### 2. School Progress 
- A timeline of school acheivements by the students.
 - Provide basic infomation about the student acheivements.

#### 3. Notification Center
- Receive notifications about upcoming events and activities.

#### 4. Clubs and Activities
- View and join clubs and activities.


# Database Schema

The following tables are part of the database:

| Schema  | Name              | Type    | 
|---------|-------------------|---------|
| public  | achievements       | table  |
| public  | activities         | table  |
| public  | club_memberships   | table  | 
| public  | clubs              | table  | 
| public  | students           | table  | 
| public  | teachers           | table  |
| public  | users              | table  | 
| public  | notifications      | table  | 
| public  | schedule           | table  | 
| public  | attendance         | table  | 



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
  

## Used Packages

The following packages are used in the **Richtracker** project:

### Dependencies:

- **@neondatabase/serverless**: A serverless database client for Neon DB.
- **@radix-ui/react-label**: Radix UI component for accessible form labels.
- **@radix-ui/react-slot**: Radix UI Slot component for content distribution.
- **axios**: Promise-based HTTP client for making requests.
- **class-variance-authority**: A utility for handling class names with varying conditions.
- **framer-motion**: Library for animations and interactions in React.
- **jsonwebtoken**: For creating and verifying JSON Web Tokens (JWT) for authentication.
- **lucide-react**: Collection of Lucide icons for React applications.
- **next**: The React framework for building server-side rendered applications.
- **react**: The core React library for building user interfaces.
- **react-dom**: For DOM-specific methods in React.
- **tailwind-merge**: Utility to merge Tailwind CSS classes while avoiding conflicts.

### Development Dependencies:

- **@types/node**: TypeScript type definitions for Node.js.
- **@types/react**: TypeScript type definitions for React.
- **@types/react-dom**: TypeScript type definitions for React DOM.
- **eslint**: A tool for identifying and fixing problems in JavaScript and TypeScript code.
- **eslint-config-next**: ESLint configuration preset for Next.js applications.
- **postcss**: Tool for transforming CSS with JavaScript plugins.
- **tailwindcss**: Utility-first CSS framework for fast UI development.
- **typescript**: JavaScript superset for static typing and modern development.





