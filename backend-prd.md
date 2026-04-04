# ⚙️ Nisarga Grand — Backend PRD

## 📌 Overview
This backend system powers the Nisarga Grand restaurant website and admin panel.  
It handles authentication, menu management, orders, search, and API communication.

---

## 🎯 Goals
- Provide secure and scalable APIs
- Enable admin control over restaurant data
- Support frontend with fast and reliable endpoints
- Maintain clean architecture for future scaling

---

## 🧠 Architecture

### Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)

### Libraries
- dotenv
- cors
- bcryptjs
- jsonwebtoken
- multer

---

## 📁 Folder Structure

backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── config/
 ├── uploads/
 ├── server.js
 └── .env

---

## 🔐 Authentication System

### Features
- Admin login
- JWT token generation
- Protected routes
- Password hashing (bcrypt)

### APIs
- POST /api/auth/login
- POST /api/auth/register (optional)

---

## 🍛 Dish Management

### Features
- Add dish
- Edit dish
- Delete dish
- Toggle availability
- Upload image

### APIs
- GET /api/dishes
- POST /api/dishes
- PUT /api/dishes/:id
- DELETE /api/dishes/:id

---

## 🗂️ Category Management

### Features
- Add category
- Edit category
- Delete category

### APIs
- GET /api/categories
- POST /api/categories
- DELETE /api/categories/:id

---

## 🛒 Order Management

### Features
- Create order
- View orders
- Update order status

### APIs
- POST /api/orders
- GET /api/orders
- PUT /api/orders/:id

---

## 🔍 Search System

### Features
- Search dishes by name
- Case-insensitive search
- Fast response

### API
- GET /api/search?q=

---

## 🖼️ Image Upload

### Features
- Upload dish images
- Store in /uploads
- Save path in DB

---

## 🧱 Database Models

### Dish
- name
- price
- category
- description
- image
- isAvailable

### Category
- name

### Order
- items[]
- total
- status

### User
- email
- password

---

## 🔗 API Integration

All frontend components interact via REST APIs.

---

## 🚀 Future Enhancements

- Role-based access
- Cloud image storage
- Payment integration
- Analytics

---

## 🧠 Final Note

This backend is designed to be scalable, secure, and production-ready.  
Proper structure and clean code are critical for long-term success.
