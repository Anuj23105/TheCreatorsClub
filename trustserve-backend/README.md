# TrustServe Backend

Node.js + Express + MongoDB backend for the TrustServe frontend.

## Features

- JWT authentication with role-based access (`customer`, `worker`)
- Service worker discovery with filters (category, rating, distance, location)
- Worker profile APIs (availability, verification, reviews)
- Booking APIs with status lifecycle and pricing breakdown
- Review and rating APIs with worker aggregate updates
- Worker and user dashboard summary APIs
- Saved workers APIs
- Verification document upload API

## Project Structure

- `src/config` database configuration
- `src/models` MongoDB models
- `src/controllers` request handlers
- `src/routes` route definitions
- `src/middleware` auth, validation, error handling
- `src/seed` seed script for demo data

## Setup

1. Copy `.env.example` to `.env`
2. Update `MONGODB_URI` and `JWT_SECRET`
3. Install dependencies:
   - `npm install`
4. Seed sample data:
   - `npm run seed`
5. Start server:
   - `npm run dev`

## MongoDB Setup

- This backend uses MongoDB via Mongoose.
- Local MongoDB URI example:
   - `mongodb://127.0.0.1:27017/trustserve`
- MongoDB Atlas URI example:
   - `mongodb+srv://<username>:<password>@<cluster-url>/trustserve?retryWrites=true&w=majority`
- Supported env keys:
   - `MONGODB_URI` (preferred)
   - `MONGO_URI` (fallback)

## API Base URL

- `http://localhost:5000/api`

## Core Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /workers`
- `GET /workers/top-rated`
- `GET /workers/recommended`
- `GET /workers/:id`
- `GET /workers/:id/reviews`
- `POST /workers/verification/upload`
- `POST /bookings`
- `GET /bookings/me`
- `PATCH /bookings/:id/status`
- `GET /reviews/worker/:workerId`
- `POST /reviews`
- `GET /dashboard/user`
- `GET /dashboard/worker`
- `GET /users/saved-workers`
- `POST /users/saved-workers/:workerId`

## Notes

- Booking edge case is implemented for date `2026-04-01` to emulate booking failure behavior expected by the frontend.
- Upload files are stored at `uploads/verification`.
