import type { Module } from '../../types'

export const git2: Module = {
  id: 'git-2',
  track: 'git',
  order: 2,
  title: { en: 'The Name & Origin Story', it: 'Il Nome e la Storia delle Origini' },
  subtitle: { en: 'Why Linus named it something rude on purpose', it: 'Perché Linus gli ha dato un nome volutamente scortese' },
  emoji: '🎭',
  duration: '5 min',
  xpReward: 50,
  funFact: { en: 'Linus Torvalds famously said: "I\'m an egotistical bastard, and I name all my projects after myself. First Linux, now Git."', it: 'Linus Torvalds ha detto famosamente: "Sono un bastardo egoista e do a tutti i miei progetti il mio nome. Prima Linux, ora Git."' },
  sections: [
    {
      type: 'intro',
      content: { en: 'Every great tool has a story. Git\'s story starts with frustration, a tight deadline, and a creator with a very particular sense of humor.', it: 'Ogni grande strumento ha una storia. Quella di Git inizia con la frustrazione, una scadenza ravvicinata e un creatore con un senso dell\'umorismo molto particolare.' }
    },
    {
      type: 'concept',
      title: { en: '🇬🇧 The British slang meaning', it: '🇬🇧 Il significato nello slang britannico' },
      content: { en: '"Git" is a British slang term for a silly, incompetent, or annoying person — think of it as a mild insult. Linus Torvalds chose the name **with full irony**, either referring to himself or, depending on his mood, to the tool\'s users.', it: '"Git" è un termine slang britannico per indicare una persona sciocca, incompetente o fastidiosa — pensalo come un insulto leggero. Linus Torvalds ha scelto il nome **con piena ironia**, riferendosi a se stesso o, a seconda dell\'umore, agli utenti dello strumento.' }
    },
    {
      type: 'concept',
      title: { en: '⚡ Born in 10 days', it: '⚡ Nato in 10 giorni' },
      content: { en: 'In 2005, the Linux kernel team lost access to BitKeeper, the proprietary tool they had been using. Linus sat down and **wrote the first version of Git in just 10 days**. By day 10 it was already managing the Linux kernel\'s source code.', it: 'Nel 2005, il team del kernel Linux perse l\'accesso a BitKeeper, lo strumento proprietario che stavano usando. Linus si mise al lavoro e **scrisse la prima versione di Git in soli 10 giorni**. Al decimo giorno, stava già gestendo il codice sorgente del kernel Linux.' }
    },
    {
      type: 'concept',
      title: { en: '🔴 The logo: a graph in disguise', it: '🔴 Il logo: un grafo sotto mentite spoglie' },
      content: { en: 'The Git logo — a red/orange geometric shape — represents a **graph with nodes and connections**, directly referencing Git\'s underlying data structure. Every commit is a node; every line is a relationship between versions. It\'s math made beautiful.', it: 'Il logo di Git — una forma geometrica rossa/arancione — rappresenta un **grafo con nodi e connessioni**, facendo riferimento diretto alla struttura dati sottostante di Git. Ogni commit è un nodo; ogni linea è una relazione tra le versioni. È la matematica resa bellissima.' }
    },
    {
      type: 'analogy',
      title: { en: '🌐 A decentralized internet of code', it: '🌐 Un internet del codice decentralizzato' },
      content: { en: 'Think of Git\'s distributed model like the internet itself: no central authority, every node independent, but all connected. Just like the internet was designed to survive failures, Git was designed so no single server failure can stop your team.', it: 'Pensa al modello distribuito di Git come all\'internet stesso: nessuna autorità centrale, ogni nodo indipendente, ma tutti connessi. Proprio come internet è stato progettato per sopravvivere ai guasti, Git è stato progettato affinché il guasto di un singolo server non possa fermare il tuo team.' }
    },
    {
      type: 'video',
      title: { en: '🎬 Recommended: Git Explained in 100 Seconds', it: '🎬 Consigliato: Git spiegato in 100 secondi' },
      content: { en: 'A quick, entertaining visual overview of Git and its core ideas — perfect as a complement to this module.', it: 'Una rapida e divertente panoramica visiva di Git e delle sue idee principali — perfetto come complemento a questo modulo.' },
      videoUrl: 'https://www.youtube.com/watch?v=hwP7WQkmECE'
    },
    {
      type: 'tip',
      title: { en: '🚀 The platforms it enabled', it: '🚀 Le piattaforme che ha reso possibili' },
      content: { en: 'Git\'s creation led directly to the birth of **GitHub** (2008), **GitLab** (2011), and **Bitbucket** — platforms that transformed how the world builds software together.', it: 'La creazione di Git ha portato direttamente alla nascita di **GitHub** (2008), **GitLab** (2011) e **Bitbucket** — piattaforme che hanno trasformato il modo in cui il mondo costruisce il software insieme.' }
    },
    {
      type: 'flowchart',
      content: { en: '**Git: A History of Domination**', it: '**Git: Una storia di dominazione**' },
      diagramSteps: [
        { label: { en: '2005\n(Git Born)', it: '2005\n(Nasce Git)' }, icon: '⚡', color: '#ff4b4b' },
        { label: { en: '2008\n(GitHub Born)', it: '2008\n(Nasce GitHub)' }, icon: '🐙', color: '#118ab2' },
        { label: { en: '2011\n(GitLab)', it: '2011\n(GitLab)' }, icon: '🦊', color: '#ffb703' },
        { label: { en: 'Today\n(The Standard)', it: 'Oggi\n(Lo Standard)' }, icon: '🌍', color: '#06d6a0' }
      ]
    }
  ],
  quiz: [
    {
      id: 'git-2-q1',
      question: { en: 'What does "git" mean in British slang?', it: 'Cosa significa "git" nello slang britannico?' },
      options: [
        { en: 'A type of repository', it: 'Un tipo di repository' },
        { en: 'A silly or annoying person', it: 'Una persona sciocca o fastidiosa' },
        { en: 'A version control command', it: 'Un comando di version control' },
        { en: 'A branch strategy', it: 'Una strategia di branching' }
      ],
      correct: 1,
      explanation: { en: 'In British slang, "git" means a silly, incompetent, or annoying person. Linus chose it with irony.', it: 'Nello slang britannico, "git" significa una persona sciocca, incompetente o fastidiosa. Linus lo ha scelto con ironia.' }
    },
    {
      id: 'git-2-q2',
      question: { en: 'How long did it take Linus Torvalds to write the first working version of Git?', it: 'Quanto tempo ci ha messo Linus Torvalds a scrivere la prima versione funzionante di Git?' },
      options: ['6 months', '2 years', '10 days', '3 weeks'],
      correct: 2,
      explanation: { en: 'Linus wrote the first functional version of Git in just 10 days in 2005, and it immediately started managing the Linux kernel.', it: 'Linus ha scritto la prima versione funzionale di Git in soli 10 giorni nel 2005, e ha iniziato immediatamente a gestire il kernel Linux.' }
    },
    {
      id: 'git-2-q3',
      question: { en: 'Why did Linus Torvalds create Git?', it: 'Perché Linus Torvalds ha creato Git?' },
      options: [
        { en: 'He wanted to create a commercial competitor to the newly launched GitHub platform', it: 'Voleva creare un concorrente commerciale per la piattaforma GitHub appena lanciata' },
        { en: 'The Linux team lost access to BitKeeper, their previous proprietary version control tool', it: 'Il team di Linux perse l\'accesso a BitKeeper, il loro precedente strumento di version control proprietario' },
        { en: 'It was originally started as a university research project on distributed computing', it: 'È nato originariamente come progetto di ricerca universitario sull\'informatica distribuita' },
        { en: 'He needed a better way to replace email as the primary method for sharing large files', it: 'Aveva bisogno di un modo migliore per sostituire l\'email come metodo principale per condividere file di grandi dimensioni' }
      ],
      correct: 1,
      explanation: { en: 'The Linux kernel team had been using BitKeeper for free, but that arrangement ended in 2005. Linus created Git as a replacement.', it: 'Il team del kernel Linux aveva usato BitKeeper gratuitamente, ma quell\'accordo terminò nel 2005. Linus creò Git come sostituto.' }
    },
    {
      id: 'git-2-q4',
      question: { en: 'What does the Git logo represent?', it: 'Cosa rappresenta il logo di Git?' },
      options: [
        { en: 'A simplified tree structure representing a hierarchical filesystem of project folders', it: 'Una struttura ad albero semplificata che rappresenta un filesystem gerarchico di cartelle di progetto' },
        { en: 'A graph of nodes and connections representing the relationships between commits', it: 'Un grafo di nodi e connessioni che rappresenta le relazioni tra i commit' },
        { en: 'A stylized version of the letter G designed to be easily recognizable and scalable', it: 'Una versione stilizzata della lettera G progettata per essere facilmente riconoscibile e scalabile' },
        { en: 'A distributed network of independent servers communicating over a global mesh', it: 'Una rete distribuita di server indipendenti che comunicano su una mesh globale' }
      ],
      correct: 1,
      explanation: { en: 'The geometric Git logo represents a graph — Git\'s actual internal data structure. Nodes are commits, lines are the relationships between them.', it: 'Il logo geometrico di Git rappresenta un grafo — l\'effettiva struttura dati interna di Git. I nodi sono i commit, le linee sono le relazioni tra di essi.' }
    },
    {
      id: 'git-2-q5',
      question: { en: 'Unlike older version control systems that store file changes as a list of "diffs", Git stores your data as:', it: 'A differenza dei vecchi sistemi di version control che memorizzano le modifiche ai file come un elenco di "diff", Git memorizza i tuoi dati come:' },
      options: [
        { en: 'A complex series of text-based instructions for rebuilding every single file', it: 'Una serie complessa di istruzioni testuali per ricostruire ogni singolo file' },
        { en: 'A stream of snapshots that act like miniature filesystems for every commit', it: 'Un flusso di istantanee (snapshot) che agiscono come mini-filesystem per ogni commit' },
        { en: 'A collection of compressed ZIP files containing every version of every file', it: 'Una raccolta di file ZIP compressi contenente ogni versione di ogni file' },
        { en: 'A spreadsheet of changes tracking every character addition or deletion', it: 'Un foglio di calcolo delle modifiche che traccia ogni aggiunta o eliminazione di caratteri' }
      ],
      correct: 1,
      explanation: { en: 'Git thinks of its data more like a series of snapshots of a miniature filesystem. Every time you commit, Git takes a picture of what all your files look like at that moment.', it: 'Git pensa ai suoi dati più come a una serie di istantanee di un mini-filesystem. Ogni volta che fai un commit, Git scatta una foto di come appaiono tutti i tuoi file in quel momento.' }
    }
  ]
}
