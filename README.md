# 🌐 SocialHub - Social Media Platform

A full-stack social media application with authentication, post management, and real-time engagement features.

![Platform Preview](https://img.shields.io/badge/Status-Live-success)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)

## 🚀 Live Demo

- **Frontend**: [https://fast-api-social-platform.vercel.app](https://fast-api-social-platform.vercel.app)
- **Backend API**: [https://fastapi-social-platform.onrender.com/docs](https://fastapi-social-platform.onrender.com/docs)

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 📝 **Post Management** - Create, edit, and delete posts
- ❤️ **Like System** - Like and unlike posts
- 💬 **Comments** - Real-time commenting on posts
- 🔄 **Feed Sorting** - Sort by newest, oldest, or most popular
- 👤 **User Profiles** - Username-based identification
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⏰ **Timestamps** - "2 hours ago" style time formatting

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Relational database (hosted on Neon)
- **SQLAlchemy** - ORM for database operations
- **JWT** - Token-based authentication
- **Pydantic** - Data validation

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

### Deployment
- **Render** - Backend hosting
- **Vercel** - Frontend hosting
- **Neon** - PostgreSQL database hosting

## 📦 Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL database (or use Neon)

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/Rashed-AlAmin/FastAPI-social-platform.git
cd social-media-platform
```

2. Install Python dependencies
```bash
pip install -r requirements.txt
```

3. Create `.env` file
```env
DATABASE_URL=postgresql://user:password@host/database
DB_FORCE_ROLL_BACK=False
```

4. Run the backend
```bash
uvicorn storeapi.main:app --reload
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
VITE_API_URL=http://localhost:8000
```

4. Run the frontend
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📸 Screenshots

### Home Feed
![Feed](screenshots/feed.PNG)

### Post Details & Comments
![Comments](screenshots/comments.PNG)

## 🔑 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /token` - Login and get JWT token
- `GET /me` - Get current user info

### Posts
- `GET /post` - Get all posts (with sorting)
- `POST /post` - Create new post
- `GET /post/{id}` - Get single post with comments
- `PUT /post/{id}` - Update post (own posts only)
- `DELETE /post/{id}` - Delete post (own posts only)

### Engagement
- `POST /like` - Like a post
- `POST /comment` - Comment on a post
- `GET /post/{id}/comment` - Get all comments for a post

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables (`DATABASE_URL`)
3. Deploy with: `uvicorn storeapi.main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)
1. Connect GitHub repository
2. Set root directory to `frontend`
3. Set environment variable: `VITE_API_URL`
4. Deploy

## 📝 Environment Variables

### Backend
```env
DATABASE_URL=postgresql://...
DB_FORCE_ROLL_BACK=False
```

### Frontend
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rashed Al Amin**
- GitHub: [Rashed-AlAmin](https://github.com/Rashed-AlAmin)
- LinkedIn: [md-rashed-al-amin](https://www.linkedin.com/in/md-rashed-al-amin)

## 🙏 Acknowledgments

- FastAPI documentation
- React documentation
- Tailwind CSS
- Neon Database
- Render & Vercel for hosting

---

⭐ If you found this project helpful, please give it a star!