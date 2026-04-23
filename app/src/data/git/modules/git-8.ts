import type { Module } from '../../types'

export const git8: Module = {
  id: 'git-8',
  track: 'git',
  order: 8,
  title: { en: 'Time Travel & Safety', it: 'Viaggio nel Tempo e Sicurezza' },
  subtitle: { en: 'Undoing mistakes and managing the HEAD pointer', it: 'Annullare gli errori e gestire il puntatore HEAD' },
  emoji: '⏩',
  duration: '10 min',
  xpReward: 80,
  sections: [
    {
      type: 'intro',
      content: { en: 'Git lets you "undo" almost anything. But you need to know which tool to use for which mistake.', it: 'Git ti permette di "annullare" quasi tutto. Ma devi sapere quale strumento usare per ogni tipo di errore.' }
    },
    {
      type: 'concept',
      title: { en: '📍 Visualizing HEAD', it: '📍 Visualizzare l\'HEAD' },
      content: { en: 'Think of **HEAD** as the "You Are Here" pointer on a map. When you checkout a branch, HEAD points to that branch nickname. When you checkout a commit, HEAD points to the raw hash.\n\nRun `git log --oneline --graph --all` to see your HEAD in relation to all other branches.', it: 'Pensa all\'**HEAD** come al puntatore "Tu sei qui" su una mappa. Quando fai il checkout di un branch, l\'HEAD punta al nome di quel branch. Quando fai il checkout di un commit, l\'HEAD punta all\'hash grezzo.\n\nEsegui `git log --oneline --graph --all` per vedere la tua HEAD in relazione a tutti gli altri branch.' }
    },
    {
      type: 'concept',
      title: { en: '🧪 Reset vs Revert', it: '🧪 Reset vs Revert' },
      content: { en: '**Reset**: Moves the branch pointer backward. It effectively "deletes" commits from history. Use ONLY on personal, local branches.\n\n**Revert**: Creates a NEW commit that does the exact opposite of a past commit. It preserves history and is safe for shared/public branches.', it: '**Reset**: Sposta il puntatore del branch all\'indietro. Di fatto "elimina" i commit dalla cronologia. Usalo SOLO su branch personali e locali.\n\n**Revert**: Crea un NUOVO commit che fa l\'esatto opposto di un commit passato. Preserva la cronologia ed è sicuro per branch condivisi/pubblici.' }
    },
    {
      type: 'concept',
      title: { en: '🔌 Detached HEAD — Lost in Time', it: '🔌 HEAD Distaccata — Persi nel Tempo' },
      content: { en: 'Normally, **HEAD** is a pointer that points to your current branch. However, if you checkout a specific commit hash directly (e.g., `git checkout a1b2c3d`), HEAD points directly to that commit instead of a branch. This is the **detached HEAD** state. Any new commits here are not on a branch and may get lost!', it: 'Normalmente, l\'**HEAD** è un puntatore che punta al tuo branch attuale. Tuttavia, se fai il checkout di uno specifico hash di commit direttamente (es. `git checkout a1b2c3d`), l\'HEAD punta direttamente a quel commit invece che a un branch. Questo è lo stato di **HEAD distaccata**. Ogni nuovo commit fatto qui non appartiene a un branch e potrebbe andare perso!' }
    },
    {
      type: 'game',
      title: { en: 'Lab: Reset or Revert?', it: 'Lab: Reset o Revert?' },
      content: { en: 'Use `reset` to rewrite local history, but use `revert` to fix code that you have already shared with colleagues.', it: 'Usa `reset` per riscrivere la cronologia locale, ma usa `revert` per correggere codice che hai già condiviso con i colleghi.' },
      gameType: 'git-graph-sim',
      gameData: {
        startState: {
          commits: { 
            'C1': { id: 'C1', parents: [], message: 'Initial commit' },
            'C2': { id: 'C2', parents: ['C1'], message: 'Working code' },
            'C3': { id: 'C3', parents: ['C2'], message: 'FATAL CRASH BUG' }
          },
          branches: { 'main': 'C3', 'shared': 'C3' },
          head: { type: 'branch', target: 'main' }
        },
        tasks: [
          { id: '1', instruction: { en: 'You can\'t use reset because you would delete public history. Use the correct command to create an "anti-commit" that safely undoes C3.', it: 'Non puoi usare reset perché elimineresti la cronologia pubblica. Usa il comando corretto per creare un "anti-commit" che annulli C3 in modo sicuro.' }, condition: 'COMMIT_COUNT:main:4' }
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '🎮 Practice This Module', it: '🎮 Esercitati con questo modulo' },
      content: { en: '**Learn Git Branching**: Complete *Ramping Up* sequence (levels 5-8: Detached HEAD, Relative Refs, Reversing Changes)\n\n**Oh My Git!**: Play *Changing the Past*, *Shit Happens*, and *Stash* chapters\n\n**Git Kata**: `basic-revert`, `basic-stashing`, `save-my-commit`, `detached-head`, `commit-on-wrong-branch`\n\n🚀 [Launch Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)', it: '**Learn Git Branching**: Completa la sequenza *Ramping Up* (livelli 5-8: Detached HEAD, Relative Refs, Reversing Changes)\n\n**Oh My Git!**: Gioca i capitoli *Changing the Past*, *Shit Happens*, e *Stash*\n\n**Git Kata**: `basic-revert`, `basic-stashing`, `save-my-commit`, `detached-head`, `commit-on-wrong-branch`\n\n🚀 [Lancia Learn Git Branching](https://learngitbranching.js.org/) · 📥 [Oh My Git!](https://ohmygit.org/) · 📂 [Git Katas](https://github.com/eficode-academy/git-katas)' }
    }
  ],
  quiz: [
    {
      id: 'git-8-q1',
      question: { en: 'Which undo command is SAFEST for shared branches because it doesn\'t delete history?', it: 'Quale comando di annullamento è il più SICURO per i branch condivisi perché non cancella la cronologia?' },
      options: [
        { en: 'git reset --hard', it: 'git reset --hard' },
        { en: 'git revert', it: 'git revert' },
        { en: 'git checkout', it: 'git checkout' },
        { en: 'git clean', it: 'git clean' }
      ],
      correct: 1,
      explanation: { en: '`git revert` creates a new "inverse" commit. It keeps the history intact, making it the safest choice for collaboration.', it: '`git revert` crea un nuovo commit "inverso". Mantiene intatta la cronologia, rendendolo la scelta più sicura per la collaborazione.' }
    },
    {
      id: 'git-8-q2',
      question: { en: 'You have unfinished work but need to switch branches immediately. Which command "hides" your changes safely?', it: 'Hai del lavoro non finito ma devi cambiare branch immediatamente. Quale comando "nasconde" le tue modifiche in modo sicuro?' },
      options: [
        { en: 'git hide', it: 'git hide' },
        { en: 'git stash', it: 'git stash' },
        { en: 'git pause', it: 'git pause' },
        { en: 'git commit --later', it: 'git commit --later' }
      ],
      correct: 1,
      explanation: { en: '`git stash` takes your uncommitted changes and puts them on a temporary "shelf" so you can switch branches with a clean workspace.', it: '`git stash` prende le tue modifiche non ancora committate e le mette su uno "scaffale" temporaneo, così puoi cambiare branch con un workspace pulito.' }
    },
    {
      id: 'git-8-q3',
      question: { en: 'What happens if you checkout a specific commit hash (e.g., git checkout a1b2c3d) instead of a branch?', it: 'Cosa succede se fai il checkout di uno specifico hash di commit (es. git checkout a1b2c3d) invece di un branch?' },
      options: [
        { en: 'The commit is deleted from history', it: 'Il commit viene eliminato dalla cronologia' },
        { en: 'You enter a "Detached HEAD" state', it: 'Entri in uno stato di "HEAD distaccata"' },
        { en: 'A new branch is created automatically', it: 'Viene creato automaticamente un nuovo branch' },
        { en: 'Git prevents the operation for safety', it: 'Git impedisce l\'operazione per sicurezza' }
      ],
      correct: 1,
      explanation: { en: 'When you checkout a commit directly, HEAD points to that commit instead of a branch. This is called the Detached HEAD state.', it: 'Quando fai il checkout di un commit direttamente, l\'HEAD punta a quel commit invece che a un branch. Questo è chiamato stato di HEAD distaccata.' }
    }
  ]
}
