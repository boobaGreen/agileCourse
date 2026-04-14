import type { Module } from '../../types'

export const docker1: Module = {
  id: 'docker-1',
  track: 'docker',
  order: 1,
  title: 'What is a Container?',
  subtitle: 'Ships, not virtual machines',
  emoji: '🐳',
  duration: '15 min',
  xpReward: 100,
  funFact: 'The word "Docker" refers to a dock worker who loads and unloads ships. A perfect metaphor for moving software containers!',
  sections: [
    {
      type: 'intro',
      content: 'In the old days, software worked on one machine but failed on another. "It works on my machine" became the developer\'s excuse. Docker solved this by putting everything an app needs into a portable, standardized container.'
    },
    {
      type: 'video',
      title: '📺 Docker in 100 Seconds',
      content: 'A rapid, high-intensity breakdown of what Docker is and why it literally changed the entire tech industry.',
      videoUrl: 'https://www.youtube.com/watch?v=Gjnup-PuquQ'
    },
    {
      type: 'concept',
      title: '📦 Why not just use a Virtual Machine?',
      content: 'To understand containers, we must understand the old way of doing things: Virtual Machines (VMs). A VM runs a **full Guest Operating System** on top of virtualized hardware. It\'s slow to start and heavy on resources. A container, instead, shares the Host OS, making it start in milliseconds.'
    },
    {
      type: 'table',
      title: '📊 VM vs Container Comparison',
      content: 'Instead of running a full Guest OS inside a "fake computer", a Container just shares the host kernel:',
      tableData: {
        headers: ['Feature', 'Virtual Machine (VM) 🖥️', 'Container (Docker) 🐳'],
        rows: [
          ['**Architecture**', 'Hardware → Hypervisor → **Guest OS** → App', 'Hardware → Host OS → **Docker Engine** → App'],
          ['**Size**', 'Gigabytes (GBs) per machine', 'Megabytes (MBs) per container'],
          ['**Startup Time**', 'Minutes (Booting a full OS)', 'Seconds (Just starting a process)'],
          ['**Isolation**', 'Complete, hardware-level isolation', 'Process-level isolation'],
          ['**Overhead**', 'High resource consumption', 'Extremely lightweight']
        ]
      }
    },
    {
      type: 'flowchart',
      content: '**The Shipping Container Analogy**\nBefore standard containers, moving software was exactly like moving random-sized cargo. Docker standardized the shape!',
      diagramSteps: [
        { label: 'Dev Laptop\n(Messy Code)', icon: '💻', color: '#118ab2' },
        { label: 'Standard Docker Image\n(The Container)', icon: '📦', color: '#ffb703' },
        { label: 'Cloud Servers\n(The Ship)', icon: '☁️', color: '#06d6a0' },
        { label: 'Runs Exactly the Same\n(Delivery)', icon: '✅', color: '#118ab2' }
      ]
    },
    {
      type: 'video',
      title: '📺 Docker Architecture Full Breakdown',
      content: 'A fantastic visual explanation by TechWorld with Nana comparing VMs to Docker Engine.',
      videoUrl: 'https://www.youtube.com/watch?v=a1M_thDTqmU'
    },
    {
      type: 'tip',
      title: '💡 The Ultimate Takeaway',
      content: 'A container is a standardized unit of software that packages up code and all its dependencies so the application runs quickly and reliably from **any** computing environment to another.'
    }
  ],
  quiz: [
    {
      id: 'docker-1-q1',
      question: 'What is the primary architectural difference between a Container and a VM?',
      options: [
        'Containers are more secure than VMs at a hardware level',
        'Containers share the host OS kernel, while VMs include a full Guest OS',
        'VMs are faster to start than containers',
        'Containers can only run on Linux servers'
      ],
      correct: 1,
      explanation: 'Containers are lightweight because they share the host operating system kernel directly via the Docker Engine. VMs are "heavyweight" because each one boots an entirely separate OS on virtualized hardware.'
    },
    {
      id: 'docker-1-q2',
      question: 'What massive industry problem did Docker solve?',
      options: [
        'The lack of modern programming languages',
        'The "works on my machine" problem by ensuring perfect environment consistency',
        'The high cost of cloud storage solutions',
        'The inability to write functional UI code'
      ],
      correct: 1,
      explanation: 'By packaging an app together with its exact environment (libraries, config, runtime), Docker ensures it runs the exact same way on a laptop, in a testing lab, and in production.'
    },
    {
      id: 'docker-1-q3',
      question: 'Why are containers generally considered "lighter" than VMs?',
      options: [
        'They don\'t have IP addresses',
        'They don\'t include a Guest OS overhead',
        'They only run compiled languages like C++',
        'They bypass CPU and only use RAM'
      ],
      correct: 1,
      explanation: 'Because containers leverage the Host OS kernel directly, they skip the GigaBytes of bloat required to boot a separate Windows or Linux installation.'
    }
  ]
}
