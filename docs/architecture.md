# Architecture

The course is a single-page application with no backend. All content ships in the JavaScript bundle and learner progress lives in the browser.

## Stack

| Concern | Choice |
|---|---|
| UI | React 19, TypeScript 6 |
| Build | Vite 8 with `@vitejs/plugin-react` |
| Styling | Tailwind CSS 4 utilities plus design tokens in `src/index.css` |
| Routing | React Router 7 (`BrowserRouter`) |
| State | Zustand 5 with the `persist` middleware (localStorage) |
| Motion | Framer Motion 12 |
| Charts | Recharts 3 (profile radar) |
| Icons | lucide-react |
| Hosting | Vercel, static build with an SPA rewrite |

## Source layout

```
src/
  main.tsx                   entry point
  App.tsx                    providers and routes
  index.css                  design tokens, base styles, shared component classes
  lib/
    theme.tsx                light / dark / system theme provider
    tracks.ts                track metadata, progress and level helpers, course totals
    ui.ts                    interface copy in English and Italian
  contexts/                  language provider and resolveString helper
  store/useAppStore.ts       progress store: XP, modules, quizzes, labs, badges, activity
  pages/                     Landing, Dashboard, Track, Module, Cheatsheet, Profile
  components/
    layout/AppShell.tsx      header, mobile menu, footer
    content/                 SectionBlock, Markdown, CodeBlock, LabFrame
    quiz/QuizRunner.tsx      one-question-at-a-time quiz with review
    ui/ProgressRing.tsx      circular progress indicator
    illustrations/TrackArt   theme-aware SVG art for Git, Docker and Kubernetes
    games/                   Git, Docker and Kubernetes simulators (engine, parser, UI, visualizer)
    games/shared/            TerminalOutput (colourised output) and Objectives (task panel)
    modules/                 EducationAnimation and Git labs
    cheatsheet/              command diagrams shown in the cheat-sheet drawer
  data/
    types.ts                 content model
    git|docker|k8s/modules   one file per module
    git|docker|k8s/cheatsheet.ts
    certifications.ts        certification roadmap
    translations.ts          legacy UI strings still used by simulators
scripts/
  apply-content-fixes.mjs    applies the October 2026 content corrections
```

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Landing | Asks for a display name. No account. |
| `/dashboard` | Dashboard | Resume card, track progress, badges, next certification. |
| `/track/:track` | Track | Hero, stats, full syllabus. `track` is `git`, `docker` or `k8s`. |
| `/:track/module/:id` | Module | Theory, labs, then quiz. |
| `/cheatsheet/:track` | Cheat sheet | Searchable command list with an inspect drawer. |
| `/profile` | Profile | Statistics, achievements, certification roadmap, reset. |

Every route except `/` requires a name in the store. Without one, `Protected` in `App.tsx` redirects to the landing page.

## State

`useAppStore` holds all learner data and persists it under the localStorage key `learning-platform-v1`. Version 2 keeps the same key on purpose, so learners keep their progress after the redesign.

| Field | Meaning |
|---|---|
| `userName` | Display name from the landing page. |
| `xp`, `activityLog` | Total XP and XP earned per day (drives streak and heatmap). |
| `completedModules` | Module IDs marked complete. Completion awards the module `xpReward`. |
| `completedQuizzes`, `quizScores` | First attempt awards 10 XP per correct answer plus 100 XP for a perfect score. Retakes only update the best score. |
| `completedLabs` | Lab keys `moduleId:sectionTitle`. Each lab awards 25 XP once. |
| `completedMissions` | External playground missions, 25 to 200 XP, self-reported. |
| `badges` | Awarded on milestones; definitions in `BADGES`. |

Badge rules live in `src/pages/ModulePage.tsx` (`MODULE_BADGE`, `LAB_BADGE`, and the full-stack badge when all three final modules are complete).

Theme preference is stored separately under `theme`, language under `app-language`. Both reads are wrapped so the app still works when storage is unavailable.

## Module page flow

1. `ModulePage` resolves the track and module from the URL.
2. Each entry in `module.sections` renders through `SectionBlock`, which picks a layout by `section.type`.
3. Text goes through `Markdown`, which supports headings, bullet and numbered lists, fenced code, horizontal rules, link rows and inline bold, italic, code and links.
4. Labs, simulators and games render inside `LabFrame`, an always-dark container.
5. The primary button marks the module complete and opens `QuizRunner` when the module has a quiz.
6. `QuizRunner` shuffles options per attempt, shows the explanation after each answer, then saves the score.

## Simulators

Each simulator has the same four parts.

| Part | Responsibility |
|---|---|
| Engine | Holds an immutable-by-copy state object and exposes mutations. |
| Parser | Turns a command string into engine calls and terminal output. |
| Simulator component | Terminal, command history, task checklist, hints, completion callback. |
| Visualizer | Renders the engine state (commit graph, Docker host, cluster). The Kubernetes visualizer measures the DOM and draws SVG lines from each Service to the Pods its selector matches. |

| Track | Folder | State type |
|---|---|---|
| Git | `components/games/git-simulator` | `GitGraphState` |
| Docker | `components/games/docker-simulator` | `DockerState` |
| Kubernetes | `components/games/k8s-simulator` | `K8sState` |

All three simulators share `TerminalOutput`, which colours errors, state words, hashes and resource names, and `Objectives`, which numbers the tasks and highlights the current one.

Tasks are checked in order after each successful command. A task's `condition` string is evaluated against the new state; see [content authoring](content-authoring.md#lab-conditions) for the full list.

The simulator components come from version 1 and use dark-theme utility classes. The `.console` scope in `index.css` redefines every colour token to dark values, so they render correctly inside the light theme too.

## Internationalisation

Content strings use the `LocalizedString` type: either a plain string, or `{ en, it }`. `resolveString` from the language context picks the active language and falls back to English.

Interface copy for version 2 screens lives in `src/lib/ui.ts`. Legacy strings used inside simulators remain in `src/data/translations.ts`.

## Performance notes

The production bundle is a single chunk of about 1.4 MB (about 440 kB gzipped). Most of it is module content and the large `EducationAnimation` component. Route-level code splitting with `React.lazy` is the obvious next step if load time becomes a concern.
