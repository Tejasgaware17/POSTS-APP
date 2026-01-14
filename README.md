# POSTS-APP

A backend REST API for creating and managing posts with authentication, likes, and comments — built using **Node.js, Express, and MongoDB**.

This project is a learning-focused backend application designed with clean structure and scalability in mind.

---

## 🚀 Features

- User authentication using **JWT** (Register & Login)
- Secure, protected routes
- Full **CRUD** operations for posts
- Like / Unlike posts
- Commenting system
- Input validation via middleware
- Rate limiting and security headers
- Clean and modular folder structure

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Security**: Helmet, Express Rate Limit
- **Testing**: Postman
- **Hosting**: Render (temporary)

---

## 📁 Project Structure

```bash
POSTS-APP/
    ├── config/
    ├── controllers/
    ├── errors/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── .env.example
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── server.js          # server
    └── README.md
```

## 🔧 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/Tejasgaware17/POSTS-APP.git
cd POSTS-APP
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file using the provided example:

```bash
cp .env.example .env
```

Fill in the required values in `.env`.

### 4. Run the server

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `api/v1/auth/register` | Register a new user   |
| POST   | `api/v1/auth/login`    | Login and receive JWT |

### Posts

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| GET    | `api/v1/posts`     | Get all posts                |
| GET    | `api/v1/posts/:id` | Get a single post by ID      |
| POST   | `api/v1/posts`     | Create a new post (auth)     |
| PUT    | `api/v1/posts/:id` | Update a post (auth + owner) |
| DELETE | `api/v1/posts/:id` | Delete a post (auth + owner) |

### Explore

| Method | Endpoint       | Description                    |
| ------ | ------------   | ------------------------------ |
| GET    | `/api/v1/explore` | View all posts              |
| GET    | `/api/v1/explore/:id` | Get a single post by ID |

### Likes

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| POST   | `api/v1/explore/:id/like` | Toggle like on a post |

---

## 🌐 Live Demo

Project was deployed on Render link: [bubleposts-api.onrender.com](bubbleposts-api.onrender.com) <br>
Deployment is temporary and may go offline.

>If the live URL is unavailable, please run the project locally using the steps above.

Check the GitHub repo or stay connected with me via **LinkedIn** for future updates related to the live URL of the project when available.

---

## 📄 License

This project is **unlicensed**. <br>
The code is not intended for reuse or redistribution.

---

## 👤 Author

### Tejas Gaware

This project is part of my Software developer journey.
Feedback and suggestions are always welcome.

---