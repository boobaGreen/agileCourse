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
        en: '📺 Docker Networking in 5 Minutes',
        it: '📺 Docker Networking in 5 Minuti'
      },
      content: {
        en: 'A quick 5-minute visual guide to understanding Docker container networking, port mapping, and custom bridges.',
        it: 'Una guida visiva rapida di 5 minuti per comprendere la rete tra container Docker, la mappatura delle porte e i bridge personalizzati.'
      },
      videoUrl: 'https://www.youtube.com/watch?v=zJD7QYQtiKc'
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
      title: {
        en: '🚪 How Port Mapping Works (`-p 8080:80`)',
        it: '🚪 Come Funziona la Mappatura Porte (`-p 8080:80`)'
      },
      content: {
        en: 'Traffic sent to your computer\'s port 8080 is forwarded straight into port 80 of the container.',
        it: 'Il traffico inviato alla porta 8080 del computer viene inoltrato direttamente alla porta 80 del container.'
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
        en: '🌐 Docker User-Defined Networks & Automatic DNS',
        it: '🌐 Reti Docker Personalizzate e DNS Automatico'
      },
      content: {
        en: 'Imagine you have an App container (`web`) and a Database container (`db`). How does `web` connect to `db`?\n\n' +
            '❌ **Without a Custom Network (Hardcoded IPs)**:\n' +
            'Every time a container restarts, its internal IP address changes (e.g. `172.17.0.2` becomes `172.17.0.5`). Your app code breaks because the IP is wrong!\n\n' +
            '✅ **With a Custom Network (`docker network create my-net`)**:\n' +
            'Docker runs an **internal DNS server**. You don\'t write IP addresses in your code; you simply write the **container name** as the hostname!\n\n' +
            '📌 **Database Connection String in your Application Code:**\n' +
            '`postgres://user:password@db:5432/mydb` *(Docker automatically resolves "db" to the container IP!)*\n\n' +
            '🔍 **Anatomy of the Connection String:**\n' +
            '• `postgres://` ➔ Database Protocol / Driver\n' +
            '• `user:password` ➔ Access Credentials\n' +
            '• `@db` ➔ **Container Name** (automatically resolved by Docker DNS)\n' +
            '• `:5432` ➔ Internal Container Port (default PostgreSQL port)\n' +
            '• `/mydb` ➔ Database Name\n\n' +
            '💡 **Production Best Practice:**\n' +
            'Avoid hardcoding connection strings in source code; pass it via an **Environment Variable** (e.g., `DATABASE_URL=postgres://user:password@db:5432/mydb`).',
        it: 'Immagina di avere un container App (`web`) e un container Database (`db`). Come fa `web` a connettersi a `db`?\n\n' +
            '❌ **Senza una Rete Personalizzata (IP variabili)**:\n' +
            'Ogni volta che un container si riavvia, il suo IP interno cambia (es. da `172.17.0.2` a `172.17.0.5`). Se scrivi l\'IP nel codice della tua app, la connessione fallirà!\n\n' +
            '✅ **Con una Rete Personalizzata (`docker network create mia-rete`)**:\n' +
            'Docker attiva un **server DNS interno**. Nel codice della tua app non scrivi mai un indirizzo IP, ma usi semplicemente il **NOME del container**!\n\n' +
            '📌 **Stringa di Connessione al Database nel codice della tua App:**\n' +
            '`postgres://user:password@db:5432/mydb` *(Docker converte in automatico "db" nell\'IP del container!)*\n\n' +
            '🔍 **Anatomia dell\'URL di Connessione:**\n' +
            '• `postgres://` ➔ Protocollo / Driver del Database\n' +
            '• `user:password` ➔ Credenziali di Accesso\n' +
            '• `@db` ➔ **Nome del Container** (risolto automaticamente dal DNS Docker)\n' +
            '• `:5432` ➔ Porta Interna del Container (porta default PostgreSQL)\n' +
            '• `/mydb` ➔ Nome del Database\n\n' +
            '💡 **Buona Pratica in Produzione:**\n' +
            'Evita di scrivere la stringa direttamente nel codice sorgente: passala tramite **Variabile d\'Ambiente** (es. `DATABASE_URL=postgres://user:password@db:5432/mydb`).'
      }
    },
    {
      type: 'flowchart',
      title: {
        en: '📊 Visual Diagram: How Docker DNS Resolves "db" ➔ IP',
        it: '📊 Schema Visivo: Come il DNS Docker converte "db" ➔ IP'
      },
      content: {
        en: 'Here is the step-by-step visual flow when container "web" sends a request to container "db":',
        it: 'Ecco il flusso visivo passo-passo quando il container "web" invia una richiesta al container "db":'
      },
      diagramSteps: [
        { label: { en: '1. Web Container\nCalls "postgres://db:5432"', it: '1. Container Web\nChiama "postgres://db:5432"' }, icon: '💻', color: '#118ab2' },
        { label: { en: '2. Docker Internal DNS\nConverts "db" ➔ 172.18.0.3', it: '2. DNS Interno Docker\nConverte "db" ➔ 172.18.0.3' }, icon: '⚡', color: '#ffb703' },
        { label: { en: '3. PostgreSQL Container\nReceives query at 172.18.0.3', it: '3. Container PostgreSQL\nRiceve la query a 172.18.0.3' }, icon: '🐘', color: '#06d6a0' }
      ]
    },
    {
      type: 'tip',
      title: {
        en: '⚠️ Why "localhost" Fails Between Containers & The `-p` Trap',
        it: '⚠️ Perché "localhost" Fallisce tra Container & La Trappola di `-p`'
      },
      content: {
        en: 'A frequent mistake is writing `localhost:5432` inside your web app code to connect to a Database container.\n\n' +
            '🤔 **Why does the `-p 5432:5432` flag confuse people?**\n\n' +
            '1️⃣ **Scenario A — Code running on your Laptop (Host):**\n' +
            'When you run Node.js/Python code directly on your laptop OS and execute `docker run -p 5432:5432 db`, port 5432 on your laptop is forwarded to the DB container.\n' +
            '👉 **`localhost:5432` WORKS**, because you are querying from the Laptop Host!\n\n' +
            '2️⃣ **Scenario B — Code running INSIDE the `web` Container:**\n' +
            'When you containerize your web app (`web`), the word `localhost` changes context! Inside container `web`, `localhost` means *"this specific `web` container"*, NOT your Laptop!\n' +
            '👉 **`localhost:5432` FAILS (`Connection Refused`)**, because there is no Postgres listening on port 5432 inside container `web`!\n\n' +
            '📊 **Visual Comparison:**\n' +
            '• **From your Laptop Host:** `Laptop (localhost:5432)` ➔ `Docker Daemon` ➔ `DB Container (5432)` ✅\n' +
            '• **From inside Web Container:** `Web Container (localhost:5432)` ➔ `Same Web Container Loopback` ➔ ❌ No DB found!\n\n' +
            '✅ **The Solution:**\n' +
            'Create a custom network (`docker network create my-net`), connect both containers, and use the DB container name as the hostname: `postgres://user:pass@db:5432/mydb`.',
        it: 'Un errore frequente è scrivere `localhost:5432` nel codice dell\'app per connettersi al Database containerizzato.\n\n' +
            '🤔 **Perché il flag `-p 5432:5432` trae in inganno?**\n\n' +
            '1️⃣ **Scenario A — Codice in esecuzione sul tuo Laptop (Host):**\n' +
            'Quando lanci il codice Node.js/Python direttamente sul tuo PC e fai `docker run -p 5432:5432 db`, la porta 5432 del tuo PC viene inoltrata al container DB.\n' +
            '👉 **`localhost:5432` FUNZIONA**, perché ti trovi sul PC Laptop!\n\n' +
            '2️⃣ **Scenario B — Codice containerizzato dentro il Container `web`:**\n' +
            'Quando impacchetti anche la tua app dentro un container (`web`), la parola `localhost` cambia contesto! Per il container `web`, `localhost` significa *"questo specifico container `web`"*, NON il tuo PC Laptop!\n' +
            '👉 **`localhost:5432` FALLISCE (`Connection Refused`)**, perché dentro `web` non c\'è alcun servizio Postgres in ascolto sulla 5432!\n\n' +
            '📊 **Confronto Visivo:**\n' +
            '• **Dal tuo Laptop Host:** `Laptop (localhost:5432)` ➔ `Docker Daemon` ➔ `Container DB (5432)` ✅\n' +
            '• **Da dentro il Container Web:** `Container Web (localhost:5432)` ➔ `Stesso Container Web` ➔ ❌ Nessun DB trovato!\n\n' +
            '✅ **La Soluzione Corretta:**\n' +
            'Crea una rete Docker (`docker network create mia-rete`), collega entrambi i container e usa il nome del container DB come hostname: `postgres://user:pass@db:5432/mydb`.'
      }
    },
    {
      type: 'table',
      title: {
        en: '🔌 Built-in Networks & Network Drivers',
        it: '🔌 Le 3 Reti Predefinite e i Driver di Rete'
      },
      content: {
        en: 'When Docker is installed, it automatically creates 3 built-in networks corresponding to these drivers:',
        it: 'Quando installi Docker, vengono create automaticamente 3 reti predefinite corrispondenti a questi driver:'
      },
      tableData: {
        headers: [
          { en: 'Built-in Network Name', it: 'Nome Rete Predefinita' },
          { en: 'Driver Type', it: 'Tipo Driver' },
          { en: 'CLI Command Example', it: 'Esempio Comando CLI' },
          { en: 'DNS Resolution by Name?', it: 'DNS per Nome Container?' }
        ],
        rows: [
          [
            { en: '**bridge** (Default)', it: '**bridge** (Predefinito)' },
            { en: '`bridge`', it: '`bridge`' },
            { en: '`docker run --network bridge -p 8080:80 nginx`', it: '`docker run --network bridge -p 8080:80 nginx`' },
            { en: '❌ No (IP address only)', it: '❌ No (Solo tramite indirizzo IP)' }
          ],
          [
            { en: '**host**', it: '**host**' },
            { en: '`host`', it: '`host`' },
            { en: '`docker run --network host nginx`', it: '`docker run --network host nginx`' },
            { en: '❌ No (Shares Host PC Network)', it: '❌ No (Usa direttamente la rete del PC Host)' }
          ],
          [
            { en: '**none**', it: '**none**' },
            { en: '`none`', it: '`none`' },
            { en: '`docker run --network none alpine`', it: '`docker run --network none alpine`' },
            { en: '🚫 N/A (Total Air-Gap Isolation)', it: '🚫 N/A (Isolamento totale senza rete)' }
          ]
        ]
      }
    },
    {
      type: 'concept',
      title: {
        en: '💡 Key Clarification: Built-in `bridge` vs Custom Network (`docker network create`)',
        it: '💡 Chiarimento Chiave: Rete `bridge` Predefinita vs Rete Personalizzata (`docker network create`)'
      },
      content: {
        en: '🔑 **What is the difference between Driver, Built-in Network, and Custom Network?**\n\n' +
            '• **Driver**: The underlying technology (`bridge`, `host`, `none`).\n' +
            '• **Built-in `bridge` Network**: The default network named `bridge`. **WARNING:** Containers on the default `bridge` network CANNOT resolve each other by container name (no internal DNS)!\n' +
            '• **Custom User-Defined Network (`docker network create my-net`)**: Creates a NEW network named `my-net` using the `bridge` driver. **Docker activates internal DNS here**, allowing container `web` to reach container `db` by its name (`postgres://db:5432`)!\n\n' +
            '📌 **Summary of Commands:**\n' +
            '1. `docker network create my-net` ➔ Creates a new custom bridge network named "my-net"\n' +
            '2. `docker run --network my-net --name db postgres` ➔ Attaches container "db" to "my-net"\n' +
            '3. `docker run --network my-net --name web myapp` ➔ Attaches container "web" to "my-net" (can now connect to `db:5432`!)',
        it: '🔑 **Qual è la differenza tra Driver, Rete Predefinita e Rete Personalizzata?**\n\n' +
            '• **Driver**: È la tecnologia di base (`bridge`, `host`, `none`).\n' +
            '• **Rete Predefinita `bridge`**: La rete creata in automatico da Docker con nome `bridge`. **ATTENZIONE:** I container sulla rete `bridge` predefinita NON possono comunicare per nome (il DNS interno è disattivato)!\n' +
            '• **Rete Personalizzata (`docker network create mia-rete`)**: Crea una NUOVA rete di tipo bridge chiamata `mia-rete`. **Qui Docker attiva il DNS interno**, permettendo al container `web` di contattare il container `db` usando semplicemente il nome (`postgres://db:5432`)!\n\n' +
            '📌 **Riepilogo dei Comandi Pratici:**\n' +
            '1. `docker network create mia-rete` ➔ Crea la nuova rete personalizzata chiamata "mia-rete"\n' +
            '2. `docker run --network mia-rete --name db postgres` ➔ Collega il container "db" a "mia-rete"\n' +
            '3. `docker run --network mia-rete --name web mia-app` ➔ Collega il container "web" a "mia-rete" (ora può chiamare `db:5432`!)'
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
      type: 'tip',
      title: {
        en: '💡 Combining Multiple Flags in `docker run`',
        it: '💡 Combinare Più Flag in un Singolo `docker run`'
      },
      content: {
        en: 'In real-world projects, you will often combine `--name`, `-p`, and `--network` in one single command:\n\n' +
            '`docker run --name app-server -p 5000:80 --network backend-net nginx`\n\n' +
            '* `--name app-server`: Sets the container name to "app-server"\n' +
            '* `-p 5000:80`: Maps host port 5000 to container port 80\n' +
            '* `--network backend-net`: Connects it to the custom network "backend-net"\n' +
            '* `nginx`: The image blueprint (always at the very end!)',
        it: 'Nei progetti reali, combinerai spesso `--name`, `-p` e `--network` in un\'unica riga di comando:\n\n' +
            '`docker run --name app-server -p 5000:80 --network backend-net nginx`\n\n' +
            '* `--name app-server`: Assegna il nome "app-server" al container\n' +
            '* `-p 5000:80`: Mappa la porta host 5000 sulla porta container 80\n' +
            '* `--network backend-net`: Collega il container alla rete personalizzata "backend-net"\n' +
            '* `nginx`: Il nome dell\'immagine (SEMPRE alla fine!)'
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
