// Applies the corrections listed in agileCourse/docs/content_review.md
// to the content files copied into agileCourse-v2/src.
// Every replacement must match exactly `count` times, otherwise the script aborts.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'src')
const edits = []
let applied = 0

function rep(file, from, to, count = 1) {
  edits.push({ file, from, to, count })
}

const R = String.raw

// ───────────────────────────── GIT ─────────────────────────────
rep('data/git/modules/git-1.ts',
  `{ en: 'Full copies (wasteful)', it: 'Copie complete (spreco)' }, { en: 'Smart diffs (efficient)', it: 'Diff intelligenti (efficiente)' }`,
  `{ en: 'Full copies of every file', it: 'Copie complete di ogni file' }, { en: 'Compressed, deduplicated snapshots', it: 'Snapshot compressi e deduplicati' }`)

rep('data/git/modules/git-2.ts',
  `it: 'Linus Torvalds ha detto famosamente: "Sono un bastardo egoista`,
  `it: 'È celebre la frase di Linus Torvalds: "Sono un bastardo egoista`)

rep('data/git/modules/git-3.ts',
  `ensuring your history can never be tampered with.`,
  `so any tampering with history is immediately detectable.`)
rep('data/git/modules/git-3.ts',
  `garantendo che la tua cronologia non possa mai essere manomessa.`,
  `così qualsiasi manomissione della cronologia è immediatamente rilevabile.`)
rep('data/git/modules/git-3.ts',
  `funFact: { en: 'The average Git repository on GitHub has 6.7 branches. The Linux kernel repo has over 700 active branches.', it: 'Il repository Git medio su GitHub ha 6,7 branch. Il repository del kernel Linux ne ha oltre 700 attivi.' },`,
  `funFact: { en: 'The very first Git commit, made by Linus Torvalds on 7 April 2005, carries the message: "Initial revision of git, the information manager from hell".', it: 'Il primissimo commit di Git, fatto da Linus Torvalds il 7 aprile 2005, ha come messaggio: "Initial revision of git, the information manager from hell".' },`)

rep('data/git/modules/git-5.ts',
  `tutti i rilascini stabili`,
  `tutti i rilasci stabili`)
rep('data/git/modules/git-5.ts',
  `        { en: 'git pull (downloads and merges automatically)', it: 'git pull (scarica e unisce automaticamente)' },
        { en: 'git fetch (downloads only for your inspection)', it: 'git fetch (scarica solo per la tua ispezione)' },
        { en: 'git push (uploads your local work to remote)', it: 'git push (carica il tuo lavoro locale sul remote)' },
        { en: 'git update (a generic command for refreshing)', it: 'git update (un comando generico per aggiornare)' }`,
  `        'git pull',
        'git fetch',
        'git push',
        'git update'`)

rep('data/git/modules/git-6.ts',
  `options: ['Gitflow', 'Trunk-Based Development', 'A single-branch model without PRs', 'Sequential Waterfall'],`,
  `options: ['Gitflow', 'Trunk-Based Development', { en: 'Feature branches that live for several months', it: 'Feature branch che vivono per mesi' }, 'Sequential Waterfall'],`)

// git-8: teach stash before quizzing it (new concept + existing StashLab animation)
rep('data/git/modules/git-8.ts',
  `    {
      type: 'game',
      title: { en: 'Lab: Detached HEAD', it: 'Lab: HEAD Distaccata' },`,
  `    {
      type: 'concept',
      title: { en: '📦 Stash: park your work for a moment', it: '📦 Stash: parcheggia il lavoro per un momento' },
      content: { en: 'You are halfway through a change and must switch branch right now, but you do not want to commit half-done work. \`git stash\` takes every uncommitted change, stores it on a stack and leaves a clean working directory. Later, \`git stash pop\` brings the changes back and removes the entry; \`git stash list\` shows what is parked.\\n\\n💡 Stash is a local, temporary shelf. It is not a substitute for a commit and it is never pushed.', it: 'Sei a metà di una modifica e devi cambiare branch subito, ma non vuoi committare lavoro a metà. \`git stash\` prende tutte le modifiche non committate, le mette su una pila e lascia la working directory pulita. Più tardi, \`git stash pop\` le riporta indietro e rimuove la voce; \`git stash list\` mostra cosa è parcheggiato.\\n\\n💡 Lo stash è uno scaffale locale e temporaneo. Non sostituisce un commit e non viene mai inviato con il push.' }
    },
    {
      type: 'animation',
      title: { en: '🧪 Stash Lab', it: '🧪 Lab Stash' },
      content: { en: 'Stash your work, switch context, then pop it back.', it: 'Metti da parte il lavoro, cambia contesto, poi recuperalo.' },
      animationType: 'git-stash-lab'
    },
    {
      type: 'game',
      title: { en: 'Lab: Detached HEAD', it: 'Lab: HEAD Distaccata' },`)

rep('data/git/modules/git-9.ts',
  `When debugging, \`git bisect start\` marks the "Bad" (broken) and "Good" (working) points. Git then checks out the point right in the middle for you to test.`,
  `\`git bisect start\` opens the session; then \`git bisect bad\` and \`git bisect good <commit>\` mark the broken and the working points. Git checks out the commit in the middle for you to test, and you answer good or bad until the culprit is found.`)
rep('data/git/modules/git-9.ts',
  `Durante il debugging, \`git bisect start\` segna i punti "Bad" (rotto) e "Good" (funzionante). Git esegue quindi il checkout del punto proprio nel mezzo per permetterti di testarlo.`,
  `\`git bisect start\` apre la sessione; poi \`git bisect bad\` e \`git bisect good <commit>\` segnano il punto rotto e quello funzionante. Git fa il checkout del commit a metà strada per fartelo testare, e tu rispondi good o bad finché il colpevole non è trovato.`)

rep('data/git/modules/git-11.ts',
  `      options: [
        { en: 'git init (initializes new)', it: 'git init (inizializza nuovo)' },
        { en: 'git fetch (downloads updates)', it: 'git fetch (scarica aggiornamenti)' },
        { en: 'git clone (copies everything)', it: 'git clone (copia tutto)' },
        { en: 'git pull (fetches and merges)', it: 'git pull (scarica e unisce)' }
      ],`,
  `      options: ['git init', 'git fetch', 'git clone', 'git pull'],`)
rep('data/git/modules/git-11.ts',
  `question: { en: 'Which command shows unstaged local changes?', it: 'Quale comando mostra le modifiche locali non in stage?' },
      options: [
        { en: 'git status (shows file states)', it: 'git status (mostra gli stati dei file)' },
        { en: 'git diff (shows line-by-line)', it: 'git diff (mostra riga per riga)' },
        { en: 'git log (shows commit history)', it: 'git log (mostra la cronologia dei commit)' },
        { en: 'git show (shows specific commit)', it: 'git show (mostra uno specifico commit)' }
      ],`,
  `question: { en: 'Which command shows the exact line-by-line differences between your working directory and the staging area?', it: 'Quale comando mostra le differenze esatte, riga per riga, tra la working directory e la staging area?' },
      options: ['git status', 'git diff', 'git log', 'git show'],`)

// Git cheat sheet: valid hex hashes, modern switch/restore
rep('data/git/cheatsheet.ts', R`140g8h9 feat A\n060i0j1 init`, R`140a8b9 feat A\n060e0f1 init`)
rep('data/git/cheatsheet.ts', `140g8h91 (Alice`, `140a8b91 (Alice`)
rep('data/git/cheatsheet.ts',
  R`        output: 'Switched to branch \'feature\''
      },`,
  R`        output: 'Switched to branch \'feature\''
      },
      {
        command: 'git switch <name>',
        description: { en: 'switch branch (modern syntax, Git 2.23+)', it: 'cambia branch (sintassi moderna, Git 2.23+)' },
        visualType: 'branch-graph',
        visualHighlight: 'checkout',
        example: 'git switch -c feature/login',
        output: 'Switched to a new branch \'feature/login\''
      },
      {
        command: 'git restore <file>',
        description: { en: 'discard unstaged changes in a file', it: 'scarta le modifiche non in stage di un file' },
        visualType: 'area-flow',
        visualHighlight: 'diff',
        example: 'git restore index.html',
        output: ''
      },`)

// ─────────────────────────── DOCKER ────────────────────────────
rep('data/docker/modules/docker-1.ts', `indica il scaricatore di porto`, `indica lo scaricatore di porto`)
rep('data/docker/modules/docker-1.ts',
  `{ en: 'Seconds (Just starting a process)', it: 'Secondi (Avvio di un singolo processo)' }`,
  `{ en: 'Milliseconds to seconds (just a process)', it: 'Da millisecondi a secondi (solo un processo)' }`)

// docker-2: missing Italian localisation
rep('data/docker/modules/docker-2.ts',
  `  title: 'Images vs Containers',
  subtitle: 'Blueprint vs Live Instance',`,
  `  title: { en: 'Images vs Containers', it: 'Immagini e Container' },
  subtitle: { en: 'Blueprint vs Live Instance', it: 'Il progetto e l\\'istanza in esecuzione' },`)
rep('data/docker/modules/docker-2.ts',
  `  funFact: 'Docker Images are read-only. When you run one, Docker puts a tiny read-write layer on top of it. This is why you can run 10 containers from a 1GB image without using 10GB of disk space!',`,
  `  funFact: { en: 'Docker Images are read-only. When you run one, Docker puts a tiny read-write layer on top of it. This is why you can run 10 containers from a 1GB image without using 10GB of disk space!', it: 'Le immagini Docker sono in sola lettura. Quando ne avvii una, Docker aggiunge sopra un sottile layer in lettura/scrittura. Per questo puoi eseguire 10 container da un\\'immagine di 1GB senza occupare 10GB di disco!' },`)
rep('data/docker/modules/docker-2.ts',
  `      content: 'This is the most critical concept to master: the difference between an Image and a Container. If you understand this, everything else in Docker makes sense.'`,
  `      content: { en: 'This is the most critical concept to master: the difference between an Image and a Container. If you understand this, everything else in Docker makes sense.', it: 'Questo è il concetto più importante da padroneggiare: la differenza tra un\\'Immagine e un Container. Se capisci questo, tutto il resto di Docker ha senso.' }`)
rep('data/docker/modules/docker-2.ts',
  R`      title: '🖼️ The Image (The Blueprint)',
      content: 'An image is a **read-only** template. It contains the OS libraries, the app code, and the runtime. It doesn\'t "run" — it just sits on your disk. Think of it as a recipe in a cookbook, or an ISO file.'`,
  R`      title: { en: '🖼️ The Image (The Blueprint)', it: '🖼️ L\'Immagine (Il Progetto)' },
      content: { en: 'An image is a **read-only** template. It contains the OS libraries, the app code, and the runtime. It doesn\'t "run" — it just sits on your disk. Think of it as a recipe in a cookbook, or an ISO file.', it: 'Un\'immagine è un modello in **sola lettura**. Contiene le librerie di sistema, il codice dell\'app e il runtime. Non "gira": resta semplicemente sul disco. Pensala come una ricetta in un libro di cucina, o un file ISO.' }`)
rep('data/docker/modules/docker-2.ts',
  `      title: '📦 The Container (The Running Instance)',
      content: 'A container is a **runnable instance** of an image. When you "run" an image, it becomes a container. You can have 100 isolated containers independently running from the same 1 image. Think of the container as the actual pizza baked using the recipe. Deleting a container does not affect the read-only image it was built from.'`,
  `      title: { en: '📦 The Container (The Running Instance)', it: '📦 Il Container (L\\'Istanza in Esecuzione)' },
      content: { en: 'A container is a **runnable instance** of an image. When you "run" an image, it becomes a container. You can have 100 isolated containers independently running from the same 1 image. Think of the container as the actual pizza baked using the recipe. Deleting a container does not affect the read-only image it was built from.', it: 'Un container è un\\'**istanza eseguibile** di un\\'immagine. Quando "esegui" un\\'immagine, diventa un container. Puoi avere 100 container isolati in esecuzione dalla stessa identica immagine. Pensa al container come alla pizza vera sfornata seguendo la ricetta. Eliminare un container non tocca l\\'immagine in sola lettura da cui è nato.' }`)

// docker-3
rep('data/docker/modules/docker-3.ts',
  `but can also download from URLs and extract archives (.tar, .zip)`,
  `but can also download from URLs and auto-extract tar archives (.tar, .tar.gz)`)
rep('data/docker/modules/docker-3.ts',
  `ma può anche scaricare da URL ed estrarre archivi compressi (.tar, .zip)`,
  `ma può anche scaricare da URL ed estrarre automaticamente archivi tar (.tar, .tar.gz)`)
rep('data/docker/modules/docker-3.ts',
  `          en: '--tag (label)',
          it: '--tag (etichetta)'`,
  `          en: '-l (label)',
          it: '-l (etichetta)'`)
rep('data/docker/modules/docker-3.ts', `COPY package.json ./   # 1.`, `COPY package*.json ./  # 1.`, 2)
rep('data/docker/modules/docker-3.ts', `{ id: '3', label: 'COPY package.json ./' },`, `{ id: '3', label: 'COPY package*.json ./' },`)
rep('data/docker/modules/docker-3.ts',
  `In this legacy example, the video copies the code`,
  `This Dockerfile is shown exactly as in the video: Ubuntu 18.04 and Node 10 are end-of-life today, so treat it as a historical example. Notice that the video copies the code`)
rep('data/docker/modules/docker-3.ts',
  `In questo esempio di riferimento del video, il codice viene copiato`,
  `Questo Dockerfile è riportato esattamente come nel video: Ubuntu 18.04 e Node 10 sono oggi fuori supporto, quindi consideralo un esempio storico. Nota che il codice viene copiato`)

// docker-4
rep('data/docker/modules/docker-4.ts',
  `{ en: '**Minor Version**', it: '**Versione Minor**' },`,
  `{ en: '**Major Version**', it: '**Versione Major**' },`)
rep('data/docker/modules/docker-4.ts', `(like AWS ECR, Google GCR, or GitHub Container Registry)`, `(like AWS ECR, Google Artifact Registry, or GitHub Container Registry)`)
rep('data/docker/modules/docker-4.ts', `(come AWS ECR, Google GCR o GitHub Container Registry)`, `(come AWS ECR, Google Artifact Registry o GitHub Container Registry)`)

// docker-6
rep('data/docker/modules/docker-6.ts', `In questa simulazione creerei una rete`, `In questa simulazione creerai una rete`)
rep('data/docker/modules/docker-6.ts',
  `        en: '📺 Docker Networking in 5 Minutes',
        it: '📺 Docker Networking in 5 Minuti'`,
  `        en: '📺 Docker networking: modes and port exposure',
        it: '📺 Docker networking: modalità e porte'`)
rep('data/docker/modules/docker-6.ts',
  `        en: 'A quick 5-minute visual guide to understanding Docker container networking, port mapping, and custom bridges.',
        it: 'Una guida visiva rapida di 5 minuti per comprendere la rete tra container Docker, la mappatura delle porte e i bridge personalizzati.'`,
  `        en: 'A lesson from the free LearnCantrill Docker Fundamentals course: network modes, port exposure and custom bridges.',
        it: 'Una lezione del corso gratuito Docker Fundamentals di LearnCantrill: modalità di rete, esposizione delle porte e bridge personalizzati.'`)

// docker-7
rep('data/docker/modules/docker-7.ts',
  `        en: '📺 Docker Compose in 6 Minutes',
        it: '📺 Docker Compose in 6 Minuti'`,
  `        en: '📺 Docker Compose explained (NetworkChuck)',
        it: '📺 Docker Compose spiegato (NetworkChuck)'`)
rep('data/docker/modules/docker-7.ts',
  `{ en: '*(Startup ordering)*', it: '*(Ordine di avvio)*' }`,
  `{ en: '*(Startup order only; add \`condition: service_healthy\` to wait for readiness)*', it: '*(Solo ordine di avvio; aggiungi \`condition: service_healthy\` per attendere che sia pronto)*' }`)
rep('data/docker/modules/docker-7.ts', `      code: \`version: '3.8'\nservices:`, `      code: \`services:`)
rep('data/docker/modules/docker-7.ts', `{ en: '❌ Removed', it: '❌ Riscossi/Rimossi' }`, `{ en: '❌ Removed', it: '❌ Rimossi' }`)
rep('data/docker/modules/docker-7.ts', `Type \`docker-compose up -d\` in the CLI terminal.`, `Type \`docker compose up -d\` in the CLI terminal.`)
rep('data/docker/modules/docker-7.ts', `Digita \`docker-compose up -d\` nel terminale CLI.`, `Digita \`docker compose up -d\` nel terminale CLI.`)
rep('data/docker/modules/docker-7.ts', `Type \`docker-compose down\` in the CLI terminal.`, `Type \`docker compose down\` in the CLI terminal.`)
rep('data/docker/modules/docker-7.ts', `Digita \`docker-compose down\` nel terminale CLI.`, `Digita \`docker compose down\` nel terminale CLI.`)
rep('data/docker/modules/docker-7.ts', `If you run \`docker-compose down\`, what happens`, `If you run \`docker compose down\`, what happens`)
rep('data/docker/modules/docker-7.ts', `Se esegui \`docker-compose down\`, cosa succede`, `Se esegui \`docker compose down\`, cosa succede`)
rep('data/docker/modules/docker-7.ts', `By default, \`docker-compose down\` removes`, `By default, \`docker compose down\` removes`)
rep('data/docker/modules/docker-7.ts', `Per impostazione predefinita, \`docker-compose down\` rimuove`, `Per impostazione predefinita, \`docker compose down\` rimuove`)

// docker-9
rep('data/docker/modules/docker-9.ts',
  `  title: 'Final Docker Challenge',
  subtitle: 'The Whale Master Certification',`,
  `  title: { en: 'Final Docker Challenge', it: 'Sfida Finale Docker' },
  subtitle: { en: 'The Whale Master Certification', it: 'La certificazione Whale Master' },`)
rep('data/docker/modules/docker-9.ts',
  `Which command cleanly removes all containers, networks, and images created by \`docker-compose up\` (without touching volumes)?`,
  `Which command stops and removes the containers and networks created by \`docker compose up\`, without touching volumes?`)
rep('data/docker/modules/docker-9.ts',
  `Quale comando rimuove in modo pulito tutti i container, le reti e le immagini creati da \`docker-compose up\` (senza toccare i volumi)?`,
  `Quale comando ferma e rimuove i container e le reti creati da \`docker compose up\`, senza toccare i volumi?`)
for (const sub of ['stop', 'kill', 'clean', 'down']) {
  rep('data/docker/modules/docker-9.ts', `{ en: 'docker-compose ${sub}', it: 'docker-compose ${sub}' }`, `{ en: 'docker compose ${sub}', it: 'docker compose ${sub}' }`)
}
rep('data/docker/modules/docker-9.ts',
  `It controls the absolute startup order. If \`web\` depends on \`db\`, compose starts \`db\` first.`,
  `It controls startup order: if \`web\` depends on \`db\`, Compose starts \`db\` first. It does not wait for \`db\` to be ready unless you add \`condition: service_healthy\`.`)
rep('data/docker/modules/docker-9.ts',
  R`Controlla l\'ordine assoluto di avvio. Se web dipende da db, compose avvia prima db.`,
  `Controlla l\\'ordine di avvio: se web dipende da db, Compose avvia prima db. Non attende che db sia pronto, a meno di aggiungere \`condition: service_healthy\`.`)

// Docker cheat sheet
rep('data/docker/cheatsheet.ts', `command: 'docker system prune -a --volumes',`, `command: 'docker system prune -a',`)
rep('data/docker/cheatsheet.ts',
  `description: { en: 'Clean up unused containers, networks, dangling images, and build cache', it: 'Pulisci tutti i container fermi, le reti non usate, le immagini orfane e la cache' },`,
  `description: { en: 'Clean up stopped containers, unused networks and images, and build cache (add --volumes to also delete unused volumes: irreversible)', it: 'Pulisci container fermi, reti e immagini non usate e la cache di build (aggiungi --volumes per cancellare anche i volumi inutilizzati: irreversibile)' },`)
rep('data/docker/cheatsheet.ts',
  R`output: '[+] Building 3.2s (8/8) FINISHED\n => [internal] load build definition from Dockerfile\n => [1/3] FROM docker.io/library/node:18-alpine\n => [2/3] COPY . /app\n => [3/3] RUN npm install --omit=dev\n => exporting to image my-app:v1.0'`,
  R`output: '[+] Building 3.2s (9/9) FINISHED\n => [internal] load build definition from Dockerfile\n => [1/4] FROM docker.io/library/node:18-alpine\n => [2/4] COPY package*.json ./\n => [3/4] RUN npm install --omit=dev\n => [4/4] COPY . .\n => exporting to image my-app:v1.0'`)

// Simulator Dockerfile shown by `cat Dockerfile` and the file badge
rep('components/games/docker-simulator/DockerParser.ts', R`COPY package.json ./\nRUN npm install`, R`COPY package*.json ./\nRUN npm install`)
rep('components/games/docker-simulator/DockerSimulator.tsx', R`COPY package.json ./\nRUN npm install`, R`COPY package*.json ./\nRUN npm install`)

// ──────────────────────────── K8S ──────────────────────────────
rep('data/k8s/modules/k8s-1.ts', `(*Kybernitis*)`, `(*Kybernētēs*)`, 2)
rep('data/k8s/modules/k8s-1.ts', `(*kybernitis*)`, `(*kybernētēs*)`, 2)
rep('data/k8s/modules/k8s-1.ts', `It comes from Greek "kybernitis" (helmsman)`, `It comes from Greek "kybernētēs" (helmsman)`)
rep('data/k8s/modules/k8s-1.ts', `Deriva dal greco "kybernitis" (timoniere)`, `Deriva dal greco "kybernētēs" (timoniere)`)
rep('data/k8s/modules/k8s-1.ts',
  R`    {
      type: 'infographic',
      title: { en: '🖖 Star Trek Origin: Seven of Nine (Project 7)', it: '🖖 L\'Origine da Star Trek: Sette di Nove (Project 7)' },
      content: {
        en: 'Jeri Ryan as Seven of Nine (Star Trek: Voyager). Google codenamed the open-source version of Borg as "Project Seven of Nine", which is why the original Kubernetes logo wheel has 7 spokes!',
        it: 'Jeri Ryan nei panni di "Sette di Nove" (Star Trek: Voyager). Google chiamò la versione open-source di Borg "Project Seven of Nine", motivo per cui il logo originale di Kubernetes ha 7 raggi sul timone!'
      },
      imageUrl: '/seven_of_nine.jpg'
    },
`,
  ``)

rep('data/k8s/modules/k8s-2.ts',
  `title: { en: '🧠 The Control Plane (Master Node)', it: '🧠 Il Control Plane (Master Node)' },`,
  `title: { en: '🧠 The Control Plane', it: '🧠 Il Control Plane' },`)
rep('data/k8s/modules/k8s-2.ts',
  `{ id: 'master', label: { en: 'Control Plane (Master)', it: 'Control Plane (Master)' } },`,
  `{ id: 'master', label: { en: 'Control Plane', it: 'Control Plane' } },`)
rep('data/k8s/modules/k8s-2.ts',
  `title: { en: 'Challenge: Master vs Worker', it: 'Sfida: Master vs Worker' },`,
  `title: { en: 'Challenge: Control Plane vs Worker', it: 'Sfida: Control Plane vs Worker' },`)
rep('components/modules/EducationAnimation.tsx', `'🧠 Control Plane Focus (Master Node): Isolates`, `'🧠 Control Plane Focus: Isolates`)
rep('components/modules/EducationAnimation.tsx', `controlPlaneTitle: 'Control Plane (Master Node)',`, `controlPlaneTitle: 'Control Plane',`)
rep('components/modules/EducationAnimation.tsx', `'🧠 Focus Control Plane (Nodo Master): Isola`, `'🧠 Focus Control Plane: Isola`)
rep('components/modules/EducationAnimation.tsx', `controlPlaneTitle: 'Control Plane (Nodo Master)',`, `controlPlaneTitle: 'Control Plane',`)

rep('data/k8s/modules/k8s-3.ts',
  `(e.g., \`auth-service-7f9\` or \`payment-api-89fbc\`).\\n\\n' +`,
  `(e.g., \`auth-service-7f9\` or \`payment-api-89fbc\`). In a real cluster the suffix is double, ReplicaSet hash plus Pod hash, e.g. \`auth-service-7f9c6d8b5-x2k4p\`; this simulator shortens it.\\n\\n' +`)
rep('data/k8s/modules/k8s-3.ts',
  `(es. \`auth-service-7f9\` o \`payment-api-89fbc\`).\\n\\n' +`,
  `(es. \`auth-service-7f9\` o \`payment-api-89fbc\`). In un cluster reale il suffisso è doppio, hash del ReplicaSet più hash del Pod, es. \`auth-service-7f9c6d8b5-x2k4p\`; questo simulatore lo abbrevia.\\n\\n' +`)

rep('data/k8s/modules/k8s-5.ts', `⚠️ **Why NodePort is NOT SECURE for Production!**:`, `⚠️ **Why NodePort is not recommended for production**:`)
rep('data/k8s/modules/k8s-5.ts', `⚠️ **Perché NodePort NON è SICURO per la Produzione!**:`, `⚠️ **Perché NodePort è sconsigliato in produzione**:`)
rep('data/k8s/modules/k8s-5.ts',
  `{ en: \`🔴 **UNSECURE** / Exposes Nodes\`, it: \`🔴 **NON SICURO** / Espone Nodi\` }`,
  `{ en: \`🟠 Not for production / Exposes nodes\`, it: \`🟠 Non per la produzione / Espone i nodi\` }`)
rep('data/k8s/modules/k8s-5.ts', `and why is NodePort considered insecure for production?`, `and why is NodePort discouraged in production?`)
rep('data/k8s/modules/k8s-5.ts', `e perché NodePort è considerato non sicuro per la produzione?`, `e perché NodePort è sconsigliato in produzione?`)
rep('data/k8s/modules/k8s-5.ts', `it is insecure because`, `it is discouraged because`, 4)
rep('data/k8s/modules/k8s-5.ts', `è non sicuro perché`, `è sconsigliato perché`, 4)

rep('data/k8s/modules/k8s-6.ts', `L'Agenda ed la Cassaforte`, `L'Agenda e la Cassaforte`)
rep('data/k8s/modules/k8s-6.ts',
  `Protected by Role-Based Access Control (RBAC) and loaded only into volatile RAM (tmpfs) on worker nodes so it is never saved to physical disk storage.`,
  `Protected by Role-Based Access Control (RBAC), stored in etcd (enable encryption at rest!) and mounted into Pods from volatile RAM (tmpfs), so it never touches the worker node's disk.`)
rep('data/k8s/modules/k8s-6.ts',
  `Protetti dal controllo degli accessi RBAC e caricati solo nella RAM volatile (tmpfs) dei nodi worker per evitare che vengano salvati su disco fisico.`,
  `Protetti dal controllo degli accessi RBAC, salvati in etcd (abilita la cifratura a riposo!) e montati nei Pod da RAM volatile (tmpfs), così non toccano mai il disco del nodo worker.`)
rep('data/k8s/modules/k8s-6.ts',
  `🔒 **How Kubernetes Protects Secrets**: Kubernetes ensures that Secrets are loaded exclusively into the **volatile RAM (tmpfs)** of the worker node running the Pod, preventing credentials from being saved to physical hard drives or log files.`,
  `🔒 **How Kubernetes handles Secrets**: Secrets are persisted in **etcd** like any other object, in plain Base64 unless you enable **encryption at rest** (EncryptionConfiguration). On the worker node, Secret volumes are mounted from **volatile RAM (tmpfs)**, so credentials never land on the node's disk. Access is limited by **RBAC**.`)
rep('data/k8s/modules/k8s-6.ts',
  `🔒 **Come Kubernetes Protegge i Secret**: Kubernetes assicura che i Secret vengano caricati esclusivamente nella **RAM volatile (tmpfs)** del nodo worker su cui gira il Pod, impedendo che le credenziali vengano salvate su dischi rigidi fisici o log.`,
  `🔒 **Come Kubernetes gestisce i Secret**: i Secret sono persistiti in **etcd** come ogni altro oggetto, in semplice Base64 a meno che tu non abiliti la **cifratura a riposo** (EncryptionConfiguration). Sul nodo worker i volumi Secret sono montati da **RAM volatile (tmpfs)**, così le credenziali non finiscono sul disco del nodo. L'accesso è limitato da **RBAC**.`)
rep('data/k8s/modules/k8s-6.ts',
  `{ en: \`RBAC protected + RAM tmpfs\`, it: \`Protetto da RBAC + RAM tmpfs\` }`,
  `{ en: \`RBAC + tmpfs mount; encrypt etcd at rest\`, it: \`RBAC + mount tmpfs; cifra etcd a riposo\` }`)
rep('data/k8s/modules/k8s-6.ts',
  `Kubernetes protects Secrets at runtime via RBAC and RAM tmpfs mounting.`,
  `Enable encryption at rest for etcd and rely on RBAC and tmpfs mounts at runtime.`)
rep('data/k8s/modules/k8s-6.ts',
  `Kubernetes protegge i Secret a runtime tramite RBAC e montaggio in RAM volatile tmpfs.`,
  `Abilita la cifratura a riposo di etcd e affidati a RBAC e ai mount tmpfs a runtime.`)
rep('data/k8s/modules/k8s-6.ts',
  `Files in mounted volumes are **automatically updated in real-time** by the Kubelet when the ConfigMap is modified.`,
  `Files in mounted volumes are **refreshed automatically** by the Kubelet when the ConfigMap changes (within its sync period, usually under a minute; not when mounted with \`subPath\`).`)
rep('data/k8s/modules/k8s-6.ts',
  `I file montati nei volumi vengono **sincronizzati automaticamente in tempo reale** da Kubelet quando la ConfigMap viene modificata.`,
  `I file montati nei volumi vengono **aggiornati automaticamente** da Kubelet quando la ConfigMap cambia (entro il suo periodo di sync, di solito meno di un minuto; non se montati con \`subPath\`).`)
rep('data/k8s/modules/k8s-6.ts',
  `metadata:
  name: backend-api
spec:
  template:
    spec:
      containers:
      - name: api-container
        image: my-company/api:v1.0
        env:
        - name: DATABASE_PASSWORD`,
  `metadata:
  name: backend-api
spec:
  selector:
    matchLabels:
      app: backend-api
  template:
    metadata:
      labels:
        app: backend-api
    spec:
      containers:
      - name: api-container
        image: my-company/api:v1.0
        env:
        - name: DATABASE_PASSWORD`)

rep('data/k8s/modules/k8s-7.ts', `provisioner: kubernetes.io/aws-ebs  # Cloud infrastructure driver`, `provisioner: ebs.csi.aws.com  # AWS EBS CSI driver`)

rep('data/k8s/modules/k8s-9.ts',
  `{ en: 'As a secure and encrypted Kubernetes Secret', it: 'Come un Secret Kubernetes sicuro e criptato' },`,
  `{ en: 'As a Kubernetes Secret, protected by RBAC and encrypted at rest in etcd', it: 'Come Secret Kubernetes, protetto da RBAC e cifrato a riposo in etcd' },`)
rep('data/k8s/modules/k8s-9.ts',
  R`You must use a K8s Secret. While it\'s technically similar to a ConfigMap, Secrets are mounted securely into RAM (tmpfs) on worker nodes to prevent them from landing on physical disk drives.`,
  R`Use a K8s Secret. It is structurally similar to a ConfigMap, but it is meant for sensitive data: restrict it with RBAC, enable encryption at rest in etcd, and it is mounted from tmpfs on worker nodes.`)
rep('data/k8s/modules/k8s-9.ts',
  `Devi usare un Secret di K8s. Anche se è tecnicamente simile a una ConfigMap, i Secret vengono montati in modo sicuro nella RAM (tmpfs) sui nodi worker per evitare che finiscano sui dischi rigidi fisici.`,
  `Usa un Secret di K8s. È strutturalmente simile a una ConfigMap, ma è pensato per dati sensibili: limitalo con RBAC, abilita la cifratura a riposo in etcd, e viene montato da tmpfs sui nodi worker.`)
rep('data/k8s/modules/k8s-9.ts',
  `Altering the \`replicas\` field in the file and reapplying it is the standard GitOps way.`,
  `Altering the \`replicas\` field in the file and reapplying it is the standard GitOps way. \`kubectl scale\` works too and is handy for quick tests, but the change is not tracked in your YAML.`)
rep('data/k8s/modules/k8s-9.ts',
  `Modificare il campo \`replicas\` nel file e riapplicarlo è il modo standard in ambito GitOps.`,
  `Modificare il campo \`replicas\` nel file e riapplicarlo è il modo standard in ambito GitOps. Anche \`kubectl scale\` funziona ed è comodo per test rapidi, ma la modifica non resta tracciata nello YAML.`)

rep('data/k8s/cheatsheet.ts', `stato di collegameto`, `stato di collegamento`)

// ───────────────────── certifications / translations ─────────────────────
rep('data/certifications.ts', `url: 'https://about.gitlab.com/learn/certifications/',`, `url: 'https://university.gitlab.com/pages/certifications',`)
rep('data/certifications.ts', `url: 'https://examregistration.github.com',`, `url: 'https://learn.github.com/',`)
rep('data/certifications.ts', `url: 'https://training.mirantis.com/dca-certification-exam/',`, `url: 'https://training.mirantis.com/certification/dca-certification-exam/',`)
rep('data/translations.ts', `'cert.verified': 'VERIFIED BY DEVHARBOR',`, `'cert.verified': 'VERIFIED BY AGILE LAB',`)
rep('data/translations.ts', `'cert.verified': 'VERIFICATO DA DEVHARBOR',`, `'cert.verified': 'VERIFICATO DA AGILE LAB',`)

// ──────────────────────────── run ──────────────────────────────
const byFile = new Map()
for (const e of edits) {
  if (!byFile.has(e.file)) byFile.set(e.file, readFileSync(resolve(root, e.file), 'utf8').replace(/\r\n/g, '\n'))
  let src = byFile.get(e.file)
  const occurrences = src.split(e.from).length - 1
  if (occurrences !== e.count) {
    console.error(`\n✖ ${e.file}: expected ${e.count} match(es), found ${occurrences} for:\n${e.from.slice(0, 160)}…`)
    process.exit(1)
  }
  src = src.split(e.from).join(e.to)
  byFile.set(e.file, src)
  applied += 1
}
for (const [file, src] of byFile) writeFileSync(resolve(root, file), src)
console.log(`✔ ${applied} replacements applied across ${byFile.size} files`)
