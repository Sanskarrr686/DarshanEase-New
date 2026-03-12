# DarshanEase

DarshanEase is a full-stack MERN application that lets devotees explore temple listings, browse darshan slots, and book tickets online. It pairs a React + Bootstrap frontend with an Express/MongoDB backend that handles role-based authentication, bookings, management actions, and media uploads for organizers.

## 1. Environment Setup

1. Install Node.js v16+ (includes npm) and MongoDB.
2. Backend dependencies: `express`, `mongoose`, `cors`, `bcryptjs`, `jsonwebtoken`, `dotenv`, `morgan`, `multer`, `qrcode`.
3. Frontend dependencies: `axios`, `react-router-dom`, `react-toastify`, `react-bootstrap`, `bootstrap`, `react-icons`.
4. Copy `.env.example` to `.env` at the repository root and fill in `MONGO_URI`, `JWT_SECRET`, and `PORT`.
5. Use `npm install` inside `server/` and `client/`, then run `npm run dev` in each directory (server defaults to port 7000; client uses Vite on 5173).
6. Version control: standard Git workflow. API testing: Postman or similar.

## 2. Database Design

- **Users**: stores credentials, roles (`USER`, `ADMIN`, `ORGANIZER`), and timestamps.
- **Organizers**: specialized user profile that links to temples.
- **Temples**: managed by organizers, reference images stored via multer uploads.
- **Darshans**: slots attached to temples/organizers with schedule, prices, and descriptions.
- **Bookings**: link users with temples, darshans, and quantity/amount details; includes status/history for CRUD.

Darshan slots refer to temples via `organizerId` and temple metadata; bookings link to users and selected slots.

## 3. Application Development

Implemented modules:

- User registration/login plus profile management with hashed passwords.
- Organizer and admin authentication with JWTs.
- Temple CRUD (create, update, delete, fetch list) including file uploads.
- Darshan CRUD tied to temples and organizers.
- Booking creation and retrieval (user, organizer, admin views), with QR/receipt metadata.
- Donation schema can be added similarly as required.

## 4. Role-Based Security

- JWT protects endpoints, with middleware validating tokens issued via `JWT_SECRET`.
- Roles enforced at the controller layer; organizers, admins, and users have scoped controllers/routes.
- Passwords use `bcryptjs` for hashing.

## 5. Frontend Integration

- React + Vite drives the UI, structured by sections for users, organizers, and admins.
- Axios centralizes API calls to `http://localhost:7000/{user,organizer,admin}`.
- Shared components (Navbars, Footers, dashboards) and Bootstrap styling ensure responsive layouts.
- Organizer dashboard visualizes temples/darshans/bookings via charts; users browse temples and book slots.

## 6. Testing & Validation

- CRUD routes for users, organizers, temples, darshans, and bookings ready for Postman testing.
- Login flows validate credentials and store tokens in `localStorage`.
- Booking forms enforce required fields; backend validates existence of referenced docs before creation.
- UI responsive with Bootstrap and Flexbox on desktop/mobile breakpoints.

## 7. Monitoring & Optimization

- MongoDB queries sorted by creation time and filter by organizer/user IDs for efficiency.
- Centralized Express error handling/logging via `morgan`; rejections return JSON errors.
- Controllers split by domain (users, organizers, bookings) to keep growth manageable.

## Outcome

By completing this stack you:

1. Ship a real-world MERN app with authentication, templates, and booking flows.
2. Implement role-based security and JWT-secured APIs.
3. Deliver a responsive React UI orchestrated by Axios + React Router.

Future work: add donation module, React Context/global state for auth, and unit tests for API controllers.
