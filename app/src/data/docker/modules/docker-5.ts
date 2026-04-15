import type { Module } from '../../types'

export const docker5: Module = {
  id: 'docker-5',
  track: 'docker',
  order: 5,
  title: 'Volumes & Persistence',
  subtitle: 'Where does the database data go?',
  emoji: '💾',
  duration: '20 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: 'Containers are meant to be **ephemeral** (temporary). If you delete a database container, everything on its internal disk is wiped out. To save our actual user data, we must bridge the gap to the Host machine\'s physical disk.'
    },
    {
      type: 'concept',
      title: '🧱 The Problem: The Writable Layer',
      content: 'When a container writes a file to its own disk, that file exists in a temporary "writable layer". If the container is destroyed, or crashes, the layer is destroyed.'
    },
    {
      type: 'flowchart',
      content: '**Ephemeral Data (Dangerous ❌)**',
      diagramSteps: [
        { label: 'PostgreSQL\n(Running Container)', icon: '🐘', color: '#ffb703' },
        { label: 'Writes to\nContainer Disk', icon: '📝', color: '#ff4b4b' },
        { label: 'Container Demolished\n(docker rm)', icon: '💥', color: '#ff4b4b' },
        { label: 'Data is\nGone Forever!', icon: '💀', color: '#000000' }
      ]
    },
    {
      type: 'video',
      title: '📺 Docker Volumes Masterclass',
      content: 'A deep dive into how data permanence works in Docker environments.',
      videoUrl: 'https://www.youtube.com/watch?v=p2PH_YPCsis'
    },
    {
      type: 'concept',
      title: '🔗 The Solution: Bind Mounts & Named Volumes',
      content: 'We solve this by "mounting" folders.\n\n**1. Bind Mounts**: You map a specific path from your laptop (e.g. `/Users/claudio/code`) straight into the container. Great for live-reloading code during development.\n\n**2. Named Volumes**: You let Docker manage a secure, hidden folder on the host disk. The best choice for Database data persistence.'
    },
    {
      type: 'table',
      title: '⚖️ Bind Mounts vs Named Volumes',
      content: 'Understanding when to use which type of storage:',
      tableData: {
        headers: ['Feature', 'Bind Mount 📂', 'Named Volume 🗃️'],
        rows: [
          ['**Managed By**', 'The User (You)', 'Docker'],
          ['**Host Location**', 'Specific path (e.g. `./src`)', 'Hidden Docker storage area'],
          ['**Best Use Case**', 'Sharing source code for live-reloading', 'Storing Database data securely'],
          ['**Syntax Example**', '`-v $(pwd)/src:/app/src`', '`-v postgres-data:/var/lib/postgresql/data`']
        ]
      }
    },
    {
      type: 'game',
      title: 'Lab: The Immortal Volume',
      content: 'In this lab, you will create a managed volume and connect it to a database. If the container dies, the volume remains!',
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-pg', name: 'postgres', tag: 'latest', size: '250MB' }],
          containers: [],
          volumes: []
        },
        tasks: [
          { id: '1', instruction: 'Create a named volume called "dbstore": `docker volume create dbstore`', condition: 'VOLUME_EXISTS:dbstore' },
          { id: '2', instruction: 'Run a postgres container using that volume: `docker run -d -v dbstore:/var/lib/postgresql/data postgres`', condition: 'CONTAINER_RUNNING:postgres' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-5-q1',
      question: 'What occurs to data saved inside a container\'s writable layer when the container is executing `docker rm`?',
      options: [
        'It is backed up to Docker Hub',
        'It is permanently deleted',
        'It is automatically converted to a Named Volume',
        'Nothing, it remains on the hard drive'
      ],
      correct: 1,
      explanation: 'The writable layer is deeply tied to the lifecycle of the container instance. When the container goes, the layer (and all its data) vanishes.'
    },
    {
      id: 'docker-5-q2',
      question: 'For a production MySQL database running in Docker, which storage method is strongly recommended?',
      options: [
        'Bind Mounts',
        'The default Writable Layer',
        'Named Volumes',
        'In-memory RAM allocation'
      ],
      correct: 2,
      explanation: 'Named Volumes are managed entirely by Docker, circumventing host OS file permission issues and providing the safest, most performant way to store persistent database information.'
    }
  ]
}
