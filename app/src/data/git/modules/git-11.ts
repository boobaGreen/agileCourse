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
      options: [
        'Virtual Container System',
        'Version Control System',
        'Visual Code Studio',
        'Variable Commit Save'
      ],
      correct: 1,
      explanation: 'VCS = Version Control System. The category of tools that Git belongs to.'
    },
    {
      id: 'git-11-q2',
      question: 'Which command creates a local copy of a remote repository?',
      options: [
        'git init (initializes new)',
        'git fetch (downloads updates)',
        'git clone (copies everything)',
        'git pull (fetches and merges)'
      ],
      correct: 2,
      explanation: '`git clone <url>` downloads the entire repository (all history, all branches) to your machine.'
    },
    {
      id: 'git-11-q3',
      question: 'What is HEAD in Git?',
      options: [
        'The very first commit ever recorded in the project repository',
        'A pointer to the currently checked-out commit or active branch',
        'The primary IP address of the remote cloud-based Git server',
        'The name of the lead developer who originally created the repo'
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
        'Deletes temporary files',
        'Tells Git which files to never track',
        'Shows all ignored commits',
        'Encrypts sensitive files'
      ],
      correct: 1,
      explanation: 'It excludes temporary or sensitive files from being tracked.'
    },
    {
      id: 'git-11-q6',
      question: 'What is a "detached HEAD" state?',
      options: [
        'A corrupted repository database',
        'When HEAD points to a commit instead of a branch',
        'When the remote server is down',
        'A failed merge operation'
      ],
      correct: 1,
      explanation: 'You are looking at a fixed point in time, not a moving branch.'
    },
    {
      id: 'git-11-q7',
      question: 'Which modern Git workflow often relies on "feature flags" to keep the main branch stable while merging frequent updates?',
      options: ['Gitflow', 'Trunk-based Development', 'GitHub Flow', 'Waterfall'],
      correct: 1,
      explanation: 'Trunk-based development uses feature flags to hide unfinished work, allowing developers to merge small, frequent commits into the main branch without breaking the build.'
    },
    {
      id: 'git-11-q8',
      question: 'What does `git cherry-pick <sha>` do?',
      options: [
        'Deletes a specific commit from the history',
        'Applies a single specific commit to the current branch',
        'Renames the currently active branch to something else',
        'Cleans up all untracked files in the working directory'
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
        'Deletes all local branches to match the remote state',
        'Replays local commits on top of remote changes for linear history',
        'Forces a push to the remote server even if there are conflicts',
        'Compiles the source code after downloading the latest updates'
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
        'It clears the entire local cache to save disk space',
        'It downloads updates without changing your local files',
        'It deletes old branches that no longer exist on remote',
        'It pushes all local work to the primary remote server'
      ],
      correct: 1,
      explanation: 'Fetch is safe because it only downloads data for you to inspect.'
    },
    {
      id: 'git-11-q13',
      question: 'What does the `-u` flag do in push?',
      options: [
        'Marks the push as extremely urgent and high priority',
        'Sets upstream tracking for the currently active branch',
        'Unlocks the repository for other team members to use',
        'Upgrades the Git installation to the latest version'
      ],
      correct: 1,
      explanation: 'It links your local branch to the remote branch for future shorthand commands.'
    },
    {
      id: 'git-11-q14',
      question: 'Which command shows unstaged local changes?',
      options: [
        'git status (shows file states)',
        'git diff (shows line-by-line)',
        'git log (shows commit history)',
        'git show (shows specific commit)'
      ],
      correct: 1,
      explanation: '`git diff` shows the delta between your work and the staging area.'
    },
    {
      id: 'git-11-q15',
      question: 'What is a fast-forward merge?',
      options: [
        'A merge process that handles over 100 commits at once',
        'Moving a branch pointer forward with no diverging work',
        'An automated script for resolving complex conflicts',
        'A specialized type of merge performed only on GitHub'
      ],
      correct: 1,
      explanation: 'No merge commit is needed because the history is a straight line.'
    },
    {
      id: 'git-11-q16',
      question: 'What is `git bisect` used for?',
      options: [
        'Splitting large commits into smaller, more atomic ones',
        'Finding a bug-introducing commit using binary search',
        'Comparing two different files for character-level deltas',
        'Archiving the entire repository into a compressed format'
      ],
      correct: 1,
      explanation: 'It\'s a powerful debugging tool to find regressions.'
    },
    {
      id: 'git-11-q17',
      question: 'What happens when you run `git init`?',
      options: [
        'Clones a remote repository from a URL like GitHub',
        'Creates a .git folder and initializes the project database',
        'Deletes the entire project history to start from scratch',
        'Logs you into your primary GitHub or GitLab account'
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
        'Adds a comment to a specific file in the directory',
        'Modifies the very last commit that you just created',
        'Reverts the repository to its last known stable state',
        'Automatically fixes syntax errors in your source code'
      ],
      correct: 1,
      explanation: 'Useful for fixing the last message or adding a forgotten file.'
    },
    {
      id: 'git-11-q20',
      question: 'What is a "bare" repository?',
      options: [
        'A repository with no working files (server/remote only)',
        'An empty repository with no files or folders inside',
        'A repository with no branches created or tracked yet',
        'A very basic version of Git with limited functionality'
      ],
      correct: 0,
      explanation: 'Bare repos (created with `git init --bare`) only contain the history database, not live files.'
    }
  ]
}
