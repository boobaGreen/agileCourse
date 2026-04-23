import type { Module } from '../../types'

export const git1: Module = {
  id: 'git-1',
  track: 'git',
  order: 1,
  title: 'What is Version Control?',
  subtitle: 'Why "save as final_FINAL_v2.docx" is never the answer',
  emoji: '⏱️',
  duration: '8 min',
  xpReward: 50,
  funFact: 'Before version control, teams shared code by emailing ZIP files. Git was created in just 10 days by Linus Torvalds in 2005.',
  sections: [
    {
      type: 'intro',
      content: 'Imagine working on a document and needing to undo a change you made three weeks ago. Or needing to work on two different versions of the same file simultaneously. Version control solves all of this — and much more.'
    },
    {
      type: 'flowchart',
      content: '**The Timeline in Action**\nA visual trace of every single change you made, forever safely stored.',
      diagramSteps: [
        { label: 'Initial File\n(v1.0)', icon: '📄', color: '#ffb703' },
        { label: 'Added Header\n(v1.1)', icon: '🟢', color: '#06d6a0' },
        { label: 'Fixed Typo\n(v1.2)', icon: '🟡', color: '#118ab2' },
        { label: 'Deleted Paragraph\n(v1.3)', icon: '🔴', color: '#ff4b4b' }
      ]
    },
    {
      type: 'analogy',
      title: '📷 Think of it like a game save system',
      content: 'Version control is like a save system in a video game. You can save your progress at any point, go back to an earlier save, or even branch off to explore a different path — without losing your main storyline.'
    },
    {
      type: 'game',
      title: 'Challenge: File Chaos',
      content: 'Oh no! The developer didn\'t use Git and now the files are a mess. Can you put them in the correct chronological order to restore the project?',
      gameType: 'drag-order',
      gameData: [
        { id: '1', label: 'project_v1.zip' },
        { id: '2', label: 'project_final.zip' },
        { id: '3', label: 'project_final_v2.zip' },
        { id: '4', label: 'project_REAL_FINAL.zip' }
      ]
    },
    {
      type: 'concept',
      title: 'The three big problems it solves',
      content: '**1. History** — Every change is recorded. Who changed what, when, and why.\n\n**2. Collaboration** — Multiple people can work on the same codebase without overwriting each other.\n\n**3. Experimentation** — Create branches to try new ideas safely. A branch is an independent line of development diverging from the main codebase. You can experiment on it, then merge it back (or throw it away).'
    },
    {
      type: 'concept',
      title: '💾 The "Commit": A Snapshot in Time',
      content: 'In Git, you don\'t just save files. You create a **Commit**. A commit is a snapshot of your entire project at a specific moment. It doesn\'t just store the changes; it remembers the author, the date, and a message explaining *why* the change happened.'
    },
    {
      type: 'concept',
      title: 'Centralized vs Distributed',
      content: 'Old systems (like SVN) had one central server — if it went down, work stopped. **Git is distributed**: every developer has a full copy of the entire history. No single point of failure.'
    },
    {
      type: 'flowchart',
      content: '**Git is Distributed**',
      diagramSteps: [
        { label: 'GitHub Cloud\n(Remote)', icon: '☁️', color: '#118ab2' },
        { label: 'Alice\'s Laptop\n(Full Copy)', icon: '👩‍💻', color: '#06d6a0' },
        { label: 'Bob\'s PC\n(Full Copy)', icon: '👨‍💻', color: '#ffb703' }
      ]
    },
    {
      type: 'animation',
      title: '🧪 Manual Backups vs Git',
      content: 'Why renaming files "final_v2" is a nightmare. See how Git keeps a clean, searchable history instead.',
      animationType: 'git-vs-manual'
    },
    {
      type: 'table',
      title: '📊 Why use Version Control?',
      content: 'A comparison of workflows:',
      tableData: {
        headers: ['Feature', 'Manual Backups', 'Git Version Control'],
        rows: [
          ['**History**', 'Filenames like "v2_FINAL"', 'Cryptographic SHA hashes'],
          ['**Changes**', 'Full copies (wasteful)', 'Smart diffs (efficient)'],
          ['**Undo**', 'Hard to find right version', 'Instant one-command revert'],
          ['**Collaboration**','Impossible without ZIPs', 'Seamless branching/merging']
        ]
      }
    },
    {
      type: 'tip',
      title: '💡 Key Takeaway',
      content: 'Version control is not just for developers. Writers, designers, data scientists — anyone working with files over time benefits from it.'
    }
  ],
  quiz: [
    {
      id: 'git-1-q1',
      question: 'What is the main advantage of a distributed version control system like Git?',
      options: [
        'It requires a high-speed internet connection at all times to function',
        'Every developer has a full copy of the repository history on their machine',
        'It only allows one person to work on a specific file at any given time',
        'It automatically deploys your code to a production server after every save'
      ],
      correct: 1,
      explanation: 'In distributed systems like Git, every developer clones the full repository including all history. This means you can work offline and there\'s no single point of failure.'
    },
    {
      id: 'git-1-q2',
      question: 'Which of these problems does version control NOT solve?',
      options: [
        'Tracking who changed a specific file and at what exact time',
        'Automatically writing more efficient and bug-free code for you',
        'Allowing multiple people to collaborate on the same file simultaneously',
        'Rolling back to a previous working version if the current one breaks'
      ],
      correct: 1,
      explanation: 'Version control tracks history, enables collaboration, and allows rollbacks — but it can\'t write code for you (that\'s a different kind of tool!).'
    },
    {
      id: 'git-1-q3',
      question: 'What is a "branch" in version control?',
      options: [
        'A secondary backup copy stored on a secure remote cloud server',
        'An independent line of development diverging from the main codebase',
        'A team member\'s personal account used to access the repository',
        'A specific type of commit message used for documentation purposes'
      ],
      correct: 1,
      explanation: 'A branch is an independent line of development. You can create a branch to work on a feature or fix a bug without affecting the main codebase.'
    },
    {
      id: 'git-1-q4',
      question: 'Git was created by:',
      options: ['Jeff Bezos', 'Linus Torvalds', 'Bill Gates', 'Mark Zuckerberg'],
      correct: 1,
      explanation: 'Linus Torvalds (who also created the Linux kernel) built Git in 2005 to manage the Linux kernel\'s source code after their previous tool became unavailable.'
    },
    {
      id: 'git-1-q5',
      question: 'What does "commit" mean in Git?',
      options: [
        'The process of uploading your local files to a platform like GitHub',
        'Saving a snapshot of your changes to the repository history forever',
        'Merging two different branches together into a single unified history',
        'Downloading someone else\'s code to your local development machine'
      ],
      correct: 1,
      explanation: 'A commit is a saved snapshot of your changes. It records what changed, who changed it, and when — creating a permanent point in history you can always return to.'
    }
  ]
}
