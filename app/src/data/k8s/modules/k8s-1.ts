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
      title: { en: '☸️ Fun Fact 1: The Greek Helmsman (Kybernitis)', it: '☸️ Fun Fact 1: Il Timoniere Greco (Kybernitis)' },
      content: {
        en: '**Where does the word "Kubernetes" come from?**\n\nIt comes from the Ancient Greek word **κυβερνήτης** (*kybernitis*), which literally translates to **"helmsman"** or **"ship pilot"**.\n\n🚢 **The Container Connection**: Docker popularized containers using shipping containers as a metaphor. Kubernetes is the master captain who steps up to the helm to navigate the ship carrying thousands of containers through stormy seas.\n\n💡 **Fun Linguistic Bonus**: The exact same Greek word *kybernitis* is the etymological root for the word **Cybernetics** (and in Italian, *cibernetica*)—the science of control and communication in complex systems!',
        it: '**Da dove deriva la parola "Kubernetes"?**\n\nNasce dal greco antico **κυβερνήτης** (*kybernitis*), che si traduce letteralmente in **"timoniere"** o **"pilota di nave"**.\n\n🚢 **Il legame con i Container**: Docker ha reso famosi i container usando la metafora dei container da carico sulle navi. Kubernetes è il capitano esperto che prende in mano il timone per guidare la nave con migliaia di container in mezzo alle tempeste del web.\n\n💡 **Curiosità Linguistica**: Dalla stessa identica parola greca *kybernitis* deriva anche il termine **Cibernetica** (*cybernetics* in inglese), la scienza del controllo e della comunicazione nei sistemi complessi!'
      }
    },
    {
      type: 'concept',
      title: { en: '🖖 Fun Fact 2: Star Trek, The Borg & Project Seven', it: '🖖 Fun Fact 2: Star Trek, I Borg & Project Seven' },
      content: {
        en: '**Who were the Borg in Star Trek?**\n\nIn Star Trek lore, the **Borg** are a famous cybernetic alien species linked to a single, relentless "Hive Mind". They assimilate every technology they encounter with the iconic line: *"Resistance is futile!"*\n\n🤖 **Google\'s Borg System**: In the 2000s, Google engineers built a secret internal platform to manage their global data centers and assimilate all server hardware into one giant cluster. They humorously named it **Borg**.\n\n✨ **Project Seven of Nine**: When Google created the open-source version for the public, they codenamed it **Project Seven of Nine** (or Project 7)—named after **Seven of Nine**, the famous Borg character in *Star Trek: Voyager* who reclaimed her humanity and used her Borg power for good!\n\n☸️ **The 7-Spoke Wheel**: Look closely at the Kubernetes logo! The ship\'s wheel was designed with **7 spokes** directly in honor of Project Seven of Nine.',
        it: '**Chi sono i Borg in Star Trek?**\n\nNella saga di Star Trek, i **Borg** sono una celebre specie cibernetica guidata da una potente "mente alveare" (Hive Mind). Assimilano ogni tecnologia incontrata pronunciando la famosa frase: *"La resistenza è futile!"*\n\n🤖 **Il sistema Borg di Google**: Negli anni 2000, gli ingegneri di Google crearono una piattaforma interna segreta per gestire i loro data center mondiali e assimilare tutte le risorse hardware in un unico grande cluster. La chiamarono goliardicamente **Borg**.\n\n✨ **Project Seven of Nine**: Quando Google volle creare la versione open-source e pubblica, diede al progetto il nome in codice **Project Seven of Nine** (o Project 7)—in omaggio a **Sette di Nove**, il celebre personaggio Borg di *Star Trek: Voyager* che si affrancò dalla mente alveare per aiutare l\'equipaggio!\n\n☸️ **I 7 raggi del timone**: Osserva attentamente il logo di Kubernetes! Il timone della nave ha esattamente **7 raggi** proprio in omaggio a Project Seven of Nine.'
      }
    },
    {
      type: 'concept',
      title: { en: '🔢 Fun Fact 3: Why is it abbreviated as K8s?', it: '🔢 Fun Fact 3: Perché l\'abbreviazione K8s?' },
      content: {
        en: '**Why write K8s instead of Kubernetes?**\n\n**K8s** is a **numeronym** (a number-based abbreviation). Developers love typing efficiency, so they shortened the 10-letter word!\n\n• **K**: The 1st letter\n• **8**: The **8 letters** in between (**u-b-e-r-n-e-t-e**)\n• **s**: The last letter\n\n🌐 **Other Famous Numeronyms**: You will see this everywhere in tech!\n- **i18n** = Internationalization (18 letters in between)\n- **l10n** = Localization (10 letters in between)\n- **a11y** = Accessibility (11 letters in between)',
        it: '**Perché scrivere K8s invece di Kubernetes?**\n\n**K8s** è un **numeronimo** (un\'abbreviazione basata sui numeri). Gli sviluppatori amano risparmiare tasti digitati, quindi hanno accorciato questa parola di 10 lettere!\n\n• **K**: La prima lettera\n• **8**: Le **8 lettere** centrali (**u-b-e-r-n-e-t-e**)\n• **s**: L\'ultima lettera\n\n🌐 **Altri Numeronimi Famosi**: Li troverai ovunque nel mondo tech!\n- **i18n** = Internationalization (18 lettere in mezzo)\n- **l10n** = Localization (10 lettere in mezzo)\n- **a11y** = Accessibility (11 lettere in mezzo)'
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
