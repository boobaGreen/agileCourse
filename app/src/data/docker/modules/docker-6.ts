import type { Module } from '../../types'

export const docker6: Module = {
  id: 'docker-6',
  track: 'docker',
  order: 6,
  title: 'Networking & Ports',
  subtitle: 'Bridging containers to the outside world',
  emoji: '🔌',
  duration: '20 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: 'A container running a brilliantly crafted web server is useless if nobody can reach it. We need to bridge the isolation gap between the container\'s internal network, and our computer\'s local network.'
    },
    {
      type: 'video',
      title: '📺 Port Mapping Explained',
      content: 'Understand how host port forwarding routes traffic directly into your isolated containers.',
      videoUrl: 'https://www.youtube.com/watch?v=bKFMS5C4CG0'
    },
    {
      type: 'concept',
      title: '🚪 Port Mapping (`-p`)',
      content: 'By default, a container exposes no ports to the public. To view a React app running on port 3000 inside a container, we must **bind** it to a port on our laptop.\n\nSyntax: `-p [HOST_PORT]:[CONTAINER_PORT]`\n\nThe `HOST_PORT` is what you type in your browser (e.g., `localhost:8080`).'
    },
    {
      type: 'flowchart',
      content: '**How Port Mapping Works (`-p 8080:80`)**',
      diagramSteps: [
        { label: 'Browser User\n(localhost:8080)', icon: '🌍', color: '#118ab2' },
        { label: 'Host Port Tracker\n(Docker Daemon)', icon: '🚪', color: '#ffb703' },
        { label: 'Container Port 80\n(Nginx web server)', icon: '📦', color: '#06d6a0' }
      ]
    },
    {
      type: 'concept',
      title: '🌐 Docker User-Defined Networks',
      content: 'What if a Web Container needs to talk to a Database Container? They shouldn\'t go over the public internet! \n\nDocker can create virtual internal networks. When containers join the same network, they can securely talk to each other **using their container names** as hostnames (e.g., `http://my-db:5432`). This is built-in DNS!'
    },
    {
      type: 'game',
      title: 'Terminal: Bridge the Gap',
      content: 'Expose an internal NGINX server to your computer.',
      gameType: 'terminal-sim',
      gameData: {
        startText: 'ubuntu@docker-host:~$ ',
        steps: [
          {
            instruction: 'Run an nginx container in the background, mapping your laptop\'s port 8080 to the container\'s internal port 80. Type: docker run -d -p 8080:80 nginx',
            expectedCommand: 'docker run -d -p 8080:80 nginx',
            output: 'bf4d9a...'
          },
          {
            instruction: 'Now curl localhost on your laptop port to see if the web server responds. Type: curl localhost:8080',
            expectedCommand: 'curl localhost:8080',
            output: '<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome to nginx!</title>\n...\n</html>'
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-6-q1',
      question: 'If you execute `docker run -p 5000:3000 app`, into which browser URL would you type to view the app?',
      options: ['localhost:3000', 'localhost:5000', 'app:3000', 'docker:5000:3000'],
      correct: 1,
      explanation: 'The mapping syntax is `host_port:container_port`. Since the host port is 5000, that is the entry door available to your browser.'
    },
    {
      id: 'docker-6-q2',
      question: 'How do two containers on the same custom Docker network communicate with each other?',
      options: [
        'Using the host\'s IP address',
        'Using port mapping on localhost',
        'Using their container names as DNS hostnames',
        'They cannot communicate directly for security reasons'
      ],
      correct: 2,
      explanation: 'Docker provides built-in DNS resolution for custom bridge networks. If a container is named "redis", another container on the same network can reach it simply by pinging "redis".'
    }
  ]
}
