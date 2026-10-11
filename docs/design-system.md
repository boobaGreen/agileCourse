# Design system

The visual language is editorial and calm: dark by default with a light alternative, generous whitespace, strong type, one accent colour per track. Interactive consoles are always dark, so terminals look like terminals in both themes.

All tokens live in `src/index.css`.

## Themes

| Theme | How it is selected |
|---|---|
| Dark | Default. `data-theme="dark"` on `<html>`. |
| Light | Chosen with the header toggle; stored as `theme=light`. |

`ThemeProvider` in `src/lib/theme.tsx` manages the preference and stores it under `theme`. A small inline script in `index.html` applies the dark attribute before React loads, which avoids a flash of the wrong theme.

## Colour tokens

Use the CSS variables, never raw hex values, in new components.

| Token | Role | Light | Dark |
|---|---|---|---|
| `--t-bg` | Page background | `#f6f6f3` | `#0f1113` |
| `--t-surface` | Cards and panels | `#ffffff` | `#15181b` |
| `--t-surface2` | Subtle fills, hover | `#f0f0ec` | `#1c2024` |
| `--t-surface3` | Progress track, empty states | `#e7e7e2` | `#23282d` |
| `--t-border` | Default border | `#e3e3dd` | `#262b30` |
| `--t-border-strong` | Inputs, ghost buttons | `#cfcfc7` | `#343a41` |
| `--t-fg` | Primary text | `#17191c` | `#ecedee` |
| `--t-sub` | Body text | `#4d525a` | `#aab0b7` |
| `--t-muted` | Captions, metadata | `#7b8089` | `#7a818a` |
| `--t-primary` | Neutral primary action | `#17191c` | `#ecedee` |
| `--t-git` | Git track accent | `#d9480f` | `#ff7a3d` |
| `--t-docker` | Docker track accent, links, focus ring | `#0b6fc2` | `#4aa8ff` |
| `--t-k8s` | Kubernetes track accent | `#5a3fd1` | `#a08cff` |
| `--t-xp` | XP and warnings | `#b7791f` | `#e2b04a` |
| `--t-green` | Success, correct answers | `#1e8a4c` | `#3ccf7a` |
| `--t-danger` | Errors, wrong answers, destructive actions | `#c92a2a` | `#ff6b6b` |

### Track accent

Pages and components set `--track` to the current track colour, for example `style={{ '--track': track.color }}`. Classes such as `.btn-track`, `.tag-track`, `.progress` and `.side-item.done` read `--track`, so a component only needs the variable set on an ancestor.

### Console scope

Add the `console` class to any container that must stay dark. It redefines every `--t-*` token with dark values. `LabFrame`, code blocks and the cheat-sheet diagram area use it.

## Typography

| Use | Font | Class |
|---|---|---|
| Interface and body | Manrope 400 to 800 | default |
| Code, terminals, numbers in tables | JetBrains Mono 400 to 600 | `font-mono`, `.inline-code` |

| Class | Size | Use |
|---|---|---|
| `.display` | fluid, about 40 to 68 px | Landing headline only |
| `.h1` | fluid, 32 to 52 px | Page titles |
| `.h2` | fluid, 24 to 34 px | Section titles |
| `.h3` | 20 px | Card and block titles |
| `.lead` | 18 px | Intro paragraphs |
| `.prose-body` | 16 px, line-height 1.72 | Module text |
| `.eyebrow` | 11 px, uppercase, tracked | Labels above titles |

## Components

| Class | Purpose |
|---|---|
| `.panel` | Standard card with border and small shadow. |
| `.btn` with `.btn-primary`, `.btn-track`, `.btn-ghost`, `.btn-soft`, `.btn-danger` | Buttons. Add `.btn-sm` or `.btn-lg` for size. |
| `.icon-btn` | Square 36 px icon button. |
| `.tag`, `.tag-track` | Small pill labels. |
| `.nav-link`, `.side-item` | Header navigation and module syllabus rail. |
| `.progress > span` | Linear progress bar. |
| `.callout`, `.callout-tip`, `.callout-analogy` | Tips, analogies, fun facts. Set `--accent` for a custom stripe. |
| `.code-frame` | Dark code block with header and copy button (`CodeBlock`). |
| `.data-table` | Content tables. |
| `.quiz-option` with `.selected`, `.correct`, `.wrong` | Quiz answers. |
| `.input` | Text inputs. |
| `.lab-frame` | Dark frame around simulators (`LabFrame`). |

## Illustrations

`src/components/illustrations/TrackArt.tsx` draws one SVG per track (commit graph, image layers to containers, Service routing to Pods). They use only colour tokens, so they adapt to both themes and to the track accent. Prefer extending these over adding raster images: they stay sharp, weigh a few kilobytes and need no licence review.

## Layout

- `.container-x` caps content at 1200 px with 16 / 24 / 32 px side padding.
- Module pages use three columns on wide screens: syllabus rail (240 px), article (max 768 px), in-page index (200 px). The rails collapse below 1024 px and 1280 px.
- Reading width for module text stays below about 75 characters per line.

## Motion and accessibility

- Motion is short and functional: fade-up on page entry, slide between quiz questions, spring for drawers.
- `prefers-reduced-motion` disables animations and transitions globally.
- Every interactive element shows a visible focus ring (`:focus-visible`, 2 px in the Docker accent).
- Body text on surfaces meets WCAG AA contrast in both themes.
- Icon-only buttons carry `aria-label`.
