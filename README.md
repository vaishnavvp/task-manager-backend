Task Manager – MERN Stack (React + Node + MongoDB)

This is a full-stack Task Management Application built using the MERN Stack, with a strong focus on Frontend UI/UX (React + MUI), including authentication, role-based access, task CRUD operations, pagination, loaders, theme toggle, and toast notifications.

FEATURES
Authentication
- Sign Up / Sign In using JWT
- Login persistence via localStorage
- Global AuthContext
- Private routes protection
- Role-based routing (Admin / Normal User)

User Roles
Normal User:
- Create Task
- Edit Own Tasks
- View Tasks

Admin:
- Edit Any Task
- Delete Tasks
- Full Access

Tasks Module
- Create, edit, delete (admin only), and view tasks
- Each task includes:
  - Title, Description, Status, Created Date, Created By
- Pagination (5 tasks per page)
- Skeleton loader while fetching tasks
- Confirmation dialog for delete
- Toast notifications for create/update/delete

UI / UX
- Material UI (MUI)
- Responsive layout
- Light/Dark theme toggle with toast
- Global loader overlay
- Clean layout with navigation bar

State Management
- AuthContext
- ThemeContext
- LoaderContext

TECH STACK
Frontend:
- React (Vite), React Router, MUI, Axios, Context API

Backend:
- Node.js, Express.js, MongoDB Atlas, JWT, Bcrypt, CORS

PROJECT STRUCTURE
Frontend:
  components/
  pages/
  context/
  api.js
  App.jsx
  main.jsx

Backend:
  models/
  routes/
  middleware/
  config/
  server.js

SETUP
Backend:
  npm install
  Configure .env
  npm run dev

Frontend:
  npm install
  Configure .env
  npm run dev

DEPLOYMENT
Frontend → Vercel
Backend → Render

This project demonstrates a complete MERN application with professional UI, authentication, authorization, loaders, theme switcher, and deployment.