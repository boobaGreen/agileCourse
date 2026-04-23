import type { Module } from '../../types'

export const k8s5: Module = {
  id: 'k8s-5',
  track: 'k8s',
  order: 5,
  title: { en: 'Services & Networking', it: 'Service e Networking' },
  subtitle: { en: 'Connecting the dots', it: 'Unire i punti' },
  emoji: '🌐',
  duration: '25 min',
  xpReward: 150,
  sections: [
    {
      type: 'intro',
      content: { en: 'Pods are mortal. They die, they restart, and when they do, **they get a new IP address**. If your Frontend talks to your Backend via an IP address, your app breaks the moment a pod restarts. We need a stable identifier. We need a **Service**.', it: 'I Pod sono mortali. Muoiono, si riavviano e, quando lo fanno, **ricevono un nuovo indirizzo IP**. Se il tuo Frontend parla con il tuo Backend tramite un indirizzo IP, la tua app si rompe nel momento in cui un pod si riavvia. Abbiamo bisogno di un identificatore stabile. Abbiamo bisogno di un **Service**.' }
    },
    {
      type: 'concept',
      title: { en: '🌉 What is a Service?', it: '🌉 Cos\'è un Service?' },
      content: { en: 'A Service creates a static, permanent IP address and a DNS name (e.g., `backend-service`) that NEVER changes. \n\nWhen traffic hits the Service, the Service acts as a load balancer, instantly forwarding the request to one of the healthy backend Pods.', it: 'Un Service crea un indirizzo IP statico e permanente e un nome DNS (es. `backend-service`) che NON cambia mai. \n\nQuando il traffico raggiunge il Service, questo agisce come un load balancer, inoltrando istantaneamente la richiesta a uno dei Pod backend sani.' }
    },
    {
      type: 'flowchart',
      content: { en: '**The Service Load Balancer**', it: '**Il Load Balancer del Service**' },
      diagramSteps: [
        { label: { en: 'Frontend Pod\n(Makes Request)', it: 'Pod Frontend\n(Effettua richiesta)' }, icon: '📱', color: '#118ab2' },
        { label: { en: 'Backend Service\n(Stable static IP)', it: 'Service Backend\n(IP statico stabile)' }, icon: '🚦', color: '#ffb703' },
        { label: { en: 'Any Healthy Pod\n(Dynamic IP)', it: 'Qualsiasi Pod sano\n(IP dinamico)' }, icon: '🫛', color: '#06d6a0' }
      ]
    },
    {
      type: 'video',
      title: { en: '📺 Services vs Ingress', it: '📺 Service vs Ingress' },
      content: { en: 'A great visual comparison of how traffic flows internally vs from the public internet.', it: 'Un ottimo confronto visivo di come il traffico fluisce internamente rispetto a quello proveniente da internet pubblico.' },
      videoUrl: 'https://www.youtube.com/watch?v=T4Z7visMM4E'
    },
    {
      type: 'table',
      title: { en: '🌍 Types of Services', it: '🌍 Tipi di Service' },
      content: { en: 'Depending on who needs to make the connection:', it: 'A seconda di chi deve effettuare la connessione:' },
      tableData: {
        headers: [{ en: 'Service Type', it: 'Tipo di Service' }, { en: 'Who can access it?', it: 'Chi può accedervi?' }, { en: 'Use case', it: 'Caso d\'uso' }],
        rows: [
          [{ en: '**ClusterIP** (Default)', it: '**ClusterIP** (Predefinito)' }, { en: 'ONLY other pods inside the cluster.', it: 'SOLO altri pod all\'interno del cluster.' }, { en: 'Your Database Service. High security.', it: 'Il tuo servizio database. Alta sicurezza.' }],
          [{ en: '**NodePort**', it: '**NodePort**' }, { en: 'External traffic, but using a weird port (30000+).', it: 'Traffico esterno, ma usando una porta strana (30000+).' }, { en: 'Quick dev tests. Unprofessional for prod.', it: 'Test veloci in sviluppo. Poco professionale per la produzione.' }],
          [{ en: '**LoadBalancer**', it: '**LoadBalancer**' }, { en: 'The entire open internet.', it: 'Tutto internet pubblico.' }, { en: 'Spins up an expensive AWS/Azure Load Balancer.', it: 'Avvia un costoso Load Balancer AWS/Azure.' }]
        ]
      }
    },
    {
      type: 'concept',
      title: { en: '🚪 Enter the Ingress', it: '🚪 Entra l\'Ingress' },
      content: { en: 'A `LoadBalancer` service is expensive. If you have 5 web apps, you don\'t want to pay for 5 AWS Load Balancers. \n\nInstead, you deploy ONE **Ingress Controller**. It is a smart router (like Nginx) that sits at the front door. It looks at the URL requested (e.g. `myapp.com/api`) and routes the traffic to the correct internal ClusterIP service.', it: 'Un servizio `LoadBalancer` è costoso. Se hai 5 app web, non vuoi pagare per 5 Load Balancer AWS. \n\nInvece, distribuisci UN SOLO **Ingress Controller**. È un router intelligente (come Nginx) che sta alla porta d\'ingresso. Controlla l\'URL richiesto (es. `myapp.com/api`) e instrada il traffico al corretto servizio ClusterIP interno.' }
    },
    {
      type: 'game',
      title: { en: 'Lab: The Front Door', it: 'Lab: La porta d\'ingresso' },
      content: { en: 'Expose your application to the network. Watch the LoadBalancer provision an IP and route traffic to your pods.', it: 'Esponi la tua applicazione alla rete. Guarda il LoadBalancer fornire un IP e instradare il traffico ai tuoi pod.' },
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'worker-minikube', status: 'Ready' }],
          pods: [
            { id: 'web-1', name: 'web-7bb9x', node: 'node-1', status: 'Running', labels: { app: 'web' } },
            { id: 'web-2', name: 'web-2ab4c', node: 'node-1', status: 'Running', labels: { app: 'web' } }
          ],
          services: [],
          deployments: [
            { id: 'dep-web', name: 'web-deployment', replicas: 2, selector: { app: 'web' } }
          ]
        },
        tasks: [
          { id: '1', instruction: { en: 'Expose the web deployment as a LoadBalancer service: `kubectl expose deployment web-deployment --type=LoadBalancer --port=80`', it: 'Esponi il deployment web come servizio LoadBalancer: `kubectl expose deployment web-deployment --type=LoadBalancer --port=80`' }, condition: 'SERVICE_EXISTS:web-deployment' },
          { id: '2', instruction: { en: 'Check the assigned IP for your new service: `kubectl get service`', it: 'Controlla l\'IP assegnato per il tuo nuovo servizio: `kubectl get service`' }, condition: 'PODS_RUNNING:2' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-5-q1',
      question: { en: 'Why should you NOT hardcode the IP address of a Pod into your application configuration?', it: 'Perché NON dovresti inserire l\'indirizzo IP di un Pod direttamente nella configurazione della tua applicazione?' },
      options: [
        { en: 'Pods do not have IP addresses', it: 'I Pod non hanno indirizzi IP' },
        { en: 'Because K8s IP addresses are only 4 digits long', it: 'Perché gli indirizzi IP di K8s sono lunghi solo 4 cifre' },
        { en: 'Because Pods are ephemeral; when a pod is destroyed and recreated (which is frequent), its new replica will receive a totally different IP address.', it: 'Perché i Pod sono effimeri; quando un pod viene distrutto e ricreato (il che è frequente), la sua nuova replica riceverà un indirizzo IP totalmente diverso.' },
        { en: 'IP addresses cost money inside the cluster', it: 'Gli indirizzi IP costano denaro all\'interno del cluster' }
      ],
      correct: 2,
      explanation: { en: 'K8s networking assumes constant death and rebirth. You MUST use a `Service` to abstract away the dynamic Pod IPs into a single, permanent DNS hostname.', it: 'Il networking di K8s presuppone morte e rinascita costante. DEVI usare un `Service` per astrarre gli IP dinamici dei Pod in un unico nome host DNS permanente.' }
    },
    {
      id: 'k8s-5-q2',
      question: { en: 'You have a backend NodeJS API pod, and a PostgreSQL database pod. Which Service type should you place in front of the PostgreSQL pod to ensure maximum security?', it: 'Hai un pod API NodeJS backend e un pod database PostgreSQL. Quale tipo di Service dovresti mettere davanti al pod PostgreSQL per garantire la massima sicurezza?' },
      options: [
        'LoadBalancer',
        'Ingress',
        'NodePort',
        'ClusterIP'
      ],
      correct: 3,
      explanation: { en: '`ClusterIP` completely blocks external internet traffic. Only other pods INSIDE the cluster can reach the database. This is the gold standard for backend resource security.', it: '`ClusterIP` blocca completamente il traffico internet esterno. Solo gli altri pod ALL\'INTERNO del cluster possono raggiungere il database. Questo è lo standard di riferimento per la sicurezza delle risorse backend.' }
    }
  ]
}
