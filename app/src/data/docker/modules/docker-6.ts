import type { Module } from '../../types'

export const docker6: Module = {
  id: 'docker-6',
  track: 'docker',
  order: 6,
  title: {
    en: 'Networking & Ports',
    it: 'Reti e Mappatura Porte'
  },
  subtitle: {
    en: 'Bridging containers to the outside world',
    it: 'Collegare i container al mondo esterno'
  },
  emoji: '🔌',
  duration: '15 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: {
        en: 'A container running a brilliantly crafted web server is useless if nobody can reach it. We need to bridge the isolation gap between the container\'s internal network and our laptop\'s local network.',
        it: 'Un container in cui gira un server web perfetto è inutile se nessuno può raggiungerlo. Dobbiamo superare l\'isolamento del container collegando la sua rete interna alla rete locale del nostro computer.'
      }
    },
    {
      type: 'video',
      title: {
        en: '📺 Docker Networking & Port Mapping (6 min)',
        it: '📺 Mappatura Porte e Reti Docker in 6 Minuti'
      },
      content: {
        en: 'A concise visual guide showing how host port forwarding and custom container networks work.',
        it: 'Una guida visiva sintetica che mostra come funzionano il port forwarding e le reti Docker personalizzate.'
      },
      videoUrl: 'https://www.youtube.com/watch?v=8ev2s4o83i8'
    },
    {
      type: 'concept',
      title: {
        en: '🚪 Port Mapping (`-p`)',
        it: '🚪 Mappatura delle Porte (`-p`)'
      },
      content: {
        en: 'By default, a container exposes no ports to the public. To view a React or Nginx app running inside a container, we must **bind** its internal port to a port on our laptop.\n\nSyntax: `-p [HOST_PORT]:[CONTAINER_PORT]`\n\nThe `HOST_PORT` is what you type in your browser (e.g., `localhost:8080`).',
        it: 'Di default, un container non espone alcuna porta all\'esterno. Per vedere un\'applicazione React o Nginx in esecuzione nel container, dobbiamo **associare** la sua porta interna a una porta del nostro computer.\n\nSintassi: `-p [PORTA_HOST]:[PORTA_CONTAINER]`\n\nLa `PORTA_HOST` è quella che digiti nel tuo browser (es. `localhost:8080`).'
      }
    },
    {
      type: 'flowchart',
      content: {
        en: '**How Port Mapping Works (`-p 8080:80`)**',
        it: '**Come Funziona la Mappatura Porte (`-p 8080:80`)**'
      },
      diagramSteps: [
        { label: { en: 'Browser User\n(localhost:8080)', it: 'Utente Browser\n(localhost:8080)' }, icon: '🌍', color: '#118ab2' },
        { label: { en: 'Host Port Tracker\n(Docker Daemon)', it: 'Gestore Porte Host\n(Docker Daemon)' }, icon: '🚪', color: '#ffb703' },
        { label: { en: 'Container Port 80\n(Nginx Web Server)', it: 'Porta 80 Container\n(Server Web Nginx)' }, icon: '📦', color: '#06d6a0' }
      ]
    },
    {
      type: 'concept',
      title: {
        en: '🌐 Docker User-Defined Networks',
        it: '🌐 Reti Docker Personalizzate'
      },
      content: {
        en: 'What if a Web Container needs to talk to a Database Container? They shouldn\'t go over the public internet!\n\nDocker allows creating virtual internal networks. When containers join the same network, they can securely talk to each other **using their container names** as hostnames (e.g., `http://web-db:5432`). This is built-in automatic DNS!',
        it: 'Cosa succede se un container Web deve comunicare con un container Database? Non dovrebbero passare per internet pubblico!\n\nDocker permette di creare reti virtuali interne. Quando i container si uniscono alla stessa rete, possono comunicare in modo sicuro **usando i propri nomi di container** come hostname (es. `http://web-db:5432`). È un DNS automatico integrato!'
      }
    },
    {
      type: 'table',
      title: {
        en: '🛠️ Command Reference: Networking & Ports',
        it: '🛠️ Riferimento Comandi: Reti e Mappatura Porte'
      },
      content: {
        en: 'Memorize these core CLI commands used for port forwarding and network management:',
        it: 'Memorizza questi comandi CLI fondamentali per la gestione delle porte e delle reti:'
      },
      tableData: {
        headers: [
          { en: 'Command', it: 'Comando' },
          { en: 'Purpose', it: 'Scopo' },
          { en: 'Example', it: 'Esempio' }
        ],
        rows: [
          [
            { en: '**docker run -p**', it: '**docker run -p**' },
            { en: 'Forwards host port to container port', it: 'Inoltra la porta dell\'host alla porta del container' },
            { en: '`docker run -p 8080:80 nginx`', it: '`docker run -p 8080:80 nginx`' }
          ],
          [
            { en: '**docker network create**', it: '**docker network create**' },
            { en: 'Creates an isolated virtual bridge network', it: 'Crea una rete bridge virtuale isolata' },
            { en: '`docker network create my-net`', it: '`docker network create my-net`' }
          ],
          [
            { en: '**docker run --network**', it: '**docker run --network**' },
            { en: 'Attaches a container to a specific custom network', it: 'Collega un container a una rete personalizzata specifica' },
            { en: '`docker run --network my-net nginx`', it: '`docker run --network my-net nginx`' }
          ]
        ]
      }
    },
    {
      type: 'game',
      title: {
        en: 'Lab: The Bridge Network',
        it: 'Lab: La Rete Bridge'
      },
      content: {
        en: 'In this simulation, you will create a custom isolated network and connect an Nginx web server exposing port 8080. Watch the visualizer connect the dots!',
        it: 'In questa simulazione creerei una rete isolata personalizzata e vi collegherai un server web Nginx esponendo la porta 8080. Guarda il visualizzatore collegare i nodi!'
      },
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-ng', name: 'nginx', tag: 'latest', size: '140MB' }],
          containers: [],
          networks: [{ id: 'net-bridge', name: 'bridge', driver: 'bridge' }]
        },
        tasks: [
          {
            id: '1',
            instruction: {
              en: 'Create a new custom network named "frontend-net"',
              it: 'Crea una nuova rete personalizzata chiamata "frontend-net"'
            },
            condition: 'NETWORK_EXISTS:frontend-net',
            hints: [
              {
                en: '💡 Hint 1/3 (Conceptual): Use `docker network create` to initialize a new bridge network.',
                it: '💡 Aiuto 1/3 (Concettuale): Usa `docker network create` per inizializzare una nuova rete bridge.'
              },
              {
                en: '💡 Hint 2/3 (Syntax): Specify the network name `frontend-net` after the create subcommand.',
                it: '💡 Aiuto 2/3 (Sintassi): Specifica il nome della rete `frontend-net` dopo il sottocomando create.'
              },
              {
                en: '💡 Hint 3/3 (Full Solution): Type `docker network create frontend-net` in the CLI terminal.',
                it: '💡 Aiuto 3/3 (Soluzione Completa): Digita `docker network create frontend-net` nel terminale CLI.'
              }
            ]
          },
          {
            id: '2',
            instruction: {
              en: 'Run an Nginx container named "web" on "frontend-net" exposing host port 8080 to container port 80',
              it: 'Esegui un container Nginx chiamato "web" sulla rete "frontend-net" esponendo la porta host 8080 sulla porta container 80'
            },
            condition: 'CONTAINER_RUNNING:web',
            hints: [
              {
                en: '💡 Hint 1/3 (Conceptual): Combine `--name web`, `-p 8080:80`, and `--network frontend-net`.',
                it: '💡 Aiuto 1/3 (Concettuale): Combina `--name web`, `-p 8080:80` e `--network frontend-net`.'
              },
              {
                en: '💡 Hint 2/3 (Syntax): Pass all flags before specifying the `nginx` image name at the end.',
                it: '💡 Aiuto 2/3 (Sintassi): Passa tutti i flag prima di specificare il nome dell\'immagine `nginx` alla fine.'
              },
              {
                en: '💡 Hint 3/3 (Full Solution): Type `docker run --name web -p 8080:80 --network frontend-net nginx` in the CLI.',
                it: '💡 Aiuto 3/3 (Soluzione Completa): Digita `docker run --name web -p 8080:80 --network frontend-net nginx` nel terminale CLI.'
              }
            ]
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-6-q1',
      question: {
        en: 'If you execute `docker run -p 5000:3000 app`, into which browser URL would you type to view the app?',
        it: 'Se esegui `docker run -p 5000:3000 app`, quale URL dovresti digitare nel browser per vedere l\'app?'
      },
      options: [
        { en: 'localhost:3000', it: 'localhost:3000' },
        { en: 'localhost:5000', it: 'localhost:5000' },
        { en: 'app:3000', it: 'app:3000' },
        { en: 'docker:5000:3000', it: 'docker:5000:3000' }
      ],
      correct: 1,
      explanation: {
        en: 'The mapping syntax is `host_port:container_port`. Since the host port is 5000, that is the entry door available to your browser.',
        it: 'La sintassi di mappatura è `porta_host:porta_container`. Poiché la porta sull\'host è 5000, questa è la porta d\'accesso disponibile per il browser.'
      }
    },
    {
      id: 'docker-6-q2',
      question: {
        en: 'How do two containers on the same custom Docker network communicate with each other?',
        it: 'In che modo due container sulla stessa rete Docker personalizzata comunicano tra loro?'
      },
      options: [
        {
          en: 'Using the host\'s IP address',
          it: 'Utilizzando l\'indirizzo IP dell\'host'
        },
        {
          en: 'Using port mapping on localhost',
          it: 'Utilizzando la mappatura delle porte su localhost'
        },
        {
          en: 'Using their container names as DNS hostnames',
          it: 'Utilizzando i loro nomi di container come hostname DNS'
        },
        {
          en: 'They cannot communicate directly for security reasons',
          it: 'Non possono comunicare direttamente per motivi di sicurezza'
        }
      ],
      correct: 2,
      explanation: {
        en: 'Docker provides built-in DNS resolution for custom bridge networks. If a container is named "redis", another container on the same network can reach it simply by pinging "redis".',
        it: 'Docker fornisce una risoluzione DNS integrata per le reti bridge personalizzate. Se un container si chiama "redis", un altro container sulla stessa rete può raggiungerlo semplicemente contattando "redis".'
      }
    },
    {
      id: 'docker-6-q3',
      question: {
        en: 'Which option syntax correctly forwards host port 8080 to container port 80?',
        it: 'Quale sintassi dei flag inoltra correttamente la porta host 8080 alla porta container 80?'
      },
      options: [
        { en: '-p 8080:80', it: '-p 8080:80' },
        { en: '-p 80:8080', it: '-p 80:8080' },
        { en: '-v 8080:80', it: '-v 8080:80' },
        { en: '--network 8080:80', it: '--network 8080:80' }
      ],
      correct: 0,
      explanation: {
        en: 'Port mapping always uses the syntax `-p [HOST_PORT]:[CONTAINER_PORT]`. Therefore `-p 8080:80` maps host port 8080 to container port 80.',
        it: 'La mappatura delle porte usa sempre la sintassi `-p [PORTA_HOST]:[PORTA_CONTAINER]`. Pertanto `-p 8080:80` mappa la porta host 8080 sulla porta container 80.'
      }
    }
  ]
}
