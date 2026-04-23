import type { Module } from '../../types'

export const git5: Module = {
  id: 'git-5',
  track: 'git',
  order: 5,
  title: { en: 'Remote & Collaboration', it: 'Remote e Collaborazione' },
  subtitle: { en: 'Push, pull, fetch — and the magic of Pull Requests', it: 'Push, pull, fetch — e la magia delle Pull Request' },
  emoji: '🌐',
  duration: '12 min',
  xpReward: 50,
  funFact: { en: 'GitHub was launched in 2008. In 2018, Microsoft acquired it for $7.5 billion — the largest acquisition in Microsoft\'s history at the time.', it: 'GitHub è stato lanciato nel 2008. Nel 2018, Microsoft lo ha acquisito per 7,5 miliardi di dollari — la più grande acquisizione nella storia di Microsoft all\'epoca.' },
  sections: [
    {
      type: 'intro',
      content: { en: 'Git becomes truly powerful when you connect with teammates. Remote repositories (on GitHub, GitLab, or your company\'s server) are the bridge between local work and team collaboration.', it: 'Git diventa veramente potente quando ti connetti con i compagni di squadra. I repository remoti (su GitHub, GitLab o sul server della tua azienda) sono il ponte tra il lavoro locale e la collaborazione di team.' }
    },
    {
      type: 'flowchart',
      content: { en: '**The Network of Repositories**', it: '**La Rete dei Repository**' },
      diagramSteps: [
        { label: { en: 'Local Repo\n(Your Laptop)', it: 'Repo Locale\n(Il tuo Laptop)' }, icon: '💻', color: '#06d6a0' },
        { label: { en: 'push →\n← pull / fetch', it: 'push →\n← pull / fetch' }, icon: '🔁', color: '#ffd166' },
        { label: { en: 'Remote Repo\n(GitHub)', it: 'Repo Remoto\n(GitHub)' }, icon: '☁️', color: '#118ab2' }
      ]
    },
    {
      type: 'concept',
      title: { en: '🌍 What is a remote?', it: '🌍 Cos\'è un remote?' },
      content: { en: 'A remote is simply a **URL pointing to a repository on another machine** (a server). The convention is to call the main remote **"origin"** — the original source.\n\nWhen you clone a repo, Git automatically sets "origin" to the URL you cloned from.', it: 'Un remote è semplicemente un **URL che punta a un repository su un\'altra macchina** (un server). La convenzione è chiamare il remote principale **"origin"** — la fonte originale.\n\nQuando cloni un repo, Git imposta automaticamente "origin" all\'URL da cui hai effettuato il clone.' }
    },
    {
      type: 'code',
      title: { en: '🔗 Essential remote commands', it: '🔗 Comandi remote essenziali' },
      content: { en: 'Working with remote repositories. Use the **-u flag** the first time you push a branch to set it as "upstream" (tracking), so future commands can be shorter.', it: 'Lavorare con i repository remoti. Usa il **flag -u** la prima volta che fai il push di un branch per impostarlo come "upstream" (tracciamento), così i comandi futuri potranno essere più brevi.' },
      code: `# 1. Download the repo
git clone https://github.com/company/repo.git

# 2. Check for updates
git fetch origin

# 3. Pull (Merge)
git pull origin main

# 4. Pull (Rebase)
git pull --rebase origin main

# 5. Push your work and set upstream
git push -u origin main`,
      language: 'bash'
    },
    {
      type: 'concept',
      title: { en: '📦 Bare Repositories', it: '📦 Repository Bare' },
      content: { en: 'On a server or remote (like GitHub), repositories are often **"bare"**. A bare repo has no working directory (you can\'t edit files there); it only contains the Git history database. It is created with `git init --bare`.', it: 'Su un server o un remote (come GitHub), i repository sono spesso **"bare"**. Un repository bare non ha una working directory (non puoi modificare i file lì); contiene solo il database della cronologia di Git. Si crea con `git init --bare`.' }
    },
    {
      type: 'animation',
      title: { en: '🧪 Remote Sync Lab', it: '🧪 Lab Sincronizzazione Remota' },
      content: { en: 'Visualizing the bridge between your laptop and GitHub. Understand the flow of `push`, `fetch`, and `pull`.', it: 'Visualizzare il ponte tra il tuo laptop e GitHub. Capire il flusso di `push`, `fetch` e `pull`.' },
      animationType: 'git-remote-sync-lab'
    },
    {
      type: 'flowchart',
      content: { en: '**The Pull Request Lifecycle**', it: '**Il ciclo di vita di una Pull Request**' },
      diagramSteps: [
        { label: { en: '1. Push Branch', it: '1. Push del Branch' }, icon: '🚀', color: '#06d6a0' },
        { label: { en: '2. Open PR', it: '2. Apertura PR' }, icon: '📝', color: '#ffd166' },
        { label: { en: '3. Review Code', it: '3. Revisione Codice' }, icon: '👀', color: '#ffb703' },
        { label: { en: '4. Merge', it: '4. Merge' }, icon: '🔀', color: '#118ab2' }
      ]
    },
    {
      type: 'concept',
      title: { en: '📬 Pull Requests (PRs)', it: '📬 Pull Requests (PR)' },
      content: { en: 'A Pull Request is not a Git feature — it\'s a **GitHub/GitLab workflow**. When your branch is ready:\n\n1. Push your branch to the remote\n2. Open a PR: "I want to merge `feature/x` into `main`"\n3. Teammates review the code, leave comments\n4. Once approved, the PR is merged\n\nThis review step is how teams catch bugs and share knowledge before code reaches production.', it: 'Una Pull Request non è una funzionalità di Git — è un **flusso di lavoro di GitHub/GitLab**. Quando il tuo branch è pronto:\n\n1. Fai il push del tuo branch sul remote\n2. Apri una PR: "Voglio unire `feature/x` in `main`"\n3. I compagni di squadra revisionano il codice e lasciano commenti\n4. Una volta approvata, la PR viene unita\n\nQuesto passaggio di revisione è il modo in cui i team scovano bug e condividono conoscenze prima che il codice arrivi in produzione.' }
    },
    {
      type: 'concept',
      title: { en: '⬇️ fetch vs pull — what\'s the difference?', it: '⬇️ fetch vs pull — qual è la differenza?' },
      content: { en: '**`git fetch`** downloads new commits from the remote but does **not** change your local files. You can inspect what changed before integrating.\n\n**`git pull`** is `fetch + merge` in one command. It downloads and immediately integrates remote changes into your current branch.\n\n💡 Prefer `fetch` + inspect + `merge` when you want more control.', it: '**`git fetch`** scarica i nuovi commit dal remote ma **non** modifica i tuoi file locali. Puoi ispezionare cosa è cambiato prima di integrare.\n\n**`git pull`** è `fetch + merge` in un unico comando. Scarica e integra immediatamente le modifiche remote nel tuo branch attuale.\n\n💡 Preferisci `fetch` + ispezione + `merge` quando vuoi più controllo.' }
    },
    {
      type: 'table',
      title: { en: '✅ Git Etiquette: Team Rules', it: '✅ Galateo di Git: Regole del Team' },
      content: { en: 'Follow these "Rules of the Road" to avoid breaking the build and keep your teammates happy:', it: 'Segui queste "regole della strada" per evitare di rompere il progetto e mantenere felici i tuoi compagni di squadra:' },
      tableData: {
        headers: [{ en: '✅ DO (Best Practices)', it: '✅ DA FARE (Best Practice)' }, { en: '❌ DON\'T (Danger Zones)', it: '❌ DA NON FARE (Pericoli)' }],
        rows: [
          [{ en: '`git pull --rebase` before starting work', it: '`git pull --rebase` prima di iniziare a lavorare' }, { en: 'Commit directly to the `main` branch', it: 'Fare commit direttamente sul branch `main`' }],
          [{ en: 'Push small, atomic commits', it: 'Fare il push di commit piccoli e atomici' }, { en: 'Push giant, "everything at once" commits', it: 'Fare il push di commit giganti "tutto in una volta"' }],
          [{ en: 'Explain **WHY** in commit messages', it: 'Spiegare il **PERCHÉ** nei messaggi di commit' }, { en: 'Write "Fix", "Update" or "WIP"', it: 'Scrivere "Fix", "Update" o "WIP"' }],
          [{ en: 'Create a branch for every feature', it: 'Creare un branch per ogni funzionalità' }, { en: 'Force push (`--force`) to shared branches', it: 'Usare il force push (`--force`) su branch condivisi' }]
        ]
      }
    },
    {
      type: 'animation',
      content: 'git-force-danger'
    },
    {
      type: 'game',
      title: { en: 'Lab: Sync the Team', it: 'Lab: Sincronizza il Team' },
      content: { en: 'Imagine you just ran `git fetch` and downloaded a new branch called `origin/main` with your team\'s commits. Merge it into your local work to finalize the synchronization!', it: 'Immagina di aver appena eseguito `git fetch` e di aver scaricato un nuovo branch chiamato `origin/main` con i commit del tuo team. Uniscilo al tuo lavoro locale per finalizzare la sincronizzazione!' },
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Initial commit' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Your local commit' },
            'C3': { id: 'C3', parents: ['C1'], message: 'Teammates commit' }
          },
          branches: { 'main': 'C2', 'origin/main': 'C3' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: { en: 'You find new work on the origin/main branch: merge it into your branch to finish the synchronization!', it: 'Hai trovato nuovo lavoro sul branch origin/main: uniscilo (merge) al tuo branch per finire la sincronizzazione!' }, condition: 'MERGED:origin/main' }
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '🎮 Practice This Module', it: '🎮 Esercitati con questo modulo' },
      content: { en: '**Learn Git Branching**: Complete the *Remote Tab — Push & Pull* sequence (levels 1-8: Clone, Fetch, Pull, Push, Diverged History)\n\n**Oh My Git!**: Play the *Remotes* chapter\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)', it: '**Learn Git Branching**: Completa la sequenza *Remote Tab — Push & Pull* (livelli 1-8: Clone, Fetch, Pull, Push, Diverged History)\n\n**Oh My Git!**: Gioca il capitolo *Remotes*\n\n🚀 [Lancia Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)' }
    }
  ],
  quiz: [
    {
      id: 'git-5-q1',
      question: { en: 'What is "origin" in Git?', it: 'Cos\'è "origin" in Git?' },
      options: [
        { en: 'The cryptographic identifier of the first commit ever made in the project history', it: 'L\'identificatore crittografico del primo commit mai fatto nella storia del progetto' },
        { en: 'The default name for the remote repository URL your local repo was cloned from', it: 'Il nome predefinito per l\'URL del repository remoto da cui è stato clonato il tuo repo locale' },
        { en: 'The primary production branch used for all stable releases of the application', it: 'Il branch principale di produzione usato per tutti i rilascini stabili dell\'applicazione' },
        { en: 'A local configuration file used to store user credentials and environment settings', it: 'Un file di configurazione locale usato per memorizzare le credenziali utente e le impostazioni di ambiente' }
      ],
      correct: 1,
      explanation: { en: '"origin" is just a conventional name for the primary remote. When you clone a repo, Git automatically names that source "origin".', it: '"origin" è solo un nome convenzionale per il remote principale. Quando cloni un repo, Git nomina automaticamente quella sorgente "origin".' }
    },
    {
      id: 'git-5-q2',
      question: { en: 'What is the difference between `git fetch` and `git pull`?', it: 'Qual è la differenza tra `git fetch` e `git pull`?' },
      options: [
        { en: 'fetch is used for downloading files, while pull is used for synchronizing commits', it: 'fetch si usa per scaricare i file, mentre pull si usa per sincronizzare i commit' },
        { en: 'fetch downloads remote changes without merging; pull downloads AND merges them', it: 'fetch scarica le modifiche remote senza unirle; pull le scarica E le unisce' },
        { en: 'fetch only works on enterprise GitHub servers, while pull works on any remote', it: 'fetch funziona solo sui server GitHub enterprise, mentre pull funziona su qualsiasi remote' },
        { en: 'There is actually no technical difference between these two synchronization commands', it: 'In realtà non c\'è differenza tecnica tra questi due comandi di sincronizzazione' }
      ],
      correct: 1,
      explanation: { en: '`git fetch` is safe — it downloads remote changes but leaves your working files untouched. `git pull` goes further by also merging (or rebasing) those changes into your current branch.', it: '`git fetch` è sicuro — scarica le modifiche remote ma lascia invariati i tuoi file di lavoro. `git pull` va oltre unendo (o facendo il rebase) anche quelle modifiche nel tuo branch attuale.' }
    },
    {
      id: 'git-5-q3',
      question: { en: 'What is a Pull Request?', it: 'Cos\'è una Pull Request?' },
      options: [
        { en: 'A specialized Git command used to download binary files from a remote server', it: 'Un comando Git specializzato usato per scaricare file binari da un server remoto' },
        { en: 'A platform feature for requesting that your branch be reviewed and then merged', it: 'Una funzionalità della piattaforma per richiedere che il tuo branch venga revisionato e poi unito' },
        { en: 'A terminal command used for rebasing your local branches against a remote main', it: 'Un comando del terminale usato per fare il rebase dei tuoi branch locali rispetto a un main remoto' },
        { en: 'A standard Git method for resolving complex merge conflicts in large teams', it: 'Un metodo standard di Git per risolvere conflitti di merge complessi in team numerosi' }
      ],
      correct: 1,
      explanation: { en: 'A Pull Request is a platform feature, not a Git command. It\'s a formal request saying "please review my changes and merge this branch." The review process is central to modern team workflows.', it: 'Una Pull Request è una funzionalità della piattaforma, non un comando Git. È una richiesta formale che dice "per favore revisiona le mie modifiche e unisci questo branch". Il processo di revisione è centrale nei flussi di lavoro moderni dei team.' }
    },
    {
      id: 'git-5-q4',
      question: { en: 'Which command is "safer" because it downloads remote data but does not modify your local code until you are ready?', it: 'Quale comando è più "sicuro" perché scarica i dati remoti ma non modifica il tuo codice locale finché non sei pronto?' },
      options: [
        { en: 'git pull (downloads and merges automatically)', it: 'git pull (scarica e unisce automaticamente)' },
        { en: 'git fetch (downloads only for your inspection)', it: 'git fetch (scarica solo per la tua ispezione)' },
        { en: 'git push (uploads your local work to remote)', it: 'git push (carica il tuo lavoro locale sul remote)' },
        { en: 'git update (a generic command for refreshing)', it: 'git update (un comando generico per aggiornare)' }
      ],
      correct: 1,
      explanation: { en: '`git fetch` downloads the latest data from the remote server so you can inspect it. It doesn\'t force a merge, so it won\'t create conflicts or change your files until you manually run merge or rebase.', it: '`git fetch` scarica gli ultimi dati dal server remoto in modo che tu possa ispezionarli. Non forza un merge, quindi non creerà conflitti né cambierà i tuoi file finché non eseguirai manualmente merge o rebase.' }
    },
    {
      id: 'git-5-q5',
      question: { en: 'What happens if you try to `git push` but a teammate has already pushed other changes to the same branch on the server?', it: 'Cosa succede se provi a fare `git push` ma un compagno di squadra ha già caricato altre modifiche sullo stesso branch sul server?' },
      options: [
        { en: 'Git automatically merges both sets of changes for you on the remote server', it: 'Git unisce automaticamente entrambi i set di modifiche per te sul server remoto' },
        { en: 'Git rejects your push because your local history is behind the remote version', it: 'Git rifiuta il tuo push perché la tua cronologia locale è indietro rispetto alla versione remota' },
        { en: 'Your local changes will completely overwrite whatever the teammate previously pushed', it: 'Le tue modifiche locali sovrascriveranno completamente qualunque cosa il compagno abbia caricato in precedenza' },
        { en: 'Git will delete the remote branch to prevent any further history divergence', it: 'Git eliminerà il branch remoto per prevenire ulteriori divergenze nella cronologia' }
      ],
      correct: 1,
      explanation: { en: 'Git is protective. If the remote history has moved forward since your last pull, it will reject your push. You must `git pull` first, resolve any conflicts, and then push.', it: 'Git è protettivo. Se la cronologia remota è andata avanti dal tuo ultimo pull, rifiuterà il tuo push. Devi prima fare `git pull`, risolvere eventuali conflitti e poi fare il push.' }
    }
  ]
}
