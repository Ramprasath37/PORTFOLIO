# Ramprasath S Portfolio

Welcome to my portfolio website! This project showcases my work, professional profile, and contact form. Designed for responsiveness, clean UI, and smooth animations.

---

## 🌐 Live Demo

[View Portfolio](https://your-vercel-or-netlify-link.com)

---

## 💻 Features

- Fully responsive portfolio built with **React + TypeScript**
- **Secure contact form** integrated with **EmailJS** using environment variables
- Floating input fields with focus animations
- Smooth **Framer Motion** animations throughout
- Dynamic success messages on form submission
- Optional **WhatsApp quick contact** button
- Contact info cards (Email, Phone, LinkedIn, Location)
- Professional and clean layout
- Environment variables to keep API keys secure

---

## 🛠 Tech Stack

- **React + TypeScript**  
- **Framer Motion** (Animations)  
- **EmailJS** (Contact Form)  
- **Tailwind CSS / UI components** (Card, Button)  
- **Vite** (Build Tool)

---

## 📁 Folder Structure


portfolio-main/
├─ src/
│ ├─ components/
│ ├─ pages/
│ │ └─ Contact.tsx
│ └─ utils/
├─ public/
├─ .env # ✅ Secure keys
├─ .gitignore
├─ package.json
└─ vite.config.js





---

## ⚙️ Setup & Run

1. Clone the repo:  
```bash
git clone https://github.com/yourusername/portfolio-main.git



2. Install dependencies:
cd portfolio-main
npm install


3. Add .env in root folder:

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key


4. Run dev server:

npm run dev




📧 Contact Form

Uses EmailJS to send messages securely

Form fields: Name, Email, Message

Shows success animation on submission

Keys are stored in .env → never exposed in code



💡 Deployment

Deploy on Vercel / Netlify

Add Environment Variables in project settings

Rebuild & redeploy




📞 Contact Info
Method	Details
Email	sramprasath37@gmail.com
Location	Erode, Tamil Nadu
LinkedIn	Connect


