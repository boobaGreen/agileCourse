export interface QuizQuestion {
  id: string
  track?: 'git' | 'docker' | 'k8s'
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface Module {
  id: string
  track: 'git' | 'docker' | 'k8s'
  order: number
  title: string
  subtitle: string
  emoji: string
  duration: string          // estimated read/play time
  xpReward: number
  funFact?: string
  sections: Section[]
  quiz?: QuizQuestion[]
  externalLink?: { label: string; url: string; xpPrompt: string }
}

export interface Section {
  type: 'intro' | 'concept' | 'diagram' | 'code' | 'analogy' | 'tip'
    | 'table'          // tabelle comparative
    | 'flowchart'      // diagrammi di flusso SVG
    | 'animation'      // animazioni didattiche
    | 'interactive'    // componenti interattivi
    | 'game'           // mini-giochi
    | 'video'          // embed video
    | 'infographic'    // immagini/infografiche
  title?: string
  content: string
  code?: string
  language?: string
  // Rich content fields
  tableData?: { headers: string[], rows: string[][] }
  diagramSteps?: { label: string, icon?: string, color?: string }[]
  videoUrl?: string
  imageUrl?: string
  animationType?: string
  gameType?: 'drag-order' | 'drag-classify' | 'choose-path' | 'terminal-sim' | 'external'
  gameData?: unknown
  externalLink?: { label: string, url: string, xpPrompt: string }
}

export const GIT_MODULES: Module[] = [
  {
    id: 'git-1',
    track: 'git',
    order: 1,
    title: 'What is Version Control?',
    subtitle: 'Why "save as final_FINAL_v2.docx" is never the answer',
    emoji: '⏱️',
    duration: '8 min',
    xpReward: 50,
    funFact: 'Before version control, teams shared code by emailing ZIP files. Git was created in just 10 days by Linus Torvalds in 2005.',
    sections: [
      {
        type: 'intro',
        content: 'Imagine working on a document and needing to undo a change you made three weeks ago. Or needing to work on two different versions of the same file simultaneously. Version control solves all of this — and much more.'
      },
      {
        type: 'flowchart',
        content: '**The Timeline in Action**\nA visual trace of every single change you made, forever safely stored.',
        diagramSteps: [
          { label: 'Initial File\n(v1.0)', icon: '📄', color: '#ffb703' },
          { label: 'Added Header\n(v1.1)', icon: '🟢', color: '#06d6a0' },
          { label: 'Fixed Typo\n(v1.2)', icon: '🟡', color: '#118ab2' },
          { label: 'Deleted Paragraph\n(v1.3)', icon: '🔴', color: '#ff4b4b' }
        ]
      },
      {
        type: 'analogy',
        title: '📷 Think of it like a game save system',
        content: 'Version control is like a save system in a video game. You can save your progress at any point, go back to an earlier save, or even branch off to explore a different path — without losing your main storyline.'
      },
      {
        type: 'game',
        title: 'Challenge: File Chaos',
        content: 'Oh no! The developer didn\'t use Git and now the files are a mess. Can you put them in the correct chronological order to restore the project?',
        gameType: 'drag-order',
        gameData: [
          { id: '1', label: 'project_v1.zip' },
          { id: '2', label: 'project_final.zip' },
          { id: '3', label: 'project_final_v2.zip' },
          { id: '4', label: 'project_REAL_FINAL.zip' }
        ]
      },
      {
        type: 'concept',
        title: 'The three big problems it solves',
        content: '**1. History** — Every change is recorded. Who changed what, when, and why.\n\n**2. Collaboration** — Multiple people can work on the same codebase without overwriting each other.\n\n**3. Experimentation** — Create branches to try new ideas safely. A branch is an independent line of development diverging from the main codebase. You can experiment on it, then merge it back (or throw it away).'
      },
      {
        type: 'concept',
        title: '💾 The "Commit": A Snapshot in Time',
        content: 'In Git, you don\'t just save files. You create a **Commit**. A commit is a snapshot of your entire project at a specific moment. It doesn\'t just store the changes; it remembers the author, the date, and a message explaining *why* the change happened.'
      },
      {
        type: 'concept',
        title: 'Centralized vs Distributed',
        content: 'Old systems (like SVN) had one central server — if it went down, work stopped. **Git is distributed**: every developer has a full copy of the entire history. No single point of failure.'
      },
      {
        type: 'flowchart',
        content: '**Git is Distributed**',
        diagramSteps: [
          { label: 'GitHub Cloud\n(Remote)', icon: '☁️', color: '#118ab2' },
          { label: 'Alice\'s Laptop\n(Full Copy)', icon: '👩‍💻', color: '#06d6a0' },
          { label: 'Bob\'s PC\n(Full Copy)', icon: '👨‍💻', color: '#ffb703' }
        ]
      },
      {
        type: 'animation',
        title: '🧪 Manual Backups vs Git',
        content: 'Why renaming files "final_v2" is a nightmare. See how Git keeps a clean, searchable history instead.',
        animationType: 'git-vs-manual'
      },
      {
        type: 'table',
        title: '📊 Why use Version Control?',
        content: 'A comparison of workflows:',
        tableData: {
          headers: ['Feature', 'Manual Backups', 'Git Version Control'],
          rows: [
            ['**History**', 'Filenames like "v2_FINAL"', 'Cryptographic SHA hashes'],
            ['**Changes**', 'Full copies (wasteful)', 'Smart diffs (efficient)'],
            ['**Undo**', 'Hard to find right version', 'Instant one-command revert'],
            ['**Collaboration**','Impossible without ZIPs', 'Seamless branching/merging']
          ]
        }
      },
      {
        type: 'tip',
        title: '💡 Key Takeaway',
        content: 'Version control is not just for developers. Writers, designers, data scientists — anyone working with files over time benefits from it.'
      }
    ],
    quiz: [
      {
        id: 'git-1-q1',
        question: 'What is the main advantage of a distributed version control system like Git?',
        options: [
          'It requires an internet connection at all times',
          'Every developer has a full copy of the repository history',
          'It only allows one person to work at a time',
          'It automatically deploys your code'
        ],
        correct: 1,
        explanation: 'In distributed systems like Git, every developer clones the full repository including all history. This means you can work offline and there\'s no single point of failure.'
      },
      {
        id: 'git-1-q2',
        question: 'Which of these problems does version control NOT solve?',
        options: [
          'Tracking who changed a file and when',
          'Automatically writing better code',
          'Allowing multiple people to collaborate on the same file',
          'Rolling back to a previous working version'
        ],
        correct: 1,
        explanation: 'Version control tracks history, enables collaboration, and allows rollbacks — but it can\'t write code for you (that\'s a different kind of tool!).'
      },
      {
        id: 'git-1-q3',
        question: 'What is a "branch" in version control?',
        options: [
          'A backup copy stored on a cloud server',
          'An independent line of development diverging from the main codebase',
          'A team member\'s personal account',
          'A type of commit message'
        ],
        correct: 1,
        explanation: 'A branch is an independent line of development. You can create a branch to work on a feature or fix a bug without affecting the main codebase.'
      },
      {
        id: 'git-1-q4',
        question: 'Git was created by:',
        options: ['Jeff Bezos', 'Linus Torvalds', 'Bill Gates', 'Mark Zuckerberg'],
        correct: 1,
        explanation: 'Linus Torvalds (who also created the Linux kernel) built Git in 2005 to manage the Linux kernel\'s source code after their previous tool became unavailable.'
      },
      {
        id: 'git-1-q5',
        question: 'What does "commit" mean in Git?',
        options: [
          'Uploading files to GitHub',
          'Saving a snapshot of your changes to the repository history',
          'Merging two branches together',
          'Downloading someone else\'s code'
        ],
        correct: 1,
        explanation: 'A commit is a saved snapshot of your changes. It records what changed, who changed it, and when — creating a permanent point in history you can always return to.'
      }
    ]
  },
  {
    id: 'git-2',
    track: 'git',
    order: 2,
    title: 'The Name & Origin Story',
    subtitle: 'Why Linus named it something rude on purpose',
    emoji: '🎭',
    duration: '5 min',
    xpReward: 50,
    funFact: 'Linus Torvalds famously said: "I\'m an egotistical bastard, and I name all my projects after myself. First Linux, now Git."',
    sections: [
      {
        type: 'intro',
        content: 'Every great tool has a story. Git\'s story starts with frustration, a tight deadline, and a creator with a very particular sense of humor.'
      },
      {
        type: 'concept',
        title: '🇬🇧 The British slang meaning',
        content: '"Git" is a British slang term for a silly, incompetent, or annoying person — think of it as a mild insult. Linus Torvalds chose the name **with full irony**, either referring to himself or, depending on his mood, to the tool\'s users.'
      },
      {
        type: 'concept',
        title: '⚡ Born in 10 days',
        content: 'In 2005, the Linux kernel team lost access to BitKeeper, the proprietary tool they had been using. Linus sat down and **wrote the first version of Git in just 10 days**. By day 10 it was already managing the Linux kernel\'s source code.'
      },
      {
        type: 'concept',
        title: '🔴 The logo: a graph in disguise',
        content: 'The Git logo — a red/orange geometric shape — represents a **graph with nodes and connections**, directly referencing Git\'s underlying data structure. Every commit is a node; every line is a relationship between versions. It\'s math made beautiful.'
      },
      {
        type: 'analogy',
        title: '🌐 A decentralized internet of code',
        content: 'Think of Git\'s distributed model like the internet itself: no central authority, every node independent, but all connected. Just like the internet was designed to survive failures, Git was designed so no single server failure can stop your team.'
      },
      {
        type: 'video',
        title: '🎬 Recommended: Git Explained in 100 Seconds',
        content: 'A quick, entertaining visual overview of Git and its core ideas — perfect as a complement to this module.',
        videoUrl: 'https://www.youtube.com/watch?v=hwP7WQkmECE'
      },
      {
        type: 'tip',
        title: '🚀 The platforms it enabled',
        content: 'Git\'s creation led directly to the birth of **GitHub** (2008), **GitLab** (2011), and **Bitbucket** — platforms that transformed how the world builds software together.'
      },
      {
        type: 'flowchart',
        content: '**Git: A History of Domination**',
        diagramSteps: [
          { label: '2005\n(Git Born)', icon: '⚡', color: '#ff4b4b' },
          { label: '2008\n(GitHub Born)', icon: '🐙', color: '#118ab2' },
          { label: '2011\n(GitLab)', icon: '🦊', color: '#ffb703' },
          { label: 'Today\n(The Standard)', icon: '🌍', color: '#06d6a0' }
        ]
      }
    ],
    quiz: [
      {
        id: 'git-2-q1',
        question: 'What does "git" mean in British slang?',
        options: [
          'A type of repository',
          'A silly or annoying person',
          'A version control command',
          'A branch strategy'
        ],
        correct: 1,
        explanation: 'In British slang, "git" means a silly, incompetent, or annoying person. Linus chose it with irony.'
      },
      {
        id: 'git-2-q2',
        question: 'How long did it take Linus Torvalds to write the first working version of Git?',
        options: ['6 months', '2 years', '10 days', '3 weeks'],
        correct: 2,
        explanation: 'Linus wrote the first functional version of Git in just 10 days in 2005, and it immediately started managing the Linux kernel.'
      },
      {
        id: 'git-2-q3',
        question: 'Why did Linus Torvalds create Git?',
        options: [
          'To compete with GitHub',
          'Because the Linux team lost access to their previous version control tool (BitKeeper)',
          'As a university project',
          'To replace email as a file-sharing method'
        ],
        correct: 1,
        explanation: 'The Linux kernel team had been using BitKeeper for free, but that arrangement ended in 2005. Linus created Git as a replacement.'
      },
      {
        id: 'git-2-q4',
        question: 'What does the Git logo represent?',
        options: [
          'A tree of files',
          'A graph of nodes and connections (like commits and branches)',
          'The letter G',
          'A network of servers'
        ],
        correct: 1,
        explanation: 'The geometric Git logo represents a graph — Git\'s actual internal data structure. Nodes are commits, lines are the relationships between them.'
      }
    ]
  },
  {
    id: 'git-3',
    track: 'git',
    order: 3,
    title: 'Core Concepts',
    subtitle: 'Repository, commit, branch, merge — the four pillars',
    emoji: '🧱',
    duration: '12 min',
    xpReward: 50,
    funFact: 'The average Git repository on GitHub has 6.7 branches. The Linux kernel repo has over 700 active branches.',
    sections: [
      {
        type: 'intro',
        content: 'Before you type a single command, you need to understand how Git "thinks". Master these core concepts and everything else will click naturally.'
      },
      {
        type: 'concept',
        title: '🎯 The 4 Pillars',
        content: 'Git is built on four fundamental concepts that transform a simple folder into a time-traveling database:\n\n1. **Repository**: Your project\'s home.\n2. **Commit**: A snapshot in time.\n3. **Branch**: A parallel timeline.\n4. **Merge**: Harmonizing two timelines.'
      },
      {
        type: 'concept',
        title: '📦 The Three Areas',
        content: 'Every file in your project moves through three specific zones. Understanding this "Loading Dock" model is the secret to mastering the Git workflow.'
      },
      {
        type: 'animation',
        content: 'git-core-sim'
      },
      {
        type: 'concept',
        title: '📸 The Snapshot (Commit)',
        content: 'A commit isn\'t just a list of changes; it\'s a **complete snapshot** of every file in your project. Each commit has a unique **SHA identifier** (e.g., `a1b2c3d`) — a digital fingerprint that ensures your history can never be tampered with.'
      },
      {
        type: 'animation',
        title: '🧪 The Hashing Lab',
        content: 'Every commit has a unique SHA fingerprint. Change a single character in your code, and the fingerprint changes completely!',
        animationType: 'git-hash-lab'
      },
      {
        type: 'concept',
        title: '🌿 Branches & Merges',
        content: 'Think of branches as **disposable timelines**. You can create a branch to try a crazy idea, and if it works, you **merge** it back. If it fails, you just delete it. Your main code stays safe and stable.'
      },
      {
        type: 'table',
        title: '🎯 Core Concepts Cheat Sheet',
        content: 'Use this as your mental map when working with Git:',
        tableData: {
          headers: ['Concept', 'Analogy', 'Primary Command'],
          rows: [
            ['**Working Directory**', 'Your Workbench (Messy)', '`Edit files`'],
            ['**Staging Area**', 'The Loading Dock (Ready)', '`git add`'],
            ['**Local Repository**', 'The Private Vault (Saved)', '`git commit`'],
            ['**Remote Repository**', 'The Public Gallery (Shared)', '`git push`']
          ]
        }
      },
      {
        type: 'game',
        title: 'Interactive Workflow Challenge',
        content: 'Now that you\'ve seen the simulation, can you order the workflow correctly?',
        gameType: 'drag-order',
        gameData: [
          { id: '1', label: 'Modify files in Working Dir' },
          { id: '2', label: 'Run "git add" to stage' },
          { id: '3', label: 'Run "git commit" to save' },
          { id: '4', label: 'Run "git push" to share' }
        ]
      }
    ],
    quiz: [
      {
        id: 'git-3-q1',
        question: 'What is a Git repository?',
        options: [
          'A single file tracked by Git',
          'The entire project folder with all history and branches',
          'A cloud backup service',
          'A type of commit message'
        ],
        correct: 1,
        explanation: 'A repository contains all project files AND the complete history of every change ever made. It\'s the entire database of your project.'
      },
      {
        id: 'git-3-q2',
        question: 'What command stages files before a commit?',
        options: ['git commit', 'git push', 'git add', 'git save'],
        correct: 2,
        explanation: '`git add` moves files to the "staging area" — a preparation zone where you select exactly what goes into the next commit.'
      },
      {
        id: 'git-3-q3',
        question: 'What happens when you create a new branch?',
        options: [
          'The entire repository is duplicated on disk',
          'All existing commits are deleted',
          'A new independent line of development is created, sharing history up to that point',
          'Your changes are automatically pushed to GitHub'
        ],
        correct: 2,
        explanation: 'Creating a branch is extremely lightweight. Git just creates a new pointer — all existing commits are shared. No duplication happens.'
      },
      {
        id: 'git-3-q4',
        question: 'What is a SHA hash in Git?',
        options: [
          'A security password for your repository',
          'A unique identifier for each commit',
          'A type of branch name',
          'A compression algorithm for files'
        ],
        correct: 1,
        explanation: 'Every commit gets a unique SHA-1 hash (40 hexadecimal characters). This fingerprint lets Git reference any commit precisely — you can usually use just the first 7 characters.'
      },
      {
        id: 'git-3-q5',
        question: 'What is a merge conflict?',
        options: [
          'When two branches have the same name',
          'When Git cannot automatically combine changes because two people modified the same part of a file',
          'When you try to commit without a message',
          'When the remote repository is offline'
        ],
        correct: 1,
        explanation: 'A merge conflict occurs when Git sees that two different branches changed the same lines of the same file. Git stops and asks you to decide which version (or combination) to keep.'
      }
    ]
  },
  {
    id: 'git-4',
    track: 'git',
    order: 4,
    title: 'Working with Branches',
    subtitle: 'Branch fast, merge confidently, rebase wisely',
    emoji: '🌿',
    duration: '15 min',
    xpReward: 50,
    funFact: 'GitHub processes over 100 million pull requests per year. Each PR is essentially a branch waiting to be merged.',
    sections: [
      {
        type: 'intro',
        content: 'Branches are where the magic happens. They let you experiment, develop features in isolation, and work in parallel with teammates — all without breaking the main codebase.'
      },
      {
        type: 'code',
        title: '🌿 Essential branch commands',
        content: 'The commands you\'ll use every single day:',
        code: `# Create and switch to a new branch in one step
git checkout -b feature/login-page

# Modern syntax (Git 2.23+)
git switch -c feature/login-page

# List all branches (* marks current)
git branch

# Switch to an existing branch  
git switch main

# Delete a branch (after merging)
git branch -d feature/login-page`,
        language: 'bash'
      },
      {
        type: 'concept',
        title: '🔀 Merge vs Rebase — the eternal debate',
        content: 'Both commands solve the same problem: integrating changes from one branch into another. The difference is **how** they do it.'
      },
      {
        type: 'animation',
        title: '🧪 Merge vs Rebase Lab',
        content: 'Interactive comparison: See how `merge` creates a new path while `rebase` rewrites history for a clean line.',
        animationType: 'git-merge-rebase-lab'
      },
      {
        type: 'table',
        title: '⚖️ Merge vs Rebase Comparison',
        content: 'When to use which approach:',
        tableData: {
          headers: ['Feature', 'Merge 🔀', 'Rebase 🔄'],
          rows: [
            ['**History Type**', 'Branching & Non-linear', 'Strictly Linear'],
            ['**What it does**', 'Creates 1 new merge commit', 'Rewrites existing commits on top of base'],
            ['**Pros**', 'Shows exact historical truth. Non-destructive.', 'Clean, easy-to-read history. No merge commits.'],
            ['**Cons**', 'Cluttered history if there are many branches', 'Rewrites history (dangerous if shared with others)'],
            ['**Rule of Thumb**', 'Use for shared branches and collaboration flows', 'Use to clean up local work before merging']
          ]
        }
      },
      {
        type: 'concept',
        title: '📤 Pull Requests (PR) — The Gatekeeper',
        content: 'A **Pull Request** (or Merge Request in GitLab) is not a Git command, but a workflow supported by platforms like GitHub. It is a formal request to merge your feature branch into the main project.\n\n- **Review**: Teammates look at your code, suggest changes, and approve it.\n- **Discussion**: You can chat about the implementation directly on the code lines.\n- **Automation**: CI/CD tools test your code automatically before it is allowed in.\n\nOnce the PR is approved, the platform "merges" your branch for you (usually with a button click!).'
      },
      {
        type: 'code',
        title: '🔀 Merge example',
        content: 'The classic workflow — finish a feature and merge it back:',
        code: `# Finish work on your feature branch
git switch main
git merge feature/login-page

# If conflicts arise, Git will tell you:
# CONFLICT (content): Merge conflict in app.js
# Open the file, resolve, then:
git add app.js
git commit -m "Resolve merge conflict in app.js"`,
        language: 'bash'
      },
      {
        type: 'code',
        title: '⚡ Rebase example',
        content: 'Replaying your commits on top of the latest main:',
        code: `# On your feature branch:
git rebase main

# This replays your commits on top of main's tip
# If conflicts arise, resolve then:
git rebase --continue

# If you want to abort:
git rebase --abort`,
        language: 'bash'
      },
      {
        type: 'concept',
        title: '⏩ Fast-Forward Merge',
        content: 'A **fast-forward merge** happens when the target branch (e.g. `main`) has had **no new commits** since you branched off. In this case, Git doesn\'t need to create a merge commit — it simply moves the branch pointer forward to the tip of your feature branch.\n\nThis results in a perfectly linear history, as if you had committed directly to `main`. Git does fast-forward merges automatically when possible.\n\n💡 You can force a merge commit even in fast-forward scenarios with `git merge --no-ff feature/x` — useful for keeping a record of the feature branch in history.'
      },
      {
        type: 'tip',
        title: '⚠️ Golden Rule of Rebase',
        content: '**Never rebase commits that have been pushed to a shared remote branch.** Rebase rewrites history — if others have already fetched those commits, you\'ll create chaos. Only rebase local, unpublished commits.'
      }
    ],
    quiz: [
      {
        id: 'git-4-q1',
        question: 'What does `git switch -c feature/x` do?',
        options: [
          'Switches to an existing branch named feature/x',
          'Creates a new branch named feature/x and switches to it',
          'Deletes the branch named feature/x',
          'Commits all changes to feature/x'
        ],
        correct: 1,
        explanation: 'The `-c` flag means "create". `git switch -c feature/x` creates a new branch and immediately switches to it — equivalent to the older `git checkout -b`.'
      },
      {
        id: 'git-4-q2',
        question: 'What is the key difference between merge and rebase?',
        options: [
          'Merge is for adding files, rebase is for removing them',
          'Merge preserves full history with a merge commit, rebase creates a linear history by replaying commits',
          'Merge works only locally, rebase only on remotes',
          'There is no difference'
        ],
        correct: 1,
        explanation: 'Merge joins branches by creating a new merge commit, preserving the full history. Rebase replays commits as if they were made from a different starting point, creating a cleaner linear history.'
      },
      {
        id: 'git-4-q3',
        question: 'When should you NOT use rebase?',
        options: [
          'On commits that are still local and not yet pushed',
          'On commits that have already been pushed to a shared remote branch',
          'When your branch has more than 5 commits',
          'On the main branch'
        ],
        correct: 1,
        explanation: 'Rebase rewrites commit history. If others have already based their work on those commits, rebasing will create divergent histories and cause major confusion.'
      }
    ]
  },
  {
    id: 'git-5',
    track: 'git',
    order: 5,
    title: 'Remote & Collaboration',
    subtitle: 'Push, pull, fetch — and the magic of Pull Requests',
    emoji: '🌐',
    duration: '12 min',
    xpReward: 50,
    funFact: 'GitHub was launched in 2008. In 2018, Microsoft acquired it for $7.5 billion — the largest acquisition in Microsoft\'s history at the time.',
    sections: [
      {
        type: 'intro',
        content: 'Git becomes truly powerful when you connect with teammates. Remote repositories (on GitHub, GitLab, or your company\'s server) are the bridge between local work and team collaboration.'
      },
      {
        type: 'flowchart',
        content: '**The Network of Repositories**',
        diagramSteps: [
          { label: 'Local Repo\n(Your Laptop)', icon: '💻', color: '#06d6a0' },
          { label: 'push →\n← pull / fetch', icon: '🔁', color: '#ffd166' },
          { label: 'Remote Repo\n(GitHub)', icon: '☁️', color: '#118ab2' }
        ]
      },
      {
        type: 'concept',
        title: '🌍 What is a remote?',
        content: 'A remote is simply a **URL pointing to a repository on another machine** (a server). The convention is to call the main remote **"origin"** — the original source.\n\nWhen you clone a repo, Git automatically sets "origin" to the URL you cloned from.'
      },
      {
        type: 'code',
        title: '🔗 Essential remote commands',
        content: 'Working with remote repositories:',
        code: `# 1. Download the repo
git clone https://github.com/company/repo.git

# 2. Check for updates
git fetch origin

# 3. Pull (Merge)
git pull origin main

# 4. Pull (Rebase)
git pull --rebase origin main

# 5. Push your work
git push origin main`,
        language: 'bash'
      },
      {
        type: 'animation',
        title: '🧪 Remote Sync Lab',
        content: 'Visualizing the bridge between your laptop and GitHub. Understand the flow of `push`, `fetch`, and `pull`.',
        animationType: 'git-remote-sync-lab'
      },
      {
        type: 'flowchart',
        content: '**The Pull Request Lifecycle**',
        diagramSteps: [
          { label: '1. Push Branch', icon: '🚀', color: '#06d6a0' },
          { label: '2. Open PR', icon: '📝', color: '#ffd166' },
          { label: '3. Review Code', icon: '👀', color: '#ffb703' },
          { label: '4. Merge', icon: '🔀', color: '#118ab2' }
        ]
      },
      {
        type: 'concept',
        title: '📬 Pull Requests (PRs)',
        content: 'A Pull Request is not a Git feature — it\'s a **GitHub/GitLab workflow**. When your branch is ready:\n\n1. Push your branch to the remote\n2. Open a PR: "I want to merge `feature/x` into `main`"\n3. Teammates review the code, leave comments\n4. Once approved, the PR is merged\n\nThis review step is how teams catch bugs and share knowledge before code reaches production.'
      },
      {
        type: 'concept',
        title: '⬇️ fetch vs pull — what\'s the difference?',
        content: '**`git fetch`** downloads new commits from the remote but does **not** change your local files. You can inspect what changed before integrating.\n\n**`git pull`** is `fetch + merge` in one command. It downloads and immediately integrates remote changes into your current branch.\n\n💡 Prefer `fetch` + inspect + `merge` when you want more control.'
      },
      {
        type: 'table',
        title: '✅ Git Etiquette: Team Rules',
        content: 'Follow these "Rules of the Road" to avoid breaking the build and keep your teammates happy:',
        tableData: {
          headers: ['✅ DO (Best Practices)', '❌ DON\'T (Danger Zones)'],
          rows: [
            ['`git pull --rebase` before starting work', 'Commit directly to the `main` branch'],
            ['Push small, atomic commits', 'Push giant, "everything at once" commits'],
            ['Explain **WHY** in commit messages', 'Write "Fix", "Update" or "WIP"'],
            ['Create a branch for every feature', 'Force push (`--force`) to shared branches']
          ]
        }
      },
      {
        type: 'animation',
        content: 'git-force-danger'
      }
    ],
    quiz: [
      {
        id: 'git-5-q1',
        question: 'What is "origin" in Git?',
        options: [
          'The first commit ever made',
          'The default name for the remote repository URL your local repo was cloned from',
          'The main branch of a repository',
          'A Git configuration file'
        ],
        correct: 1,
        explanation: '"origin" is just a conventional name for the primary remote. When you clone a repo, Git automatically names that source "origin".'
      },
      {
        id: 'git-5-q2',
        question: 'What is the difference between `git fetch` and `git pull`?',
        options: [
          'fetch is for files, pull is for commits',
          'fetch downloads remote changes without merging; pull downloads AND merges them',
          'fetch only works on GitHub, pull works everywhere',
          'There is no difference'
        ],
        correct: 1,
        explanation: '`git fetch` is safe — it downloads remote changes but leaves your working files untouched. `git pull` goes further by also merging (or rebasing) those changes into your current branch.'
      },
      {
        id: 'git-5-q3',
        question: 'What is a Pull Request?',
        options: [
          'A Git command to download files',
          'A platform feature (GitHub/GitLab) for requesting that your branch be reviewed and merged into another branch',
          'A command for rebasing branches',
          'A way to resolve merge conflicts'
        ],
        correct: 1,
        explanation: 'A Pull Request is a platform feature, not a Git command. It\'s a formal request saying "please review my changes and merge this branch." The review process is central to modern team workflows.'
      }
    ]
  },
  {
    id: 'git-6',
    track: 'git',
    order: 6,
    title: 'Common Workflows',
    subtitle: 'Gitflow, trunk-based, and choosing what fits your team',
    emoji: '🗺️',
    duration: '10 min',
    xpReward: 50,
    funFact: 'Trunk-based development is used by Google, Facebook, and Netflix. The Google monorepo (single giant repository) contains over 2 billion lines of code.',
    sections: [
      {
        type: 'intro',
        content: 'Having Git commands is one thing — knowing *how to use them as a team* is another. These workflows are battle-tested patterns for organizing your branching strategy.'
      },
      {
        type: 'concept',
        title: '🌊 Gitflow',
        content: 'Gitflow (by Vincent Driessen, 2010) defines a rigid branching model:\n\n- **main** — production-ready code only\n- **develop** — integration branch for features\n- **feature/x** — individual features\n- **release/x** — release preparation\n- **hotfix/x** — urgent production fixes\n\n✅ Good for: versioned software, scheduled releases\n❌ Not ideal for: continuous deployment, small teams'
      },
      {
        type: 'flowchart',
        content: '**Gitflow Architecture**',
        diagramSteps: [
          { label: 'Feature\n(Dev)', icon: '🌿', color: '#ffb703' },
          { label: 'Develop\n(Integrate)', icon: '🔄', color: '#118ab2' },
          { label: 'Release\n(Test)', icon: '📦', color: '#ffd166' },
          { label: 'Main\n(Prod)', icon: '🌲', color: '#06d6a0' }
        ]
      },
      {
        type: 'concept',
        title: '🚀 Trunk-Based Development',
        content: 'Everyone commits to `main` (the "trunk") very frequently — sometimes multiple times per day. Feature flags hide unfinished work.\n\n- Short-lived branches (< 1 day ideally)\n- Automated tests guard the trunk\n- Continuous integration is a must\n\n✅ Good for: fast-moving teams, SaaS products, CI/CD pipelines\n✅ Used by Google, Netflix, Facebook, Spotify'
      },
      {
        type: 'flowchart',
        content: '**Trunk-Based Architecture**',
        diagramSteps: [
          { label: 'Short Feature\n(< 1 day)', icon: '⚡', color: '#ffb703' },
          { label: 'Automated\nTesting', icon: '🤖', color: '#118ab2' },
          { label: 'Main Trunk\n(Always Ready)', icon: '🌲', color: '#06d6a0' }
        ]
      },
      {
        type: 'concept',
        title: '🔀 GitHub Flow',
        content: 'A simplified workflow perfect for most teams:\n\n1. Create a branch from main\n2. Add commits\n3. Open a Pull Request\n4. Review & discuss\n5. Merge to main\n6. Deploy immediately\n\nSimple, powerful, and the most common flow on GitHub.'
      },
      {
        type: 'table',
        title: '🎯 Which workflow should you use?',
        content: 'Use this decision matrix based on your team and product:',
        tableData: {
          headers: ['Criteria', 'Gitflow 🌊', 'GitHub Flow 🔀', 'Trunk-Based 🚀'],
          rows: [
            ['**Team Size**', 'Large enterprise teams', 'Small to medium teams', 'High-performing fast teams'],
            ['**Release Cadence**', 'Scheduled (e.g. Monthly)', 'Continuous / Ad-hoc', 'Continuous Deployment'],
            ['**Product Type**', 'Versioned Apps (iOS/Android)', 'SaaS / Internal Tools', 'SaaS / Cloud Native'],
            ['**Complexity**', 'High (Many long-lived branches)', 'Low (Simple branching)', 'Medium (Relies on feature flags)'],
            ['**Verdict**', 'Declining in popularity', '✅ Best for most teams', '✅ The industry ideal']
          ]
        }
      },
      {
        type: 'flowchart',
        content: '**Industry Adoption Map**\nWho actually uses what in the real world?',
        diagramSteps: [
          { label: 'Google / Meta\n(Trunk-Based)', icon: '🚀', color: '#ff4b4b' },
          { label: 'Cloud Startups\n(GitHub Flow)', icon: '☁️', color: '#06d6a0' },
          { label: 'Bank / Enterprise\n(Gitflow)', icon: '🏛️', color: '#118ab2' }
        ]
      }
    ],
    quiz: [
      {
        id: 'git-6-q1',
        question: 'In Gitflow, which branch receives new features during development?',
        options: ['main', 'release', 'develop', 'hotfix'],
        correct: 2,
        explanation: 'In Gitflow, feature branches are merged into `develop`, not directly into `main`. The `develop` branch acts as an integration branch.'
      },
      {
        id: 'git-6-q2',
        question: 'Trunk-based development means:',
        options: [
          'Using very long-lived feature branches',
          'Everyone commits frequently to the main branch with short-lived branches',
          'Having a separate trunk server for deployments',
          'Keeping all work in progress in a single commit'
        ],
        correct: 1,
        explanation: 'Trunk-based development keeps branches very short-lived (minutes to hours) and integrates changes to main constantly, relying on automated testing and feature flags.'
      },
      {
        id: 'git-6-q3',
        question: 'Which workflow is best for a small team deploying continuously to production?',
        options: ['Gitflow', 'Trunk-based / GitHub Flow', 'Email + ZIP files', 'Centralized SVN'],
        correct: 1,
        explanation: 'For continuous deployment, GitHub Flow or trunk-based development work best. Gitflow\'s complexity is overkill for teams that don\'t do versioned releases.'
      }
    ]
  },
  {
    id: 'git-7',
    track: 'git',
    order: 7,
    title: 'Daily Fundamentals',
    subtitle: 'Master the core loop: Init, Stage, Commit',
    emoji: '⚙️',
    duration: '8 min',
    xpReward: 60,
    sections: [
      {
        type: 'intro',
        content: 'To master Git, you must understand the **Three Areas** flow. These commands are your bread and butter.'
      },
      {
        type: 'code',
        title: '⚙️ Configuration',
        content: 'Before you commit, Git needs to know who you are:',
        code: `git config --global user.name "Your Name"
git config --global user.email "you@email.com"
git config --global init.defaultBranch main`,
        language: 'bash'
      },
      {
        type: 'animation',
        title: '🧪 The Staging Lab',
        content: 'Interact with the 3 Git Areas. See how files move from your folder to the Staging area, and finally into the Repository snapshot.',
        animationType: 'git-stage-lab'
      },
      {
        type: 'code',
        title: '📦 Starting & Status',
        content: 'Create a new repo or clone an existing one:',
        code: `git init                    # Create .git folder
git clone <url>             # Copy remote repo
git status                  # What's happening?`,
        language: 'bash'
      },
      {
        type: 'table',
        title: '📸 The Daily Saving Loop',
        content: 'Use these commands hundreds of times a day:',
        tableData: {
          headers: ['Command', 'Purpose', 'Visual Effect'],
          rows: [
            ['`git add .`', 'Stages all changes', 'Moves files to the "Waiting Room"'],
            ['`git commit -m`','Saves snapshot', 'Creates a permanent history dot'],
            ['`git commit --amend`','Fix last commit', 'Replaces the previous dot']
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'git-7-q1',
        question: 'Which area acts as a "waiting room" before a commit is saved?',
        options: ['Working Directory', 'Staging Area', 'Local Repository', 'Remote Server'],
        correct: 1,
        explanation: 'The Staging Area (or Index) is where you pick which changes to include in your next snapshot (commit).'
      }
    ]
  },
  {
    id: 'git-8',
    track: 'git',
    order: 8,
    title: 'Time Travel & Safety',
    subtitle: 'Undoing mistakes and managing the HEAD pointer',
    emoji: '⏩',
    duration: '10 min',
    xpReward: 80,
    sections: [
      {
        type: 'intro',
        content: 'Git lets you "undo" almost anything. But you need to know which tool to use for which mistake.'
      },
      {
        type: 'animation',
        title: '📍 Understanding HEAD',
        content: 'See where the "You Are Here" pointer (HEAD) actually lives and how it moves when you switch branches.',
        animationType: 'git-head-lab'
      },
      {
        type: 'animation',
        title: '🧪 The Undo Sandbox',
        content: 'Compare `git revert` (safe history) vs `git reset --hard` (permanent deletion). Use with caution!',
        animationType: 'git-undo-lab'
      },
      {
        type: 'code',
        title: '📦 The Emergency Stash',
        content: 'Need to switch branches but your work isn\'t ready to commit?',
        code: `git stash           # Hide changes away
git stash list      # See stashed work
git stash pop       # Bring changes back`,
        language: 'bash'
      },
      {
        type: 'concept',
        title: '🔌 Detached HEAD — Lost in Time',
        content: 'If you checkout a specific commit hash directly (e.g., `git checkout a1b2c3d`), HEAD points directly to that commit instead of a branch. This is the **detached HEAD** state. Any new commits here are not on a branch and may get lost!'
      }
    ],
    quiz: [
      {
        id: 'git-8-q1',
        question: 'Which undo command is SAFEST for shared branches because it doesn\'t delete history?',
        options: ['git reset --hard', 'git revert', 'git checkout', 'git clean'],
        correct: 1,
        explanation: '`git revert` creates a new "inverse" commit. It keeps the history intact, making it the safest choice for collaboration.'
      }
    ]
  },
  {
    id: 'git-9',
    track: 'git',
    order: 9,
    title: 'Power User Tools',
    subtitle: 'Surgical commits, ignoring files, and debugging',
    emoji: '🍒',
    duration: '10 min',
    xpReward: 90,
    sections: [
      {
        type: 'intro',
        content: 'Advanced tools to keep your repo clean and find bugs with surgical precision.'
      },
      {
        type: 'animation',
        title: '🍒 Cherry-picking',
        content: 'Drag a specific commit from one branch and "copy" it into your current branch.',
        animationType: 'git-cherry-pick-lab'
      },
      {
        type: 'concept',
        title: '🔍 git bisect — Binary Search for Bugs',
        content: 'Bisect performs a binary search through history to find the exact commit that broke the code. In 10 steps, it can find a bug in 1000 commits!'
      },
      {
        type: 'code',
        title: '🚫 .gitignore Essentials',
        content: 'Tell Git what to ignore (secrets, big binaries, logs):',
        code: `node_modules/
.env                 # SECRETS (Never commit!)
dist/
*.log`,
        language: 'bash'
      },
      {
        type: 'concept',
        title: '📦 Bare Repository',
        content: 'A repository with no working directory — only the Git database. This is what servers like GitHub use internally.'
      }
    ],
    quiz: [
      {
        id: 'git-9-q1',
        question: 'What is the purpose of `git cherry-pick`?',
        options: [
          'To merge an entire branch',
          'To copy a single specific commit into the current branch',
          'To delete a commit',
          'To rename a branch'
        ],
        correct: 1,
        explanation: 'Cherry-pick lets you surgically apply the changes from one specific commit from anywhere in history to your current branch.'
      }
    ]
  },
  {
    id: 'git-10',
    track: 'git',
    order: 10,
    title: 'Hands-on Labs: Git Games',
    subtitle: 'Master complex scenarios by playing',
    emoji: '🎮',
    duration: '45+ min',
    xpReward: 80,
    sections: [
      {
        type: 'intro',
        content: 'The best way to learn Git is to use it. These interactive tools simulate complex real-world scenarios.'
      },
      {
        type: 'game',
        title: '🎮 Git Branching Simulator',
        content: 'The famous "Learn Git Branching" visual puzzle. Master rebase, merge, and cherry-pick through levels.',
        gameType: 'external',
        externalLink: {
          label: 'Launch Simulator',
          url: 'https://learngitbranching.js.org/',
          xpPrompt: 'Complete 3 levels and report your progress'
        }
      },
      {
        type: 'game',
        title: '🕹️ Oh My Git!',
        content: 'An open-source game that visualises Git internal structures and commands.',
        gameType: 'external',
        externalLink: {
          label: 'View Game',
          url: 'https://ohmygit.org/',
          xpPrompt: 'Try a level and report XP'
        }
      }
    ]
  },
  {
    id: 'git-11',
    track: 'git',
    order: 11,
    title: 'Final Quiz',
    subtitle: 'The ultimate knowledge test',
    emoji: '🏆',
    duration: '15 min',
    xpReward: 100,
    sections: [
      {
        type: 'intro',
        content: 'Ready to prove your mastery? This comprehensive quiz covers everything from the basics to advanced workflows.'
      }
    ],
    quiz: [
      {
        id: 'git-11-q1',
        question: 'What does VCS stand for?',
        options: ['Virtual Container System', 'Version Control System', 'Visual Code Studio', 'Variable Commit Save'],
        correct: 1,
        explanation: 'VCS = Version Control System. The category of tools that Git belongs to.'
      },
      {
        id: 'git-11-q2',
        question: 'Which command creates a local copy of a remote repository?',
        options: ['git init', 'git fetch', 'git clone', 'git pull'],
        correct: 2,
        explanation: '`git clone <url>` downloads the entire repository (all history, all branches) to your machine.'
      },
      {
        id: 'git-11-q3',
        question: 'What is HEAD in Git?',
        options: [
          'The first commit in the repository',
          'A pointer to the currently checked-out commit or branch',
          'The remote server address',
          'The repository owner'
        ],
        correct: 1,
        explanation: 'HEAD points to your current location in history.'
      },
      {
        id: 'git-11-q4',
        question: 'Which command shows the history of commits?',
        options: ['git status', 'git history', 'git log', 'git show'],
        correct: 2,
        explanation: '`git log` displays the timeline of snapshots.'
      },
      {
        id: 'git-11-q5',
        question: 'What does .gitignore do?',
        options: [
          'Deletes files',
          'Tells Git which files to never track',
          'Shows ignored commits',
          'Encrypts files'
        ],
        correct: 1,
        explanation: 'It excludes temporary or sensitive files from being tracked.'
      },
      {
        id: 'git-11-q6',
        question: 'What is a "detached HEAD" state?',
        options: [
          'A corrupted repo',
          'When HEAD points directly to a commit instead of a branch',
          'When remote is down',
          'A failed merge'
        ],
        correct: 1,
        explanation: 'You are looking at a fixed point in time, not a moving branch.'
      },
      {
        id: 'git-11-q7',
        question: 'Which workflow uses feature flags for continuous deployment?',
        options: ['Gitflow', 'Trunk-based Development', 'GitHub Flow', 'Waterfall'],
        correct: 1,
        explanation: 'Trunk-based development relies on flags to keep main stable while merging often.'
      },
      {
        id: 'git-11-q8',
        question: 'What does `git cherry-pick <sha>` do?',
        options: [
          'Deletes a commit',
          'Surgically applies a specific commit to the current branch',
          'Renames a branch',
          'Cleans the workspace'
        ],
        correct: 1,
        explanation: 'It copies a single commit\'s changes elsewhere.'
      },
      {
        id: 'git-11-q9',
        question: 'How many characters is a full Git SHA-1 hash?',
        options: ['8', '16', '32', '40'],
        correct: 3,
        explanation: 'A full SHA-1 hash is 40 hexadecimal characters.'
      },
      {
        id: 'git-11-q10',
        question: 'What does `git pull --rebase` do?',
        options: [
          'Deletes branches',
          'Replays local commits on top of remote changes for a linear history',
          'Forces a push',
          'Compiles the code'
        ],
        correct: 1,
        explanation: 'It avoids merge commits by updating your base before adding your work.'
      },
      {
        id: 'git-11-q11',
        question: 'In which year was Git created?',
        options: ['1999', '2003', '2005', '2008'],
        correct: 2,
        explanation: 'Linus Torvalds created Git in 2005.'
      },
      {
        id: 'git-11-q12',
        question: 'What is the benefit of `git fetch`?',
        options: [
          'It clears local cache',
          'It downloads updates without changing your local files',
          'It deletes old branches',
          'It pushes local work'
        ],
        correct: 1,
        explanation: 'Fetch is safe because it only downloads data for you to inspect.'
      },
      {
        id: 'git-11-q13',
        question: 'What does the `-u` flag do in push?',
        options: [
          'Urgent push',
          'Sets upstream tracking for the branch',
          'Unlocks the repository',
          'Upgrades Git'
        ],
        correct: 1,
        explanation: 'It links your local branch to the remote branch for future shorthand commands.'
      },
      {
        id: 'git-11-q14',
        question: 'Which command shows unstaged local changes?',
        options: ['git status', 'git diff', 'git log', 'git show'],
        correct: 1,
        explanation: '`git diff` shows the delta between your work and the staging area.'
      },
      {
        id: 'git-11-q15',
        question: 'What is a fast-forward merge?',
        options: [
          'Merging 100+ commits',
          'Moving a branch pointer forward because of no diverging work',
          'An automated script',
          'A merge on GitHub'
        ],
        correct: 1,
        explanation: 'No merge commit is needed because the history is a straight line.'
      },
      {
        id: 'git-11-q16',
        question: 'What is `git bisect` used for?',
        options: [
          'Splitting commits',
          'Finding which commit introduced a bug using binary search',
          'Comparing two files',
          'Archiving the repo'
        ],
        correct: 1,
        explanation: 'It\'s a powerful debugging tool to find regressions.'
      },
      {
        id: 'git-11-q17',
        question: 'What happens when you run `git init`?',
        options: [
          'Clones a repo',
          'Creates a .git folder and initializes the project',
          'Deletes history',
          'Logs into GitHub'
        ],
        correct: 1,
        explanation: 'It creates the internal database for tracking.'
      },
      {
        id: 'git-11-q18',
        question: 'Which is NOT a Git platform?',
        options: ['GitHub', 'GitLab', 'Bitbucket', 'Kubernetes'],
        correct: 3,
        explanation: 'Kubernetes manages containers, not Git repositories.'
      },
      {
        id: 'git-11-q19',
        question: 'What does `git commit --amend` do?',
        options: [
          'Adds a comment',
          'Modifies the very last commit',
          'Reverts to last state',
          'Fixes syntax errors'
        ],
        correct: 1,
        explanation: 'Useful for fixing the last message or adding a forgotten file.'
      },
      {
        id: 'git-11-q20',
        question: 'What is a "bare" repository?',
        options: [
          'A repo with no working files (server/remote only)',
          'An empty repo',
          'A repo with no branches',
          'A basic version of Git'
        ],
        correct: 0,
        explanation: 'Bare repos (created with `git init --bare`) only contain the history database, not live files.'
      }
    ]
  }
]
