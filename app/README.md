# Agile Lab · DevOps Course (v2)

Redesign of the Git / Docker / Kubernetes learning platform. Same curriculum and simulators as v1 (`../agileCourse`), with corrected content, a new design system and a rewritten UI.

## Run

```bash
npm install
npm run dev
```

Build: `npm run build` (type-check + Vite). Preview: `npm run preview`.

## What changed from v1

- **Design system**: light theme by default, dark theme toggle (persisted, follows system by default), Manrope + JetBrains Mono, per-track accent colours (`--t-git`, `--t-docker`, `--t-k8s`), tokens in `src/index.css`.
- **Consoles**: every simulator, lab and game renders inside an always-dark `.console` frame (`LabFrame`), so the legacy simulator components keep working in both themes.
- **Navigation**: top header, track pages with syllabus, module pages with left syllabus rail and right "in this module" index, cheat sheets as scannable lists with an inspect drawer.
- **Quiz**: one question at a time with immediate explanation, results review, no timer.
- **Content renderer**: `src/components/content/Markdown.tsx` handles headings, lists, fenced code blocks and nested inline markup that v1 printed raw.
- **Content corrections**: all items from `docs/content_review.md` applied by `scripts/apply-content-fixes.mjs` (106 replacements), plus Italian localisation of Docker modules 2 and 9 and the removal of the copyrighted Star Trek photo.
- **XP balance**: Git module rewards normalised (100 to 200 XP) to match Docker and Kubernetes.

## Layout

```
src/
  index.css                 tokens, base styles, legacy utility classes used by simulators
  lib/                      theme, track metadata, UI copy (en/it)
  components/layout         AppShell (header, mobile menu, footer)
  components/content        Markdown, CodeBlock, SectionBlock, LabFrame
  components/quiz           QuizRunner
  components/games          Git / Docker / K8s engines, parsers and simulators (from v1)
  components/modules        EducationAnimation and labs (from v1)
  components/cheatsheet     command diagrams (from v1)
  pages/                    Landing, Dashboard, Track, Module, Cheatsheet, Profile
  data/                     modules, quizzes, cheat sheets (corrected)
  store/                    zustand progress store (localStorage key learning-platform-v1)
```

Progress is stored in the browser under the same key as v1, so existing learners keep their XP.
