import type { Module } from '../../types'

export const git3: Module = {
  id: 'git-3',
  track: 'git',
  order: 3,
  title: { en: 'Core Concepts', it: 'Concetti Fondamentali' },
  subtitle: { en: 'Repository, commit, branch, merge — the four pillars', it: 'Repository, commit, branch, merge — i quattro pilastri' },
  emoji: '🧱',
  duration: '12 min',
  xpReward: 50,
  funFact: { en: 'The average Git repository on GitHub has 6.7 branches. The Linux kernel repo has over 700 active branches.', it: 'Il repository Git medio su GitHub ha 6,7 branch. Il repository del kernel Linux ne ha oltre 700 attivi.' },
  sections: [
    {
      type: 'intro',
      content: { en: 'Before you type a single command, you need to understand how Git "thinks". Master these core concepts and everything else will click naturally.', it: 'Prima di digitare un singolo comando, devi capire come "pensa" Git. Padroneggia questi concetti fondamentali e tutto il resto diventerà naturale.' }
    },
    {
      type: 'concept',
      title: { en: '🎯 The 4 Pillars', it: '🎯 I 4 Pilastri' },
      content: { en: 'Git is built on four fundamental concepts that transform a simple folder into a time-traveling database:\n\n1. **Repository**: Your project\'s home.\n2. **Commit**: A snapshot in time.\n3. **Branch**: A parallel timeline.\n4. **Merge**: Harmonizing two timelines.', it: 'Git è costruito su quattro concetti fondamentali che trasformano una semplice cartella in un database capace di viaggiare nel tempo:\n\n1. **Repository**: La casa del tuo progetto.\n2. **Commit**: Un\'istantanea nel tempo.\n3. **Branch**: Una timeline parallela.\n4. **Merge**: Armonizzare due timeline.' }
    },
    {
      type: 'concept',
      title: { en: '📦 The Three Areas', it: '📦 Le Tre Aree' },
      content: { en: 'Every file in your project moves through three specific zones. Understanding this "Loading Dock" model is the secret to mastering the Git workflow.', it: 'Ogni file nel tuo progetto si muove attraverso tre zone specifiche. Capire questo modello a "molo di carico" è il segreto per padroneggiare il flusso di lavoro di Git.' }
    },
    {
      type: 'animation',
      content: 'git-core-sim'
    },
    {
      type: 'concept',
      title: { en: '📸 The Snapshot (Commit)', it: '📸 L\'Istantanea (Commit)' },
      content: { en: 'A commit isn\'t just a list of changes; it\'s a **complete snapshot** of every file in your project. Each commit has a unique **SHA identifier** (e.g., `a1b2c3d`) — a digital fingerprint. A full Git hash is exactly **40 hexadecimal characters** long, ensuring your history can never be tampered with.', it: 'Un commit non è solo un elenco di modifiche; è un\'**istantanea completa** di ogni file nel tuo progetto. Ogni commit ha un **identificatore SHA** unico (es. `a1b2c3d`) — un\'impronta digitale. Un hash Git completo è lungo esattamente **40 caratteri esadecimali**, garantendo che la tua cronologia non possa mai essere manomessa.' }
    },
    {
      type: 'concept',
      title: { en: '🧪 The Hashing Logic', it: '🧪 La Logica dell\'Hashing' },
      content: { en: 'Every commit has a unique SHA fingerprint. Git uses this to ensure that no part of your history can be changed without it noticing. If you change even a single character in your code, the fingerprint changes completely!\n\n**Examples of Git Hashes:** <!-- desktop-only -->\n- `a1b2c3d` (A shortened 7-character hash) <!-- desktop-only -->\n- `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391` (A full 40-character version) <!-- desktop-only -->', it: 'Ogni commit ha un\'impronta digitale SHA unica. Git la usa per garantire che nessuna parte della tua cronologia possa essere modificata senza che lui se ne accorga. Se cambi anche un solo carattere nel tuo codice, l\'impronta cambia completamente!\n\n**Esempi di Hash Git:** <!-- desktop-only -->\n- `a1b2c3d` (Un hash abbreviato a 7 caratteri) <!-- desktop-only -->\n- `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391` (La versione completa a 40 caratteri) <!-- desktop-only -->' }
    },
    {
      type: 'concept',
      title: { en: '🌿 Branches & Merges', it: '🌿 Branch e Merge' },
      content: { en: 'Think of branches as **disposable timelines**. You can create a branch to try a crazy idea, and if it works, you **merge** it back. If it fails, you just delete it. Your main code stays safe and stable.', it: 'Pensa ai branch come a **timeline usa e getta**. Puoi creare un branch per provare un\'idea folle e, se funziona, lo unisci (**merge**) di nuovo. Se fallisce, lo elimini semplicemente. Il tuo codice principale rimane sicuro e stabile.' }
    },
    {
      type: 'table',
      title: { en: '🎯 Core Concepts Cheat Sheet', it: '🎯 Cheat Sheet dei Concetti Base' },
      content: { en: 'Use this as your mental map when working with Git:', it: 'Usa questa come mappa mentale quando lavori con Git:' },
      tableData: {
        headers: [{ en: 'Concept', it: 'Concetto' }, { en: 'Analogy', it: 'Analogia' }, { en: 'Primary Command', it: 'Comando Principale' }],
        rows: [
          [{ en: '**Working Directory**', it: '**Working Directory**' }, { en: 'Your Workbench (Messy)', it: 'Il tuo banco da lavoro (disordinato)' }, '`Edit files`'],
          [{ en: '**Staging Area**', it: '**Staging Area**' }, { en: 'The Loading Dock (Ready)', it: 'Il molo di carico (Pronto)' }, '`git add`'],
          [{ en: '**Local Repository**', it: '**Repository Locale**' }, { en: 'The Private Vault (Saved)', it: 'Il caveau privato (Salvato)' }, '`git commit`'],
          [{ en: '**Remote Repository**', it: '**Repository Remoto**' }, { en: 'The Public Gallery (Shared)', it: 'La galleria pubblica (Condiviso)' }, '`git push`']
        ]
      }
    },
    {
      type: 'game',
      title: { en: 'Interactive Workflow Challenge', it: 'Sfida Flusso di Lavoro Interattivo' },
      content: { en: 'Now that you\'ve seen the simulation, can you order the workflow correctly?', it: 'Ora che hai visto la simulazione, riesci a ordinare correttamente il flusso di lavoro?' },
      gameType: 'drag-order',
      gameData: [
        { id: '1', label: { en: 'Modify files in Working Dir', it: 'Modifica i file nella Working Dir' } },
        { id: '2', label: { en: 'Run "git add" to stage', it: 'Esegui "git add" per lo staging' } },
        { id: '3', label: { en: 'Run "git commit" to save', it: 'Esegui "git commit" per salvare' } },
        { id: '4', label: { en: 'Run "git push" to share', it: 'Esegui "git push" per condividere' } }
      ]
    },
    {
      type: 'game',
      title: { en: 'Lab: First Steps', it: 'Lab: Primi Passi' },
      content: { en: 'Let\'s put it into practice! Open the interactive terminal below and make two commits to advance the history on the main branch.', it: 'Mettiamolo in pratica! Apri il terminale interattivo qui sotto e fai due commit per far avanzare la cronologia sul branch main.' },
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 'C1': { id: 'C1', parents: [], message: 'Initial commit' } },
          branches: { 'main': 'C1' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: { en: 'Create a new commit in the history (the message or content doesn\'t matter in this simulation)', it: 'Crea un nuovo commit nella cronologia (il messaggio o il contenuto non contano in questa simulazione)' }, condition: 'COMMIT_COUNT:main:2' },
          { id: '2', instruction: { en: 'Create another commit to extend the branch', it: 'Crea un altro commit per estendere il branch' }, condition: 'COMMIT_COUNT:main:3' }
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '🎮 Practice This Module', it: '🎮 Esercitati con questo modulo' },
      content: { en: '**Learn Git Branching**: Complete *Introduction Sequence — Level 1* (Introduction to Git Commits)\n\n**Oh My Git!**: Play the *Intro* and *Files* chapters\n\n**Git Kata**: `basic-commits`, `basic-staging`\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)', it: '**Learn Git Branching**: Completa *Introduction Sequence — Level 1* (Introduction to Git Commits)\n\n**Oh My Git!**: Gioca i capitoli *Intro* e *Files*\n\n**Git Kata**: `basic-commits`, `basic-staging`\n\n🚀 [Lancia Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)' }
    }
  ],
  quiz: [
    {
      id: 'git-3-q1',
      question: { en: 'What is a Git repository?', it: 'Cos\'è un repository Git?' },
      options: [
        { en: 'A specific individual file that is currently being tracked by the Git system', it: 'Un file specifico che è attualmente tracciato dal sistema Git' },
        { en: 'The entire project folder containing all history, snapshots, and branches', it: 'L\'intera cartella del progetto contenente tutta la cronologia, le istantanee e i branch' },
        { en: 'A remote cloud-based backup service where your files are securely stored', it: 'Un servizio di backup remoto basato su cloud dove i tuoi file sono archiviati in modo sicuro' },
        { en: 'A descriptive message that explains what changed in a specific set of files', it: 'Un messaggio descrittivo che spiega cosa è cambiato in un set specifico di file' }
      ],
      correct: 1,
      explanation: { en: 'A repository contains all project files AND the complete history of every change ever made. It\'s the entire database of your project.', it: 'Un repository contiene tutti i file del progetto E la cronologia completa di ogni modifica mai fatta. È l\'intero database del tuo progetto.' }
    },
    {
      id: 'git-3-q2',
      question: { en: 'What command stages files before a commit?', it: 'Quale comando mette i file in staging prima di un commit?' },
      options: ['git commit', 'git push', 'git add', 'git save'],
      correct: 2,
      explanation: { en: '`git add` moves files to the "staging area" — a preparation zone where you select exactly what goes into the next commit.', it: '`git add` sposta i file nella "staging area" — una zona di preparazione dove selezioni esattamente cosa inserire nel prossimo commit.' }
    },
    {
      id: 'git-3-q3',
      question: { en: 'What happens when you create a new branch?', it: 'Cosa succede quando crei un nuovo branch?' },
      options: [
        { en: 'The entire repository and all its files are physically duplicated elsewhere on your local disk', it: 'L\'intero repository e tutti i suoi file vengono duplicati fisicamente altrove sul tuo disco locale' },
        { en: 'All existing commits in your history are permanently deleted to make room for new ones', it: 'Tutti i commit esistenti nella cronologia vengono eliminati definitivamente per fare spazio a quelli nuovi' },
        { en: 'A new independent line of development is created, sharing history up to that point', it: 'Viene creata una nuova linea di sviluppo indipendente, che condivide la cronologia fino a quel punto' },
        { en: 'Your local changes are automatically pushed to a remote server like GitHub or GitLab', it: 'Le tue modifiche locali vengono caricate automaticamente su un server remoto come GitHub o GitLab' }
      ],
      correct: 2,
      explanation: { en: 'Creating a branch is extremely lightweight. Git just creates a new pointer — all existing commits are shared. No duplication happens.', it: 'Creare un branch è estremamente leggero. Git crea solo un nuovo puntatore — tutti i commit esistenti sono condivisi. Non avviene alcuna duplicazione.' }
    },
    {
      id: 'git-3-q4',
      question: { en: 'What is a SHA hash in Git?', it: 'Cos\'è un hash SHA in Git?' },
      options: [
        { en: 'A temporary security password for accessing your private cloud repository', it: 'Una password di sicurezza temporanea per accedere al tuo repository cloud privato' },
        { en: 'A unique 40-character fingerprint that identifies a specific commit', it: 'Un\'impronta digitale unica di 40 caratteri che identifica un commit specifico' },
        { en: 'A descriptive name given to a branch to indicate its primary purpose', it: 'Un nome descrittivo dato a un branch per indicarne lo scopo principale' },
        { en: 'A mathematical algorithm used to compress large files for storage', it: 'Un algoritmo matematico usato per comprimere file di grandi dimensioni per l\'archiviazione' }
      ],
      correct: 1,
      explanation: { en: 'Every commit gets a unique SHA-1 hash (40 hexadecimal characters). This fingerprint lets Git reference any commit precisely — you can usually use just the first 7 characters.', it: 'Ogni commit riceve un hash SHA-1 unico (40 caratteri esadecimali). Questa impronta permette a Git di fare riferimento a qualsiasi commit con precisione — di solito puoi usare solo i primi 7 caratteri.' }
    },
    {
      id: 'git-3-q5',
      question: { en: 'What is a merge conflict?', it: 'Cos\'è un conflitto di merge?' },
      options: [
        { en: 'A situation where two different branches have been given the exact same name', it: 'Una situazione in cui a due branch diversi è stato dato esattamente lo stesso nome' },
        { en: 'When Git cannot automatically combine changes because of overlapping modifications', it: 'Quando Git non può combinare automaticamente le modifiche a causa di modifiche sovrapposte' },
        { en: 'An error that occurs when you try to save a commit without providing a message', it: 'Un errore che si verifica quando provi a salvare un commit senza fornire un messaggio' },
        { en: 'A connectivity issue that happens when the remote repository goes offline', it: 'Un problema di connettività che si verifica quando il repository remoto va offline' }
      ],
      correct: 1,
      explanation: { en: 'A merge conflict occurs when Git sees that two different branches changed the same lines of the same file. Git stops and asks you to decide which version (or combination) to keep.', it: 'Un conflitto di merge si verifica quando Git vede che due branch diversi hanno modificato le stesse righe dello stesso file. Git si ferma e ti chiede di decidere quale versione (o combinazione) tenere.' }
    }
  ]
}
