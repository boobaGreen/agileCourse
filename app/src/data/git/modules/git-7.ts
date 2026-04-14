import type { Module } from '../../types'

export const git7: Module = {
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
      type: 'video',
      title: '📺 Git basics in 60 seconds!',
      content: 'A hyper-fast overview of the daily commit loop and staging area by ThePrimeagen.',
      videoUrl: 'https://www.youtube.com/watch?v=KjusL9BBZ7U'
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
        headers: ['Command', 'Purpose', 'Example'],
        rows: [
          ['`git add .`', 'Stages all changes in the current folder', '`git add .`'],
          ['`git add <file>`', 'Stages only a specific file (recommended)', '`git add index.html`'],
          ['`git commit -m "msg"`','Saves snapshot with a descriptive message', '`git commit -m "Fix login bug"`'],
          ['`git commit --amend -m "..."`','Fixes the last commit using staged files', '`git commit --amend -m "Fix typo"`'],
          ['`git diff`','Shows unstaged changes between workspace and staging', '`git diff`'],
          ['`git log`','Shows the timeline of commits (history)', '`git log --oneline`']
        ]
      }
    },
    {
      type: 'game',
      title: 'Lab: Detached HEAD',
      content: 'Scollega la tua testa (HEAD) dal branch attuale per viaggiare nel tempo e ispezionare commit passati senza alterare la storia principale.',
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Initial commit' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Feature A works' },
            'C3': { id: 'C3', parents: ['C2'], message: 'Feature B buggy' },
            'C4': { id: 'C4', parents: ['C3'], message: 'Feature C added' }
          },
          branches: { 'main': 'C4' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: 'Sganciati dal branch corrente facendo checkout direttamente verso l\'hash C2', condition: 'DETACHED_HEAD:C2' },
          { id: '2', instruction: 'Torna al presente riagganciando la HEAD sul branch main', condition: 'CURRENT_BRANCH:main' }
        ]
      }
    },
    {
      type: 'tip',
      title: '🎮 Practice This Module',
      content: '**Learn Git Branching**: Revisit *Introduction Sequence — Level 1* (Introduction to Git Commits)\n\n**Oh My Git!**: Play the *Files* and *Index* chapters\n\n**Git Kata**: `basic-commits`, `basic-staging`, `basic-cleaning`\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)'
    }
  ],
  quiz: [
    {
      id: 'git-7-q1',
      question: 'Which area acts as a "waiting room" before a commit is saved?',
      options: ['Working Directory', 'Staging Area', 'Local Repository', 'Remote Server'],
      correct: 1,
      explanation: 'The Staging Area (or Index) is where you pick which changes to include in your next snapshot (commit).'
    },
    {
      id: 'git-7-q2',
      question: 'What command is used to move your modifications from the Working Directory into the Staging Area?',
      options: ['git commit', 'git status', 'git push', 'git add'],
      correct: 3,
      explanation: 'The `git add` command stages your changes, placing them in the "waiting room" before they become a permanent commit.'
    },
    {
      id: 'git-7-q3',
      question: 'What is the primary function of the `git commit --amend` command?',
      options: ['To delete the last commit permanently', 'To edit the previous commit by merging new staged changes or rewriting the message', 'To automatically push your commit to the cloud', 'To undo everything and empty the staging area'],
      correct: 1,
      explanation: '`git commit --amend` modifies the very last commit, which is incredibly useful for instantly fixing a typo or adding a forgotten file.'
    },
    {
      id: 'git-7-q4',
      question: 'Which status color usually represents a file that is staged and ready to be committed?',
      options: ['Red', 'Green', 'Yellow', 'Blue'],
      correct: 1,
      explanation: 'In the `git status` output, files listed in green are staged and ready for the next commit, while red files are modified but not yet staged.'
    },
    {
      id: 'git-7-q5',
      question: 'What is an "atomic commit" in professional Git usage?',
      options: [
        'A commit that contains every change made during a whole week',
        'A small, focused commit that handles only one specific task or fix',
        'A commit that automatically deletes itself after merge',
        'A very large commit that requires special permissions'
      ],
      correct: 1,
      explanation: 'Atomic commits are better because they make debugging, reverting, and reviewing much easier for the entire team.'
    }
  ]
}
