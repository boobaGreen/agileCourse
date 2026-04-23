import type { Module } from '../../types'

export const git6: Module = {
  id: 'git-6',
  track: 'git',
  order: 6,
  title: { en: 'Common Workflows', it: 'Flussi di Lavoro Comuni' },
  subtitle: { en: 'Gitflow, trunk-based, and choosing what fits your team', it: 'Gitflow, trunk-based e come scegliere quello adatto al tuo team' },
  emoji: '🗺️',
  duration: '10 min',
  xpReward: 50,
  funFact: { en: 'Trunk-based development is used by Google, Facebook, and Netflix. The Google monorepo (single giant repository) contains over 2 billion lines of code.', it: 'Il trunk-based development è usato da Google, Facebook e Netflix. Il monorepo di Google (un singolo repository gigante) contiene oltre 2 miliardi di righe di codice.' },
  sections: [
    {
      type: 'intro',
      content: { en: 'Having Git commands is one thing — knowing *how to use them as a team* is another. These workflows are battle-tested patterns for organizing your branching strategy.', it: 'Conoscere i comandi Git è una cosa — sapere *come usarli in un team* è un\'altra. Questi flussi di lavoro sono pattern collaudati per organizzare la tua strategia di branching.' }
    },
    {
      type: 'concept',
      title: { en: '🌊 Gitflow', it: '🌊 Gitflow' },
      content: { en: 'Gitflow (by Vincent Driessen, 2010) defines a rigid branching model:\n\n- **main** — production-ready code only\n- **develop** — integration branch for features\n- **feature/x** — individual features\n- **release/x** — release preparation\n- **hotfix/x** — urgent production fixes\n\n✅ Good for: versioned software, scheduled releases\n❌ Not ideal for: continuous deployment, small teams', it: 'Gitflow (di Vincent Driessen, 2010) definisce un modello di branching rigido:\n\n- **main** — solo codice pronto per la produzione\n- **develop** — branch di integrazione per le funzionalità\n- **feature/x** — singole funzionalità\n- **release/x** — preparazione del rilascio\n- **hotfix/x** — correzioni urgenti in produzione\n\n✅ Ottimo per: software con versioni, rilasci programmati\n❌ Non ideale per: continuous deployment, piccoli team' }
    },
    {
      type: 'flowchart',
      content: { en: '**Gitflow Architecture**', it: '**Architettura Gitflow**' },
      diagramSteps: [
        { label: { en: 'Feature\n(Dev)', it: 'Feature\n(Sviluppo)' }, icon: '🌿', color: '#ffb703' },
        { label: { en: 'Develop\n(Integrate)', it: 'Develop\n(Integrazione)' }, icon: '🔄', color: '#118ab2' },
        { label: { en: 'Release\n(Test)', it: 'Release\n(Test)' }, icon: '📦', color: '#ffd166' },
        { label: { en: 'Main\n(Prod)', it: 'Main\n(Produzione)' }, icon: '🌲', color: '#06d6a0' }
      ]
    },
    {
      type: 'concept',
      title: { en: '🛤️ Trunk-Based Development', it: '🛤️ Trunk-Based Development' },
      content: { en: 'In Trunk-Based Development, developers collaborate on a **single branch** (the "trunk", usually `main`). Branches are short-lived (only a few hours) and merged back as soon as possible.\n\n✅ Good for: CI/CD, high-velocity teams, senior engineers\n🟢 Requires: Automated tests to prevent breaking the trunk', it: 'Nel Trunk-Based Development, gli sviluppatori collaborano su un **singolo branch** (il "trunk", solitamente `main`). I branch hanno vita breve (solo poche ore) e vengono uniti il prima possibile.\n\n✅ Ottimo per: CI/CD, team ad alta velocità, ingegneri senior\n🟢 Richiede: test automatizzati per evitare di rompere il trunk' }
    },
    {
      type: 'analogy',
      title: { en: '🚣 Rowing together vs separate paths', it: '🚣 Remare insieme vs percorsi separati' },
      content: { en: 'Gitflow is like writing a book in separate chapters and only combining them at the end. Trunk-based is like everyone writing on the same page in real-time — it requires more coordination, but avoids "merge hell" at the end of the month.', it: 'Gitflow è come scrivere un libro in capitoli separati e unirli solo alla fine. Trunk-based è come se tutti scrivessero sulla stessa pagina in tempo reale — richiede più coordinazione, ma evita "l\'inferno dei merge" alla fine del mese.' }
    },
    {
      type: 'table',
      title: { en: '⚖️ Choosing your Strategy', it: '⚖️ Scegliere la tua Strategia' },
      content: { en: 'Which one should your team use?', it: 'Quale dovrebbe usare il tuo team?' },
      tableData: {
        headers: [{ en: 'Feature', it: 'Caratteristica' }, 'Gitflow', 'Trunk-Based'],
        rows: [
          [{ en: '**Complexity**', it: '**Complessità**' }, { en: 'High (many branches)', it: 'Alta (molti branch)' }, { en: 'Low (one main branch)', it: 'Bassa (un solo branch main)' }],
          [{ en: '**Release Speed**', it: '**Velocità di Rilascio**' }, { en: 'Cycles (Weeks/Months)', it: 'Cicli (Settimane/Mesi)' }, { en: 'Continuous (Daily/Hourly)', it: 'Continua (Giornaliera/Oraria)' }],
          [{ en: '**Code Review**', it: '**Revisione del Codice**' }, { en: 'On PR merge to develop', it: 'Al merge della PR su develop' }, { en: 'Constant peer review', it: 'Peer review costante' }],
          [{ en: '**Ease of Use**', it: '**Facilità d\'Uso**' }, { en: 'Steep learning curve', it: 'Curva di apprendimento ripida' }, { en: 'Simple but disciplined', it: 'Semplice ma disciplinato' }]
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '💡 Pro Tip: GitHub Flow', it: '💡 Pro Tip: GitHub Flow' },
      content: { en: 'For most small-to-medium web projects, **GitHub Flow** is the sweet spot: Create a branch from `main`, push commits, open a PR, merge after approval. Simple, clean, and effective.', it: 'Per la maggior parte dei progetti web medio-piccoli, **GitHub Flow** è il punto di equilibrio: crea un branch da `main`, fai il push dei commit, apri una PR, unisci dopo l\'approvazione. Semplice, pulito ed efficace.' }
    },
    {
      type: 'game',
      title: { en: 'Lab: Professional Workflow', it: 'Lab: Flusso di Lavoro Professionale' },
      content: { en: 'Simulate a typical corporate workflow: create a branch for a new feature, work on it in isolation, and then merge it into main once finished.', it: 'Simula un tipico flusso di lavoro aziendale: crea un branch per una nuova funzionalità, lavoraci in isolamento e poi uniscilo a main una volta terminato.' },
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Starting project' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Initial boilerplate' }
          },
          branches: { 'main': 'C2' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: { en: 'Create a new branch named "feature-login"', it: 'Crea un nuovo branch chiamato "feature-login"' }, condition: 'BRANCH_EXISTS:feature-login' },
          { id: '2', instruction: { en: 'Switch to the newly created branch', it: 'Passa al branch appena creato' }, condition: 'CURRENT_BRANCH:feature-login' },
          { id: '3', instruction: { en: 'Make a commit to simulate working on the login', it: 'Fai un commit per simulare il lavoro sulla login' }, condition: 'COMMIT_COUNT:feature-login:3' },
          { id: '4', instruction: { en: 'Return to main and merge the work done on feature-login', it: 'Torna su main e unisci il lavoro fatto su feature-login' }, condition: 'MERGED:feature-login' }
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '🎮 Practice This Module', it: '🎮 Esercitati con questo modulo' },
      content: { en: '**Learn Git Branching**: Complete *Remote Tab — Advanced* levels 9-10 (Push Main!, Merging with Remotes)\n\n**Oh My Git!**: Play the *Workflows* chapter\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/)', it: '**Learn Git Branching**: Completa i livelli *Remote Tab — Advanced* 9-10 (Push Main!, Merging with Remotes)\n\n**Oh My Git!**: Gioca il capitolo *Workflows*\n\n🚀 [Lancia Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/)' }
    }
  ],
  quiz: [
    {
      id: 'git-6-q1',
      question: { en: 'In Gitflow, which branch is used as the integration branch for all features?', it: 'In Gitflow, quale branch viene usato come branch di integrazione per tutte le funzionalità?' },
      options: ['main', 'develop', 'release', 'hotfix'],
      correct: 1,
      explanation: { en: 'In Gitflow, `develop` is where features are combined. `main` only receives code when a release is ready for production.', it: 'In Gitflow, `develop` è il luogo dove le funzionalità vengono combinate. `main` riceve il codice solo quando un rilascio è pronto per la produzione.' }
    },
    {
      id: 'git-6-q2',
      question: { en: 'What is the core principle of Trunk-Based Development?', it: 'Qual è il principio cardine del Trunk-Based Development?' },
      options: [
        { en: 'Developers work on long-lived feature branches', it: 'Gli sviluppatori lavorano su branch di funzionalità a lunga durata' },
        { en: 'Everyone works on a single "trunk" branch with frequent merges', it: 'Tutti lavorano su un singolo branch "trunk" con merge frequenti' },
        { en: 'Code is only merged once a month', it: 'Il codice viene unito solo una volta al mese' },
        { en: 'Multiple main branches exist for different countries', it: 'Esistono più branch main per diversi paesi' }
      ],
      correct: 1,
      explanation: { en: 'Trunk-based development focuses on merging small changes into the main branch (trunk) very frequently, often multiple times per day.', it: 'Il trunk-based development si concentra sull\'unione di piccole modifiche nel branch principale (trunk) molto frequentemente, spesso più volte al giorno.' }
    },
    {
      id: 'git-6-q3',
      question: { en: 'Which workflow is most suitable for a team releasing updates multiple times a day (Continuous Deployment)?', it: 'Quale flusso di lavoro è più adatto per un team che rilascia aggiornamenti più volte al giorno (Continuous Deployment)?' },
      options: ['Gitflow', 'Trunk-Based Development', 'A single-branch model without PRs', 'Sequential Waterfall'],
      correct: 1,
      explanation: { en: 'Trunk-based development is the standard for high-performance teams practicing CI/CD, as it minimizes merge complexity and keeps the trunk always ready for deployment.', it: 'Il trunk-based development è lo standard per i team ad alte prestazioni che praticano la CI/CD, poiché riduce al minimo la complessità dei merge e mantiene il trunk sempre pronto per il rilascio.' }
    },
    {
      id: 'git-6-q4',
      question: { en: 'What is a "hotfix" branch in Gitflow?', it: 'Cos\'è un branch "hotfix" in Gitflow?' },
      options: [
        { en: 'A branch for trying out new experimental libraries', it: 'Un branch per provare nuove librerie sperimentali' },
        { en: 'A branch created directly from main to fix an urgent bug in production', it: 'Un branch creato direttamente da main per correggere un bug urgente in produzione' },
        { en: 'A branch for updating documentation only', it: 'Un branch solo per l\'aggiornamento della documentazione' },
        { en: 'A branch used to train new developers', it: 'Un branch usato per addestrare nuovi sviluppatori' }
      ],
      correct: 1,
      explanation: { en: 'Hotfixes are unique in Gitflow because they diverge from `main` (production) to fix a critical bug immediately, then merge back to both `main` and `develop`.', it: 'Gli hotfix sono unici in Gitflow perché divergono da `main` (produzione) per correggere immediatamente un bug critico, per poi essere riuniti sia in `main` che in `develop`.' }
    },
    {
      id: 'git-6-q5',
      question: { en: 'Why does Trunk-Based Development require strong automated testing?', it: 'Perché il Trunk-Based Development richiede test automatizzati robusti?' },
      options: [
        { en: 'To make the CI/CD pipeline look busy', it: 'Per far sembrare occupata la pipeline CI/CD' },
        { en: 'Because without tests, developers might break the shared main branch for everyone', it: 'Perché senza test, gli sviluppatori potrebbero rompere il branch main condiviso per tutti' },
        { en: 'To replace human code reviewers entirely', it: 'Per sostituire completamente i revisori umani' },
        { en: 'It doesn\'t require testing', it: 'Non richiede test' }
      ],
      correct: 1,
      explanation: { en: 'Since everyone is merging to `main` constantly, a single bug could block the entire team. Automated tests act as the "guardrails" that ensure the trunk remains stable.', it: 'Poiché tutti uniscono su `main` costantemente, un singolo bug potrebbe bloccare l\'intero team. I test automatizzati fungono da "guardrail" che garantiscono che il trunk rimanga stabile.' }
    }
  ]
}
