import type { Module } from '../../types'

export const git2: Module = {
  id: 'git-2',
  track: 'git',
  order: 2,
  title: 'The Name & Origin Story',
  subtitle: 'Why Linus named it something rude on purpose',
  emoji: '🎭',
  duration: '5 min',
  xpReward: 50,
  funFact: 'Linus Torvalds famously said: "I\'m an egotistical bastard, and I name all my projects after myself. First Linux, now Git."',
  sections: [
    {
      type: 'intro',
      content: 'Every great tool has a story. Git\'s story starts with frustration, a tight deadline, and a creator with a very particular sense of humor.'
    },
    {
      type: 'concept',
      title: '🇬🇧 The British slang meaning',
      content: '"Git" is a British slang term for a silly, incompetent, or annoying person — think of it as a mild insult. Linus Torvalds chose the name **with full irony**, either referring to himself or, depending on his mood, to the tool\'s users.'
    },
    {
      type: 'concept',
      title: '⚡ Born in 10 days',
      content: 'In 2005, the Linux kernel team lost access to BitKeeper, the proprietary tool they had been using. Linus sat down and **wrote the first version of Git in just 10 days**. By day 10 it was already managing the Linux kernel\'s source code.'
    },
    {
      type: 'concept',
      title: '🔴 The logo: a graph in disguise',
      content: 'The Git logo — a red/orange geometric shape — represents a **graph with nodes and connections**, directly referencing Git\'s underlying data structure. Every commit is a node; every line is a relationship between versions. It\'s math made beautiful.'
    },
    {
      type: 'analogy',
      title: '🌐 A decentralized internet of code',
      content: 'Think of Git\'s distributed model like the internet itself: no central authority, every node independent, but all connected. Just like the internet was designed to survive failures, Git was designed so no single server failure can stop your team.'
    },
    {
      type: 'video',
      title: '🎬 Recommended: Git Explained in 100 Seconds',
      content: 'A quick, entertaining visual overview of Git and its core ideas — perfect as a complement to this module.',
      videoUrl: 'https://www.youtube.com/watch?v=hwP7WQkmECE'
    },
    {
      type: 'tip',
      title: '🚀 The platforms it enabled',
      content: 'Git\'s creation led directly to the birth of **GitHub** (2008), **GitLab** (2011), and **Bitbucket** — platforms that transformed how the world builds software together.'
    },
    {
      type: 'flowchart',
      content: '**Git: A History of Domination**',
      diagramSteps: [
        { label: '2005\n(Git Born)', icon: '⚡', color: '#ff4b4b' },
        { label: '2008\n(GitHub Born)', icon: '🐙', color: '#118ab2' },
        { label: '2011\n(GitLab)', icon: '🦊', color: '#ffb703' },
        { label: 'Today\n(The Standard)', icon: '🌍', color: '#06d6a0' }
      ]
    }
  ],
  quiz: [
    {
      id: 'git-2-q1',
      question: 'What does "git" mean in British slang?',
      options: [
        'A type of repository',
        'A silly or annoying person',
        'A version control command',
        'A branch strategy'
      ],
      correct: 1,
      explanation: 'In British slang, "git" means a silly, incompetent, or annoying person. Linus chose it with irony.'
    },
    {
      id: 'git-2-q2',
      question: 'How long did it take Linus Torvalds to write the first working version of Git?',
      options: ['6 months', '2 years', '10 days', '3 weeks'],
      correct: 2,
      explanation: 'Linus wrote the first functional version of Git in just 10 days in 2005, and it immediately started managing the Linux kernel.'
    },
    {
      id: 'git-2-q3',
      question: 'Why did Linus Torvalds create Git?',
      options: [
        'To compete with GitHub',
        'Because the Linux team lost access to their previous version control tool (BitKeeper)',
        'As a university project',
        'To replace email as a file-sharing method'
      ],
      correct: 1,
      explanation: 'The Linux kernel team had been using BitKeeper for free, but that arrangement ended in 2005. Linus created Git as a replacement.'
    },
    {
      id: 'git-2-q4',
      question: 'What does the Git logo represent?',
      options: [
        'A tree of files',
        'A graph of nodes and connections (like commits and branches)',
        'The letter G',
        'A network of servers'
      ],
      correct: 1,
      explanation: 'The geometric Git logo represents a graph — Git\'s actual internal data structure. Nodes are commits, lines are the relationships between them.'
    },
    {
      id: 'git-2-q5',
      question: 'Unlike older version control systems that store file changes as a list of "diffs", Git stores your data as:',
      options: [
        'A series of text instructions',
        'A stream of snapshots (mini-filesystems)',
        'A collection of ZIP files',
        'A spreadsheet of changes'
      ],
      correct: 1,
      explanation: 'Git thinks of its data more like a series of snapshots of a miniature filesystem. Every time you commit, Git takes a picture of what all your files look like at that moment.'
    }
  ]
}
