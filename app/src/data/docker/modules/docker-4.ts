import type { Module } from '../../types'

export const docker4: Module = {
  id: 'docker-4',
  track: 'docker',
  order: 4,
  title: {
    en: 'Docker Hub & Registries',
    it: 'Docker Hub e Registri'
  },
  subtitle: {
    en: 'The App Store for Containers',
    it: 'L\'App Store dei Container'
  },
  emoji: '🗄️',
  duration: '15 min',
  xpReward: 80,
  sections: [
    {
      type: 'intro',
      content: {
        en: 'You don\'t have to build everything yourself. **Docker Hub** is the central public registry where millions of pre-built images live. From basic Linux distributions to giant databases, it\'s the App Store for developers.',
        it: 'Non devi costruire tutto da solo. **Docker Hub** è il registro pubblico centrale in cui risiedono milioni di immagini pre-compilate. Dalle distribuzioni Linux di base ai grandi database, è l\'App Store per gli sviluppatori.'
      }
    },
    {
      type: 'concept',
      title: {
        en: '🏠 Public vs Private Registries',
        it: '🏠 Registri Pubblici vs Privati'
      },
      content: {
        en: 'Docker Hub is the default, public registry. But companies usually use **Private Registries** (like AWS ECR, Google GCR, or GitHub Container Registry) to keep their proprietary app images safe and secret.',
        it: 'Docker Hub è il registro pubblico predefinito. Le aziende usano solitamente **Registri Privati** (come AWS ECR, Google GCR o GitHub Container Registry) per mantenere riservate le proprie immagini applicative.'
      }
    },
    {
      type: 'video',
      title: {
        en: '📺 Sharing Docker Images',
        it: '📺 Condividere Immagini Docker'
      },
      content: {
        en: 'Learn how to pull, tag, and push images to registries like a professional.',
        it: 'Impara a scaricare, etichettare e caricare immagini sui registry come un professionista.'
      },
      videoUrl: 'https://www.youtube.com/watch?v=mAzHELZWE-Y'
    },
    {
      type: 'table',
      title: {
        en: '🏷️ Image Tags & Best Practices',
        it: '🏷️ Tag delle Immagini e Best Practice'
      },
      content: {
        en: 'Versioning your images is absolutely crucial for stability. The suffix after the colon `:` is the tag.',
        it: 'Gestire le versioni delle immagini è fondamentale per la stabilità. Il suffisso dopo i due punti `:` è il tag.'
      },
      tableData: {
        headers: [
          { en: 'Tag Strategy', it: 'Strategia di Tag' },
          { en: 'Example', it: 'Esempio' },
          { en: 'When to use', it: 'Quando usarlo' },
          { en: 'Risk Level', it: 'Livello di Rischio' }
        ],
        rows: [
          [
            { en: '**Exact Semantic**', it: '**Semantico Esatto**' },
            { en: '`node:18.17.0`', it: '`node:18.17.0`' },
            { en: 'Production environments & CI/CD', it: 'Ambienti di produzione e CI/CD' },
            { en: '🟢 Lowest', it: '🟢 Minimo' }
          ],
          [
            { en: '**Minor Version**', it: '**Versione Minor**' },
            { en: '`node:18`', it: '`node:18`' },
            { en: 'Development, accepting small updates', it: 'Sviluppo locale, accetta piccoli update' },
            { en: '🟡 Medium', it: '🟡 Medio' }
          ],
          [
            { en: '**Latest**', it: '**Latest**' },
            { en: '`node:latest`', it: '`node:latest`' },
            { en: 'Trying things quickly locally', it: 'Test veloci in locale' },
            { en: '🔴 High (Never in Prod)', it: '🔴 Alto (Mai in Produzione)' }
          ]
        ]
      }
    },
    {
      type: 'flowchart',
      content: {
        en: '**The Push & Pull Cycle**',
        it: '**Il Ciclo di Push e Pull**'
      },
      diagramSteps: [
        { label: { en: 'Developer Laptop\n(docker push)', it: 'Computer Sviluppatore\n(docker push)' }, icon: '💻', color: '#ffb703' },
        { label: { en: 'Docker Hub\n(The Cloud Registry)', it: 'Docker Hub\n(Il Registry Cloud)' }, icon: '☁️', color: '#118ab2' },
        { label: { en: 'Prod Server\n(docker pull)', it: 'Server di Produzione\n(docker pull)' }, icon: '🖥️', color: '#06d6a0' }
      ]
    },
    {
      type: 'table',
      title: {
        en: '🛠️ Command Reference: Registries & Publishing',
        it: '🛠️ Riferimento Comandi: Registry e Pubblicazione'
      },
      content: {
        en: 'Memorize these 3 core commands used to manage remote image repositories:',
        it: 'Memorizza questi 3 comandi fondamentali usati per gestire i repository di immagini remoti:'
      },
      tableData: {
        headers: [
          { en: 'Command', it: 'Comando' },
          { en: 'Purpose', it: 'Scopo' },
          { en: 'Example', it: 'Esempio' }
        ],
        rows: [
          [
            { en: '**docker tag**', it: '**docker tag**' },
            { en: 'Labels a local image with a username/repository name before pushing', it: 'Etichetta un\'immagine locale con il nome utente/repository prima del caricamento' },
            { en: '`docker tag webapp:latest alexdev/webapp:1.0.0`', it: '`docker tag webapp:latest alexdev/webapp:1.0.0`' }
          ],
          [
            { en: '**docker push**', it: '**docker push**' },
            { en: 'Uploads the tagged image to Docker Hub or remote registry', it: 'Carica l\'immagine etichettata su Docker Hub o registry remoto' },
            { en: '`docker push alexdev/webapp:1.0.0`', it: '`docker push alexdev/webapp:1.0.0`' }
          ],
          [
            { en: '**docker pull**', it: '**docker pull**' },
            { en: 'Downloads an image from Docker Hub to your laptop', it: 'Scarica un\'immagine da Docker Hub sulla tua macchina locale' },
            { en: '`docker pull alexdev/webapp:1.0.0`', it: '`docker pull alexdev/webapp:1.0.0`' }
          ]
        ]
      }
    },
    {
      type: 'game',
      title: {
        en: 'Lab: Publish to the World',
        it: 'Lab: Pubblica nel Mondo'
      },
      content: {
        en: 'In this simulator, you will prepare an image for the cloud. Tag your local image with semantic version 1.0.0 and "push" it to simulate a registry upload.',
        it: 'In questo simulatore preparerai un\'immagine per il cloud. Etichetta la tua immagine locale con la versione semantica 1.0.0 ed eseguine il "push" per simulare il caricamento sul registry.'
      },
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-app', name: 'myapp', tag: '1.0.0', size: '180MB' }],
          containers: []
        },
        tasks: [
          {
            id: '1',
            instruction: {
              en: 'Tag "myapp:1.0.0" as "devguru/myapp:1.0.0"',
              it: 'Etichetta "myapp:1.0.0" come "devguru/myapp:1.0.0"'
            },
            condition: 'PULLED:devguru/myapp',
            hints: [
              {
                en: '💡 Hint 1/3 (Conceptual): Use `docker tag` to assign a user repository name to your local image.',
                it: '💡 Aiuto 1/3 (Concettuale): Usa `docker tag` per assegnare il nome del repository utente alla tua immagine locale.'
              },
              {
                en: '💡 Hint 2/3 (Syntax): Specify the source image first, then the target image tag.',
                it: '💡 Aiuto 2/3 (Sintassi): Specifica prima l\'immagine sorgente e poi il tag dell\'immagine target.'
              },
              {
                en: '💡 Hint 3/3 (Full Solution): Type `docker tag myapp:1.0.0 devguru/myapp:1.0.0` in the CLI terminal.',
                it: '💡 Aiuto 3/3 (Soluzione Completa): Digita `docker tag myapp:1.0.0 devguru/myapp:1.0.0` nel terminale CLI.'
              }
            ]
          },
          {
            id: '2',
            instruction: {
              en: 'Push the new tagged image to Docker Hub',
              it: 'Carica (push) la nuova immagine etichettata su Docker Hub'
            },
            condition: 'PUSHED:devguru/myapp',
            hints: [
              {
                en: '💡 Hint 1/3 (Conceptual): Use `docker push` to upload an image to Docker Hub.',
                it: '💡 Aiuto 1/3 (Concettuale): Usa `docker push` per caricare un\'immagine su Docker Hub.'
              },
              {
                en: '💡 Hint 2/3 (Syntax): Pass the newly tagged image name `devguru/myapp:1.0.0`.',
                it: '💡 Aiuto 2/3 (Sintassi): Passa il nome della nuova immagine appena etichettata `devguru/myapp:1.0.0`.'
              },
              {
                en: '💡 Hint 3/3 (Full Solution): Type `docker push devguru/myapp:1.0.0` in the CLI terminal.',
                it: '💡 Aiuto 3/3 (Soluzione Completa): Digita `docker push devguru/myapp:1.0.0` nel terminale CLI.'
              }
            ]
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-4-q1',
      question: {
        en: 'Why is using the `:latest` tag in a production deployment considered dangerous?',
        it: 'Perché l\'uso del tag `:latest` in un deployment di produzione è considerato pericoloso?'
      },
      options: [
        {
          en: 'It costs more money to use the latest tag',
          it: 'Costa più denaro utilizzare il tag latest'
        },
        {
          en: 'It is a mutable tag; it can point to a completely different, breaking version tomorrow',
          it: 'È un tag mutabile; domani potrebbe puntare a una versione completamente diversa e distruttiva'
        },
        {
          en: 'The latest tag disables Docker\'s security sandbox',
          it: 'Il tag latest disabilita la sandbox di sicurezza di Docker'
        },
        {
          en: 'The latest tag bypasses cache and takes hours to pull',
          it: 'Il tag latest ignora la cache e richiede ore per il caricamento'
        }
      ],
      correct: 1,
      explanation: {
        en: '`:latest` simply points to whatever image was most recently uploaded. An update could introduce a breaking change overnight. Pinning exact versions (like `:1.14.2`) makes your deployments predictable.',
        it: '`:latest` punta semplicemente a qualsiasi immagine sia stata caricata più di recente. Un aggiornamento potrebbe introdurre una breaking change da un giorno all\'altro. Fissare versioni esatte (come `:1.14.2`) rende i deployment prevedibili.'
      }
    },
    {
      id: 'docker-4-q2',
      question: {
        en: 'What command prepares a local image to be pushed to a specific remote organization or user account?',
        it: 'Quale comando prepara un\'immagine locale per essere caricata su uno specifico account utente o organizzazione remota?'
      },
      options: [
        {
          en: 'docker push',
          it: 'docker push'
        },
        {
          en: 'docker rename',
          it: 'docker rename'
        },
        {
          en: 'docker tag',
          it: 'docker tag'
        },
        {
          en: 'docker commit',
          it: 'docker commit'
        }
      ],
      correct: 2,
      explanation: {
        en: 'You use `docker tag local_image user_name/repo_name:tag` to correctly label the image so the Docker Engine knows exactly where to route the upload.',
        it: 'Si usa `docker tag immagine_locale nome_utente/nome_repo:tag` per etichettare correttamente l\'immagine in modo che il Docker Engine sappia esattamente dove indirizzare il caricamento.'
      }
    },
    {
      id: 'docker-4-q3',
      question: {
        en: 'What happens if you run `docker pull ubuntu` without specifying a tag after the colon?',
        it: 'Cosa succede se esegui `docker pull ubuntu` senza specificare un tag dopo i due punti?'
      },
      options: [
        {
          en: 'Docker throws a syntax error and aborts',
          it: 'Docker restituisce un errore di sintassi e interrompe il comando'
        },
        {
          en: 'Docker automatically appends and pulls the default `:latest` tag',
          it: 'Docker applica e scarica automaticamente il tag predefinito `:latest`'
        },
        {
          en: 'Docker downloads all available historical versions of Ubuntu',
          it: 'Docker scarica tutte le versioni storiche disponibili di Ubuntu'
        },
        {
          en: 'Docker prompts you to select a version interactively',
          it: 'Docker ti chiede di selezionare una versione in modo interattivo'
        }
      ],
      correct: 1,
      explanation: {
        en: 'When no tag is explicitly provided in a pull command, Docker automatically defaults to downloading the `:latest` tag.',
        it: 'Quando non si specifica esplicitamente alcun tag in un comando pull, Docker assegna ed esegue di default il tag `:latest`.'
      }
    }
  ]
}
