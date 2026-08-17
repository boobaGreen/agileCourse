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
      type: 'concept',
      title: {
        en: '📦 The 3 Volume & Mount Types in Docker',
        it: '📦 Le 3 Modalità di Storage in Docker'
      },
      content: {
        en: 'Docker provides 3 distinct ways to mount storage into a container:\n\n' +
            '1. **Bind Mounts** (Host Path : Container Path ➔ `-v /host/path:/container/path`):\n' +
            '   * You specify **both** the exact host folder path and the container path.\n' +
            '   * **Best for:** Sharing source code between laptop and container during development (live-reloading).\n\n' +
            '2. **Anonymous Volumes** (Container Path Only ➔ `-v /container/path`):\n' +
            '   * You specify **only** the container path. Docker creates a hidden folder with a random hash ID.\n' +
            '   * **Drawback:** Hard to track; becomes orphaned ("dangling") when the container is deleted.\n\n' +
            '3. **Named Volumes** (Volume Name : Container Path ➔ `-v volume-name:/container/path`):\n' +
            '   * You assign an explicit **volume name** and container path. Docker manages the host directory securely under `/var/lib/docker/volumes/`.\n' +
            '   * **Best for:** Database data in production. Data persists even if the container is destroyed!',
        it: 'Docker offre 3 modalità ben distinte per montare lo storage in un container:\n\n' +
            '1. **Bind Mounts** (Path Host : Path Container ➔ `-v /path/host:/path/container`):\n' +
            '   * Specifichi **sia il percorso preciso dell\'Host che del Container**.\n' +
            '   * **Uso ideale:** Condividere il codice sorgente per il live-reloading durante lo sviluppo.\n\n' +
            '2. **Anonymous Volumes** (Solo Path Container ➔ `-v /path/container`):\n' +
            '   * Specifichi **solo la cartella del container**. Docker crea una cartella nell\'host contrassegnata da un ID alfanumerico casuale.\n' +
            '   * **Svantaggio:** Difficile da tracciare; rischia di rimanere orfano ("dangling") quando si rimuove il container.\n\n' +
            '3. **Named Volumes** (Nome Volume : Path Container ➔ `-v mio-volume:/path/container`):\n' +
            '   * Assegni un **nome identificativo al volume**. Docker gestisce la cartella fisica in un\'area sicura del sistema (`/var/lib/docker/volumes/`).\n' +
            '   * **Uso ideale:** Database in produzione. I dati sopravvivono anche se il container viene eliminato!'
      }
    },
    {
      type: 'table',
      title: {
        en: '⚖️ Comparing the 3 Storage Modes',
        it: '⚖️ Confronto tra le 3 Modalità di Storage'
      },
      content: {
        en: 'Understanding when to use each type of storage:',
        it: 'Comprendere quando utilizzare ciascun tipo di archiviazione:'
      },
      tableData: {
        headers: [
          { en: 'Storage Mode', it: 'Modalità Storage' },
          { en: 'Syntax Example', it: 'Esempio Sintassi' },
          { en: 'Managed By', it: 'Gestito Da' },
          { en: 'Best Use Case', it: 'Caso d\'Uso Ideale' }
        ],
        rows: [
          [
            { en: '**1. Bind Mount** 📂', it: '**1. Bind Mount** 📂' },
            { en: '`-v $(pwd)/src:/app/src`', it: '`-v $(pwd)/src:/app/src`' },
            { en: 'Developer (Host path)', it: 'Sviluppatore (Path host)' },
            { en: 'Live-reloading source code in dev', it: 'Live-reload del codice sorgente in sviluppo' }
          ],
          [
            { en: '**2. Anonymous Volume** ❓', it: '**2. Anonymous Volume** ❓' },
            { en: '`-v /var/lib/postgresql/data`', it: '`-v /var/lib/postgresql/data`' },
            { en: 'Docker (Random Hash ID)', it: 'Docker (ID Hash casuale)' },
            { en: 'Temporary container data isolation', it: 'Isolamento temporaneo dati container' }
          ],
          [
            { en: '**3. Named Volume** 🗃️', it: '**3. Named Volume** 🗃️' },
            { en: '`-v dbstore:/var/lib/postgresql/data`', it: '`-v dbstore:/var/lib/postgresql/data`' },
            { en: 'Docker (Explicit Name)', it: 'Docker (Nome esplicito)' },
            { en: 'Persistent Database storage in production', it: 'Persistenza Database in produzione' }
          ]
        ]
      }
    },
    {
      type: 'game',
      title: {
        en: 'Lab: The Immortal Volume',
        it: 'Lab: Il Volume Immortale'
      },
      content: {
        en: 'In this lab, you will create a named volume and connect it to a database. If the container dies, the volume remains!',
        it: 'In questo lab creerei un volume con nome (Named Volume) e lo collegherai a un database. Se il container viene distrutto, il volume rimane intatto!'
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
              en: 'Create a named volume called "dbstore"',
              it: 'Crea un volume con nome chiamato "dbstore"'
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
              en: 'Run a postgres container using that named volume: `-v dbstore:/var/lib/postgresql/data`',
              it: 'Esegui un container postgres usando quel volume con nome: `-v dbstore:/var/lib/postgresql/data`'
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
