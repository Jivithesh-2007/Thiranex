# Testing Guide - Blog Platform

## Test Environment Setup

### Prerequisites
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:5173`
- Database seeded with test data

### Test Accounts (from seed.js)

**Writer #1**
- Email: `john@example.com`
- Password: `password123`
- Role: Writer

**Writer #2**
- Email: `sarah@example.com`
- Password: `password123`
- Role: Writer

**Writer #3**
- Email: `mike@example.com`
- Password: `password123`
- Role: Writer

**Reader**
- Email: `alice@example.com`
- Password: `password123`
- Role: Reader

---

## 1. Authentication Testing

### 1.1 User Registration
- [ ] Register new user as Reader
- [ ] Register new user as Writer
- [ ] Verify error for existing email
- [ ] Verify error for weak password
- [ ] Verify error for mismatched passwords
- [ ] Verify token stored in localStorage
- [ ] Verify user redirected to home after signup

### 1.2 User Login
- [ ] Login with valid credentials
- [ ] Verify token in localStorage
- [ ] Verify user info displayed in header
- [ ] Verify error for wrong email
- [ ] Verify error for wrong password
- [ ] Verify error message displays correctly

### 1.3 User Logout
- [ ] Click logout in user menu
- [ ] Verify token cleared from localStorage
- [ ] Verify user redirected to home
- [ ] Verify login link appears in header

### 1.4 Session Management
- [ ] Refresh page while logged in
- [ ] Verify still authenticated
- [ ] Wait for token expiration
- [ ] Verify redirected to login on next action

---

## 2. Post Management Testing

### 2.1 Create Post (Writer Only)
- [ ] Navigate to "✍️ Write"
- [ ] Fill in post title
- [ ] Select category
- [ ] Enter post content
- [ ] Add multiple tags (comma-separated)
- [ ] Click "Save as Draft"
- [ ] Verify redirect to dashboard
- [ ] Verify post appears with "Draft" status

### 2.2 Publish Draft
- [ ] Go to dashboard
- [ ] Click "Publish" on draft post
- [ ] Verify status changes to "Published"
- [ ] Verify post appears in blog listing

### 2.3 Update Post (Author Only)
- [ ] Go to dashboard
- [ ] Click "Edit" on your post
- [ ] Modify title/content
- [ ] Click "Update"
- [ ] Verify changes reflected on post detail page

### 2.4 Delete Post (Author Only)
- [ ] Go to dashboard
- [ ] Click "Delete" on your post
- [ ] Confirm deletion
- [ ] Verify post removed from dashboard
- [ ] Verify post removed from blog listing

### 2.5 Slug Generation
- [ ] Create post titled "Hello World"
- [ ] Verify slug is "hello-world"
- [ ] Create another post with same title
- [ ] Verify slug is "hello-world-2"
- [ ] Navigate to both slugs directly

### 2.6 Draft Visibility
- [ ] Create draft as Writer
- [ ] Logout and login as different user
- [ ] Verify draft not visible in blog
- [ ] Login as original author
- [ ] Verify draft visible in dashboard

---

## 3. Blog Browsing Testing

### 3.1 Home Page
- [ ] Navigate to home
- [ ] See hero section with title
- [ ] See featured posts (top 5 by views)
- [ ] See categories grid
- [ ] See writer CTA section
- [ ] Responsive on mobile (hamburger menu)

### 3.2 Blog Listing
- [ ] Navigate to "/blog"
- [ ] See all published posts
- [ ] Posts display with excerpt and author info
- [ ] Pagination works (if more than 10 posts)
- [ ] Can change page number

### 3.3 Category Filtering
- [ ] In blog page, select category from dropdown
- [ ] Posts filter to show only that category
- [ ] Clear filter and see all posts again
- [ ] Each category has correct count

### 3.4 Sorting
- [ ] Sort by "Newest"
- [ ] Sort by "Most Viewed"
- [ ] Sort by "Most Commented"
- [ ] Posts reorder correctly

### 3.5 Search
- [ ] Click search in header
- [ ] Search for keyword
- [ ] Results show matching posts
- [ ] Search for non-existent term
- [ ] Verify "No posts found" message

---

## 4. Post Detail Testing

### 4.1 Post Display
- [ ] Click on post from blog listing
- [ ] Verify full content displays
- [ ] Featured image visible
- [ ] Author info correct
- [ ] Category and tags display
- [ ] Read time calculated
- [ ] View count displayed

### 4.2 Related Posts
- [ ] Scroll to bottom of post
- [ ] See 3 related posts from same category
- [ ] Click related post
- [ ] Navigate to new post

### 4.3 View Count
- [ ] View post detail page
- [ ] Refresh page
- [ ] View count increases
- [ ] View count only for published posts

---

## 5. Comment System Testing

### 5.1 Add Comment
- [ ] On post detail, scroll to comments
- [ ] Enter comment text
- [ ] Click "Post Comment"
- [ ] Comment appears immediately
- [ ] Comment shows author info and timestamp

### 5.2 Nested Comments (Replies)
- [ ] Click "Reply" on a comment
- [ ] Reply form appears below comment
- [ ] Enter reply text
- [ ] Click "Post Reply"
- [ ] Reply appears indented under parent

### 5.3 Multiple Nesting Levels
- [ ] Reply to a reply
- [ ] Reply to reply to reply (up to 5 levels)
- [ ] Verify proper indentation at each level
- [ ] Verify reply counts update

### 5.4 Like Comment
- [ ] Click heart icon on comment
- [ ] Like count increments
- [ ] Heart becomes filled
- [ ] Click again to unlike
- [ ] Like count decrements

### 5.5 Delete Comment (Author Only)
- [ ] Comment on your own post
- [ ] Click "Delete" on your comment
- [ ] Confirm deletion
- [ ] Comment disappears
- [ ] Cannot delete others' comments

### 5.6 Edit Comment (Planned)
- [ ] Click "Edit" on your comment
- [ ] Modify text
- [ ] Click "Update"
- [ ] Changes reflect

### 5.7 Comment Sorting
- [ ] In comments section, sort by "Newest"
- [ ] Sort by "Oldest"
- [ ] Sort by "Most Liked"
- [ ] Comments reorder correctly

### 5.8 Comment Count
- [ ] Add comment to post
- [ ] Verify post comment count increments
- [ ] Delete comment
- [ ] Verify post comment count decrements

---

## 6. User Profile Testing

### 6.1 Author Profile
- [ ] Click on author name anywhere
- [ ] See author profile page
- [ ] Show author avatar, name, bio
- [ ] Show post count and follower count
- [ ] Show member since date
- [ ] Show author's published posts below

### 6.2 Author's Posts
- [ ] On author profile, see list of posts
- [ ] Click post title
- [ ] Navigate to post detail
- [ ] See author is correct

### 6.3 Dashboard (Protected Route)
- [ ] Login as writer
- [ ] Navigate to dashboard
- [ ] See "My Posts" tab
- [ ] See "Profile" tab
- [ ] Logout and try accessing dashboard
- [ ] Verify redirected to login

### 6.4 My Posts Tab
- [ ] See all your posts (draft + published)
- [ ] See post status
- [ ] See view count
- [ ] See comment count
- [ ] See creation date
- [ ] See "Edit" button
- [ ] See "Delete" button

### 6.5 Profile Tab
- [ ] See your name
- [ ] See your email
- [ ] See your role
- [ ] See member since date

---

## 7. Security Testing

### 7.1 XSS Prevention
- [ ] Create post with HTML: `<script>alert('xss')</script>`
- [ ] Verify script doesn't execute
- [ ] Verify HTML sanitized

### 7.2 Authentication Required
- [ ] Try accessing /create without login
- [ ] Verify redirected to login
- [ ] Try accessing /dashboard without login
- [ ] Verify redirected to login

### 7.3 Authorization
- [ ] Reader tries to access write page
- [ ] Verify redirected to blog
- [ ] Writer can access write page
- [ ] Only author can edit their posts
- [ ] Only author can delete their posts

### 7.4 Token Validation
- [ ] Modify token in localStorage
- [ ] Try to perform authenticated action
- [ ] Verify error handling
- [ ] Verify redirected to login

---

## 8. Responsive Design Testing

### 8.1 Mobile Breakpoint (< 768px)
- [ ] Open in mobile view
- [ ] Header hamburger menu appears
- [ ] Navigation menu toggles
- [ ] Blog page single column layout
- [ ] Comments indentation adjusted
- [ ] Forms stack vertically
- [ ] Images scale down

### 8.2 Tablet Breakpoint (768px - 1024px)
- [ ] Test at tablet resolution
- [ ] Layout readable and usable
- [ ] Images scale appropriately
- [ ] Forms display correctly

### 8.3 Desktop (> 1024px)
- [ ] Full layout displays
- [ ] Two-column layouts work
- [ ] Hover effects work
- [ ] All features visible

---

## 9. Error Handling Testing

### 9.1 Server Errors
- [ ] Stop backend server
- [ ] Try to perform action
- [ ] Verify error message displays
- [ ] No console errors

### 9.2 Validation Errors
- [ ] Try to create post with empty title
- [ ] Verify error message
- [ ] Try to register with weak password
- [ ] Verify error message

### 9.3 Not Found Errors
- [ ] Navigate to non-existent post slug
- [ ] Verify 404 page displays
- [ ] Navigate to non-existent user ID
- [ ] Verify error handled gracefully

### 9.4 Authentication Errors
- [ ] Try login with wrong password
- [ ] Verify clear error message
- [ ] Try with non-existent email
- [ ] Verify clear error message

---

## 10. Performance Testing

### 10.1 Load Time
- [ ] Home page loads in < 3 seconds
- [ ] Blog page loads in < 3 seconds
- [ ] Post detail loads in < 2 seconds

### 10.2 Database Queries
- [ ] Check browser DevTools Network tab
- [ ] API calls return quickly (< 500ms)
- [ ] No unnecessary API calls

### 10.3 Large Dataset Handling
- [ ] Create 50+ posts
- [ ] Blog page loads and paginates correctly
- [ ] Post with 50+ comments loads properly
- [ ] Nested comments don't cause delays

---

## 11. Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Verify:
- [ ] All features work
- [ ] Layout renders correctly
- [ ] No console errors
- [ ] Forms submit properly

---

## 12. API Testing (Backend)

### 12.1 Authentication Endpoints
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","confirmPassword":"password123","role":"reader"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get Profile (replace TOKEN)
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### 12.2 Post Endpoints
```bash
# Get all posts
curl http://localhost:5000/api/posts

# Get post by slug
curl http://localhost:5000/api/posts/getting-started-with-react-hooks

# Search posts
curl "http://localhost:5000/api/posts/search?q=react"

# Create post (replace TOKEN)
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"My Post","content":"<p>Content</p>","excerpt":"Short excerpt","category":"Technology","tags":["react","javascript"]}'
```

### 12.3 Comment Endpoints
```bash
# Get comments for post
curl "http://localhost:5000/api/comments/POST_ID/comments"

# Create comment (replace TOKEN and POST_ID)
curl -X POST http://localhost:5000/api/comments/POST_ID/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"content":"Great post!"}'
```

---

## 13. Edge Cases

### 13.1 Empty States
- [ ] No posts in category shows message
- [ ] No search results shows message
- [ ] No comments on post shows message
- [ ] Empty author profile shows message

### 13.2 Special Characters
- [ ] Post title with quotes: `"Hello 'World'"`
- [ ] Post content with emojis: `Hello 👋 World 🌍`
- [ ] Comment with links: `Check http://example.com`
- [ ] Tags with hyphens: `tag-name`

### 13.3 Very Long Content
- [ ] Very long post title (200+ chars)
- [ ] Very long post content (50,000 words)
- [ ] Very long comment (5,000 words)
- [ ] Verify no layout breaks

### 13.4 Concurrent Users
- [ ] Two users editing same post
- [ ] Two users commenting simultaneously
- [ ] Verify conflicts handled

---

## Test Reporting Template

```
Test Date: [DATE]
Tester: [NAME]
Environment: [LOCAL/STAGING/PRODUCTION]
OS: [MACOS/WINDOWS/LINUX]
Browser: [CHROME/FIREFOX/SAFARI]

Passed Tests: [NUMBER]
Failed Tests: [NUMBER]
Blocked Tests: [NUMBER]

Failed Test Details:
1. [TEST NAME] - Expected: [X], Got: [Y]
2. ...

Notes:
- [Any observations]
- [Performance notes]
- [Browser-specific issues]

Recommendation: [PASS/FAIL/CONDITIONAL]
```

---

## Continuous Testing

### Before Each Deployment
- [ ] Run all tests above
- [ ] Test on staging environment
- [ ] Get sign-off from stakeholder
- [ ] Document any new issues

### Monthly Testing
- [ ] Repeat full test suite
- [ ] Add tests for new features
- [ ] Performance benchmarking
- [ ] Security audit

---

**Testing Complete! ✅**
