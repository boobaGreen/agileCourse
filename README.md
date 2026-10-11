# Agile Lab · DevOps Course

An interactive course on **Git**, **Docker** and **Kubernetes** for engineering teams. Learners read short modules, type real commands into simulated terminals, and check their understanding with quizzes. Progress, XP and badges are saved in the browser; there is no account and no backend.

**Live:** https://agile.claudiodallara.it

## Curriculum

| Track | Modules | Quiz questions | Labs and challenges | Cheat-sheet commands |
|---|---|---|---|---|
| Git | 11 | 63 | 18 | 28 |
| Docker | 9 | 34 | 11 | 22 |
| Kubernetes | 9 | 42 | 9 | 24 |
| **Total** | **29** | **139** | **38** | **74** |

<details>
<summary>Module list</summary>

**Git** · What is Version Control? · The Name & Origin Story · Core Concepts · Working with Branches · Remote & Collaboration · Common Workflows · Daily Fundamentals · Time Travel & Safety · Power User Tools · Git Games & Interactive Labs · Final Quiz

**Docker** · What is a Container? · Images vs Containers · The Dockerfile · Docker Hub & Registries · Volumes & Persistence · Networking & Ports · Docker Compose · Hands-on Labs & Playgrounds · Final Docker Challenge

**Kubernetes** · The Need for Orchestration · Cluster Architecture · Pods & kubectl · Deployments & Self-Healing · Services & Networking · ConfigMaps & Secrets · Storage & Persistence · Hands-on Labs: Playground · Final K8s Challenge

</details>

## Features

- **Simulators** for Git (live commit graph), Docker (images, containers, volumes, networks, Compose) and Kubernetes (nodes, Pods, Deployments, Services, ConfigMaps, Secrets, PVCs, Helm). Each lab has ordered objectives and progressive hints.
- **Interactive labs** for staging, merge vs rebase, remote sync, force push, stash, `.gitignore`, image layers and cluster architecture.
- **Quizzes** with shuffled options and an explanation for every answer.
- **Cheat sheets** with search, copy, example output and diagrams.
- **Progress**: XP, levels, badges, daily streak, activity heatmap, skill radar and a roadmap to GitHub, GitLab, Docker and CNCF certifications.
- **English and Italian**, **light and dark** themes, responsive down to phone width.

## Quick start

Requires Node.js 20 or later. The application lives in `app/`.

```bash
cd app
npm install
npm run dev
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-check and production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

## Documentation

| Document | Contents |
|---|---|
| [Architecture](docs/architecture.md) | Stack, source layout, routes, state, simulators, i18n |
| [Design system](docs/design-system.md) | Tokens, themes, typography, components, accessibility |
| [Content authoring](docs/content-authoring.md) | Adding modules, sections, labs, quizzes, cheat-sheet commands, translations |
| [Deployment](docs/deployment.md) | Vercel setup, previews, release checklist, rollback |
| [Content review](docs/content_review.md) | October 2026 correctness audit |
| [Changelog](CHANGELOG.md) | Release history |

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router 7 · Zustand · Framer Motion · Recharts · lucide-react · Vercel
