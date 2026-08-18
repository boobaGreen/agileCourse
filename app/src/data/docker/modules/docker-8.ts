import type { Module } from '../../types'

export const docker8: Module = {
  id: 'docker-8',
  track: 'docker',
  order: 8,
  title: {
    en: 'Hands-on Labs & Playgrounds',
    it: 'Laboratori Pratici & Playground'
  },
  subtitle: {
    en: 'Free online environments to practice Docker safely',
    it: 'Ambienti online gratuiti per fare pratica in sicurezza'
  },
  emoji: '🧪',
  duration: '45+ min',
  xpReward: 100,
  externalLink: {
    label: {
      en: 'Launch Killercoda Docker Playground',
      it: 'Apri Killercoda Docker Playground'
    },
    url: 'https://killercoda.com/docker',
    xpPrompt: {
      en: 'How many labs/exercises did you successfully complete? Enter the number to earn XP!',
      it: 'Quanti laboratori/esercizi hai completato con successo? Inserisci il numero per guadagnare XP!'
    }
  },
  sections: [
    {
      type: 'intro',
      content: {
        en: 'Watching videos and studying theory is great, but typing real commands builds muscle memory. In this module we introduce **the best active free resources** to get your hands dirty without risking your local setup.',
        it: 'Guardare video e studiare la teoria è ottimo, ma digitare comandi reali sviluppa l\'abilità pratica. In questo modulo presentiamo **le migliori risorse gratuite attive** per esercitarti con Docker direttamente nel browser o in locale.'
      }
    },
    {
      type: 'concept',
      title: {
        en: '🌐 Tool 1: Killercoda Docker Playground',
        it: '🌐 Strumento 1: Killercoda Docker Playground'
      },
      content: {
        en: '**Killercoda** gives you a free, interactive Ubuntu environment with Docker Engine pre-installed **right in your browser**. No installation needed.\n\n- Instant browser Linux VM with Docker pre-installed\n- Clean sandbox to test CLI commands, Dockerfiles, and compose files safely\n- Free interactive sessions\n\n🔗 **URL**: [https://killercoda.com/docker](https://killercoda.com/docker)',
        it: '**Killercoda** ti offre un ambiente Ubuntu interattivo e gratuito con Docker Engine già installato **direttamente nel browser**. Nessuna installazione richiesta.\n\n- VM Linux istantanea nel browser con Docker preinstallato\n- Sandbox pulita per testare comandi CLI, Dockerfile e file compose in sicurezza\n- Sessioni interattive gratuite\n\n🔗 **URL**: [https://killercoda.com/docker](https://killercoda.com/docker)'
      }
    },
    {
      type: 'concept',
      title: {
        en: '📚 Tool 2: Docker Official Docs & Guides',
        it: '📚 Strumento 2: Documentazione & Guide Ufficiali Docker'
      },
      content: {
        en: 'The official **Docker Docs** provides updated hands-on tutorials, containerization guides, and sample applications.\n\n🔗 **URL**: [https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)\n\n💡 **Recommended starter labs:**\n1. "Orientation and setup"\n2. "Containerize an application"\n3. "Multi-container applications with Docker Compose"',
        it: 'La **Documentazione Ufficiale Docker** offre tutorial pratici e aggiornati, guide di containerizzazione e applicazioni di esempio.\n\n🔗 **URL**: [https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)\n\n💡 **Laboratori consigliati per iniziare:**\n1. "Orientamento e configurazione"\n2. "Containerizzare un\'applicazione"\n3. "Applicazioni multi-container con Docker Compose"'
      }
    },
    {
      type: 'tip',
      title: {
        en: '🎯 Suggested Learning Path',
        it: '🎯 Percorso di Apprendimento Consigliato'
      },
      content: {
        en: '**Step 1**: Open the Killercoda Playground to test the CLI commands you learned in our interactive terminal simulators.\n**Step 2**: Follow the official Docker guides to containerize sample projects.\n**Step 3**: Return here and complete the final simulator lab challenge! 🏆',
        it: '**Passo 1**: Apri il Playground di Killercoda per testare i comandi CLI appresi nei nostri simulatori.\n**Passo 2**: Segui le guide ufficiali Docker per containerizzare progetti di esempio.\n**Passo 3**: Torna qui e completa la sfida finale nel nostro simulatore! 🏆'
      }
    },
    {
      type: 'game',
      title: {
        en: 'Lab: The Docker Sandbox',
        it: 'Lab: Sandbox Docker'
      },
      content: {
        en: 'Practice everything you\'ve learned! This simulator tracks images, containers, volumes, and networks. Try to run a full stack manually.',
        it: 'Metti in pratica tutto ciò che hai imparato! Questo simulatore traccia immagini, container, volumi e reti. Prova ad avviare uno stack completo.'
      },
      gameType: 'docker-sim',
      gameData: {
        startState: {
          images: [{ id: 'img-ng', name: 'nginx', tag: 'latest', size: '140MB' }],
          containers: [],
          volumes: [],
          networks: []
        },
        tasks: [
          {
            id: '1',
            instruction: {
              en: 'Create a private network: docker network create my-net',
              it: 'Crea una rete privata: docker network create my-net'
            },
            condition: 'NETWORK_EXISTS:my-net',
            hints: [
              { en: '💡 Hint 1/3: Use the `docker network create` subcommand.', it: '💡 Aiuto 1/3: Usa il sottocomando `docker network create`.' },
              { en: '💡 Hint 2/3: Specify `my-net` as the network name.', it: '💡 Aiuto 2/3: Specifica `my-net` come nome della rete.' },
              { en: '💡 Hint 3/3: Type `docker network create my-net` in the terminal.', it: '💡 Aiuto 3/3: Digita `docker network create my-net` nel terminale.' }
            ]
          },
          {
            id: '2',
            instruction: {
              en: 'Run Nginx on that network: docker run -d --name web --network my-net nginx',
              it: 'Esegui Nginx su quella rete: docker run -d --name web --network my-net nginx'
            },
            condition: 'CONTAINER_RUNNING:web',
            hints: [
              { en: '💡 Hint 1/3: Use `docker run -d` with `--name web`.', it: '💡 Aiuto 1/3: Usa `docker run -d` con `--name web`.' },
              { en: '💡 Hint 2/3: Add `--network my-net` before the image name `nginx`.', it: '💡 Aiuto 2/3: Aggiungi `--network my-net` prima del nome dell\'immagine `nginx`.' },
              { en: '💡 Hint 3/3: Type `docker run -d --name web --network my-net nginx` in the terminal.', it: '💡 Aiuto 3/3: Digita `docker run -d --name web --network my-net nginx` nel terminale.' }
            ]
          }
        ]
      }
    }
  ]
}

