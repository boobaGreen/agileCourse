import type { Module } from '../../types'

export const git5: Module = {
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
      content: 'Working with remote repositories. Use the **-u flag** the first time you push a branch to set it as "upstream" (tracking), so future commands can be shorter.',
      code: `# 1. Download the repo
git clone https://github.com/company/repo.git

# 2. Check for updates
git fetch origin

# 3. Pull (Merge)
git pull origin main

# 4. Pull (Rebase)
git pull --rebase origin main

# 5. Push your work and set upstream
git push -u origin main`,
      language: 'bash'
    },
    {
      type: 'concept',
      title: '📦 Bare Repositories',
      content: 'On a server or remote (like GitHub), repositories are often **"bare"**. A bare repo has no working directory (you can\'t edit files there); it only contains the Git history database. It is created with `git init --bare`.'
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
    },
    {
      type: 'game',
      title: 'Lab: Sincronizza il Team',
      content: 'Fai finta di aver appena fatto `git fetch` e di aver scaricato dal server un nuovo branch chiamato `origin/main` coi commit del tuo team. Uniscilo al tuo lavoro locale senza creare conflitti!',
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Initial commit' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Your local commit' },
            'C3': { id: 'C3', parents: ['C1'], message: 'Teammates commit' }
          },
          branches: { 'main': 'C2', 'origin/main': 'C3' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: 'Trovi il nuovo lavoro sul branch origin/main: uniscilo al tuo branch per finire la sincronizzazione!', condition: 'MERGED:origin/main' }
        ]
      }
    },
    {
      type: 'tip',
      title: '🎮 Practice This Module',
      content: '**Learn Git Branching**: Complete the *Remote Tab — Push & Pull* sequence (levels 1-8: Clone, Fetch, Pull, Push, Diverged History)\n\n**Oh My Git!**: Play the *Remotes* chapter\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)'
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
    },
    {
      id: 'git-5-q4',
      question: 'Which command is "safer" because it downloads remote data but does not modify your local code until you are ready?',
      options: ['git pull', 'git fetch', 'git push', 'git update'],
      correct: 1,
      explanation: '`git fetch` downloads the latest data from the remote server so you can inspect it. It doesn\'t force a merge, so it won\'t create conflicts or change your files until you manually run merge or rebase.'
    },
    {
      id: 'git-5-q5',
      question: 'What happens if you try to `git push` but a teammate has already pushed other changes to the same branch on the server?',
      options: [
        'Git automatically merges them for you on the server',
        'Git rejects your push (Rejected: non-fast-forward)',
        'Your changes overwrite the teammate\'s changes',
        'Git deletes the remote branch'
      ],
      correct: 1,
      explanation: 'Git is protective. If the remote history has moved forward since your last pull, it will reject your push. You must `git pull` first, resolve any conflicts, and then push.'
    }
  ]
}
