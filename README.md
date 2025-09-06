# Snackify — MERN Food Ordering App  

A full-stack food ordering platform built with the **MERN stack** that supports **role-based access** for Users and Admins, end-to-end ordering with cart & checkout (Stripe test payments), and an admin dashboard for managing menu items and order lifecycles.

---

## 🚀 Live Demo  

- **Frontend**: [Snackify Frontend](https://food-order-application-kk8t.onrender.com)  
- **Backend API**: [Snackify Backend](https://food-order-application-backend.onrender.com)  

> ⚠️ If a free tier goes to sleep, the first load may take a few seconds.  

---

## ✨ Features  

### **Roles & Navigation**  

#### 👤 User (including Guest)  
- Browse **Home**, **Menu**, **Orders**, **Cart**, **Profile**  
- Add/remove items to **Cart**  
- Checkout with **Stripe** (test mode)  
- View **Order history** & real-time status  
- Guest mode (browse & build cart)  

#### 👨‍💼 Admin  
- **Add New Item** (image, name, description, type/category, price)  
- **Items list** (view/update/hide/delete)  
- **Orders board** with status workflow:  
  - `Processing → Out for Delivery → Delivered`  
- Menu items added by Admin are immediately visible to Users  

---

## 🧱 Tech Stack  

- **MERN**: MongoDB Atlas, Express.js, React (Vite), Node.js  
- **State & UI**: React Hooks/Context, modern CSS (or Tailwind if configured)  
- **Auth**: JWT with role-based authorization (user/admin)  
- **Payments**: Stripe (test mode)  
- **Hosting**: Render (demo links above)  

---

## 🗂️ Project Structure (suggested)  

---

## 🔐 Role-Based Access (RBAC)  

| Area               | User | Admin |
|--------------------|:----:|:-----:|
| Browse Menu        |  ✅  |  ✅   |
| Add to Cart        |  ✅  |  —    |
| Checkout (Stripe)  |  ✅  |  —    |
| View Own Orders    |  ✅  |  —    |
| Add/Edit Items     |  —   |  ✅   |
| Manage All Orders  |  —   |  ✅   |
| Update Order Status|  —   |  ✅   |

---

## ⚙️ Local Development  

> Requires **Node.js ≥ 18**, **MongoDB Atlas** (or local MongoDB), and a **Stripe account** (test mode).  

Here’s the fixed version that will render correctly:

## 📂 Clone & Setup  

### 🔧 Backend Setup  
```bash
cd backend
cp .env.example .env
npm install
npm run dev   # nodemon (or npm start)


.env configuration

PORT=5000
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<secure-random-string>
STRIPE_SECRET_KEY=<sk_test_xxx>
CLIENT_URL=http://localhost:5173

🎨 Frontend Setup
cd ../frontend
cp .env.example .env
npm install
npm run dev   # Vite on http://localhost:5173

💳 Stripe (Test Mode)

Use Stripe’s test card to simulate payments:

Card: 4242 4242 4242 4242

Expiry: any future date

CVC: any 3 digits

ZIP: any 5 digits

⚠️ No real charges occur in test mode.

💖 Made with love by ROSHAN SAINI


👉 Copy this into your README — it will display **separately formatted blocks** instead of a messy single line.  

Do you want me to reformat your **entire README** with this fixed structure so you won’t face that issue again?
