# DevHarbor — Project Plan

## What is this?
Internal horizontal training platform for Git, Docker & Kubernetes.
Built with **React + TypeScript + Tailwind CSS** (Vite).

## Folder structure
```
course_agile/
├── PLAN.md              ← you are here
├── info.txt             ← origin stories, certs, platform research
├── argomenti.txt        ← topic notes
├── git/                 ← (reserved for future static content)
├── docker/              ← (reserved)
├── k8s/                 ← (reserved)
└── app/                 ← React application
    ├── src/
    │   ├── data/git/modules.ts   ← All 9 Git modules + 60+ quiz questions
    │   ├── store/useAppStore.ts  ← Zustand + localStorage
    │   ├── pages/
    │   │   ├── LandingPage.tsx
    │   │   ├── CourseDashboard.tsx
    │   │   ├── ModulePage.tsx
    │   │   ├── ProfilePage.tsx
    │   │   ├── LeaderboardPage.tsx
    │   │   └── CertRoadmapPage.tsx
    │   └── components/
    │       └── AppShell.tsx
    └── package.json
```

## How to run
```
cd app
npm run dev
```
Then open http://localhost:5173

## Current status
- ✅ Git track — 9 modules, 60+ quiz questions
- 🔒 Docker track — coming next
- 🔒 Kubernetes track — coming after Docker

## Tech stack
| Layer | Choice |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| State | Zustand + localStorage |
| Animation | Framer Motion |
| Icons | Lucide React |

## Backlog (future)
- [ ] Shared leaderboard (backend/Supabase)
- [ ] Employee list / real login
- [ ] Docker track (9 modules)
- [ ] Kubernetes track (9 modules)
- [ ] Interactive games (Branch Builder, Terminal Simulator)
- [ ] Mobile app version
