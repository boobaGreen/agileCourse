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
      type: 'animation',
      title: '📦 The Emergency Stash',
      content: 'Need to switch branches but your work isn\'t ready to commit?',
      animationType: 'git-stash-lab'
    },
    {
      type: 'concept',
      title: '🔌 Detached HEAD — Lost in Time',
      content: 'Normally, **HEAD** is a pointer that points to your current branch. However, if you checkout a specific commit hash directly (e.g., `git checkout a1b2c3d`), HEAD points directly to that commit instead of a branch. This is the **detached HEAD** state. Any new commits here are not on a branch and may get lost!'
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
