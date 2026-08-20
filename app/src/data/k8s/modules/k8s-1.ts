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
  funFact: { en: 'Did you know Kubernetes was born inside Google under a secret sci-fi codename?', it: 'Lo sapevi che Kubernetes è nato in Google con un nome in codice segreto preso da una famosa serie di fantascienza?' },
  sections: [
    {
      type: 'intro',
      content: { en: 'Docker is fantastic for running a few containers. But what happens when you have millions of users, and you need to run 5,000 containers across 50 different servers? How do they talk to each other? What if a server catches fire? You need an orchestrator.', it: 'Docker è fantastico per eseguire pochi container. Ma cosa succede quando hai milioni di utenti e devi eseguire 5.000 container su 50 server diversi? Come comunicano tra loro? E se un server prende fuoco? Hai bisogno di un orchestratore.' }
    },
    {
      type: 'concept',
      title: { en: '📜 Origin & Curiosities: Greek, Star Trek & K8s', it: '📜 Origine & Curiosità: Greco, Star Trek & K8s' },
      content: {
        en: 'Before diving into technical architecture, here is the story behind the name, logo, and abbreviation:\n\n• **☸️ The Greek Helmsman (*Kybernitis*)**: The word comes from Ancient Greek **κυβερνήτης** (*kybernitis*), meaning **"helmsman"** or **"ship pilot"**—the captain steering a container ship. (It is also the root for the word *Cybernetics*!)\n\n• **🖖 Google & Star Trek (*Borg & Project 7*)**: Google\'s internal precursor system was named **Borg** after the Star Trek cybernetic alien species. When Google built the open-source version, they codenamed it **Project Seven of Nine** (after the friendly Borg character in *Star Trek: Voyager*). To honor this, the original Kubernetes logo wheel has **7 spokes**!\n\n• **🔢 The Numeronym (*K8s*)**: It is a 10-letter abbreviation formed by **K** + **8 letters** in between (`u-b-e-r-n-e-t-e`) + **s**. (Similar to *i18n* for *Internationalization*).',
        it: 'Prima di immergerci nell\'architettura tecnica, ecco la storia affascinante dietro al nome, al logo e all\'abbreviazione:\n\n• **☸️ Il Timoniere Greco (*Kybernitis*)**: La parola deriva dal greco antico **κυβερνήτης** (*kybernitis*), che significa **"timoniere"** o **"pilota di nave"**—colui che guida la nave carica di container. (È anche la radice di *cibernetica*!)\n\n• **🖖 Google & Star Trek (*Borg & Project 7*)**: Il sistema interno originale di Google si chiamava **Borg** (come gli alieni cibernetici di Star Trek). Quando nacque la versione open-source, fu chiamata in codice **Project Seven of Nine** (da *Sette di Nove*, il personaggio Borg di *Star Trek: Voyager*). In suo onore, il timone nel logo ha **7 raggi**!\n\n• **🔢 Il Numeronimo (*K8s*)**: È un\'abbreviazione formata dalla lettera iniziale **K** + **8 lettere** centrali (`u-b-e-r-n-e-t-e`) + la finale **s**. (Proprio come *i18n* per *Internationalization*).'
      }
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
      type: 'table',
      title: { en: '⚡ Life Without vs With Kubernetes', it: '⚡ Vita Senza vs Con Kubernetes' },
      content: { en: 'Here is what changes when you introduce Kubernetes into your infrastructure:', it: 'Ecco cosa cambia concretamente quando introduci Kubernetes nella tua infrastruttura:' },
      tableData: {
        headers: [
          { en: 'Scenario', it: 'Scenario' },
          { en: '❌ Plain Docker (Without K8s)', it: '❌ Solo Docker (Senza K8s)' },
          { en: '✅ With Kubernetes (K8s)', it: '✅ Con Kubernetes (K8s)' }
        ],
        rows: [
          [
            { en: '🔥 **Server Hardware Fails**', it: '🔥 **Crollo di un Server**' },
            { en: 'Site goes down completely! Requires emergency manual SSH intervention at 3 AM.', it: 'Il sito va giù! Richiede un intervento manuale di emergenza via SSH alle 3 di notte.' },
            { en: 'Self-Healing: K8s detects dead server and automatically restarts containers on healthy nodes in seconds.', it: 'Self-Healing: K8s rileva il server morto e riavvia automaticamente i container su nodi sani in pochi secondi.' }
          ],
          [
            { en: '📈 **Traffic Spike (Black Friday)**', it: '📈 **Picco di Traffico**' },
            { en: 'Single server freezes or crashes from Out-Of-Memory (OOM). Users see 504 Gateway errors.', it: 'Il server si blocca per memoria esaurita (OOM). Gli utenti vedono errori 504 Gateway.' },
            { en: 'Auto-Scaling: K8s dynamically spins up dozens of new replica containers to handle load.', it: 'Auto-Scaling: K8s avvia dinamicamente decine di nuove repliche per gestire il carico.' }
          ],
          [
            { en: '🚀 **Deploying New Version**', it: '🚀 **Aggiornamento App**' },
            { en: 'Downtime required! Must stop old containers, pull new image, and start new containers.', it: 'Downtime obbligatorio! Bisogna fermare i vecchi container, scaricare la nuova immagine e riavviarli.' },
            { en: 'Zero-Downtime Rollout: K8s replaces containers one by one while keeping live traffic flowing.', it: 'Zero-Downtime Rollout: K8s sostituisce i container uno alla volta mantenendo attivo il traffico reale.' }
          ],
          [
            { en: '⚖️ **Traffic Distribution**', it: '⚖️ **Bilanciamento Traffico**' },
            { en: 'Requires configuring complex external load balancers and proxy configs manually.', it: 'Richiede di configurare a mano bilanciatori di carico esterni e proxy complessi.' },
            { en: 'Built-in Load Balancing: K8s automatically routes traffic evenly across healthy pods.', it: 'Load Balancing Integrato: K8s distribuisce automaticamente il traffico tra i pod sani.' }
          ]
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
