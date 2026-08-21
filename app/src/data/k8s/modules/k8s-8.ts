import type { Module } from '../../types'

export const k8s8: Module = {
  id: 'k8s-8',
  track: 'k8s',
  order: 8,
  title: { en: 'Hands-on Labs: Playground', it: 'Lab Pratici: Playground' },
  subtitle: { en: 'Free clusters to practice safely', it: 'Cluster gratuiti per esercitarsi in sicurezza' },
  emoji: '🧪',
  duration: '45+ min',
  xpReward: 100,
  externalLink: {
    label: { en: 'Launch Killercoda K8s Lab', it: 'Avvia il Lab K8s su Killercoda' },
    url: 'https://killercoda.com/playgrounds/scenario/kubernetes',
    xpPrompt: { en: 'How many Killercoda tasks did you conquer? Enter below!', it: 'Quanti task di Killercoda hai completato? Inserisci il numero qui sotto!' }
  },
  sections: [
    {
      type: 'intro',
      content: { en: 'You cannot learn Kubernetes entirely by reading theory. You MUST use `kubectl`. The good news? You do not need to install Minikube or pay Google Cloud. Free browser-based cluster environments exist.', it: 'Non puoi imparare Kubernetes interamente leggendo la teoria. DEVI usare `kubectl`. La buona notizia? Non è necessario installare Minikube o pagare Google Cloud. Esistono ambienti cluster gratuiti basati su browser.' }
    },
    {
      type: 'concept',
      title: { en: '🌐 Tool 1: Killercoda Playgrounds', it: '🌐 Strumento 1: Killercoda Playground' },
      content: { en: '**Killercoda** is the absolute best free Kubernetes playground. \n\n- Gives you a two-node cluster (1 Master, 1 Worker)\n- Already configured with autocomplete and right permissions\n- 100% Free, runs instantly in the browser\n\n🔗 **URL**: [https://killercoda.com](https://killercoda.com)', it: '**Killercoda** è in assoluto il miglior playground gratuito per Kubernetes. \n\n- Ti fornisce un cluster a due nodi (1 Master, 1 Worker)\n- Già configurato con autocompletamento e permessi corretti\n- 100% gratuito, si avvia istantaneamente nel browser\n\n🔗 **URL**: [https://killercoda.com](https://killercoda.com)' }
    },
    {
      type: 'concept',
      title: { en: '📚 Tool 2: K8s Official Tutorials', it: '📚 Strumento 2: Tutorial Ufficiali K8s' },
      content: { en: 'The official K8s documentation has an excellent interactive tutorial track.\n\n🔗 **URL**: [https://kubernetes.io/docs/tutorials/kubernetes-basics/](https://kubernetes.io/docs/tutorials/kubernetes-basics/)\n\n💡 **Recommended Focus:**\nDeploy an App -> Expose your app (Service) -> Scale your app -> Update your app.', it: 'La documentazione ufficiale di K8s ha un eccellente percorso di tutorial interattivi.\n\n🔗 **URL**: [https://kubernetes.io/docs/tutorials/kubernetes-basics/](https://kubernetes.io/docs/tutorials/kubernetes-basics/)\n\n💡 **Focus consigliato:**\nDistribuisci un\'App -> Esponi la tua app (Service) -> Scala la tua app -> Aggiorna la tua app.' }
    },
    {
      type: 'tip',
      title: { en: '🎯 The Golden Rule of Debugging', it: '🎯 La Regola d\'Oro del Debugging' },
      content: { en: 'When things break in your lab, follow the **K8s Debugging Trinity** in this exact order:\n1. `kubectl get pods` (Are they running or crashing?)\n2. `kubectl describe pod [name]` (Look at the "Events" at the bottom for errors!)\n3. `kubectl logs [name]` (Read the actual application error stacktrace)', it: 'Quando le cose non funzionano nel tuo lab, segui la **Trinità del Debugging K8s** in questo esatto ordine:\n1. `kubectl get pods` (Stanno girando o sono in crash?)\n2. `kubectl describe pod [name]` (Guarda gli "Events" in fondo per trovare gli errori!)\n3. `kubectl logs [name]` (Leggi lo stacktrace reale degli errori dell\'applicazione)' }
    },
    {
      type: 'concept',
      title: { en: '⚖️ Production Resource Management: Requests vs Limits', it: '⚖️ Gestione Risorse in Produzione: Request vs Limit' },
      content: {
        en: 'To prevent noisy neighbor containers from consuming all node CPU or RAM, every production container should define resource specs:\n\n' +
            '• **`requests` (Guaranteed Reservation)**: The minimum CPU (`500m` = 0.5 vCPU core) and Memory (`256Mi`) guaranteed by the Scheduler when assigning the Pod to a Node.\n' +
            '• **`limits` (Maximum Ceiling)**: The absolute maximum RAM (`512Mi`) and CPU (`1` core) the container can consume.\n\n' +
            '⚠️ **What happens if limits are exceeded?**\n' +
            '- Exceeding CPU Limit: Container process is **throttled** (slowed down), but survives.\n' +
            '- Exceeding RAM Limit: Container process is **OOMKilled** (Out Of Memory Killed) instantly by the Linux kernel and restarted by K8s!',
        it: 'Per evitare che container avidi consumino tutta la CPU o la RAM dei nodi, ogni container in produzione dovrebbe definire specifiche di risorsa:\n\n' +
            '• **`requests` (Riserva Garantita)**: La quantità minima di CPU (`500m` = 0.5 core vCPU) e Memoria (`256Mi`) garantita dallo Scheduler quando assegna il Pod a un Nodo.\n' +
            '• **`limits` (Tetto Massimo)**: Il limite massimo di RAM (`512Mi`) e CPU (`1` core) che il container può consumare.\n\n' +
            '⚠️ **Cosa succede se si superano i limiti?**\n' +
            '- Per la CPU: Il processo viene **rallentato** (throttled), ma sopravvive.\n' +
            '- Per la RAM: Il processo viene terminato all\'istante per **OOMKilled** (Out Of Memory Killed) dal kernel Linux e riavviato da K8s!'
      }
    },
    {
      type: 'concept',
      title: { en: '🩺 Health Probes: Liveness, Readiness & Startup', it: '🩺 Health Probe: Liveness, Readiness e Startup' },
      content: {
        en: 'How does Kubernetes know if your app inside the container is working or frozen in an infinite loop? By using **Probes**:\n\n' +
            '• **`livenessProbe`**: Checks if the app is still alive. If it fails (e.g. HTTP 500 or deadlock), Kubernetes **kills and restarts** the container.\n' +
            '• **`readinessProbe`**: Checks if the app is ready to accept user traffic (e.g. DB connection ready). If it fails, Kubernetes **removes the pod from Service endpoints** without killing it.\n' +
            '• **`startupProbe`**: Disables liveness/readiness probes during initial boot for slow-starting legacy apps.',
        it: 'Come fa Kubernetes a sapere se la tua app dentro il container funziona o è bloccata in un ciclo infinito? Usando le **Probe**:\n\n' +
            '• **`livenessProbe`**: Verifica se l\'app è ancora viva. Se fallisce (es. HTTP 500 o blocco), Kubernetes **uccide e riavvia** il container.\n' +
            '• **`readinessProbe`**: Verifica se l\'app è pronta a ricevere traffico (es. connessione al DB pronta). Se fallisce, Kubernetes **rimuove il pod dagli endpoint del Service** senza ucciderlo.\n' +
            '• **`startupProbe`**: Disabilita temporaneamente le altre probe durante l\'avvio iniziale per app legacy lente da avviare.'
      }
    },
    {
      type: 'video',
      title: { en: '📺 Master Kubernetes Probes (Liveness, Readiness, Startup)', it: '📺 Padroneggiare le Probe Kubernetes (Liveness, Readiness, Startup)' },
      content: { en: 'TechWorld with Nana demonstrates how to configure probes to prevent cluster downtime and avoid routing traffic to unready pods.', it: 'TechWorld with Nana mostra come configurare le probe per prevenire downtime nel cluster ed evitare di inviare traffico a pod non pronti.' },
      videoUrl: 'https://www.youtube.com/watch?v=s41p7F_2T8g'
    },
    {
      type: 'table',
      title: { en: '🚩 Common Pod Statuses & Fixes', it: '🚩 Stati Comuni dei Pod e Soluzioni' },
      content: { en: 'If `kubectl get pods` shows anything other than `Running`, use this guide:', it: 'Se `kubectl get pods` mostra qualcosa di diverso da `Running`, usa questa guida:' },
      tableData: {
        headers: [{ en: 'Status', it: 'Stato' }, { en: 'Meaning', it: 'Significato' }, { en: 'Primary Cause', it: 'Causa Principale' }],
        rows: [
          ['`ImagePullBackOff`', { en: 'K8s cannot download your container image', it: 'K8s non riesce a scaricare l\'immagine del container' }, { en: 'Typo in image name or private registry credentials missing', it: 'Errore nell\'immagine o credenziali del registro privato mancanti' }],
          ['`CrashLoopBackOff`', { en: 'The app starts but then crashes recursively', it: 'L\'app si avvia ma poi crasha ricorsivamente' }, { en: 'Code bug, missing secret, or database connection timeout', it: 'Bug nel codice, secret mancante o timeout della connessione al database' }],
          ['`Pending`', { en: 'The pod is "waiting in line" for a node', it: 'Il pod è "in attesa in fila" per un nodo' }, { en: 'Cluster is out of CPU/RAM or no PV is available for storage', it: 'Il cluster ha esaurito CPU/RAM o non ci sono PV disponibili' }],
          ['`OOMKilled`', { en: 'The container tried to use more RAM than allowed', it: 'Il container ha cercato di usare più RAM di quella consentita' }, { en: 'Memory leak or resource limit set too low', it: 'Memory leak o limite di risorse impostato troppo basso' }]
        ]
      }
    },
    {
      type: 'game',
      title: { en: 'Lab: The Internal Sandbox', it: 'Lab: La Sandbox Interna' },
      content: { en: 'Practice your skills right here! This simulator tracks state just like a real cluster. Try to deploy an app and expose it.', it: 'Esercita le tue abilità proprio qui! Questo simulatore traccia lo stato proprio come un cluster reale. Prova a distribuire un\'app ed esporla.' },
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'minikube', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: []
        },
        tasks: [
          {
            id: '1',
            instruction: { en: 'Deploy the nginx application manifest `nginx-deployment.yaml`', it: 'Distribuisci l\'applicazione nginx tramite `nginx-deployment.yaml`' },
            condition: 'PODS_RUNNING:2',
            hints: [
              { en: 'Use `kubectl apply -f` to create the nginx deployment resource.', it: 'Usa `kubectl apply -f` per creare la risorsa di deployment nginx.' },
              { en: 'The deployment manifest file in the directory is named `nginx-deployment.yaml`.', it: 'Il file manifesto del deployment nella cartella si chiama `nginx-deployment.yaml`.' },
              { en: 'Run: `kubectl apply -f nginx-deployment.yaml`', it: 'Esegui: `kubectl apply -f nginx-deployment.yaml`' }
            ]
          },
          {
            id: '2',
            instruction: { en: 'Expose the `nginx` deployment to the world as a LoadBalancer on port 80', it: 'Esponi il deployment `nginx` al mondo come LoadBalancer sulla porta 80' },
            condition: 'SERVICE_EXISTS:nginx',
            hints: [
              { en: 'Use `kubectl expose deployment` to create a service for `nginx`.', it: 'Usa `kubectl expose deployment` per creare un servizio per `nginx`.' },
              { en: 'Add flags `--type=LoadBalancer` and `--port=80`.', it: 'Aggiungi i flag `--type=LoadBalancer` e `--port=80`.' },
              { en: 'Run: `kubectl expose deployment nginx --type=LoadBalancer --port=80`', it: 'Esegui: `kubectl expose deployment nginx --type=LoadBalancer --port=80`' }
            ]
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-8-q1',
      question: { en: 'If `kubectl get pods` shows a Pod status of `ImagePullBackOff`, what is the primary root cause of this failure?', it: 'Se il comando `kubectl get pods` mostra lo stato `ImagePullBackOff` per un Pod, qual è la causa principale del problema?' },
      options: [
        { en: 'Kubernetes cannot download the container image (typo in image name or missing private registry credentials)', it: 'Kubernetes non riesce a scaricare l\'immagine del container (errore nel nome o credenziali del registro privato mancanti)' },
        { en: 'The container process crashed because it exceeded its allocated memory RAM limit', it: 'Il processo del container è crashato perché ha superato il limite di RAM allocata' },
        { en: 'The application code crashed immediately after starting up', it: 'Il codice dell\'applicazione è andato in crash immediatamente dopo l\'avvio' },
        { en: 'The cluster has run out of available CPU resources', it: 'Il cluster ha esaurito le risorse di CPU disponibili' }
      ],
      correct: 0,
      explanation: { en: '`ImagePullBackOff` indicates that Kubelet failed to pull the container image from the registry (e.g. wrong image name, invalid tag, or missing secret credentials).', it: '`ImagePullBackOff` indica che il Kubelet ha fallito il download dell\'immagine container dal registro (es. nome errato, tag non valido o credenziali mancanti).' }
    },
    {
      id: 'k8s-8-q2',
      question: { en: 'What does a Pod status of `CrashLoopBackOff` mean, and which command is the first diagnostic step?', it: 'Cosa significa lo stato `CrashLoopBackOff` per un Pod e qual è il primo comando da eseguire per diagnosticare l\'errore?' },
      options: [
        { en: 'The app starts but crashes repeatedly; run `kubectl logs <pod-name>` to read the code stack trace', it: 'L\'app si avvia ma va continuamente in crash; esegui `kubectl logs <pod-name>` per leggere lo stack trace del codice' },
        { en: 'The network proxy failed; run `kubectl get nodes` to restart worker nodes', it: 'Il proxy di rete ha fallito; esegui `kubectl get nodes` per riavviare i nodi worker' },
        { en: 'The pod is waiting for storage; run `kubectl scale` to allocate space', it: 'Il pod è in attesa di storage; esegui `kubectl scale` per allocare spazio' },
        { en: 'Port 80 is blocked; run `kubectl delete service` to clear rules', it: 'La porta 80 è bloccata; esegui `kubectl delete service` per pulire le regole' }
      ],
      correct: 0,
      explanation: { en: '`CrashLoopBackOff` means the application process starts and immediately exits with an error code. `kubectl logs` lets you inspect stdout/stderr to fix the code bug.', it: '`CrashLoopBackOff` significa che il processo dell\'applicazione si avvia e termina subito con un codice di errore. `kubectl logs` ti permette di ispezionare lo stdout/stderr per correggere il bug.' }
    },
    {
      id: 'k8s-8-q3',
      question: { en: 'Which diagnostic command provides the most comprehensive details, including recent system events and Kubelet error messages for a Pod?', it: 'Quale comando di diagnostica fornisce i dettagli più approfonditi, inclusi gli ultimi eventi di sistema e i messaggi di errore del Kubelet per un Pod?' },
      options: [
        'kubectl describe pod <pod-name>',
        'kubectl get pods',
        'kubectl logs <pod-name>',
        'kubectl top pod <pod-name>'
      ],
      correct: 0,
      explanation: { en: '`kubectl describe pod <name>` outputs complete lifecycle events, health probe failures, and Kubelet warnings for that specific resource.', it: '`kubectl describe pod <nome>` mostra l\'elenco completo degli eventi di ciclo di vita, i fallimenti di health probe e gli avvisi del Kubelet per quella specifica risorsa.' }
    },
    {
      id: 'k8s-8-q4',
      question: { en: 'What happens to a container process when it exceeds its specified RAM memory limit?', it: 'Cosa succede a un processo container quando supera il suo limite massimo di RAM specificato nei limits?' },
      options: [
        { en: 'The Linux kernel OOMKills (Out Of Memory) the container process, and K8s restarts it', it: 'Il kernel Linux arresta (OOMKills) il processo container e K8s lo riavvia' },
        { en: 'The container is automatically moved to a different worker node without restarting', it: 'Il container viene automaticamente spostato su un nodo worker diverso senza riavviarsi' },
        { en: 'The container process is throttled and runs 50% slower', it: 'Il processo container viene rallentato (throttled) ed esegue il 50% più lentamente' },
        { en: 'Kubernetes upgrades the physical RAM of the node automatically', it: 'Kubernetes aggiorna automaticamente la RAM fisica del nodo' }
      ],
      correct: 0,
      explanation: { en: 'RAM cannot be throttled. Exceeding memory limits triggers an immediate OOMKill by the OS kernel, causing the container to restart.', it: 'La RAM non può essere rallentata. Il superamento dei limiti di memoria innesca un OOMKill immediato dal kernel del sistema operativo, causando il riavvio del container.' }
    },
    {
      id: 'k8s-8-q5',
      question: { en: 'What is the main difference between a Liveness Probe and a Readiness Probe?', it: 'Qual è la differenza principale tra una Liveness Probe e una Readiness Probe?' },
      options: [
        { en: 'Liveness restarts a dead container; Readiness temporarily stops routing user traffic to an unready pod', it: 'La Liveness riavvia un container bloccato; la Readiness interrompe temporaneamente l\'invio di traffico a un pod non pronto' },
        { en: 'Liveness is only for Docker images, while Readiness is for Linux virtual machines', it: 'La Liveness è solo per immagini Docker, mentre la Readiness è per macchine virtuali Linux' },
        { en: 'Readiness deletes the Pod permanently if it fails twice', it: 'La Readiness elimina il Pod permanentemente se fallisce due volte' },
        { en: 'Liveness checks network ports, while Readiness checks etcd database records', it: 'La Liveness controlla le porte di rete, mentre la Readiness controlla i record del database etcd' }
      ],
      correct: 0,
      explanation: { en: 'LivenessProbe kills and restarts non-responsive containers. ReadinessProbe prevents bad user experience by detaching unready pods from Service endpoints until they recover.', it: 'La LivenessProbe uccide e riavvia i container non reattivi. La ReadinessProbe evita errori agli utenti staccando i pod non pronti dagli endpoint del Service finché non si riprendono.' }
    }
  ]
}
