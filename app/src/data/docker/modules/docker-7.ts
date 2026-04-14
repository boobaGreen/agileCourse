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
      title: 'Terminal: Orchestrate the Stack',
      content: 'Launch a multi-container stack with a single command.',
      gameType: 'terminal-sim',
      gameData: {
        startText: 'ubuntu@docker-host:~/my-project$ ',
        steps: [
          {
            instruction: 'Start all the services defined in your docker-compose.yml, and run them detached in the background. Type: docker-compose up -d',
            expectedCommand: 'docker-compose up -d',
            output: 'Creating network "my-project_default" with the default driver\nCreating volume "my-project_db-data" with default driver\nCreating my-project_db_1 ... done\nCreating my-project_web_1 ... done'
          },
          {
            instruction: 'Your stack is running! If you want to check the live logs from ALL services at once, type: docker-compose logs -f',
            expectedCommand: 'docker-compose logs -f',
            output: 'db_1   | PostgreSQL init process complete; ready for start up.\nweb_1  | Server listening on port 5000...\n^C'
          },
          {
            instruction: 'Now, completely destroy the stack and clean up the networks. Type: docker-compose down',
            expectedCommand: 'docker-compose down',
            output: 'Stopping my-project_web_1 ... done\nStopping my-project_db_1 ... done\nRemoving my-project_web_1 ... done\nRemoving my-project_db_1 ... done\nRemoving network my-project_default'
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-7-q1',
      question: 'What is the primary advantage of using Docker Compose over standard Docker CLI commands?',
      options: [
        'It runs containers 5x faster',
        'It allows you to declaratively define and manage multi-container applications in a single file',
        'It replaces the need for a Docker Hub account',
        'It allows Docker to run natively without virtualization'
      ],
      correct: 1,
      explanation: 'Compose translates dozens of complex CLI flags into a clean, repeatable YAML configuration file, perfect for spinning up complex dev environments instantly.'
    },
    {
      id: 'docker-7-q2',
      question: 'If you run `docker-compose down`, what happens to your Named Volumes?',
      options: [
        'They are deleted along with the containers',
        'They are uploaded to Docker Hub',
        'They are preserved safely by default',
        'They are compressed into a tarball'
      ],
      correct: 2,
      explanation: 'By default, `docker-compose down` removes containers and networks, but PRESERVES volumes to prevent accidental data loss. You must append `-v` to explicitly delete volumes.'
    }
  ]
}
