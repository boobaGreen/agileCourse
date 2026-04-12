export interface QuizQuestion {
  id: string
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
  title?: string
  content: string
  code?: string
  language?: string
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
        type: 'analogy',
        title: '📷 Think of it like a game save system',
        content: 'Version control is like a save system in a video game. You can save your progress at any point, go back to an earlier save, or even branch off to explore a different path — without losing your main storyline.'
      },
      {
        type: 'concept',
        title: 'The three big problems it solves',
        content: '**1. History** — Every change is recorded. Who changed what, when, and why.\n\n**2. Collaboration** — Multiple people can work on the same codebase without overwriting each other.\n\n**3. Experimentation** — Create branches to try new ideas safely, then merge them (or throw them away).'
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
        type: 'tip',
        title: '🚀 The platforms it enabled',
        content: 'Git\'s creation led directly to the birth of **GitHub** (2008), **GitLab** (2011), and **Bitbucket** — platforms that transformed how the world builds software together.'
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
        content: 'Before you type a single Git command, you need to understand four core ideas. Master these and everything else will click naturally.'
      },
      {
        type: 'concept',
        title: '📦 Repository (repo)',
        content: 'A repository is the **entire project** — all files, all history, all branches. Think of it as a supercharged folder that remembers everything that ever happened inside it.\n\n- **Local repo**: on your machine\n- **Remote repo**: on a server (GitHub, GitLab, etc.)'
      },
      {
        type: 'concept',
        title: '📸 Commit & SHA Hash',
        content: 'A commit is a **snapshot** of your project at a specific moment. \n\nEach commit has a unique ID called a **SHA Hash** (e.g., `a1b2c3d`). This is a 40-character fingerprint that ensures the integrity of your data. If even one character in one file changes, the hash changes completely.'
      },
      {
        type: 'code',
        title: 'Creating a commit',
        content: 'The three-step ritual every developer learns by heart:',
        code: `# 1. Stage the files you want to save
git add filename.txt
# or stage everything:
git add .

# 2. Create the snapshot with a message
git commit -m "Add user authentication feature"

# 3. Check what you've got
git log --oneline`,
        language: 'bash'
      },
      {
        type: 'concept',
        title: '🌿 Branch',
        content: 'A branch is an **independent line of development**. By default you work on `main` (or `master`). When you want to add a feature or fix a bug without risking the main codebase, you create a new branch.\n\nBranches are **cheap** in Git — creating one takes milliseconds and costs almost no disk space.'
      },
      {
        type: 'concept',
        title: '🔀 Merge',
        content: 'When your branch is ready, you **merge** it back into main. Git replays the changes and combines them. If two people changed the same line of code differently, Git asks you to resolve the **merge conflict** manually.'
      },
      {
        type: 'tip',
        title: '🎯 The mental model',
        content: '**Repository** = your project\'s database\n**Commit** = one saved state in that database\n**Branch** = a parallel timeline\n**Merge** = combining two timelines into one'
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
        content: '**Merge** creates a new "merge commit" that joins two branch histories. The history shows exactly when branches joined.\n\n**Rebase** replays your commits on top of another branch, creating a **linear history** as if you had branched off later.\n\n👍 **Use merge for**: shared branches, pull requests, keeping history accurate\n👍 **Use rebase for**: cleaning up local commits before sharing, maintaining a linear history'
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
        type: 'concept',
        title: '🌍 What is a remote?',
        content: 'A remote is simply a **URL pointing to a repository on another machine** (a server). The convention is to call the main remote **"origin"** — the original source.\n\nWhen you clone a repo, Git automatically sets "origin" to the URL you cloned from.'
      },
      {
        type: 'code',
        title: '🔗 Essential remote commands',
        content: 'Working with remote repositories:',
        code: `# Clone a repository (downloads everything + sets origin)
git clone https://github.com/company/repo.git

# See your configured remotes
git remote -v

# Send your local commits to the remote
git push origin main

# Download remote changes (doesn't merge yet)
git fetch origin

# Download AND merge remote changes  
git pull origin main

# Pull with rebase (cleaner history)
git pull --rebase origin main`,
        language: 'bash'
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
        type: 'tip',
        title: '✅ Good collaboration habits',
        content: '1. Always `git pull` before starting new work\n2. Push small, focused commits — not giant dumps\n3. Write clear commit messages: *what* and *why*, not just *what*\n4. Use branches for every feature or fix, never commit directly to main'
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
        type: 'concept',
        title: '🚀 Trunk-Based Development',
        content: 'Everyone commits to `main` (the "trunk") very frequently — sometimes multiple times per day. Feature flags hide unfinished work.\n\n- Short-lived branches (< 1 day ideally)\n- Automated tests guard the trunk\n- Continuous integration is a must\n\n✅ Good for: fast-moving teams, SaaS products, CI/CD pipelines\n✅ Used by Google, Netflix, Facebook, Spotify'
      },
      {
        type: 'concept',
        title: '🔀 GitHub Flow',
        content: 'A simplified workflow perfect for most teams:\n\n1. Create a branch from main\n2. Add commits\n3. Open a Pull Request\n4. Review & discuss\n5. Merge to main\n6. Deploy immediately\n\nSimple, powerful, and the most common flow on GitHub.'
      },
      {
        type: 'tip',
        title: '🎯 Which should you use?',
        content: '**New team / small project?** → GitHub Flow (simple, effective)\n\n**Product with versioned releases?** → Gitflow\n\n**Continuous deployment / large team?** → Trunk-based development\n\nFor data engineering pipelines and internal tooling, **GitHub Flow** or **trunk-based** are almost always the right choice.'
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
    title: 'The Command Cheat Sheet',
    subtitle: 'Every command you actually need, explained',
    emoji: '📋',
    duration: '10 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'You don\'t need to memorize everything — but these commands will cover 95% of your daily Git work. Bookmark this!'
      },
      {
        type: 'code',
        title: '⚙️ Setup & Config',
        content: 'One-time setup:',
        code: `git config --global user.name "Your Name"
git config --global user.email "you@company.com"
git config --global init.defaultBranch main
git config --global core.editor code   # use VS Code as editor`,
        language: 'bash'
      },
      {
        type: 'code',
        title: '📦 Repository',
        content: 'Starting and inspecting:',
        code: `git init                    # Init a new repo in current folder
git clone <url>             # Clone a remote repo
git status                  # What's changed?
git log --oneline --graph   # Visual history
git diff                    # See unstaged changes
git diff --staged           # See staged changes`,
        language: 'bash'
      },
      {
        type: 'code',
        title: '📸 Saving Changes',
        content: 'The core daily loop:',
        code: `git add .                   # Stage all changes
git add <file>              # Stage specific file
git commit -m "message"     # Save snapshot
git commit --amend          # Edit last commit (local only!)
git stash                   # Temporarily shelve changes
git stash pop               # Restore stashed changes`,
        language: 'bash'
      },
      {
        type: 'code',
        title: '🌿 Branches',
        content: 'Branch management:',
        code: `git branch                  # List branches
git switch -c <name>        # Create + switch
git switch <name>           # Switch to existing
git merge <branch>          # Merge branch in
git branch -d <name>        # Delete (safe, merged only)
git branch -D <name>        # Delete (force)`,
        language: 'bash'
      },
      {
        type: 'code',
        title: '🌐 Remote',
        content: 'Working with remotes:',
        code: `git remote -v               # Show remotes
git fetch origin            # Download (don't merge)
git pull origin main        # Download + merge
git push origin <branch>    # Push branch
git push -u origin <branch> # Push + set upstream`,
        language: 'bash'
      },
      {
        type: 'concept',
        title: '📍 Understanding HEAD',
        content: 'In Git, **HEAD** is a pointer to the currently checked-out commit or branch. Think of it as a "You Are Here" icon on a map. When you commit, HEAD moves forward. When you switch branches, HEAD moves to the tip of that branch.'
      },
      {
        type: 'code',
        title: '⏪ Undoing Things',
        content: 'The lifesavers:',
        code: `git restore <file>          # Discard unstaged changes
git restore --staged <file> # Unstage a file
git revert <sha>            # Undo a commit safely (new commit)
git reset --hard HEAD~1     # Throw away last commit (CAREFUL!)
git bisect start            # Binary search for a buggy commit`,
        language: 'bash'
      }
    ],
    quiz: [
      {
        id: 'git-7-q1',
        question: 'Which command safely undoes a commit by creating a new "reverse" commit?',
        options: ['git reset --hard', 'git revert', 'git restore', 'git checkout'],
        correct: 1,
        explanation: '`git revert <sha>` creates a new commit that undoes the changes of the specified commit. It\'s safe because it doesn\'t rewrite history — perfect for undoing changes on shared branches.'
      },
      {
        id: 'git-7-q2',
        question: 'What does `git stash` do?',
        options: [
          'Permanently deletes uncommitted changes',
          'Temporarily saves uncommitted changes so you can switch branches',
          'Creates a backup of the entire repository',
          'Pushes changes to the remote'
        ],
        correct: 1,
        explanation: '`git stash` saves your uncommitted work to a temporary stack, leaving your working directory clean. Useful when you need to switch context quickly. `git stash pop` restores it.'
      },
      {
        id: 'git-7-q3',
        question: 'What is the danger of `git reset --hard HEAD~1`?',
        options: [
          'It sends an email to your team',
          'It permanently throws away your last commit and all its changes',
          'It deletes all branches',
          'It resets your Git configuration'
        ],
        correct: 1,
        explanation: '`git reset --hard` rewrites history and discards changes permanently (they\'re not in the trash — they\'re gone). Only use on commits that have never been pushed to a shared remote.'
      }
    ]
  },
  {
    id: 'git-8',
    track: 'git',
    order: 8,
    title: 'External Spotlight: Learn Git Branching',
    subtitle: 'The best visual Git game on the internet',
    emoji: '🎮',
    duration: '30+ min',
    xpReward: 50,
    externalLink: {
      label: 'Open Learn Git Branching',
      url: 'https://learngitbranching.js.org',
      xpPrompt: 'How many levels did you complete? Enter the number to earn XP!'
    },
    sections: [
      {
        type: 'intro',
        content: '**Learn Git Branching** is widely considered the best interactive Git learning tool in the world. It visualizes branches, commits, merges, and rebases in real time as you type commands.'
      },
      {
        type: 'concept',
        title: '🕹️ What you\'ll do',
        content: '- Complete challenges level by level\n- Type real Git commands and watch the branch graph change live\n- Topics: commits, branches, merging, rebasing, cherry-pick, interactive rebase, detached HEAD, remote branches, pull/push'
      },
      {
        type: 'concept',
        title: '📖 Recommended levels for beginners',
        content: '**Main track (Basics):**\n1. Introduction Sequence (4 levels)\n2. Ramping Up (4 levels)\n3. Moving Work Around (4 levels)\n\n**Then try:**\n4. Remote (8 levels) — if you\'ve completed module 5 here'
      },
      {
        type: 'tip',
        title: '🏆 Earn XP',
        content: 'Complete as many levels as you can, then come back here and report your highest level to earn internal XP. We track it on the leaderboard!'
      }
    ]
  },
  {
    id: 'git-9',
    track: 'git',
    order: 9,
    title: 'Final Quiz',
    subtitle: 'Put everything together — 20 questions, timed',
    emoji: '🏆',
    duration: '15 min',
    xpReward: 100,
    sections: [
      {
        type: 'intro',
        content: 'Time to prove what you\'ve learned! 20 questions covering all Git modules. You have 15 minutes. Good luck!'
      }
    ],
    quiz: [
      {
        id: 'git-9-q1',
        question: 'What does VCS stand for?',
        options: ['Virtual Container System', 'Version Control System', 'Visual Code Studio', 'Variable Commit Save'],
        correct: 1,
        explanation: 'VCS = Version Control System. The category of tools that Git belongs to.'
      },
      {
        id: 'git-9-q2',
        question: 'Which command creates a local copy of a remote repository?',
        options: ['git init', 'git fetch', 'git clone', 'git pull'],
        correct: 2,
        explanation: '`git clone <url>` downloads the entire repository (all history, all branches) to your machine and configures "origin" automatically.'
      },
      {
        id: 'git-9-q3',
        question: 'What is HEAD in Git?',
        options: [
          'The first commit in the repository',
          'A pointer to the currently checked-out commit or branch',
          'The main administrator of the repository',
          'The remote server address'
        ],
        correct: 1,
        explanation: 'HEAD is Git\'s way of saying "where you are right now". It usually points to a branch, which in turn points to a commit.'
      },
      {
        id: 'git-9-q4',
        question: 'Which command shows the history of commits?',
        options: ['git status', 'git history', 'git log', 'git show'],
        correct: 2,
        explanation: '`git log` shows the commit history. `git log --oneline --graph` gives a compact visual view.'
      },
      {
        id: 'git-9-q5',
        question: 'What does `.gitignore` do?',
        options: [
          'Deletes files from the repository',
          'Lists files that Git should NOT track',
          'Shows ignored commits',
          'Prevents merges on a branch'
        ],
        correct: 1,
        explanation: '`.gitignore` is a file listing patterns of files/folders Git should ignore. Common entries: `node_modules/`, `*.env`, `__pycache__/`, etc.'
      },
      {
        id: 'git-9-q6',
        question: 'What is a "detached HEAD" state?',
        options: [
          'A corrupted repository',
          'When HEAD points directly to a commit instead of a branch',
          'When the remote is unavailable',
          'A failed merge'
        ],
        correct: 1,
        explanation: 'Detached HEAD happens when you checkout a specific commit rather than a branch. Any new commits won\'t belong to a branch and may be lost when you switch away.'
      },
      {
        id: 'git-9-q7',
        question: 'Which workflow uses feature flags to hide unfinished features in production?',
        options: ['Gitflow', 'Trunk-based Development', 'GitHub Flow', 'Waterfall'],
        correct: 1,
        explanation: 'Trunk-based development merges to main very frequently. Feature flags allow unfinished code to exist in production without being visible to users.'
      },
      {
        id: 'git-9-q8',
        question: 'What does `git cherry-pick <sha>` do?',
        options: [
          'Deletes a specific commit',
          'Applies the changes from a specific commit onto the current branch',
          'Selects the best commit for deployment',
          'Creates a branch from a commit'
        ],
        correct: 1,
        explanation: '`git cherry-pick` applies a specific commit\'s changes to your current branch. Useful for applying a hotfix from one branch to another without merging everything.'
      },
      {
        id: 'git-9-q9',
        question: 'How many characters does a full Git SHA-1 hash have?',
        options: ['8', '16', '32', '40'],
        correct: 3,
        explanation: 'A full Git SHA-1 hash is 40 hexadecimal characters. In practice, you only need the first 7 to uniquely identify a commit in most repositories.'
      },
      {
        id: 'git-9-q10',
        question: 'What does `git pull --rebase` do differently from `git pull`?',
        options: [
          'It deletes remote branches',
          'It downloads remote changes and replays your local commits on top, keeping a linear history',
          'It forces a push to the remote',
          'It downloads only the latest commit'
        ],
        correct: 1,
        explanation: '`git pull --rebase` fetches remote changes and then rebases your local commits on top instead of creating a merge commit. This keeps the history linear and clean.'
      },
      {
        id: 'git-9-q11',
        question: 'In which year was Git created?',
        options: ['1999', '2003', '2005', '2008'],
        correct: 2,
        explanation: 'Git was created in 2005 by Linus Torvalds. GitHub was launched later in 2008.'
      },
      {
        id: 'git-9-q12',
        question: 'What is the purpose of `git fetch` before `git merge`?',
        options: [
          'To delete local branches that no longer exist on the remote',
          'To download remote changes for inspection before integrating them',
          'To automatically resolve merge conflicts',
          'To speed up the merge operation'
        ],
        correct: 1,
        explanation: 'Using `git fetch` first lets you inspect what changed on the remote (via `git log origin/main`) before deciding to merge. It gives you more control than `git pull`.'
      },
      {
        id: 'git-9-q13',
        question: 'What does the `-u` flag do in `git push -u origin main`?',
        options: [
          'Makes the push urgent/priority',
          'Sets the upstream tracking relationship so future `git push` and `git pull` know the defaults',
          'Uploads uncommitted changes',
          'Forces the push even if it would overwrite remote history'
        ],
        correct: 1,
        explanation: '`-u` (or `--set-upstream`) links your local branch to the remote branch. After running it once, you can just type `git push` or `git pull` without specifying origin/branch.'
      },
      {
        id: 'git-9-q14',
        question: 'Which command shows the differences between your working directory and the last commit?',
        options: ['git log', 'git status', 'git diff', 'git show'],
        correct: 2,
        explanation: '`git diff` shows line-by-line changes between your working directory and the staging area. `git diff --staged` shows staged changes vs the last commit.'
      },
      {
        id: 'git-9-q15',
        question: 'What does "fast-forward merge" mean?',
        options: [
          'A merge that skips the review process',
          'When Git simply moves the branch pointer forward because there are no diverging commits',
          'A high-speed network transfer of commits',
          'Merging more than 10 commits at once'
        ],
        correct: 1,
        explanation: 'A fast-forward merge happens when the target branch has no commits since you branched off. Git just moves the pointer forward — no merge commit is created.'
      },
      {
        id: 'git-9-q16',
        question: 'What is the purpose of `git bisect`?',
        options: [
          'To split a commit into two separate commits',
          'To perform a binary search through commits to find which one introduced a bug',
          'To merge two branches simultaneously',
          'To compare two different files'
        ],
        correct: 1,
        explanation: '`git bisect` is a powerful debugging tool. You mark a "good" commit and a "bad" commit, and Git checks out commits in between — halving the search space each time until the buggy commit is found.'
      },
      {
        id: 'git-9-q17',
        question: 'What happens when you run `git init` in a folder?',
        options: [
          'It clones a remote repository into the folder',
          'It creates a new .git folder turning the directory into a Git repository',
          'It deletes all existing files',
          'It connects the folder to GitHub'
        ],
        correct: 1,
        explanation: '`git init` initializes a repository by creating a hidden `.git` folder. This folder contains the entire database of history and configuration. Never delete it manually!'
      },
      {
        id: 'git-9-q18',
        question: 'Which of these is NOT a Git hosting platform?',
        options: ['GitHub', 'GitLab', 'Bitbucket', 'Kubernetes'],
        correct: 3,
        explanation: 'Kubernetes is a container orchestration platform, not a Git hosting platform. GitHub, GitLab, and Bitbucket all host Git repositories.'
      },
      {
        id: 'git-9-q19',
        question: 'What does `git commit --amend` do?',
        options: [
          'Creates a new commit after the last one',
          'Edits the last commit (message or content) — only safe if not yet pushed',
          'Permanently reverts the last commit',
          'Adds a tag to the last commit'
        ],
        correct: 1,
        explanation: '`git commit --amend` rewrites the last commit. You can fix the message or add forgotten changes. ONLY use this before pushing — amending published commits breaks others\' history.'
      },
      {
        id: 'git-9-q20',
        question: 'What is a "bare" repository in Git?',
        options: [
          'A repository with no branches',
          'A repository with no working directory — only the Git database (used for servers/remotes)',
          'A repository with empty commit messages',
          'A new repository with no commits yet'
        ],
        correct: 1,
        explanation: 'A bare repository (created with `git init --bare`) has no working directory. It\'s used as a remote/server — you push and fetch from it but don\'t work directly in it. GitHub\'s servers use bare repos internally.'
      }
    ]
  }
]
