import type { Module } from '../../types'

export const docker2: Module = {
  id: 'docker-2',
  track: 'docker',
  order: 2,
  title: 'Images vs Containers',
  subtitle: 'Blueprint vs Live Instance',
  emoji: '🖼️',
  duration: '20 min',
  xpReward: 120,
  funFact: 'Docker Images are read-only. When you run one, Docker puts a tiny read-write layer on top of it. This is why you can run 10 containers from a 1GB image without using 10GB of disk space!',
  sections: [
    {
      type: 'intro',
      content: 'This is the most critical concept to master: the difference between an Image and a Container. If you understand this, everything else in Docker makes sense.'
    },
    {
      type: 'concept',
      title: '🖼️ The Image (The Blueprint)',
      content: 'An image is a **read-only** template. It contains the OS libraries, the app code, and the runtime. It doesn\'t "run" — it just sits on your disk. Think of it as a recipe in a cookbook, or an ISO file.'
    },
    {
      type: 'concept',
      title: '📦 The Container (The Running Instance)',
      content: 'A container is a **runnable instance** of an image. When you "run" an image, it becomes a container. You can have 100 isolated containers independently running from the same 1 image. Think of the container as the actual pizza baked using the recipe. Deleting a container does not affect the read-only image it was built from.'
    },
    {
      type: 'flowchart',
      content: '**One Image, Multiple Independent Containers**',
      diagramSteps: [
        { label: 'Image\n(Read-Only)', icon: '🖼️', color: '#118ab2' },
        { label: 'Container A\n(Port 80)', icon: '📦', color: '#06d6a0' },
        { label: 'Container B\n(Port 81)', icon: '📦', color: '#06d6a0' }
      ]
    },
    {
      type: 'video',
      title: '📺 Images vs Containers Visualized',
      content: 'Check out this clear explanation of how the read/write layers actually stack on top of each other.',
      videoUrl: 'https://www.youtube.com/watch?v=YFl2mCHdv24'
    },
    {
      type: 'concept',
      title: '🍰 The Layer Cake Architecture',
      content: 'Docker images are made of **layers**. Every command in a build process creates a new small layer. If you change your code but not your libraries, Docker only updates the code layer. This makes images incredibly fast to build and share over the network!'
    },
    {
      type: 'flowchart',
      content: '**Image Architecture (Layers)**',
      diagramSteps: [
        { label: 'Base OS\n(Ubuntu 50MB)', icon: '🐧', color: '#ff4b4b' },
        { label: 'Dependencies\n(Node.js 20MB)', icon: '📚', color: '#ffd166' },
        { label: 'Your App\n(index.js 2KB)', icon: '💻', color: '#06d6a0' },
        { label: 'R/W Layer\n(Container)', icon: '✏️', color: '#118ab2' }
      ]
    },
    {
      type: 'game',
      title: 'Challenge: Identify the Layer',
      content: 'Correctly identify where each element belongs in a Docker system.',
      gameType: 'drag-classify',
      gameData: {
        categories: [
          { id: 'readonly', label: 'Read-Only (The Image)' },
          { id: 'writeable', label: 'Writeable (The Container)' }
        ],
        items: [
          { id: 'os', label: 'Ubuntu OS', categoryId: 'readonly' },
          { id: 'node', label: 'Node.js Runtime', categoryId: 'readonly' },
          { id: 'code', label: 'Compiled React App', categoryId: 'readonly' },
          { id: 'logs', label: 'Runtime Server Logs', categoryId: 'writeable' },
          { id: 'temp', label: 'Temporary Cached Files', categoryId: 'writeable' }
        ]
      }
    },
    {
      type: 'game',
      title: 'Lab: Your First Container',
      content: 'Let\'s pull an image and run it. In this simulator, commands actually update the visual state of your "Docker Host".',
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [],
          containers: []
        },
        tasks: [
          { id: '1', instruction: 'Pull the official "nginx" image', condition: 'PULLED:nginx' },
          { id: '2', instruction: 'Run a detached container from the nginx image', condition: 'RUNNING:nginx' },
          { id: '3', instruction: 'Try to stop the container (docker stop [id/name])', condition: 'STOPPED:nginx' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-2-q1',
      question: 'An Image is to a Container as a...',
      options: [
        'Physical computer is to a peripheral mouse',
        'Recipe is to a baked and ready-to-eat Pizza',
        'Single file is to a nested project folder',
        'Logged-in user is to a encrypted password'
      ],
      correct: 1,
      explanation: 'An image is a static template (recipe). A container is a live, running instance of that template (pizza).'
    },
    {
      id: 'docker-2-q2',
      question: 'What happens to the underlying Image when a Container is deleted?',
      options: [
        'The image and all its layers are also deleted',
        'The image remains completely and safely unchanged',
        'The image loses its most recent read-only layer',
        'The image file size gets larger on the local disk'
      ],
      correct: 1,
      explanation: 'Images are immutable (read-only). Containers are temporary. Deleting a container safely discards its read-write layer, leaving the template image untouched.'
    },
    {
      id: 'docker-2-q3',
      question: 'If you run `docker ps` and see nothing, but `docker ps -a` shows listed containers, what does this mean?',
      options: [
        'The Docker daemon has crashed and needs a restart',
        'Your current user lacks the necessary permissions',
        'The containers have stopped or finished executing',
        'The images are still downloading in the background'
      ],
      correct: 2,
      explanation: '`docker ps` only shows running containers. `docker ps -a` (all) includes containers that have finished their run (exited), which is common if the container only ran a single command and finished.'
    }
  ]
}
