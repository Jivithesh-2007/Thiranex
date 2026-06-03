# Portfolio Website

Full-stack personal portfolio built with React (frontend) and Node.js/Express (backend). MongoDB Atlas is used for storage.

Quick start

1. Backend

```bash
cd Task-1/portfolio/backend
npm install
cp .env.example .env
# Edit .env with real values
node seed.js    # seeds sample projects and skills (optional)
node server.js
```

2. Frontend

```bash
cd Task-1/portfolio/frontend
npm install
npm run dev
```

Deployment
- Frontend: deploy `frontend` to Vercel. Set `VITE_API_URL` to backend URL.
- Backend: deploy `backend` to Render/Railway. Set environment variables from `.env.example`.

Testing checklist is at the bottom of this repo.
