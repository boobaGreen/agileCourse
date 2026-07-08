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
      question: {
        en: 'Why is using the `:latest` tag in a production deployment considered dangerous?',
        it: 'Perché l\'uso del tag `:latest` in un deployment di produzione è considerato pericoloso?'
      },
      options: [
        {
          en: 'It costs more money to use the latest tag',
          it: 'Costa più denaro utilizzare il tag latest'
        },
        {
          en: 'It is a mutable tag; it can point to a completely different, breaking version tomorrow',
          it: 'È un tag mutabile; domani potrebbe puntare a una versione completamente diversa e distruttiva'
        },
        {
          en: 'The latest tag disables Docker\'s security sandbox',
          it: 'Il tag latest disabilita la sandbox di sicurezza di Docker'
        },
        {
          en: 'The latest tag bypasses cache and takes hours to pull',
          it: 'Il tag latest ignora la cache e richiede ore per il caricamento'
        }
      ],
      correct: 1,
      explanation: {
        en: '`:latest` simply points to whatever image was most recently uploaded. An update could introduce a breaking change overnight. Pinning exact versions (like `:1.14.2`) makes your deployments predictable.',
        it: '`:latest` punta semplicemente a qualsiasi immagine sia stata caricata più di recente. Un aggiornamento potrebbe introdurre una breaking change da un giorno all\'altro. Fissare versioni esatte (come `:1.14.2`) rende i deployment prevedibili.'
      }
    },
    {
      id: 'docker-4-q2',
      question: {
        en: 'What command prepares a local image to be pushed to a specific remote organization or user account?',
        it: 'Quale comando prepara un\'immagine locale per essere caricata su uno specifico account utente o organizzazione remota?'
      },
      options: [
        {
          en: 'docker push',
          it: 'docker push'
        },
        {
          en: 'docker rename',
          it: 'docker rename'
        },
        {
          en: 'docker tag',
          it: 'docker tag'
        },
        {
          en: 'docker commit',
          it: 'docker commit'
        }
      ],
      correct: 2,
      explanation: {
        en: 'You use `docker tag local_image user_name/repo_name:tag` to correctly label the image so the Docker Engine knows exactly where to route the upload.',
        it: 'Si usa `docker tag immagine_locale nome_utente/nome_repo:tag` per etichettare correttamente l\'immagine in modo che il Docker Engine sappia esattamente dove indirizzare il caricamento.'
      }
    }
  ]
}
