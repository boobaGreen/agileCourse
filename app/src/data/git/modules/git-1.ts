import type { Module } from '../../types'

export const git1: Module = {
  id: 'git-1',
  track: 'git',
  order: 1,
  title: { en: 'What is Version Control?', it: 'Cos\'è il Version Control?' },
  subtitle: { en: 'Why "save as final_FINAL_v2.docx" is never the answer', it: 'Perché "salva come final_FINAL_v2.docx" non è mai la soluzione' },
  emoji: '⏱️',
  duration: '8 min',
  xpReward: 50,
  funFact: { en: 'Before version control, teams shared code by emailing ZIP files. Git was created in just 10 days by Linus Torvalds in 2005.', it: 'Prima del version control, i team condividevano il codice inviandosi file ZIP via email. Git è stato creato in soli 10 giorni da Linus Torvalds nel 2005.' },
  sections: [
    {
      type: 'intro',
      content: { en: 'Imagine working on a document and needing to undo a change you made three weeks ago. Or needing to work on two different versions of the same file simultaneously. Version control solves all of this — and much more.', it: 'Immagina di lavorare a un documento e dover annullare una modifica fatta tre settimane fa. Oppure di dover lavorare su due versioni diverse dello stesso file contemporaneamente. Il version control risolve tutto questo — e molto altro.' }
    },
    {
      type: 'flowchart',
      content: { en: '**The Timeline in Action**\nA visual trace of every single change you made, forever safely stored.', it: '**La Timeline in Azione**\nUna traccia visiva di ogni singola modifica, archiviata al sicuro per sempre.' },
      diagramSteps: [
        { label: { en: 'Initial File\n(v1.0)', it: 'File Iniziale\n(v1.0)' }, icon: '📄', color: '#ffb703' },
        { label: { en: 'Added Header\n(v1.1)', it: 'Aggiunto Header\n(v1.1)' }, icon: '🟢', color: '#06d6a0' },
        { label: { en: 'Fixed Typo\n(v1.2)', it: 'Risolto Refuso\n(v1.2)' }, icon: '🟡', color: '#118ab2' },
        { label: { en: 'Deleted Paragraph\n(v1.3)', it: 'Eliminato Paragrafo\n(v1.3)' }, icon: '🔴', color: '#ff4b4b' }
      ]
    },
    {
      type: 'analogy',
      title: { en: '📷 Think of it like a game save system', it: '📷 Pensalo come al sistema di salvataggio di un gioco' },
      content: { en: 'Version control is like a save system in a video game. You can save your progress at any point, go back to an earlier save, or even branch off to explore a different path — without losing your main storyline.', it: 'Il version control è come il sistema di salvataggio in un videogioco. Puoi salvare i tuoi progressi in qualsiasi momento, tornare a un salvataggio precedente o persino creare un ramo per esplorare un percorso diverso — senza perdere la tua storia principale.' }
    },
    {
      type: 'game',
      title: { en: 'Challenge: File Chaos', it: 'Sfida: Caos dei File' },
      content: { en: 'Oh no! The developer didn\'t use Git and now the files are a mess. Can you put them in the correct chronological order to restore the project?', it: 'Oh no! Lo sviluppatore non ha usato Git e ora i file sono un disastro. Riusciresti a metterli nell\'ordine cronologico corretto per ripristinare il progetto?' },
      gameType: 'drag-order',
      gameData: [
        { id: '1', label: 'project_v1.zip' },
        { id: '2', label: 'project_final.zip' },
        { id: '3', label: 'project_final_v2.zip' },
        { id: '4', label: 'project_REAL_FINAL.zip' }
      ]
    },
    {
      type: 'concept',
      title: { en: 'The three big problems it solves', it: 'I tre grandi problemi che risolve' },
      content: { en: '**1. History** — Every change is recorded. Who changed what, when, and why.\n\n**2. Collaboration** — Multiple people can work on the same codebase without overwriting each other.\n\n**3. Experimentation** — Create branches to try new ideas safely. A branch is an independent line of development diverging from the main codebase. You can experiment on it, then merge it back (or throw it away).', it: '**1. Cronologia** — Ogni modifica viene registrata. Chi ha cambiato cosa, quando e perché.\n\n**2. Collaborazione** — Più persone possono lavorare sulla stessa base di codice senza sovrascriversi a vicenda.\n\n**3. Sperimentazione** — Crea rami (branch) per provare nuove idee in sicurezza. Un branch è una linea di sviluppo indipendente che diverge dalla base di codice principale. Puoi sperimentare su di esso, quindi riavvicinarlo (merge) o scartarlo.' }
    },
    {
      type: 'concept',
      title: { en: '💾 The "Commit": A Snapshot in Time', it: '💾 Il "Commit": Una Istantanea nel Tempo' },
      content: { en: 'In Git, you don\'t just save files. You create a **Commit**. A commit is a snapshot of your entire project at a specific moment. It doesn\'t just store the changes; it remembers the author, the date, and a message explaining *why* the change happened.', it: 'In Git, non salvi semplicemente i file. Crei un **Commit**. Un commit è un\'istantanea dell\'intero progetto in un momento specifico. Non memorizza solo le modifiche; ricorda l\'autore, la data e un messaggio che spiega *perché* è avvenuta la modifica.' }
    },
    {
      type: 'concept',
      title: { en: 'Centralized vs Distributed', it: 'Centralizzato vs Distribuito' },
      content: { en: 'Older systems like **SVN (Subversion)** are **Centralized**: there is only one "Source of Truth" server. To see the history or make a commit, you **must** be connected to that server. If the server goes down or you are offline, you can\'t work.\n\n**Git is Distributed**: every developer has a **complete copy** of the entire project history on their own machine. You can commit, view history, and switch branches while sitting on a plane without internet. You only need the server when you want to share your work with others.', it: 'I sistemi più vecchi come **SVN (Subversion)** sono **Centralizzati**: esiste un solo server "Fonte della Verità". Per vedere la cronologia o fare un commit, **devi** essere connesso a quel server. Se il server va giù o sei offline, non puoi lavorare.\n\n**Git è Distribuito**: ogni sviluppatore ha una **copia completa** dell\'intera cronologia del progetto sulla propria macchina. Puoi fare commit, visualizzare la cronologia e cambiare branch mentre sei in aereo senza internet. Hai bisogno del server solo quando vuoi condividere il tuo lavoro con gli altri.' }
    },
    {
      type: 'animation',
      title: { en: '🕸️ Distributed Network', it: '🕸️ Rete Distribuita' },
      content: 'distributed'
    },
    {
      type: 'animation',
      title: { en: '🧪 Manual Backups vs Git', it: '🧪 Backup Manuali vs Git' },
      content: { en: 'Why renaming files "final_v2" is a nightmare. See how Git keeps a clean, searchable history instead.', it: 'Perché rinominare i file "final_v2" è un incubo. Guarda come Git mantiene invece una cronologia pulita e ricercabile.' },
      animationType: 'git-vs-manual'
    },
    {
      type: 'table',
      title: { en: '📊 Why use Version Control?', it: '📊 Perché usare il Version Control?' },
      content: { en: 'A comparison of workflows:', it: 'Un confronto tra flussi di lavoro:' },
      tableData: {
        headers: [{ en: 'Feature', it: 'Caratteristica' }, { en: 'Manual Backups', it: 'Backup Manuali' }, { en: 'Git Version Control', it: 'Version Control (Git)' }],
        rows: [
          [{ en: '**History**', it: '**Cronologia**' }, { en: 'Filenames like "v2_FINAL"', it: 'Nomi file come "v2_FINAL"' }, { en: 'Cryptographic SHA hashes', it: 'Hash SHA crittografici' }],
          [{ en: '**Changes**', it: '**Modifiche**' }, { en: 'Full copies (wasteful)', it: 'Copie complete (spreco)' }, { en: 'Smart diffs (efficient)', it: 'Diff intelligenti (efficiente)' }],
          [{ en: '**Undo**', it: '**Annulla**' }, { en: 'Hard to find right version', it: 'Difficile trovare la versione giusta' }, { en: 'Instant one-command revert', it: 'Ripristino istantaneo con un comando' }],
          [{ en: '**Collaboration**', it: '**Collaborazione**' }, { en: 'Impossible without ZIPs', it: 'Impossibile senza ZIP' }, { en: 'Seamless branching/merging', it: 'Branching/merging fluido' }]
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '💡 Key Takeaway', it: '💡 Concetto Chiave' },
      content: { en: 'Version control is not just for developers. Writers, designers, data scientists — anyone working with files over time benefits from it.', it: 'Il version control non è solo per gli sviluppatori. Scrittori, designer, data scientist — chiunque lavori con file nel tempo ne trae beneficio.' }
    }
  ],
  quiz: [
    {
      id: 'git-1-q1',
      question: { en: 'What is the main advantage of a distributed version control system like Git?', it: 'Qual è il vantaggio principale di un sistema di version control distribuito come Git?' },
      options: [
        { en: 'It requires a high-speed internet connection at all times to function', it: 'Richiede una connessione internet ad alta velocità in ogni momento per funzionare' },
        { en: 'Every developer has a full copy of the repository history on their machine', it: 'Ogni sviluppatore ha una copia completa della cronologia del repository sulla propria macchina' },
        { en: 'It only allows one person to work on a specific file at any given time', it: 'Permette solo a una persona alla volta di lavorare su un file specifico' },
        { en: 'It automatically deploys your code to a production server after every save', it: 'Distribuisce automaticamente il tuo codice su un server di produzione dopo ogni salvataggio' }
      ],
      correct: 1,
      explanation: { en: 'In distributed systems like Git, every developer clones the full repository including all history. This means you can work offline and there\'s no single point of failure.', it: 'Nei sistemi distribuiti come Git, ogni sviluppatore clona l\'intero repository, inclusa tutta la cronologia. Ciò significa che puoi lavorare offline e non c\'è un singolo punto di vulnerabilità.' }
    },
    {
      id: 'git-1-q2',
      question: { en: 'Which of these problems does version control NOT solve?', it: 'Quale di questi problemi NON viene risolto dal version control?' },
      options: [
        { en: 'Tracking who changed a specific file and at what exact time', it: 'Tracciare chi ha modificato un file specifico e in quale momento esatto' },
        { en: 'Automatically writing more efficient and bug-free code for you', it: 'Scrivere automaticamente codice più efficiente e privo di bug per te' },
        { en: 'Allowing multiple people to collaborate on the same file simultaneously', it: 'Permettere a più persone di collaborare allo stesso file contemporaneamente' },
        { en: 'Rolling back to a previous working version if the current one breaks', it: 'Tornare a una versione precedente funzionante se quella attuale si rompe' }
      ],
      correct: 1,
      explanation: { en: 'Version control tracks history, enables collaboration, and allows rollbacks — but it can\'t write code for you (that\'s a different kind of tool!).', it: 'Il version control traccia la cronologia, abilita la collaborazione e consente i ripristini — ma non può scrivere il codice per te (quello è un altro tipo di strumento!).' }
    },
    {
      id: 'git-1-q3',
      question: { en: 'What is a "branch" in version control?', it: 'Cos\'è un "branch" nel version control?' },
      options: [
        { en: 'A secondary backup copy stored on a secure remote cloud server', it: 'Una copia di backup secondaria memorizzata su un server cloud remoto sicuro' },
        { en: 'An independent line of development diverging from the main codebase', it: 'Una linea di sviluppo indipendente che diverge dalla base di codice principale' },
        { en: 'A team member\'s personal account used to access the repository', it: 'L\'account personale di un membro del team usato per accedere al repository' },
        { en: 'A specific type of commit message used for documentation purposes', it: 'Un tipo specifico di messaggio di commit usato a scopo di documentazione' }
      ],
      correct: 1,
      explanation: { en: 'A branch is an independent line of development. You can create a branch to work on a feature or fix a bug without affecting the main codebase.', it: 'Un branch è una linea di sviluppo indipendente. Puoi creare un branch per lavorare su una funzionalità o correggere un bug senza influenzare la base di codice principale.' }
    },
    {
      id: 'git-1-q4',
      question: { en: 'Git was created by:', it: 'Git è stato creato da:' },
      options: ['Jeff Bezos', 'Linus Torvalds', 'Bill Gates', 'Mark Zuckerberg'],
      correct: 1,
      explanation: { en: 'Linus Torvalds (who also created the Linux kernel) built Git in 2005 to manage the Linux kernel\'s source code after their previous tool became unavailable.', it: 'Linus Torvalds (che ha creato anche il kernel Linux) ha costruito Git nel 2005 per gestire il codice sorgente del kernel Linux dopo che il loro strumento precedente era diventato non più disponibile.' }
    },
    {
      id: 'git-1-q5',
      question: { en: 'What does "commit" mean in Git?', it: 'Cosa significa "commit" in Git?' },
      options: [
        { en: 'The process of uploading your local files to a platform like GitHub', it: 'Il processo di caricamento dei tuoi file locali su una piattaforma come GitHub' },
        { en: 'Saving a snapshot of your changes to the repository history forever', it: 'Salvare un\'istantanea delle tue modifiche nella cronologia del repository per sempre' },
        { en: 'Merging two different branches together into a single unified history', it: 'Unire due branch diversi in una singola cronologia unificata' },
        { en: 'Downloading someone else\'s code to your local development machine', it: 'Scaricare il codice di qualcun altro sulla tua macchina di sviluppo locale' }
      ],
      correct: 1,
      explanation: { en: 'A commit is a saved snapshot of your changes. It records what changed, who changed it, and when — creating a permanent point in history you can always return to.', it: 'Un commit è un\'istantanea salvata delle tue modifiche. Registra cosa è cambiato, chi l\'ha cambiato e quando — creando un punto permanente nella cronologia a cui puoi sempre tornare.' }
    }
  ]
}
