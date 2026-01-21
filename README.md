# 🌟 Google Business Profile Dashboard (React + Node.js + Tailwind)

A full-stack application that integrates with the **Google Business Profile (GBP / GMB) API** to fetch and display business details on a clean, modern, interactive dashboard UI.

This project uses:

- **Node.js + Express** (Backend)
- **React (Vite)** (Frontend)
- **Tailwind CSS** (UI Styling)
- **Google Business Profile Business Information API**
- **Service Account Authentication**

---

## 🚀 Features

### ✔ Google Business Profile Integration
- Fetch business name  
- Address (storefront)  
- Phone number  
- Website URL  
- Primary category  
- Ratings & total reviews  
- Business photos  

### ✔ Frontend (Vite + React + Tailwind)
- Beautiful interactive cards  
- Responsive layout (mobile → desktop)  
- HeroIcons support  
- Animated hover effects  
- Photo grid section  

### ✔ Backend (Node.js + Express)
- API route → `/api/gmb/details`
- Secure OAuth login using Service Account  
- Axios for Google API requests  
- Dotenv for environment variables  

### ✔ Security
- `.env` file is **hidden using `.gitignore`**  
- No sensitive credentials exposed  
- Supports secure key injection on deployment  

---


---

## ⚙️ Installation & Setup Guide

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/abinash185/GMB-Frontend
git clone https://github.com/abinash185/GMB-Backend

🔹 2. Install Dependencies

cd backend
npm install

cd frontend
npm install


🔹3. Create a new file inside backend/ named .env:

GOOGLE_CLIENT_EMAIL=your-service-account-email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
LOCATION_ID=your_google_business_location_id
PORT=5000

🔹4.Start backend and frontend 
 
 use npm start for backend
 use npm run dev for frontend

 🔄 API Endpoint

 GET /api/gmb/details

 {
  "success": true,
  "data": {
    "title": "Business Name",
    "storefrontAddress": {},
    "primaryPhone": "",
    "websiteUri": "",
    "categories": {},
    "profile": {
      "overallRating": 4.7,
      "totalReviewCount": 128
    },
    "photos": [...]
  }
}


🔐 Google Cloud Setup (Required)

Follow these steps to configure the Google Business Profile API:

✔ 1. Create Google Cloud Project
✔ 2. Enable the following APIs:

Business Profile API

Business Profile Business Information API

✔ 3. Create a Service Account
✔ 4. Generate a JSON Key
✔ 5. Add Service Account as "Manager" in Google Business Profile
✔ 6. Get your locationId (via API or Google Maps CID)

Once done, your backend will successfully fetch GMB data.

🎨 UI Features
🔹 Beautiful Tailwind Design

Clean layout

Modern gradient headers

Elegant spacing

Shadows & hover effects

🔹 Components

Business Details Card

Ratings & Reviews Card

Photo Gallery (Grid)


🧪 Testing

You can test the backend independently:
http://localhost:5000/api/gmb/details

