# CyberShield — Cyber Awareness Game

A full-stack MERN cyber-awareness quiz game that trains players to spot **phishing, weak passwords, malicious QR codes, and scams** across 24 hand-crafted threat scenarios — with lives, difficulty modes, badge tiers, a mission debrief, and a leaderboard. Built with Express 4, MongoDB, React 18, and Zustand.

---

## Features

- **Threat Simulations** — 24 scenarios across Phishing, Password, QR, and Scam categories, each with explanations
- **Difficulty Modes** — Easy, Normal, and Hard pools with per-mode lives
- **Lives & Scoring** — +10 points per correct call, −1 life per miss; lose all lives and the mission ends
- **Badge Tiers** — Cyber Sentinel, Guardian, Aware, and Novice based on score ratio
- **Mission Debrief** — Performance by sector, weakest-category tip, and missed-encounter review
- **Leaderboard** — Top 10 filed scores with badges
- **Personal Best** — Local best-score tracking with new-best callouts

---

## Tech Stack

### Backend
| Package | Purpose |
|---|---|
| Express 4 | HTTP server & routing |
| Mongoose 8 | MongoDB ODM |
| `cors` | CORS allowlist |
| `dotenv` | Environment variable loading |

### Frontend
| Package | Purpose |
|---|---|
| React 18 | UI framework |
| React Router 6 | Client-side routing |
| Zustand 5 | Global state management |
| `motion` | Animations & transitions |
| `react-icons` | Category icons |
| Vite 5 | Build tool |

---

## Project Structure

```
CyberShield/
├── Backend/
│   ├── APIs/
│   │   ├── QuestionAPI.js      # All questions grouped, questions by category
│   │   └── ScoreAPI.js         # Save score, leaderboard
│   ├── config/
│   │   ├── env.js              # Environment variable validation
│   │   └── security.js         # CORS allowlist config
│   ├── models/
│   │   ├── QuestionModel.js
│   │   └── ScoreModel.js
│   ├── server.js
│   ├── seed.js                 # Seeds the 24 threat scenarios
│   ├── package.json
│   └── .env.example
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── LandingPage.jsx
    │   │   ├── MissionLaunch.jsx
    │   │   ├── ThreatSimulation.jsx
    │   │   ├── MissionDebrief.jsx
    │   │   ├── Leaderboard.jsx
    │   │   ├── BootSequence.jsx
    │   │   └── CategoryIcon.jsx
    │   ├── store/
    │   │   └── gameStore.js    # Game state: lives, points, progress (Zustand)
    │   ├── utils/
    │   │   ├── gameConstants.js # Categories, labels, difficulties
    │   │   ├── badges.js        # Badge tiers & calculation
    │   │   ├── questions.js     # Difficulty-pool filtering
    │   │   └── scores.js        # Breakdown, weakest category, best score
    │   ├── api/
    │   │   └── client.js        # Fetch wrapper for the backend APIs
    │   └── App.jsx             # Router config with lazy loading
    ├── package.json
    └── .env.example
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
git clone <repo-url>
cd CyberShield
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill in your values:

```env
DB_URL=mongodb://localhost:27017/cybershield
PORT=5000
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173
NODE_ENV=development
```

Seed the questions:

```bash
npm run seed
```

Start the backend:

```bash
# Development (with file watching)
npm run dev

# Production
npm start
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Routes

### Question (`/question-api`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | — | All questions grouped by category |
| GET | `/:category` | — | Questions for one category (`phishing`, `password`, `qr`, `scam`) |

### Score (`/score-api`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/leaderboard` | — | Top 10 scores, highest first |
| POST | `/` | — | Save a completed game score |

### Health
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server status & uptime |

---

## Deployment

### Backend — Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Set **Build Command**: `npm install`
3. Set **Start Command**: `node server.js`
4. Add all environment variables from `.env.example` under **Environment**
5. Set `NODE_ENV=production`

### Frontend — Vercel

1. Import the `Frontend` folder into [Vercel](https://vercel.com)
2. Set **Framework Preset**: Vite
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`

After deploying both, update `CLIENT_URLS` in your backend env to include your frontend URL.

---

## Environment Variables Reference

### Backend

| Variable | Description |
|---|---|
| `DB_URL` | MongoDB connection string |
| `PORT` | Server port (default: 5000) |
| `CLIENT_URL` | Primary frontend URL (dev) |
| `CLIENT_URLS` | Comma-separated allowed origins (prod) |
| `NODE_ENV` | `development` or `production` |

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend base URL |

---

## Author

**K Chethan Sai**
GitHub: [@KChethansai](https://github.com/KChethansai)
