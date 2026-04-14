import type { Module } from '../../types'

export const git11: Module = {
  id: 'git-11',
  track: 'git',
  order: 11,
  title: 'Final Quiz',
  subtitle: 'The ultimate knowledge test',
  emoji: '🏆',
  duration: '15 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: 'Ready to prove your mastery? This comprehensive quiz covers everything from the basics to advanced workflows.'
    }
  ],
  quiz: [
    {
      id: 'git-11-q1',
      question: 'What does VCS stand for?',
      options: ['Virtual Container System', 'Version Control System', 'Visual Code Studio', 'Variable Commit Save'],
      correct: 1,
      explanation: 'VCS = Version Control System. The category of tools that Git belongs to.'
    },
    {
      id: 'git-11-q2',
      question: 'Which command creates a local copy of a remote repository?',
      options: ['git init', 'git fetch', 'git clone', 'git pull'],
      correct: 2,
      explanation: '`git clone <url>` downloads the entire repository (all history, all branches) to your machine.'
    },
    {
      id: 'git-11-q3',
      question: 'What is HEAD in Git?',
      options: [
        'The first commit in the repository',
        'A pointer to the currently checked-out commit or branch',
        'The remote server address',
        'The repository owner'
      ],
      correct: 1,
      explanation: 'HEAD points to your current location in history.'
    },
    {
      id: 'git-11-q4',
      question: 'Which command shows the history of commits?',
      options: ['git status', 'git history', 'git log', 'git show'],
      correct: 2,
      explanation: '`git log` displays the timeline of snapshots.'
    },
    {
      id: 'git-11-q5',
      question: 'What does .gitignore do?',
      options: [
        'Deletes files',
        'Tells Git which files to never track',
        'Shows ignored commits',
        'Encrypts files'
      ],
      correct: 1,
      explanation: 'It excludes temporary or sensitive files from being tracked.'
    },
    {
      id: 'git-11-q6',
      question: 'What is a "detached HEAD" state?',
      options: [
        'A corrupted repo',
        'When HEAD points directly to a commit instead of a branch',
        'When remote is down',
        'A failed merge'
      ],
      correct: 1,
      explanation: 'You are looking at a fixed point in time, not a moving branch.'
    },
    {
      id: 'git-11-q7',
      question: 'Which workflow uses feature flags for continuous deployment?',
      options: ['Gitflow', 'Trunk-based Development', 'GitHub Flow', 'Waterfall'],
      correct: 1,
      explanation: 'Trunk-based development relies on flags to keep main stable while merging often.'
    },
    {
      id: 'git-11-q8',
      question: 'What does `git cherry-pick <sha>` do?',
      options: [
        'Deletes a commit',
        'Surgically applies a specific commit to the current branch',
        'Renames a branch',
        'Cleans the workspace'
      ],
      correct: 1,
      explanation: 'It copies a single commit\'s changes elsewhere.'
    },
    {
      id: 'git-11-q9',
      question: 'How many characters is a full Git SHA-1 hash?',
      options: ['8', '16', '32', '40'],
      correct: 3,
      explanation: 'A full SHA-1 hash is 40 hexadecimal characters.'
    },
    {
      id: 'git-11-q10',
      question: 'What does `git pull --rebase` do?',
      options: [
        'Deletes branches',
        'Replays local commits on top of remote changes for a linear history',
        'Forces a push',
        'Compiles the code'
      ],
      correct: 1,
      explanation: 'It avoids merge commits by updating your base before adding your work.'
    },
    {
      id: 'git-11-q11',
      question: 'In which year was Git created?',
      options: ['1999', '2003', '2005', '2008'],
      correct: 2,
      explanation: 'Linus Torvalds created Git in 2005.'
    },
    {
      id: 'git-11-q12',
      question: 'What is the benefit of `git fetch`?',
      options: [
        'It clears local cache',
        'It downloads updates without changing your local files',
        'It deletes old branches',
        'It pushes local work'
      ],
      correct: 1,
      explanation: 'Fetch is safe because it only downloads data for you to inspect.'
    },
    {
      id: 'git-11-q13',
      question: 'What does the `-u` flag do in push?',
      options: [
        'Urgent push',
        'Sets upstream tracking for the branch',
        'Unlocks the repository',
        'Upgrades Git'
      ],
      correct: 1,
      explanation: 'It links your local branch to the remote branch for future shorthand commands.'
    },
    {
      id: 'git-11-q14',
      question: 'Which command shows unstaged local changes?',
      options: ['git status', 'git diff', 'git log', 'git show'],
      correct: 1,
      explanation: '`git diff` shows the delta between your work and the staging area.'
    },
    {
      id: 'git-11-q15',
      question: 'What is a fast-forward merge?',
      options: [
        'Merging 100+ commits',
        'Moving a branch pointer forward because of no diverging work',
        'An automated script',
        'A merge on GitHub'
      ],
      correct: 1,
      explanation: 'No merge commit is needed because the history is a straight line.'
    },
    {
      id: 'git-11-q16',
      question: 'What is `git bisect` used for?',
      options: [
        'Splitting commits',
        'Finding which commit introduced a bug using binary search',
        'Comparing two files',
        'Archiving the repo'
      ],
      correct: 1,
      explanation: 'It\'s a powerful debugging tool to find regressions.'
    },
    {
      id: 'git-11-q17',
      question: 'What happens when you run `git init`?',
      options: [
        'Clones a repo',
        'Creates a .git folder and initializes the project',
        'Deletes history',
        'Logs into GitHub'
      ],
      correct: 1,
      explanation: 'It creates the internal database for tracking.'
    },
    {
      id: 'git-11-q18',
      question: 'Which is NOT a Git platform?',
      options: ['GitHub', 'GitLab', 'Bitbucket', 'Kubernetes'],
      correct: 3,
      explanation: 'Kubernetes manages containers, not Git repositories.'
    },
    {
      id: 'git-11-q19',
      question: 'What does `git commit --amend` do?',
      options: [
        'Adds a comment',
        'Modifies the very last commit',
        'Reverts to last state',
        'Fixes syntax errors'
      ],
      correct: 1,
      explanation: 'Useful for fixing the last message or adding a forgotten file.'
    },
    {
      id: 'git-11-q20',
      question: 'What is a "bare" repository?',
      options: [
        'A repo with no working files (server/remote only)',
        'An empty repo',
        'A repo with no branches',
        'A basic version of Git'
      ],
      correct: 0,
      explanation: 'Bare repos (created with `git init --bare`) only contain the history database, not live files.'
    }
  ]
}
