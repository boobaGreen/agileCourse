import type { Module } from '../../types'

export const git11: Module = {
  id: 'git-11',
  track: 'git',
  order: 11,
  title: { en: 'Final Quiz', it: 'Quiz Finale' },
  subtitle: { en: 'The ultimate knowledge test', it: 'Il test di conoscenza definitivo' },
  emoji: '🏆',
  duration: '15 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: { en: 'Ready to prove your mastery? This comprehensive quiz covers everything from the basics to advanced workflows.', it: 'Pronto a dimostrare la tua maestria? Questo quiz completo copre tutto, dalle basi ai flussi di lavoro avanzati.' }
    }
  ],
  quiz: [
    {
      id: 'git-11-q1',
      question: { en: 'What does VCS stand for?', it: 'Cosa significa VCS?' },
      options: [
        { en: 'Virtual Container System', it: 'Virtual Container System' },
        { en: 'Version Control System', it: 'Version Control System' },
        { en: 'Visual Code Studio', it: 'Visual Code Studio' },
        { en: 'Variable Commit Save', it: 'Variable Commit Save' }
      ],
      correct: 1,
      explanation: { en: 'VCS = Version Control System. The category of tools that Git belongs to.', it: 'VCS = Version Control System. La categoria di strumenti a cui appartiene Git.' }
    },
    {
      id: 'git-11-q2',
      question: { en: 'Which command creates a local copy of a remote repository?', it: 'Quale comando crea una copia locale di un repository remoto?' },
      options: [
        { en: 'git init (initializes new)', it: 'git init (inizializza nuovo)' },
        { en: 'git fetch (downloads updates)', it: 'git fetch (scarica aggiornamenti)' },
        { en: 'git clone (copies everything)', it: 'git clone (copia tutto)' },
        { en: 'git pull (fetches and merges)', it: 'git pull (scarica e unisce)' }
      ],
      correct: 2,
      explanation: { en: '`git clone <url>` downloads the entire repository (all history, all branches) to your machine.', it: '`git clone <url>` scarica l\'intero repository (tutta la cronologia, tutti i branch) sulla tua macchina.' }
    },
    {
      id: 'git-11-q3',
      question: { en: 'What is HEAD in Git?', it: 'Cos\'è l\'HEAD in Git?' },
      options: [
        { en: 'The very first commit ever recorded in the project repository', it: 'Il primissimo commit mai registrato nel repository del progetto' },
        { en: 'A pointer to the currently checked-out commit or active branch', it: 'Un puntatore al commit attualmente estratto o al branch attivo' },
        { en: 'The primary IP address of the remote cloud-based Git server', it: 'L\'indirizzo IP primario del server Git remoto basato su cloud' },
        { en: 'The name of the lead developer who originally created the repo', it: 'Il nome dello sviluppatore principale che ha originariamente creato il repo' }
      ],
      correct: 1,
      explanation: { en: 'HEAD points to your current location in history.', it: 'L\'HEAD punta alla tua posizione attuale nella cronologia.' }
    },
    {
      id: 'git-11-q4',
      question: { en: 'Which command shows the history of commits?', it: 'Quale comando mostra la cronologia dei commit?' },
      options: ['git status', 'git history', 'git log', 'git show'],
      correct: 2,
      explanation: { en: '`git log` displays the timeline of snapshots.', it: '`git log` visualizza la linea temporale degli snapshot.' }
    },
    {
      id: 'git-11-q5',
      question: { en: 'What does .gitignore do?', it: 'Cosa fa il .gitignore?' },
      options: [
        { en: 'Deletes temporary files', it: 'Elimina i file temporanei' },
        { en: 'Tells Git which files to never track', it: 'Dice a Git quali file non tracciare mai' },
        { en: 'Shows all ignored commits', it: 'Mostra tutti i commit ignorati' },
        { en: 'Encrypts sensitive files', it: 'Cripta i file sensibili' }
      ],
      correct: 1,
      explanation: { en: 'It excludes temporary or sensitive files from being tracked.', it: 'Esclude i file temporanei o sensibili dal tracciamento.' }
    },
    {
      id: 'git-11-q6',
      question: { en: 'What is a "detached HEAD" state?', it: 'Cos\'è lo stato di "HEAD distaccata"?' },
      options: [
        { en: 'A corrupted repository database', it: 'Un database del repository corrotto' },
        { en: 'When HEAD points to a commit instead of a branch', it: 'Quando l\'HEAD punta a un commit invece che a un branch' },
        { en: 'When the remote server is down', it: 'Quando il server remoto è giù' },
        { en: 'A failed merge operation', it: 'Un\'operazione di merge fallita' }
      ],
      correct: 1,
      explanation: { en: 'You are looking at a fixed point in time, not a moving branch.', it: 'Stai guardando un punto fisso nel tempo, non un branch in movimento.' }
    },
    {
      id: 'git-11-q7',
      question: { en: 'Which modern Git workflow often relies on "feature flags" to keep the main branch stable while merging frequent updates?', it: 'Quale moderno workflow Git si basa spesso sui "feature flags" per mantenere stabile il branch main unendo aggiornamenti frequenti?' },
      options: ['Gitflow', 'Trunk-based Development', 'GitHub Flow', 'Waterfall'],
      correct: 1,
      explanation: { en: 'Trunk-based development uses feature flags to hide unfinished work, allowing developers to merge small, frequent commits into the main branch without breaking the build.', it: 'Il Trunk-based development usa i feature flags per nascondere il lavoro non finito, permettendo agli sviluppatori di unire piccoli e frequenti commit nel branch main senza rompere la build.' }
    },
    {
      id: 'git-11-q8',
      question: { en: 'What does `git cherry-pick <sha>` do?', it: 'Cosa fa `git cherry-pick <sha>`?' },
      options: [
        { en: 'Deletes a specific commit from the history', it: 'Elimina uno specifico commit dalla cronologia' },
        { en: 'Applies a single specific commit to the current branch', it: 'Applica un singolo specifico commit al branch attuale' },
        { en: 'Renames the currently active branch to something else', it: 'Rinomina il branch attualmente attivo con un altro nome' },
        { en: 'Cleans up all untracked files in the working directory', it: 'Pulisce tutti i file non tracciati nella working directory' }
      ],
      correct: 1,
      explanation: { en: 'It copies a single commit\'s changes elsewhere.', it: 'Copia i cambiamenti di un singolo commit altrove.' }
    },
    {
      id: 'git-11-q9',
      question: { en: 'How many characters is a full Git SHA-1 hash?', it: 'Quanti caratteri è un hash SHA-1 completo di Git?' },
      options: ['8', '16', '32', '40'],
      correct: 3,
      explanation: { en: 'A full SHA-1 hash is 40 hexadecimal characters.', it: 'Un hash SHA-1 completo è composto da 40 caratteri esadecimali.' }
    },
    {
      id: 'git-11-q10',
      question: { en: 'What does `git pull --rebase` do?', it: 'Cosa fa `git pull --rebase`?' },
      options: [
        { en: 'Deletes all local branches to match the remote state', it: 'Elimina tutti i branch locali per corrispondere allo stato remoto' },
        { en: 'Replays local commits on top of remote changes for linear history', it: 'Riproduce i commit locali sopra i cambiamenti remoti per una cronologia lineare' },
        { en: 'Forces a push to the remote server even if there are conflicts', it: 'Forza un push al server remoto anche se ci sono conflitti' },
        { en: 'Compiles the source code after downloading the latest updates', it: 'Compila il codice sorgente dopo aver scaricato gli ultimi aggiornamenti' }
      ],
      correct: 1,
      explanation: { en: 'It avoids merge commits by updating your base before adding your work.', it: 'Evita i commit di merge aggiornando la tua base prima di aggiungere il tuo lavoro.' }
    },
    {
      id: 'git-11-q11',
      question: { en: 'In which year was Git created?', it: 'In quale anno è stato creato Git?' },
      options: ['1999', '2003', '2005', '2008'],
      correct: 2,
      explanation: { en: 'Linus Torvalds created Git in 2005.', it: 'Linus Torvalds ha creato Git nel 2005.' }
    },
    {
      id: 'git-11-q12',
      question: { en: 'What is the benefit of `git fetch`?', it: 'Qual è il vantaggio di `git fetch`?' },
      options: [
        { en: 'It clears the entire local cache to save disk space', it: 'Svuota l\'intera cache locale per risparmiare spazio su disco' },
        { en: 'It downloads updates without changing your local files', it: 'Scarica gli aggiornamenti senza modificare i tuoi file locali' },
        { en: 'It deletes old branches that no longer exist on remote', it: 'Elimina i vecchi branch che non esistono più sul remoto' },
        { en: 'It pushes all local work to the primary remote server', it: 'Invia tutto il lavoro locale al server remoto primario' }
      ],
      correct: 1,
      explanation: { en: 'Fetch is safe because it only downloads data for you to inspect.', it: 'Fetch è sicuro perché scarica solo i dati che puoi ispezionare.' }
    },
    {
      id: 'git-11-q13',
      question: { en: 'What does the `-u` flag do in push?', it: 'Cosa fa il flag `-u` in push?' },
      options: [
        { en: 'Marks the push as extremely urgent and high priority', it: 'Segna il push come estremamente urgente e ad alta priorità' },
        { en: 'Sets upstream tracking for the currently active branch', it: 'Imposta il tracciamento upstream per il branch attualmente attivo' },
        { en: 'Unlocks the repository for other team members to use', it: 'Sblocca il repository per l\'uso da parte di altri membri del team' },
        { en: 'Upgrades the Git installation to the latest version', it: 'Aggiorna l\'installazione di Git all\'ultima versione' }
      ],
      correct: 1,
      explanation: { en: 'It links your local branch to the remote branch for future shorthand commands.', it: 'Collega il tuo branch locale al branch remoto per futuri comandi abbreviati.' }
    },
    {
      id: 'git-11-q14',
      question: { en: 'Which command shows unstaged local changes?', it: 'Quale comando mostra le modifiche locali non in stage?' },
      options: [
        { en: 'git status (shows file states)', it: 'git status (mostra gli stati dei file)' },
        { en: 'git diff (shows line-by-line)', it: 'git diff (mostra riga per riga)' },
        { en: 'git log (shows commit history)', it: 'git log (mostra la cronologia dei commit)' },
        { en: 'git show (shows specific commit)', it: 'git show (mostra uno specifico commit)' }
      ],
      correct: 1,
      explanation: { en: '`git diff` shows the delta between your work and the staging area.', it: '`git diff` mostra la differenza tra il tuo lavoro e la staging area.' }
    },
    {
      id: 'git-11-q15',
      question: { en: 'What is a fast-forward merge?', it: 'Cos\'è un merge fast-forward?' },
      options: [
        { en: 'A merge process that handles over 100 commits at once', it: 'Un processo di merge che gestisce oltre 100 commit alla volta' },
        { en: 'Moving a branch pointer forward with no diverging work', it: 'Spostare il puntatore di un branch in avanti senza lavori divergenti' },
        { en: 'An automated script for resolving complex conflicts', it: 'Uno script automatizzato per risolvere conflitti complessi' },
        { en: 'A specialized type of merge performed only on GitHub', it: 'Un tipo specializzato di merge eseguito solo su GitHub' }
      ],
      correct: 1,
      explanation: { en: 'No merge commit is needed because the history is a straight line.', it: 'Non è necessario alcun commit di merge perché la cronologia è una linea retta.' }
    },
    {
      id: 'git-11-q16',
      question: { en: 'What is `git bisect` used for?', it: 'A cosa serve `git bisect`?' },
      options: [
        { en: 'Splitting large commits into smaller, more atomic ones', it: 'Dividere grandi commit in commit più piccoli e atomici' },
        { en: 'Finding a bug-introducing commit using binary search', it: 'Trovare il commit che ha introdotto un bug usando la ricerca binaria' },
        { en: 'Comparing two different files for character-level deltas', it: 'Confrontare due file diversi per differenze a livello di carattere' },
        { en: 'Archiving the entire repository into a compressed format', it: 'Archiviare l\'intero repository in un formato compresso' }
      ],
      correct: 1,
      explanation: { en: 'It\'s a powerful debugging tool to find regressions.', it: 'È un potente strumento di debugging per trovare regressioni.' }
    },
    {
      id: 'git-11-q17',
      question: { en: 'What happens when you run `git init`?', it: 'Cosa succede quando esegui `git init`?' },
      options: [
        { en: 'Clones a remote repository from a URL like GitHub', it: 'Clona un repository remoto da un URL come GitHub' },
        { en: 'Creates a .git folder and initializes the project database', it: 'Crea una cartella .git e inizializza il database del progetto' },
        { en: 'Deletes the entire project history to start from scratch', it: 'Elimina l\'intera cronologia del progetto per ricominciare da zero' },
        { en: 'Logs you into your primary GitHub or GitLab account', it: 'Ti logga nel tuo account principale GitHub o GitLab' }
      ],
      correct: 1,
      explanation: { en: 'It creates the internal database for tracking.', it: 'Crea il database interno per il tracciamento.' }
    },
    {
      id: 'git-11-q18',
      question: { en: 'Which is NOT a Git platform?', it: 'Quale di queste NON è una piattaforma Git?' },
      options: ['GitHub', 'GitLab', 'Bitbucket', 'Kubernetes'],
      correct: 3,
      explanation: { en: 'Kubernetes manages containers, not Git repositories.', it: 'Kubernetes gestisce container, non repository Git.' }
    },
    {
      id: 'git-11-q19',
      question: { en: 'What does `git commit --amend` do?', it: 'Cosa fa `git commit --amend`?' },
      options: [
        { en: 'Adds a comment to a specific file in the directory', it: 'Aggiunge un commento a uno specifico file nella directory' },
        { en: 'Modifies the very last commit that you just created', it: 'Modifica l\'ultimo commit che hai appena creato' },
        { en: 'Reverts the repository to its last known stable state', it: 'Ripristina il repository al suo ultimo stato stabile conosciuto' },
        { en: 'Automatically fixes syntax errors in your source code', it: 'Corregge automaticamente gli errori di sintassi nel tuo codice sorgente' }
      ],
      correct: 1,
      explanation: { en: 'Useful for fixing the last message or adding a forgotten file.', it: 'Utile per correggere l\'ultimo messaggio o aggiungere un file dimenticato.' }
    },
    {
      id: 'git-11-q20',
      question: { en: 'What is a "bare" repository?', it: 'Cos\'è un repository "bare"?' },
      options: [
        { en: 'A repository with no working files (server/remote only)', it: 'Un repository senza file di lavoro (solo server/remoto)' },
        { en: 'An empty repository with no files or folders inside', it: 'Un repository vuoto senza file o cartelle all\'interno' },
        { en: 'A repository with no branches created or tracked yet', it: 'Un repository senza branch ancora creati o tracciati' },
        { en: 'A very basic version of Git with limited functionality', it: 'Una versione molto basilare di Git con funzionalità limitate' }
      ],
      correct: 0,
      explanation: { en: 'Bare repos (created with `git init --bare`) only contain the history database, not live files.', it: 'I repository bare (creati con `git init --bare`) contengono solo il database della cronologia, non i file live.' }
    }
  ]
}
