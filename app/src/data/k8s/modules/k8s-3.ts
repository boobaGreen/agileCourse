import type { Module } from '../../types'

export const k8s3: Module = {
  id: 'k8s-3',
  track: 'k8s',
  order: 3,
  title: { en: 'Pods & kubectl', it: 'Pod e kubectl' },
  subtitle: { en: 'The smallest atomic unit', it: 'La più piccola unità atomica' },
  emoji: '🫛',
  duration: '20 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: { en: 'In Docker, the smallest unit is a Container. In Kubernetes, the smallest unit is a **Pod**. Kubernetes does not run individual containers; it runs Pods, which are wrappers that *contain* one or more containers.', it: 'In Docker, l\'unità più piccola è un Container. In Kubernetes, l\'unità più piccola è un **Pod**. Kubernetes non esegue singoli container; esegue Pod, che sono wrapper che *contengono* uno o più container.' }
    },
    {
      type: 'concept',
      title: { en: '🫛 Why Pods instead of Containers?', it: '🫛 Perché i Pod invece dei Container?' },
      content: { en: 'Why add a wrapper layer? Because sometimes, containers are forcefully coupled. \n\nImagine a Web Server container and a Logging container. By putting them in the **same Pod**, they are guaranteed to run on the exact same physical machine, share the same IP address, and share the same internal localhost network.', it: 'Perché aggiungere un livello di wrapper? Perché a volte i container sono strettamente accoppiati. \n\nImmagina un container Web Server e un container di Logging. Mettendoli nello **stesso Pod**, hai la garanzia che girino sulla stessa identica macchina fisica, condividano lo stesso indirizzo IP e la stessa rete interna localhost.' }
    },
    {
      type: 'flowchart',
      content: { en: '**The Pod Wrapper Structure**', it: '**La struttura del wrapper Pod**' },
      diagramSteps: [
        { label: { en: 'Node (Server)', it: 'Nodo (Server)' }, icon: '🖥️', color: '#118ab2' },
        { label: { en: 'Pod Environment\n(Shared IP)', it: 'Ambiente Pod\n(IP condiviso)' }, icon: '🫛', color: '#06d6a0' },
        { label: { en: 'Container 1\n(App)', it: 'Container 1\n(App)' }, icon: '📦', color: '#ffd166' },
        { label: { en: 'Container 2\n(Logger)', it: 'Container 2\n(Logger)' }, icon: '📦', color: '#ffd166' }
      ]
    },
    {
      type: 'concept',
      title: { en: '⌨️ The kubectl CLI', it: '⌨️ La CLI kubectl' },
      content: { en: '`kubectl` (pronounced "kube-control" or "kube-cuddle") is the command line tool used to communicate with the API Server. It is the absolute daily-driver for a DevOps engineer.', it: '`kubectl` (pronunciato "kube-control" o "kube-cuddle") è lo strumento a riga di comando usato per comunicare con l\'API Server. È lo strumento quotidiano indispensabile per un ingegnere DevOps.' }
    },
    {
      type: 'table',
      title: { en: '🛠️ Essential kubectl Commands & Real Examples', it: '🛠️ Comandi kubectl essenziali ed Esempi Pratici' },
      content: { en: 'Memorize these core syntax patterns and real-world usage examples. You will use them thousands of times.', it: 'Memorizza questi pattern di sintassi ed esempi pratici di utilizzo reale. Li userai migliaia di volte.' },
      tableData: {
        headers: [{ en: 'Syntax Pattern', it: 'Sintassi Base' }, { en: 'Real Example', it: 'Esempio Pratico Reale' }, { en: 'Purpose', it: 'Scopo' }],
        rows: [
          ['`kubectl get pods`', '`kubectl get pods`', { en: 'List all active pods in the current namespace with status and IP', it: 'Elenca tutti i pod attivi nel namespace corrente con stato e IP' }],
          ['`kubectl describe pod [name]`', '`kubectl describe pod auth-service-7f9`', { en: 'Show detailed specs, IP, container images, and lifecycle events (vital for debugging)', it: 'Mostra specifiche dettagliate, immagini container ed eventi di ciclo di vita (vitale per il debugging)' }],
          ['`kubectl logs [name]`', '`kubectl logs auth-service-7f9`', { en: 'View internal console stdout/stderr logs of the pod containers', it: 'Visualizza i log di console stdout/stderr generati dai container nel pod' }],
          ['`kubectl apply -f [file.yaml]`', '`kubectl apply -f payment-api-deployment.yaml`', { en: 'Create or update resources specified inside a YAML manifest file', it: 'Crea o aggiorna le risorse definite all\'interno di un manifesto YAML' }],
          ['`kubectl scale deployment/[name] --replicas=[N]`', '`kubectl scale deployment/payment-api --replicas=3`', { en: 'Dynamically scale the number of running pod instances for a deployment', it: 'Scala dinamicamente il numero di istanze pod in esecuzione per un deployment' }],
          ['`kubectl delete pod [name]`', '`kubectl delete pod payment-api-89fbc`', { en: 'Destroy a pod (If managed by a Deployment, it is automatically recreated!)', it: 'Elimina un pod (se gestito da un Deployment, verrà ricreato automaticamente!)' }]
        ]
      }
    },
    {
      type: 'game',
      title: { en: 'Lab: Orchestrating the Payment Microservice', it: 'Lab: Orchestrazione del Microservizio Payment-API' },
      content: { en: 'Apply the command patterns from the examples above to orchestrate the production `payment-api` microservice in real time.', it: 'Applica i pattern dei comandi mostrati negli esempi per orchestrare il microservizio `payment-api` in tempo reale.' },
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'minikube-worker', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: []
        },
        tasks: [
          {
            id: '1',
            instruction: { en: 'Deploy the payment microservice manifest using `payment-api-deployment.yaml`', it: 'Distribuisci il manifest del microservizio payment usando `payment-api-deployment.yaml`' },
            condition: 'DEPLOYMENT_EXISTS:payment-api',
            hints: [
              { en: 'Use the `kubectl apply -f` command specifying the deployment manifest file.', it: 'Usa il comando `kubectl apply -f` specificando il file manifesto del deployment.' },
              { en: 'The file in the current directory is named `payment-api-deployment.yaml`.', it: 'Il file presente nella cartella corrente si chiama `payment-api-deployment.yaml`.' },
              { en: 'Run: `kubectl apply -f payment-api-deployment.yaml`', it: 'Esegui: `kubectl apply -f payment-api-deployment.yaml`' }
            ]
          },
          {
            id: '2',
            instruction: { en: 'Expose the payment service to the network using `payment-api-service.yaml`', it: 'Esponi il servizio payment in rete usando `payment-api-service.yaml`' },
            condition: 'SERVICE_EXISTS:payment-api-svc',
            hints: [
              { en: 'Apply the network service manifest using `kubectl apply -f`.', it: 'Applica il manifesto del servizio di rete usando `kubectl apply -f`.' },
              { en: 'The service file in the directory is named `payment-api-service.yaml`.', it: 'Il file del servizio nella cartella si chiama `payment-api-service.yaml`.' },
              { en: 'Run: `kubectl apply -f payment-api-service.yaml`', it: 'Esegui: `kubectl apply -f payment-api-service.yaml`' }
            ]
          },
          {
            id: '3',
            instruction: { en: 'Scale the `payment-api` deployment to 3 replicas to handle load', it: 'Scala il deployment `payment-api` a 3 repliche per gestire il carico' },
            condition: 'REPLICAS:payment-api:3',
            hints: [
              { en: 'Use the `kubectl scale` command to change replica counts dynamically.', it: 'Usa il comando `kubectl scale` per modificare dinamicamente il numero di repliche.' },
              { en: 'Specify `deployment/payment-api` with the `--replicas=3` flag.', it: 'Specifica `deployment/payment-api` con il flag `--replicas=3`.' },
              { en: 'Run: `kubectl scale deployment/payment-api --replicas=3`', it: 'Esegui: `kubectl scale deployment/payment-api --replicas=3`' }
            ]
          },
          {
            id: '4',
            instruction: { en: 'Verify that 3 replicas are running in the cluster', it: 'Verifica che ci siano 3 pod attivi nel cluster' },
            condition: 'CMD_RAN:get pod',
            hints: [
              { en: 'Use `kubectl get` to list all running workloads in the cluster.', it: 'Usa `kubectl get` per elencare tutti i carichi di lavoro in esecuzione nel cluster.' },
              { en: 'Specify `pods` as the resource type.', it: 'Specifica `pods` come tipo di risorsa.' },
              { en: 'Run: `kubectl get pods`', it: 'Esegui: `kubectl get pods`' }
            ]
          }
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '💡 The Magic of Kubernetes: Desired State & Self-Healing', it: '💡 Il Segreto di Kubernetes: Stato Desiderato & Auto-Riparazione' },
      content: {
        en: 'Why do we deploy applications using Deployments instead of creating individual Pods directly?\n\n' +
            '• **Mortal Pods**: Individual ("naked") Pods have no protection. If a server crashes or a Pod fails, it is lost forever.\n' +
            '• **The Deployment Controller**: When you apply a Deployment (like `payment-api`) with 3 replicas, you define a **Desired State**.\n' +
            '• **Automatic Self-Healing**: If a Pod dies (or if you manually delete one using `kubectl delete pod`), the Control Plane immediately detects the gap and creates a BRAND NEW replacement Pod automatically to guarantee your target count of 3!',
        it: 'Perché distribuiamo le applicazioni usando i **Deployment** invece di creare singoli Pod a mano?\n\n' +
            '• **Pod Mortali**: I singoli Pod "nudi" creati manualmente non hanno protezione. Se il server si spegne o il container va in crash, quel Pod è perso per sempre.\n' +
            '• **Il Ruolo del Deployment**: Quando crei un Deployment (come `payment-api`) e imposti 3 repliche, dichiari uno **Stato Desiderato** (Desired State).\n' +
            '• **Auto-Riparazione Automatica**: Se un Pod si rompe (o se provi ad eliminarne uno con `kubectl delete pod`), il Control Plane lo rileva in pochi millisecondi e **crea automaticamente un Pod nuovo di zecca** per mantenere la quota di 3!'
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-3-q1',
      question: { en: 'What is true about containers inside the exact same Pod?', it: 'Cosa è vero riguardo ai container all\'interno dello stesso identico Pod?' },
      options: [
        { en: 'They must be written in the same programming language', it: 'Devono essere scritti nello stesso linguaggio di programmazione' },
        { en: 'They share the exact same localhost network space and IP address', it: 'Condividono lo stesso identico spazio di rete localhost e indirizzo IP' },
        { en: 'They are automatically protected against infinite loops', it: 'Sono protetti automaticamente contro i cicli infiniti' },
        { en: 'They cannot communicate with each other', it: 'Non possono comunicare tra loro' }
      ],
      correct: 1,
      explanation: { en: 'Containers in the same pod share networking and storage. If Container A runs an app on port 8080, Container B can reach it simply by pinging `localhost:8080`.', it: 'I container nello stesso pod condividono rete e archiviazione. Se il Container A esegue un\'app sulla porta 8080, il Container B può raggiungerlo semplicemente contattando `localhost:8080`.' }
    },
    {
      id: 'k8s-3-q2',
      question: { en: 'Which tool is the primary way human administrators give commands to the Kubernetes API server?', it: 'Quale strumento è il modo principale in cui gli amministratori umani danno comandi al server API di Kubernetes?' },
      options: ['docker-compose', 'kubelet', 'kubectl', 'k8s-admin'],
      correct: 2,
      explanation: { en: '`kubectl` translates human commands like `get pods` into secure REST API HTTP requests aimed at the cluster\'s Control Plane.', it: '`kubectl` traduce i comandi umani come `get pods` in richieste HTTP REST API sicure rivolte al Control Plane del cluster.' }
    },
    {
      id: 'k8s-3-q3',
      question: { en: 'What happens if a Pod that is managed by a Deployment with 3 replicas fails or is manually deleted?', it: 'Cosa succede se un Pod gestito da un Deployment con 3 repliche fallisce o viene eliminato manualmente?' },
      options: [
        { en: 'The entire deployment is immediately destroyed to avoid data corruption', it: 'L\'intero deployment viene immediatamente distrutto per evitare corruzioni di dati' },
        { en: 'The cluster stays at 2 replicas until a developer manually runs a deploy command', it: 'Il cluster rimane a 2 repliche finché uno sviluppatore non esegue manualmente un comando di deploy' },
        { en: 'The Control Plane detects the gap from the Desired State and automatically creates a replacement Pod (Self-healing)', it: 'Il Control Plane rileva la discrepanza dallo Stato Desiderato e crea automaticamente un Pod sostitutivo (Auto-riparazione)' },
        { en: 'The developer CLI workstation is locked in read-only mode', it: 'La postazione CLI dello sviluppatore viene bloccata in modalità sola lettura' }
      ],
      correct: 2,
      explanation: { en: 'In Kubernetes, Deployments enforce a Desired State. If a pod dies, the Controller Manager detects the mismatch and immediately launches a new pod to maintain the target count of 3.', it: 'In Kubernetes, i Deployment impongono uno Stato Desiderato. Se un pod muore, il Controller Manager rileva la discrepanza e avvia immediatamente un nuovo pod per mantenere la quota di 3.' }
    }
  ]
}
