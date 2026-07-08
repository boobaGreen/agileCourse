import type { Module } from '../../types'

export const docker3: Module = {
  id: 'docker-3',
  track: 'docker',
  order: 3,
  title: {
    en: 'The Dockerfile',
    it: 'Il Dockerfile'
  },
  subtitle: {
    en: 'Building your own custom images',
    it: 'Costruire le tue immagini personalizzate'
  },
  emoji: '📝',
  duration: '25 min',
  xpReward: 150,
  sections: [
    {
      type: 'intro',
      content: {
        en: 'You won\'t always rely on predefined images. To create an environment specifically for your app, you write a **Dockerfile** — a simple, standardized text document containing all the commands a user could call on the command line to assemble an image.',
        it: 'Non ti affiderai sempre a immagini predefinite. Per creare un ambiente specifico per la tua app, scrivi un **Dockerfile**: un documento di testo semplice e standardizzato contenente tutti i comandi che potresti digitare sulla riga di comando per assemblare un\'immagine.'
      }
    },
    {
      type: 'video',
      title: {
        en: '📺 Writing a Dockerfile from Scratch',
        it: '📺 Scrivere un Dockerfile da Zero'
      },
      content: {
        en: 'A perfect 12-minute breakdown on how to construct a Dockerfile and minimize its final size.',
        it: 'Un\'analisi di 12 minuti per capire come costruire un Dockerfile e ridurne al minimo le dimensioni finali.'
      },
      videoUrl: 'https://www.youtube.com/watch?v=WmcdMiyqfZs'
    },
    {
      type: 'table',
      title: {
        en: '🛠️ Core Instructions Reference',
        it: '🛠️ Riferimento delle Istruzioni Principali'
      },
      content: {
        en: 'Memorize these five. They cover 90% of your Dockerfile needs:',
        it: 'Memorizza queste cinque istruzioni. Coprono il 90% delle tue esigenze con i Dockerfile:'
      },
      tableData: {
        headers: [
          { en: 'Instruction', it: 'Istruzione' },
          { en: 'Purpose', it: 'Scopo' },
          { en: 'When does it execute?', it: 'Quando viene eseguita?' }
        ],
        rows: [
          [
            { en: '**FROM**', it: '**FROM**' },
            { en: 'Defines the base OS image to start from', it: 'Definisce l\'immagine del sistema operativo di base da cui partire' },
            { en: 'Build Phase (Step 1)', it: 'Fase di Build (Passo 1)' }
          ],
          [
            { en: '**WORKDIR**', it: '**WORKDIR**' },
            { en: 'Sets the active directory inside the container', it: 'Imposta la cartella di lavoro attiva nel container' },
            { en: 'Build Phase', it: 'Fase di Build' }
          ],
          [
            { en: '**COPY**', it: '**COPY**' },
            { en: 'Copies files from your laptop into the image', it: 'Copia i file dal tuo computer all\'interno dell\'immagine' },
            { en: 'Build Phase', it: 'Fase di Build' }
          ],
          [
            { en: '**RUN**', it: '**RUN**' },
            { en: 'Executes shell commands (like `apt install` or `npm install`)', it: 'Esegue comandi di terminale (come `apt install` o `npm install`) per creare i layer' },
            { en: 'Build Phase (Creates a layer)', it: 'Fase di Build (Crea un layer)' }
          ],
          [
            { en: '**CMD**', it: '**CMD**' },
            { en: 'Defines the default command that runs when the **container starts**', it: 'Definisce il comando predefinito eseguito all\'avvio del container' },
            { en: 'Runtime Phase (Once only)', it: 'Fase di Runtime (Una sola volta all\'avvio)' }
          ]
        ]
      }
    },
    {
       type: 'concept',
       title: {
         en: '🛑 The Container Lifecycle',
         it: '🛑 Il Ciclo di Vita del Container'
       },
       content: {
         en: 'A container is designed to run a specific task. **When the process defined in CMD finishes, the container exits automatically.** For example, a container running `echo hello` will exit immediately after printing, while a web server will keep running as long as the server process is alive.',
         it: 'Un container è progettato per eseguire un compito specifico. **Quando il processo definito in CMD termina, il container si arresta automaticamente.** Ad esempio, un container che esegue `echo hello` terminerà subito dopo la stampa, mentre un server web rimarrà attivo finché il processo del server è in esecuzione.'
       }
    },
    {
      type: 'concept',
      title: {
        en: '⚡ Understanding the Build Cache',
        it: '⚡ Capire la Cache di Build'
      },
      content: {
        en: 'Docker builds images sequentially. To speed things up, it **caches** each layer. If you change a line of code, Docker tries to reuse the cache. **However**, if a layer is invalidated (e.g., a file changed in `COPY`), ALL subsequent layers are completely rebuilt.\n\nThis is why we `COPY package.json` and `RUN npm install` **BEFORE** we `COPY . .` (the rest of the code). We don\'t want to reinstall 500MB of Node modules just because we changed a typo in `index.html`!',
        it: 'Docker compila le immagini in sequenza. Per velocizzare il processo, memorizza in **cache** ogni layer. Se modifichi una riga di codice, Docker tenta di riutilizzare la cache. **Tuttavia**, se un layer viene invalidato (es. un file modificato in `COPY`), TUTTI i layer successivi vengono ricostruiti da zero.\n\nQuesto è il motivo per cui eseguiamo `COPY package.json` e `RUN npm install` **PRIMA** di `COPY . .` (il resto del codice). Non vogliamo reinstallare 500MB di moduli Node solo perché abbiamo corretto un refuso in `index.html`!'
      }
    },
    {
      type: 'concept',
      title: {
        en: '⚡ Layers & Caching',
        it: '⚡ Layer e Caching'
      },
      content: {
        en: 'Docker caches each step. If you change a file, Docker rebuilds from that layer down. If you need a completely fresh build without using old cached layers, use the **`--no-cache`** flag:\n\n`docker build --no-cache -t my-app .`\n\n💡 **Did you notice the dot `.` at the end of the build command?** In Docker, that dot specifies the **build context** (usually the current directory). It tells Docker where to look for the `Dockerfile` and the files you want to copy. Leaving it out will result in an error!',
        it: 'Docker memorizza nella cache ogni passaggio. Se modifichi un file, Docker ricostruisce da quel layer in poi. Se hai bisogno di una build completamente nuova senza usare i vecchi layer in cache, usa il flag **`--no-cache`**:\n\n`docker build --no-cache -t my-app .`\n\n💡 **Hai notato il punto `.` alla fine del comando di build?** In Docker, quel punto specifica il **contesto di build** (solitamente la cartella corrente). Indica a Docker dove cercare il `Dockerfile` e i file da copiare. Dimenticarlo causerà un errore!'
      }
    },
    {
      type: 'game',
      title: {
        en: 'Challenge: The Dockerfile Builder',
        it: 'Sfida: Il Costruttore di Dockerfile'
      },
      content: {
        en: 'Order the instructions logically to create a functional Node.js backend Dockerfile (from absolute base to final execution).',
        it: 'Ordina le istruzioni in modo logico per creare un Dockerfile di backend Node.js funzionante (dall\'immagine di base all\'esecuzione finale).'
      },
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
      type: 'game',
      title: {
        en: 'Lab: Build Your Custom Image',
        it: 'Lab: Crea la tua Immagine Personalizzata'
      },
      content: {
        en: 'In this simulator, you will actually build a custom image from a Dockerfile. Watch the "Image Registry" update as you tag your work.',
        it: 'In questo simulatore caricherai e compilerai un\'immagine personalizzata da un Dockerfile. Osserva l\'aggiornamento del registro delle immagini mentre assegni i tag al tuo lavoro.'
      },
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-node', name: 'node', tag: '18-alpine', size: '160MB' }],
          containers: []
        },
        tasks: [
          {
            id: '1',
            instruction: {
              en: 'Build the current directory and tag it as "myapp:v1" (use `docker build -t myapp:v1 .`)',
              it: 'Compila la cartella corrente e assegna il tag "myapp:v1" (usa `docker build -t myapp:v1 .`)'
            },
            condition: 'PULLED:myapp'
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-3-q1',
      question: {
        en: 'What is the critical difference between the RUN and CMD instructions?',
        it: 'Qual è la differenza fondamentale tra le istruzioni RUN e CMD?'
      },
      options: [
        {
          en: 'There is no functional or technical difference between these two instructions',
          it: 'Non c\'è alcuna differenza funzionale o tecnica tra queste due istruzioni'
        },
        {
          en: 'RUN executes during image creation, CMD defines the default runtime executable',
          it: 'RUN viene eseguita durante la creazione dell\'immagine, CMD definisce l\'eseguibile di runtime predefinito'
        },
        {
          en: 'RUN is used for downloading base images, CMD is used for pushing them to registry',
          it: 'RUN si usa per scaricare le immagini di base, CMD per caricarle nel registro'
        },
        {
          en: 'RUN is specifically for Windows containers, CMD is for Linux based containers',
          it: 'RUN è specifica per i container Windows, CMD per i container basati su Linux'
        }
      ],
      correct: 1,
      explanation: {
        en: '`RUN` runs during the `docker build` phase and bakes files into the image layers. `CMD` runs nothing during build; it simply tells the container what command to launch when someone calls `docker run`.',
        it: '`RUN` viene eseguito durante la fase di `docker build` e scrive i file nei layer dell\'immagine. `CMD` non esegue nulla durante la compilazione; indica semplicemente al container quale comando lanciare all\'avvio.'
      }
    },
    {
      id: 'docker-3-q2',
      question: {
        en: 'Why do sophisticated Dockerfiles separate `COPY package.json` from `COPY .` (the rest of the code)?',
        it: 'Perché i Dockerfile avanzati separano `COPY package.json` da `COPY .` (il resto del codice)?'
      },
      options: [
        {
          en: 'Because the Docker engine cannot handle copying large folders in a single step',
          it: 'Perché il motore Docker non può gestire la copia di cartelle di grandi dimensioni in un unico passaggio'
        },
        {
          en: 'To optimize the layer cache so dependencies aren\'t re-installed every time code changes',
          it: 'Per ottimizzare la cache dei layer in modo che le dipendenze non vengano reinstallate a ogni modifica del codice'
        },
        {
          en: 'To ensure that potentially malicious or hidden files aren\'t copied into the layer',
          it: 'Per garantire che file potenzialmente dannosi o nascosti non vengano copiati nel layer'
        },
        {
          en: 'Because the package.json file must be explicitly executed as a build script',
          it: 'Perché il file package.json deve essere eseguito esplicitamente come script di compilazione'
        }
      ],
      correct: 1,
      explanation: {
        en: 'If `COPY . .` happens before `RUN npm install`, then ANY tiny code change invalidates the cache for the heavy install step, making builds incredibly slow. By copying package.json first, Docker caches the heavy install unless the dependencies actually change.',
        it: 'Se `COPY . .` avviene prima di `RUN npm install`, QUALSIASI piccola modifica al codice annulla la cache per il pesante passaggio di installazione, rendendo le build incredibilmente lente. Copiando prima package.json, Docker memorizza nella cache l\'installazione pesante a meno che le dipendenze non cambino effettivamente.'
      }
    },
    {
      id: 'docker-3-q3',
      question: {
        en: 'Which flag is used in `docker build` to assign a human-readable name to an image?',
        it: 'Quale flag viene utilizzato in `docker build` per assegnare un nome leggibile a un\'immagine?'
      },
      options: [
        {
          en: '-n (name)',
          it: '-n (nome)'
        },
        {
          en: '-name (full)',
          it: '-name (completo)'
        },
        {
          en: '--tag (label)',
          it: '--tag (etichetta)'
        },
        {
          en: '-t (tag)',
          it: '-t (tag)'
        }
      ],
      correct: 3,
      explanation: {
        en: 'The `-t` (or `--tag`) flag assigns a repository name and an optional tag (e.g. `docker build -t my-app:latest`).',
        it: 'Il flag `-t` (o `--tag`) assegna un nome al repository e un tag opzionale (ad esempio, `docker build -t my-app:latest`).'
      }
    }
  ]
}
