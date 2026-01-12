# Spec and build

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

---

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:
- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification
<!-- chat-id: 5855fa40-fa98-4fd5-8b8d-d878592e9dc9 -->

✅ **Completed**: Created comprehensive technical specification in `spec.md`
- Complexity: **HARD**
- 110+ files to create
- Full-stack MERN application with real-time features

---

### [ ] Step 1: Project Initialization & Setup

**Goal**: Set up project structure, install dependencies, configure environment variables

**Tasks**:
1. Create backend directory structure
2. Initialize backend with `npm init` and install dependencies (express, mongoose, bcrypt, jsonwebtoken, nodemailer, socket.io, dotenv, cors)
3. Create frontend with Vite (`npm create vite@latest frontend -- --template react`)
4. Install frontend dependencies (react-router-dom, axios, react-icons, socket.io-client)
5. Create .env files for backend and frontend
6. Set up .gitignore files
7. Configure MongoDB Atlas connection

**Verification**:
- `npm install` runs successfully in both directories
- MongoDB connection test succeeds
- Development servers start without errors

---

### [ ] Step 2: Backend - Database Models

**Goal**: Create all Mongoose schemas and models

**Tasks**:
1. Create User model (fullName, username, email, password, role, etc.)
2. Create Idea model (title, description, domain, tags, author, status, etc.)
3. Create Group model (name, members, invitations, etc.)
4. Create Notification model (recipient, type, message, etc.)
5. Create OTP model (email, otp, expiresAt, etc.)
6. Create Feedback model (idea, reviewer, content, action)
7. Create MergeHistory model (mergedIdea, sourceIdeas, contributors)

**Verification**:
- All models export correctly
- Schemas have proper validation and required fields
- Indexes are set up for performance

---

### [ ] Step 3: Backend - Authentication System

**Goal**: Implement complete authentication flow (signup, login, forgot password with OTP)

**Tasks**:
1. Create auth middleware (JWT verification)
2. Create role-based access control middleware
3. Create authController (signup, login, forgot-password, verify-otp, reset-password, getMe)
4. Create emailService (Nodemailer setup, send email function)
5. Create otpService (generate OTP, validate OTP, cleanup expired OTPs)
6. Create auth routes
7. Implement password hashing with bcrypt
8. Implement JWT token generation

**Verification**:
- Signup creates user in database with hashed password
- Login returns JWT token
- Forgot password sends OTP email
- OTP verification works and expires after 10 minutes
- Password reset updates user password

---

### [ ] Step 4: Backend - Idea Management APIs

**Goal**: Implement CRUD operations for ideas with role-based access

**Tasks**:
1. Create ideaController (create, read, update, delete, approve, reject, getMyIdeas, getPending, getApproved, getRejected)
2. Create idea routes with proper authentication and role checks
3. Implement feedback submission when rejecting ideas
4. Add idea status transitions (pending → approved/rejected)
5. Implement idea filtering and search

**Verification**:
- Students can create, update, delete their own ideas
- Teachers can approve/reject ideas with feedback
- Admin has full CRUD access
- Filtering and pagination work correctly

---

### [ ] Step 5: Backend - Group & Collaboration Features

**Goal**: Implement group creation, invitations, and collaborative ideas

**Tasks**:
1. Create groupController (create, read, update, delete, invite, respondToInvitation, leave, getMyGroups)
2. Create group routes with authentication
3. Implement group invitation system via email
4. Link ideas to groups (collaborative submissions)
5. Track group members and permissions

**Verification**:
- Students can create groups
- Invitations are sent via email
- Members can accept/reject invitations
- Group ideas show all contributors

---

### [ ] Step 6: Backend - Idea Merge System

**Goal**: Implement similarity detection and idea merging

**Tasks**:
1. Create similarityService (keyword matching or TF-IDF algorithm)
2. Create mergeController (detectSimilar, mergeIdeas, getMergeHistory)
3. Create merge routes with teacher/admin access
4. Implement merge logic (combine ideas, preserve contributors)
5. Create MergeHistory records
6. Update idea status when merged

**Verification**:
- Similar ideas are detected based on keywords/domain
- Merge creates new idea with all contributors
- Original ideas are marked as merged
- Merge history is tracked

---

### [ ] Step 7: Backend - Notifications & Real-time Features

**Goal**: Implement Socket.io for real-time notifications

**Tasks**:
1. Create notificationController (getNotifications, markAsRead, markAllAsRead, deleteNotification)
2. Create notification routes
3. Set up Socket.io server
4. Create notificationService (emit real-time notifications)
5. Implement notification triggers (idea status change, merge, group invitation, feedback)
6. Create socket event handlers

**Verification**:
- Socket.io connects successfully
- Notifications are stored in database
- Real-time notifications are emitted to correct users
- Notification count updates in real-time

---

### [ ] Step 8: Backend - User Management (Admin)

**Goal**: Implement admin user management features

**Tasks**:
1. Create userController (getUsers, getUser, updateUser, deleteUser, getStudents, getTeachers)
2. Create user routes with admin-only access
3. Implement user search and filtering

**Verification**:
- Admin can view all users
- Admin can update/delete users
- Teachers can view students
- Role-based access is enforced

---

### [ ] Step 9: Backend - Server Setup & Error Handling

**Goal**: Complete backend setup with error handling and CORS

**Tasks**:
1. Create server.js (Express app setup, middleware, routes)
2. Create error handler middleware
3. Configure CORS for frontend
4. Set up Socket.io integration with Express
5. Add request logging
6. Add validation helpers

**Verification**:
- Server starts on port 5001
- All routes are accessible
- CORS allows frontend requests
- Errors are handled gracefully

---

### [ ] Step 10: Frontend - Project Setup & Routing

**Goal**: Set up React app structure, routing, and global styles

**Tasks**:
1. Create router.jsx with React Router v6
2. Set up public and protected routes
3. Create global.css and variables.css (color scheme, spacing)
4. Create App.jsx with router
5. Configure Vite proxy (optional)

**Verification**:
- Routing works correctly
- Global styles are applied
- Development server runs on port 5173

---

### [ ] Step 11: Frontend - Authentication Context & Services

**Goal**: Set up authentication state management and API services

**Tasks**:
1. Create AuthContext (user state, login, logout, token management)
2. Create api.js (Axios instance with interceptors for JWT)
3. Create authService (signup, login, forgotPassword, verifyOTP, resetPassword)
4. Add localStorage for token persistence
5. Create useAuth hook

**Verification**:
- AuthContext provides user data to all components
- API requests include JWT token in headers
- Token is persisted across page refreshes
- Logout clears token and redirects

---

### [ ] Step 12: Frontend - Common Components

**Goal**: Create reusable UI components

**Tasks**:
1. Create Navbar component (logo, dark mode toggle, notifications, avatar)
2. Create Sidebar component (navigation links with icons)
3. Create Card component (analytics cards, idea cards)
4. Create Button component (primary, secondary, danger variants)
5. Create Input component (text, password with eye toggle, email)
6. Create Modal component (overlay, close button)

**Verification**:
- Components render correctly
- CSS Modules scope styles properly
- react-icons work correctly
- Components are reusable

---

### [ ] Step 13: Frontend - Authentication Pages

**Goal**: Implement all authentication UI pages

**Tasks**:
1. Create Login page (username + domain dropdown, password with eye toggle)
2. Create Signup page (fullName, username + domain, department, password, confirmPassword)
3. Create ForgotPassword page (username + domain, send OTP button)
4. Create VerifyOTP page (OTP input, countdown timer)
5. Create ResetPassword page (new password, confirm password)
6. Add form validation and error handling

**Verification**:
- All forms validate inputs correctly
- API calls work and handle errors
- Success/error messages display
- Redirects work after success

---

### [ ] Step 14: Frontend - Student Dashboard & Analytics

**Goal**: Create student dashboard with analytics cards

**Tasks**:
1. Create Student Dashboard page
2. Create AnalyticsCard component (Total, Approved, Pending, Rejected)
3. Fetch idea statistics from API
4. Display recent ideas list
5. Add "Submit New" button

**Verification**:
- Analytics cards show real data from database
- Dashboard updates when ideas are created/updated
- Navigation works correctly

---

### [ ] Step 15: Frontend - Student Idea Management

**Goal**: Implement idea creation, editing, and listing

**Tasks**:
1. Create SubmitIdea page (form with title, description, domain, tags, attachments)
2. Create MyIdeas page (list of user's ideas, edit/delete actions)
3. Create ExploreIdeas page (view all approved ideas, search, filter)
4. Create IdeaCard component (display idea details, status badge)
5. Create IdeaForm component (reusable for create/edit)
6. Create ideaService (API calls for ideas)

**Verification**:
- Students can create ideas successfully
- Ideas are saved to database
- Students can edit/delete their pending ideas
- Search and filters work correctly

---

### [ ] Step 16: Frontend - Student Groups

**Goal**: Implement group creation and management

**Tasks**:
1. Create Groups page (list of user's groups, create button)
2. Create GroupCard component (members, ideas count)
3. Create group invitation modal (email input)
4. Create groupService (API calls for groups)
5. Display group invitations
6. Add accept/reject invitation functionality

**Verification**:
- Students can create groups
- Invitations are sent and received
- Members can join/leave groups
- Group ideas show all contributors

---

### [ ] Step 17: Frontend - Teacher Dashboard

**Goal**: Create teacher dashboard with idea review functionality

**Tasks**:
1. Create Teacher Dashboard page
2. Display analytics (Total Submissions, Pending Review, Approved)
3. Create ReviewIdeas page (tabs: Pending, Approved, Rejected)
4. Create IdeaReviewCard component (idea details, approve/reject buttons)
5. Create FeedbackForm component (reject with feedback modal)
6. Add calendar widget (optional)

**Verification**:
- Teacher sees all student ideas
- Tabs filter by status
- Approve/reject actions work
- Feedback is saved and sent to student

---

### [ ] Step 18: Frontend - Teacher Idea Merging

**Goal**: Implement similarity detection and merge UI

**Tasks**:
1. Create MergeModal component (select similar ideas, merge button)
2. Add "Detect Similar" button on ReviewIdeas page
3. Display similar ideas with similarity score
4. Implement merge functionality
5. Show merge history

**Verification**:
- Similar ideas are detected
- Merge combines ideas correctly
- All contributors are preserved
- Notifications sent to all contributors

---

### [ ] Step 19: Frontend - Teacher Student Management

**Goal**: Create student listing and management

**Tasks**:
1. Create Students page (list of registered students)
2. Create StudentCard component (name, email, ideas count)
3. Add search and filter functionality

**Verification**:
- Teacher can view all students
- Student data is accurate
- Search works correctly

---

### [ ] Step 20: Frontend - Admin Dashboard

**Goal**: Create admin dashboard with system analytics

**Tasks**:
1. Create Admin Dashboard page
2. Display system-wide analytics (users, ideas, approvals, etc.)
3. Create quick action buttons (manage users, manage ideas)
4. Create SystemAnalytics component

**Verification**:
- Admin sees system-wide stats
- Analytics are accurate
- Quick actions navigate correctly

---

### [ ] Step 21: Frontend - Admin User Management

**Goal**: Implement full user CRUD for admin

**Tasks**:
1. Create ManageUsers page (list all users with roles)
2. Create UserManagement component (edit/delete users)
3. Add user search and role filter
4. Create userService (API calls)

**Verification**:
- Admin can view all users
- Admin can update/delete users
- Role filter works correctly

---

### [ ] Step 22: Frontend - Admin Idea Management

**Goal**: Implement full idea CRUD for admin

**Tasks**:
1. Create ManageIdeas page (all ideas with filters)
2. Add admin actions (edit, delete, approve, reject, merge)
3. Implement bulk actions (optional)

**Verification**:
- Admin has full CRUD access
- Actions work correctly
- Database updates properly

---

### [ ] Step 23: Frontend - Notifications System

**Goal**: Implement notifications UI with real-time updates

**Tasks**:
1. Create Notifications page (list of notifications)
2. Create NotificationContext (state management)
3. Create socketService (Socket.io client)
4. Add notification bell in Navbar with badge count
5. Implement mark as read functionality
6. Create useNotifications hook

**Verification**:
- Real-time notifications appear instantly
- Notification count updates correctly
- Mark as read works
- Socket.io connection is stable

---

### [ ] Step 24: Frontend - Theme Toggle (Dark Mode)

**Goal**: Implement dark/light mode toggle

**Tasks**:
1. Create ThemeContext (theme state)
2. Add dark mode CSS variables
3. Add toggle button in Navbar
4. Persist theme preference in localStorage

**Verification**:
- Theme toggles correctly
- All pages respect theme
- Preference persists across sessions

---

### [ ] Step 25: Frontend - Settings Pages

**Goal**: Create settings pages for all roles

**Tasks**:
1. Create Settings page (profile update, password change)
2. Add avatar upload (optional)
3. Add email preferences

**Verification**:
- Users can update profile
- Password change works
- Settings are saved

---

### [ ] Step 26: Integration Testing & Bug Fixes

**Goal**: Test entire application end-to-end

**Tasks**:
1. Test signup → login → dashboard flow for all roles
2. Test idea submission → approval → notification flow
3. Test group creation → invitation → acceptance flow
4. Test forgot password → OTP → reset flow
5. Test idea merge flow
6. Test real-time notifications with multiple users
7. Fix any bugs discovered
8. Test error handling

**Verification**:
- All user flows work correctly
- No console errors
- Database operations are correct
- Real-time features work
- Email delivery works

---

### [ ] Step 27: Final Polish & Documentation

**Goal**: Complete final touches and create README

**Tasks**:
1. Add loading states to all API calls
2. Add empty states (no ideas, no notifications, etc.)
3. Add success/error toast notifications
4. Optimize performance (lazy loading, etc.)
5. Create comprehensive README.md
6. Add setup instructions
7. Add .env.example files
8. Final code cleanup

**Verification**:
- UI is polished and professional
- README is clear and complete
- Setup instructions work
- Application is production-ready

---

### [ ] Step 28: Report

**Goal**: Document implementation and testing results

**Tasks**:
1. Write final report to `{@artifacts_path}/report.md`
2. Include implementation summary
3. Document testing approach
4. List challenges encountered
5. Provide demo instructions
