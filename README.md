# CyberShield — Project Report

## 1. Project Overview

CyberShield is a full-stack, gamified cyber-defense awareness web application structured as an interactive "Digital Safety Escape Room." Designed to train digital instincts against modern cyber threats, the application immerses operatives in simulated threat vectors—spanning phishing campaigns, weak/reused credentials, poisoned QR codes (quishing), and social engineering scams—across a 200-scenario bank (50 per vector; 10 drawn per vector per run).

Featuring real-time telemetry, difficulty tiers, dynamic lives/shield mechanics, per-question countdown pressure, instant actionable debriefs, and a persistent global mainframe leaderboard, CyberShield combines military-grade tactical HUD aesthetics (Obsidian Vanguard HUD) with rigorous full-stack MERN architecture.

All scenarios, intercepts, and breaches in the application are simulated drills designed for cybersecurity education, corporate hygiene training, and competitive awareness workshops.

---

## 2. Problem Statement

Cyber attacks targeting individual digital habits—such as spear-phishing, credential harvesting, QR redirection, and financial urgency fraud—continue to cause massive organizational and personal breaches. Traditional cybersecurity awareness programs suffer from critical flaws:

- **Static and Boring Content:** Passive video lectures and multiple-choice quizzes fail to build rapid pattern-recognition instincts under pressure.
- **Unrealistic Scenarios:** Generic questions with obvious fake options do not reflect subtle, real-world attacker techniques (e.g., lookalike domains, urgent HR memos, physical parking meter tampering).
- **Delayed or Absent Feedback:** Users are typically told only whether an answer was right or wrong at the end of a module, missing the immediate cognitive link between the threat indicator and the defense protocol.
- **Lack of Consequence and Urgency:** Real attacks leverage urgency and pressure; standard awareness tests have unlimited time and no stakes.
- **No Remedial Guidance:** Players finish without knowing their specific vulnerability areas or which vectors require remedial training.

CyberShield solves these problems through an immersive, high-stakes tactical console that enforces time pressure, visual telemetry, instant educational debriefs, and an exhaustive after-action analysis.

---

## 3. Proposed Solution

CyberShield provides a responsive, web-based tactical simulation environment where operatives:

1. **Authorize Mission Cockpit Links:** Engage through a thematic terminal boot sequence with animated system handshakes and connection integrity checks.
2. **Select Operating Tiers:** Choose between Recruit (Easy), Analyst (Normal), or Sentinel (Hard) intensity tiers that adjust question difficulty pools and starting shield integrity.
3. **Neutralize Multi-Vector Threats:** Inspect raw telemetry payloads (origin IP, lookalike sender headers, domain TLDs, and urgency flags) before making defense calls.
4. **Experience Timed Pressure:** Operate against an active per-question countdown clock; timer expirations trigger integrity breaches and shield loss.
5. **Receive Immediate Tactical Debriefs:** View real-time technical explanations immediately following each call, dissecting exactly why an indicator is legitimate, suspicious, or malicious.
6. **Analyze Mission Debriefs:** Review comprehensive after-action reports featuring clearance badge conferring, sector-by-sector accuracy breakdowns, priority training advisories, and an interactive mistake log.
7. **Compete on Global Mainframe:** Commit verified telemetry scores to a persistent MongoDB leaderboard with rate-limiting abuse protection and local fallback resilience.

The entire architecture is implemented as a cohesive, pure JavaScript MERN stack with native browser capabilities, zero heavy third-party UI dependencies, and complete offline capability.

---

## 4. Key Features

### 4.1 Four Core Threat Vectors (200-Scenario Pool, 10 Per Vector Per Run)
- **Phishing Defense:** Spear-phishing, credential-harvesting lookalikes (`amaz0n-secure.xyz`, `company-portal.com`, `gooogle-drive-docs.com`), fake IT MFA rollout announcements, and legitimate reset notifications.
- **Password Security:** Entropy analysis, dictionary vulnerability, multi-word passphrase superiority, credential stuffing, and cross-site reuse risks.
- **QR Code Safety (Quishing):** Physical sticker tampering on parking meters, fraudulent café flyers demanding OTPs, restaurant digital menus, and UPI checkout scams.
- **Scam Spotting:** UPI collect request fraud, fake bank KYC SMS, courier fee redelivery traps, fraudulent work-from-home recruitment, and phone vishing.

### 4.2 Tactical Game Engine & HUD
- **Obsidian Vanguard HUD Aesthetic:** Tactical command console styling with scanlines, CRT dot matrix, phosphor green (`#00ff88`), telemetry cyan (`#00d4ff`), and warning crimson (`#ff3366`).
- **Dynamic Shield Integrity:** Starting shields calibrated to selected intensity tier (3 lives on Recruit/Analyst, 2 lives on Sentinel); breaches decrement shield integrity until mission compromise.
- **Per-Question Countdown Timer:** 30-second live tactical countdown with visual pulse; expiration triggers defense compromise, deduction of 1 shield, and automatic logging as `TIME EXPIRED`.
- **Zero-Dependency Native Audio:** Real-time dual-tone phosphor chime for verified intercepts and low warning saw-wave pulses for breaches synthesized purely via the native Web Audio API.
- **Session Persistence:** Zustand state integrated with `sessionStorage` allows operatives to reload or resume active missions seamlessly without losing progress.

### 4.3 Comprehensive After-Action Debrief
- **Clearance Badge Conferred:** Dynamic badge tier assignment scaled to achievable max score:
  - **Cyber Sentinel** (Ratio $\ge$ 91.6%): Expert operative thinking like a senior security analyst.
  - **Guardian** (Ratio $\ge$ 70.8%): Strong defense instincts with elevated vigilance.
  - **Aware** (Ratio $\ge$ 41.6%): Decent baseline requiring tactical reinforcement.
  - **Novice** (Ratio < 41.6%): High vulnerability requiring remedial training drills.
- **Performance by Tactical Sector:** Mathematical sector breakdown showing neutralized vs. vulnerable sectors.
- **Priority Training Advisory:** Automated vulnerability detection identifying the operative's weakest vector.
- **Interactive Missed Intercept Review:** Expandable drawer detailing every miss with the operative's call, verified protocol, and in-depth post-mortem explanation.
- **Shareable Telemetry:** Integrated Web Share API with one-click clipboard fallback for sharing mission clearances.

### 4.4 Global Mainframe Leaderboard & Analytics
- Top 10 operative scores sorted descending at the database level.
- Callsign submission with client-side and server-side validation (1–30 characters).
- Rate-limiting protection (maximum 10 submissions per IP per 15-minute window).
- Server-side aggregate telemetry analytics endpoint (`/score-api/analytics`) tracking missions played, average score, high score, badge distribution, and sector miss frequency.
- Offline resilience via local storage fallback with zero junk placeholder records.

### 4.5 Operative Accounts (Optional Sign-Up / Sign-In)
- Callsign + email registration with bcrypt-hashed passwords (12 rounds); instant session on sign-up.
- JWT session in an httpOnly cookie (`secure` in production, `sameSite=lax`); session restored on app load via `/api/auth/me`.
- Personal dossier (`/profile`): best score, earned badge, and per-mission history via protected `/score-api/mine`.
- Leaderboard files scores under the authenticated callsign; guest play stays fully functional with unlinked scores.
- Rate limiting on register/login; generic `Invalid credentials` on login failure (no user enumeration); password hashes never leave the database.

---

## 5. Technologies Used

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 18, Vite 5, React Router 6, Zustand 5 |
| **Styling & HUD** | Tailwind CSS 4, Obsidian Vanguard CSS Tokens, Space Grotesk, JetBrains Mono |
| **Animation & Motion** | Motion (`motion/react`) |
| **Icons & Audio** | `react-icons`, Material Symbols Outlined, Native Web Audio API |
| **Backend** | Node.js, Express 4 |
| **Database & ODM** | MongoDB, Mongoose 8 |
| **Security & Routing** | CORS allowlist (credentials), bcryptjs password hashing, JWT httpOnly cookies, in-memory rate limiting, environment validation |
| **Testing & Automation** | Playwright MCP, Node.js Test Runners |

---

## 6. Implementation Details

### 6.1 System Architecture

```text
Operative Browser
    │
    ▼
React 18 + Vite SPA (Obsidian Vanguard HUD)
    │  REST JSON / Fetch with CORS
    ▼
Express API Server (:5000)
    ├── Question API (/question-api)
    │   ├── GET /           Grouped questions across 4 sectors
    │   └── GET /:category  Filtered questions for specific threat vector
    ├── Score API (/score-api)
    │   ├── GET /leaderboard Top 10 operative rankings
    │   ├── GET /analytics   Global telemetry stats & miss rates
    │   └── POST /           Rate-limited score submission
    └── Health API (/api/health)
    │
    ▼
MongoDB / Mongoose ODM (:27017)
    ├── question collection (200 threat vectors: 50 per category, 24 originals + 176 added)
    └── score collection (callsign, totalScore, breakdown, badge, timestamps)
```

### 6.2 Backend Modules

```text
Backend/
├── APIs/
│   ├── AuthAPI.js        # Register/login/logout/me, JWT httpOnly cookie, rate limited
│   ├── QuestionAPI.js    # Grouped and single-sector question endpoints
│   └── ScoreAPI.js       # Score filing, top-10 leaderboard, analytics, /mine & rate limiting
├── config/
│   ├── env.js            # Environment variable validation & fallback (DB_URL, JWT_SECRET required)
│   └── security.js       # CORS origin allowlist with credentials support
├── middlewares/
│   └── verifyToken.js    # Strict + optional JWT session auth, cookie options
├── models/
│   ├── QuestionModel.js  # Scenario schema with category, options, difficulty
│   ├── ScoreModel.js     # Score schema with indexed totalScore and optional userId link
│   └── UserModel.js      # Operative account: unique username/email, bcrypt hash (never returned)
├── questions-data.js     # 200-scenario bank: 50 per category in 4 insert batches
├── validate-seed.js      # DB-free validator: counts, index bounds, duplicate detection
├── seed.js               # Wipe-and-reseed database seeder (200 questions, batched per category)
└── server.js             # Express app, security middleware, graceful shutdown
```

### 6.3 Tactical Threat Evaluation & Scoring Protocol

1. **Scoring Formula:** Each neutralized threat awards exactly $+10$ points. A playthrough pulls a randomized subset of 10 questions per vector (40 total), so max score is $400$ points on every tier.
2. **Integrity Breaches:** Choosing an incorrect option or permitting the 30-second timer to expire decrements shield integrity by $1$.
3. **Terminal Breach:** When shields reach $0$, the mission terminates immediately into an early after-action debrief; no further intercepts may be attempted.
4. **Badge Ratio Scaler:**
   $$\text{Ratio} = \frac{\text{Operative Score}}{\text{Max Achievable Score}}$$
   - $\text{Ratio} \ge \frac{220}{240} \implies \textbf{Cyber Sentinel}$
   - $\text{Ratio} \ge \frac{170}{240} \implies \textbf{Guardian}$
   - $\text{Ratio} \ge \frac{100}{240} \implies \textbf{Aware}$
   - $\text{Ratio} < \frac{100}{240} \implies \textbf{Novice}$

### 6.4 Zero-Dependency Native Audio Engine

Implemented in `Frontend/src/utils/audio.js` using the standard browser `AudioContext`:
- **Verified Call:** Dual-frequency sine sweep from $587.33\text{ Hz}$ (D5) to $880\text{ Hz}$ (A5) over $120\text{ ms}$ with exponential gain decay.
- **Compromise Alert:** Low triangle drop from $220\text{ Hz}$ (A3) down to $130.81\text{ Hz}$ (C3) over $200\text{ ms}$.
- Guaranteed $0\text{ KB}$ network overhead and immune to 404 audio file errors.

### 6.5 Frontend Navigation & State Flow

```text
/ (Landing Page)
    │  Initialize Mission
    ▼
[BootModal Handshake]
    │  Authorize Link
    ▼
/launch (Cockpit Setup & Tier Selection: Recruit / Analyst / Sentinel)
    │  Engage Protocol
    ▼
/play (Threat Simulation Active)
    ├── Sector 01: Phishing Defense (10 Scenarios, random subset of 50)
    ├── Sector 02: Password Security (10 Scenarios, random subset of 50)
    ├── Sector 03: QR Code Safety (10 Scenarios, random subset of 50)
    └── Sector 04: Scam Spotting (10 Scenarios, random subset of 50)
    │  All Shields Lost OR All 4 Sectors Cleared
    ▼
/result (Tactical Mission Debrief)
    ├── Badge Conferred & Sector Accuracy
    ├── Missed Intercepts Review Log
    ├── Share Telemetry (Web Share / Clipboard)
    └── Commit Callsign to Mainframe
    │  Navigate
    ▼
/leaderboard (Mainframe Intelligence Archive)
```

---

## 7. Repository Structure

```text
cybershield/
├── Backend/
│   ├── APIs/
│   │   ├── AuthAPI.js        # Operative register/login/logout/me (JWT cookie)
│   │   ├── QuestionAPI.js    # Threat scenario queries
│   │   └── ScoreAPI.js       # Leaderboard, score commit, telemetry analytics, /mine
│   ├── config/
│   │   ├── env.js            # Environment validation (DB_URL, JWT_SECRET required)
│   │   └── security.js       # CORS security policies (credentials enabled)
│   ├── middlewares/
│   │   └── verifyToken.js    # Strict + optional JWT session auth
│   ├── models/
│   │   ├── QuestionModel.js  # Mongoose scenario schema
│   │   ├── ScoreModel.js     # Mongoose leaderboard score schema (+ optional userId)
│   │   └── UserModel.js      # Mongoose operative account schema (bcrypt hash)
│   ├── .env.example
│   ├── package.json
│   ├── questions-data.js     # 200-scenario bank (50 per category, 4 batches)
│   ├── validate-seed.js      # DB-free seed validator (counts, bounds, duplicates)
│   ├── seed.js               # Wipe-and-reseed scenario seeder (200 questions)
│   └── server.js             # Server entry point
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js     # API client with offline fallback
│   │   ├── components/
│   │   │   ├── hud/          # Reusable tactical HUD components
│   │   │   │   ├── Atmosphere.jsx
│   │   │   │   ├── BootModal.jsx
│   │   │   │   ├── BracketPanel.jsx
│   │   │   │   ├── DecisionOption.jsx
│   │   │   │   ├── Equalizer.jsx
│   │   │   │   ├── HudHeader.jsx
│   │   │   │   ├── SegmentedProgress.jsx
│   │   │   │   ├── ShieldLives.jsx
│   │   │   │   ├── StatusBadge.jsx
│   │   │   │   ├── TelemetryFooter.jsx
│   │   │   │   └── TelemetryStrip.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── MissionDebrief.jsx
│   │   │   ├── MissionLaunch.jsx
│   │   │   ├── Profile.jsx       # Operative dossier: best score, badge, history
│   │   │   ├── SignIn.jsx        # HUD-styled sign-in with themed errors
│   │   │   ├── SignUp.jsx        # HUD-styled registration with themed errors
│   │   │   └── ThreatSimulation.jsx
│   │   ├── hooks/
│   │   │   └── useQuestionTimer.js
│   │   ├── store/
│   │   │   ├── authStore.js  # Zustand identity state (cookie session, checkMe on load)
│   │   │   └── gameStore.js  # Zustand store with sessionStorage persistence
│   │   ├── utils/
│   │   │   ├── audio.js      # Web Audio API chime synthesizer
│   │   │   ├── badges.js     # Badge classification thresholds
│   │   │   ├── fallbackQuestions.js # Offline emergency questions pack (24)
│   │   │   ├── gameConstants.js # Categories, lives, QUESTIONS_PER_CATEGORY (10)
│   │   │   ├── highlight.jsx # Technical terms syntax highlighter
│   │   │   ├── questions.js  # Difficulty filter + randomized subset selection
│   │   │   └── scores.js     # Accuracy, breakdowns, personal best
│   │   ├── App.jsx           # Routes with dynamic TitleManager & 404 handler
│   │   ├── index.css         # Obsidian Vanguard Tailwind design system
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html            # Meta tags, Open Graph, and SVG favicon
│   ├── package.json
│   └── vite.config.js
├── DESIGN.md                 # Obsidian Vanguard HUD design specification
└── README.md                 # Project Report
```

---

## 8. Installation and Execution

### 8.1 Prerequisites

- Node.js 18 or later.
- MongoDB instance (local `mongod`, Docker/Podman container, or MongoDB Atlas).

### 8.2 Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Configure `Backend/.env`:
```env
DB_URL=mongodb://127.0.0.1:27017/cybershield
JWT_SECRET=change-me-to-a-long-random-string-in-production
PORT=5000
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173
NODE_ENV=development
```

> Seed behavior: `npm run seed` is wipe-and-reseed (deletes all questions, then
> inserts the 200-scenario bank in 4 per-category batches). Validate content
> any time with `node validate-seed.js` (no database needed).

### 8.3 Frontend Setup

```bash
cd ../Frontend
npm install
cp .env.example .env
npm run dev
```

Configure `Frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

The application will be accessible at `http://localhost:5173`.

### 8.4 Available Commands

**Backend:**
```bash
npm run dev     # Starts Express backend with node --watch
npm start       # Starts production Express server
npm run seed    # Seeds or resets the 200 threat scenarios idempotently (50 per category)
```

**Frontend:**
```bash
npm run dev     # Starts Vite development server with HMR
npm run build   # Compiles optimized production bundle into dist/
npm run preview # Previews the production build locally
```

---

## 9. Environment Variables

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `DB_URL` | Yes | MongoDB connection URI (e.g. `mongodb://127.0.0.1:27017/cybershield`) |
| `JWT_SECRET` | Yes | Secret for signing session JWTs (long random string; never commit the real one) |
| `PORT` | No | Express port; defaults to `5000` |
| `CLIENT_URL` / `CLIENT_URLS` | No | Comma-separated list of allowed frontend origins for CORS |
| `NODE_ENV` | No | Environment mode: `development` or `production` |

### Frontend

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Base URL of the backend API (defaults to `http://localhost:5000`) |

---

## 10. API Summary

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Service health status and uptime verification |
| `GET` | `/question-api` | Returns all 200 scenarios grouped by category |
| `GET` | `/question-api/:category` | Returns scenarios filtered by vector (`phishing`, `password`, `qr`, `scam`) |
| `GET` | `/score-api/leaderboard` | Returns top 10 operative scores sorted by `totalScore` descending |
| `GET` | `/score-api/analytics` | Returns aggregate statistics (total missions, avg score, badge counts, miss rates) |
| `GET` | `/score-api/mine` | Returns the signed-in operative's history + best (requires session cookie) |
| `POST` | `/score-api` | Submits and persists an operative score (rate limited: 10 per 15 min per IP; optional `userId` links it to an account, guest scores store `null`) |
| `POST` | `/api/auth/register` | Creates an operative account and starts a session (rate limited: 10 per hour per IP) |
| `POST` | `/api/auth/login` | Signs in with callsign or email (generic `Invalid credentials` on failure; rate limited: 10 per 15 min per IP) |
| `POST` | `/api/auth/logout` | Clears the session cookie |
| `GET` | `/api/auth/me` | Returns the current session operative (requires session cookie; never includes the password hash) |

---

## 11. Known Limitations

- **Simulated Email / Web Views:** Intercepted threats are presented in high-fidelity monospace telemetry panels rather than full sandboxed browser webviews.
- **Single-User Rate Limiting:** The in-memory sliding window rate limiter resets on server process restart; production multi-cluster deployments should integrate Redis.
- **Offline Question Pack Sync:** Offline emergency questions are bundled statically (24 scenarios); the live pool holds 200. Gameplay works offline from the static pack; counts differ until the backend is reachable.
- **Operative Accounts Are Optional:** Sign-up/sign-in persist leaderboard identity, best score, and history via an httpOnly JWT cookie; guest play remains fully functional with scores stored unlinked.

---

## 12. Future Scope

- **Custom Threat Scenario Builder:** Allow enterprise administrators and instructors to upload custom organizational spear-phishing templates via a protected portal.
- **Multiplayer Operative Drill:** Real-time synchronized squad escape room challenges using WebSockets.
- **Phishing URL Scanner Integration:** Live integration with VirusTotal or Google Safe Browsing API for real-time domain risk lookup drills.
- **Hardware YubiKey / WebAuthn Simulation:** Interactive physical MFA tokens and FIDO2 verification training modules.
- **Exportable PDF Security Clearance Certificate:** Cryptographically verifiable training completion certificates for corporate compliance audits.

---

## 13. References / Bibliography

1. CISA (Cybersecurity and Infrastructure Security Agency) Phishing Awareness: [https://www.cisa.gov/secure-our-world/recognize-and-report-phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing)
2. NIST Special Publication 800-63B — Digital Identity Guidelines & Password Practice: [https://pages.nist.gov/800-63-3/sp800-63b.html](https://pages.nist.gov/800-63-3/sp800-63b.html)
3. FTC (Federal Trade Commission) How to Recognize and Avoid Phishing Scams: [https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams](https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams)
4. Express.js Documentation: [https://expressjs.com/](https://expressjs.com/)
5. React 18 Documentation: [https://react.dev/](https://react.dev/)
6. Zustand State Management: [https://zustand.docs.pmnd.rs/](https://zustand.docs.pmnd.rs/)
7. Tailwind CSS v4 Documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
8. Web Audio API W3C Specification: [https://www.w3.org/TR/webaudio/](https://www.w3.org/TR/webaudio/)
9. Mongoose ODM Documentation: [https://mongoosejs.com/docs/](https://mongoosejs.com/docs/)

---

## 14. Team Members

| Name | Roll Number |
| --- | --- |
| K Chethan Sai | `24EG110A17` |
| Sanjay | `24EG105M58` |
| Neha | `24EG105V11` |
| Vinuthan | `24EG105Q30` |
| Sai Sathvik | `24EG105J45`|

GitHub: [@KChethansai](https://github.com/KChethansai)
