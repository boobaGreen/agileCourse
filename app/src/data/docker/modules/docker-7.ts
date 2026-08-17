import type { Module } from '../../types'

export const docker7: Module = {
  id: 'docker-7',
  track: 'docker',
  order: 7,
  title: {
    en: 'Docker Compose',
    it: 'Docker Compose'
  },
  subtitle: {
    en: 'YAML orchestration for multi-container apps',
    it: 'Orchestrazione YAML per applicazioni multi-container'
  },
  emoji: '🐙',
  duration: '20 min',
  xpReward: 150,
  sections: [
    {
      type: 'intro',
      content: {
        en: 'Real applications aren\'t just one isolated container. They are a Database, a Redis cache, a Backend API, and a Frontend. Managing a dozen manual `docker run` commands with ports, volumes, and networks is a nightmare. Enter **Docker Compose**.',
        it: 'Le applicazioni reali non sono composte da un singolo container isolato. Richiedono un Database, una cache Redis, un\'API Backend e un Frontend. Gestire dozzine di comandi manuali `docker run` con porte, volumi e reti è un incubo. Per questo esiste **Docker Compose**.'
      }
    },
    {
      type: 'video',
      title: {
        en: '📺 Docker Compose in 6 Minutes',
        it: '📺 Docker Compose in 6 Minuti'
      },
      content: {
        en: 'See exactly how to transition from tedious CLI commands to an elegant, declarative YAML configuration file.',
        it: 'Scopri esattamente come passare da comandi CLI sparsi a un unico file di configurazione YAML dichiarativo ed elegante.'
      },
      videoUrl: 'https://www.youtube.com/watch?v=3pyzLqr-01s'
    },
    {
      type: 'concept',
      title: {
        en: '📜 Imperative CLI vs Declarative YAML',
        it: '📜 CLI Imperativa vs YAML Dichiarativo'
      },
      content: {
        en: 'Instead of typing 5 different `docker run` commands every morning to start your dev environment, Compose lets you write the **desired final state** in a single text file named `docker-compose.yml`.\n\nRunning **`docker compose up`** reads the file and creates all containers, networks, and volumes automatically in the correct order!',
        it: 'Invece di digitare 5 comandi `docker run` diversi ogni mattina per avviare il tuo ambiente di sviluppo, Compose ti permette di descrivere lo **stato finale desiderato** in un unico file chiamato `docker-compose.yml`.\n\nEseguendo **`docker compose up`**, Docker legge il file e crea automaticamente tutti i container, le reti e i volumi nell\'ordine corretto!'
      }
    },
    {
      type: 'table',
      title: {
        en: '📝 The docker-compose.yml Syntax Mapping',
        it: '📝 Mappatura Sintassi: Da CLI a YAML'
      },
      content: {
        en: 'Compose translates your familiar Docker CLI flags into structured YAML properties:',
        it: 'Compose traduce i flag della CLI Docker in proprietà YAML strutturate:'
      },
      tableData: {
        headers: [
          { en: 'YAML Property', it: 'Proprietà YAML' },
          { en: 'CLI Equivalent', it: 'Equivalente CLI' },
          { en: 'Example', it: 'Esempio YAML' }
        ],
        rows: [
          [
            { en: '`image:`', it: '`image:`' },
            { en: '`docker run <image>`', it: '`docker run <immagine>`' },
            { en: '`image: postgres:15`', it: '`image: postgres:15`' }
          ],
          [
            { en: '`ports:`', it: '`ports:`' },
            { en: '`-p 4000:3000`', it: '`-p 4000:3000`' },
            { en: '`ports:\n  - "4000:3000"`', it: '`ports:\n  - "4000:3000"`' }
          ],
          [
            { en: '`volumes:`', it: '`volumes:`' },
            { en: '`-v store-data:/var/lib`', it: '`-v store-data:/var/lib`' },
            { en: '`volumes:\n  - store-data:/var/lib`', it: '`volumes:\n  - store-data:/var/lib`' }
          ],
          [
            { en: '`environment:`', it: '`environment:`' },
            { en: '`-e NODE_ENV=prod`', it: '`-e NODE_ENV=prod`' },
            { en: '`environment:\n  - NODE_ENV=prod`', it: '`environment:\n  - NODE_ENV=prod`' }
          ],
          [
            { en: '`depends_on:`', it: '`depends_on:`' },
            { en: '*(Startup ordering)*', it: '*(Ordine di avvio)*' },
            { en: '`depends_on:\n  - db-store`', it: '`depends_on:\n  - db-store`' }
          ]
        ]
      }
    },
    {
      type: 'code',
      title: {
        en: 'Example: Full Stack YAML Blueprint',
        it: 'Esempio: Blueprint YAML Full Stack'
      },
      content: {
        en: 'This single file spins up an API server and a PostgreSQL database on a shared internal network:',
        it: 'Questo singolo file avvia un server API e un database PostgreSQL su una rete interna condivisa:'
      },
      code: `version: '3.8'
services:
  api:
    build: .
    ports:
      - "4000:3000"
    depends_on:
      - db-store
    environment:
      - DB_HOST=db-store

  db-store:
    image: postgres:15
    volumes:
      - pg-data:/var/lib/postgresql/data

volumes:
  pg-data:`,
      language: 'yaml'
    },
    {
      type: 'tip',
      title: {
        en: '💡 `docker compose` (v2) vs `docker-compose` (v1)',
        it: '💡 `docker compose` (v2) vs `docker-compose` (v1)'
      },
      content: {
        en: 'Historically, Compose was a separate Python tool invoked with a hyphen (`docker-compose`). Modern Docker integrates Compose directly as a CLI plugin invoked with a space (**`docker compose`**).\n\nBoth commands are supported in our interactive simulator!',
        it: 'Storicamente, Compose era uno strumento Python separato chiamato col trattino (`docker-compose`). Oggi Docker integra Compose direttamente come plugin nativo della CLI chiamato con lo spazio (**`docker compose`**).\n\nEntrambe le sintassi sono supportate nel nostro simulatore!'
      }
    },
    {
      type: 'table',
      title: {
        en: '⚖️ Stack Lifecycle Commands',
        it: '⚖️ Comandi per il Ciclo di Vita dello Stack'
      },
      content: {
        en: 'Learn how to manage the lifecycle of your multi-container environment:',
        it: 'Impara a gestire il ciclo di vita del tuo ambiente multi-container:'
      },
      tableData: {
        headers: [
          { en: 'Command', it: 'Comando' },
          { en: 'Action', it: 'Azione' },
          { en: 'Containers', it: 'Container' },
          { en: 'Networks & Volumes', it: 'Reti e Volumi' }
        ],
        rows: [
          [
            { en: '**docker compose up -d**', it: '**docker compose up -d**' },
            { en: 'Builds, creates, and starts all services in background', it: 'Crea e avvia tutti i servizi in sottofondo' },
            { en: '🟢 Started', it: '🟢 Avviati' },
            { en: '✅ Created', it: '✅ Creati' }
          ],
          [
            { en: '**docker compose stop**', it: '**docker compose stop**' },
            { en: 'Pauses running containers without destroying them', it: 'Pausa i container senza distruggerli' },
            { en: '🟡 Stopped', it: '🟡 Fermati' },
            { en: '✅ Preserved', it: '✅ Conservati' }
          ],
          [
            { en: '**docker compose down**', it: '**docker compose down**' },
            { en: 'Stops and REMOVES containers and custom networks', it: 'Stoppa e RIMUOVE container e reti' },
            { en: '❌ Removed', it: '❌ Riscossi/Rimossi' },
            { en: '⚠️ Networks removed, Volumes kept', it: '⚠️ Reti rimosse, Volumi salvati' }
          ]
        ]
      }
    },
    {
      type: 'game',
      title: {
        en: 'Lab: Orchestrate the Stack',
        it: 'Lab: Orchestra lo Stack'
      },
      content: {
        en: 'In this simulation, you will launch a multi-container stack defined in a YAML file and then teardown the infrastructure. Watch how Docker Compose handles the complexity for you!',
        it: 'In questa simulazione avvierai uno stack multi-container definito in un file YAML e poi ne smantellerai l\'infrastruttura. Guarda come Docker Compose gestisce la complessità per te!'
      },
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-myapp', name: 'myapp', tag: 'latest', size: '150MB' }],
          containers: [],
          volumes: [],
          networks: []
        },
        tasks: [
          {
            id: '1',
            instruction: {
              en: 'Start the entire multi-container stack in detached mode in the background',
              it: 'Avvia l\'intero stack multi-container in modalità detached (in sottofondo)'
            },
            condition: 'CONTAINER_RUNNING:web',
            hints: [
              {
                en: '💡 Hint 1/3 (Conceptual): Use the `up` subcommand with Docker Compose.',
                it: '💡 Aiuto 1/3 (Concettuale): Usa il sottocomando `up` con Docker Compose.'
              },
              {
                en: '💡 Hint 2/3 (Syntax): Append the `-d` flag to run in detached background mode.',
                it: '💡 Aiuto 2/3 (Sintassi): Aggiungi il flag `-d` per eseguire in modalità detached.'
              },
              {
                en: '💡 Hint 3/3 (Full Solution): Type `docker-compose up -d` in the CLI terminal.',
                it: '💡 Aiuto 3/3 (Soluzione Completa): Digita `docker-compose up -d` nel terminale CLI.'
              }
            ]
          },
          {
            id: '2',
            instruction: {
              en: 'Stop and remove all containers and networks in the stack',
              it: 'Stoppa e rimuovi tutti i container e le reti dello stack'
            },
            condition: 'CONTAINER_RUNNING:0',
            hints: [
              {
                en: '💡 Hint 1/3 (Conceptual): Use the subcommand that stops AND removes resources.',
                it: '💡 Aiuto 1/3 (Concettuale): Usa il sottocomando che stoppa E rimuove le risorse.'
              },
              {
                en: '💡 Hint 2/3 (Syntax): Remember the difference between `stop` (pause) and `down` (remove).',
                it: '💡 Aiuto 2/3 (Sintassi): Ricorda la differenza tra `stop` (pausa) e `down` (rimozione).'
              },
              {
                en: '💡 Hint 3/3 (Full Solution): Type `docker-compose down` in the CLI terminal.',
                it: '💡 Aiuto 3/3 (Soluzione Completa): Digita `docker-compose down` nel terminale CLI.'
              }
            ]
          }
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
    },
    {
      id: 'docker-7-q3',
      question: {
        en: 'Which YAML key in `docker-compose.yml` specifies the order in which services should start up?',
        it: 'Quale chiave YAML in `docker-compose.yml` specifica l\'ordine con cui i servizi devono essere avviati?'
      },
      options: [
        { en: 'depends_on', it: 'depends_on' },
        { en: 'startup_order', it: 'startup_order' },
        { en: 'after_service', it: 'after_service' },
        { en: 'links', it: 'links' }
      ],
      correct: 0,
      explanation: {
        en: 'The `depends_on` key instructs Docker Compose to launch prerequisite services (e.g. database) before starting dependent services (e.g. backend API).',
        it: 'La chiave `depends_on` indica a Docker Compose di avviare prima i servizi prerequisito (es. database) rispetto ai servizi dipendenti (es. API backend).'
      }
    }
  ]
}
