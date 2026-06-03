# Task Management Application - Complete Testing Guide

## Pre-Testing Checklist

- [x] MongoDB connection is working
- [x] Backend environment variables are set
- [x] Frontend can connect to backend
- [x] No console errors in either terminal

---

## 1. AUTHENTICATION TESTS

### 1.1 Registration Tests

#### Test 1.1.1: Valid Registration
```
Steps:
1. Go to http://localhost:5173/signup
2. Enter name: "John Doe"
3. Enter email: "john@example.com"
4. Enter password: "Password123"
5. Enter confirm password: "Password123"
6. Click "Create Account"

Expected:
- ✓ Account created successfully message
- ✓ Redirected to dashboard
- ✓ User name appears in navbar
```

#### Test 1.1.2: Duplicate Email Registration
```
Steps:
1. Try to register with same email again

Expected:
- ✓ Error message: "User already exists with this email"
- ✓ Remain on signup page
- ✓ Email field highlighted
```

#### Test 1.1.3: Password Validation
```
Test cases:
- Password < 8 chars: "Pass12" → ✓ Error message
- No uppercase: "password123" → ✓ Error message
- No lowercase: "PASSWORD123" → ✓ Error message
- No number: "PasswordAbc" → ✓ Error message
- Valid: "Password123" → ✓ No error

Expected:
- All validations work
- Error messages are clear
- Submit button disabled until valid
```

#### Test 1.1.4: Password Mismatch
```
Steps:
1. Password: "Password123"
2. Confirm: "Password124"
3. Click Create Account

Expected:
- ✓ Error: "Passwords do not match"
```

---

### 1.2 Login Tests

#### Test 1.2.1: Valid Login
```
Steps:
1. Go to http://localhost:5173/login
2. Enter email: john@example.com
3. Enter password: Password123
4. Click Sign In

Expected:
- ✓ "Logged in successfully" message
- ✓ Redirected to dashboard
- ✓ User name in navbar
- ✓ Token in localStorage
```

#### Test 1.2.2: Invalid Email
```
Steps:
1. Enter email: wrong@example.com
2. Enter password: Password123
3. Click Sign In

Expected:
- ✓ Error: "Invalid email or password"
```

#### Test 1.2.3: Invalid Password
```
Steps:
1. Enter email: john@example.com
2. Enter password: WrongPassword123
3. Click Sign In

Expected:
- ✓ Error: "Invalid email or password"
```

#### Test 1.2.4: Remember Me
```
Steps:
1. Check "Remember me"
2. Login
3. Close browser tab
4. Reopen application

Expected:
- ✓ Still logged in (token persists)
- ✓ Dashboard loads automatically
```

---

### 1.3 Protected Routes Tests

#### Test 1.3.1: Access Dashboard Without Auth
```
Steps:
1. Open new browser (private/incognito window)
2. Go to http://localhost:5173/dashboard
3. Wait for redirect

Expected:
- ✓ Redirected to login page
- ✓ No errors
```

#### Test 1.3.2: Token Expiration
```
Steps:
1. Login
2. Wait 30 minutes OR modify JWT_EXPIRY to 1 minute in .env
3. Try to load tasks

Expected:
- ✓ API returns 401 Unauthorized
- ✓ Redirected to login page
- ✓ User can login again
```

#### Test 1.3.3: Logout
```
Steps:
1. Login to dashboard
2. Click user name dropdown
3. Click Logout

Expected:
- ✓ "Logged out successfully" message
- ✓ Redirected to login
- ✓ Token removed from localStorage
- ✓ Cannot access dashboard without relogin
```

---

## 2. TASK MANAGEMENT TESTS

### 2.1 Create Task Tests

#### Test 2.1.1: Create Task with All Fields
```
Steps:
1. Click "+ New Task"
2. Title: "Complete Project Report"
3. Description: "Finish Q2 report with all metrics"
4. Due Date: 2024-06-15
5. Priority: High
6. Category: Work
7. Click "Create Task"

Expected:
- ✓ "Task created successfully" message
- ✓ Task appears in list
- ✓ All fields display correctly
- ✓ Form closes
```

#### Test 2.1.2: Create Task with Required Fields Only
```
Steps:
1. Click "+ New Task"
2. Title: "Buy Groceries"
3. Leave other fields empty
4. Click "Create Task"

Expected:
- ✓ Task created successfully
- ✓ Default priority: Medium
- ✓ Default category: Other
- ✓ No due date
```

#### Test 2.1.3: Title Validation
```
Test cases:
- Empty title: Click submit → ✓ Error: "Task title is required"
- > 100 chars: Show char count and prevent submit
- Valid title: No error

Expected:
- ✓ All validations work
- ✓ Error messages clear
```

#### Test 2.1.4: Cancel Task Creation
```
Steps:
1. Click "+ New Task"
2. Enter title: "Test Task"
3. Click Cancel

Expected:
- ✓ Form closes
- ✓ Task not created
- ✓ Title clears
```

---

### 2.2 View Tasks Tests

#### Test 2.2.1: View All Tasks
```
Steps:
1. Create 3-5 tasks with different priorities and statuses
2. Go to Dashboard

Expected:
- ✓ All tasks display in list
- ✓ Correct count shown
- ✓ Most recent first
- ✓ All fields visible
```

#### Test 2.2.2: Empty State
```
Steps:
1. Delete all tasks
2. Refresh page

Expected:
- ✓ Empty state message appears
- ✓ Icon and friendly message
- ✓ "+ New Task" button still works
```

---

### 2.3 Filter Tests

#### Test 2.3.1: Filter - All Tasks
```
Steps:
1. Create mix of completed and pending tasks
2. Click "All" filter

Expected:
- ✓ All tasks display regardless of status
- ✓ Task count updates
```

#### Test 2.3.2: Filter - Pending Tasks
```
Steps:
1. Click "Pending" filter

Expected:
- ✓ Only incomplete tasks show
- ✓ Completed tasks hidden
- ✓ Count correct (pending only)
```

#### Test 2.3.3: Filter - Completed Tasks
```
Steps:
1. Click "Completed" filter

Expected:
- ✓ Only completed tasks show
- ✓ Pending tasks hidden
- ✓ Completed tasks appear faded
```

---

### 2.4 Sort Tests

#### Test 2.4.1: Sort - By Date (Newest First)
```
Steps:
1. Create tasks on different dates
2. Select "Date (Newest First)" sort

Expected:
- ✓ Newest task first
- ✓ Oldest task last
```

#### Test 2.4.2: Sort - By Priority
```
Steps:
1. Create tasks with different priorities
2. Select "Priority (High to Low)" sort

Expected:
- ✓ High priority tasks first
- ✓ Medium in middle
- ✓ Low priority last
```

#### Test 2.4.3: Sort - By Title
```
Steps:
1. Select "Title (A-Z)" sort

Expected:
- ✓ Tasks alphabetically sorted
- ✓ A comes first, Z comes last
```

---

### 2.5 Search Tests

#### Test 2.5.1: Search by Title
```
Steps:
1. Create tasks:
   - "Buy Groceries"
   - "Complete Report"
   - "Call Mom"
2. Search: "Buy"

Expected:
- ✓ Only "Buy Groceries" shows
- ✓ Other tasks hidden
```

#### Test 2.5.2: Search Case Insensitive
```
Steps:
1. Search: "buy"

Expected:
- ✓ Still shows "Buy Groceries"
- ✓ Search is case-insensitive
```

#### Test 2.5.3: Clear Search
```
Steps:
1. Clear search box
2. Press backspace or delete all text

Expected:
- ✓ All tasks reappear immediately
```

---

### 2.6 Task Completion Tests

#### Test 2.6.1: Mark Task Complete
```
Steps:
1. Create new task
2. Click checkbox next to task

Expected:
- ✓ Task marked complete
- ✓ Title gets strikethrough
- ✓ Task opacity reduces
```

#### Test 2.6.2: Mark Task Incomplete
```
Steps:
1. Click checkbox on completed task

Expected:
- ✓ Task marked incomplete
- ✓ Strikethrough removed
- ✓ Opacity returns to normal
```

#### Test 2.6.3: Filter After Completion
```
Steps:
1. Mark task complete
2. Switch to "Pending" filter

Expected:
- ✓ Task disappears from pending
- ✓ Switch to "Completed" → task appears
```

---

### 2.7 Edit Task Tests

#### Test 2.7.1: Edit Task
```
Steps:
1. Click ✏️ edit button on task
2. Change title: "Updated Title"
3. Change priority: "High"
4. Click "Update Task"

Expected:
- ✓ "Task updated successfully" message
- ✓ Task shows new title
- ✓ Priority badge updated
- ✓ Form closes
```

#### Test 2.7.2: Edit - Cancel Changes
```
Steps:
1. Click edit button
2. Make changes
3. Click Cancel

Expected:
- ✓ Changes not saved
- ✓ Original task data preserved
- ✓ Form closes
```

#### Test 2.7.3: Edit Form Population
```
Steps:
1. Create task with all fields
2. Click edit
3. Form opens

Expected:
- ✓ All fields pre-filled with current values
- ✓ Title field shows current title
- ✓ Priority shows current priority
- ✓ Due date shows current date
```

---

### 2.8 Delete Task Tests

#### Test 2.8.1: Delete Task
```
Steps:
1. Click 🗑️ delete button on task
2. Confirmation modal appears
3. Click "Delete"

Expected:
- ✓ "Task deleted successfully" message
- ✓ Task removed from list
- ✓ Task count decrements
```

#### Test 2.8.2: Cancel Delete
```
Steps:
1. Click delete button
2. Modal appears
3. Click "Cancel"

Expected:
- ✓ Modal closes
- ✓ Task remains in list
- ✓ No deletion occurs
```

#### Test 2.8.3: Confirm Modal Display
```
Expected modal should show:
- ✓ Title: "Delete Task"
- ✓ Message: "Are you sure you want to delete this task?"
- ✓ Cancel button (gray)
- ✓ Delete button (red)
- ✓ Modal backdrop overlay
```

---

## 3. UI/UX TESTS

### 3.1 Form Validation Display

#### Test 3.1.1: Error Messages
```
Steps:
1. Login page - try empty email
2. Signup page - try weak password
3. Task form - empty title

Expected:
- ✓ Red text error messages appear
- ✓ Messages are clear and helpful
- ✓ Input field highlighted in red
- ✓ Field focused when error appears
```

#### Test 3.1.2: Success Messages
```
Steps:
1. Complete any successful action
   (login, create task, update, delete)

Expected:
- ✓ Green toast notification appears
- ✓ Disappears after 3 seconds
- ✓ Success icon (✓) shown
```

#### Test 3.1.3: Error Messages
```
Steps:
1. Try invalid operations
   (wrong password, etc)

Expected:
- ✓ Red toast notification appears
- ✓ Error icon (✕) shown
- ✓ Message explains problem
```

---

### 3.2 Loading States

#### Test 3.2.1: Login Loading
```
Steps:
1. Click Sign In
2. Observe button

Expected:
- ✓ Spinner appears
- ✓ Text changes to "Logging in..."
- ✓ Button disabled
```

#### Test 3.2.2: Task Creation Loading
```
Steps:
1. Click "Create Task"
2. Fill form and submit
3. Observe button

Expected:
- ✓ Spinner appears
- ✓ Text changes to "Creating..."
- ✓ Button disabled while loading
```

#### Test 3.2.3: Delete Loading
```
Steps:
1. Click delete, then confirm
2. Observe modal button

Expected:
- ✓ Modal delete button shows loading state
- ✓ Text changes to "Deleting..."
```

---

### 3.3 Responsive Design

#### Test 3.3.1: Mobile (375px width)
```
Steps:
1. Open DevTools
2. Set viewport to 375px width
3. Test all pages and features

Expected mobile should have:
- ✓ No horizontal scroll
- ✓ Text readable without zoom
- ✓ Buttons large enough to tap
- ✓ Sidebar hidden or collapsible
- ✓ Form inputs full width
- ✓ Toast positioned correctly
```

#### Test 3.3.2: Tablet (768px width)
```
Steps:
1. Set viewport to 768px
2. Test layout

Expected:
- ✓ Two column layout if possible
- ✓ All content visible
- ✓ Navigation works
```

#### Test 3.3.3: Desktop (1920px+ width)
```
Steps:
1. Full browser window

Expected:
- ✓ Sidebar visible
- ✓ Optimal spacing
- ✓ No cramped layout
```

---

### 3.4 Animations & Transitions

#### Test 3.4.1: Smooth Transitions
```
Expected:
- ✓ Buttons have hover effects
- ✓ No jarring movements
- ✓ Transitions take ~0.3s
- ✓ Animations are smooth
```

#### Test 3.4.2: Modal Animations
```
Steps:
1. Open delete modal
2. Observe animation

Expected:
- ✓ Modal slides in smoothly
- ✓ Backdrop fades in
- ✓ Close animation plays
```

#### Test 3.4.3: Toast Animations
```
Steps:
1. Trigger success/error
2. Observe toast

Expected:
- ✓ Slides in from right
- ✓ Auto-dismiss animation
- ✓ Smooth and professional
```

---

### 3.5 Browser Compatibility

#### Test 3.5.1: Chrome/Brave
```
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct
```

#### Test 3.5.2: Firefox
```
- [ ] All features work
- [ ] Forms validate properly
- [ ] Styling renders correctly
```

#### Test 3.5.3: Safari
```
- [ ] All features work
- [ ] Touch events work on iOS
- [ ] No webkit-specific issues
```

---

## 4. SECURITY TESTS

### 4.1 Authentication Security

#### Test 4.1.1: Password Visibility
```
Steps:
1. Login page - check password field

Expected:
- ✓ Password field type="password"
- ✓ Characters appear as dots
- ✓ Never visible in plain text
```

#### Test 4.1.2: Token Security
```
Steps:
1. Login
2. Open DevTools → Application → LocalStorage
3. Check token

Expected:
- ✓ Token stored in localStorage
- ✓ Only accessible via JavaScript (secure)
- ✓ Not visible in HTTP headers
```

#### Test 4.1.3: CORS Headers
```
Steps:
1. Backend running
2. Open DevTools → Network tab
3. Make any API request
4. Check response headers

Expected:
- ✓ Access-Control-Allow-Origin set correctly
- ✓ Credentials allowed if needed
- ✓ Only backend domain allowed
```

---

### 4.2 Data Isolation

#### Test 4.2.1: Users Can't See Other's Tasks
```
Steps:
1. Login as User A, create tasks
2. Logout, login as User B
3. Check tasks list

Expected:
- ✓ User B sees only their tasks
- ✓ User A's tasks not visible
- ✓ Cannot access User A's tasks via API
```

#### Test 4.2.2: API Response Doesn't Leak Data
```
Steps:
1. Open DevTools → Network
2. Make API request
3. Check response JSON

Expected:
- ✓ No passwords in response
- ✓ No sensitive user data
- ✓ Only necessary fields returned
```

---

### 4.3 Rate Limiting

#### Test 4.3.1: Rate Limit on Login
```
Steps:
1. Try to login 100+ times rapidly
2. Monitor responses

Expected:
- ✓ After 100 requests, get 429 Too Many Requests
- ✓ Error message: "Too many requests, please try again later"
- ✓ Limit resets after 15 minutes
```

---

## 5. DEPLOYMENT TESTS

### 5.1 Production Build

#### Test 5.1.1: Frontend Build
```
Steps:
cd task-manager/frontend
npm run build

Expected:
- ✓ Build completes without errors
- ✓ dist/ folder created
- ✓ Files optimized and minified
```

#### Test 5.1.2: Production Mode Start
```
Steps:
cd task-manager/backend
NODE_ENV=production npm start

Expected:
- ✓ Server starts
- ✓ No development warnings
- ✓ API responds correctly
```

---

### 5.2 Deployed Application Tests

#### Test 5.2.1: Frontend Loads
```
Steps:
1. Visit deployed frontend URL

Expected:
- ✓ Page loads in < 3 seconds
- ✓ No console errors
- ✓ Styling correct
```

#### Test 5.2.2: API Responds
```
Steps:
curl https://your-backend-url/api/health

Expected:
- ✓ 200 OK response
- ✓ "Server is running" message
```

#### Test 5.2.3: Login Works
```
Steps:
1. Go to deployed frontend
2. Login with test account

Expected:
- ✓ Authentication succeeds
- ✓ Redirected to dashboard
- ✓ Tasks load from database
```

#### Test 5.2.4: CRUD Operations Work
```
Steps:
1. Create task → ✓ Works
2. Edit task → ✓ Works
3. Delete task → ✓ Works
4. Filter/sort → ✓ Works

Expected:
- ✓ All operations successful on deployed app
- ✓ Changes persist
- ✓ No errors
```

---

## 6. PERFORMANCE TESTS

### 6.1 Loading Performance

#### Test 6.1.1: Dashboard Load Time
```
Steps:
1. Login
2. Measure time to dashboard display
3. Using DevTools → Performance tab

Expected:
- ✓ Dashboard visible in < 2 seconds
- ✓ Tasks load in < 3 seconds
```

#### Test 6.1.2: API Response Time
```
Steps:
1. Check Network tab for API requests
2. Monitor response times

Expected:
- ✓ GET /tasks: < 500ms
- ✓ POST /tasks: < 1000ms
- ✓ DELETE /tasks: < 500ms
```

---

## Test Summary Template

```
Date: __________
Tester: __________
Build Version: __________

Total Tests: ______
Passed: ______
Failed: ______
Blocked: ______

Critical Issues: ______
Major Issues: ______
Minor Issues: ______

Sign-off: ____________  Date: __________
```

---

## Notes

- Run all tests in order listed
- Document any failures with screenshots
- Test on multiple browsers
- Test on mobile devices if possible
- Clear cache and localStorage between test runs
- Use test data, never production data

---

**Last Updated:** June 3, 2024
**Test Suite Version:** 1.0
**Status:** Complete and Ready for Testing
