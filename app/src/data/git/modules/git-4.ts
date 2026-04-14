import type { Module } from '../../types'

export const git4: Module = {
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
      content: 'Interactive comparison: See how \`merge\` creates a new path while \`rebase\` rewrites history for a clean line.',
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
      content: 'A **fast-forward merge** happens when the target branch (e.g. \`main\`) has had **no new commits** since you branched off. In this case, Git doesn\'t need to create a merge commit — it simply moves the branch pointer forward to the tip of your feature branch.\n\nThis results in a perfectly linear history, as if you had committed directly to \`main\`. Git does fast-forward merges automatically when possible.\n\n💡 You can force a merge commit even in fast-forward scenarios with \`git merge --no-ff feature/x\` — useful for keeping a record of the feature branch in history.'
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
    },
    {
      id: 'git-4-q4',
      question: 'What is a "fast-forward" merge?',
      options: [
        'A merge that happens extremely quickly due to high internet speed',
        'A merge where Git simply moves the branch pointer forward because there are no conflicting changes on main',
        'A merge that automatically deletes the feature branch',
        'A merge that requires a special license'
      ],
      correct: 1,
      explanation: 'If main hasn\'t changed since you branched off, Git simply moves main\'s pointer to your latest commit. No merge commit is needed.'
    },
    {
      id: 'git-4-q5',
      question: 'Why are Pull Requests (PRs) used in professional teams?',
      options: [
        'Because Git cannot merge files without a PR',
        'To allow for code review, discussion, and automated testing before code is integrated',
        'To make the repository larger',
        'To slow down the development process'
      ],
      correct: 1,
      explanation: 'PRs provide a platform for human review and automated quality checks, ensuring that only high-quality code enters the main branch.'
    }
  ]
}
