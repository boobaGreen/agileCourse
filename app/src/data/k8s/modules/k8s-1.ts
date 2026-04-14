import type { Module } from '../../types'

export const k8s1: Module = {
  id: 'k8s-1',
  track: 'k8s',
  order: 1,
  title: 'The Need for Orchestration',
  subtitle: 'Managing thousands of containers',
  emoji: '🚢',
  duration: '15 min',
  xpReward: 100,
  funFact: 'Kubernetes is often abbreviated as "K8s" because there are exactly 8 letters between the "K" and the "s" in "Kubernetes".',
  sections: [
    {
      type: 'intro',
      content: 'Docker is fantastic for running a few containers. But what happens when you have millions of users, and you need to run 5,000 containers across 50 different servers? How do they talk to each other? What if a server catches fire? You need an orchestrator.'
    },
    {
      type: 'video',
      title: '📺 Kubernetes in 5 Minutes',
      content: 'A brilliant, high-level animated breakdown of exactly what problem Kubernetes solves in modern architecture.',
      videoUrl: 'https://www.youtube.com/watch?v=PH-2FfFD2PU'
    },
    {
      type: 'concept',
      title: '🎯 The Orchestrator\'s Job',
      content: 'Kubernetes does not run containers itself. It manages the tools (like Docker or containerd) that do.\n\nImagine a symphony orchestra: the musicians (containers) make the actual sound, but the **Conductor** (Kubernetes) tells them when to play, how loud to play, and replaces them if they fall asleep.'
    },
    {
      type: 'flowchart',
      content: '**Life Without vs With Kubernetes**',
      diagramSteps: [
        { label: 'Server Dies\n(Plain Docker)', icon: '🔥', color: '#ff4b4b' },
        { label: 'Site Goes Down!\n(Downtime)', icon: '💀', color: '#ff4b4b' },
        { label: 'Server Dies\n(Kubernetes)', icon: '🔥', color: '#ffb703' },
        { label: 'Auto-Restarts\non New Server', icon: '✨', color: '#06d6a0' }
      ]
    },
    {
      type: 'table',
      title: '⚖️ Core Features of K8s',
      content: 'Why does every modern enterprise use it?',
      tableData: {
        headers: ['Feature', 'What it means practically'],
        rows: [
          ['**Self-healing**', 'Restarts containers that fail, replaces containers when nodes die.'],
          ['**Auto-scaling**', 'Spins up more containers during Black Friday traffic, shuts them down at night.'],
          ['**Load Balancing**', 'Distributes incoming network traffic evenly across your containers.'],
          ['**Rollouts & Rollbacks**', 'Updates your app bit by bit, pausing and reverting if a bug is detected!']
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-1-q1',
      question: 'Which of the following is NOT a core responsibility of Kubernetes?',
      options: [
        'Load balancing incoming traffic across multiple containers',
        'Writing and compiling your application source code',
        'Restarting failed containers automatically',
        'Scaling the number of running containers up and down'
      ],
      correct: 1,
      explanation: 'Kubernetes is purely an orchestration engine. It does not compile code or build images. It relies on CI/CD pipelines and tools like Docker for that.'
    },
    {
      id: 'k8s-1-q2',
      question: 'What happens in a Kubernetes cluster if a physical server (node) suddenly loses power?',
      options: [
        'The entire cluster goes completely offline',
        'An administrator must write a YAML file to buy a new server',
        'Kubernetes detects the dead node and automatically schedules its containers onto healthy surviving nodes',
        'The containers on that server are permanently deleted along with their data'
      ],
      correct: 2,
      explanation: 'This is the "Self-healing" mechanism. The Control Plane notices the worker is dead and immediately asks other workers to spin up replacement containers.'
    }
  ]
}
