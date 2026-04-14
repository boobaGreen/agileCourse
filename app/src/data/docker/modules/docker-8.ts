import type { Module } from '../../types'

export const docker8: Module = {
  id: 'docker-8',
  track: 'docker',
  order: 8,
  title: 'Hands-on Labs: Playground',
  subtitle: 'Free environments to practice safely',
  emoji: '🧪',
  duration: '45+ min',
  xpReward: 100,
  externalLink: {
    label: 'Launch Play with Docker',
    url: 'https://labs.play-with-docker.com',
    xpPrompt: 'How many labs/exercises did you successfully complete? Enter the number to earn XP!'
  },
  sections: [
    {
      type: 'intro',
      content: 'Watching videos is great, but typing the commands builds muscle memory. In this module we introduce **the best free resources** to get your hands dirty without risking your local machine.'
    },
    {
      type: 'concept',
      title: '🌐 Tool 1: Play with Docker (PWD)',
      content: '**Play with Docker** gives you a free, temporary Docker environment **right in your browser**. No installation.\n\n- Get a fresh Linux VM with Docker pre-installed\n- Create multiple instances (nodes) to simulate swarm clusters\n- Each session lasts **4 hours**\n\n🔗 **URL**: [https://labs.play-with-docker.com](https://labs.play-with-docker.com)'
    },
    {
      type: 'video',
      title: '📺 Intro to Play with Docker',
      content: 'A quick tour of how the PWD interface works safely in the browser.',
      videoUrl: 'https://www.youtube.com/watch?v=KLTT4FfiKHQ'
    },
    {
      type: 'concept',
      title: '📚 Tool 2: Docker Classroom',
      content: '**Docker Classroom** is the guided, structured version of PWD.\n\n🔗 **URL**: [https://training.play-with-docker.com](https://training.play-with-docker.com)\n\n💡 **Recommended starter labs:**\n1. "Your First Linux Containers"\n2. "Doing More With Docker Images"\n3. "Docker Networking Hands-on Lab"'
    },
    {
      type: 'tip',
      title: '🎯 Suggested Learning Path',
      content: '**Step 1**: Use the PWD sandbox to rerun the commands we covered in the Terminal simulations.\n**Step 2**: Follow the 3 Recommended Labs in Docker Classroom.\n**Step 3**: Come back here and obliterate the Final Quiz! 🏆'
    }
  ]
}
