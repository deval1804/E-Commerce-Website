# 🛒 E-Commerce Website

A full-featured e-commerce platform with product listing, shopping cart, order placement, multiple payment options, and a secure admin panel — built using **React.js**, **Bootstrap**, **HTML**, **CSS** for frontend and **Node.js**, **Express.js**, **MongoDB**, **JWT Authentication**, and **Multer** for backend.

---

## 📖 Project Overview

This e-commerce website allows users to browse products by category, add items to a cart, apply discounts, and securely checkout with multiple payment methods. It also includes an admin panel for product and order management.

---

## 🚀 Features

- 🔍 **Product Listing by Category**
  - Men: Clothes, Watches, Goggles, Footwear
  - Women: Clothes, Watches, Goggles, Footwear
  - Kids: Toys, Clothes, Footwear, Goggles

- 👤 **User Authentication**
  - Secure **Sign Up** and **Login**
  - JWT-based session handling

- 🛒 **Shopping Cart**
  - Add products to cart
  - See product details in cart
  - Apply promo codes (`DISCOUNT10` for 10% off)

- 💳 **Multiple Payment Methods**
  - Credit/Debit Card
  - UPI
  - Net Banking
  - Cash on Delivery (COD)

- 📢 **Newsletter Subscription**

- ⚙️ **Admin Panel**
  - Manage products
  - Manage orders
  - Secure access

## 🖥️ Installation & Run Instructions

### 🔹 Frontend (React)

```bash
cd frontend
npm install
npm start

🔹 Backend (Node.js, Express)
cd backend
node ./index.js

🔹 Admin Panel (React with Vite)
cd admin
npm run dev

📑 Project Workflow
Home page loads with a navigation bar containing categories: Men, Women, Kids

User can browse products by category

Cart icon in the navbar shows number of items added to the cart

Login/Signup functionality available

Cart page displays item details and total price

Apply promo code (DISCOUNT10) for discounts

Proceed to checkout with available payment options

Subscribe option on the home page for newsletters

📦 Tech Stack
=> Frontend:
   React.js
   Bootstrap
   HTML, CSS


=> Backend:
   Node.js
   Express.js
   MongoDB
   JWT
   Multer

📑 License
This project is licensed under the MIT License.

📞 Contact
Developer: Deval Darji

GitHub: @deval1804
