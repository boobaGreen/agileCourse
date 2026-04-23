import type { Module } from '../../types'

export const k8s9: Module = {
  id: 'k8s-9',
  track: 'k8s',
  order: 9,
  title: { en: 'Final K8s Challenge', it: 'Sfida Finale K8s' },
  subtitle: { en: 'The Helm Master Certification', it: 'La Certificazione Helm Master' },
  emoji: '🥇',
  duration: '25 min',
  xpReward: 250,
  sections: [
    {
      type: 'intro',
      content: { en: 'So you think you understand the orchestrator? Prove it. In this final challenge, you must use **Helm**, the Kubernetes package manager, to deploy a complete stack.', it: 'Quindi pensi di aver capito l\'orchestratore? Dimostralo. In questa sfida finale, dovrai usare **Helm**, il package manager di Kubernetes, per distribuire uno stack completo.' }
    },
    {
      type: 'game',
      title: { en: 'Certification Lab: The Helm Master', it: 'Lab di Certificazione: Il Maestro di Helm' },
      content: { en: 'Install the "enterprise-stack" chart using Helm. It will provision everything: Redis, the backend, and secrets.', it: 'Installa l\'helm chart "enterprise-stack". Configurerà tutto: Redis, il backend e i secret.' },
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'prod-cluster', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: []
        },
        tasks: [
          { id: '1', instruction: { en: 'Install the chart: `helm install enterprise-stack ./my-chart`', it: 'Installa il chart: `helm install enterprise-stack ./my-chart`' }, condition: 'PODS_RUNNING:3' },
          { id: '2', instruction: { en: 'Verify the release is running: `kubectl get pods`', it: 'Verifica che la release sia in esecuzione: `kubectl get pods`' }, condition: 'PODS_RUNNING:3' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-9-q1',
      question: { en: 'Which component physically resides on the Worker Nodes (not the Control Plane)?', it: 'Quale componente risiede fisicamente sui Worker Node (non nel Control Plane)?' },
      options: ['etcd database', 'Kubelet', 'Kube-apiserver', 'Controller Manager'],
      correct: 1,
      explanation: { en: 'Kubelet is the local agent on every worker node that reports back to the master.', it: 'Il Kubelet è l\'agente locale su ogni nodo worker che comunica con il master.' }
    },
    {
      id: 'k8s-9-q2',
      question: { en: 'Under normal K8s best practices, how should you scale a web application from 1 to 5 instances?', it: 'Secondo le best practice di K8s, come dovresti scalare un\'applicazione web da 1 a 5 istanze?' },
      options: [
        { en: 'Run the imperative command `kubectl run web --replicas=5` directly', it: 'Eseguire direttamente il comando imperativo `kubectl run web --replicas=5`' },
        { en: 'Deploy 5 separate individual Pod YAML manifests to the current cluster', it: 'Distribuire 5 manifest YAML di Pod individuali separati nel cluster' },
        { en: 'Update the `replicas` count in the Deployment YAML and apply it', it: 'Aggiornare il conteggio delle `replicas` nel YAML del Deployment e applicarlo' },
        { en: 'Manually provision exactly 4 more worker nodes to handle the load', it: 'Configurare manualmente esattamente 4 nodi worker in più per gestire il carico' }
      ],
      correct: 2,
      explanation: { en: 'Kubernetes relies on declarative Deployments. Altering the `replicas` field in the file and reapplying it is the standard GitOps way.', it: 'Kubernetes si basa sui Deployment dichiarativi. Modificare il campo `replicas` nel file e riapplicarlo è il modo standard in ambito GitOps.' }
    },
    {
      id: 'k8s-9-q3',
      question: { en: 'You type `kubectl get pods` and see a pod\'s status is `ImagePullBackOff`. What is the most likely cause?', it: 'Digiti `kubectl get pods` e vedi che lo stato di un pod è `ImagePullBackOff`. Qual è la causa più probabile?' },
      options: [
        { en: 'The application script crashed with a severe internal stack trace error', it: 'Lo script dell\'applicazione è crashato con un grave errore di stack trace interno' },
        { en: 'Kubernetes could not download the container image from the registry', it: 'Kubernetes non è riuscito a scaricare l\'immagine del container dal registro' },
        { en: 'The cluster has completely ran out of available CPU or RAM resources', it: 'Il cluster ha esaurito completamente le risorse CPU o RAM disponibili' },
        { en: 'The Kubernetes API server is currently offline and unreachable by nodes', it: 'L\'API server di Kubernetes è attualmente offline e irraggiungibile dai nodi' }
      ],
      correct: 1,
      explanation: { en: '`ImagePullBackOff` explicitly means the Container Runtime failed to pull the image from the registry (Hub/ECR). The pod hasn\'t even started executing code yet.', it: '`ImagePullBackOff` significa esplicitamente che il Runtime del Container non è riuscito a scaricare l\'immagine dal registro (Hub/ECR). Il pod non ha ancora iniziato a eseguire il codice.' }
    },
    {
      id: 'k8s-9-q4',
      question: { en: 'True or False: A ClusterIP Service allows public internet users to access your frontend Pods.', it: 'Vero o Falso: un Service ClusterIP consente agli utenti di internet pubblico di accedere ai tuoi Pod frontend.' },
      options: [{ en: 'True (Public Access)', it: 'Vero (Accesso Pubblico)' }, { en: 'False (Internal Only)', it: 'Falso (Solo Interno)' }],
      correct: 1,
      explanation: { en: 'False. ClusterIP is strictly for internal cluster-only communication.', it: 'Falso. ClusterIP è strettamente per la comunicazione interna al cluster.' }
    },
    {
      id: 'k8s-9-q5',
      question: { en: 'What is the function of an Ingress Resource?', it: 'Qual è la funzione di una risorsa Ingress?' },
      options: [
        { en: 'It deletes old containers and ephemeral filesystem layers automatically', it: 'Elimina automaticamente i vecchi container e i layer del filesystem effimeri' },
        { en: 'It encrypts Secret data using etcd and manages internal cluster networking', it: 'Cripta i dati dei Secret usando etcd e gestisce il networking interno del cluster' },
        { en: 'It acts as an intelligent URL-based load balancer for external routing', it: 'Funge da load balancer intelligente basato su URL per l\'instradamento esterno' },
        { en: 'It manages the deployment rollout process and health checks for pods', it: 'Gestisce il processo di rollout del deployment e gli health check per i pod' }
      ],
      correct: 2,
      explanation: { en: 'Ingress is a smart layer 7 router at the front of the cluster.', it: 'L\'Ingress è un router intelligente di livello 7 all\'ingresso del cluster.' }
    },
    {
      id: 'k8s-9-q6',
      question: { en: 'If a worker node catches fire and completely dies, what does a Deployment controller do?', it: 'Se un nodo worker prende fuoco e muore completamente, cosa fa un controller di Deployment?' },
      options: [
        { en: 'Nothing, it awaits manual intervention or admin commands to restore state', it: 'Nulla, attende un intervento manuale o comandi dell\'amministratore per ripristinare lo stato' },
        { en: 'It re-creates the missing Pods by scheduling them onto healthy Worker nodes', it: 'Ricrea i Pod mancanti pianificandoli su nodi Worker sani' },
        { en: 'It sends an automatic email via SendGrid to the registered cluster admin', it: 'Invia un\'email automatica tramite SendGrid all\'amministratore del cluster registrato' },
        { en: 'It shuts down the entire cluster to prevent any potential data corruption', it: 'Spegne l\'intero cluster per prevenire ogni potenziale corruzione dei dati' }
      ],
      correct: 1,
      explanation: { en: 'This is the self-healing power. The controller notices 3 active pods dropped to 1, and commands the scheduler to provision 2 new ones instantly.', it: 'Questo è il potere dell\'auto-riparazione. Il controller si accorge che i 3 pod attivi sono scesi a 1 e ordina allo scheduler di configurarne istantaneamente 2 nuovi.' }
    },
    {
      id: 'k8s-9-q7',
      question: { en: 'Regarding storage, what is the role of a PVC?', it: 'Riguardo allo storage, qual è il ruolo di un PVC?' },
      options: [
        { en: 'To format the physical hard drive on a worker node for local storage usage', it: 'Formattare il disco rigido fisico su un nodo worker per l\'uso dello storage locale' },
        { en: 'To encrypt the volume data and ensure safe communication between pods', it: 'Criptare i dati del volume e garantire una comunicazione sicura tra i pod' },
        { en: 'To act as a "request" or "claim" ticket from the developer for storage', it: 'Fungere da ticket di "richiesta" o "claim" da parte dello sviluppatore per lo storage' },
        { en: 'To define persistent environment variables for the application containers', it: 'Definire variabili d\'ambiente persistenti per i container dell\'applicazione' }
      ],
      correct: 2,
      explanation: { en: 'A Persistent Volume Claim (PVC) is the developer\'s abstract request for storage hardware.', it: 'Un Persistent Volume Claim (PVC) è la richiesta astratta dello sviluppatore per l\'hardware di storage.' }
    },
    {
      id: 'k8s-9-q8',
      question: { en: 'You type `kubectl get pods` and see a pod\'s status is `CrashLoopBackOff`. You run `kubectl logs <pod-name>`. What are you hoping to find?', it: 'Digiti `kubectl get pods` e vedi che lo stato di un pod è `CrashLoopBackOff`. Esegui `kubectl logs <pod-name>`. Cosa speri di trovare?' },
      options: [
        { en: 'Kubelet authorization and authentication failure logs from the node', it: 'Log di fallimento dell\'autorizzazione e autenticazione del Kubelet dal nodo' },
        { en: 'Node resource starvation metrics and cluster-wide performance data', it: 'Metriche di carenza di risorse del nodo e dati di performance a livello di cluster' },
        { en: 'The actual application stack trace or error output from the container crash', it: 'Lo stack trace effettivo dell\'applicazione o l\'output di errore dal crash del container' },
        { en: 'Docker image pull errors and container runtime permission issues', it: 'Errori di download dell\'immagine Docker e problemi di permessi del runtime del container' }
      ],
      correct: 2,
      explanation: { en: '`CrashLoopBackOff` means the container starts running, crashes, restarts, and crashes again. The `logs` command outputs the std-out/std-err of the app, revealing the code issue.', it: '`CrashLoopBackOff` significa che il container inizia a girare, crasha, si riavvia e crasha di nuovo. Il comando `logs` mostra lo std-out/std-err dell\'app, rivelando il problema nel codice.' }
    },
    {
      id: 'k8s-9-q9',
      question: { en: 'Where is the safest and most proper place to store a third-party API Access Token for your application in K8s?', it: 'Qual è il posto più sicuro e appropriato per memorizzare un Token di accesso API di terze parti per la tua applicazione in K8s?' },
      options: [
        { en: 'Hardcoded directly into the Docker Image layers', it: 'Inserito direttamente nei layer dell\'immagine Docker' },
        { en: 'As a standard plain-text Kubernetes ConfigMap', it: 'Come una normale ConfigMap Kubernetes in chiaro' },
        { en: 'As a secure and encrypted Kubernetes Secret', it: 'Come un Secret Kubernetes sicuro e criptato' },
        { en: 'Inside the Deployment YAML manifest as plaintext', it: 'All\'interno del manifest YAML del Deployment in chiaro' }
      ],
      correct: 2,
      explanation: { en: 'You must use a K8s Secret. While it\'s technically similar to a ConfigMap, Secrets are mounted securely into RAM (tmpfs) on worker nodes to prevent them from landing on physical disk drives.', it: 'Devi usare un Secret di K8s. Anche se è tecnicamente simile a una ConfigMap, i Secret vengono montati in modo sicuro nella RAM (tmpfs) sui nodi worker per evitare che finiscano sui dischi rigidi fisici.' }
    },
    {
      id: 'k8s-9-q10',
      question: { en: 'What happens to the data inside a container\'s default writable filesystem when a naked Pod is deleted?', it: 'Cosa succede ai dati all\'interno del filesystem scrivibile predefinito di un container quando un Pod nudo viene eliminato?' },
      options: [
        { en: 'It is automatically backed up to the etcd database state', it: 'Viene eseguito automaticamente il backup nello stato del database etcd' },
        { en: 'It is completely and irreversibly destroyed along with the Pod instance', it: 'Viene distrutto completamente e irreversibilmente insieme all\'istanza del Pod' },
        { en: 'It transfers instantly and transparently to the new replacement Pod', it: 'Si trasferisce istantaneamente e in modo trasparente al nuovo Pod sostitutivo' },
        { en: 'It is converted to a Persistent Volume (PV) automatically by the cluster', it: 'Viene convertito automaticamente in un Persistent Volume (PV) dal cluster' }
      ],
      correct: 1,
      explanation: { en: 'Without mounted Volumes, ALL data inside a container/pod is totally completely ephemeral.', it: 'Senza volumi montati, TUTTI i dati all\'interno di un container/pod sono totalmente ed esclusivamente effimeri.' }
    }
  ]
}
