import type { Module } from '../../types'

export const git6: Module = {
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
      title: '🛤️ Trunk-Based Development',
      content: 'In Trunk-Based Development, developers collaborate on a **single branch** (the "trunk", usually `main`). Branches are short-lived (only a few hours) and merged back as soon as possible.\n\n✅ Good for: CI/CD, high-velocity teams, senior engineers\n🟢 Requires: Automated tests to prevent breaking the trunk'
    },
    {
      type: 'analogy',
      title: '🚣 Rowing together vs separate paths',
      content: 'Gitflow is like writing a book in separate chapters and only combining them at the end. Trunk-based is like everyone writing on the same page in real-time — it requires more coordination, but avoids "merge hell" at the end of the month.'
    },
    {
      type: 'table',
      title: '⚖️ Choosing your Strategy',
      content: 'Which one should your team use?',
      tableData: {
        headers: ['Feature', 'Gitflow', 'Trunk-Based'],
        rows: [
          ['**Complexity**', 'High (many branches)', 'Low (one main branch)'],
          ['**Release Speed**', 'Cycles (Weeks/Months)', 'Continuous (Daily/Hourly)'],
          ['**Code Review**', 'On PR merge to develop', 'Constant peer review'],
          ['**Ease of Use**', 'Steep learning curve', 'Simple but disciplined']
        ]
      }
    },
    {
      type: 'tip',
      title: '💡 Pro Tip: GitHub Flow',
      content: 'For most small-to-medium web projects, **GitHub Flow** is the sweet spot: Create a branch from `main`, push commits, open a PR, merge after approval. Simple, clean, and effective.'
    },
    {
      type: 'tip',
      title: '🎮 Practice This Module',
      content: '**Learn Git Branching**: Complete *Remote Tab — Advanced* levels 9-10 (Push Main!, Merging with Remotes)\n\n**Oh My Git!**: Play the *Workflows* chapter\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/)'
    }
  ],
  quiz: [
    {
      id: 'git-6-q1',
      question: 'In Gitflow, which branch is used as the integration branch for all features?',
      options: ['main', 'develop', 'release', 'hotfix'],
      correct: 1,
      explanation: 'In Gitflow, `develop` is where features are combined. `main` only receives code when a release is ready for production.'
    },
    {
      id: 'git-6-q2',
      question: 'What is the core principle of Trunk-Based Development?',
      options: [
        'Developers work on long-lived feature branches',
        'Everyone works on a single "trunk" branch with frequent merges',
        'Code is only merged once a month',
        'Multiple main branches exist for different countries'
      ],
      correct: 1,
      explanation: 'Trunk-based development focuses on merging small changes into the main branch (trunk) very frequently, often multiple times per day.'
    },
    {
      id: 'git-6-q3',
      question: 'Which workflow is most suitable for a team releasing updates multiple times a day (Continuous Deployment)?',
      options: ['Gitflow', 'Trunk-Based Development', 'A single-branch model without PRs', 'Sequential Waterfall'],
      correct: 1,
      explanation: 'Trunk-based development is the standard for high-performance teams practicing CI/CD, as it minimizes merge complexity and keeps the trunk always ready for deployment.'
    },
    {
      id: 'git-6-q4',
      question: 'What is a "hotfix" branch in Gitflow?',
      options: [
        'A branch for trying out new experimental libraries',
        'A branch created directly from main to fix an urgent bug in production',
        'A branch for updating documentation only',
        'A branch used to train new developers'
      ],
      correct: 1,
      explanation: 'Hotfixes are unique in Gitflow because they diverge from `main` (production) to fix a critical bug immediately, then merge back to both `main` and `develop`.'
    },
    {
      id: 'git-6-q5',
      question: 'Why does Trunk-Based Development require strong automated testing?',
      options: [
        'To make the CI/CD pipeline look busy',
        'Because without tests, developers might break the shared main branch for everyone',
        'To replace human code reviewers entirely',
        'It doesn\'t require testing'
      ],
      correct: 1,
      explanation: 'Since everyone is merging to `main` constantly, a single bug could block the entire team. Automated tests act as the "guardrails" that ensure the trunk remains stable.'
    }
  ]
}
