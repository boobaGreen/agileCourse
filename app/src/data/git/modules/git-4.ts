import type { Module } from '../../types'

export const git4: Module = {
  id: 'git-4',
  track: 'git',
  order: 4,
  title: { en: 'Working with Branches', it: 'Lavorare con i Branch' },
  subtitle: { en: 'Branch fast, merge confidently, rebase wisely', it: 'Crea branch velocemente, fai merge con sicurezza, usa il rebase con saggezza' },
  emoji: '🌿',
  duration: '15 min',
  xpReward: 50,
  funFact: { en: 'GitHub processes over 100 million pull requests per year. Each PR is essentially a branch waiting to be merged.', it: 'GitHub elabora oltre 100 milioni di pull request all\'anno. Ogni PR è essenzialmente un branch in attesa di essere unito.' },
  sections: [
    {
      type: 'intro',
      content: { en: 'Branches are where the magic happens. They let you experiment, develop features in isolation, and work in parallel with teammates — all without breaking the main codebase.', it: 'I branch sono il luogo dove avviene la magia. Ti permettono di sperimentare, sviluppare funzionalità in isolamento e lavorare in parallelo con i compagni di squadra — il tutto senza rompere la base di codice principale.' }
    },
    {
      type: 'code',
      title: { en: '🌿 Essential branch commands', it: '🌿 Comandi essenziali per i branch' },
      content: { en: 'The commands you\'ll use every single day:', it: 'I comandi che userai ogni singolo giorno:' },
      code: `# Create and switch to a new branch in one step
git checkout -b feature/login-page

# Modern syntax (Git 2.23+)
git switch -c feature/login-page

# List all branches (* marks current)
git branch

# Switch to an existing branch  
git switch main

# Delete a branch (after merging)
git branch -d feature/login-page`,
      language: 'bash'
    },
    {
      type: 'concept',
      title: { en: '🔀 Merge vs Rebase — the eternal debate', it: '🔀 Merge vs Rebase — l\'eterno dibattito' },
      content: { en: 'Both commands solve the same problem: integrating changes from one branch into another. The difference is **how** they do it.', it: 'Entrambi i comandi risolvono lo stesso problema: integrare le modifiche da un branch all\'altro. La differenza è nel **come** lo fanno.' }
    },
    {
      type: 'animation',
      title: { en: '🧪 Merge vs Rebase Lab', it: '🧪 Lab Merge vs Rebase' },
      content: { en: 'Interactive comparison: See how `merge` creates a new path while `rebase` rewrites history for a clean line.', it: 'Confronto interattivo: guarda come `merge` crea un nuovo percorso mentre `rebase` riscrive la cronologia per una linea pulita.' },
      animationType: 'git-merge-rebase-lab'
    },
    {
      type: 'table',
      title: { en: '⚖️ Merge vs Rebase Comparison', it: '⚖️ Confronto Merge vs Rebase' },
      content: { en: 'When to use which approach:', it: 'Quando usare quale approccio:' },
      tableData: {
        headers: [{ en: 'Feature', it: 'Caratteristica' }, 'Merge 🔀', 'Rebase 🔄'],
        rows: [
          [{ en: '**History Type**', it: '**Tipo di Cronologia**' }, { en: 'Branching & Non-linear', it: 'Ramificata e non lineare' }, { en: 'Strictly Linear', it: 'Rigorosamente lineare' }],
          [{ en: '**What it does**', it: '**Cosa fa**' }, { en: 'Creates 1 new merge commit', it: 'Crea 1 nuovo commit di merge' }, { en: 'Rewrites existing commits on top of base', it: 'Riscrive i commit esistenti sopra la base' }],
          [{ en: '**Pros**', it: '**Pro**' }, { en: 'Shows exact historical truth. Non-destructive.', it: 'Mostra l\'esatta verità storica. Non distruttivo.' }, { en: 'Clean, easy-to-read history. No merge commits.', it: 'Cronologia pulita e facile da leggere. Nessun commit di merge.' }],
          [{ en: '**Cons**', it: '**Contro**' }, { en: 'Cluttered history if there are many branches', it: 'Cronologia disordinata se ci sono molti branch' }, { en: 'Rewrites history (dangerous if shared with others)', it: 'Riscrive la cronologia (pericoloso se condiviso con altri)' }],
          [{ en: '**Rule of Thumb**', it: '**Regola Generale**' }, { en: 'Use for shared branches and collaboration flows', it: 'Usa per branch condivisi e flussi di collaborazione' }, { en: 'Use to clean up local work before merging', it: 'Usa per pulire il lavoro locale prima del merge' }]
        ]
      }
    },
    {
      type: 'concept',
      title: { en: '📤 Pull Requests (PR) — The Gatekeeper', it: '📤 Pull Requests (PR) — Il Guardiano' },
      content: { en: 'A **Pull Request** (or Merge Request in GitLab) is not a Git command, but a workflow supported by platforms like GitHub. It is a formal request to merge your feature branch into the main project.\n\n- **Review**: Teammates look at your code, suggest changes, and approve it.\n- **Discussion**: You can chat about the implementation directly on the code lines.\n- **Automation**: CI/CD tools test your code automatically before it is allowed in.\n\nOnce the PR is approved, the platform "merges" your branch for you (usually with a button click!).', it: 'Una **Pull Request** (o Merge Request in GitLab) non è un comando Git, ma un flusso di lavoro supportato da piattaforme come GitHub. È una richiesta formale per unire il tuo branch di funzionalità nel progetto principale.\n\n- **Revisione**: I compagni di squadra guardano il tuo codice, suggeriscono modifiche e lo approvano.\n- **Discussione**: Puoi chattare sull\'implementazione direttamente sulle righe di codice.\n- **Automazione**: Gli strumenti di CI/CD testano il tuo codice automaticamente prima che sia ammesso.\n\nUna volta approvata la PR, la piattaforma "unisce" il branch per te (solitamente con un clic!).' }
    },
    {
      type: 'code',
      title: { en: '🔀 Merge example', it: '🔀 Esempio di Merge' },
      content: { en: 'The classic workflow — finish a feature and merge it back:', it: 'Il flusso di lavoro classico — finisci una funzionalità e uniscila di nuovo:' },
      code: `# Finish work on your feature branch
git switch main
git merge feature/login-page

# If conflicts arise, Git will tell you:
# CONFLICT (content): Merge conflict in app.js
# Open the file, resolve, then:
git add app.js
git commit -m "Resolve merge conflict in app.js"`,
      language: 'bash'
    },
    {
      type: 'code',
      title: { en: '⚡ Rebase example', it: '⚡ Esempio di Rebase' },
      content: { en: 'Replaying your commits on top of the latest main:', it: 'Riprodurre i tuoi commit sopra l\'ultimo main:' },
      code: `# On your feature branch:
git rebase main

# This replays your commits on top of main's tip
# If conflicts arise, resolve then:
git rebase --continue

# If you want to abort:
git rebase --abort`,
      language: 'bash'
    },
    {
      type: 'concept',
      title: { en: '⏩ Fast-Forward Merge', it: '⏩ Merge Fast-Forward' },
      content: { en: 'A **fast-forward merge** happens when the target branch (e.g. `main`) has had **no new commits** since you branched off. In this case, Git doesn\'t need to create a merge commit — it simply moves the branch pointer forward to the tip of your feature branch.\n\nThis results in a perfectly linear history, as if you had committed directly to `main`. Git does fast-forward merges automatically when possible.\n\n💡 You can force a merge commit even in fast-forward scenarios with `git merge --no-ff feature/x` — useful for keeping a record of the feature branch in history.', it: 'Un **merge fast-forward** avviene quando il branch di destinazione (es. `main`) non ha ricevuto **nessun nuovo commit** da quando hai creato il tuo branch. In questo caso, Git non ha bisogno di creare un commit di merge — sposta semplicemente il puntatore del branch in avanti verso la punta del tuo branch di funzionalità.\n\nQuesto si traduce in una cronologia perfettamente lineare, come se avessi fatto il commit direttamente su `main`. Git esegue i merge fast-forward automaticamente quando possibile.\n\n💡 Puoi forzare un commit di merge anche negli scenari fast-forward con `git merge --no-ff feature/x` — utile per mantenere una traccia del branch della funzionalità nella cronologia.' }
    },
    {
      type: 'tip',
      title: { en: '⚠️ Golden Rule of Rebase', it: '⚠️ Regola d\'Oro del Rebase' },
      content: { en: '**Never rebase commits that have been pushed to a shared remote branch.** Rebase rewrites history — if others have already fetched those commits, you\'ll create chaos. Only rebase local, unpublished commits.', it: '**Non fare mai il rebase di commit che sono stati caricati su un branch remoto condiviso.** Il rebase riscrive la cronologia — se altri hanno già scaricato quei commit, creerai il caos. Fai il rebase solo di commit locali non ancora pubblicati.' }
    },
    {
      type: 'game',
      title: { en: 'Lab: Safe Experimentation', it: 'Lab: Sperimentazione Sicura' },
      content: { en: 'This is the most common workflow: Split the history by creating a feature branch and then rejoin it with a merge commit.', it: 'Questo è il flusso di lavoro più comune: dividi la cronologia creando un branch di funzionalità e poi riuniscila con un commit di merge.' },
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Initial commit' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Add index' }
          },
          branches: { 'main': 'C2' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: { en: 'Create a branch named "feature" (use the branch command)', it: 'Crea un branch chiamato "feature" (usa il comando branch)' }, condition: 'BRANCH_EXISTS:feature' },
          { id: '2', instruction: { en: 'Switch to the newly created "feature" branch', it: 'Passa al branch "feature" appena creato' }, condition: 'CURRENT_BRANCH:feature' },
          { id: '3', instruction: { en: 'Now that you are on feature, make a commit to simulate some isolated new work', it: 'Ora che sei su feature, fai un commit per simulare del lavoro isolato' }, condition: 'COMMIT_COUNT:feature:3' },
          { id: '4', instruction: { en: 'Return to main and merge the work you did on feature into it', it: 'Torna su main e unisci (merge) il lavoro fatto su feature' }, condition: 'MERGED:feature' } 
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '🎮 Practice This Module', it: '🎮 Esercitati con questo modulo' },
      content: { en: '**Learn Git Branching**: Complete *Introduction Sequence — Levels 2-4* (Branching, Merging, Rebase)\n\n**Oh My Git!**: Play the *Branches* and *Merge* chapters\n\n**Git Kata**: `basic-branching`, `ff-merge`, `3-way-merge`, `merge-conflict`, `rebase-branch`\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)', it: '**Learn Git Branching**: Completa *Introduction Sequence — Livelli 2-4* (Branching, Merging, Rebase)\n\n**Oh My Git!**: Gioca i capitoli *Branches* e *Merge*\n\n**Git Kata**: `basic-branching`, `ff-merge`, `3-way-merge`, `merge-conflict`, `rebase-branch`\n\n🚀 [Lancia Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)' }
    }
  ],
  quiz: [
    {
      id: 'git-4-q1',
      question: { en: 'What does `git switch -c feature/x` do?', it: 'Cosa fa `git switch -c feature/x`?' },
      options: [
        { en: 'Switches to an existing branch named feature/x', it: 'Passa a un branch esistente chiamato feature/x' },
        { en: 'Creates a new branch named feature/x and switches to it', it: 'Crea un nuovo branch chiamato feature/x e vi passa' },
        { en: 'Deletes the branch named feature/x', it: 'Elimina il branch chiamato feature/x' },
        { en: 'Commits all changes to feature/x', it: 'Esegue il commit di tutte le modifiche su feature/x' }
      ],
      correct: 1,
      explanation: { en: 'The `-c` flag means "create". `git switch -c feature/x` creates a new branch and immediately switches to it — equivalent to the older `git checkout -b`.', it: 'Il flag `-c` significa "create" (crea). `git switch -c feature/x` crea un nuovo branch e vi passa immediatamente — equivalente al vecchio `git checkout -b`.' }
    },
    {
      id: 'git-4-q2',
      question: { en: 'What is the key difference between merge and rebase?', it: 'Qual è la differenza chiave tra merge e rebase?' },
      options: [
        { en: 'Merge is used exclusively for adding new files, while rebase is used for removing old commits from history', it: 'Il merge è usato esclusivamente per aggiungere nuovi file, mentre il rebase è usato per rimuovere vecchi commit dalla cronologia' },
        { en: 'Merge preserves history with a special merge commit, while rebase creates a linear line by replaying commits', it: 'Il merge preserva la cronologia con un commit di merge speciale, mentre il rebase crea una linea lineare riproducendo i commit' },
        { en: 'Merge is a strictly local operation, whereas rebase must be performed on a remote server like GitHub or GitLab', it: 'Il merge è un\'operazione strettamente locale, mentre il rebase deve essere eseguito su un server remoto come GitHub o GitLab' },
        { en: 'There is actually no technical difference between the two commands as they both achieve the exact same result', it: 'In realtà non c\'è differenza tecnica tra i due comandi poiché raggiungono entrambi lo stesso identico risultato' }
      ],
      correct: 1,
      explanation: { en: 'Merge joins branches by creating a new merge commit, preserving the full history. Rebase replays commits as if they were made from a different starting point, creating a cleaner linear history.', it: 'Il merge unisce i branch creando un nuovo commit di merge, preservando l\'intera cronologia. Il rebase riproduce i commit come se fossero stati fatti a partire da un punto diverso, creando una cronologia lineare più pulita.' }
    },
    {
      id: 'git-4-q3',
      question: { en: 'When should you NOT use rebase?', it: 'Quando NON dovresti usare il rebase?' },
      options: [
        { en: 'On local commits that have not yet been pushed to any remote repository for sharing with teammates', it: 'Su commit locali che non sono ancora stati caricati su alcun repository remoto per la condivisione con i compagni' },
        { en: 'On commits that have already been pushed and shared with other developers on a public or team branch', it: 'Su commit che sono già stati caricati e condivisi con altri sviluppatori su un branch pubblico o di team' },
        { en: 'Whenever your current feature branch has accumulated more than five individual commits in its history', it: 'Ogni volta che il tuo attuale branch di funzionalità ha accumulato più di cinque singoli commit nella sua cronologia' },
        { en: 'When you are working directly on the main production branch and want to keep your own local history clean', it: 'Quando stai lavorando direttamente sul branch principale di produzione e vuoi mantenere pulita la tua cronologia locale' }
      ],
      correct: 1,
      explanation: { en: 'Rebase rewrites commit history. If others have already based their work on those commits, rebasing will create divergent histories and cause major confusion.', it: 'Il rebase riscrive la cronologia dei commit. Se altri hanno già basato il loro lavoro su quei commit, il rebase creerà cronologie divergenti e causerà grande confusione.' }
    },
    {
      id: 'git-4-q4',
      question: { en: 'What is a "fast-forward" merge?', it: 'Cos\'è un merge "fast-forward"?' },
      options: [
        { en: 'A specialized type of merge that happens extremely quickly due to optimized internet bandwidth and speed', it: 'Un tipo specializzato di merge che avviene in modo estremamente rapido grazie alla larghezza di banda e alla velocità ottimizzate' },
        { en: 'A merge where Git simply moves the branch pointer forward because there were no new changes on the base branch', it: 'Un merge in cui Git sposta semplicemente il puntatore del branch in avanti perché non ci sono state nuove modifiche sul branch di base' },
        { en: 'An automated merge process that deletes the feature branch immediately after the changes have been integrated', it: 'Un processo di merge automatizzato che elimina il branch di funzionalità immediatamente dopo l\'integrazione delle modifiche' },
        { en: 'A premium Git feature that requires a professional enterprise license to use in large-scale corporate projects', it: 'Una funzionalità Git premium che richiede una licenza aziendale professionale per l\'uso in progetti aziendali su larga scala' }
      ],
      correct: 1,
      explanation: { en: 'If main hasn\'t changed since you branched off, Git simply moves main\'s pointer to your latest commit. No merge commit is needed.', it: 'Se main non è cambiato da quando hai creato il branch, Git sposta semplicemente il puntatore di main al tuo ultimo commit. Non è necessario alcun commit di merge.' }
    },
    {
      id: 'git-4-q5',
      question: { en: 'Why are Pull Requests (PRs) used in professional teams?', it: 'Perché le Pull Request (PR) sono usate nei team professionali?' },
      options: [
        { en: 'Because the Git command line tool is technically incapable of merging any files without a PR being opened', it: 'Perché lo strumento a riga di comando Git è tecnicamente incapace di unire qualsiasi file senza l\'apertura di una PR' },
        { en: 'To facilitate collaborative code review, team discussion, and automated testing before any code is merged', it: 'Per facilitare la revisione collaborativa del codice, la discussione di gruppo e i test automatizzati prima che il codice venga unito' },
        { en: 'To intentionally increase the size of the repository database for better archival and backup purposes', it: 'Per aumentare intenzionalmente le dimensioni del database del repository a scopo di archiviazione e backup' },
        { en: 'To add an extra layer of bureaucracy to the development process in order to slow down rapid release cycles', it: 'Per aggiungere un ulteriore livello di burocrazia al processo di sviluppo al fine di rallentare i cicli di rilascio rapidi' }
      ],
      correct: 1,
      explanation: { en: 'PRs provide a platform for human review and automated quality checks, ensuring that only high-quality code enters the main branch.', it: 'Le PR forniscono una piattaforma per la revisione umana e i controlli di qualità automatizzati, garantendo che solo codice di alta qualità entri nel branch principale.' }
    }
  ]
}
