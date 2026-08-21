import type { Module } from '../../types'

export const k8s4: Module = {
  id: 'k8s-4',
  track: 'k8s',
  order: 4,
  title: { en: 'Deployments & Self-Healing', it: 'Deployment e Self-Healing' },
  subtitle: { en: 'Declaring the desired state', it: 'Dichiarare lo stato desiderato' },
  emoji: '📄',
  duration: '25 min',
  xpReward: 150,
  sections: [
    {
      type: 'intro',
      content: { en: 'As we saw, you should never create individual Pods manually. If a naked Pod crashes, it\'s gone forever. We want K8s to maintain a **desired state** (e.g. "I always want 3 copies of this app running"). We achieve this using a **Deployment**.', it: 'Come abbiamo visto, non dovresti mai creare singoli Pod manualmente. Se un Pod "nudo" crasha, è perso per sempre. Vogliamo che K8s mantenga uno **stato desiderato** (es. "Voglio sempre 3 copie di questa app in esecuzione"). Otteniamo questo risultato usando un **Deployment**.' }
    },
    {
      type: 'video',
      title: { en: '📺 Imperative vs Declarative in K8s', it: '📺 Imperativo vs Dichiarativo in K8s' },
      content: { en: 'TechWorld with Nana provides a visual walkthrough of imperative kubectl commands vs declarative YAML manifests.', it: 'TechWorld with Nana fornisce un\'analisi visiva tra i comandi imperativi kubectl e i manifest dichiarativi YAML.' },
      videoUrl: 'https://www.youtube.com/watch?v=F0f18tE9j1U'
    },
    {
      type: 'concept',
      title: { en: '📄 The Deployment YAML', it: '📄 Il YAML del Deployment' },
      content: { en: 'A Deployment is a YAML file where you say: \n\n"I want a Deployment named *my-app*. I want exactly *3 replicas* (Pods). Use the container image *node:18*."\n\nKubernetes constantly reads this file. If it sees only 2 Pods running, it spins up a 3rd. If it sees 4, it assassinates 1. It is a tireless robot enforcing your will.', it: 'Un Deployment è un file YAML dove dici: \n\n"Voglio un Deployment chiamato *my-app*. Voglio esattamente *3 repliche* (Pod). Usa l\'immagine container *node:18*."\n\nKubernetes legge costantemente questo file. Se vede solo 2 Pod in esecuzione, ne avvia un terzo. Se ne vede 4, ne elimina 1. È un robot instancabile che impone la tua volontà.' }
    },
    {
      type: 'concept',
      title: { en: '📦 Stateless vs Stateful Workloads: Deployment vs StatefulSet', it: '📦 Carichi Stateless vs Stateful: Deployment vs StatefulSet' },
      content: {
        en: 'Not all containerized applications are structured the same way. Understanding the difference between **Stateless** and **Stateful** workloads is crucial:\n\n' +
            '• **⚡ Stateless Applications (Deployments)**:\n' +
            '  - Web APIs, microservices, and frontend apps that do NOT save data locally.\n' +
            '  - Super easy to containerize and scale! Pods are 100% identical and interchangeable with random generated names (`web-7bb9x`).\n' +
            '  - If a pod dies, any new pod handles traffic instantly without data loss.\n\n' +
            '• **💾 Stateful Applications (StatefulSets)**:\n' +
            '  - Databases (PostgreSQL, MySQL, MongoDB, Redis) requiring persistent data and continuous state.\n' +
            '  - **Sticky Identity**: Pods get predictable ordinal names (`db-0`, `db-1`, `db-2`) preserved across restarts.\n' +
            '  - **Dedicated Storage (PV/PVC)**: Each pod gets its OWN dedicated storage volume. Remote cloud storage (EBS/AzureDisk) is strongly recommended so if a pod is rescheduled to another node, it re-attaches its storage seamlessly.\n' +
            '  - **Ordered Creation & Scale Down**: Pods are created sequentially (`db-0` -> `db-1` -> `db-2`) and deleted in reverse order (`db-2` -> `db-1`).\n' +
            '  - **Headless Service (Individual DNS)**: Each pod gets its own fixed internal network DNS hostname.\n' +
            '  - **Replication Complexity**: Replicating databases is complex (cloning, data sync, leader election, backups). K8s helps with StatefulSets, but stateless architecture is always preferred when possible!',
        it: 'Non tutte le applicazioni containerizzate sono strutturate allo stesso modo. Capire la differenza tra carichi **Stateless** e **Stateful** è fondamentale:\n\n' +
            '• **⚡ Applicazioni Stateless (Deployment)**:\n' +
            '  - Web API, microservizi e frontend che NON salvano dati sul disco locale.\n' +
            '  - Semplicissime da containerizzare e scalare! I Pod sono uguali al 100%, intercambiabili e hanno nomi casuali (`web-7bb9x`).\n' +
            '  - Se un pod muore, qualsiasi altro pod gestisce il traffico al suo posto senza alcuna perdita.\n\n' +
            '• **💾 Applicazioni Stateful (StatefulSet)**:\n' +
            '  - Database (PostgreSQL, MySQL, MongoDB, Redis) che richiedono stato e persistenza dei dati.\n' +
            '  - **Sticky Identity (Identità Fissa)**: I Pod ricevono nomi ordinali mantenuti ai riavvii (`db-0`, `db-1`, `db-2`).\n' +
            '  - **Storage Dedicato (PV/PVC per Pod)**: Ogni pod ha il PROPRIO volume di storage indipendente. Lo storage remoto (AWS EBS / Azure Disk) è consigliato: se il pod viene ri-schedulato su un altro nodo, ritroverà i suoi dati montando lo stesso disco remoto!\n' +
            '  - **Ordine di Creazione & Eliminazione**: I pod vengono creati in sequenza (`db-0` -> `db-1` -> `db-2`) e cancellati in ordine inverso (`db-2` -> `db-1`).\n' +
            '  - **Headless Service (DNS Individuale)**: Ogni pod ha un proprio indirizzo DNS fisso individuale.\n' +
            '  - **Complessità di Replicazione**: Replicare database è complesso (richiede clonazione dati, sincronizzazione leader/replica, backup). K8s aiuta con i StatefulSet, ma l\'architettura stateless è sempre da preferire quando possibile!'
      }
    },
    {
      type: 'video',
      title: { en: '📺 Stateful vs Stateless (Deployment vs StatefulSet)', it: '📺 Applicazioni Stateful vs Stateless (Deployment vs StatefulSet)' },
      content: { en: 'TechWorld with Nana explains why StatefulSets exist, how storage is attached to individual pods, and why stateless apps are so much easier to run in Kubernetes.', it: 'TechWorld with Nana spiega perché esistono i StatefulSet, come viene collegato lo storage ai singoli pod e perché le app stateless sono molto più semplici da gestire.' },
      videoUrl: 'https://www.youtube.com/watch?v=pPQKAR1pA9U'
    },
    {
      type: 'code',
      title: { en: 'Look at a real Deployment YAML', it: 'Guarda un vero YAML di Deployment' },
      content: { en: 'Notice the `replicas: 3` and the `template`, which is basically an embedded Pod definition.', it: 'Nota le `replicas: 3` e il `template`, che è fondamentalmente una definizione di Pod incorporata.' },
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:         # Everything below here is the blueprint for the Pods!
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80`,
      language: 'yaml'
    },
    {
      type: 'table',
      title: { en: '🚀 Rollouts (Zero-Downtime Updates)', it: '🚀 Rollout (Aggiornamenti senza downtime)' },
      content: { en: 'Deployments allow you to update your application without anyone noticing.', it: 'I Deployment ti permettono di aggiornare la tua applicazione senza che nessuno se ne accorga.' },
      tableData: {
        headers: [{ en: 'Action', it: 'Azione' }, { en: 'What K8s does automatically under the hood', it: 'Cosa fa K8s automaticamente "sotto il cofano"' }, { en: 'Result', it: 'Risultato' }],
        rows: [
          [{ en: 'Update image to v2', it: 'Aggiornamento immagine a v2' }, { en: 'Spins up a new v2 pod. Waits for it to be healthy.', it: 'Avvia un nuovo pod v2. Aspetta che sia sano.' }, { en: 'No downtime', it: 'Nessun downtime' }],
          [{ en: 'v2 pod is Ready', it: 'Il pod v2 è Pronto' }, { en: 'Shuts down one of the old v1 pods.', it: 'Spegne uno dei vecchi pod v1.' }, { en: 'Traffic smoothly shifts', it: 'Il traffico si sposta dolcemente' }],
          [{ en: 'Repeat', it: 'Ripeti' }, { en: 'Continues rolling out 1 by 1 until all are v2.', it: 'Continua il rollout 1 a 1 finché tutti sono v2.' }, { en: '100% updated safely', it: 'Aggiornato al 100% in sicurezza' }],
          [{ en: 'Wait, v2 crashes!', it: 'Aspetta, v2 crasha!' }, { en: 'Deployment halts! Old v1 pods are kept alive.', it: 'Il deployment si ferma! I vecchi pod v1 vengono mantenuti vivi.' }, { en: 'Vast majority of users unaffected', it: 'La stragrande maggioranza degli utenti non è influenzata' }]
        ]
      }
    },
    {
      type: 'game',
      title: { en: 'Lab: The Self-Healing Cluster', it: 'Lab: Il cluster auto-riparante' },
      content: { en: 'Experience the power of Declarative state. In this lab, you\'ll try to break the cluster, only to see K8s fix it for you automatically.', it: 'Sperimenta la potenza dello stato Dichiarativo. In questo lab, proverai a rompere il cluster, solo per vedere K8s ripararlo per te automaticamente.' },
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'worker-1', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: []
        },
        tasks: [
          {
            id: '1',
            instruction: { en: 'Apply the web deployment manifest using `web.yml`', it: 'Applica il manifest di deployment web usando `web.yml`' },
            condition: 'DEPLOYMENT_EXISTS:web-deployment',
            hints: [
              { en: 'Use `kubectl apply -f` to deploy resources declared in a YAML file.', it: 'Usa `kubectl apply -f` per distribuire le risorse dichiarate in un file YAML.' },
              { en: 'The file name for the web deployment in the directory is `web.yml`.', it: 'Il nome del file per il deployment web nella cartella è `web.yml`.' },
              { en: 'Run: `kubectl apply -f web.yml`', it: 'Esegui: `kubectl apply -f web.yml`' }
            ]
          },
          {
            id: '2',
            instruction: { en: 'Delete one of the active pods', it: 'Elimina uno dei pod attivi' },
            condition: 'PODS_RUNNING:3',
            hints: [
              { en: 'First list running pods with `kubectl get pods` to see their names.', it: 'Per prima cosa elenca i pod attivi con `kubectl get pods` per vedere i loro nomi.' },
              { en: 'Use `kubectl delete pod <pod-name>` specifying one of the active pod names.', it: 'Usa `kubectl delete pod <nome-pod>` specificando uno dei nomi dei pod attivi.' },
              { en: 'Run: `kubectl delete pod web-deployment-1`', it: 'Esegui: `kubectl delete pod web-deployment-1`' }
            ]
          },
          {
            id: '3',
            instruction: { en: 'Scale the `web-deployment` to 6 replicas', it: 'Scala il `web-deployment` a 6 repliche' },
            condition: 'REPLICAS:web-deployment:6',
            hints: [
              { en: 'Use `kubectl scale` to change the number of running replicas.', it: 'Usa `kubectl scale` per modificare il numero di repliche in esecuzione.' },
              { en: 'Specify `deployment/web-deployment` with `--replicas=6`.', it: 'Specifica `deployment/web-deployment` con `--replicas=6`.' },
              { en: 'Run: `kubectl scale deployment/web-deployment --replicas=6`', it: 'Esegui: `kubectl scale deployment/web-deployment --replicas=6`' }
            ]
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-4-q1',
      question: { en: 'Why is a declarative approach (writing YAML files) better than an imperative approach (running terminal scripts sequentially)?', it: 'Perché un approccio dichiarativo (scrivere file YAML) è migliore di un approccio imperativo (eseguire script nel terminale in sequenza)?' },
      options: [
        { en: 'Imperative approaches can only be executed on legacy local Linux hardware', it: 'Gli approcci imperativi possono essere eseguiti solo su hardware Linux locale legacy' },
        { en: 'Declarative files let K8s manage complexity, self-healing, and state correction', it: 'I file dichiarativi permettono a K8s di gestire complessità, auto-riparazione e correzione dello stato' },
        { en: 'Declarative approaches use significantly less CPU and memory for the controller', it: 'Gli approcci dichiarativi usano molta meno CPU e memoria per il controller' },
        { en: 'Declarative files are cached at the kernel level and are impossible to delete', it: 'I file dichiarativi sono memorizzati nella cache a livello di kernel e sono impossibili da eliminare' }
      ],
      correct: 1,
      explanation: { en: 'If a node dies in an imperative script, you have to write a script to detect and fix it. In a declarative system, you simply stated "I want 3 pods." The system constantly acts to make reality match that file.', it: 'Se un nodo muore in uno script imperativo, devi scrivere uno script per rilevarlo e ripararlo. In un sistema dichiarativo, hai semplicemente dichiarato "Voglio 3 pod". Il sistema agisce costantemente per far sì che la realtà corrisponda a quel file.' }
    },
    {
      id: 'k8s-4-q2',
      question: { en: 'During a Rolling Update with a Deployment, what happens if the newly deployed v2 Pod immediately crashes?', it: 'Durante un Rolling Update con un Deployment, cosa succede se il nuovo Pod v2 distribuito crasha immediatamente?' },
      options: [
        { en: 'The entire cluster reboots automatically to clear the internal cache', it: 'L\'intero cluster si riavvia automaticamente per svuotare la cache interna' },
        { en: 'The update proceeds anyway, systematically destroying all stable v1 pods', it: 'L\'aggiornamento procede comunque, distruggendo sistematicamente tutti i pod v1 stabili' },
        { en: 'The Deployment halts the rollout indefinitely until a human intervention', it: 'Il Deployment interrompe il rollout indefinitamente fino a un intervento umano' },
        { en: 'The underlying persistent database is wiped to prevent any data corruption', it: 'Il database persistente sottostante viene cancellato per prevenire corruzioni di dati' }
      ],
      correct: 2,
      explanation: { en: 'A key feature of Deployments is that they verify "readiness" of new pods. If the new pod crashes (e.g. `CrashLoopBackOff`), the rollout stops, preventing a catastrophic 100% outage.', it: 'Una caratteristica chiave dei Deployment è che verificano la "readiness" (prontezza) dei nuovi pod. Se il nuovo pod crasha (es. `CrashLoopBackOff`), il rollout si ferma, prevenendo un disservizio totale catastrofico.' }
    },
    {
      id: 'k8s-4-q3',
      question: { en: 'Which kubectl command allows you to quickly scale a Deployment named "payment-api" to 5 replicas without editing YAML manually?', it: 'Quale comando kubectl ti permette di scalare rapidamente un Deployment chiamato "payment-api" a 5 repliche senza modificare a mano il file YAML?' },
      options: [
        'kubectl scale deployment/payment-api --replicas=5',
        'kubectl set replicas payment-api 5',
        'kubectl resize deployment payment-api --count=5',
        'kubectl run payment-api --count=5'
      ],
      correct: 0,
      explanation: { en: 'The command `kubectl scale deployment/[name] --replicas=[N]` directly updates the Deployment replica count in etcd.', it: 'Il comando `kubectl scale deployment/[nome] --replicas=[N]` aggiorna direttamente il numero di repliche del Deployment in etcd.' }
    },
    {
      id: 'k8s-4-q4',
      question: { en: 'Why are StatefulSets used instead of Deployments for running database clusters like PostgreSQL or MongoDB?', it: 'Perché vengono usati i StatefulSet al posto dei Deployment per eseguire cluster di database come PostgreSQL o MongoDB?' },
      options: [
        { en: 'StatefulSets provide sticky pod identities (db-0, db-1) and dedicated persistent storage per pod', it: 'I StatefulSet forniscono identità fisse per i pod (db-0, db-1) e storage persistente dedicato per ciascun pod' },
        { en: 'StatefulSets execute container code up to 10x faster than standard Deployments', it: 'I StatefulSet eseguono il codice nei container fino a 10 volte più velocemente dei Deployment standard' },
        { en: 'Deployments are strictly forbidden from running container images larger than 100MB', it: 'Ai Deployment è severamente vietato eseguire immagini container superiori a 100MB' },
        { en: 'StatefulSets do not require any worker node hardware to function', it: 'I StatefulSet non richiedono alcun hardware di nodo worker per funzionare' }
      ],
      correct: 0,
      explanation: { en: 'Databases require sticky identities, predictable ordinal DNS names, and individual persistent volume claims for each replica node, which StatefulSets manage automatically.', it: 'I database richiedono identità fisse, nomi DNS ordinali prevedibili e claim di volume persistente individuali per ciascuna replica, che i StatefulSet gestiscono automaticamente.' }
    }
  ]
}
