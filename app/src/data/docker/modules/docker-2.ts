import type { Module } from '../../types'

export const docker2: Module = {
  id: 'docker-2',
  track: 'docker',
  order: 2,
  title: 'Images vs Containers',
  subtitle: 'Blueprint vs Live Instance',
  emoji: '🖼️',
  duration: '20 min',
  xpReward: 120,
  funFact: 'Docker Images are read-only. When you run one, Docker puts a tiny read-write layer on top of it. This is why you can run 10 containers from a 1GB image without using 10GB of disk space!',
  sections: [
    {
      type: 'intro',
      content: 'This is the most critical concept to master: the difference between an Image and a Container. If you understand this, everything else in Docker makes sense.'
    },
    {
      type: 'concept',
      title: '🖼️ The Image (The Blueprint)',
      content: 'An image is a **read-only** template. It contains the OS libraries, the app code, and the runtime. It doesn\'t "run" — it just sits on your disk. Think of it as a recipe in a cookbook, or an ISO file.'
    },
    {
      type: 'concept',
      title: '📦 The Container (The Running Instance)',
      content: 'A container is a **runnable instance** of an image. When you "run" an image, it becomes a container. You can have 100 isolated containers independently running from the same 1 image. Think of the container as the actual pizza baked using the recipe. Deleting a container does not affect the read-only image it was built from.'
    },
    {
      type: 'animation',
      title: {
        en: '🍕 Docker Pizza & Container Simulator',
        it: '🍕 Simulatore Docker Pizza & Container'
      },
      animationType: 'docker-pizza',
      content: {
        en: 'Bake multiple pizzas (containers) from a single recipe (image). Customize toppings (read-write layer) independently, and witness container isolation!',
        it: 'Inforna più pizze (container) da una singola ricetta (immagine). Personalizza i condimenti (layer di lettura/scrittura) in modo indipendente e sperimenta l\'isolamento dei container!'
      }
    },
    {
      type: 'concept',
      title: '🍰 The Layer Cake Architecture',
      content: 'Docker images are made of **layers**. Every command in a build process creates a new small layer. If you change your code but not your libraries, Docker only updates the code layer. This makes images incredibly fast to build and share over the network!'
    },
    {
      type: 'animation',
      title: {
        en: '🍰 Layer Cake Architecture Visualizer',
        it: '🍰 Visualizzatore dell\'Architettura a Layer'
      },
      animationType: 'docker-layers',
      content: {
        en: 'Observe how the read-write container layer stacks dynamically on top of the read-only blueprint layers.',
        it: 'Osserva come il layer scrivibile del container si sovrappone in modo dinamico ai layer in sola lettura dell\'immagine.'
      }
    },
    {
      type: 'game',
      title: {
        en: 'Challenge: Identify the Layer',
        it: 'Sfida: Identifica il Layer'
      },
      content: {
        en: 'Correctly identify where each architectural component belongs in a Docker system.',
        it: 'Identifica correttamente dove si posiziona ciascun componente nell\'architettura di Docker.'
      },
      gameType: 'drag-classify',
      gameData: {
        categories: [
          { 
            id: 'readonly', 
            label: {
              en: 'Read-Only (The Image)',
              it: 'Sola Lettura (L\'Immagine)'
            }
          },
          { 
            id: 'writeable', 
            label: {
              en: 'Writeable (The Container)',
              it: 'Scrivibile (Il Container)'
            }
          }
        ],
        items: [
          { 
            id: 'os', 
            label: {
              en: 'Base Operating System (Ubuntu)',
              it: 'Sistema Operativo Base (Ubuntu)'
            }, 
            categoryId: 'readonly' 
          },
          { 
            id: 'node', 
            label: {
              en: 'Node.js Runtime / Interpreters',
              it: 'Runtime Node.js / Interpreti'
            }, 
            categoryId: 'readonly' 
          },
          { 
            id: 'code', 
            label: {
              en: 'Compiled React App Code',
              it: 'Codice Compilato dell\'App React'
            }, 
            categoryId: 'readonly' 
          },
          { 
            id: 'logs', 
            label: {
              en: 'Runtime Application Logs',
              it: 'Log dell\'Applicazione a Runtime'
            }, 
            categoryId: 'writeable' 
          },
          { 
            id: 'temp', 
            label: {
              en: 'Temporary Cached Files (Uploads/Temp)',
              it: 'File Temporanei di Cache (Upload/Temp)'
            }, 
            categoryId: 'writeable' 
          }
        ]
      }
    },
    {
      type: 'concept',
      title: {
        en: '🐳 Bridging Analogy to Commands: CLI Basics',
        it: '🐳 Dall\'Analogia ai Comandi: Le Basi della CLI'
      },
      content: {
        en: 'Now let\'s translate our recipe and pizza analogy into real-world Docker terminal commands:\n\n' +
            '* **`docker pull <image>`**: Downloads the read-only image (the recipe) from Docker Hub (the public cookbook) to your machine.\n' +
            '* **`docker run -d <image>`**: Creates and runs a new container (bakes a pizza) from the image. The **`-d`** flag runs it in **detached mode** (in the background), freeing up your terminal.\n' +
            '* **`docker stop <container-id>`**: Gracefully shuts down the running container (stops the live instance) without deleting it.',
        it: 'Ora traduciamo l\'analogia della ricetta e della pizza nei veri comandi del terminale Docker:\n\n' +
            '* **`docker pull <immagine>`**: Scarica l\'immagine in sola lettura (la ricetta) da Docker Hub (il ricettario pubblico) sul tuo computer.\n' +
            '* **`docker run -d <immagine>`**: Crea e avvia un nuovo container (inforna la pizza) a partire dall\'immagine. Il flag **`-d`** lo esegue in **detached mode** (in background), lasciando libero il tuo terminale.\n' +
            '* **`docker stop <id-container>`**: Arresta in modo sicuro il container in esecuzione (ferma l\'istanza attiva) senza eliminarlo.'
      }
    },
    {
      type: 'game',
      title: 'Lab: Your First Container',
      content: 'Let\'s pull an image and run it. In this simulator, commands actually update the visual state of your "Docker Host".',
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [],
          containers: []
        },
        tasks: [
          { id: '1', instruction: 'Pull the official "nginx" image', condition: 'PULLED:nginx' },
          { id: '2', instruction: 'Run a detached container from the nginx image', condition: 'RUNNING:nginx' },
          { id: '3', instruction: 'Try to stop the container (docker stop [id/name])', condition: 'STOPPED:nginx' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-2-q1',
      question: {
        en: 'An Image is to a Container as a...',
        it: 'Un\'Immagine sta a un Container come...'
      },
      options: [
        {
          en: 'Physical computer is to a peripheral mouse',
          it: 'Un computer fisico sta a un mouse periferico'
        },
        {
          en: 'Recipe is to a baked and ready-to-eat Pizza',
          it: 'Una ricetta sta a una pizza sfornata e pronta da mangiare'
        },
        {
          en: 'Single file is to a nested project folder',
          it: 'Un singolo file sta a una cartella di progetto nidificata'
        },
        {
          en: 'Logged-in user is to an encrypted password',
          it: 'Un utente connesso sta a una password crittografata'
        }
      ],
      correct: 1,
      explanation: {
        en: 'An image is a static template (recipe). A container is a live, running instance of that template (pizza).',
        it: 'Un\'immagine è un template statico (ricetta). Un container è un\'istanza attiva e funzionante di quel template (pizza).'
      }
    },
    {
      id: 'docker-2-q2',
      question: {
        en: 'What happens to the underlying Image when a Container is deleted?',
        it: 'Cosa succede all\'Immagine sottostante quando un Container viene eliminato?'
      },
      options: [
        {
          en: 'The image and all its layers are also deleted',
          it: 'Anche l\'immagine e tutti i suoi layer vengono eliminati'
        },
        {
          en: 'The image remains completely and safely unchanged',
          it: 'L\'immagine rimane completamente e in sicurezza inalterata'
        },
        {
          en: 'The image loses its most recent read-only layer',
          it: 'L\'immagine perde il suo layer in sola lettura più recente'
        },
        {
          en: 'The image file size gets larger on the local disk',
          it: 'La dimensione del file dell\'immagine aumenta sul disco locale'
        }
      ],
      correct: 1,
      explanation: {
        en: 'Images are immutable (read-only). Containers are temporary. Deleting a container safely discards its read-write layer, leaving the template image untouched.',
        it: 'Le immagini sono immutabili (sola lettura). I container sono temporanei. Eliminando un container si rimuove in modo sicuro il suo layer di lettura/scrittura, lasciando inalterata l\'immagine.'
      }
    },
    {
      id: 'docker-2-q3',
      question: {
        en: 'Why can you run multiple independent containers from a single image without duplicating disk space?',
        it: 'Perché puoi avviare più container indipendenti a partire da una singola immagine senza duplicare lo spazio su disco?'
      },
      options: [
        {
          en: 'Each container shares the read-only image layers and only creates its own thin, temporary writeable layer',
          it: 'Ogni container condivide i layer in sola lettura dell\'immagine e crea solo un proprio sottile layer temporaneo scrivibile'
        },
        {
          en: 'Docker automatically compresses the host operating system kernel for each instance',
          it: 'Docker comprime automaticamente il kernel del sistema operativo host per ciascuna istanza'
        },
        {
          en: 'Stopped containers immediately delete all their files from the disk to save space',
          it: 'I container arrestati eliminano immediatamente tutti i loro file dal disco per risparmiare spazio'
        },
        {
          en: 'Docker stores all new files and logs on a remote cloud server instead of the local machine',
          it: 'Docker memorizza tutti i nuovi file e i log su un server cloud remoto invece che sulla macchina locale'
        }
      ],
      correct: 0,
      explanation: {
        en: 'Docker images are immutable and shared. When you run a container, Docker only adds a thin writeable layer on top for that specific instance. All base image layers are shared in-memory and on-disk across all running containers.',
        it: 'Le immagini Docker sono immutabili e condivise. Quando avvii un container, Docker aggiunge solo un sottile layer scrivibile in cima per quella specifica istanza. Tutti i layer dell\'immagine di base sono condivisi in memoria e su disco tra tutti i container in esecuzione.'
      }
    }
  ]
}
