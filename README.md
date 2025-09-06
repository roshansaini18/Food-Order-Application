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

### 1) Clone  

```bash
git clone <your-repo-url> snackify
cd snackify

