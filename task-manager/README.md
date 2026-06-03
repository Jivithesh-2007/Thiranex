# Task Management Web Application

A complete, production-ready task management application built with React.js, Node.js/Express, MongoDB, and JWT authentication.

## 🚀 Features

### Authentication & Security
- ✅ User registration with email validation
- ✅ Password strength validation (min 8 chars, uppercase, lowercase, number)
- ✅ Secure password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token-based authentication (30-day expiry)
- ✅ Protected routes and API endpoints
- ✅ Automatic token refresh on expiration
- ✅ Remember me functionality
- ✅ CORS security configuration
- ✅ Rate limiting on auth endpoints

### Task Management
- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Task properties: title, description, due date, priority, category, completion status
- ✅ Filter tasks: All, Pending, Completed
- ✅ Sort tasks: By date (newest first), priority (high→low), title (A-Z)
- ✅ Search tasks by title
- ✅ Mark tasks as complete/incomplete
- ✅ Task count tracking
- ✅ Overdue task detection
- ✅ Task completion timestamp

### User Interface
- ✅ Modern, clean design with smooth animations
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Form validation with error messages
- ✅ Loading states and spinners
- ✅ Success/error toast notifications
- ✅ Confirmation modals for destructive actions
- ✅ Empty state messages
- ✅ User profile display
- ✅ Color-coded priority and category badges
- ✅ Intuitive sidebar navigation
- ✅ User dropdown menu

### Developer Experience
- ✅ Clean, well-documented code
- ✅ Proper error handling
- ✅ Environment variables for configuration
- ✅ DRY principles and reusable components
- ✅ Meaningful variable and function names
- ✅ Comments for complex logic
- ✅ No console errors or warnings
- ✅ Production-ready code quality

## 📋 Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router 6.15** - Client-side routing
- **Axios 1.5** - HTTP client
- **Vite 4.5** - Build tool and dev server
- **CSS3** - Styling with custom properties

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18** - Web framework
- **MongoDB 7.5** - Database
- **Mongoose 7.5** - ODM (Object Data Modeling)
- **JWT 9.0** - Token authentication
- **bcryptjs 2.4** - Password hashing
- **Express Validator 7.0** - Input validation
- **Helmet 7.0** - Security headers
- **CORS 2.8** - Cross-origin requests
- **Express Rate Limit 7.0** - Rate limiting

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

1. **Clone and navigate to backend:**
```bash
cd task-manager/backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Update `.env` with your values:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://Classforge:Jivithesh@123456@cluster0.cjeudzt.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=30d
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

5. **Start the backend server:**
```bash
# Development with auto-reload
npm run dev

# Or production mode
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. **Open new terminal and navigate to frontend:**
```bash
cd task-manager/frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file (optional for development):**
```bash
VITE_API_URL=http://localhost:5000/api
```

4. **Start the development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (protected)
  - Query params: `?status=pending&sort=date&search=title`
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `PUT /api/tasks/:id/toggle` - Toggle task completion (protected)

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String (required, max 100),
  description: String (optional, max 1000),
  dueDate: Date (optional),
  priority: String (enum: 'low', 'medium', 'high'),
  category: String (enum: 'work', 'personal', 'urgent', 'other'),
  completed: Boolean,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Component Structure

### Frontend Components
```
src/
├── components/          # Reusable UI components
│   ├── index.jsx       # Shared components (Toast, Modal, Spinner, Badge)
│   ├── Navbar.jsx      # Top navigation bar
│   ├── Sidebar.jsx     # Left sidebar navigation
│   ├── TaskForm.jsx    # Create/edit task form
│   ├── TaskCard.jsx    # Individual task display
│   ├── TaskList.jsx    # Task list container
│   └── FilterBar.jsx   # Filter and sort controls
├── pages/              # Page components
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   └── DashboardPage.jsx
├── context/            # State management
│   ├── AuthContext.jsx
│   └── TaskContext.jsx
├── hooks/              # Custom React hooks
│   ├── useAuth.js
│   ├── useTask.js
│   └── useFetch.js
├── services/           # API service modules
│   ├── api.js
│   ├── authService.js
│   └── taskService.js
├── styles/
│   └── App.css         # All styling
├── App.jsx             # Main app with routing
└── main.jsx            # Entry point
```

### Backend Structure
```
backend/
├── models/
│   ├── User.js
│   └── Task.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── routes/
│   ├── auth.js
│   └── tasks.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
├── server.js           # Main server file
├── package.json
├── .env.example
└── .gitignore
```

## 🔒 Security Features

1. **Password Security**
   - Minimum 8 characters required
   - Must contain uppercase, lowercase, and number
   - Hashed with bcryptjs (10 salt rounds)
   - Never stored in plain text

2. **JWT Authentication**
   - 30-day token expiration
   - Signed with secret key
   - Validated on every protected request
   - Auto-logout on token expiration

3. **Input Validation**
   - Frontend validation for UX
   - Backend validation for security
   - Email format validation
   - Sanitization of inputs

4. **Database Security**
   - User data isolation (users see only their tasks)
   - MongoDB indexes for performance
   - Connection pooling

5. **HTTP Security**
   - CORS properly configured
   - Helmet.js for security headers
   - Rate limiting on auth endpoints
   - No sensitive data in responses

## 🧪 Testing Checklist

### Authentication Tests
- [ ] Register new user with valid data
- [ ] Register fails with duplicate email
- [ ] Password validation works (min 8 chars, uppercase, lowercase, number)
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Protected routes redirect to login when not authenticated
- [ ] Token persists in localStorage
- [ ] Page refresh maintains authentication
- [ ] Logout clears token and redirects

### Task Tests
- [ ] Create task with all fields
- [ ] Create task with only required fields
- [ ] View all user's tasks
- [ ] Edit existing task
- [ ] Delete task with confirmation
- [ ] Mark task complete/incomplete
- [ ] Toggle task completion status
- [ ] Filter tasks by status (All, Pending, Completed)
- [ ] Sort tasks by date
- [ ] Sort tasks by priority
- [ ] Sort tasks by title
- [ ] Search tasks by title
- [ ] User cannot access other user's tasks

### UI/UX Tests
- [ ] Form validation errors display correctly
- [ ] Loading spinners show during API calls
- [ ] Success/error toast notifications display
- [ ] Confirmation modals work for delete
- [ ] Mobile responsive design works
- [ ] Animations are smooth
- [ ] All buttons are clickable
- [ ] No console errors
- [ ] Empty state displays when no tasks

### Deployment Tests
- [ ] Frontend loads without errors
- [ ] Backend API responds to health check
- [ ] Login works on deployed app
- [ ] Create task works on deployed app
- [ ] Edit task works on deployed app
- [ ] Delete task works on deployed app
- [ ] Filter and sort work on deployed app
- [ ] Cannot access dashboard without authentication

## 🚀 Deployment

### Backend Deployment (Render.com example)

1. **Push code to GitHub**
2. **Connect GitHub to Render**
3. **Add environment variables**
4. **Deploy**

### Frontend Deployment (Vercel example)

1. **Connect GitHub repo to Vercel**
2. **Set build command:** `npm run build`
3. **Set output directory:** `dist`
4. **Add environment variables:**
   - `VITE_API_URL=https://your-backend-url.com/api`
5. **Deploy**

## 📝 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db?appName=Cluster

# JWT
JWT_SECRET=your-very-secure-secret-key-at-least-32-chars
JWT_EXPIRY=30d

# CORS
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 🐛 Troubleshooting

### Connection Issues
- Ensure MongoDB is running/accessible
- Check CORS configuration matches frontend URL
- Verify JWT_SECRET is set and consistent

### Authentication Issues
- Clear localStorage and re-login
- Check token expiration time
- Verify JWT_SECRET hasn't changed

### Task Loading Issues
- Check network tab for API errors
- Verify user ID is correctly passed in requests
- Check MongoDB connection is active

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Documentation](https://jwt.io)
- [Mongoose Documentation](https://mongoosejs.com)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Task Management Application v1.0

Built with ❤️ for efficient task management
