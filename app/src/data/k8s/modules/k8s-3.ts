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
      title: { en: '🛠️ Essential kubectl Commands', it: '🛠️ Comandi kubectl essenziali' },
      content: { en: 'Memorize these, you will use them thousands of times.', it: 'Memorizzali, li userai migliaia di volte.' },
      tableData: {
        headers: [{ en: 'Command', it: 'Comando' }, { en: 'Purpose', it: 'Scopo' }],
        rows: [
          ['`kubectl get pods`', { en: 'List all pods in the current namespace', it: 'Elenca tutti i pod nel namespace corrente' }],
          ['`kubectl describe pod [name]`', { en: 'Show incredibly detailed info and events (vital for debugging)', it: 'Mostra informazioni e eventi incredibilmente dettagliati (vitale per il debugging)' }],
          ['`kubectl logs [name]`', { en: 'View the internal console logs of the containers in the pod', it: 'Visualizza i log della console interna dei container nel pod' }],
          ['`kubectl apply -f [file.yml]`', { en: 'Create or update resources from a YAML definition file', it: 'Crea o aggiorna risorse da un file di definizione YAML' }],
          ['`kubectl delete pod [name]`', { en: 'Destroy a pod (It will likely be immediately recreated!)', it: 'Distruggi un pod (probabilmente verrà ricreato immediatamente!)' }]
        ]
      }
    },
    {
      type: 'game',
      title: { en: 'Lab: Orchestrating an App', it: 'Lab: Orchestrazione di un\'app' },
      content: { en: 'Let\'s deploy a real structure. In this lab, your `kubectl` commands will live-update the cluster topology above.', it: 'Distribuiamo una struttura reale. In questo lab, i tuoi comandi `kubectl` aggiorneranno dal vivo la topologia del cluster qui sopra.' },
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'minikube-worker', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: []
        },
        tasks: [
          { id: '1', instruction: { en: 'Apply the deployment manifest: `kubectl apply -f nginx-deployment.yaml`', it: 'Applica il manifest di deployment: `kubectl apply -f nginx-deployment.yaml`' }, condition: 'DEPLOYMENT_EXISTS:nginx' },
          { id: '2', instruction: { en: 'Expose the deployment with a service: `kubectl apply -f nginx-service.yaml`', it: 'Esponi il deployment con un servizio: `kubectl apply -f nginx-service.yaml`' }, condition: 'SERVICE_EXISTS:nginx-svc' },
          { id: '3', instruction: { en: 'Scale the deployment to 3 replicas: `kubectl scale deployment/nginx --replicas=3`', it: 'Scala il deployment a 3 repliche: `kubectl scale deployment/nginx --replicas=3`' }, condition: 'REPLICAS:nginx:3' },
          { id: '4', instruction: { en: 'Verify you have at least 3 pods running: `kubectl get pods`', it: 'Verifica di avere almeno 3 pod in esecuzione: `kubectl get pods`' }, condition: 'PODS_RUNNING:3' }
        ]
      }
    },
    {
      type: 'tip',
      title: { en: '💡 Wait, why did it come back?', it: '💡 Aspetta, perché è tornato?' },
      content: { en: 'Pods are mortal. When you deleted the Pod, Kubernetes immediately created a BRAND NEW one (`z9rtc`) to replace it. This is because Pods are managed by higher-level controllers (like Deployments) which enforce a desired state. Never make naked Pods!', it: 'I Pod sono mortali. Quando hai eliminato il Pod, Kubernetes ne ha creato immediatamente uno NUOVO DI ZECCA (`z9rtc`) per sostituirlo. Questo perché i Pod sono gestiti da controller di livello superiore (come i Deployment) che impongono uno stato desiderato. Mai creare Pod nudi!' }
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
    }
  ]
}
