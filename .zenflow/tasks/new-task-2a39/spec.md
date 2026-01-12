# Technical Specification: ClassForge - Idea Submission Portal

## Task Complexity: **HARD**

This is a complex, production-ready full-stack MERN application requiring:
- Complete authentication system with JWT and OTP
- Role-based access control (Student, Teacher, Admin)
- Real-time features with Socket.io
- Email integration with Nodemailer
- Idea similarity detection and merge system
- Group collaboration features
- Professional UI with CSS Modules

---

## Technical Context

### Tech Stack

**Frontend:**
- React 18+ (Vite)
- React Router DOM v6
- Axios for HTTP requests
- CSS Modules for styling
- react-icons (ONLY icon library)
- Socket.io-client for real-time updates

**Backend:**
- Node.js (v18+)
- Express.js
- MongoDB Atlas with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Nodemailer (Gmail SMTP)
- Socket.io for real-time notifications
- dotenv for environment variables

**Development Tools:**
- ESLint (optional, if configured)
- Prettier (optional, if configured)

### Environment Variables

**Backend (.env):**
```
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

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

---

## Implementation Approach

### 1. Project Structure

```
classforge/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── email.js              # Nodemailer configuration
│   ├── controllers/
│   │   ├── authController.js     # Signup, Login, Forgot Password, OTP
│   │   ├── ideaController.js     # CRUD operations for ideas
│   │   ├── groupController.js    # Group management
│   │   ├── userController.js     # User management (Admin)
│   │   ├── notificationController.js  # Notification handling
│   │   └── mergeController.js    # Idea merge operations
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── roleCheck.js          # Role-based access control
│   │   └── errorHandler.js       # Global error handling
│   ├── models/
│   │   ├── User.js
│   │   ├── Idea.js
│   │   ├── Group.js
│   │   ├── Notification.js
│   │   ├── OTP.js
│   │   ├── Feedback.js
│   │   └── MergeHistory.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── ideaRoutes.js
│   │   ├── groupRoutes.js
│   │   ├── userRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── mergeRoutes.js
│   ├── services/
│   │   ├── emailService.js       # Email sending logic
│   │   ├── otpService.js         # OTP generation and validation
│   │   ├── similarityService.js  # Idea similarity detection
│   │   └── notificationService.js # Real-time notifications
│   ├── socket/
│   │   └── socket.js             # Socket.io setup and handlers
│   ├── utils/
│   │   ├── validators.js         # Input validation helpers
│   │   └── helpers.js            # Utility functions
│   ├── .env
│   ├── .gitignore
│   ├── server.js                 # Main entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar/
│   │   │   │   │   ├── Navbar.jsx
│   │   │   │   │   └── Navbar.module.css
│   │   │   │   ├── Sidebar/
│   │   │   │   │   ├── Sidebar.jsx
│   │   │   │   │   └── Sidebar.module.css
│   │   │   │   ├── Card/
│   │   │   │   │   ├── Card.jsx
│   │   │   │   │   └── Card.module.css
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.jsx
│   │   │   │   │   └── Button.module.css
│   │   │   │   ├── Input/
│   │   │   │   │   ├── Input.jsx
│   │   │   │   │   └── Input.module.css
│   │   │   │   └── Modal/
│   │   │   │       ├── Modal.jsx
│   │   │   │       └── Modal.module.css
│   │   │   ├── student/
│   │   │   │   ├── IdeaCard/
│   │   │   │   ├── IdeaForm/
│   │   │   │   ├── GroupCard/
│   │   │   │   └── AnalyticsCard/
│   │   │   ├── teacher/
│   │   │   │   ├── IdeaReviewCard/
│   │   │   │   ├── FeedbackForm/
│   │   │   │   ├── MergeModal/
│   │   │   │   └── StudentCard/
│   │   │   └── admin/
│   │   │       ├── UserManagement/
│   │   │       └── SystemAnalytics/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login/
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   └── Login.module.css
│   │   │   │   ├── Signup/
│   │   │   │   │   ├── Signup.jsx
│   │   │   │   │   └── Signup.module.css
│   │   │   │   ├── ForgotPassword/
│   │   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   │   └── ForgotPassword.module.css
│   │   │   │   ├── VerifyOTP/
│   │   │   │   │   ├── VerifyOTP.jsx
│   │   │   │   │   └── VerifyOTP.module.css
│   │   │   │   └── ResetPassword/
│   │   │   │       ├── ResetPassword.jsx
│   │   │   │       └── ResetPassword.module.css
│   │   │   ├── student/
│   │   │   │   ├── Dashboard/
│   │   │   │   ├── SubmitIdea/
│   │   │   │   ├── MyIdeas/
│   │   │   │   ├── ExploreIdeas/
│   │   │   │   ├── Groups/
│   │   │   │   ├── Notifications/
│   │   │   │   └── Settings/
│   │   │   ├── teacher/
│   │   │   │   ├── Dashboard/
│   │   │   │   ├── ReviewIdeas/
│   │   │   │   ├── ApprovedIdeas/
│   │   │   │   ├── Students/
│   │   │   │   ├── Notifications/
│   │   │   │   └── Settings/
│   │   │   └── admin/
│   │   │       ├── Dashboard/
│   │   │       ├── ManageIdeas/
│   │   │       ├── ManageUsers/
│   │   │       ├── Analytics/
│   │   │       └── Settings/
│   │   ├── services/
│   │   │   ├── api.js             # Axios instance with interceptors
│   │   │   ├── authService.js     # Auth API calls
│   │   │   ├── ideaService.js     # Idea API calls
│   │   │   ├── groupService.js    # Group API calls
│   │   │   ├── userService.js     # User API calls
│   │   │   ├── notificationService.js
│   │   │   └── socketService.js   # Socket.io client setup
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Authentication state
│   │   │   ├── NotificationContext.jsx  # Notifications state
│   │   │   └── ThemeContext.jsx   # Dark/Light mode toggle
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useSocket.js
│   │   │   └── useNotifications.js
│   │   ├── utils/
│   │   │   ├── validators.js      # Form validation
│   │   │   └── helpers.js         # Utility functions
│   │   ├── styles/
│   │   │   ├── global.css         # Global styles
│   │   │   └── variables.css      # CSS variables (colors, spacing)
│   │   ├── App.jsx
│   │   ├── App.module.css
│   │   ├── main.jsx
│   │   └── router.jsx             # React Router setup
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Data Models

### 1. User Schema
```javascript
{
  fullName: String (required),
  username: String (required, unique),
  email: String (required, unique),
  emailDomain: String (required, enum: ['@karunya.edu.in', '@karunya.edu']),
  password: String (required, hashed),
  role: String (required, enum: ['student', 'teacher', 'admin']),
  department: String,
  avatar: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Idea Schema
```javascript
{
  title: String (required),
  description: String (required),
  domain: String (required),
  tags: [String],
  attachments: [String],  // URLs or file paths
  author: ObjectId (ref: 'User'),
  collaborators: [ObjectId] (ref: 'User'),
  status: String (enum: ['pending', 'approved', 'rejected', 'merged'], default: 'pending'),
  feedback: [ObjectId] (ref: 'Feedback'),
  group: ObjectId (ref: 'Group'),
  mergedFrom: [ObjectId] (ref: 'Idea'),  // Original ideas if merged
  mergedInto: ObjectId (ref: 'Idea'),    // Parent merged idea
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Group Schema
```javascript
{
  name: String (required),
  description: String,
  creator: ObjectId (ref: 'User'),
  members: [ObjectId] (ref: 'User'),
  invitations: [{
    user: ObjectId (ref: 'User'),
    status: String (enum: ['pending', 'accepted', 'rejected']),
    sentAt: Date
  }],
  ideas: [ObjectId] (ref: 'Idea'),
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Feedback Schema
```javascript
{
  idea: ObjectId (ref: 'Idea'),
  reviewer: ObjectId (ref: 'User'),
  content: String (required),
  action: String (enum: ['approved', 'rejected', 'edit_suggested']),
  createdAt: Date
}
```

### 5. Notification Schema
```javascript
{
  recipient: ObjectId (ref: 'User'),
  sender: ObjectId (ref: 'User'),
  type: String (enum: ['idea_status', 'merge_request', 'group_invitation', 'feedback', 'system']),
  title: String (required),
  message: String (required),
  relatedIdea: ObjectId (ref: 'Idea'),
  relatedGroup: ObjectId (ref: 'Group'),
  isRead: Boolean (default: false),
  createdAt: Date
}
```

### 6. OTP Schema
```javascript
{
  email: String (required),
  otp: String (required),
  expiresAt: Date (required),
  isUsed: Boolean (default: false),
  createdAt: Date
}
```

### 7. MergeHistory Schema
```javascript
{
  mergedIdea: ObjectId (ref: 'Idea'),
  sourceIdeas: [ObjectId] (ref: 'Idea'),
  contributors: [ObjectId] (ref: 'User'),
  mergedBy: ObjectId (ref: 'User'),
  reason: String,
  createdAt: Date
}
```

---

## API Routes

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - User login
- `POST /forgot-password` - Send OTP to email
- `POST /verify-otp` - Verify OTP code
- `POST /reset-password` - Reset password after OTP verification
- `GET /me` - Get current user (protected)

### Idea Routes (`/api/ideas`)
- `GET /` - Get all ideas (filtered by role)
- `GET /:id` - Get single idea
- `POST /` - Create new idea (student)
- `PUT /:id` - Update idea (student, before review)
- `DELETE /:id` - Delete idea (student, admin)
- `POST /:id/approve` - Approve idea (teacher, admin)
- `POST /:id/reject` - Reject idea with feedback (teacher, admin)
- `GET /my-ideas` - Get current user's ideas (student)
- `GET /pending` - Get pending ideas (teacher, admin)
- `GET /approved` - Get approved ideas (all)
- `GET /rejected` - Get rejected ideas (own or all)

### Group Routes (`/api/groups`)
- `GET /` - Get all groups
- `GET /:id` - Get single group
- `POST /` - Create new group (student)
- `PUT /:id` - Update group (creator)
- `DELETE /:id` - Delete group (creator, admin)
- `POST /:id/invite` - Invite member to group
- `POST /:id/respond` - Accept/Reject invitation
- `POST /:id/leave` - Leave group
- `GET /my-groups` - Get user's groups

### Merge Routes (`/api/merges`)
- `POST /detect-similar` - Detect similar ideas
- `POST /merge` - Merge multiple ideas (teacher, admin)
- `GET /history` - Get merge history
- `GET /history/:id` - Get specific merge details

### User Routes (`/api/users`)
- `GET /` - Get all users (admin, teacher)
- `GET /:id` - Get single user (admin, teacher)
- `PUT /:id` - Update user (admin)
- `DELETE /:id` - Delete user (admin)
- `GET /students` - Get all students (teacher, admin)
- `GET /teachers` - Get all teachers (admin)

### Notification Routes (`/api/notifications`)
- `GET /` - Get user's notifications
- `PUT /:id/read` - Mark notification as read
- `PUT /mark-all-read` - Mark all as read
- `DELETE /:id` - Delete notification

---

## Key Features Implementation

### 1. Authentication Flow
- **Signup**: Email validation (username + domain), password hashing, direct DB storage
- **Login**: Email + password validation, JWT token generation, role-based redirection
- **Forgot Password**: OTP generation → Email → Verify → Reset password → Clear OTP

### 2. Role-Based Dashboards
- **Student**: Analytics (Total, Pending, Approved, Rejected), Create/Edit/Delete ideas, Groups, Notifications
- **Teacher**: Review ideas, Approve/Reject with feedback, Detect similar ideas, Merge ideas, View students
- **Admin**: Full CRUD on all entities, User management, System analytics

### 3. Idea Merge System
- Similarity detection using keyword matching or TF-IDF (basic implementation)
- Merge multiple ideas into one
- Preserve all contributors
- Create merge history record
- Notify all affected users via Socket.io

### 4. Real-Time Notifications (Socket.io)
- Idea status changes
- Merge requests
- Group invitations
- Feedback received
- System announcements

### 5. Group Collaboration
- Create groups
- Invite members via email
- Accept/Reject invitations
- Collaborative idea submissions
- Shared ownership

---

## UI/UX Design Guidelines

### Color Scheme
- **Primary**: Light Blue (#4A90E2, #5BA3F5)
- **Background**: White (#FFFFFF)
- **Secondary Background**: Light Gray (#F5F7FA)
- **Text**: Dark Gray (#2C3E50)
- **Success**: Green (#27AE60)
- **Warning**: Orange (#F39C12)
- **Danger**: Red (#E74C3C)

### Components
- **Navbar**: Logo (ClassForge), Dark mode toggle, Notifications bell, User avatar
- **Sidebar**: Dashboard, Submit Idea, Explore Ideas, My Ideas, Notifications, Settings
- **Cards**: Analytics cards with icons (react-icons), shadow effects, hover states
- **Forms**: Clean inputs with labels, password toggle (eye icon), validation messages
- **Buttons**: Primary (blue), Secondary (gray), Danger (red), with hover effects
- **Modals**: Centered, overlay background, clean close button

### Icons (react-icons)
- Use `react-icons/fa` (FontAwesome), `react-icons/md` (Material Design), `react-icons/bs` (Bootstrap Icons)
- Examples: `FaEye`, `FaEyeSlash`, `FaBell`, `FaPlus`, `FaEdit`, `FaTrash`, `FaUsers`, `FaLightbulb`

---

## Verification Approach

### Backend Testing
1. **Manual Testing**: Use Postman or Thunder Client to test all API endpoints
2. **Database Verification**: Check MongoDB Atlas to ensure data is stored correctly
3. **Email Testing**: Verify OTP emails are sent and received

### Frontend Testing
1. **Manual Testing**: Test all user flows (Signup, Login, Forgot Password, CRUD operations)
2. **Role Testing**: Test each role's dashboard and permissions
3. **Real-time Testing**: Test Socket.io notifications with multiple browser windows
4. **Responsive Testing**: Test on different screen sizes

### Integration Testing
1. Test frontend-backend communication
2. Test file uploads (if implemented)
3. Test email delivery
4. Test WebSocket connections

### Error Handling
1. Validate all API responses
2. Handle network errors gracefully
3. Display user-friendly error messages
4. Log errors for debugging

---

## Security Considerations

1. **Password Security**: Hash passwords with bcrypt (salt rounds: 10)
2. **JWT Security**: Use strong secret, set expiration (24h)
3. **OTP Security**: Expire OTPs after 10 minutes, mark as used
4. **Input Validation**: Validate all inputs on frontend and backend
5. **Rate Limiting**: Implement rate limiting for sensitive routes (login, OTP)
6. **CORS**: Configure CORS properly for frontend origin
7. **Environment Variables**: Never commit .env files to git

---

## Performance Optimizations

1. **Database Indexing**: Add indexes on frequently queried fields (email, username)
2. **Pagination**: Implement pagination for idea lists
3. **Lazy Loading**: Load images and components lazily
4. **Caching**: Use React context for global state
5. **Code Splitting**: Use React.lazy for route-based code splitting

---

## Deployment Considerations

1. **Backend**: Deploy to Render, Railway, or Heroku
2. **Frontend**: Deploy to Vercel or Netlify
3. **Database**: MongoDB Atlas (already configured)
4. **Environment Variables**: Set in deployment platform
5. **CORS**: Update FRONTEND_URL in production
6. **Email**: Ensure Gmail app password works in production

---

## Critical Implementation Notes

1. **NO MOCK DATA**: All data must come from MongoDB Atlas
2. **NO HARDCODED ARRAYS**: Use database queries
3. **REAL-TIME UPDATES**: Implement Socket.io properly
4. **EMAIL INTEGRATION**: Test OTP emails thoroughly
5. **ROLE-BASED ACCESS**: Enforce permissions on backend
6. **CLEAN UI**: Follow screenshots for design reference
7. **PROFESSIONAL CODE**: Use ES6+, async/await, proper error handling
8. **CSS MODULES**: Use scoped styles, no global conflicts
9. **REACT ICONS**: Import from react-icons only
10. **ENVIRONMENT VARIABLES**: Use process.env for all config

---

## File Count Estimation

**Backend**: ~30 files
**Frontend**: ~80 files
**Total**: ~110+ files

This is a large-scale application requiring careful planning and systematic implementation.
