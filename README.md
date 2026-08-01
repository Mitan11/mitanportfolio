# 🚀 Mitan Tank | Full Stack & Frontend Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-black?style=for-the-badge&logo=framer)

Welcome to the source code for my professional portfolio. This application is a modern, high-performance web experience designed to showcase my skills, projects, and expertise in full-stack development.

🌐 **Live Website:** [mitanportfolio.vercel.app](https://mitanportfolio.vercel.app)

---

## ✨ Features

- **Modern UI/UX:** Built with a premium aesthetic featuring glassmorphism, dynamic gradients, and smooth micro-animations using Framer Motion.
- **Custom Admin CMS:** A secure, built-in backend dashboard to dynamically manage Projects, Skills, Experiences, and Certifications without touching code.
- **Robust Security:** JWT-based authentication for the admin panel, strict API route protection, rate-limiting against brute force attacks, and comprehensive security headers.
- **Contact Form Integration:** Seamless client-side message delivery powered by Web3Forms.
- **Optimized Performance:** Fully responsive, server-side rendered (SSR), and perfectly optimized for SEO.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion, Sonner (Toasts)
- **Backend:** Node.js, Next.js API Routes, JWT Authentication
- **Database:** MongoDB (via Mongoose)
- **Media Storage:** Cloudinary
- **Form Handling:** Web3Forms

---

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Mitan11/mitanportfolio.git
cd mitanportfolio
```

### 2. Install dependencies
```bash
npm install
# or yarn install / pnpm install
```

### 3. Setup Environment Variables
Duplicate the provided example environment file and fill in your actual credentials.
```bash
cp .env.example .env.local
```
Ensure you provide a valid `MONGODB_URI`, `JWT_SECRET`, your `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, and your Cloudinary credentials.

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The secure admin panel can be accessed via `/login`.

---

## ⚠️ Security Warning

**Important Note regarding Git History:** 
If any sensitive credentials (such as MongoDB connection strings or JWT secrets) were previously hardcoded into the source code, they may still exist in the repository's Git history even after being moved to `.env.local`. 

It is **highly recommended** to immediately rotate (revoke and regenerate) any such credentials to ensure the complete safety of your data and infrastructure before making this repository public.

---

## 📬 Contact

I am actively open for freelance projects, open-source collaborations, and professional opportunities! 

- **LinkedIn:** [Mitan Tank](https://linkedin.com/in/mitan-tank-986076247)
- **GitHub:** [@Mitan11](https://github.com/Mitan11)

---
*Built with ❤️ by Mitan Tank*
