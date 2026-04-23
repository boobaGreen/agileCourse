import type { Module } from '../../types'

export const git10: Module = {
  id: 'git-10',
  track: 'git',
  order: 10,
  title: { en: 'Git Games & Interactive Labs', it: 'Giochi e Lab Interattivi su Git' },
  subtitle: { en: 'Master Git through world-class interactive games', it: 'Padroneggia Git attraverso giochi interattivi di livello mondiale' },
  emoji: '🎮',
  duration: '∞ min',
  xpReward: 100,
  funFact: { en: 'Interactive games are one of the most effective ways to learn Git because they force you to visualize the commit tree, which is exactly how Git works internally.', it: 'I giochi interattivi sono uno dei modi più efficaci per imparare Git perché ti costringono a visualizzare l\'albero dei commit, che è esattamente il modo in cui Git funziona internamente.' },
  sections: [
    {
      type: 'intro',
      content: { en: 'You have learned the theory. Now it is time for the **Proving Grounds**. These world-class interactive tools are used by professional developers around the world to master complex branching and merging logic. Choose your weapon!', it: 'Hai imparato la teoria. Ora è il momento del **Campo di Prova**. Questi strumenti interattivi di livello mondiale sono usati dagli sviluppatori professionisti di tutto il mondo per padroneggiare la complessa logica di branching e merging. Scegli la tua arma!' }
    },

    // ── OH MY GIT! ───────────────────────────────────────────────────
    {
      type: 'concept',
      title: { en: '📦 Oh My Git!: The Tactile Card Game', it: '📦 Oh My Git!: Il gioco di carte tattile' },
      content: { en: 'An incredible open-source game built with the Godot engine. It uses a **card-based interface** to represent Git operations, making the staging area and commit flow feel physical and tactical.\n\n**Best for**: Absolute beginners wanting a fun, structured challenge.\n**Difficulty**: Beginner Friendly\n**Play Mode**: Download & Install (Windows, Mac, Linux)\n\n📥 [Download Oh My Git!](https://ohmygit.org/)\n🎬 [Watch dev talks & demos](https://ohmygit.org/videos/)', it: 'Un incredibile gioco open source costruito con il motore Godot. Usa un\'**interfaccia basata su carte** per rappresentare le operazioni Git, rendendo la staging area e il flusso dei commit fisici e tattici.\n\n**Ideale per**: Principianti assoluti che vogliono una sfida divertente e strutturata.\n**Difficoltà**: Adatto ai principianti\n**Modalità di gioco**: Scarica e installa (Windows, Mac, Linux)\n\n📥 [Scarica Oh My Git!](https://ohmygit.org/)\n🎬 [Guarda talk e demo](https://ohmygit.org/videos/)' }
    },
    {
      type: 'video',
      title: { en: '📺 Oh My Git! — Gameplay & First Impressions', it: '📺 Oh My Git! — Gameplay e prime impressioni' },
      content: { en: 'See someone play Oh My Git! from scratch — a great way to understand how the card system and visual Git tree interact.', it: 'Guarda qualcuno giocare a Oh My Git! da zero — un ottimo modo per capire come interagiscono il sistema di carte e l\'albero visivo di Git.' },
      videoUrl: 'https://www.youtube.com/watch?v=dnAy6aIbIWo'
    },

    // ── LEARN GIT BRANCHING ──────────────────────────────────────────
    {
      type: 'concept',
      title: { en: '🌟 Learn Git Branching: The Browser Masterclass', it: '🌟 Learn Git Branching: La Masterclass nel Browser' },
      content: { en: 'The most popular Git simulator in the world. It provides a **visual terminal** that reacts instantly to your commands, showing you the commit tree in real time.\n\n**Best for**: Visualizing exact branching, rebasing, and cherry-picking paths.\n**Difficulty**: Beginner to Expert (Scales with your progress)\n**Play Mode**: Web Browser — No installation needed\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/)', it: 'Il simulatore Git più popolare al mondo. Fornisce un **terminale visivo** che reagisce istantaneamente ai tuoi comandi, mostrandoti l\'albero dei commit in tempo reale.\n\n**Ideale per**: Visualizzare percorsi esatti di branching, rebasing e cherry-picking.\n**Difficoltà**: Da principiante a esperto (scala con i tuoi progressi)\n**Modalità di gioco**: Browser web — Nessuna installazione necessaria\n\n🚀 [Lancia Learn Git Branching](https://learngitbranching.js.org/)' }
    },
    {
      type: 'video',
      title: { en: '📺 Learn Git with LearnGitBranching — Walkthrough (8 min)', it: '📺 Impara Git con LearnGitBranching — Walkthrough (8 min)' },
      content: { en: 'A practical video walkthrough showing exactly how to navigate and use the interactive tool.', it: 'Un video walkthrough pratico che mostra esattamente come navigare e usare lo strumento interattivo.' },
      videoUrl: 'https://www.youtube.com/watch?v=1SM-LQD-CSQ'
    },
    {
      type: 'video',
      title: { en: '📺 Full Playlist: Git Branching Interactive Tutorials', it: '📺 Playlist completa: Tutorial interattivi su Git Branching' },
      content: { en: 'A curated playlist with multiple guided sessions for mastering every level of the interactive challenges.', it: 'Una playlist curata con sessioni guidate multiple per padroneggiare ogni livello delle sfide interattive.' },
      videoUrl: 'https://www.youtube.com/playlist?list=PLymYmPL9yPGp5bcyx3LqHZmS8KDYsT4NY'
    },

    // ── GIT KATAS ────────────────────────────────────────────────────
    {
      type: 'concept',
      title: { en: '🥋 Git Katas: Deliberate CLI Practice', it: '🥋 Git Katas: Pratica deliberata della CLI' },
      content: { en: 'A collection of **30+ hands-on exercises** created by Eficode Academy, inspired by the martial arts concept of "Kata" — deliberate, repetitive practice to build muscle memory.\n\nEach kata is a self-contained challenge: you clone the repo, run a setup script, and solve a specific Git problem in your own terminal. From `basic-commits` to `interactive-rebase` and `merge-conflict` resolution.\n\n**Best for**: Developers who want to practice **real CLI commands** in a safe sandbox.\n**Difficulty**: Beginner to Advanced (30+ exercises, progressive)\n**Play Mode**: Local terminal — Clone & Practice\n\n📂 [Clone Git Katas](https://github.com/eficode-academy/git-katas)\n📖 [GitHub Katas (PRs & Issues)](https://github.com/eficode-academy/github-katas)', it: 'Una collezione di **oltre 30 esercizi pratici** creati dalla Eficode Academy, ispirati al concetto di "Kata" delle arti marziali — pratica deliberata e ripetitiva per costruire la memoria muscolare.\n\nOgni kata è una sfida a sé stante: cloni il repo, esegui uno script di setup e risolvi uno specifico problema Git nel tuo terminale. Da `basic-commits` a `interactive-rebase` e risoluzione di `merge-conflict`.\n\n**Ideale per**: Sviluppatori che vogliono praticare **veri comandi CLI** in un ambiente sicuro.\n**Difficoltà**: Da principiante ad avanzato (oltre 30 esercizi, progressivo)\n**Modalità di gioco**: Terminale locale — Clona ed esercitati\n\n📂 [Clona Git Katas](https://github.com/eficode-academy/git-katas)\n📖 [GitHub Katas (PRs & Issues)](https://github.com/eficode-academy/github-katas)' }
    },
    {
      type: 'video',
      title: { en: '📺 Git for Professionals — Exercises & Best Practices', it: '📺 Git per professionisti — Esercizi e Best Practice' },
      content: { en: 'A high-quality tutorial covering practical Git exercises, branching strategies, and workflows — the same skills you will practice with Git Katas.', it: 'Un tutorial di alta qualità che copre esercizi pratici su Git, strategie di branching e flussi di lavoro — le stesse abilità che praticherai con i Git Katas.' },
      videoUrl: 'https://www.youtube.com/watch?v=Uszj_k0DGsg'
    },

    // ── COMPARISON TABLE ─────────────────────────────────────────────
    {
      type: 'table',
      title: { en: '⚔️ Which tool should you start with?', it: '⚔️ Con quale strumento dovresti iniziare?' },
      content: { en: 'A quick comparison to help you choose:', it: 'Un rapido confronto per aiutarti a scegliere:' },
      tableData: {
        headers: [{ en: 'Feature', it: 'Caratteristica' }, 'Oh My Git! 🎮', 'Learn Git Branching 🌐', 'Git Katas 🥋'],
        rows: [
          [{ en: '**Platform**', it: '**Piattaforma**' }, { en: 'Desktop app (download)', it: 'App Desktop (download)' }, { en: 'Web browser (instant)', it: 'Browser Web (istantaneo)' }, { en: 'Local terminal (clone repo)', it: 'Terminale locale (clona repo)' }],
          [{ en: '**Interface**', it: '**Interfaccia**' }, { en: 'Card-based drag & drop', it: 'Drag & drop basato su carte' }, { en: 'Terminal + visual tree', it: 'Terminale + albero visivo' }, { en: 'Real CLI with setup scripts', it: 'Vera CLI con script di setup' }],
          [{ en: '**Best for**', it: '**Ideale per**' }, { en: 'Absolute beginners', it: 'Principianti assoluti' }, { en: 'Visualizing branches & merges', it: 'Visualizzare branch e merge' }, { en: 'Building real CLI muscle memory', it: 'Costruire vera memoria muscolare CLI' }],
          [{ en: '**Topics covered**', it: '**Argomenti trattati**' }, 'add, commit, branch, merge', 'Branch, rebase, cherry-pick, remotes', { en: 'All: staging, merge conflicts, rebase, stash, hooks, submodules', it: 'Tutti: staging, conflitti di merge, rebase, stash, hooks, sottomoduli' }],
          [{ en: '**Cost**', it: '**Costo**' }, { en: 'Free & Open Source', it: 'Gratis e Open Source' }, { en: 'Free', it: 'Gratis' }, { en: 'Free & Open Source', it: 'Gratis e Open Source' }]
        ]
      }
    },

    // ── PRO TIPS ─────────────────────────────────────────────────────
    {
      type: 'tip',
      title: { en: '💡 Pro Tip', it: '💡 Pro Tip' },
      content: { en: 'Don\'t be afraid to break things! These games use a "sandbox" approach — there are no real files at risk. It\'s the safest place to try that scary `git rebase -i` for the first time.', it: 'Non aver paura di rompere le cose! Questi giochi usano un approccio "sandbox" — non ci sono file reali a rischio. È il posto più sicuro per provare quel temibile `git rebase -i` per la prima volta.' }
    },
    {
      type: 'tip',
      title: { en: '🎯 Suggested Learning Path', it: '🎯 Percorso di apprendimento suggerito' },
      content: { en: '**Step 1**: Start with **Oh My Git!** to build intuition with the visual card system.\n**Step 2**: Move to **Learn Git Branching** and complete the Introduction Sequence.\n**Step 3**: Clone the **Git Katas** repo and practice `basic-commits`, `basic-staging`, and `basic-branching`.\n**Step 4**: Challenge yourself with the Remote levels in Learn Git Branching.\n**Step 5**: Tackle advanced katas: `merge-conflict`, `rebase-branch`, `cherry-pick`.\n**Step 6**: When you feel ready, take the **Final Quiz** to complete the track! 🏆 (You can still jump directly to the quiz at any time if you prefer).', it: '**Passaggio 1**: Inizia con **Oh My Git!** per costruire intuizione con il sistema visivo a carte.\n**Passaggio 2**: Passa a **Learn Git Branching** e completa la sequenza introduttiva.\n**Passaggio 3**: Clona il repo **Git Katas** ed esercitati con `basic-commits`, `basic-staging` e `basic-branching`.\n**Passaggio 4**: Mettiti alla prova con i livelli Remote in Learn Git Branching.\n**Passaggio 5**: Affronta i kata avanzati: `merge-conflict`, `rebase-branch`, `cherry-pick`.\n**Passaggio 6**: Quando ti senti pronto, fai il **Quiz Finale** per completare il percorso! 🏆 (Puoi comunque saltare direttamente al quiz in qualsiasi momento se preferisci).' }
    }
  ]
}
