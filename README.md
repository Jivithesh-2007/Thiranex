# ClassForge - Idea Submission Portal

A complete, production-ready full-stack MERN web application for managing and reviewing innovative ideas in an educational environment.

## 🚀 Features

### Authentication & Authorization
- **Role-based access control**: Student, Teacher, Admin
- **Secure authentication**: JWT tokens with bcrypt password hashing
- **Email-based domains**: Different domains for students (@karunya.edu.in) and teachers (@karunya.edu)
- **Password recovery**: OTP-based password reset via email
- **No mock data**: All data stored in MongoDB Atlas

### Student Features
- **Dashboard Analytics**: View total, pending, approved, rejected, and merged ideas
- **Submit Ideas**: Create new ideas with title, description, domain, and tags
- **Manage Ideas**: Edit and delete pending ideas before review
- **View Feedback**: See teacher/admin feedback on submitted ideas
- **Real-time Notifications**: Get instant updates on idea status changes
- **Group Collaboration**: Create groups and invite other students
- **Group Submissions**: Submit ideas as a group

### Teacher Features
- **Review Dashboard**: View all pending student submissions
- **Approve/Reject Ideas**: Review ideas with optional feedback
- **Similarity Detection**: Automatically detect similar ideas
- **Merge Ideas**: Combine duplicate or similar ideas while preserving credits
- **Student Management**: View all registered students
- **Analytics**: Track submission statistics

### Admin Features
- **Full CRUD Access**: Complete control over all ideas and users
- **User Management**: Activate, deactivate, or delete users
- **System Analytics**: Monitor overall system statistics
- **Content Moderation**: Delete inappropriate content

### Real-time Features
- **Socket.io Integration**: Live notifications and updates
- **Instant Status Updates**: Real-time idea status changes
- **Merge Notifications**: Notify all contributors when ideas are merged

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **React Router DOM** for routing
- **Axios** for API calls
- **Socket.io Client** for real-time communication
- **React Icons** for UI icons
- **CSS Modules** for styling (no UI libraries)

### Backend
- **Node.js** & **Express.js**
- **MongoDB Atlas** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **Nodemailer** (Gmail SMTP) for emails
- **Socket.io** for real-time notifications
- **CORS** enabled

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (connection string provided)
- **Gmail account** (for sending emails - credentials provided)

## 🔧 Installation & Setup

### 1. Clone or Navigate to Project Directory

```bash
cd /Users/Jivithesh/.zenflow/worktrees/new-task-2a39
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The .env file is already configured with:
# - MongoDB Atlas connection string
# - JWT secret key
# - Gmail SMTP credentials
# No additional configuration needed!

# Start the backend server
npm run dev
```

The backend server will start on **http://localhost:5001**

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:5173**

## 🎯 Usage

### 1. Access the Application

Open your browser and navigate to: **http://localhost:5173**

### 2. Create an Account

Click on "Create Account" and fill in:
- **Full Name**: Your full name
- **Username**: Your username (without domain)
- **Domain**: 
  - Select `@karunya.edu.in` for Student role
  - Select `@karunya.edu` for Teacher role
- **Department**: Your department
- **Password**: Minimum 6 characters

The system automatically assigns roles based on email domain!

### 3. Role-Based Access

**Student Login:**
- Use email ending with `@karunya.edu.in`
- Access student dashboard
- Submit and manage ideas
- View feedback and notifications

**Teacher Login:**
- Use email ending with `@karunya.edu`
- Access teacher dashboard
- Review student submissions
- Approve, reject, or merge ideas
- View registered students

**Admin Login:**
- Create an admin user manually in MongoDB or modify a user's role to 'admin'
- Full system access and control
- Manage all users and ideas

### 4. Password Reset

If you forget your password:
1. Click "Forgot password?" on login page
2. Enter your username and domain
3. Check your email for OTP (6-digit code)
4. Enter OTP and set new password

## 🗄️ Database Structure

### Collections

1. **users**: User accounts (students, teachers, admins)
2. **ideas**: Idea submissions
3. **groups**: Student groups
4. **notifications**: Real-time notifications
5. **otps**: OTP for password recovery (auto-expires)
6. **mergehistories**: Track idea merges

## 📧 Email Notifications

The system sends automated emails for:
- **Password Reset**: OTP for password recovery
- **Idea Status**: Approval/rejection notifications
- **Group Invites**: Invitation to join groups
- **Merge Notifications**: When ideas are merged

All emails are sent from: **jivithesha@karunya.edu.in**

## 🔐 Environment Variables

### Backend (.env)

The following environment variables are already configured:

```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb+srv://Classforge:Jivithesh123456@cluster0.cjeudzt.mongodb.net/classforge?retryWrites=true&w=majority
JWT_SECRET=classforge_secret_key_2024_jivithesh
FRONTEND_URL=http://localhost:5173

EMAIL_SERVICE=gmail
EMAIL_USER=jivithesha@karunya.edu.in
EMAIL_PASSWORD=htgr eugg rwbm miau
EMAIL_FROM=jivithesha@karunya.edu.in
```

**⚠️ Important**: These credentials are provided for development. For production, use your own MongoDB cluster and email credentials.

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile

### Ideas
- `POST /api/ideas` - Create idea (Student)
- `GET /api/ideas` - Get ideas (filtered by role)
- `GET /api/ideas/:id` - Get single idea
- `PUT /api/ideas/:id` - Update idea
- `DELETE /api/ideas/:id` - Delete idea
- `POST /api/ideas/:id/review` - Review idea (Teacher/Admin)
- `GET /api/ideas/:id/similar` - Get similar ideas (Teacher/Admin)
- `POST /api/ideas/merge` - Merge ideas (Teacher/Admin)
- `GET /api/ideas/stats/student` - Student statistics
- `GET /api/ideas/stats/teacher` - Teacher statistics

### Groups
- `POST /api/groups` - Create group (Student)
- `GET /api/groups` - Get user's groups
- `POST /api/groups/:id/invite` - Invite to group
- `POST /api/groups/:id/accept` - Accept invitation
- `POST /api/groups/:id/reject` - Reject invitation

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/toggle-status` - Activate/deactivate user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - System statistics

## 🎨 Design Features

- **Clean, modern UI**: White and light blue color scheme
- **Responsive layout**: Works on all screen sizes
- **CSS Modules**: Scoped styling for each component
- **React Icons**: Professional iconography throughout
- **Real-time updates**: Socket.io for instant notifications
- **User-friendly forms**: Password visibility toggle, validation

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Role-based Access**: Middleware-protected routes
- **Input Validation**: Server-side validation
- **CORS Enabled**: Configured for frontend-backend communication
- **OTP Expiration**: Auto-expiring OTPs for security

## 📱 Socket.io Events

### Client → Server
- `join`: Join user's notification room

### Server → Client
- `notification`: New notification received
- `connect`: Connection established
- `disconnect`: Connection closed

## 🧪 Testing the Application

### Test Student Account Creation
1. Signup with email: `testuser@karunya.edu.in`
2. Login and access student dashboard
3. Submit a new idea
4. View analytics and notifications

### Test Teacher Account Creation
1. Signup with email: `teacher@karunya.edu`
2. Login and access teacher dashboard
3. Review pending ideas
4. Approve/reject with feedback

### Test Password Reset
1. Click "Forgot password?"
2. Enter registered email
3. Check email for OTP
4. Reset password

## 🚀 Production Deployment

For production deployment:

1. **Update Environment Variables**:
   - Use production MongoDB URI
   - Change JWT secret
   - Use production email credentials
   - Update FRONTEND_URL

2. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy Backend**: Use services like Heroku, DigitalOcean, or AWS
4. **Deploy Frontend**: Use Vercel, Netlify, or similar
5. **Enable HTTPS**: Use SSL certificates
6. **Configure CORS**: Update allowed origins

## 📂 Project Structure

```
classforge/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── ideaController.js
│   │   ├── groupController.js
│   │   ├── notificationController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Idea.js
│   │   ├── Group.js
│   │   ├── Notification.js
│   │   ├── OTP.js
│   │   └── MergeHistory.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── ideaRoutes.js
│   │   ├── groupRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── adminRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── similarityService.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── password.js
│   │   └── otp.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Header/
    │   │   ├── Sidebar/
    │   │   ├── StatCard/
    │   │   └── ProtectedRoute/
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login/
    │   │   ├── Signup/
    │   │   ├── ForgotPassword/
    │   │   ├── StudentDashboard/
    │   │   ├── TeacherDashboard/
    │   │   ├── AdminDashboard/
    │   │   └── Notifications/
    │   ├── services/
    │   │   ├── api.js
    │   │   └── socket.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .gitignore
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🤝 Support

For issues or questions:
- Check the console logs for errors
- Verify MongoDB connection
- Ensure both frontend and backend are running
- Check email credentials if OTP not received

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Author

**Jivithesh A S**
- Email: jivithesha@karunya.edu.in

---

**Happy Coding! 🎉**
