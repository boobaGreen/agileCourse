import type { Module } from '../../types'

export const git7: Module = {
  id: 'git-7',
  track: 'git',
  order: 7,
  title: { en: 'Daily Fundamentals', it: 'Fondamentali Quotidiani' },
  subtitle: { en: 'Master the core loop: Init, Stage, Commit', it: 'Domina il ciclo principale: Init, Stage, Commit' },
  emoji: '⚙️',
  duration: '8 min',
  xpReward: 60,
  sections: [
    {
      type: 'intro',
      content: { en: 'To master Git, you must understand the **Three Areas** flow. These commands are your bread and butter.', it: 'Per padroneggiare Git, devi capire il flusso delle **Tre Aree**. Questi comandi sono il tuo pane quotidiano.' }
    },
    {
      type: 'video',
      title: { en: '📺 Git basics in 60 seconds!', it: '📺 Le basi di Git in 60 secondi!' },
      content: { en: 'A hyper-fast overview of the daily commit loop and staging area by ThePrimeagen.', it: 'Una panoramica velocissima del ciclo quotidiano di commit e della staging area di ThePrimeagen.' },
      videoUrl: 'https://www.youtube.com/watch?v=KjusL9BBZ7U'
    },
    {
      type: 'code',
      title: { en: '⚙️ Configuration', it: '⚙️ Configurazione' },
      content: { en: 'Before you commit, Git needs to know who you are:', it: 'Prima di fare un commit, Git deve sapere chi sei:' },
      code: `git config --global user.name "Your Name"
git config --global user.email "you@email.com"
git config --global init.defaultBranch main`,
      language: 'bash'
    },
    {
      type: 'animation',
      title: { en: '🧪 The Staging Lab', it: '🧪 Il Lab dello Staging' },
      content: { en: 'Interact with the 3 Git Areas. See how files move from your folder to the Staging area, and finally into the Repository snapshot.', it: 'Interagisci con le 3 Aree di Git. Guarda come i file si spostano dalla tua cartella alla Staging area, e infine nello snapshot del Repository.' },
      animationType: 'git-stage-lab'
    },
    {
      type: 'code',
      title: { en: '📦 Starting & Status', it: '📦 Avvio e Status' },
      content: { en: 'Create a new repo or clone an existing one:', it: 'Crea un nuovo repo o clona uno esistente:' },
      code: `git init                    # Create .git folder
git clone <url>             # Copy remote repo
git status                  # What's happening?`,
      language: 'bash'
    },
    {
      type: 'table',
      title: { en: '📸 The Daily Saving Loop', it: '📸 Il Ciclo di Salvataggio Quotidiano' },
      content: { en: 'Use these commands hundreds of times a day:', it: 'Usa questi comandi centinaia di volte al giorno:' },
      tableData: {
        headers: [{ en: 'Command', it: 'Comando' }, { en: 'Purpose', it: 'Scopo' }, { en: 'Example', it: 'Esempio' }],
        rows: [
          ['`git add .`', { en: 'Stages all changes in the current folder', it: 'Mette in stage tutte le modifiche nella cartella corrente' }, '`git add .`'],
          ['`git add <file>`', { en: 'Stages only a specific file (recommended)', it: 'Mette in stage solo un file specifico (raccomandato)' }, '`git add index.html`'],
          ['`git commit -m "msg"`', { en: 'Saves snapshot with a descriptive message', it: 'Salva uno snapshot con un messaggio descrittivo' }, '`git commit -m "Fix login bug"`'],
          ['`git commit --amend -m "..."`', { en: 'Fixes the last commit using staged files', it: 'Corregge l\'ultimo commit usando i file in stage' }, '`git commit --amend -m "Fix typo"`'],
          ['`git diff`', { en: 'Shows unstaged changes between workspace and staging', it: 'Mostra le modifiche non in stage tra workspace e staging' }, '`git diff`'],
          ['`git log`', { en: 'Shows the timeline of commits (history)', it: 'Mostra la cronologia dei commit (storia)' }, '`git log --oneline`']
        ]
      }
    },
    {
      type: 'game',
      title: { en: 'Lab: Detached HEAD', it: 'Lab: HEAD Distaccata' },
      content: { en: 'Detach your HEAD from the current branch to travel back in time and inspect past commits without altering the main history.', it: 'Scollega la tua HEAD dal branch attuale per viaggiare nel tempo e ispezionare i commit passati senza alterare la storia principale.' },
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Initial commit' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Feature A works' },
            'C3': { id: 'C3', parents: ['C2'], message: 'Feature B buggy' },
            'C4': { id: 'C4', parents: ['C3'], message: 'Feature C added' }
          },
          branches: { 'main': 'C4' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: { en: 'Detach from the current branch by checking out directly to hash C2', it: 'Scollegati dal branch attuale facendo il checkout direttamente sull\'hash C2' }, condition: 'DETACHED_HEAD:C2' },
          { id: '2', instruction: { en: 'Return to the present by re-attaching HEAD to the main branch', it: 'Torna al presente ricollegando l\'HEAD al branch main' }, condition: 'CURRENT_BRANCH:main' }
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '🎮 Practice This Module', it: '🎮 Esercitati con questo modulo' },
      content: { en: '**Learn Git Branching**: Revisit *Introduction Sequence — Level 1* (Introduction to Git Commits)\n\n**Oh My Git!**: Play the *Files* and *Index* chapters\n\n**Git Kata**: `basic-commits`, `basic-staging`, `basic-cleaning`\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)', it: '**Learn Git Branching**: Rivisita *Introduction Sequence — Livello 1* (Introduction to Git Commits)\n\n**Oh My Git!**: Gioca i capitoli *Files* e *Index*\n\n**Git Kata**: `basic-commits`, `basic-staging`, `basic-cleaning`\n\n🚀 [Lancia Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)' }
    }
  ],
  quiz: [
    {
      id: 'git-7-q1',
      question: { en: 'Which area acts as a "waiting room" before a commit is saved?', it: 'Quale area funge da "sala d\'attesa" prima che un commit venga salvato?' },
      options: [
        { en: 'Working Directory', it: 'Working Directory' },
        { en: 'Staging Area', it: 'Staging Area' },
        { en: 'Local Repository', it: 'Local Repository' },
        { en: 'Remote Server', it: 'Server Remoto' }
      ],
      correct: 1,
      explanation: { en: 'The Staging Area (or Index) is where you pick which changes to include in your next snapshot (commit).', it: 'La Staging Area (o Index) è dove scegli quali modifiche includere nel tuo prossimo snapshot (commit).' }
    },
    {
      id: 'git-7-q2',
      question: { en: 'What command is used to move your modifications from the Working Directory into the Staging Area?', it: 'Quale comando si usa per spostare le tue modifiche dalla Working Directory alla Staging Area?' },
      options: ['git commit', 'git status', 'git push', 'git add'],
      correct: 3,
      explanation: { en: 'The `git add` command stages your changes, placing them in the "waiting room" before they become a permanent commit.', it: 'Il comando `git add` mette in stage le tue modifiche, piazzandole nella "sala d\'attesa" prima che diventino un commit permanente.' }
    },
    {
      id: 'git-7-q3',
      question: { en: 'What is the primary function of the `git commit --amend` command?', it: 'Qual è la funzione principale del comando `git commit --amend`?' },
      options: [
        { en: 'To delete the last commit permanently', it: 'Eliminare l\'ultimo commit permanentemente' },
        { en: 'To edit the previous commit by merging new staged changes or rewriting the message', it: 'Modificare il commit precedente unendo nuove modifiche in stage o riscrivendo il messaggio' },
        { en: 'To automatically push your commit to the cloud', it: 'Fare il push automatico del tuo commit sul cloud' },
        { en: 'To undo everything and empty the staging area', it: 'Annullare tutto e svuotare la staging area' }
      ],
      correct: 1,
      explanation: { en: '`git commit --amend` modifies the very last commit, which is incredibly useful for instantly fixing a typo or adding a forgotten file.', it: '`git commit --amend` modifica l\'ultimo commit, il che è incredibilmente utile per correggere istantaneamente un refuso o aggiungere un file dimenticato.' }
    },
    {
      id: 'git-7-q4',
      question: { en: 'Which status color usually represents a file that is staged and ready to be committed?', it: 'Quale colore di stato rappresenta solitamente un file che è in stage e pronto per il commit?' },
      options: [
        { en: 'Red', it: 'Rosso' },
        { en: 'Green', it: 'Verde' },
        { en: 'Yellow', it: 'Giallo' },
        { en: 'Blue', it: 'Blu' }
      ],
      correct: 1,
      explanation: { en: 'In the `git status` output, files listed in green are staged and ready for the next commit, while red files are modified but not yet staged.', it: 'Nell\'output di `git status`, i file elencati in verde sono in stage e pronti per il prossimo commit, mentre i file rossi sono modificati ma non ancora in stage.' }
    },
    {
      id: 'git-7-q5',
      question: { en: 'What is an "atomic commit" in professional Git usage?', it: 'Cos\'è un "commit atomico" nell\'uso professionale di Git?' },
      options: [
        { en: 'A commit that contains every change made during a whole week', it: 'Un commit che contiene ogni modifica fatta durante un\'intera settimana' },
        { en: 'A small, focused commit that handles only one specific task or fix', it: 'Un commit piccolo e mirato che gestisce solo un compito o una correzione specifica' },
        { en: 'A commit that automatically deletes itself after merge', it: 'Un commit che si cancella automaticamente dopo il merge' },
        { en: 'A very large commit that requires special permissions', it: 'Un commit molto grande che richiede permessi speciali' }
      ],
      correct: 1,
      explanation: { en: 'Atomic commits are better because they make debugging, reverting, and reviewing much easier for the entire team.', it: 'I commit atomici sono migliori perché rendono il debugging, il ripristino e la revisione molto più facili per l\'intero team.' }
    }
  ]
}
