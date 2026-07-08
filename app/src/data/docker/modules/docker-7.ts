import type { Module } from '../../types'

export const docker7: Module = {
  id: 'docker-7',
  track: 'docker',
  order: 7,
  title: 'Docker Compose',
  subtitle: 'YAML orchestration for multi-container apps',
  emoji: '🐙',
  duration: '25 min',
  xpReward: 150,
  sections: [
    {
      type: 'intro',
      content: 'Real applications aren\'t just one container. They are a Database, a Redis cache, a Backend API, and a Frontend. Managing a dozen `docker run` commands manually is a nightmare. Enter **Docker Compose**.'
    },
    {
      type: 'video',
      title: '📺 Docker Compose Explained',
      content: 'See exactly how to transition from painful CLI commands to elegant, declarative YAML files.',
      videoUrl: 'https://www.youtube.com/watch?v=hP77Rua1E0c'
    },
    {
      type: 'table',
      title: '📝 The docker-compose.yml Syntax',
      content: 'Compose uses a YAML file to configure services. It\'s essentially a translated list of docker CLI flags.',
      tableData: {
        headers: ['YAML Property', 'CLI Equivalent', 'Example'],
        rows: [
          ['`image:`', '`docker run <image>`', '`image: postgres:15`'],
          ['`build:`', '`docker build ...`', '`build: ./frontend`'],
          ['`ports:`', '`-p 5000:80`', '`ports:\n  - "5000:80"`'],
          ['`volumes:`', '`-v db-data:/var/lib`', '`volumes:\n  - db-data:/var`'],
          ['`environment:`', '`-e NODE_ENV=prod`', '`environment:\n  - NODE_ENV=prod`']
        ]
      }
    },
    {
      type: 'code',
      title: 'Example: A Full Stack in One File',
      content: 'This single file spins up a backend server AND a postgres database, links them on a network, and creates a volume.',
      code: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      - DB_URL=postgresql://postgres@db:5432/mydb
  db:
    image: postgres:15
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`,
      language: 'yaml'
    },
    {
      type: 'table',
      title: '⚖️ Compose Lifecycle: stop vs down',
      content: 'These commands look similar but act very differently:',
      tableData: {
        headers: ['Command', 'What it does', 'Containers', 'Networks', 'Volumes'],
        rows: [
          ['**stop**', 'Gracefully stops services', '🟡 Kept (stopped)', '✅ Kept', '✅ Kept'],
          ['**down**', 'Stops AND removes services', '❌ Removed', '❌ Removed', '✅ Kept (unless `-v`)']
        ]
      }
    },
    {
      type: 'game',
      title: 'Lab: Orchestrate the Stack',
      content: 'In this simulation, you will launch a multi-container stack defined in a YAML file. Watch how Docker Compose handles the complexity for you!',
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-myapp', name: 'myapp', tag: 'latest', size: '150MB' }],
          containers: [],
          volumes: [],
          networks: []
        },
        tasks: [
          { id: '1', instruction: 'Start the entire stack in detached mode: `docker-compose up -d`', condition: 'CONTAINER_RUNNING:web' },
          { id: '2', instruction: 'Stop and remove everything in the stack: `docker-compose down`', condition: 'CONTAINER_RUNNING:0' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-7-q1',
      question: {
        en: 'What is the primary advantage of using Docker Compose over standard Docker CLI commands?',
        it: 'Qual è il vantaggio principale dell\'utilizzo di Docker Compose rispetto ai comandi standard della CLI di Docker?'
      },
      options: [
        {
          en: 'It runs containers 5x faster',
          it: 'Esegue i container 5 volte più velocemente'
        },
        {
          en: 'It allows you to declaratively define and manage multi-container applications in a single file',
          it: 'Consente di definire e gestire in modo dichiarativo applicazioni multi-container in un unico file'
        },
        {
          en: 'It replaces the need for a Docker Hub account',
          it: 'Sostituisce la necessità di un account Docker Hub'
        },
        {
          en: 'It allows Docker to run natively without virtualization',
          it: 'Consente a Docker di funzionare in modo nativo senza virtualizzazione'
        }
      ],
      correct: 1,
      explanation: {
        en: 'Compose translates dozens of complex CLI flags into a clean, repeatable YAML configuration file, perfect for spinning up complex dev environments instantly.',
        it: 'Compose traduce dozzine di flag CLI complessi in un file di configurazione YAML pulito e ripetibile, perfetto per avviare istantaneamente ambienti di sviluppo complessi.'
      }
    },
    {
      id: 'docker-7-q2',
      question: {
        en: 'If you run `docker-compose down`, what happens to your Named Volumes?',
        it: 'Se esegui `docker-compose down`, cosa succede ai tuoi Named Volumes?'
      },
      options: [
        {
          en: 'They are deleted along with the containers',
          it: 'Vengono eliminati insieme ai container'
        },
        {
          en: 'They are uploaded to Docker Hub',
          it: 'Vengono caricati su Docker Hub'
        },
        {
          en: 'They are preserved safely by default',
          it: 'Vengono conservati in sicurezza per impostazione predefinita'
        },
        {
          en: 'They are compressed into a tarball',
          it: 'Vengono compressi in un file tarball'
        }
      ],
      correct: 2,
      explanation: {
        en: 'By default, `docker-compose down` removes containers and networks, but PRESERVES volumes to prevent accidental data loss. You must append `-v` to explicitly delete volumes.',
        it: 'Per impostazione predefinita, `docker-compose down` rimuove i container e le reti, ma PRESERVA i volumi per evitare la perdita accidentale di dati. È necessario aggiungere `-v` per eliminare esplicitamente i volumi.'
      }
    }
  ]
}
