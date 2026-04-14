import type { Module } from '../../types'

export const docker9: Module = {
  id: 'docker-9',
  track: 'docker',
  order: 9,
  title: 'Final Docker Challenge',
  subtitle: 'The Whale Master Certification',
  emoji: '🏆',
  duration: '20 min',
  xpReward: 200,
  sections: [
    {
      type: 'intro',
      content: 'Time to prove your container mastery. 10 comprehensive questions covering builds, lifecycle, volumes, networking, and compose. Take your time. Good luck!'
    }
  ],
  quiz: [
    {
      id: 'docker-9-q1',
      question: 'Which is NOT a structural benefit of Containers over VMs?',
      options: ['Lightweight filesystem', 'Fraction of a second startup time', 'Includes a completely isolated Guest OS kernel', 'High portability across clouds'],
      correct: 2,
      explanation: 'Containers explicitly DO NOT contain a Guest OS kernel; they share the Host OS kernel. That is what makes them lightweight.'
    },
    {
      id: 'docker-9-q2',
      question: 'What is the correct instruction to copy a local file named "server.js" into the "/app" directory of the image during build?',
      options: ['ADD server.js /app', 'RUN cp server.js /app', 'COPY server.js /app', 'MOVE server.js /app'],
      correct: 2,
      explanation: '`COPY` is the explicit, best-practice instruction for moving files from the host context into the image layers.'
    },
    {
      id: 'docker-9-q3',
      question: 'What happens when a container reaches the end of the script specified in its `CMD` instruction?',
      options: ['It waits for further user input', 'It gracefully exits and its status changes to "Exited"', 'It reboots continuously', 'It deletes itself entirely'],
      correct: 1,
      explanation: 'A container lives exactly as long as its main process (the CMD). Once that process concludes, the container naturally exits.'
    },
    {
      id: 'docker-9-q4',
      question: 'In a Dockerfile, why should `RUN npm install` typically be placed BEFORE `COPY . .`?',
      options: ['To bypass security checks', 'To ensure syntax errors are caught early', 'To maximize layer caching and drastically speed up future builds', 'To force npm to run as root'],
      correct: 2,
      explanation: 'Docker builds cache layer by layer. Copying only package.json and installing allows Docker to cache the heavy "node_modules" layer, bypassing the install step on future builds as long as dependencies haven\'t changed.'
    },
    {
      id: 'docker-9-q5',
      question: 'To guarantee that your PostgreSQL database doesn\'t lose records when its container crashes or updates, you MUST use:',
      options: ['Bind mounts on /var/log', 'Named Volumes or explicit Host Bind Mounts', 'A larger Docker Image', 'Redis Caching'],
      correct: 1,
      explanation: 'Without external mounts, data is written to the ephemeral container layer. Volumes ensure data physically resides on the host machine and outlives the container.'
    },
    {
      id: 'docker-9-q6',
      question: 'If you want to expose a Python Flask app running on port 5000 inside a container to your laptop\'s port 80, what flag do you use?',
      options: ['-p 5000:80', '-p 80:5000', '-e PORT=80', '-expose 80:5000'],
      correct: 1,
      explanation: 'The mapping syntax is always `host_port:container_port`. So `-p 80:5000`.'
    },
    {
      id: 'docker-9-q7',
      question: 'In Docker Compose, what does `depends_on` parameter achieve?',
      options: ['It guarantees the app won\'t crash', 'It delays the start of a service until its dependencies have successfully started', 'It installs node modules automatically', 'It mounts dependent volumes'],
      correct: 1,
      explanation: 'It controls the absolute startup order. If `web` depends on `db`, compose starts `db` first.'
    },
    {
      id: 'docker-9-q8',
      question: 'How do you force Docker to rebuild an image, ignoring the cached layers?',
      options: ['docker build --no-cache', 'docker build --force', 'docker build --clean', 'docker rebuild'],
      correct: 0,
      explanation: '`--no-cache` forces Docker Engine to execute every single instruction in the Dockerfile from scratch.'
    },
    {
      id: 'docker-9-q9',
      question: 'Which command cleanly removes all containers, networks, and images created by `docker-compose up` (without touching volumes)?',
      options: ['docker-compose stop', 'docker-compose kill', 'docker-compose clean', 'docker-compose down'],
      correct: 3,
      explanation: '`down` is the clean teardown command, destroying the ephemeral containers and networks while preserving volume data.'
    },
    {
      id: 'docker-9-q10',
      question: 'What is the danger of using the `latest` tag in `docker run ubuntu:latest` for a production critical application?',
      options: ['It violates GPL licensing', 'It disables volume mounts', 'It is non-deterministic; the underlying image it points to can unexpectedly change causing breaking bugs', 'It is a deprecated command syntax'],
      correct: 2,
      explanation: 'Pinning to specific versions (like `ubuntu:22.04`) ensures immutability. `latest` is a moving target.'
    }
  ]
}
