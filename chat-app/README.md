✨ React Chat Application

A real-time chat application built using React JS, Firebase, and Vercel for deployment.
This project demonstrates user authentication, message syncing, and a clean chat UI — all built with modern React concepts. 🚀

🔗 Live Demo:https://chatify-drab-nu.vercel.app/

📌 Project Overview

This chat application allows users to sign up, log in, and chat in real time.
It uses Firebase Firestore to store and sync messages instantly and Firebase Auth to securely handle user login.

The UI is built using clean, simple React components to keep the interface easy to understand and user-friendly.

⭐ Key Features
🔐 User Authentication

Login & Signup pages

Firebase Authentication (Email & Password)

Secure session handling


💬 Real-time Messaging

Messages update instantly

Firebase Firestore for live database syncing

Auto-scroll to latest message

🎨 Clean & Responsive UI

Simple chat layout

Chat window + Sidebar

Mobile friendly

🗂️ Modular React Structure

Components separated (Chat, Input, Sidebar, Auth pages)

Clean folder structure

Easy to scale

☁️ Cloud Hosted

Deployed on Vercel

Automatic build & deployment

Fast and global

📁 Folder Structure
React-JS/
│── public/
│── src/
│   ├── components/
│   │   ├── Chat.jsx
│   │   ├── Message.jsx
│   │   ├── Sidebar.jsx
│   │   └── InputBox.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   └── firebase.js
│── package.json
│── README.md

🛠️ Technologies Used
Technology	Purpose
⚛️ React JS	Frontend UI
🔥 Firebase Auth	User authentication
🔥 Firebase Firestore	Real-time database
🎨 CSS	UI styling
▲ Vercel	Deployment & hosting
🚀 Getting Started Locally
1️⃣ Clone the Repository
git clone https://github.com/Abhishektiwari565/React-JS.git

2️⃣ Navigate to Project
cd React-JS/chat-app

3️⃣ Install Dependencies
npm install

4️⃣ Add Firebase Config

Create a file:

src/firebase.js




Your app will open at:

📍 http://localhost:3000/

⚙️ Deployment on Vercel
1️⃣ Push project to GitHub
2️⃣ Open Vercel → New Project
3️⃣ Select your GitHub repository
4️⃣ Set default build settings (no changes needed)
5️⃣ Click Deploy 🎉

Vercel will automatically build and host your app.

📝 Project Use-Cases (Why This Project Is Useful)

✔️ Perfect for beginners learning Firebase + React
✔️ Good example of real-time data synchronization
✔️ Useful for portfolio to showcase full-stack skills
✔️ Clean structure to extend (add groups, images, voice chat, etc.)

❤️ Author

👨‍💻 Abhishek Tiwari
Frontend Developer | React Enthusiast
