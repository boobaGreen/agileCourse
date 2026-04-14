import type { Module } from '../../types'

export const git9: Module = {
  id: 'git-9',
  track: 'git',
  order: 9,
  title: 'Power User Tools',
  subtitle: 'Surgical fixes and specialized debugging',
  emoji: '🍒',
  duration: '15 min',
  xpReward: 90,
  funFact: 'Git Bisect is so fast it can find a bug in 100,000 commits in just 17 steps. It is the closest thing to real-life time travel debugging.',
  sections: [
    {
      type: 'intro',
      content: 'Basic Git is for daily saving. Power Git is for when things get complicated. These tools are your "surgical instruments" for maintaining a professional repository.'
    },
    {
      type: 'concept',
      title: '🍒 Cherry-picking: The Surgical Harvest',
      content: 'Imagine there is a critical bugfix on a messy "experimental" branch. You don\'t want to merge the whole messy branch, you just want that **one specific fix**. \n\n**Cherry-pick** lets you grab a commit from anywhere and apply it to your current branch. It\'s like picking the best fruit from a tree without taking the whole branch.'
    },
    {
      type: 'concept',
      title: '🧪 Cherry-Pick Visualization',
      content: 'Cherry-picking is like copy-pasting a specific commit from one branch to another. It creates a brand new commit on your current branch with the exact same changes as the source.'
    },
    {
       type: 'concept',
       title: '🔀 Merge vs Rebase: The History Debate',
       content: 'When joining branches, you have two philosophies:\n\n1. **Merge**: "Preserve the historical truth." It creates a merge commit showing exactly when branches rejoined.\n2. **Rebase**: "Maintain a clean, linear history." It rewrites your commits to look like they were built on top of the latest version of the main branch.\n\n**Beginner Tip**: Keep it simple. Merge is safer for teams; Rebase is better for keeping a clean personal history.'
    },
    {
      type: 'concept',
      title: '🧪 Rebase vs Merge Flow',
      content: 'A **Merge** creates a diamond shape in your graph. A **Rebase** creates a straight line. Rebase is like saying: "I want my changes to look like they were always meant to be at the front of the line."'
    },
    {
      type: 'concept',
      title: '🔍 git bisect: The Needle in the Haystack',
      content: '**The Problem**: A bug was introduced somewhere in the last 100 commits, but you don\'t know which one. Testing each one manually would take hours.\n\n**The Solution**: `git bisect` uses **Binary Search**. It picks a commit in the middle and asks you "Is it broken?". Based on your answer, it eliminates half the commits and repeats. It finds the culprit with surgical precision in minutes.'
    },
    {
      type: 'concept',
      title: '🕹️ Bisect Logic',
      content: 'When debugging, `git bisect start` marks the "Bad" (broken) and "Good" (working) points. Git then checks out the point right in the middle for you to test.'
    },
    {
      type: 'concept',
      title: '🚫 .gitignore: Cleanliness & Security',
      content: 'Not everything belongs in Git. You should **always** ignore:\n\n1. **Secrets**: Passwords, API keys (using `.env`).\n2. **Large Bulky Folders**: `node_modules`. These make clone times slow.\n3. **Build Artifacts**: Computed files (`dist/`, `build/`).\n\nIgnoring them keeps your repository fast, light, and secure.'
    },
    {
      type: 'animation',
      title: '📦 The .gitignore Builder',
      content: 'Practice identifying which files should be tracked and which should be ignored.',
      animationType: 'git-ignore-lab'
    },
    {
      type: 'game',
      title: 'Lab: La Raccolta Delle Ciliegie',
      content: 'Il tuo collega ha fatto un disastro sul suo branch, ma ci sono due commit eccellenti in mezzo al casino. Rubali per il tuo main.',
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Initial commit' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Main work' },
            'C3': { id: 'C3', parents: ['C1'], message: 'Good feature 1' },
            'C4': { id: 'C4', parents: ['C3'], message: 'Terrible bug' },
            'C5': { id: 'C5', parents: ['C4'], message: 'Good feature 2' }
          },
          branches: { 'main': 'C2', 'chaos': 'C5' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: 'Assicurati di essere su main. Usa il comando per "rubare" (cherry-pick) unicamente il commit C3', condition: 'COMMIT_COUNT:main:3' },
          { id: '2', instruction: 'Ripeti l\'operazione per rubarne un altro: porta dentro anche C5, ignorando il bug', condition: 'COMMIT_COUNT:main:4' }
        ]
      }
    },
    {
      type: 'tip',
      title: '🎮 Practice This Module',
      content: '**Learn Git Branching**: Complete *Moving Work Around* (Cherry-pick, Interactive Rebase) + *A Mixed Bag* (Tags, Juggling Commits, Git Describe)\n\n**Oh My Git!**: Play *Bisect*, *Tags* chapters, then try the *Sandbox*\n\n**Git Kata**: `amend`, `advanced-rebase-interactive`, `bad-commit` (bisect), `ignore`, `git-tag`\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)'
    }
  ],
  quiz: [
    {
      id: 'git-9-q1',
      question: 'In which scenario is `git cherry-pick` the most useful?',
      options: [
        'When you want to merge two entire branches together',
        'When you want to take a specific bugfix commit from a feature branch into production',
        'When you want to delete a commit from history',
        'When you want to rename your current branch'
      ],
      correct: 1,
      explanation: 'Cherry-picking is "surgical." It\'s best when you need just one or two specific changes from another branch without bringing in all the other work.'
    },
    {
      id: 'git-9-q2',
      question: 'What is the main advantage of using `git bisect`?',
      options: [
        'It automatically fixes the bug for you',
        'It finds the exact commit that introduced a bug using binary search',
        'It highlights syntax errors in your code',
        'It deletes bad code automatically'
      ],
      correct: 1,
      explanation: '`git bisect` is a debugging tool. It helps you find the "culprit" commit by narrowing down the history using a "search and eliminate" strategy.'
    },
    {
      id: 'git-9-q3',
      question: 'Which of these files should NEVER be committed to Git for security reasons?',
      options: ['index.html', 'style.css', '.env (API Keys)', 'README.md'],
      correct: 2,
      explanation: 'Files like `.env` contain sensitive secrets like passwords or API keys. If committed, they could be leaked to anyone with access to the repo (especially on GitHub!).'
    },
    {
      id: 'git-9-q4',
      question: 'What happens to the timeline when you use `git rebase`?',
      options: [
        'It creates a big "Merge Commit" node',
        'It rewrites history to create a clean, linear line of commits',
        'It deletes the feature branch permanently',
        'It sends an email to the team leader'
      ],
      correct: 1,
      explanation: 'Rebasing "re-bases" your work on top of the latest commit, making it look like you started your work just now. This results in a cleaner, straight-line history.'
    },
    {
      id: 'git-9-q5',
      question: 'Why do we ignore `node_modules` or `dist/` folders in `.gitignore`?',
      options: [
        'Because they are illegal to share',
        'Because they are large, generated files that can easily be rebuilt on other machines',
        'Because Git cannot compress them',
        'Because they cause merge conflicts 100% of the time'
      ],
      correct: 1,
      explanation: 'Generated files are bulky and slow down Git. Since anyone can run `npm install` or `npm run build` to get them back, we don\'t waste space saving them in history.'
    }
  ]
}
