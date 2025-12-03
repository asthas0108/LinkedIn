# Connectify

Connectify is a professional networking platform inspired by LinkedIn. It allows users to connect with each other, manage profiles, post updates, and download resumes. Built with modern web technologies, Connectify provides a clean and user-friendly interface to interact with professional connections.

## 🚀 Features

- 🔗 **Connection System**: Users can send connection requests and accept/reject incoming requests.
- 👤 **User Profiles**: Each user has a public profile showcasing their information, skills, and resume.
- 📄 **Resume Upload & Download**: Users can upload their resumes and others can download them from profiles.
- ✏️ **Edit Profile**: Users can update personal details, education, experience, and profile picture.
- 📝 **Create Posts**: Users can share updates, post images with text, and express thoughts.
- 💬 **Comment & Share**: Interact with posts through comments and share features.

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js
- Tailwind CSS
- React
- Axios

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (with Mongoose ODM)

**Authentication:**
- JWT (JSON Web Tokens)
- Google OAuth (optional)

**Other Tools:**
- Cloudinary / Firebase (for image uploads)
- Multer (for resume uploads)
- Bcrypt (for password hashing)
- Postman (for API testing)

---

## 📂 Folder Structure

LinkedIn/
├── .gitignore
├── backend/
│   ├── api.http
│   ├── controllers/
│   │   ├── posts.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── comments.model.js
│   │   ├── connections.model.js
│   │   ├── posts.model.js
│   │   ├── profile.model.js
│   │   └── user.model.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes/
│   │   ├── posts.routes.js
│   │   └── user.routes.js
│   └── server.js
└── frontend/
    ├── .env
    ├── .eslintrc.json
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   └── images/
    │       ├── banner.jpg
    │       ├── img1.jpg
    │       └── img2.png
    ├── README.md
    └── src/
        ├── Components/
        │   └── Navbar/
        │       ├── index.jsx
        │       └── styles.module.css
        ├── config/
        │   ├── index.jsx
        │   └── redux/
        │       ├── action/
        │       │   ├── authAction/
        │       │   │   └── index.js
        │       │   └── postAction/
        │       │       └── index.js
        │       ├── reducer/
        │       │   ├── authReducer/
        │       │   │   └── index.js
        │       │   └── postReducer/
        │       │       └── index.js
        │       └── store.js
        ├── layout/
        │   ├── DashboardLayout/
        │   │   ├── index.jsx
        │   │   └── index.module.css
        │   └── UserLayout/
        │       └── index.jsx
        ├── pages/
        │   ├── _app.js
        │   ├── _document.js
        │   ├── api/
        │   │   └── hello.js
        │   ├── dashboard/
        │   │   ├── index.jsx
        │   │   └── style.module.css
        │   ├── discover/
        │   │   ├── index.jsx
        │   │   └── index.module.css
        │   ├── index.jsx
        │   ├── login/
        │   │   ├── index.jsx
        │   │   └── style.module.css
        │   ├── my_connections/
        │   │   ├── index.jsx
        │   │   └── index.module.css
        │   ├── profile/
        │   │   ├── index.jsx
        │   │   └── index.module.css
        │   └── view_profile/
        │       ├── [username].jsx
        │       └── index.module.css
        ├── styles/
        │   ├── globals.css
        │   └── Home.module.css
        └── utils/
            └── uploadImage.js


---

## ✨ Future Enhancements

- ✅ Notifications system
- 🔎 Full-text search for profiles and posts
- 💬 Real-time messaging between users
- 📱 Mobile app version using React Native
- 🕵️ Admin dashboard for managing users and content

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---