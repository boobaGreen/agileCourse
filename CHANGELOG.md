# Changelog

All notable changes to the Agile Lab DevOps Course.

## 2.0.0 — 2026-10-11

Complete redesign of the interface and a correctness pass on all content.

### Interface

- New design system with dark and light themes, Manrope and JetBrains Mono, one accent colour per track.
- New navigation: top header with track links, dedicated track pages with syllabus and stats, module pages with a syllabus rail and an in-page index.
- Simulators, labs and games now sit in a consistent dark console frame, readable in both themes.
- Quiz rebuilt: one question at a time, explanation right after each answer, review screen at the end. The 15-minute timer is gone.
- Cheat sheets redesigned as scannable lists with search, copy and an inspect drawer for diagrams and example output.
- Profile with level, track progress, six-month activity heatmap, skill radar, achievements and certification roadmap.
- YouTube videos load on click from the privacy-enhanced domain.
- Text renderer now supports headings, lists and code blocks inside module text; v1 showed these as raw characters.
- Theme-aware SVG illustrations for each track on the landing and track pages; module titles show a track badge with the module number instead of an emoji.
- Simulators: coloured terminal output (errors in red, state changes in green, dimmed table headers), numbered objectives with the current step highlighted and a progress bar, terminal and objectives stacked full width.
- Kubernetes visualizer rewritten: animated connection lines from each Service to the Pods it selects, endpoint counts, hover to focus one Service.
- Dark theme by default; light theme one click away and remembered.
- Code splitting: the first visit downloads about 136 kB gzipped instead of 436 kB; pages, labs and charts load on demand.
- Responsive layout tested at phone width (375 px). Visible focus states. Reduced-motion support.

### Content

All 10 substantive errors (2 Git, 5 Docker, 3 Kubernetes) and the listed inaccuracies from [docs/content_review.md](docs/content_review.md) are fixed. Highlights:

- Kubernetes Secrets: corrected the claim that they never touch disk; they are stored in etcd and should be encrypted at rest.
- Docker: `ADD` extracts tar archives only; Compose examples use v2 syntax without `version:`; `depends_on` explained with `service_healthy`; `docker system prune --volumes` warning added.
- Kubernetes: StorageClass uses the EBS CSI driver; "master node" terminology replaced with control plane; NodePort described as discouraged rather than insecure.
- Git: snapshots instead of diffs in module 1, correct `git bisect` workflow, stash explained with a lab before it is quizzed, cheat sheet adds `git switch` and `git restore`.
- Quiz fixes: one question had two correct answers, several options revealed the answer in parentheses.
- Italian localisation completed for Docker modules 2 and 9; typos fixed throughout.
- Removed a copyrighted photograph from Kubernetes module 1.
- Broken GitLab certification link replaced; GitHub and Docker certification links updated.
- Git module XP aligned with the other tracks (100 to 200 XP per module).

### Compatibility

Learner progress is preserved: the store key and data shape are unchanged.

## 1.1.0 — 2026-09-30

Last release of the original interface, kept as tag `v1.1.0` and branch `v1-legacy`. See [docs/archive](docs/archive/README.md) for audits and feedback collected during version 1.
