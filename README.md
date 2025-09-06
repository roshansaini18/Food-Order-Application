Snackify — MERN Food Ordering App
A full-stack food ordering platform built with the MERN stack that supports role-based access for Users and Admins, end-to-end ordering with cart & checkout (Stripe test payments), and an admin dashboard for managing menu items and order lifecycles.

🚀 Live Demo

Frontend: https://food-order-application-kk8t.onrender.com

Backend API: https://food-order-application-backend.onrender.com

If a free tier goes to sleep, the first load may take a few seconds.

✨ Features
Roles & Navigation

User (including Guest)

Browse Home, Menu, Orders, Cart, Profile

Add/remove items to Cart

Checkout with Stripe (test mode)

View Order history & real-time status

Guest mode (browse & build cart; prompt to sign in on checkout)

Admin

Add New Item (image, name, description, type/category, price)

Items list (view/update/hide/delete)

Orders board with status workflow:

Processing → Out for Delivery → Delivered

Menu items added by Admin are immediately visible to Users.

🧱 Tech Stack

MERN: MongoDB Atlas, Express.js, React (Vite), Node.js

State & UI: React Hooks/Context, modern CSS (or Tailwind if configured)

Auth: JWT with role-based authorization (user/admin)

Payments: Stripe (test mode)

Hosting: Render (demo links above)

🗂️ Project Structure (suggested)
Snackify/
├── backend/
│   ├── src/
│   │   ├── config/        # db, stripe, env
│   │   ├── middleware/    # auth, role guard, error handler
│   │   ├── models/        # User, Item, Order, Cart
│   │   ├── routes/        # /auth, /items, /cart, /orders, /admin
│   │   ├── controllers/   # business logic
│   │   └── app.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/           # axios client
    │   ├── components/    # UI components
    │   ├── context/       # auth/cart contexts
    │   ├── pages/         # Home, Menu, Cart, Orders, Profile, Admin
    │   └── main.jsx
    └── package.json

🔐 Role-Based Access (RBAC)
Area	User	Admin
Browse Menu	✅	✅
Add to Cart	✅	—
Checkout (Stripe)	✅	—
View Own Orders	✅	—
Add/Edit Items	—	✅
Manage All Orders	—	✅
Update Order Status	—	✅
⚙️ Local Development

Requires Node.js ≥ 18 and MongoDB Atlas (or local MongoDB) and a Stripe account (test mode).

1) Clone
git clone <your-repo-url> snackify
cd snackify

2) Backend Setup
cd backend
cp .env.example .env
npm install
npm run dev   # nodemon (or npm start)


.env.example

PORT=5000
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<secure-random-string>
STRIPE_SECRET_KEY=<sk_test_xxx>
CLIENT_URL=http://localhost:5173

3) Frontend Setup
cd ../frontend
cp .env.example .env
npm install
npm run dev   # Vite on http://localhost:5173


frontend/.env.example

VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

🧾 API Overview (sample)

Base URL: https://food-order-application-backend.onrender.com

Auth

POST /auth/register — create user (role defaults to user)

POST /auth/login — obtain JWT

GET /auth/me — profile (requires Bearer token)

Items (Public/User)

GET /items — list menu items (filter by type/category)

GET /items/:id — item details

Cart (User)

GET /cart — fetch current cart

POST /cart — add { itemId, qty }

PATCH /cart/:itemId — update qty

DELETE /cart/:itemId — remove

Orders

POST /orders/checkout — create payment intent / client secret (Stripe)

POST /orders — confirm order after payment

GET /orders/my — user’s own orders

Admin

POST /admin/items — create item (image URL/name/description/type/price)

PATCH /admin/items/:id — update item

DELETE /admin/items/:id — delete item

GET /admin/orders — list all orders

PATCH /admin/orders/:id/status — processing | out-for-delivery | delivered

All Admin routes require Authorization: Bearer <token> with role admin.

💳 Stripe (Test Mode)

Use Stripe’s test card to simulate payments:

Card: 4242 4242 4242 4242

Expiry: any future date

CVC: any 3 digits

ZIP: any 5 digits

No real charges occur in test mode.

🖼️ Images for Items

You can:

Store image URLs directly with items, or

Integrate a storage provider (e.g., Cloudinary/S3) and save returned URLs.

🧪 Scripts

Backend

npm run dev    # start with nodemon
npm start      # production start


Frontend

npm run dev    # Vite dev server
npm run build  # production build
npm run preview

🔒 Security Notes

Store JWT in HTTP-only cookies or keep tokens in memory; avoid localStorage for highly sensitive apps.

Validate and sanitize all inputs for item creation/updates.

Lock down Admin routes with both JWT auth and role checks.

Use CORS with an explicit allowlist.

🧰 Troubleshooting

“Network Error” from frontend: confirm VITE_API_URL points to the backend URL.

JWT errors: verify JWT_SECRET consistency across environments.

Stripe errors: ensure both VITE_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY are set and the account is in test mode.

Images not showing: ensure the stored image URLs are publicly accessible.

📌 Roadmap (nice-to-have)

Order tracking with live updates (WebSockets)

Coupons & discounts

Reviews & ratings

Multi-restaurant support

Delivery partner app/role

🙌 Acknowledgements

Built with MongoDB Atlas, Express.js, React (Vite), Node.js

Payments by Stripe

Deployed on Render

📎 Quick Links

Frontend (Live): https://food-order-application-kk8t.onrender.com

Backend (Live): https://food-order-application-backend.onrender.com

This repository intentionally ships without a license.
