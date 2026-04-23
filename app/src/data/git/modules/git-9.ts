import type { Module } from '../../types'

export const git9: Module = {
  id: 'git-9',
  track: 'git',
  order: 9,
  title: { en: 'Power User Tools', it: 'Strumenti per Power User' },
  subtitle: { en: 'Surgical fixes and specialized debugging', it: 'Correzioni chirurgiche e debugging specializzato' },
  emoji: '🍒',
  duration: '15 min',
  xpReward: 90,
  funFact: { en: 'Git Bisect is so fast it can find a bug in 100,000 commits in just 17 steps. It is the closest thing to real-life time travel debugging.', it: 'Git Bisect è così veloce che può trovare un bug in 100.000 commit in soli 17 passaggi. È quanto di più vicino esista al debugging con viaggio nel tempo nella vita reale.' },
  sections: [
    {
      type: 'intro',
      content: { en: 'Basic Git is for daily saving. Power Git is for when things get complicated. These tools are your "surgical instruments" for maintaining a professional repository.', it: 'Il Git di base serve per i salvataggi quotidiani. Il Git avanzato serve per quando le cose si complicano. Questi strumenti sono i tuoi "strumenti chirurgici" per mantenere un repository professionale.' }
    },
    {
      type: 'concept',
      title: { en: '🍒 Cherry-picking: The Surgical Harvest', it: '🍒 Cherry-picking: Il Raccolto Chirurgico' },
      content: { en: 'Imagine there is a critical bugfix on a messy "experimental" branch. You don\'t want to merge the whole messy branch, you just want that **one specific fix**. \n\n**Cherry-pick** lets you grab a commit from anywhere and apply it to your current branch. It\'s like picking the best fruit from a tree without taking the whole branch.', it: 'Immagina che ci sia una correzione critica su un branch "sperimentale" disordinato. Non vuoi unire tutto il branch disordinato, vuoi solo quella **specifica correzione**. \n\n**Cherry-pick** ti permette di prendere un commit da ovunque e applicarlo al tuo branch attuale. È come raccogliere il frutto migliore da un albero senza prendere tutto il ramo.' }
    },
    {
      type: 'concept',
      title: { en: '🧪 Cherry-Pick Visualization', it: '🧪 Visualizzazione Cherry-Pick' },
      content: { en: 'Cherry-picking is like copy-pasting a specific commit from one branch to another. It creates a brand new commit on your current branch with the exact same changes as the source.', it: 'Il cherry-picking è come fare copia-incolla di uno specifico commit da un branch all\'altro. Crea un commit nuovo di zecca sul tuo branch attuale con gli stessi identici cambiamenti della sorgente.' }
    },
    {
       type: 'concept',
       title: { en: '🔀 Merge vs Rebase: The History Debate', it: '🔀 Merge vs Rebase: Il Dibattito sulla Storia' },
       content: { en: 'When joining branches, you have two philosophies:\n\n1. **Merge**: "Preserve the historical truth." It creates a merge commit showing exactly when branches rejoined.\n2. **Rebase**: "Maintain a clean, linear history." It rewrites your commits to look like they were built on top of the latest version of the main branch.\n\n**Beginner Tip**: Keep it simple. Merge is safer for teams; Rebase is better for keeping a clean personal history.', it: 'Quando si uniscono i branch, ci sono due filosofie:\n\n1. **Merge**: "Preservare la verità storica." Crea un commit di merge che mostra esattamente quando i branch si sono riuniti.\n2. **Rebase**: "Mantenere una cronologia pulita e lineare." Riscrive i tuoi commit per farli sembrare costruiti sopra l\'ultima versione del branch main.\n\n**Suggerimento per principianti**: Mantieni le cose semplici. Il merge è più sicuro per i team; il rebase è meglio per mantenere pulita la cronologia personale.' }
    },
    {
      type: 'concept',
      title: { en: '🧪 Rebase vs Merge Flow', it: '🧪 Flusso Rebase vs Merge' },
      content: { en: 'A **Merge** creates a diamond shape in your graph. A **Rebase** creates a straight line. Rebase is like saying: "I want my changes to look like they were always meant to be at the front of the line."', it: 'Un **Merge** crea una forma a diamante nel tuo grafico. Un **Rebase** crea una linea retta. Il rebase è come dire: "Voglio che i miei cambiamenti sembrino essere sempre stati pensati per stare in prima fila".' }
    },
    {
      type: 'concept',
      title: { en: '🔍 git bisect: The Needle in the Haystack', it: '🔍 git bisect: L\'ago nel pagliaio' },
      content: { en: '**The Problem**: A bug was introduced somewhere in the last 100 commits, but you don\'t know which one. Testing each one manually would take hours.\n\n**The Solution**: `git bisect` uses **Binary Search**. It picks a commit in the middle and asks you "Is it broken?". Based on your answer, it eliminates half the commits and repeats. It finds the culprit with surgical precision in minutes.', it: '**Il problema**: Un bug è stato introdotto da qualche parte negli ultimi 100 commit, ma non sai quale. Testarli tutti manualmente richiederebbe ore.\n\n**La soluzione**: `git bisect` usa la **ricerca binaria**. Sceglie un commit a metà e ti chiede "È rotto?". In base alla tua risposta, elimina metà dei commit e ripete. Trova il colpevole con precisione chirurgica in pochi minuti.' }
    },
    {
      type: 'concept',
      title: { en: '🕹️ Bisect Logic', it: '🕹️ Logica di Bisect' },
      content: { en: 'When debugging, `git bisect start` marks the "Bad" (broken) and "Good" (working) points. Git then checks out the point right in the middle for you to test.', it: 'Durante il debugging, `git bisect start` segna i punti "Bad" (rotto) e "Good" (funzionante). Git esegue quindi il checkout del punto proprio nel mezzo per permetterti di testarlo.' }
    },
    {
      type: 'concept',
      title: { en: '🚫 .gitignore: Cleanliness & Security', it: '🚫 .gitignore: Pulizia e Sicurezza' },
      content: { en: 'Not everything belongs in Git. You should **always** ignore:\n\n1. **Secrets**: Passwords, API keys (using `.env`).\n2. **Large Bulky Folders**: `node_modules`. These make clone times slow.\n3. **Build Artifacts**: Computed files (`dist/`, `build/`).\n\nIgnoring them keeps your repository fast, light, and secure.', it: 'Non tutto deve stare in Git. Dovresti **sempre** ignorare:\n\n1. **Segreti**: Password, chiavi API (usando `.env`).\n2. **Cartelle ingombranti**: `node_modules`. Queste rallentano i tempi di clone.\n3. **Artefatti di build**: File computati (`dist/`, `build/`).\n\nIgnorarli mantiene il tuo repository veloce, leggero e sicuro.' }
    },
    {
      type: 'animation',
      title: { en: '📦 The .gitignore Builder', it: '📦 Il Costruttore di .gitignore' },
      content: { en: 'Practice identifying which files should be tracked and which should be ignored.', it: 'Esercitati a identificare quali file dovrebbero essere tracciati e quali ignorati.' },
      animationType: 'git-ignore-lab'
    },
    {
      type: 'game',
      title: { en: 'Lab: Cherry-picking Harvest', it: 'Lab: Il Raccolto di Cherry-picking' },
      content: { en: 'Your colleague made a mess on their branch, but there are two excellent commits in the middle of the chaos. Steal them for your main branch.', it: 'Il tuo collega ha fatto un pasticcio sul suo branch, ma ci sono due ottimi commit nel mezzo del caos. "Rubali" per il tuo branch main.' },
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Initial commit' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Main work' },
            'C3': { id: 'C3', parents: ['C1'], message: 'Good feature 1' },
            'C4': { id: 'C4', parents: ['C3'], message: 'Terrible bug' },
            'C5': { id: 'C5', parents: ['C4'], message: 'Good feature 2' }
          },
          branches: { 'main': 'C2', 'chaos': 'C5' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: { en: 'Make sure you are on main. Use the command to "steal" (cherry-pick) only commit C3', it: 'Assicurati di essere su main. Usa il comando per "rubare" (cherry-pick) solo il commit C3' }, condition: 'COMMIT_COUNT:main:3' },
          { id: '2', instruction: { en: 'Repeat the operation to steal another one: bring in C5 as well, ignoring the bug', it: 'Ripeti l\'operazione per rubarne un altro: porta dentro anche C5, ignorando il bug' }, condition: 'COMMIT_COUNT:main:4' }
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '🎮 Practice This Module', it: '🎮 Esercitati con questo modulo' },
      content: { en: '**Learn Git Branching**: Complete *Moving Work Around* (Cherry-pick, Interactive Rebase) + *A Mixed Bag* (Tags, Juggling Commits, Git Describe)\n\n**Oh My Git!**: Play *Bisect*, *Tags* chapters, then try the *Sandbox*\n\n**Git Kata**: `amend`, `advanced-rebase-interactive`, `bad-commit` (bisect), `ignore`, `git-tag`\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)', it: '**Learn Git Branching**: Completa *Moving Work Around* (Cherry-pick, Interactive Rebase) + *A Mixed Bag* (Tags, Juggling Commits, Git Describe)\n\n**Oh My Git!**: Gioca i capitoli *Bisect*, *Tags*, poi prova la *Sandbox*\n\n**Git Kata**: `amend`, `advanced-rebase-interactive`, `bad-commit` (bisect), `ignore`, `git-tag`\n\n🚀 [Lancia Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)' }
    }
  ],
  quiz: [
    {
      id: 'git-9-q1',
      question: { en: 'In which scenario is `git cherry-pick` the most useful?', it: 'In quale scenario il `git cherry-pick` è più utile?' },
      options: [
        { en: 'When you need to merge two entire branches including all their commits', it: 'Quando devi unire due interi branch inclusi tutti i loro commit' },
        { en: 'When you want to take a specific bugfix commit from a feature branch into production', it: 'Quando vuoi prendere uno specifico commit di correzione bug da un branch di funzionalità alla produzione' },
        { en: 'When you need to delete a specific commit from the remote history forever', it: 'Quando devi eliminare per sempre uno specifico commit dalla cronologia remota' },
        { en: 'When you want to rename your current local branch to a different name', it: 'Quando vuoi rinominare il tuo attuale branch locale con un nome diverso' }
      ],
      correct: 1,
      explanation: { en: 'Cherry-picking is "surgical." It\'s best when you need just one or two specific changes from another branch without bringing in all the other work.', it: 'Il cherry-picking è "chirurgico". È ideale quando ti servono solo una o due modifiche specifiche da un altro branch senza portare dentro tutto l\'altro lavoro.' }
    },
    {
      id: 'git-9-q2',
      question: { en: 'What is the main advantage of using `git bisect`?', it: 'Qual è il vantaggio principale dell\'uso di `git bisect`?' },
      options: [
        { en: 'It automatically fixes the bug for you without any user intervention', it: 'Corregge automaticamente il bug per te senza alcun intervento dell\'utente' },
        { en: 'It finds the exact commit that introduced a bug using binary search', it: 'Trova l\'esatto commit che ha introdotto un bug usando la ricerca binaria' },
        { en: 'It highlights syntax errors and logic bugs directly in your source code', it: 'Evidenzia gli errori di sintassi e i bug logici direttamente nel tuo codice sorgente' },
        { en: 'It deletes all bad code commits from the repository automatically', it: 'Elimina automaticamente tutti i commit di codice errato dal repository' }
      ],
      correct: 1,
      explanation: { en: '`git bisect` is a debugging tool. It helps you find the "culprit" commit by narrowing down the history using a "search and eliminate" strategy.', it: '`git bisect` è uno strumento di debugging. Ti aiuta a trovare il commit "colpevole" restringendo la cronologia usando una strategia di "cerca ed elimina".' }
    },
    {
      id: 'git-9-q3',
      question: { en: 'Which of these files should NEVER be committed to Git for security reasons?', it: 'Quale di questi file non dovrebbe MAI essere committato su Git per motivi di sicurezza?' },
      options: [
        { en: 'index.html (The main entry point)', it: 'index.html (Il punto di ingresso principale)' },
        { en: 'style.css (The presentation layer)', it: 'style.css (Il livello di presentazione)' },
        { en: '.env (Containing secret API Keys)', it: '.env (Contenente chiavi API segrete)' },
        { en: 'README.md (The documentation file)', it: 'README.md (Il file di documentazione)' }
      ],
      correct: 2,
      explanation: { en: 'Files like `.env` contain sensitive secrets like passwords or API keys. If committed, they could be leaked to anyone with access to the repo (especially on GitHub!).', it: 'File come `.env` contengono segreti sensibili come password o chiavi API. Se committati, potrebbero essere trapelati a chiunque abbia accesso al repo (specialmente su GitHub!).' }
    },
    {
      id: 'git-9-q4',
      question: { en: 'What happens to the timeline when you use `git rebase`?', it: 'Cosa succede alla linea temporale quando usi `git rebase`?' },
      options: [
        { en: 'It creates a permanent "Merge Commit" node to join two different branches', it: 'Crea un nodo di "Merge Commit" permanente per unire due branch diversi' },
        { en: 'It rewrites history to create a clean, linear line of commits', it: 'Riscrive la cronologia per creare una linea pulita e lineare di commit' },
        { en: 'It deletes the feature branch permanently from your local repository', it: 'Elimina permanentemente il branch di funzionalità dal tuo repository locale' },
        { en: 'It sends an automatic email notification to the team leader or project manager', it: 'Invia una notifica email automatica al team leader o al project manager' }
      ],
      correct: 1,
      explanation: { en: 'Rebasing "re-bases" your work on top of the latest commit, making it look like you started your work just now. This results in a cleaner, straight-line history.', it: 'Il rebase "ri-basa" il tuo lavoro sopra l\'ultimo commit, facendo sembrare che tu abbia iniziato il lavoro proprio ora. Questo si traduce in una cronologia più pulita e lineare.' }
    },
    {
      id: 'git-9-q5',
      question: { en: 'Why do we ignore `node_modules` or `dist/` folders in `.gitignore`?', it: 'Perché ignoriamo le cartelle `node_modules` o `dist/` nel `.gitignore`?' },
      options: [
        { en: 'Because sharing these folders over a public network is strictly illegal', it: 'Perché condividere queste cartelle su una rete pubblica è strettamente illegale' },
        { en: 'Because they are large, generated files that can easily be rebuilt elsewhere', it: 'Perché sono file grandi e generati che possono essere facilmente ricostruiti altrove' },
        { en: 'Because the Git compression algorithm cannot handle large binary folders', it: 'Perché l\'algoritmo di compressione di Git non può gestire grandi cartelle binarie' },
        { en: 'Because including them causes merge conflicts 100% of the time', it: 'Perché includerli causa conflitti di merge il 100% delle volte' }
      ],
      correct: 1,
      explanation: { en: 'Generated files are bulky and slow down Git. Since anyone can run `npm install` or `npm run build` to get them back, we don\'t waste space saving them in history.', it: 'I file generati sono ingombranti e rallentano Git. Poiché chiunque può eseguire `npm install` o `npm run build` per riaverli, non sprechiamo spazio salvandoli nella cronologia.' }
    }
  ]
}
