# 🍽️ Nisarga Grand — Restaurant Website Project PRD

## 📌 Project Overview
This project aims to design and develop a **modern, immersive, and conversion-focused restaurant website** for *Nisarga Grand*, a vegetarian family restaurant in Bengaluru.

The goal is to create a **portfolio-grade, real-world project** that can be showcased to the restaurant for potential adoption.

---

## 🧠 Brand Identity

- **Name:** Nisarga Grand  
- **Location:** CBI Road, RT Nagar, Bengaluru  
- **Type:** Family Restaurant  
- **Cuisine:** South Indian + North Indian + Fast Food (Veg Only)  
- **Pricing:** Budget-friendly (₹30–₹400, avg ₹200/person)

### ✨ Tagline
**"Simple Food. Grand Experience."**

### 🎯 Brand Personality
- Modern  
- Clean  
- Affordable  
- Comfortable  

### 👥 Target Audience
- Families  
- College students  
- Office crowd  
- Couples  

---

## 🎨 Design System

### 🌿 Visual Style
- Modern minimal + homely warmth  
- Clean layouts, soft colors, food-focused visuals  

### 🎨 Color Palette
- Light Mode:
  - Primary: Green (#2E7D32)  
  - Base: Off-white (#FAF9F6)  
  - Accent: Beige / Warm tones  
  - Highlight: Gold / Olive  

- Dark Mode:
  - Primary: Black / Near Black (#0f0f0f)  
  - Base: Dark Gray  
  - Accent: Soft muted tones  
  - Minimal green usage  

### 🔤 Typography
- Headings: Poppins / Inter (bold)  
- Body: Light, readable  

---

## 🌐 Website Structure

### 🏠 Homepage
- Hero Section (animated)
- Featured Dishes
- Why Choose Us
- Menu Preview
- Testimonials
- Gallery
- Contact + CTA

### 🍛 Menu Page
- Categories:
  - South Indian
  - North Indian
  - Fast Food
  - Beverages
- Dish cards (image, price, add to cart)

### 🛒 Order Page
- Cart system
- Add/remove items
- Total calculation
- Checkout UI

### 📸 Gallery
- Masonry grid
- Lightbox preview

### 📍 Contact Page
- Map embed
- Address
- Phone number
- Opening hours

---

## ⚙️ Features

### ✅ Core Features
- Interactive menu with filters  
- Order system  
- Gallery  
- Contact + map  
- About section  

### 🔥 Advanced Features
- Framer Motion animations  
- Scroll-based animations  
- Micro-interactions  
- 3D effects (Hero section only)  
- Smart recommendations  
- Fully responsive design  
- Dark mode toggle  
- Smart search bar (Navbar)  

---

## 🔍 Smart Search System

- Search dishes by name  
- Instant suggestions  
- Fuzzy matching (typo-friendly)  
- Category-aware filtering  
- Fast response via API  

---

## 🛠️ Backend & API Architecture

### 🔗 API Integration
All frontend components must be connected via API routes.

### Core APIs:
- GET /dishes  
- GET /dishes/:id  
- POST /orders  
- GET /categories  
- GET /search?q=  

---

## 🔐 Admin Panel (Advanced Feature)

### 🎯 Purpose:
Allow restaurant staff to manage content dynamically.

### Features:
- Secure login (JWT/Auth system)  
- Add/Edit/Delete dishes  
- Upload dish images  
- Manage categories  
- Update prices & availability  

### Access:
- Restricted to authorized workers only  
- Role-based access (optional future upgrade)  

---

## 🎬 Animation Strategy

- Hero text reveal animations  
- Floating food visuals  
- Scroll-based fade-ins  
- Hover interactions  
- Smooth transitions  

---

## 🧊 3D Strategy

- Use only in Hero section  
- Subtle depth, not overwhelming  
- Avoid overuse to maintain professionalism  

---

## 💻 Tech Stack

### Frontend
- React (TypeScript)  
- Tailwind CSS  

### Backend (NEW)
- Node.js + Express  
- MongoDB  

### Libraries
- Framer Motion  
- Zustand (state management)  
- React Icons  

### 3D
- Three.js  
- React Three Fiber  
- Drei  

---

## 🌙 Dark Mode

- Class-based toggle  
- Stored in localStorage  
- Dominantly black UI  
- Minimal green usage  

---

## 📁 Folder Structure

```
src/
 ├── components/
 ├── pages/
 ├── store/
 ├── assets/
 ├── hooks/
 ├── utils/
 ├── App.tsx
 └── main.tsx
```

---

## 🧩 Component Structure

- Navbar (with search + dark mode toggle)  
- Hero  
- FeaturedDishes  
- WhyUs  
- MenuPreview  
- Testimonials  
- Gallery  
- Contact  
- Footer  

---

## 🧠 UX Flow

1. User lands on homepage  
2. Sees hero → builds interest  
3. Searches or browses menu  
4. Selects items  
5. Adds to cart → checkout  

---

## 🎯 Key Goals

- Portfolio-ready project  
- Real-world usability  
- Visually impressive  
- Smooth user experience  
- Scalable architecture  

---

## 🚀 Future Enhancements

- Payment integration  
- Admin analytics dashboard  
- Real-time order tracking  
- Notifications system  

---

## 🧠 Final Note

This project is designed to go beyond a basic student project and achieve:
- Professional UI/UX  
- Real-world applicability  
- Strong portfolio impact  

**Execution quality will define its success.**
