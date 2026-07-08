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
      type: 'infographic',
      title: {
        en: '🖼️ Infographic: Docker Build Cache Explained',
        it: '🖼️ Infografica: Come funziona la Cache di Build'
      },
      content: {
        en: 'This infographic compares the unoptimized way vs the optimized way of structuring your Dockerfile. Notice how changing the code invalidates everything above it in the stack.',
        it: 'Questa infografica confronta il metodo non ottimizzato con quello ottimizzato per strutturare il tuo Dockerfile. Nota come la modifica del codice invalida tutto ciò che si trova sopra nello stack.'
      },
      imageUrl: '/docker_cache_infographic.png'
    },
    {
      type: 'concept',
      title: {
        en: '⚡ Understanding the Build Cache (The LEGO Analogy)',
        it: '⚡ Capire la Cache di Build (L\'Analogia dei Mattoncini LEGO)'
      },
      content: {
        en: 'Think of the Docker build cache like building a tower with LEGO bricks. Each instruction in your `Dockerfile` (like `FROM`, `COPY`, or `RUN`) is a brick in that tower.\n\n* **Docker caches each brick:** If you haven\'t changed anything, Docker simply reuses the existing brick (skipping the step instantly).\n* **The Cascade Effect:** If you modify a brick in the middle of the tower, every single layer built *on top of it* must also be completely rebuilt.\n\n---\n\n💻 **Why copying package.json separately matters:**\n\n1. **❌ The Unoptimized Way (Slow Build):**\n   If you copy your whole project folder (`COPY . .`) *before* running `npm install`, then any single character edit in your code (like `index.html`) invalidates the copy brick. Docker is forced to re-run the slow `npm install` and download 500MB of libraries again!\n\n2. **✅ The Optimized Way (Fast Build):**\n   If you copy only `package.json` first, run `npm install`, and *then* copy the rest of your files, the heavy library installation brick stays cached and skipped, because `package.json` hasn\'t changed! Only the tiny final code copy brick is rebuilt in a fraction of a second.',
        it: 'Pensa alla cache di build di Docker come alla costruzione di una torre con i mattoncini LEGO. Ogni istruzione nel tuo `Dockerfile` (come `FROM`, `COPY` o `RUN`) rappresenta un mattoncino in quella torre.\n\n* **Docker salva in cache ogni mattoncino:** Se non hai modificato nulla, Docker riutilizza semplicemente il mattoncino esistente (saltando istantaneamente il passaggio).\n* **L\'Effetto a Cascata:** Se modifichi un mattoncino nel mezzo della torre, anche tutti i mattoncini posizionati *sopra di esso* dovranno essere completamente ricostruiti.\n\n---\n\n💻 **Perché copiare package.json separatamente fa la differenza:**\n\n1. **❌ La via non ottimizzata (Build lenta):**\n   Se copi l\'intera cartella del progetto (`COPY . .`) *prima* di eseguire `npm install`, qualsiasi singola modifica al codice (es. correggere un testo in `index.html`) invaliderà quel mattoncino. Docker sarà costretto a rieseguire il lento `npm install` riscaricando 500MB di librerie da zero!\n\n2. **✅ La via ottimizzata (Build veloce):**\n   Se copi prima solo il file `package.json`, esegui `npm install`, e *dopo* copi il resto dei file, il passaggio pesante dell\'installazione rimarrà in cache e verrà saltato, perché il file `package.json` non è cambiato! Solo l\'ultimo piccolo mattoncino del codice verrà ricostruito in una frazione di secondo.'
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
