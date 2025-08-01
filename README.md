# POSTS-APP

A **backend API** that powers post creation, likes, comments, authentication, and more — built with **Node.js, Express, and MongoDB**.

---

## Features

- **User Authentication** using JWT (Register & Login)
- **Protected Routes** with token-based access
- **Create / Read / Update / Delete (CRUD)** posts
- **Like & Unlike** functionality
- **Commenting system**
- **Filters & Search** for exploring posts
- **Validation** using middleware
- **Clean folder structure** for easy scaling
- Easily extendable (more features coming soon)

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT), Bcrypt
- **Hosting**: Render
- **Testing**: Postman

---

## Project Structure

```bash
├── config/
├── controllers/
├── errors/
├── models/
├── routes/
├── middlewares/
├── .env
└── server.js
```

## 🔧 Getting Started (Local Setup)

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/bubbleposts-api.git

# 2. Install dependencies
cd bubbleposts-api
npm install

# 3. Add your environment variables
touch .env

### Sample .env:
MONGODB_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key

# 4. Run the server in development mode
npm run dev
```

---

## API Endpoints
**Authentication**

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `api/v1/auth/register` | Register a new user   |
| POST   | `api/v1/auth/login`    | Login and receive JWT |


**Posts**

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| GET    | `api/v1/posts`     | Get all posts                |
| GET    | `api/v1/posts/:id` | Get a single post by ID      |
| POST   | `api/v1/posts`     | Create a new post (auth)     |
| PUT    | `api/v1/posts/:id` | Update a post (auth + owner) |
| DELETE | `api/v1/posts/:id` | Delete a post (auth + owner) |


**Explore**

| Method | Endpoint       | Description                    |
| ------ | ------------   | ------------------------------ |
| GET    | `/api/v1/explore` | View all posts              |
| GET    | `/api/v1/explore/:id` | Get a single post by ID |


**Likes**

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| POST   | `api/v1/explore/:id/like` | Toggle like on a post |

---


## Try It Out
Project was deployed on Render link: [bubleposts-api.onrender.com](bubbleposts-api.onrender.com)<br>
Deployment is temporary and may go offline. Check the GitHub repo or LinkedIn post for live URL when available.

---

## Contributing

This project is currently a solo learning project, but contributions are welcome for future extensions. Feel free to fork and submit a PR.

---

## About the Author

Made by ~ *Tejas Gaware*

Sharing this project as part of my backend development journey using the MERN stack. Feedback, collaborations, and suggestions are welcome!