import type { Module } from '../../types'

export const docker9: Module = {
  id: 'docker-9',
  track: 'docker',
  order: 9,
  title: 'Final Docker Challenge',
  subtitle: 'The Whale Master Certification',
  emoji: '🏆',
  duration: '20 min',
  xpReward: 200,
  sections: [
    {
      type: 'intro',
      content: 'Time to prove your container mastery. 10 comprehensive questions covering builds, lifecycle, volumes, networking, and compose. Take your time. Good luck!'
    }
  ],
  quiz: [
    {
      id: 'docker-9-q1',
      question: {
        en: 'Which is NOT a structural benefit of Containers over VMs?',
        it: 'Quale NON è un vantaggio strutturale dei container rispetto alle VM?'
      },
      options: [
        {
          en: 'Lightweight and high-efficiency filesystem layers',
          it: 'Layer del filesystem leggeri e ad alta efficienza'
        },
        {
          en: 'Fraction of a second startup time for new instances',
          it: 'Tempo di avvio inferiore a un secondo per le nuove istanze'
        },
        {
          en: 'Includes a completely isolated Guest OS kernel image',
          it: 'Include un\'immagine del kernel del Guest OS completamente isolata'
        },
        {
          en: 'High portability across different cloud provider environments',
          it: 'Elevata portabilità tra diversi ambienti di cloud provider'
        }
      ],
      correct: 2,
      explanation: {
        en: 'Containers explicitly DO NOT contain a Guest OS kernel; they share the Host OS kernel. That is what makes them lightweight.',
        it: 'I container non contengono esplicitamente un kernel del Guest OS; condividono il kernel dell\'OS host. Questo è ciò che li rende leggeri.'
      }
    },
    {
      id: 'docker-9-q2',
      question: {
        en: 'What is the correct instruction to copy a local file named "server.js" into the "/app" directory of the image during build?',
        it: 'Qual è l\'istruzione corretta per copiare un file locale chiamato "server.js" nella directory "/app" dell\'immagine durante la build?'
      },
      options: [
        'ADD server.js /app',
        'RUN cp server.js /app',
        'COPY server.js /app',
        'MOVE server.js /app'
      ],
      correct: 2,
      explanation: {
        en: '`COPY` is the explicit, best-practice instruction for moving files from the host context into the image layers.',
        it: '`COPY` è l\'istruzione esplicita e consigliata come best-practice per spostare file dal contesto host all\'interno dei layer dell\'immagine.'
      }
    },
    {
      id: 'docker-9-q3',
      question: {
        en: 'What happens when a container reaches the end of the script specified in its `CMD` instruction?',
        it: 'Cosa succede quando un container raggiunge la fine dello script specificato nella sua istruzione CMD?'
      },
      options: [
        {
          en: 'It waits indefinitely for further user or interactive input',
          it: 'Rimane in attesa indefinita di ulteriori input interattivi o dell\'utente'
        },
        {
          en: 'It gracefully exits and its status changes to "Exited"',
          it: 'Termina regolarmente e il suo stato cambia in "Exited"'
        },
        {
          en: 'It reboots continuously until it is manually stopped',
          it: 'Si riavvia continuamente fino a quando non viene arrestato manualmente'
        },
        {
          en: 'It deletes itself entirely from the local disk storage',
          it: 'Si elimina completamente dalla memoria del disco locale'
        }
      ],
      correct: 1,
      explanation: {
        en: 'A container lives exactly as long as its main process (the CMD). Once that process concludes, the container naturally exits.',
        it: 'Un container vive esattamente per il tempo in cui è attivo il suo processo principale (il CMD). Una volta concluso tale processo, il container termina naturalmente.'
      }
    },
    {
      id: 'docker-9-q4',
      question: {
        en: 'In a Dockerfile, why should `RUN npm install` typically be placed BEFORE `COPY . .`?',
        it: 'In un Dockerfile, perché `RUN npm install` dovrebbe essere inserito tipicamente PRIMA di `COPY . .`?'
      },
      options: [
        {
          en: 'To bypass internal Docker engine security and permission checks',
          it: 'Per aggirare i controlli di sicurezza e permessi interni del motore Docker'
        },
        {
          en: 'To ensure syntax errors in the package file are caught early on',
          it: 'Per garantire che gli errori di sintassi nel file package.json vengano rilevati in anticipo'
        },
        {
          en: 'To maximize layer caching and drastically speed up future builds',
          it: 'Per massimizzare il caching dei layer e velocizzare drasticamente le build future'
        },
        {
          en: 'To force the npm process to run with elevated root privileges',
          it: 'Per forzare l\'esecuzione del processo npm con privilegi di root elevati'
        }
      ],
      correct: 2,
      explanation: {
        en: 'Docker builds cache layer by layer. Copying only package.json and installing allows Docker to cache the heavy "node_modules" layer, bypassing the install step on future builds as long as dependencies haven\'t changed.',
        it: 'Docker compila le immagini layer dopo layer usando la cache. Copiare solo package.json ed eseguire l\'installazione consente a Docker di memorizzare nella cache il pesante layer "node_modules", saltando questo passaggio nelle build successive se le dipendenze non sono cambiate.'
      }
    },
    {
      id: 'docker-9-q5',
      question: {
        en: 'To guarantee that your PostgreSQL database doesn\'t lose records when its container crashes or updates, you MUST use:',
        it: 'Per garantire che il database PostgreSQL non perda record in caso di arresto anomalo o aggiornamento del container, DEVI utilizzare:'
      },
      options: [
        {
          en: 'Bind mounts on the /var/log/syslog directory',
          it: 'Bind mount sulla directory /var/log/syslog'
        },
        {
          en: 'Named Volumes or explicit Host Bind Mounts',
          it: 'Named Volume o Bind Mount host espliciti'
        },
        {
          en: 'A larger and more complex Docker Base Image',
          it: 'Un\'immagine di base Docker più grande e complessa'
        },
        {
          en: 'Redis Caching for temporary data storage',
          it: 'Cache Redis per la memorizzazione temporanea dei dati'
        }
      ],
      correct: 1,
      explanation: {
        en: 'Without external mounts, data is written to the ephemeral container layer. Volumes ensure data physically resides on the host machine and outlives the container.',
        it: 'Senza mount esterni, i dati vengono scritti nel layer effimero del container. I volumi garantiscono che i dati risiedano fisicamente sulla macchina host e sopravvivano al container.'
      }
    },
    {
      id: 'docker-9-q6',
      question: {
        en: 'If you want to expose a Python Flask app running on port 5000 inside a container to your laptop\'s port 80, what flag do you use?',
        it: 'Se vuoi esporre un\'app Flask Python in esecuzione sulla porta 5000 dentro un container sulla porta 80 del tuo computer, quale flag usi?'
      },
      options: [
        '-p 5000:80',
        '-p 80:5000',
        '-e PORT=80',
        '-expose 80:5000'
      ],
      correct: 1,
      explanation: {
        en: 'The mapping syntax is always `host_port:container_port`. So `-p 80:5000`.',
        it: 'La sintassi di mappatura è sempre `porta_host:porta_container`. Quindi `-p 80:5000`.'
      }
    },
    {
      id: 'docker-9-q7',
      question: {
        en: 'In Docker Compose, what does `depends_on` parameter achieve?',
        it: 'In Docker Compose, cosa fa il parametro `depends_on`?'
      },
      options: [
        {
          en: 'It guarantees the web application will never crash or exit',
          it: 'Garantisce che l\'applicazione web non andrà mai in crash o si arresterà'
        },
        {
          en: 'It delays the start of a service until its dependencies have successfully started',
          it: 'Ritarda l\'avvio di un servizio fino a quando le sue dipendenze non sono state avviate con successo'
        },
        {
          en: 'It installs required node modules automatically during the startup phase',
          it: 'Installa automaticamente i moduli node necessari durante la fase di avvio'
        },
        {
          en: 'It mounts dependent volumes from other containers in the project',
          it: 'Monta volumi dipendenti da altri container nel progetto'
        }
      ],
      correct: 1,
      explanation: {
        en: 'It controls the absolute startup order. If `web` depends on `db`, compose starts `db` first.',
        it: 'Controlla l\'ordine assoluto di avvio. Se web dipende da db, compose avvia prima db.'
      }
    },
    {
      id: 'docker-9-q8',
      question: {
        en: 'How do you force Docker to rebuild an image, ignoring the cached layers?',
        it: 'Come si forza Docker a ricompilare un\'immagine ignorando i layer memorizzati in cache?'
      },
      options: [
        'docker build --no-cache',
        'docker build --force',
        'docker build --clean',
        'docker rebuild'
      ],
      correct: 0,
      explanation: {
        en: '`--no-cache` forces Docker Engine to execute every single instruction in the Dockerfile from scratch.',
        it: '`--no-cache` forza il motore Docker a eseguire da zero ogni singola istruzione presente nel Dockerfile.'
      }
    },
    {
      id: 'docker-9-q9',
      question: {
        en: 'Which command cleanly removes all containers, networks, and images created by `docker-compose up` (without touching volumes)?',
        it: 'Quale comando rimuove in modo pulito tutti i container, le reti e le immagini creati da `docker-compose up` (senza toccare i volumi)?'
      },
      options: [
        'docker-compose stop',
        'docker-compose kill',
        'docker-compose clean',
        'docker-compose down'
      ],
      correct: 3,
      explanation: {
        en: '`down` is the clean teardown command, destroying the ephemeral containers and networks while preserving volume data.',
        it: '`down` è il comando di dismissione completo, che elimina i container e le reti temporanee preservando i dati dei volumi.'
      }
    },
    {
      id: 'docker-9-q10',
      question: {
        en: 'What is the danger of using the `latest` tag in `docker run ubuntu:latest` for a production critical application?',
        it: 'Qual è il pericolo di utilizzare il tag `latest` in `docker run ubuntu:latest` per un\'applicazione critica in produzione?'
      },
      options: [
        {
          en: 'It violates standard open source GPL licensing rules',
          it: 'Viola le regole standard di licenza GPL open source'
        },
        {
          en: 'It disables all persistent volume mounts for security',
          it: 'Disabilita tutti i mount dei volumi persistenti per motivi di sicurezza'
        },
        {
          en: 'It is non-deterministic and can unexpectedly cause breaking bugs',
          it: 'È non deterministico e può causare inaspettatamente bug bloccanti'
        },
        {
          en: 'It is considered a deprecated and legacy command syntax',
          it: 'È considerata una sintassi di comando deprecata e legacy'
        }
      ],
      correct: 2,
      explanation: {
        en: 'Pinning to specific versions (like `ubuntu:22.04`) ensures immutability. `latest` is a moving target.',
        it: 'Fissare versioni specifiche (come `ubuntu:22.04`) garantisce l\'immutabilità. `latest` è un bersaglio mobile.'
      }
    }
  ]
}
