# PulseGen Video App 🎥

A full-stack MERN application that allows users to register, log in, and upload or view videos.  
The system includes **role-based access (viewer / creator)** and integrates a basic moderation layer before videos go live.

---

## 🚀 Tech Stack

**Frontend**
- React (Vite)
- Context API (Auth)
- Fetch API for backend communication

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Socket.io (real-time support – prepared for video updates)
- Multer (file upload, prepared)
- dotenv, morgan, cors

---

## 📁 Project Structure

pulsegen-video-app/
├── backend/
│ ├── src/
│ ├── .env
│ └── package.json
└── frontend/
├── src/
└── package.json


---

## 🔧 Environment Variables (Backend)

Create:



backend/.env


Add:



MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000


---

## ▶️ How to Run the Project

### 1️⃣ Backend



cd backend
npm install
node src/server.js


### 2️⃣ Frontend



cd frontend
npm install
npm run dev


Open:

👉 http://localhost:5173

---

## 🔐 Auth Endpoints

### Register


POST /api/auth/register


### Login


POST /api/auth/login


---

## 🩺 Health Check



GET /api/health


Response:

```json
{ "status": "ok" }

🏁 Status

User auth working

API health OK

Role support ready

Real-time support prepared
