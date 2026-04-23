import type { Module } from '../../types'

export const k8s1: Module = {
  id: 'k8s-1',
  track: 'k8s',
  order: 1,
  title: { en: 'The Need for Orchestration', it: 'La Necessità dell\'Orchestrazione' },
  subtitle: { en: 'Managing thousands of containers', it: 'Gestire migliaia di container' },
  emoji: '🚢',
  duration: '15 min',
  xpReward: 100,
  funFact: { en: 'Kubernetes is often abbreviated as "K8s" because there are exactly 8 letters between the "K" and the "s" in "Kubernetes".', it: 'Kubernetes è spesso abbreviato in "K8s" perché ci sono esattamente 8 lettere tra la "K" e la "s" nella parola "Kubernetes".' },
  sections: [
    {
      type: 'intro',
      content: { en: 'Docker is fantastic for running a few containers. But what happens when you have millions of users, and you need to run 5,000 containers across 50 different servers? How do they talk to each other? What if a server catches fire? You need an orchestrator.', it: 'Docker è fantastico per eseguire pochi container. Ma cosa succede quando hai milioni di utenti e devi eseguire 5.000 container su 50 server diversi? Come comunicano tra loro? E se un server prende fuoco? Hai bisogno di un orchestratore.' }
    },
    {
      type: 'video',
      title: { en: '📺 Kubernetes in 5 Minutes', it: '📺 Kubernetes in 5 minuti' },
      content: { en: 'A brilliant, high-level animated breakdown of exactly what problem Kubernetes solves in modern architecture.', it: 'Una brillante analisi animata di alto livello su quale problema risolve esattamente Kubernetes nell\'architettura moderna.' },
      videoUrl: 'https://www.youtube.com/watch?v=PH-2FfFD2PU'
    },
    {
      type: 'concept',
      title: { en: '🎯 The Orchestrator\'s Job', it: '🎯 Il lavoro dell\'orchestratore' },
      content: { en: 'Kubernetes does not run containers itself. It manages the tools (like Docker or containerd) that do.\n\nImagine a symphony orchestra: the musicians (containers) make the actual sound, but the **Conductor** (Kubernetes) tells them when to play, how loud to play, and replaces them if they fall asleep.', it: 'Kubernetes non esegue i container direttamente. Gestisce gli strumenti (come Docker o containerd) che lo fanno.\n\nImmagina un\'orchestra sinfonica: i musicisti (container) producono il suono reale, ma il **Direttore** (Kubernetes) dice loro quando suonare, quanto forte suonare e li sostituisce se si addormentano.' }
    },
    {
      type: 'flowchart',
      content: { en: '**Life Without vs With Kubernetes**', it: '**Vita con e senza Kubernetes**' },
      diagramSteps: [
        { label: { en: 'Server Dies\n(Plain Docker)', it: 'Il server muore\n(Solo Docker)' }, icon: '🔥', color: '#ff4b4b' },
        { label: { en: 'Site Goes Down!\n(Downtime)', it: 'Il sito va giù!\n(Downtime)' }, icon: '💀', color: '#ff4b4b' },
        { label: { en: 'Server Dies\n(Kubernetes)', it: 'Il server muore\n(Kubernetes)' }, icon: '🔥', color: '#ffb703' },
        { label: { en: 'Auto-Restarts\non New Server', it: 'Riavvio automatico\nsu nuovo server' }, icon: '✨', color: '#06d6a0' }
      ]
    },
    {
      type: 'table',
      title: { en: '⚖️ Core Features of K8s', it: '⚖️ Caratteristiche principali di K8s' },
      content: { en: 'Why does every modern enterprise use it?', it: 'Perché ogni azienda moderna lo usa?' },
      tableData: {
        headers: [{ en: 'Feature', it: 'Funzionalità' }, { en: 'What it means practically', it: 'Cosa significa in pratica' }],
        rows: [
          [{ en: '**Self-healing**', it: '**Self-healing**' }, { en: 'Restarts containers that fail, replaces containers when nodes die.', it: 'Riavvia i container che falliscono, sostituisce i container quando i nodi muoiono.' }],
          [{ en: '**Auto-scaling**', it: '**Auto-scaling**' }, { en: 'Spins up more containers during Black Friday traffic, shuts them down at night.', it: 'Avvia più container durante il traffico del Black Friday, li spegne di notte.' }],
          [{ en: '**Load Balancing**', it: '**Load Balancing**' }, { en: 'Distributes incoming network traffic evenly across your containers.', it: 'Distribuisce il traffico di rete in entrata equamente tra i tuoi container.' }],
          [{ en: '**Rollouts & Rollbacks**', it: '**Rollouts & Rollbacks**' }, { en: 'Updates your app bit by bit, pausing and reverting if a bug is detected!', it: 'Aggiorna la tua app un po\' alla volta, mettendo in pausa e tornando indietro se viene rilevato un bug!' }]
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-1-q1',
      question: { en: 'Which of the following is NOT a core responsibility of Kubernetes?', it: 'Quale delle seguenti NON è una responsabilità principale di Kubernetes?' },
      options: [
        { en: 'Load balancing incoming traffic across multiple containers', it: 'Bilanciare il carico del traffico in entrata su più container' },
        { en: 'Writing and compiling your application source code', it: 'Scrivere e compilare il codice sorgente della tua applicazione' },
        { en: 'Restarting failed containers automatically', it: 'Riavviare automaticamente i container falliti' },
        { en: 'Scaling the number of running containers up and down', it: 'Scalare il numero di container in esecuzione su e giù' }
      ],
      correct: 1,
      explanation: { en: 'Kubernetes is purely an orchestration engine. It does not compile code or build images. It relies on CI/CD pipelines and tools like Docker for that.', it: 'Kubernetes è puramente un motore di orchestrazione. Non compila codice né costruisce immagini. Si affida a pipeline CI/CD e strumenti come Docker per questo.' }
    },
    {
      id: 'k8s-1-q2',
      question: { en: 'What happens in a Kubernetes cluster if a physical server (node) suddenly loses power?', it: 'Cosa succede in un cluster Kubernetes se un server fisico (nodo) perde improvvisamente potenza?' },
      options: [
        { en: 'The entire cluster immediately shuts down and goes completely offline until power is manually restored', it: 'L\'intero cluster si spegne immediatamente e va completamente offline finché la corrente non viene ripristinata manualmente' },
        { en: 'A system administrator is automatically notified and must write a new YAML configuration to buy a server', it: 'Un amministratore di sistema viene notificato automaticamente e deve scrivere una nuova configurazione YAML per comprare un server' },
        { en: 'Kubernetes detects the dead node and automatically schedules its containers onto healthy surviving nodes', it: 'Kubernetes rileva il nodo morto e pianifica automaticamente i suoi container su nodi sani sopravvissuti' },
        { en: 'All containers that were running on that specific server are permanently deleted along with all their data', it: 'Tutti i container che erano in esecuzione su quel server specifico vengono eliminati permanentemente insieme a tutti i loro dati' }
      ],
      correct: 2,
      explanation: { en: 'This is the "Self-healing" mechanism. The Control Plane notices the worker is dead and immediately asks other workers to spin up replacement containers.', it: 'Questo è il meccanismo di "Self-healing" (auto-riparazione). Il Control Plane si accorge che il worker è morto e chiede immediatamente agli altri worker di avviare container sostitutivi.' }
    }
  ]
}
