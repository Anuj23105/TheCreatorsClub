# TrustServe — Hackathon Feature Walkthrough

TrustServe is a rural-first service marketplace that connects customers with verified local workers (plumbers, electricians, carpenters, etc.). It focuses on trust (verification + reviews), simple flows (mobile-first UX), and quick booking.

---

## 1) Core User Roles

- **Customer**: searches services, views worker profiles, adds workers/services to cart, pays, creates bookings, and leaves reviews.
- **Worker**: maintains profile, completes verification, views worker dashboard, and learns skills via training videos.

---

## 2) Authentication & Access Control

- **Login / Signup for both roles** (Customer + Worker)
- **Role-based sessions**: dashboards and protected pages adapt based on whether the user is a customer or a worker.
- **JWT-based auth (backend)**
  - Auth endpoints: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- **Protected routes (frontend)**
  - Worker-only pages are blocked for customers (and vice-versa).

---

## 3) Homepage (Discovery + Trust-first Messaging)

- **Hero section with search UX** (service type + location input)
- **Trust indicators** (ratings, verified cues, safety messaging)
- **Responsive UI** optimized for mobile users (tier-2/3 and rural-first UX)
- **Dark theme styling** applied across key homepage sections for consistent premium look

---

## 4) Services Discovery (Browse Workers)

- **Service listing / discovery page** with worker cards
- **“Popular Services” image carousel**
  - Horizontal card carousel showcasing high-demand services with rating + price cues
- **Fallback demo content**
  - If backend has no workers, the frontend can show **dummy workers** so the UI is always populated during demos.
- **Empty-state UX**
  - Clean “no results” states and skeleton-style loading components where applicable

---

## 5) Worker Profile Experience

- **Detailed worker profile page**
  - Skills / category
  - Ratings & reviews
  - Verification status cues
- **Call-to-action to book / add to cart**

---

## 6) Cart System (Real Marketplace Flow)

- **Add to Cart** from worker/service cards
- **Cart page**
  - Review items
  - Update quantity
  - Add booking notes
  - Set date/time preferences
- **Cart persists** using local storage (so refresh won’t lose the cart)
- **Cart icon with badge** in navbar
  - Shows live cart count

---

## 7) Checkout + Payment (Hackathon-friendly)

- **Payment step occurs before booking confirmation**
- **Razorpay checkout support (frontend)**
  - Uses Razorpay SDK loader and opens the checkout modal
  - Environment key used by frontend: `VITE_RAZORPAY_KEY_ID`
- **Manual payment fallback mode** (for demos)
  - Controlled by: `VITE_PAYMENT_PROVIDER=manual`
  - Lets judges complete the flow even without live payment setup
- **Payment metadata captured with bookings**
  - Payment provider + payment ID are attached to the booking payload
- **Cash / UPI option for high-value bookings**
  - If the payable amount is **above Rs 1000**, customers can choose **Cash** or **UPI** (pay on service)

Note: this is a **hackathon/demo-friendly payment approach**. For production, you’d typically add backend order creation + signature verification.

---

## 8) Booking System

- **Create bookings after successful payment**
- **Customer booking history** via API: `GET /bookings/me`
- **Booking lifecycle support (backend)**
  - Status updates via: `PATCH /bookings/:id/status`
- **Pricing transparency** (UI shows pricing cues / breakdown style)
- **Edge-case handling**
  - Booking failure UI (backend contains a demo edge-case for a specific date)

---

## 9) Ratings & Reviews

- **Customer review submission** (requires real customer login)
- **Worker reviews listing**
  - API: `GET /reviews/worker/:workerId`
- **Review creation**
  - API: `POST /reviews`
- **Aggregate rating updates** supported in backend models/controllers

---

## 10) Dashboards

### Customer Dashboard

- **Booking history and active bookings**
- **Saved workers**
  - API: `GET /users/saved-workers`
  - API: `POST /users/saved-workers/:workerId`
- **Review actions** linked to completed bookings

### Worker Dashboard

- **Worker summary view**
  - Booking/jobs overview
  - Earnings-style summary cues
- **Simple onboarding hints** designed for non-technical workers

---

## 11) Worker Verification Upload

- **Verification document upload API**
  - Endpoint: `POST /workers/verification/upload`
- **Uploads stored locally** in: `trustserve-backend/uploads/verification`

---

## 12) Skills / Learning Hub + Certificate

- **Worker-only Skills page**
  - Training videos embedded (learning-by-watching)
  - Mark modules as completed
- **Certificate download (demo)**
  - Generates a downloadable certificate file after completion
- **Navbar integration**
  - Skills link appears for workers based on role

---

## 13) Smart Navigation (Role-aware)

- Navbar automatically shows the right dashboard link:
  - **Worker** → Worker Dashboard
  - **Customer** → User Dashboard
  - **Logged out** → no dashboard link

---

## 14) Technical Stack (What We Built With)

- **Frontend**: React + Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT tokens
- **UI patterns**: responsive layouts, carousels, skeleton loading, empty states, dark theme

---

## 15) How To Run (Local)

### Backend

1. `cd trustserve-backend`
2. Create `.env` from `.env.example` and set:
   - `MONGODB_URI` (or `MONGO_URI`)
   - `JWT_SECRET`
3. `npm install`
4. (Optional but recommended) Seed demo data:
   - `npm run seed`
5. `npm run dev`

Backend API base URL:
- `http://localhost:5000/api`

### Frontend

1. `cd trustserve-frontend`
2. Create `.env` and set:
   - `VITE_API_BASE_URL=http://localhost:5000/api`
   - (Optional) `VITE_PAYMENT_PROVIDER=manual`
   - (Optional) `VITE_RAZORPAY_KEY_ID=...`
3. `npm install`
4. `npm run dev`

---

## 16) Demo Notes (For Judges)

- If you seed (`npm run seed`), the terminal output typically prints demo accounts.
- If payment keys are not available, set `VITE_PAYMENT_PROVIDER=manual` to complete the full checkout flow.
- The app still demos well even if the backend has no workers because the frontend can display fallback dummy workers.
