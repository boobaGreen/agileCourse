import type { Module } from '../../types'

export const docker3: Module = {
  id: 'docker-3',
  track: 'docker',
  order: 3,
  title: 'The Dockerfile',
  subtitle: 'Building your own custom images',
  emoji: '📝',
  duration: '25 min',
  xpReward: 150,
  sections: [
    {
      type: 'intro',
      content: 'You won\'t always rely on predefined images. To create an environment specifically for your app, you write a **Dockerfile** — a simple, standardized text document containing all the commands a user could call on the command line to assemble an image.'
    },
    {
      type: 'video',
      title: '📺 Writing a Dockerfile from Scratch',
      content: 'A perfect 12-minute breakdown on how to construct a Dockerfile and minimize its final size.',
      videoUrl: 'https://www.youtube.com/watch?v=WmcdMiyqfZs'
    },
    {
      type: 'game',
      title: 'Challenge: The Dockerfile Builder',
      content: 'Order the instructions logically to create a functional Node.js backend Dockerfile (from absolute base to final execution).',
      gameType: 'drag-order',
      gameData: [
        { id: '1', label: 'FROM node:18-alpine' },
        { id: '2', label: 'WORKDIR /app' },
        { id: '3', label: 'COPY package.json ./' },
        { id: '4', label: 'RUN npm install' },
        { id: '5', label: 'COPY . .' },
        { id: '6', label: 'CMD ["node", "server.js"]' }
      ]
    },
    {
      type: 'table',
      title: '🛠️ Core Instructions Reference',
      content: 'Memorize these five. They cover 90% of your Dockerfile needs:',
      tableData: {
        headers: ['Instruction', 'Purpose', 'When does it execute?'],
        rows: [
          ['**FROM**', 'Defines the base OS image to start from', 'Build Phase (Step 1)'],
          ['**WORKDIR**', 'Sets the active directory inside the container', 'Build Phase'],
          ['**COPY**', 'Copies files from your laptop into the image', 'Build Phase'],
          ['**RUN**', 'Executes shell commands (like `apt install` or `npm install`)', 'Build Phase (Creates a layer)'],
          ['**CMD**', 'Defines the default command that runs when the **container starts**', 'Runtime Phase (Once only)']
        ]
      }
    },
    {
      type: 'concept',
      title: '⚡ Layers & Caching',
      content: 'Docker caches each step. If you change a file, Docker rebuilds from that layer down. If you need a completely fresh build without using old cached layers, use the **`--no-cache`** flag:\n\n`docker build --no-cache -t my-app .`'
    },
    {
       type: 'concept',
       title: '🛑 The Container Lifecycle',
       content: 'A container is designed to run a specific task. **When the process defined in CMD finishes, the container exits automatically.** For example, a container running `echo hello` will exit immediately after printing, while a web server will keep running as long as the server process is alive.'
    },
    {
      type: 'concept',
      title: '⚡ Understanding the Build Cache',
      content: 'Docker builds images sequentially. To speed things up, it **caches** each layer. If you change a line of code, Docker tries to reuse the cache. **However**, if a layer is invalidated (e.g., a file changed in `COPY`), ALL subsequent layers are completely rebuilt.\n\nThis is why we `COPY package.json` and `RUN npm install` **BEFORE** we `COPY . .` (the rest of the code). We don\'t want to reinstall 500MB of Node modules just because we changed a typo in `index.html`!'
    },
    {
      type: 'game',
      title: 'Lab: Build Your Custom Image',
      content: 'In this simulator, you will actually build a custom image from a Dockerfile. Watch the "Image Registry" update as you tag your work.',
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-node', name: 'node', tag: '18-alpine', size: '160MB' }],
          containers: []
        },
        tasks: [
          { id: '1', instruction: 'Build the current directory and tag it as "myapp:v1" (use `docker build -t myapp:v1 .`)', condition: 'PULLED:myapp' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-3-q1',
      question: 'What is the critical difference between the RUN and CMD instructions?',
      options: [
        'There is no functional or technical difference between these two instructions',
        'RUN executes during image creation, CMD defines the default runtime executable',
        'RUN is used for downloading base images, CMD is used for pushing them to registry',
        'RUN is specifically for Windows containers, CMD is for Linux based containers'
      ],
      correct: 1,
      explanation: '`RUN` runs during the `docker build` phase and bakes files into the image layers. `CMD` runs nothing during build; it simply tells the container what command to launch when someone calls `docker run`.'
    },
    {
      id: 'docker-3-q2',
      question: 'Why do sophisticated Dockerfiles separate `COPY package.json` from `COPY .` (the rest of the code)?',
      options: [
        'Because the Docker engine cannot handle copying large folders in a single step',
        'To optimize the layer cache so dependencies aren\'t re-installed every time code changes',
        'To ensure that potentially malicious or hidden files aren\'t copied into the layer',
        'Because the package.json file must be explicitly executed as a build script'
      ],
      correct: 1,
      explanation: 'If `COPY . .` happens before `RUN npm install`, then ANY tiny code change invalidates the cache for the heavy install step, making builds incredibly slow. By copying package.json first, Docker caches the heavy install unless the dependencies actually change.'
    },
    {
      id: 'docker-3-q3',
      question: 'Which flag is used in `docker build` to assign a human-readable name to an image?',
      options: ['-n (name)', '-name (full)', '--tag (label)', '-t (tag)'],
      correct: 3,
      explanation: 'The `-t` (or `--tag`) flag assigns a repository name and an optional tag (e.g. `docker build -t my-app:latest`).'
    }
  ]
}
