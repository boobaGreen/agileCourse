import type { Module } from '../../types'

export const git10: Module = {
  id: 'git-10',
  track: 'git',
  order: 10,
  title: 'Git Games & Interactive Labs',
  subtitle: 'Master Git through world-class interactive games',
  emoji: '🎮',
  duration: '∞ min',
  xpReward: 100,
  funFact: 'Interactive games are one of the most effective ways to learn Git because they force you to visualize the commit tree, which is exactly how Git works internally.',
  sections: [
    {
      type: 'intro',
      content: 'You have learned the theory. Now it is time for the **Proving Grounds**. These world-class interactive tools are used by professional developers around the world to master complex branching and merging logic. Choose your weapon!'
    },

    // ── OH MY GIT! ───────────────────────────────────────────────────
    {
      type: 'concept',
      title: '📦 Oh My Git!: The Tactile Card Game',
      content: 'An incredible open-source game built with the Godot engine. It uses a **card-based interface** to represent Git operations, making the staging area and commit flow feel physical and tactical.\n\n**Best for**: Absolute beginners wanting a fun, structured challenge.\n**Difficulty**: Beginner Friendly\n**Play Mode**: Download & Install (Windows, Mac, Linux)\n\n📥 [Download Oh My Git!](https://ohmygit.org/)\n🎬 [Watch dev talks & demos](https://ohmygit.org/videos/)'
    },
    {
      type: 'video',
      title: '📺 Oh My Git! — Gameplay & First Impressions',
      content: 'See someone play Oh My Git! from scratch — a great way to understand how the card system and visual Git tree interact.',
      videoUrl: 'https://www.youtube.com/watch?v=EhcBoefiO4Y'
    },
    {
      type: 'video',
      title: '📺 Oh My Git! — OSS Maintainers Interview',
      content: 'An in-depth interview with the Oh My Git! creators explaining the project, its educational philosophy, and a live walkthrough of the game.',
      videoUrl: 'https://www.youtube.com/watch?v=2oEXT7suqfk'
    },

    // ── LEARN GIT BRANCHING ──────────────────────────────────────────
    {
      type: 'concept',
      title: '🌟 Learn Git Branching: The Browser Masterclass',
      content: 'The most popular Git simulator in the world. It provides a **visual terminal** that reacts instantly to your commands, showing you the commit tree in real time.\n\n**Best for**: Visualizing exact branching, rebasing, and cherry-picking paths.\n**Difficulty**: Beginner to Expert (Scales with your progress)\n**Play Mode**: Web Browser — No installation needed\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/)'
    },
    {
      type: 'video',
      title: '📺 Learn Git with LearnGitBranching — Walkthrough (8 min)',
      content: 'A practical video walkthrough showing exactly how to navigate and use the interactive tool.',
      videoUrl: 'https://www.youtube.com/watch?v=1SM-LQD-CSQ'
    },
    {
      type: 'video',
      title: '📺 Full Playlist: Git Branching Interactive Tutorials',
      content: 'A curated playlist with multiple guided sessions for mastering every level of the interactive challenges.',
      videoUrl: 'https://www.youtube.com/playlist?list=PLymYmPL9yPGp5bcyx3LqHZmS8KDYsT4NY'
    },

    // ── GIT KATAS ────────────────────────────────────────────────────
    {
      type: 'concept',
      title: '🥋 Git Katas: Deliberate CLI Practice',
      content: 'A collection of **30+ hands-on exercises** created by Eficode Academy, inspired by the martial arts concept of "Kata" — deliberate, repetitive practice to build muscle memory.\n\nEach kata is a self-contained challenge: you clone the repo, run a setup script, and solve a specific Git problem in your own terminal. From `basic-commits` to `interactive-rebase` and `merge-conflict` resolution.\n\n**Best for**: Developers who want to practice **real CLI commands** in a safe sandbox.\n**Difficulty**: Beginner to Advanced (30+ exercises, progressive)\n**Play Mode**: Local terminal — Clone & Practice\n\n📂 [Clone Git Katas](https://github.com/eficode-academy/git-katas)\n📖 [GitHub Katas (PRs & Issues)](https://github.com/eficode-academy/github-katas)'
    },
    {
      type: 'video',
      title: '📺 Git for Professionals — Exercises & Best Practices',
      content: 'A high-quality tutorial covering practical Git exercises, branching strategies, and workflows — the same skills you will practice with Git Katas.',
      videoUrl: 'https://www.youtube.com/watch?v=Uszj_k0DGsg'
    },

    // ── COMPARISON TABLE ─────────────────────────────────────────────
    {
      type: 'table',
      title: '⚔️ Which tool should you start with?',
      content: 'A quick comparison to help you choose:',
      tableData: {
        headers: ['Feature', 'Oh My Git! 🎮', 'Learn Git Branching 🌐', 'Git Katas 🥋'],
        rows: [
          ['**Platform**', 'Desktop app (download)', 'Web browser (instant)', 'Local terminal (clone repo)'],
          ['**Interface**', 'Card-based drag & drop', 'Terminal + visual tree', 'Real CLI with setup scripts'],
          ['**Best for**', 'Absolute beginners', 'Visualizing branches & merges', 'Building real CLI muscle memory'],
          ['**Topics covered**', 'add, commit, branch, merge', 'Branch, rebase, cherry-pick, remotes', 'All: staging, merge conflicts, rebase, stash, hooks, submodules'],
          ['**Cost**', 'Free & Open Source', 'Free', 'Free & Open Source']
        ]
      }
    },

    // ── PRO TIPS ─────────────────────────────────────────────────────
    {
      type: 'tip',
      title: '💡 Pro Tip',
      content: 'Don\'t be afraid to break things! These games use a "sandbox" approach — there are no real files at risk. It\'s the safest place to try that scary `git rebase -i` for the first time.'
    },
    {
      type: 'tip',
      title: '🎯 Suggested Learning Path',
      content: '**Step 1**: Start with **Oh My Git!** to build intuition with the visual card system.\n**Step 2**: Move to **Learn Git Branching** and complete the Introduction Sequence.\n**Step 3**: Clone the **Git Katas** repo and practice `basic-commits`, `basic-staging`, and `basic-branching`.\n**Step 4**: Challenge yourself with the Remote levels in Learn Git Branching.\n**Step 5**: Tackle advanced katas: `merge-conflict`, `rebase-branch`, `cherry-pick`.\n**Step 6**: Come back here and ace the Final Quiz! 🏆'
    }
  ]
}
