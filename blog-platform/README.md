# TechBlog - Full-Stack Blog Platform

A production-ready blog platform built with React, Node.js/Express, MongoDB, and JWT authentication. Featuring advanced comment threading, rich text editing, and comprehensive content management.

## 🚀 Features

### Frontend (React)
- ✅ Responsive design (mobile to desktop)
- ✅ User authentication (login/signup)
- ✅ Role-based access (readers/writers)
- ✅ Post creation with rich text editor
- ✅ Advanced comment system with nested replies
- ✅ Post search and filtering
- ✅ Category-based organization
- ✅ Author profiles with post history
- ✅ User dashboard
- ✅ Toast notifications

### Backend (Node.js + Express)
- ✅ JWT authentication
- ✅ RESTful API with comprehensive endpoints
- ✅ MongoDB integration with Mongoose
- ✅ Data validation and sanitization
- ✅ Role-based authorization
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Rich text sanitization (XSS prevention)

### Database (MongoDB)
- ✅ User model with password hashing
- ✅ Post model with slug generation
- ✅ Comment model with nested threading
- ✅ Category and Tag models
- ✅ Proper indexing for performance

## 📋 Tech Stack

- **Frontend:** React 18, React Router, Axios, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT
- **Security:** bcryptjs, sanitize-html
- **Styling:** CSS3 with modern features

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to backend directory:
```bash
cd blog-platform/backend
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://Classforge:Jivithesh@123456@cluster0.cjeudzt.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGIN=http://localhost:5173
```

4. Install dependencies:
```bash
npm install
```

5. Seed the database (optional):
```bash
npm run seed
```

6. Start the server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd blog-platform/frontend
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

4. Install dependencies:
```bash
npm install
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/register
- Body: { name, email, password, confirmPassword, role }
- Returns: { token, user }

POST /api/auth/login
- Body: { email, password }
- Returns: { token, user }

GET /api/auth/profile (protected)
- Returns: { user }

POST /api/auth/logout
```

### Posts Endpoints

```
GET /api/posts
- Query: ?category=tech&page=1&limit=10&sort=-createdAt
- Returns: { posts, total, pages }

GET /api/posts/:slug
- Returns: { post with author info }

POST /api/posts (protected, writer role)
- Body: { title, content, excerpt, category, tags, status }

PUT /api/posts/:id (protected, author only)
- Body: { title, content, excerpt, category, tags, status }

DELETE /api/posts/:id (protected, author only)

GET /api/posts/search?q=keyword
- Returns: { posts, total, query }

GET /api/posts/user/:userId
- Returns: { posts, total, pages }
```

### Comments Endpoints

```
GET /api/comments/:postId/comments
- Query: ?sort=-createdAt
- Returns: { comments with nested replies }

POST /api/comments/:postId/comments (protected)
- Body: { content, parentCommentId (optional) }

PUT /api/comments/:commentId (protected, author)
- Body: { content }

DELETE /api/comments/:commentId (protected, author)

POST /api/comments/:commentId/like (protected)

PUT /api/comments/:commentId/approve (protected, admin)
```

### Users Endpoints

```
GET /api/users/:userId
- Returns: { user profile with post count }

GET /api/users/:userId/posts
- Query: ?page=1&limit=10&sort=-createdAt
- Returns: { posts, total, pages }

PUT /api/users/profile (protected)
- Body: { name, bio, avatar, socialLinks }

POST /api/users/:userId/follow (protected)

GET /api/users/my/comments (protected)
- Query: ?page=1&limit=10
- Returns: { comments, total, pages }
```

### Categories & Tags Endpoints

```
GET /api/categories
- Returns: [ { name, slug, description, postCount } ]

GET /api/categories/:slug
- Returns: { category }

GET /api/tags
- Returns: [ { name, slug, postCount } ]
```

## 🗂️ Project Structure

```
blog-platform/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, validation, sanitization
│   ├── utils/           # Helpers, constants
│   ├── server.js        # Express app
│   ├── seed.js          # Database seeder
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API services
│   │   ├── styles/      # CSS files
│   │   ├── App.jsx      # Main app
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   └── package.json
```

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Input validation and sanitization
- ✅ XSS prevention through sanitize-html
- ✅ CORS configuration
- ✅ Role-based access control
- ✅ Protected routes

## 📝 Key Features Explained

### Comment Threading
The comment system supports nested replies up to 5 levels deep. When fetching comments, the API returns parent comments with all replies nested within them. This creates a tree-like structure perfect for threaded discussions.

```javascript
// Example response structure
{
  _id: "123",
  content: "Great post!",
  authorId: { name: "John", avatar: "..." },
  replies: [
    {
      _id: "124",
      content: "I agree!",
      authorId: { name: "Jane", avatar: "..." },
      replies: [
        // More nested replies...
      ]
    }
  ]
}
```

### Rich Text Editing
Posts can contain formatted HTML content. The backend sanitizes all HTML to prevent XSS attacks while preserving formatting.

### Slug Generation
Post slugs are automatically generated from titles and made unique using a counter if needed.

### View Count
Post view count is incremented each time a published post is viewed.

## 🚀 Deployment

### Backend Deployment (Render.com or Railway)

1. Push code to GitHub
2. Create new web service on Render/Railway
3. Connect your repository
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `CORS_ORIGIN=your-frontend-url`
5. Deploy!

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `VITE_API_URL=your-backend-url/api`
4. Deploy!

## 📊 Database Models

### User
```javascript
{
  name, email, password (hashed),
  avatar, bio, socialLinks,
  role (reader/writer/admin),
  followerCount, followers,
  createdAt, updatedAt
}
```

### Post
```javascript
{
  title, slug (unique), content (HTML),
  excerpt, featuredImage, authorId (ref),
  category, tags, metaDescription,
  status (draft/published/scheduled),
  publishedAt, scheduledAt,
  viewCount, commentCount,
  createdAt, updatedAt
}
```

### Comment
```javascript
{
  postId (ref), authorId (ref),
  content, parentCommentId (optional ref),
  approved, likes, likeCount, replyCount,
  createdAt, updatedAt
}
```

## 🧪 Testing Checklist

- [ ] User registration (both reader and writer roles)
- [ ] User login/logout
- [ ] Create blog post as writer
- [ ] Edit own post
- [ ] Delete own post
- [ ] Publish draft
- [ ] View all posts
- [ ] Filter by category
- [ ] Search posts
- [ ] View post details
- [ ] Add comment to post
- [ ] Reply to comment (nested)
- [ ] Like comment
- [ ] Delete own comment
- [ ] View author profile
- [ ] Pagination
- [ ] Error handling

## 📄 License

MIT License - feel free to use this project for your own purposes

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.

---

**Built with ❤️ - TechBlog Platform**
