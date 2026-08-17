import type { Module } from '../../types'

export const docker5: Module = {
  id: 'docker-5',
  track: 'docker',
  order: 5,
  title: {
    en: 'Volumes & Persistence',
    it: 'Volumi e Persistenza'
  },
  subtitle: {
    en: 'Where does the database data go?',
    it: 'Dove finiscono i dati del database?'
  },
  emoji: '💾',
  duration: '20 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: {
        en: 'Containers are meant to be **ephemeral** (temporary). If you delete a database container, everything on its internal disk is wiped out. To save our actual user data, we must bridge the gap to the Host machine\'s physical disk.',
        it: 'I container sono progettati per essere **effimeri** (temporanei). Se elimini un container di database, tutto ciò che si trova sul suo disco interno viene distrutto. Per salvare i dati degli utenti, dobbiamo collegare il container al disco fisico del computer Host.'
      }
    },
    {
      type: 'concept',
      title: {
        en: '🧱 The Problem: The Writable Layer',
        it: '🧱 Il Problema: Il Writable Layer'
      },
      content: {
        en: 'When a container writes a file to its own disk, that file exists in a temporary "writable layer". If the container is destroyed, or crashes, the layer is destroyed.',
        it: 'Quando un container scrive un file sul proprio disco, quel file risiede in un "writable layer" temporaneo. Se il container viene distrutto o si arresta in modo anomalo, quel layer viene eliminato per sempre.'
      }
    },
    {
      type: 'flowchart',
      content: {
        en: '**Ephemeral Data (Dangerous ❌)**',
        it: '**Dati Effimeri (Pericoloso ❌)**'
      },
      diagramSteps: [
        { label: { en: 'PostgreSQL\n(Running Container)', it: 'PostgreSQL\n(Container Attivo)' }, icon: '🐘', color: '#ffb703' },
        { label: { en: 'Writes to\nContainer Disk', it: 'Scrive sul Disco\ndel Container' }, icon: '📝', color: '#ff4b4b' },
        { label: { en: 'Container Demolished\n(docker rm)', it: 'Container Eliminato\n(docker rm)' }, icon: '💥', color: '#ff4b4b' },
        { label: { en: 'Data is\nGone Forever!', it: 'Dati Persi\nper Sempre!' }, icon: '💀', color: '#000000' }
      ]
    },
    {
      type: 'video',
      title: {
        en: '📺 Docker Volumes Masterclass',
        it: '📺 Masterclass sui Volumi Docker'
      },
      content: {
        en: 'A deep dive into how data permanence works in Docker environments.',
        it: 'Un\'analisi approfondita su come funziona la persistenza dei dati negli ambienti Docker.'
      },
      videoUrl: 'https://www.youtube.com/watch?v=p2PH_YPCsis'
    },
    {
      type: 'table',
      title: {
        en: '📦 The 3 Volume & Mount Types in Docker',
        it: '📦 Le 3 Modalità di Storage in Docker'
      },
      content: {
        en: 'Docker provides 3 distinct ways to mount storage into a container depending on what parameters you pass to the `-v` flag:',
        it: 'Docker offre 3 modalità distinte per montare lo storage in un container in base ai parametri passati al flag `-v`:'
      },
      tableData: {
        headers: [
          { en: 'Storage Mode', it: 'Modalità Storage' },
          { en: 'Full CLI Command Example', it: 'Esempio Comando CLI Completo' },
          { en: 'Parameter Structure (-v)', it: 'Struttura Parametro (-v)' },
          { en: 'Best Use Case', it: 'Caso d\'Uso Ideale' }
        ],
        rows: [
          [
            { en: '**1. Bind Mount** 📂', it: '**1. Bind Mount** 📂' },
            { en: '`docker run -v /host/path:/container/path nginx`', it: '`docker run -v /path/host:/path/container nginx`' },
            { en: 'Host Path : Container Path', it: 'Path Host : Path Container' },
            { en: '⚡ Sharing source code for live-reloading in dev', it: '⚡ Live-reload del codice sorgente in sviluppo' }
          ],
          [
            { en: '**2. Anonymous Volume** ❓', it: '**2. Anonymous Volume** ❓' },
            { en: '`docker run -v /var/lib/postgresql/data postgres`', it: '`docker run -v /var/lib/postgresql/data postgres`' },
            { en: 'Container Path Only (Random Hash ID)', it: 'Solo Path Container (ID Hash casuale)' },
            { en: '⚠️ Isolated temporary data (risks orphaned dangling files)', it: '⚠️ Dati temporanei (rischia di lasciare volumi orfani)' }
          ],
          [
            { en: '**3. Named Volume** 🗃️', it: '**3. Named Volume** 🗃️' },
            { en: '`docker run -v dbstore:/var/lib/postgresql/data postgres`', it: '`docker run -v dbstore:/var/lib/postgresql/data postgres`' },
            { en: 'Volume Name : Container Path', it: 'Nome Volume : Path Container' },
            { en: '🔒 Persistent Database storage in production', it: '🔒 Persistenza Database sicura in produzione' }
          ]
        ]
      }
    },
    {
      type: 'table',
      title: {
        en: '🛠️ Command Reference: Managing Named Volumes',
        it: '🛠️ Riferimento Comandi: Gestione dei Volumi con Nome'
      },
      content: {
        en: 'Before mounting a Named Volume, you can create and manage it explicitly using these core Docker CLI commands:',
        it: 'Prima di montare un Named Volume, puoi crearlo e gestirlo esplicitamente usando questi comandi fondamentali della CLI Docker:'
      },
      tableData: {
        headers: [
          { en: 'Command', it: 'Comando' },
          { en: 'Purpose', it: 'Scopo' },
          { en: 'Example', it: 'Esempio' }
        ],
        rows: [
          [
            { en: '**docker volume create**', it: '**docker volume create**' },
            { en: 'Creates a new managed Named Volume on the host disk', it: 'Crea un nuovo Named Volume gestito sul disco dell\'host' },
            { en: '`docker volume create my-data`', it: '`docker volume create my-data`' }
          ],
          [
            { en: '**docker volume ls**', it: '**docker volume ls**' },
            { en: 'Lists all existing volumes managed by Docker', it: 'Elenca tutti i volumi esistenti gestiti da Docker' },
            { en: '`docker volume ls`', it: '`docker volume ls`' }
          ],
          [
            { en: '**docker run -v**', it: '**docker run -v**' },
            { en: 'Mounts the created Named Volume into a container path', it: 'Monta il Named Volume creato all\'interno di un container' },
            { en: '`docker run -v my-data:/var/lib/postgresql/data postgres`', it: '`docker run -v my-data:/var/lib/postgresql/data postgres`' }
          ]
        ]
      }
    },
    {
      type: 'tip',
      title: {
        en: '💡 Explicit vs Automatic Volume Creation',
        it: '💡 Creazione Esplicita vs Automatica dei Volumi'
      },
      content: {
        en: 'Did you know? If you execute `docker run -v my-data:/path postgres` with a volume name that does not exist yet, Docker will **automatically create it** in the background! However, running `docker volume create` explicitly beforehand is the recommended professional practice for clear infrastructure planning.',
        it: 'Lo sapevi? Se esegui `docker run -v my-data:/path postgres` con un nome di volume che non esiste ancora, Docker lo **creerà automaticamente in sottofondo**! Tuttavia, eseguire prima `docker volume create` in modo esplicito è la best practice professionale raccomandata per una chiara gestione dell\'infrastruttura.'
      }
    },
    {
      type: 'game',
      title: {
        en: 'Lab: The Immortal Volume',
        it: 'Lab: Il Volume Immortale'
      },
      content: {
        en: 'In this simulator, you will practice explicit volume creation. First, create a named volume called "dbstore", then attach it to a PostgreSQL database container.',
        it: 'In questo simulatore metterai in pratica la creazione esplicita dei volumi. Per prima cosa, crea un volume con nome chiamato "dbstore", poi collegalo a un container PostgreSQL.'
      },
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-pg', name: 'postgres', tag: 'latest', size: '250MB' }],
          containers: [],
          volumes: []
        },
        tasks: [
          {
            id: '1',
            instruction: {
              en: 'Explicitly create a named volume called "dbstore"',
              it: 'Crea esplicitamente un volume con nome chiamato "dbstore"'
            },
            condition: 'VOLUME_EXISTS:dbstore',
            hints: [
              {
                en: '💡 Hint 1/3 (Conceptual): Use `docker volume create` to create a new managed volume.',
                it: '💡 Aiuto 1/3 (Concettuale): Usa `docker volume create` per creare un nuovo volume gestito.'
              },
              {
                en: '💡 Hint 2/3 (Syntax): Pass the volume name `dbstore` after the create command.',
                it: '💡 Aiuto 2/3 (Sintassi): Passa il nome del volume `dbstore` dopo il comando create.'
              },
              {
                en: '💡 Hint 3/3 (Full Solution): Type `docker volume create dbstore` in the CLI terminal.',
                it: '💡 Aiuto 3/3 (Soluzione Completa): Digita `docker volume create dbstore` nel terminale CLI.'
              }
            ]
          },
          {
            id: '2',
            instruction: {
              en: 'Run a postgres container mounting "dbstore" to "/var/lib/postgresql/data"',
              it: 'Esegui un container postgres montando "dbstore" sulla cartella "/var/lib/postgresql/data"'
            },
            condition: 'CONTAINER_RUNNING:postgres',
            hints: [
              {
                en: '💡 Hint 1/3 (Conceptual): Use `docker run -d` with `-v volume_name:container_path`.',
                it: '💡 Aiuto 1/3 (Concettuale): Usa `docker run -d` col flag `-v nome_volume:path_container`.'
              },
              {
                en: '💡 Hint 2/3 (Syntax): Mount `dbstore` to `/var/lib/postgresql/data` using image `postgres`.',
                it: '💡 Aiuto 2/3 (Sintassi): Monta `dbstore` su `/var/lib/postgresql/data` usando l\'immagine `postgres`.'
              },
              {
                en: '💡 Hint 3/3 (Full Solution): Type `docker run -d -v dbstore:/var/lib/postgresql/data postgres` in the CLI.',
                it: '💡 Aiuto 3/3 (Soluzione Completa): Digita `docker run -d -v dbstore:/var/lib/postgresql/data postgres` nel terminale CLI.'
              }
            ]
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'docker-5-q1',
      question: {
        en: 'What occurs to data saved inside a container\'s writable layer when the container is deleted with `docker rm`?',
        it: 'Cosa succede ai dati salvati all\'interno del layer scrivibile di un container quando viene eseguito `docker rm`?'
      },
      options: [
        {
          en: 'It is backed up to Docker Hub',
          it: 'Vengono salvati come backup su Docker Hub'
        },
        {
          en: 'It is permanently deleted',
          it: 'Vengono eliminati in modo permanente'
        },
        {
          en: 'It is automatically converted to a Named Volume',
          it: 'Vengono convertiti automaticamente in un Named Volume'
        },
        {
          en: 'Nothing, it remains on the hard drive',
          it: 'Nulla, rimangono memorizzati sul disco rigido'
        }
      ],
      correct: 1,
      explanation: {
        en: 'The writable layer is deeply tied to the lifecycle of the container instance. When the container goes, the layer (and all its data) vanishes.',
        it: 'Il layer scrivibile è strettamente legato al ciclo di vita del container. Quando il container viene rimosso, il layer (e tutti i suoi dati) svanisce.'
      }
    },
    {
      id: 'docker-5-q2',
      question: {
        en: 'For a production MySQL database running in Docker, which storage method is strongly recommended?',
        it: 'Per un database MySQL in produzione in esecuzione su Docker, quale metodo di archiviazione è caldamente consigliato?'
      },
      options: [
        {
          en: 'Bind Mounts',
          it: 'Bind Mounts'
        },
        {
          en: 'The default Writable Layer',
          it: 'Il Writable Layer predefinito'
        },
        {
          en: 'Named Volumes',
          it: 'Named Volumes'
        },
        {
          en: 'In-memory RAM allocation',
          it: 'Allocazione in RAM (In-memory)'
        }
      ],
      correct: 2,
      explanation: {
        en: 'Named Volumes are managed entirely by Docker, circumventing host OS file permission issues and providing the safest, most performant way to store persistent database information.',
        it: 'I Named Volume sono gestiti interamente da Docker, evitando problemi di autorizzazione dei file del sistema operativo host e offrendo il modo più sicuro e performante per memorizzare informazioni persistenti del database.'
      }
    },
    {
      id: 'docker-5-q3',
      question: {
        en: 'What is the main drawback of using Anonymous Volumes (`-v /container/path`) without providing a volume name or host path?',
        it: 'Qual è il principale svantaggio dell\'uso di Anonymous Volumes (`-v /path/container`) senza specificare un nome di volume o un percorso host?'
      },
      options: [
        {
          en: 'They are significantly slower than Bind Mounts',
          it: 'Sono significativamente più lenti dei Bind Mount'
        },
        {
          en: 'Docker assigns a random hash ID, making them hard to track and leaving orphaned (dangling) volumes when containers are removed',
          it: 'Docker assegna un ID hash casuale, rendendoli difficili da tracciare e lasciando volumi orfani (dangling) quando i container vengono rimossi'
        },
        {
          en: 'They consume double storage space on Docker Hub',
          it: 'Consumano il doppio dello spazio di archiviazione su Docker Hub'
        },
        {
          en: 'They only function on Linux host machines',
          it: 'Funzionano esclusivamente su macchine host Linux'
        }
      ],
      correct: 1,
      explanation: {
        en: 'Anonymous volumes use random hash directories that are difficult to identify later, often leading to wasted disk space from unused "dangling" volumes.',
        it: 'I volumi anonimi utilizzano cartelle con ID hash casuali difficili da identificare in seguito, causando spesso spreco di spazio su disco a causa di volumi "dangling" inutilizzati.'
      }
    }
  ]
}
