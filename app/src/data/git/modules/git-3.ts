import type { Module } from '../../types'

export const git3: Module = {
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
      content: 'A commit isn\'t just a list of changes; it\'s a **complete snapshot** of every file in your project. Each commit has a unique **SHA identifier** (e.g., `a1b2c3d`) — a digital fingerprint. A full Git hash is exactly **40 hexadecimal characters** long, ensuring your history can never be tampered with.'
    },
    {
      type: 'concept',
      title: '🧪 The Hashing Logic',
      content: 'Every commit has a unique SHA fingerprint. Git uses this to ensure that no part of your history can be changed without it noticing. If you change even a single character in your code, the fingerprint changes completely!\n\n**Examples of Git Hashes:** <!-- desktop-only -->\n- `a1b2c3d` (A shortened 7-character hash) <!-- desktop-only -->\n- `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391` (A full 40-character version) <!-- desktop-only -->'
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
    },
    {
      type: 'game',
      title: 'Lab: First Steps',
      content: 'Let\'s put it into practice! Open the interactive terminal below and make two commits to advance the history on the main branch.',
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 'C1': { id: 'C1', parents: [], message: 'Initial commit' } },
          branches: { 'main': 'C1' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: 'Create a new commit in the history (the message or content doesn\'t matter in this simulation)', condition: 'COMMIT_COUNT:main:2' },
          { id: '2', instruction: 'Create another commit to extend the branch', condition: 'COMMIT_COUNT:main:3' }
        ]
      }
    },
    {
      type: 'tip',
      title: '🎮 Practice This Module',
      content: '**Learn Git Branching**: Complete *Introduction Sequence — Level 1* (Introduction to Git Commits)\n\n**Oh My Git!**: Play the *Intro* and *Files* chapters\n\n**Git Kata**: `basic-commits`, `basic-staging`\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)'
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
}
