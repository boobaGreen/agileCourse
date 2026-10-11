# Content authoring

All course content is TypeScript data in `src/data`. There is no CMS. A content change is a code change, reviewed and deployed like any other.

## Add a module

1. Create `src/data/<track>/modules/<track>-<n>.ts` exporting a `Module`.
2. Import it in `src/data/<track>/modules/index.ts` and append it to the array. The array order is the syllabus order.
3. Run `npm run dev`, open `/<track>/module/<id>`, and check both languages and both themes.
4. Run `npm run build` before opening a pull request. The type-checker catches most data mistakes.

Track pages, the dashboard, the landing counters and the syllabus rail pick the module up automatically.

## Module fields

```ts
export const docker10: Module = {
  id: 'docker-10',               // unique, used in URLs and progress
  track: 'docker',               // 'git' | 'docker' | 'k8s'
  order: 10,                     // shown as "Module 10 / N"
  title: { en: '…', it: '…' },
  subtitle: { en: '…', it: '…' },
  emoji: '🏗️',
  duration: '15 min',            // free text, shown as reading time
  xpReward: 150,                 // awarded once on completion
  funFact: { en: '…', it: '…' }, // optional
  sections: [ /* see below */ ],
  quiz: [ /* optional */ ],
  externalLink: { label, url, xpPrompt }, // optional self-reported mission
}
```

### XP guidelines

| Module kind | XP |
|---|---|
| Introductory or story module | 100 |
| Core hands-on module | 120 to 200 |
| Final challenge | 200 to 250 |

Keep the three tracks within a similar total so the skill radar stays fair.

## Section types

| `type` | Renders as | Required fields |
|---|---|---|
| `intro` | Lead paragraph | `content` |
| `concept` | Heading and body text | `content`, usually `title` |
| `tip` | Amber callout | `content` |
| `analogy` | Blue callout | `content` |
| `code` | Text plus dark code block with copy | `content`, `code`, `language` |
| `table` | Responsive table | `tableData.headers`, `tableData.rows` |
| `flowchart` | Horizontal step diagram | `diagramSteps[]` with `label`, optional `icon`, `color` |
| `video` | Click-to-load YouTube embed (privacy-enhanced domain) | `videoUrl` |
| `infographic` | Image with caption | `imageUrl` |
| `animation` | Interactive lab in a dark frame | `animationType` |
| `game` | Mini-game or simulator in a dark frame | `gameType`, `gameData` |

### Writing text

`content` supports a small Markdown subset:

- `**bold**`, `*italic*`, `` `code` ``, `[label](https://…)` and bare URLs.
- Lines starting with `#` to `####` become headings.
- Lines starting with `-`, `•` or `*` become bullet lists. `1.` starts a numbered list.
- Fenced code blocks with a language: ` ```yaml `.
- A line `---` draws a separator.
- A line of links joined by ` · ` renders as a row of buttons.

Keep paragraphs short. Prefer a table or a list over a long sentence with many commas. Do not put the answer to a quiz in the option text itself.

### Animation types

| `animationType` | What it shows |
|---|---|
| `distributed` | Centralised vs distributed version control |
| `git-vs-manual` | Manual file copies vs Git history |
| `git-core-sim` | The three areas, step by step |
| `git-stage-lab` | Working directory, staging and commits |
| `git-merge-rebase-lab` | Merge vs rebase graphs |
| `git-remote-sync-lab` | Push, fetch and pull with a remote |
| `git-force-danger` | What a force push does to teammates |
| `git-stash-lab` | Stash and pop |
| `git-ignore-lab` | Classify files for `.gitignore` (awards XP) |
| `git-head-lab`, `git-undo-lab`, `git-cherry-pick-lab`, `git-bisect-lab` | Available, not used by current modules |
| `docker-pizza` | Image as recipe, containers as pizzas |
| `docker-layers` | Read-only image layers and the writable layer |
| `k8s-cluster` | Interactive control plane and worker node blueprint |

### Game types

| `gameType` | `gameData` shape |
|---|---|
| `drag-order` | `GameDataItem[]` in the correct order. The game shuffles them. |
| `drag-classify` | `{ categories: [{ id, label }], items: [{ id, label, categoryId }] }` |
| `terminal-sim` | `{ startText?, steps: [{ instruction, expectedCommand, output? }] }` |
| `git-graph-sim` | `{ startState: GitGraphState, tasks: Task[] }` |
| `docker-sim` | `{ startState: DockerState, tasks: Task[] }` |
| `k8s-sim` | `{ startState: K8sState, tasks: Task[] }` |

A `Task` is `{ id, instruction, condition, hints? }`. Provide three progressive hints for Docker and Kubernetes tasks: concept, syntax, full solution in backticks. The third hint offers an "Insert" button that copies the command into the terminal.

## Lab conditions

Tasks complete in order. A task is checked only after the previous one is done.

### Git (`git-graph-sim`)

| Condition | Satisfied when |
|---|---|
| `BRANCH_EXISTS:<name>` | The branch exists. |
| `CURRENT_BRANCH:<name>` | HEAD points to that branch. |
| `COMMIT_COUNT:<branch>:<n>` | The first-parent chain of the branch has at least `n` commits. |
| `DETACHED_HEAD:<commit>` | HEAD points directly at that commit. |
| `MERGED:<branch>` | The current commit is a merge commit. |

### Docker (`docker-sim`)

| Condition | Satisfied when |
|---|---|
| `PULLED:<image>` | An image with that name exists locally (pull, build or tag). |
| `PUSHED:<image>` | The image was pushed. |
| `RUNNING:<image-or-name>` or `CONTAINER_RUNNING:<image-or-name>` | A matching container is running. Use `0` to require no running containers. |
| `PORT_MAPPED:<container>:<mapping>` | The running container has that port mapping. |
| `STOPPED:<image-or-name>` | A matching container exists and is exited. |
| `VOLUME_EXISTS:<name>` | The named volume exists. |
| `NETWORK_EXISTS:<name>` | The network exists. |

### Kubernetes (`k8s-sim`)

| Condition | Satisfied when |
|---|---|
| `DEPLOYMENT_EXISTS:<name>` | The Deployment exists. |
| `REPLICAS:<deployment>:<n>` | The Deployment has exactly `n` replicas. |
| `SERVICE_EXISTS:<name>` | The Service exists. |
| `CONFIGMAP_EXISTS:<name>`, `SECRET_EXISTS:<name>`, `PVC_EXISTS:<name>` | The object exists. |
| `PODS_RUNNING:<n>` | At least `n` Pods are Running. |
| `CMD_RAN:<text>` | Any executed command contains the text, case-insensitive. |

Manifest files the learner can `kubectl apply` are defined in `K8sParser.ts`. If a task references a new file name, add it there first.

## Quiz questions

```ts
{
  id: 'docker-10-q1',
  question: { en: '…', it: '…' },
  options: [ { en: '…', it: '…' }, '…', '…', '…' ],
  correct: 1,                     // index into options before shuffling
  explanation: { en: '…', it: '…' },
}
```

Guidelines:

- Four options. Exactly one correct.
- Distractors must be plausible to someone who skimmed the module. Avoid joke answers.
- Keep option lengths similar; the longest answer should not reliably be the right one.
- Only ask about concepts the module or an earlier module teaches.
- The explanation says why the right answer is right, in one or two sentences.

## Cheat-sheet commands

Edit `src/data/<track>/cheatsheet.ts`. Each command has `command`, `description`, optional `example` and `output`, and for Git an optional `visualType` with `visualHighlight` that selects a diagram in `components/cheatsheet/diagrams`. Example output should be realistic: valid hexadecimal hashes, real flag names, plausible sizes.

## Translations

- Every learner-facing string is `{ en, it }`. A plain string is acceptable only for proper nouns and commands.
- Italian copy uses the informal "tu", keeps technical terms in English where Italian teams use them (branch, commit, deployment), and avoids literal translations such as "git principale" for `main`.
- Interface copy for new screens goes in `src/lib/ui.ts`.

## Technical accuracy checklist

Before merging content:

- Commands run as written on a current Git, Docker Engine and Kubernetes release.
- No deprecated APIs or flags without a note (for example `docker-compose` v1, in-tree volume provisioners, PodSecurityPolicy).
- External links open, videos are the ones the title describes.
- Statistics and quotes have a source.
- Images are original, licensed, or generated. No photos of real people.
