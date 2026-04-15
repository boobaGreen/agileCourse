import type { Module } from '../../types'

export const docker4: Module = {
  id: 'docker-4',
  track: 'docker',
  order: 4,
  title: 'Docker Hub & Registries',
  subtitle: 'The App Store for Containers',
  emoji: '🗄️',
  duration: '15 min',
  xpReward: 80,
  sections: [
    {
      type: 'intro',
      content: 'You don\'t have to build everything yourself. **Docker Hub** is the central public registry where millions of pre-built images live. From basic Linux distributions to giant databases, it\'s the App Store for developers.'
    },
    {
      type: 'concept',
      title: '🏠 Public vs Private Registries',
      content: 'Docker Hub is the default, public registry. But companies usually use **Private Registries** (like AWS ECR, Google GCR, or GitHub Container Registry) to keep their proprietary app images safe and secret.'
    },
    {
      type: 'video',
      title: '📺 Sharing Docker Images',
      content: 'Learn how to pull, tag, and push images to registries like a professional.',
      videoUrl: 'https://www.youtube.com/watch?v=mAzHELZWE-Y'
    },
    {
      type: 'table',
      title: '🏷️ Image Tags & Best Practices',
      content: 'Versioning your images is absolutely crucial for stability. The suffix after the colon `:` is the tag.',
      tableData: {
        headers: ['Tag Strategy', 'Example', 'When to use', 'Risk Level'],
        rows: [
          ['**Exact Semantic**', '`node:18.17.0`', 'Production environments & CI/CD', '🟢 Lowest'],
          ['**Minor Version**', '`node:18`', 'Development, accepting small updates', '🟡 Medium'],
          ['**Latest**', '`node:latest`', 'Trying things quickly locally', '🔴 High (Never in Prod)']
        ]
      }
    },
    {
      type: 'flowchart',
      content: '**The Push & Pull Cycle**',
      diagramSteps: [
        { label: 'Developer Laptop\n(docker push)', icon: '💻', color: '#ffb703' },
        { label: 'Docker Hub\n(The Cloud Registry)', icon: '☁️', color: '#118ab2' },
        { label: 'Prod Server\n(docker pull)', icon: '🖥️', color: '#06d6a0' }
      ]
    },
    {
      type: 'game',
      title: 'Lab: Publish to the World',
      content: 'In this simulator, you will prepare an image for the cloud. Tag your local image and "push" it to simulate a registry upload.',
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-app', name: 'myapp', tag: 'v1', size: '180MB' }],
          containers: []
        },
        tasks: [
          { id: '1', instruction: 'Tag "myapp:v1" as "devguru/myapp:v1" (use `docker tag myapp:v1 devguru/myapp:v1`)', condition: 'PULLED:devguru/myapp' },
          { id: '2', instruction: 'Push the new tagged image to Docker Hub (use `docker push devguru/myapp:v1`)', condition: 'PULLED:devguru/myapp' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-4-q1',
      question: 'Why is using the `:latest` tag in a production deployment considered dangerous?',
      options: [
        'It costs more money to use the latest tag',
        'It is a mutable tag; it can point to a completely different, breaking version tomorrow',
        'The latest tag disables Docker\'s security sandbox',
        'The latest tag bypasses cache and takes hours to pull'
      ],
      correct: 1,
      explanation: '`:latest` simply points to whatever image was most recently uploaded. An update could introduce a breaking change overnight. Pinning exact versions (like `:1.14.2`) makes your deployments predictable.'
    },
    {
      id: 'docker-4-q2',
      question: 'What command prepares a local image to be pushed to a specific remote organization or user account?',
      options: ['docker push', 'docker rename', 'docker tag', 'docker commit'],
      correct: 2,
      explanation: 'You use `docker tag local_image user_name/repo_name:tag` to correctly label the image so the Docker Engine knows exactly where to route the upload.'
    }
  ]
}
