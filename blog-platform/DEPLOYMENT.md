# Deployment Guide - Blog Platform

## Prerequisites

- GitHub repository with code pushed
- MongoDB Atlas account (already configured)
- Vercel account (for frontend)
- Render.com or Railway account (for backend)

---

## Backend Deployment (Render.com)

### Step 1: Prepare Repository

1. Ensure `.env` files are listed in `.gitignore`
2. Push latest code to GitHub
3. Create `render.yaml` in backend root:

```yaml
services:
  - type: web
    name: blog-platform-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

### Step 2: Deploy on Render

1. Go to https://render.com
2. Sign in / Create account
3. Click "New +" → "Web Service"
4. Connect GitHub (authorize Render)
5. Select your repository
6. Configure:
   - **Name:** `blog-platform-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Region:** Choose closest to you

### Step 3: Add Environment Variables

In Render dashboard:
1. Go to your Web Service
2. Click "Environment"
3. Add each variable:

```
MONGODB_URI = mongodb+srv://Classforge:Jivithesh@123456@cluster0.cjeudzt.mongodb.net/?appName=Cluster0
JWT_SECRET = (generate strong random string)
NODE_ENV = production
CORS_ORIGIN = https://your-frontend-url.vercel.app
```

To generate JWT_SECRET:
```bash
# On your local machine
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for build to complete (~2 minutes)
3. Get your API URL: `https://blog-platform-api.onrender.com`
4. Update frontend VITE_API_URL to this URL

### Step 5: Seed Database on Production

```bash
# Connect to your Render service via SSH (if available)
# Or run seed locally with production MONGODB_URI:

MONGODB_URI="your-production-uri" npm run seed
```

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Code

1. Ensure all environment variables are in `.env.example`
2. Ensure `VITE_API_URL` points to production backend
3. Run build locally to verify:

```bash
npm run build
npm run preview
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Sign in / Create account
3. Click "New Project"
4. Import your GitHub repository
5. Select `frontend` as root directory (important!)
6. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variables

In Vercel project settings:
1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   VITE_API_URL = https://blog-platform-api.onrender.com/api
   ```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment (~1 minute)
3. Get your frontend URL: `https://your-project.vercel.app`

### Step 5: Update Backend CORS

Update backend on Render:
1. Add frontend URL to CORS_ORIGIN:
   ```
   CORS_ORIGIN = https://your-project.vercel.app
   ```

---

## Alternative: Backend Deployment (Railway)

### Step 1: Setup Railway

1. Go to https://railway.app
2. Create account
3. Connect GitHub
4. Click "New Project"
5. Select "Deploy from GitHub repo"
6. Select your repository

### Step 2: Configure Railway

1. Create `Procfile` in backend root:
   ```
   web: npm start
   ```

2. Add `PORT` to environment: Railway auto-assigns port

### Step 3: Add Environment Variables

In Railway dashboard:
1. Go to your project
2. Click "Variables"
3. Add all required variables from .env

### Step 4: Deploy

1. Commits to GitHub automatically deploy
2. Get public URL from Railway dashboard
3. Update frontend VITE_API_URL

---

## Monitoring & Debugging

### View Logs (Render)
1. Go to Web Service
2. Click "Logs" tab
3. Real-time logs appear

### View Logs (Railway)
1. Go to project
2. Click service
3. View live logs

### Monitor Database (MongoDB Atlas)
1. Go to https://cloud.mongodb.com
2. Select your cluster
3. Metrics tab shows:
   - Read/write operations
   - Network throughput
   - Storage usage

### Common Issues

**502 Bad Gateway**
- Backend crashed
- Check logs on Render/Railway
- Verify environment variables

**CORS Error**
- Update CORS_ORIGIN in backend
- Redeploy backend
- Clear browser cache

**Database Connection Failed**
- Verify MONGODB_URI correct
- Check IP whitelist in MongoDB Atlas
- Add 0.0.0.0/0 for development

---

## Performance Optimization

### Frontend (Vercel)
1. Enable image optimization
2. Use dynamic imports for routes
3. Minify CSS/JS in build
4. Enable gzip compression

### Backend (Render/Railway)
1. Use connection pooling for MongoDB
2. Add caching headers
3. Implement rate limiting
4. Use CDN for static files

---

## SSL & Security

### HTTPS
- Vercel: ✅ Automatic
- Render: ✅ Automatic
- Railway: ✅ Automatic

### Additional Security
1. **HTTPS Only:** Set in backend:
   ```bash
   app.use((req, res, next) => {
     if (req.header('x-forwarded-proto') !== 'https') {
       res.redirect(`https://${req.header('host')}${req.url}`);
     }
     next();
   });
   ```

2. **Rate Limiting:** Add to backend:
   ```bash
   npm install express-rate-limit
   ```

3. **Helmet:** Add to backend:
   ```bash
   npm install helmet
   app.use(helmet());
   ```

---

## Domain Setup

### Connect Custom Domain

**For Vercel:**
1. Go to project settings
2. Domains section
3. Add your domain
4. Follow DNS instructions

**For Render/Railway:**
1. Get CNAME from dashboard
2. Update DNS records at domain registrar
3. Wait for propagation (24-48 hours)

---

## Rollback & Recovery

### If Deployment Fails

**Render:**
1. Go to Deployments
2. Select previous successful deployment
3. Click "Redeploy"

**Vercel:**
1. Go to Deployments
2. Click on previous deployment
3. Click "Redeploy"

**Railway:**
1. Click service
2. Go to Deployments
3. Click previous deployment
4. Redeploy

---

## CI/CD Pipeline (Optional)

### Automated Testing on Commit

Create `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
```

---

## Monitoring & Alerts

### Setup Error Alerts

**Option 1: Sentry** (Error tracking)
1. Create Sentry account
2. Add to backend: `npm install @sentry/node`
3. Add to frontend: `npm install @sentry/react`
4. Initialize in code
5. Get alerts for errors

**Option 2: Render Alerts**
1. Go to Web Service settings
2. Enable email alerts
3. Set threshold for errors

---

## Backup Strategy

### MongoDB Backup

1. Go to MongoDB Atlas
2. Enable Backup (automatic daily backups)
3. Test restore monthly

### Code Backup
- GitHub is your backup
- Enable branch protection
- Require PR reviews before merge

---

## Checklist Before Going Live

- ✅ Backend deployed and working
- ✅ Frontend deployed and working
- ✅ Environment variables set
- ✅ CORS configured correctly
- ✅ Database seeded
- ✅ SSL certificates valid
- ✅ Custom domain configured (if using)
- ✅ Error monitoring setup
- ✅ Backups enabled
- ✅ Testing complete
- ✅ Documentation updated

---

## Post-Deployment Tasks

1. **Test** all features on live
2. **Monitor** for errors
3. **Collect** user feedback
4. **Plan** improvements
5. **Schedule** maintenance windows

---

## Support & Troubleshooting

- Render Support: https://docs.render.com
- Vercel Support: https://vercel.com/support
- Railway Support: https://docs.railway.app
- MongoDB Support: https://docs.mongodb.com

---

**Deployment Complete! 🎉**
