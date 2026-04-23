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
      title: { en: '📺 Imperative vs Declarative', it: '📺 Imperativo vs Dichiarativo' },
      content: { en: 'Understand why Kubernetes uses a Declarative system instead of a list of bash scripts.', it: 'Capisci perché Kubernetes usa un sistema Dichiarativo invece di una lista di script bash.' },
      videoUrl: 'https://www.youtube.com/watch?v=pPQKAR1pA9U'
    },
    {
      type: 'concept',
      title: { en: '📄 The Deployment YAML', it: '📄 Il YAML del Deployment' },
      content: { en: 'A Deployment is a YAML file where you say: \n\n"I want a Deployment named *my-app*. I want exactly *3 replicas* (Pods). Use the container image *node:18*."\n\nKubernetes constantly reads this file. If it sees only 2 Pods running, it spins up a 3rd. If it sees 4, it assassinates 1. It is a tireless robot enforcing your will.', it: 'Un Deployment è un file YAML dove dici: \n\n"Voglio un Deployment chiamato *my-app*. Voglio esattamente *3 repliche* (Pod). Usa l\'immagine container *node:18*."\n\nKubernetes legge costantemente questo file. Se vede solo 2 Pod in esecuzione, ne avvia un terzo. Se ne vede 4, ne elimina 1. È un robot instancabile che impone la tua volontà.' }
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
          { id: '1', instruction: { en: 'Apply the web deployment manifest: `kubectl apply -f web.yml`', it: 'Applica il manifest di deployment web: `kubectl apply -f web.yml`' }, condition: 'DEPLOYMENT_EXISTS:web-deployment' },
          { id: '2', instruction: { en: 'Delete one of the pods (get the name first with `kubectl get pods`)', it: 'Elimina uno dei pod (prendi prima il nome con `kubectl get pods`)' }, condition: 'PODS_RUNNING:3' },
          { id: '3', instruction: { en: 'Scale the deployment to 6 replicas: `kubectl scale deployment/web-deployment --replicas=6`', it: 'Scala il deployment a 6 repliche: `kubectl scale deployment/web-deployment --replicas=6`' }, condition: 'REPLICAS:web-deployment:6' }
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
    }
  ]
}
