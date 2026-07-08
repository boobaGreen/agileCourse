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
        en: 'A perfect 5-minute breakdown on how to write a Dockerfile and compile your first image.',
        it: 'Un\'analisi di 5 minuti per capire come scrivere un Dockerfile e compilare la tua prima immagine.'
      },
      videoUrl: 'https://www.youtube.com/watch?v=DqyNssbqEaE'
    },
    {
      type: 'table',
      title: {
        en: '🛠️ Core Instructions Reference',
        it: '🛠️ Riferimento delle Istruzioni Principali'
      },
      content: {
        en: 'Memorize these core instructions. They cover 95% of your Dockerfile needs:',
        it: 'Memorizza queste istruzioni fondamentali. Coprono il 95% delle tue esigenze con i Dockerfile:'
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
            { en: '**ADD**', it: '**ADD**' },
            { en: 'Copies files (like COPY), but can also download from URLs and extract archives (.tar, .zip)', it: 'Copia i file (come COPY), ma può anche scaricare da URL ed estrarre archivi compressi (.tar, .zip)' },
            { en: 'Build Phase', it: 'Fase di Build' }
          ],
          [
            { en: '**RUN**', it: '**RUN**' },
            { en: 'Executes shell commands (like `apt install` or `npm install`)', it: 'Esegue comandi di terminale (come `apt install` o `npm install`) per creare i layer' },
            { en: 'Build Phase (Creates a layer)', it: 'Fase di Build (Crea un layer)' }
          ],
          [
            { en: '**EXPOSE**', it: '**EXPOSE**' },
            { en: 'Informs Docker that the container listens on the specified network port at runtime (primarily for documentation)', it: 'Informa Docker che il container rimarrà in ascolto sulla porta di rete specificata a runtime (principalmente a scopo documentativo)' },
            { en: 'Build Phase (Metadata)', it: 'Fase di Build (Metadati)' }
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
        en: '⚡ Understanding the Build Cache (The LEGO Analogy)',
        it: '⚡ Capire la Cache di Build (L\'Analogia dei LEGO)'
      },
      content: {
        en: 'Docker builds images sequentially. To save time, it **caches** each layer. If you change a file, Docker cannot reuse the cache for that step and must rebuild it **AND all steps after it** (the cascade effect).\n\n🧱 **The LEGO Tower Analogy:**\nImagine building a LEGO tower. Each line in your `Dockerfile` is a brick. If you need to swap a brick in the *middle* of the tower, you have to take off and rebuild every single brick *above it*.\n\nTo make builds fast, we place bricks that change often (like source code) at the **very top** of the tower, and bricks that change rarely (like library installation) at the **bottom**.',
        it: 'Docker compila le immagini in sequenza. Per risparmiare tempo, salva ogni layer in **cache**. Se modifichi un file, Docker non può riutilizzare la cache per quel passaggio ed è costretto a ricostruire da zero quel passaggio **E tutti quelli successivi** (effetto a cascata).\n\n🧱 **L\'Analogia della Torre LEGO:**\nImmagina di costruire una torre LEGO. Ogni istruzione nel tuo `Dockerfile` è un mattoncino. Se devi sostituire un mattoncino nel *mezzo* della torre, devi rimuovere e ricostruire ogni singolo mattoncino posizionato *sopra di esso*.\n\nPer velocizzare la build, posizioniamo i mattoncini che cambiano spesso (come il codice sorgente) in **cima** alla torre, e i mattoncini che cambiano raramente (come l\'installazione delle librerie) in **basso**.'
      }
    },
    {
      type: 'concept',
      title: {
        en: '💻 Dockerfile Caching: Bad vs Good Structure',
        it: '💻 Caching nel Dockerfile: Struttura Errata vs Corretta'
      },
      content: {
        en: 'Here is the step-by-step explanation of what happens in both structures when you make a simple code change (like editing `index.html`):\n\n### ❌ The Unoptimized Way (Slow Build)\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY . .          # 1. Copies all files. Since index.html changed, Docker invalidates this cache!\nRUN npm install   # 2. ❌ Cascade broken! Because line 1 was rebuilt, Docker MUST rebuild this step too.\nCMD ["node", "server.js"]\n```\n* **Why it is slow:** Since the `COPY . .` instruction is placed *before* the installation, any code edit breaks the cache. Docker is forced to download and reinstall 500MB of dependencies every single time you change one word in your files! (Takes **~2 minutes**).\n\n---\n\n### ✅ The Optimized Way (Fast Build)\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package.json ./   # 1. Copies ONLY package.json. Did it change? No! (Uses Cache)\nRUN npm install        # 2. ✅ Cached! Since package.json didn\'t change, Docker skips this step!\nCOPY . .               # 3. Copies all other code files (takes only 0.1 seconds)\nCMD ["node", "server.js"]\n```\n* **Why it is fast:** We separated the instructions. `package.json` only contains the list of libraries (which rarely changes during daily coding). Docker reuses the cached installation (Step 2) and only runs the fast copy step (Step 3). (Takes **<1 second**).',
        it: 'Ecco la spiegazione dettagliata passo-passo di cosa succede in entrambe le strutture quando fai una semplice modifica al codice (come modificare il testo in `index.html`):\n\n### ❌ La Via Non Ottimizzata (Build lenta)\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY . .          # 1. Copia tutti i file. Poiché index.html è cambiato, la cache viene distrutta qui!\nRUN npm install   # 2. ❌ Cascata rotta! Poiché il passo 1 è stato ricostruito, Docker deve rifare anche questo.\nCMD ["node", "server.js"]\n```\n* **Perché è lenta:** Poiché l\'istruzione `COPY . .` è posizionata *prima* dell\'installazione, qualsiasi modifica al codice rompe la cache. Docker è costretto a riscaricare e reinstallare 500MB di pacchetti ogni singola volta che correggi una riga di codice! (Richiede **~2 minuti**).\n\n---\n\n### ✅ La Via Ottimizzata (Build veloce)\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package.json ./   # 1. Copia SOLO package.json. È cambiato? No! (Usa la Cache)\nRUN npm install        # 2. ✅ In cache! Poiché package.json non è cambiato, Docker salta questo passo!\nCOPY . .               # 3. Copia tutti gli altri file di codice (richiede solo 0.1 secondi)\nCMD ["node", "server.js"]\n```\n* **Perché è veloce:** Abbiamo separato le istruzioni. Il file `package.json` contiene solo la lista delle librerie (che cambia raramente durante lo sviluppo quotidiano). Docker riutilizza l\'installazione in cache (Passo 2) e riesegue solo la copia finale dei file di codice (Passo 3). (Richiede **<1 secondo**).'
      }
    },
    {
      type: 'table',
      title: {
        en: '📊 Cache Performance Comparison',
        it: '📊 Confronto Prestazioni Cache'
      },
      content: {
        en: 'This table shows the build time comparison under different scenarios:',
        it: 'Questa tabella mostra il confronto del tempo di build in diversi scenari:'
      },
      tableData: {
        headers: [
          { en: 'Scenario', it: 'Scenario' },
          { en: '❌ Unoptimized Dockerfile', it: '❌ Dockerfile Non Ottimizzato' },
          { en: '✅ Optimized Dockerfile', it: '✅ Dockerfile Ottimizzato' }
        ],
        rows: [
          [
            { en: 'First build (fresh)', it: 'Prima build (da zero)' },
            { en: 'Takes ~2 minutes', it: 'Richiede ~2 minuti' },
            { en: 'Takes ~2 minutes', it: 'Richiede ~2 minuti' }
          ],
          [
            { en: 'Code modification (e.g. index.html)', it: 'Modifica al codice (es. index.html)' },
            { en: 'Takes ~2 minutes (re-runs install)', it: 'Richiede ~2 minuti (riesegue install)' },
            { en: 'Takes <1 second (uses cache ⚡)', it: 'Richiede <1 secondo (usa la cache ⚡)' }
          ],
          [
            { en: 'Dependency change (added package)', it: 'Modifica alle dipendenze (nuovo pacchetto)' },
            { en: 'Takes ~2 minutes', it: 'Richiede ~2 minuti' },
            { en: 'Takes ~2 minutes (clean install)', it: 'Richiede ~2 minuti (installazione pulita)' }
          ]
        ]
      }
    },
    {
      type: 'concept',
      title: {
        en: '⚡ The --no-cache Flag & Build Context',
        it: '⚡ Il Flag --no-cache e il Contesto di Build'
      },
      content: {
        en: 'If you need a completely fresh build without using any cached layers, use the **`--no-cache`** flag:\n\n`docker build --no-cache -t my-app .`\n\n💡 **The Dot `.` represents the Build Context:** That final dot is mandatory. It tells Docker to look in the **current directory** for the `Dockerfile` and the files to copy. Omitting the dot is a common mistake that will crash the build!',
        it: 'Se hai bisogno di una build pulita senza usare i layer in cache, aggiungi il flag **`--no-cache`**:\n\n`docker build --no-cache -t my-app .`\n\n💡 **Il punto `.` rappresenta il Contesto di Build:** Quel punto finale è obbligatorio. Indica a Docker di cercare nella **cartella corrente** il `Dockerfile` e i file da copiare. Dimenticarlo è un errore tipico che bloccherà la build!'
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
