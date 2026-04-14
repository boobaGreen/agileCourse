import type { Module } from '../../types'

export const git8: Module = {
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
      type: 'concept',
      title: '📍 Visualizing HEAD',
      content: 'Think of **HEAD** as the "You Are Here" pointer on a map. When you checkout a branch, HEAD points to that branch nickname. When you checkout a commit, HEAD points to the raw hash.\n\nRun `git log --oneline --graph --all` to see your HEAD in relation to all other branches.'
    },
    {
      type: 'concept',
      title: '🧪 Reset vs Revert',
      content: '**Reset**: Moves the branch pointer backward. It effectively "deletes" commits from history. Use ONLY on personal, local branches.\n\n**Revert**: Creates a NEW commit that does the exact opposite of a past commit. It preserves history and is safe for shared/public branches.'
    },
    {
      type: 'concept',
      title: '🔌 Detached HEAD — Lost in Time',
      content: 'Normally, **HEAD** is a pointer that points to your current branch. However, if you checkout a specific commit hash directly (e.g., `git checkout a1b2c3d`), HEAD points directly to that commit instead of a branch. This is the **detached HEAD** state. Any new commits here are not on a branch and may get lost!'
    },
    {
      type: 'game',
      title: 'Lab: Reset or Revert?',
      content: 'Use `reset` to rewrite local history, but use `revert` to fix code that you have already shared with colleagues.',
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Initial commit' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Working code' },
            'C3': { id: 'C3', parents: ['C2'], message: 'FATAL CRASH BUG' }
          },
          branches: { 'main': 'C3', 'shared': 'C3' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: 'You can\'t use reset because you would delete public history. Use the correct command to create an "anti-commit" that safely undoes C3.', condition: 'COMMIT_COUNT:main:4' }
        ]
      }
    },
    {
      type: 'tip',
      title: '🎮 Practice This Module',
      content: '**Learn Git Branching**: Complete *Ramping Up* sequence (levels 5-8: Detached HEAD, Relative Refs, Reversing Changes)\n\n**Oh My Git!**: Play *Changing the Past*, *Shit Happens*, and *Stash* chapters\n\n**Git Kata**: `basic-revert`, `basic-stashing`, `save-my-commit`, `detached-head`, `commit-on-wrong-branch`\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)'
    }
  ],
  quiz: [
    {
      id: 'git-8-q1',
      question: 'Which undo command is SAFEST for shared branches because it doesn\'t delete history?',
      options: ['git reset --hard', 'git revert', 'git checkout', 'git clean'],
      correct: 1,
      explanation: '`git revert` creates a new "inverse" commit. It keeps the history intact, making it the safest choice for collaboration.'
    },
    {
      id: 'git-8-q2',
      question: 'You have unfinished work but need to switch branches immediately. Which command "hides" your changes safely?',
      options: ['git hide', 'git stash', 'git pause', 'git commit --later'],
      correct: 1,
      explanation: '`git stash` takes your uncommitted changes and puts them on a temporary "shelf" so you can switch branches with a clean workspace.'
    },
    {
      id: 'git-8-q3',
      question: 'What happens if you checkout a specific commit hash (e.g., git checkout a1b2c3d) instead of a branch?',
      options: [
        'The commit is deleted from history',
        'You enter a "Detached HEAD" state',
        'A new branch is created automatically',
        'Git prevents the operation for safety'
      ],
      correct: 1,
      explanation: 'When you checkout a commit directly, HEAD points to that commit instead of a branch. This is called the Detached HEAD state.'
    }
  ]
}
