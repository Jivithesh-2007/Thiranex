# Setup Guide - Blog Platform

## Quick Start (5 minutes)

### 1. Backend Setup

```bash
# Navigate to backend
cd blog-platform/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The .env file should contain:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://Classforge:Jivithesh@123456@cluster0.cjeudzt.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGIN=http://localhost:5173

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

✅ Backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd blog-platform/frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The .env file should contain:
VITE_API_URL=http://localhost:5000/api

# Start frontend development server
npm run dev
```

✅ Frontend will run on `http://localhost:5173`

## Testing the Application

### Test Account Credentials (from seed.js)

**Writer Account:**
- Email: `john@example.com`
- Password: `password123`
- Role: Writer

**Reader Account:**
- Email: `alice@example.com`
- Password: `password123`
- Role: Reader

### Basic Testing Flow

1. **Visit Home Page**
   - Open `http://localhost:5173`
   - See featured posts

2. **Login as Writer**
   - Click "Login"
   - Use john@example.com / password123
   - Should redirect to home

3. **Create a Post**
   - Click "✍️ Write" in header
   - Fill in post details
   - Click "Publish"

4. **View Blog**
   - Go to "/blog"
   - See all published posts
   - Filter by category
   - Search posts

5. **View Post Detail**
   - Click on any post
   - See full content
   - Add comments
   - Reply to comments

6. **Test Comments**
   - Add a comment
   - Reply to your comment
   - Like comments
   - Delete comments

7. **View Author Profile**
   - Click on author name
   - See author info
   - See their posts

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is available
lsof -i :5000

# Kill process if needed
kill -9 <PID>

# Or change PORT in .env
```

### Database Connection Error
```
✗ MongoDB connection failed: connect ECONNREFUSED

- Check MONGODB_URI in .env is correct
- Verify IP whitelist in MongoDB Atlas (add 0.0.0.0/0)
- Check internet connection
```

### Frontend Can't Connect to Backend
```
- Verify backend is running on port 5000
- Check VITE_API_URL in .env starts with http://
- Check CORS_ORIGIN in backend .env matches frontend URL
```

### Seed Script Fails
```bash
# Clear collections and reseed
rm ~/.mongod.lock  # if using local MongoDB
npm run seed
```

## Development Tools

### View MongoDB Data
1. Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas
2. Collections tab → Select your database
3. View documents in each collection

### API Testing with cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123","confirmPassword":"password123","role":"reader"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get posts
curl http://localhost:5000/api/posts

# Get post by slug
curl http://localhost:5000/api/posts/getting-started-with-react-hooks
```

### Browser DevTools

- **Network Tab**: Monitor API calls
- **Application Tab**: Check localStorage for token
- **Console**: Check for errors
- **React DevTools**: Debug component state

## Production Deployment

### Backend (Render.com)

1. Push code to GitHub
2. Create Render account and connect GitHub
3. Create new "Web Service"
4. Select repository and branch
5. Set runtime to Node
6. Add environment variables from .env
7. Deploy!

### Frontend (Vercel)

1. Push code to GitHub
2. Create Vercel account and import GitHub repo
3. Select `/frontend` as root directory
4. Add environment variables
5. Deploy!

## Environment Variables Reference

### Backend (.env)
| Variable | Example | Notes |
|----------|---------|-------|
| PORT | 5000 | Development: 5000, Production: dynamic |
| NODE_ENV | development | development or production |
| MONGODB_URI | mongodb+srv://... | Your MongoDB Atlas connection string |
| JWT_SECRET | your-secret-key | Use a strong random string in production |
| CORS_ORIGIN | http://localhost:5173 | Frontend URL |

### Frontend (.env)
| Variable | Example | Notes |
|----------|---------|-------|
| VITE_API_URL | http://localhost:5000/api | Backend API URL |

## NPM Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start with Nodemon
- `npm run seed` - Seed database

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## File Structure Checklist

Backend should have:
```
✅ models/ (User, Post, Comment, Category, Tag)
✅ controllers/ (auth, post, comment, user, category, tag)
✅ routes/ (auth, posts, comments, users, categories, tags)
✅ middleware/ (auth, admin, validation, sanitize, errorHandler)
✅ utils/ (slug.js, constants.js)
✅ server.js
✅ seed.js
✅ .env.example
✅ .gitignore
✅ package.json
```

Frontend should have:
```
✅ src/components/ (Header, PostCard, Comment, etc)
✅ src/pages/ (Home, Blog, PostDetail, etc)
✅ src/context/ (AuthContext, BlogContext)
✅ src/hooks/ (useAuth, useFetch, useBlog)
✅ src/services/ (api, auth, post, comment, user)
✅ src/styles/ (App.css, Header.css, etc)
✅ src/App.jsx
✅ src/main.jsx
✅ index.html
✅ vite.config.js
✅ .env.example
✅ .gitignore
✅ package.json
```

## Performance Tips

1. **MongoDB Indexing** - Already included in models
2. **Pagination** - Default 10 posts per page
3. **Lazy Loading** - Images load on demand
4. **Caching** - Use browser cache for static assets
5. **API Response Size** - Select only needed fields

## Security Checklist

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens used for authentication
- ✅ HTML sanitized to prevent XSS
- ✅ CORS configured
- ✅ Environment variables not exposed
- ✅ Protected routes require authentication
- ✅ Role-based authorization

---

**Happy blogging! 🚀**
