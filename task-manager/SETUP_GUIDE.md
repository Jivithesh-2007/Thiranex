# Task Management Web Application - Setup & Deployment Guide

## Quick Start

### 1. Backend Setup (Terminal 1)

```bash
cd task-manager/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

### 2. Frontend Setup (Terminal 2)

```bash
cd task-manager/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## Environment Configuration

### Backend .env
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://Classforge:Jivithesh@123456@cluster0.cjeudzt.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRY=30d
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Production Deployment

### Backend Deployment (Render.com)

1. Create account on render.com
2. Connect GitHub repository
3. Create new Web Service
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables
7. Deploy

### Frontend Deployment (Vercel)

1. Create account on vercel.com
2. Import GitHub repository
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Environment variables:
   - `VITE_API_URL=https://your-backend-url/api`
7. Deploy

## Testing Checklist

### Authentication
- [ ] User can register with valid email and strong password
- [ ] Validation prevents weak passwords
- [ ] User can login with correct credentials
- [ ] Login fails with invalid credentials
- [ ] Protected routes redirect to login
- [ ] Token persists across page refreshes
- [ ] User can logout
- [ ] Remember me functionality works

### Task Management
- [ ] Can create task with all fields
- [ ] Can create task with required fields only
- [ ] Can view all tasks
- [ ] Can edit existing task
- [ ] Can delete task with confirmation
- [ ] Can mark task complete/incomplete
- [ ] Can filter tasks (All, Pending, Completed)
- [ ] Can sort tasks (Date, Priority, Title)
- [ ] Can search tasks by title
- [ ] Task count updates correctly
- [ ] Overdue tasks are highlighted

### UI/UX
- [ ] Form validation shows error messages
- [ ] Loading spinners appear during API calls
- [ ] Success/error toasts display correctly
- [ ] Confirmation modals work for delete
- [ ] Mobile responsive on all screen sizes
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Empty state displays when no tasks

### Security
- [ ] Passwords are never visible in transit
- [ ] API returns meaningful error messages
- [ ] CORS is properly configured
- [ ] Rate limiting works on auth endpoints
- [ ] JWT tokens expire correctly
- [ ] Users can only see their own tasks

## API Health Check

```bash
# Check if backend is running
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-06-03T10:30:00.000Z"
}
```

## Useful Commands

### Backend
```bash
npm run dev        # Development with hot reload
npm start          # Production mode
npm run seed       # Seed database (if implemented)
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build locally
```

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify port 5000 is available
- Check .env file is in backend directory

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS_ORIGIN in backend .env
- Clear browser cache and localStorage

### Tasks won't load
- Check browser console for errors
- Verify user is authenticated
- Check network tab for failed requests

## Performance Optimization

### Frontend
- Images are lazy-loaded
- Components use React.memo where needed
- No unnecessary re-renders
- CSS is minified in production

### Backend
- Database indexes on frequently queried fields
- Pagination support (can be added)
- Request validation prevents bad data
- Error messages don't expose sensitive info

## Security Checklist

- [x] Passwords hashed with bcryptjs (10 rounds)
- [x] JWT tokens have expiration time
- [x] HTTPS enforced in production
- [x] CORS configured properly
- [x] Input validation on both frontend and backend
- [x] No sensitive data in API responses
- [x] Rate limiting on auth endpoints
- [x] Environment variables for all secrets

## Next Steps for Enhancement

1. **Add email verification**
2. **Implement password reset**
3. **Add task sharing/collaboration**
4. **Real-time updates with WebSockets**
5. **Task reminders via email**
6. **Dark mode support**
7. **Task subtasks**
8. **Export tasks to CSV/PDF**
9. **Recurring tasks**
10. **Task comments**

## Support & Contact

For issues or questions, check the README.md or create an issue in the repository.

---

**Last Updated:** June 3, 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
