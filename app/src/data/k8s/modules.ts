import type { Module } from '../git/modules'

export const K8S_MODULES: Module[] = [
  {
    id: 'k8s-1',
    track: 'k8s',
    order: 1,
    title: 'What is Kubernetes?',
    subtitle: 'The Captain of the Container Fleet',
    emoji: '☸️',
    duration: '10 min',
    xpReward: 50,
    funFact: 'The name comes from the Greek word "kybernitis", meaning helmsman or pilot. It is the root of the word "cybernetics".',
    sections: [
      {
        type: 'concept',
        title: '🚢 What is Kubernetes?',
        content: 'Kubernetes (often abbreviated as "K8s") is an open-source system for automating deployment, scaling, and management of containerized applications.\n\nOriginally designed by Google and now maintained by the Cloud Native Computing Foundation, it acts as the "operating system" for your cloud infrastructure.'
      },
      {
        type: 'concept',
        title: '🐳 Why not just use Docker?',
        content: 'Docker is great for running a single container on a single machine. But what happens when you have 100 containers spreading across 10 servers?\n\n- How do they talk to each other?\n- What if a server crashes?\n- How do you update them without downtime?\n\n**Docker builds the containers; Kubernetes orchestrates them.**'
      },
      {
        type: 'video',
        title: '🎬 Recommended: What is Kubernetes?',
        content: 'Observe this clear visual explanation of why K8s was born and how it changed the industry.',
        videoUrl: 'https://www.youtube.com/watch?v=PH-2FfFD2PU'
      },
      {
        type: 'game',
        title: 'Challenge: Scaling the Fleet',
        content: 'In Kubernetes, we don\'t manage individual pods. We manage the "Desired State". Put these scaling operations in the correct order.',
        gameType: 'drag-order',
        gameData: [
          { id: '1', label: 'Define 3 replicas in YAML' },
          { id: '2', label: 'Submit to API Server (kubectl apply)' },
          { id: '3', label: 'Scheduler finds available Nodes' },
          { id: '4', label: 'Kubelet starts 3 containers' }
        ]
      },
      {
        type: 'tip',
        title: '💡 Key Takeaway',
        content: 'Kubernetes does not build your containers (Docker does that). Kubernetes **orchestrates** them: it decides where to run them, how many of them to run, and how they should talk to each other.'
      }
    ],
    quiz: [
      {
        id: 'k8s-1-q1',
        question: 'What does "Kubernetes" mean in Greek?',
        options: [
          'Master of Machines',
          'Helmsman or Pilot',
          'Cloud Architect',
          'Digital Ship'
        ],
        correct: 1,
        explanation: 'Kybernitis means helmsman. Just as a helmsman steers a ship, Kubernetes steers your containers.'
      },
      {
        id: 'k8s-1-q2',
        question: 'Which of these is the main role of Kubernetes?',
        options: [
          'Creating Docker images',
          'Writing source code',
          'Managing and orchestrating containers at scale',
          'Providing physical servers'
        ],
        correct: 2,
        explanation: 'K8s is an orchestrator. It manages the lifecycle, scaling, and networking of containers built by tools like Docker.'
      }
    ]
  },
  {
    id: 'k8s-2',
    track: 'k8s',
    order: 2,
    title: 'Origins: Borg & The Wheel',
    subtitle: 'From Google internal tools to open standard',
    emoji: '🎡',
    duration: '8 min',
    xpReward: 50,
    funFact: 'The original code name for Kubernetes within Google was "Project 7", a reference to the Star Trek character Seven of Nine (a Borg). This is why the logo has 7 spokes!',
    sections: [
      {
        type: 'intro',
        content: 'Long before Docker existed, Google was already running everything in containers using an internal tool called **Borg**. In 2014, Google decided to take everything they learned from Borg and create an open-source version. They called it Kubernetes.'
      },
      {
        type: 'flowchart',
        content: '**The Timeline of Cloud Native Computing**',
        diagramSteps: [
          { label: '2003\n(Google Borg)', icon: '🕰️', color: '#ffb703' },
          { label: '2014\n(K8s Open Sourced)', icon: '🔓', color: '#06d6a0' },
          { label: '2015\n(CNCF Formed)', icon: '🏛️', color: '#118ab2' },
          { label: 'Today\n(Industry Standard)', icon: '🌍', color: '#06d6a0' }
        ]
      },
      {
        type: 'concept',
        title: '☸️ The Logo: 7 Spoked Wheel',
        content: 'The Kubernetes logo represents a ship\'s wheel. Why 7 spokes? It\'s a nod to its ancestor, the Borg system (Star Trek\'s Seven of Nine). The "7" signifies the continuity of knowledge from Google\'s massive internal infrastructure to the open-source community.'
      },
      {
        type: 'concept',
        title: '🛡️ CNCF: Home of K8s',
        content: 'In 2015, Google donated Kubernetes to the Linux Foundation, forming the **Cloud Native Computing Foundation (CNCF)**. Today, K8s is the center of a massive ecosystem of over 1000 projects, from monitoring (Prometheus) to security (Linkerd).'
      },
      {
        type: 'tip',
        title: '🚀 Why "K8s"?',
        content: 'K8s is a "numeronym". There are **8 letters** between the "K" and the "s" in "Kubernetes". It\'s much easier to type (and say) than the full word!'
      }
    ],
    quiz: [
      {
        id: 'k8s-2-q1',
        question: 'What was the internal Google tool that preceded Kubernetes?',
        options: ['Docker', 'Borg', 'LXC', 'Systemd'],
        correct: 1,
        explanation: 'Borg was (and is) Google\'s internal cluster manager. K8s is the "spiritual successor" born from that experience.'
      },
      {
        id: 'k8s-2-q2',
        question: 'Why does the Kubernetes logo have 7 spokes?',
        options: [
          'To represent the 7 continents',
          'Because there are 7 core developers',
          'As a reference to "Seven of Nine" from Star Trek',
          'It is the 7th version of the software'
        ],
        correct: 2,
        explanation: 'It\'s an easter egg referencing "Seven of Nine", the Borg character, because K8s was originally "Project 7".'
      }
    ]
  },
  {
    id: 'k8s-3',
    track: 'k8s',
    order: 3,
    title: 'Nodes & Pods',
    subtitle: 'The atomic units of the cluster',
    emoji: '🏘️',
    duration: '15 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'In Docker, we talk about containers. In Kubernetes, we talk about **Pods**. Understanding the hierarchy from Node to Pod to Container is crucial.'
      },
      {
        type: 'concept',
        title: '🖥️ The Node (The Server)',
        content: 'A Node is a worker machine in Kubernetes. It can be a physical server or a virtual machine. Every Node runs the **Kubelet** (the agent that talks to the brain) and a **Container Runtime** (like Docker or containerd).'
      },
      {
        type: 'concept',
        title: '🐋 The Pod (The Whale Nest)',
        content: 'A Pod is the **smallest deployable unit** in K8s. It contains one or more containers that share the same network (IP address) and storage. \n\n**Analogy**: If a Container is a tenant, a Pod is an apartment. Tenants in the same apartment share the same address and amenities.'
      },
      {
        type: 'flowchart',
        content: '**Cluster Architecture**',
        diagramSteps: [
          { label: 'Control Plane\n(The Brain)', icon: '🧠', color: '#118ab2' },
          { label: 'API Server\n(Hub)', icon: '📡', color: '#ffb703' },
          { label: 'Worker Node 1\n(Muscle)', icon: '🖥️', color: '#06d6a0' },
          { label: 'Worker Node 2\n(Muscle)', icon: '🖥️', color: '#06d6a0' }
        ]
      },
      {
        type: 'concept',
        title: '🧠 Control Plane vs Worker Nodes',
        content: '- **Control Plane (The Brain)**: Manages the cluster via several components.\n- **Worker Nodes (The Muscle)**: Actually run the containers. If the brain goes down, pods keep running, but you cannot change the cluster state until it recovers.'
      },
      {
        type: 'table',
        title: '⚙️ Control Plane Components',
        content: 'Inside the "Brain" of the cluster are 4 vital organs:',
        tableData: {
          headers: ['Component', 'Role / Analogy', 'What hapens if it fails?'],
          rows: [
            ['**etcd**', 'Database / Source of Truth. Stores all cluster configs.', 'Cluster state cannot be changed or read reliably.'],
            ['**kube-scheduler**', 'The Matchmaker. Decides which node runs a new pod.', 'New pods stay in "Pending" state forever.'],
            ['**kube-apiserver**', 'The Hub. Everything talks through this.', 'Complete loss of control. `kubectl` commands fail.'],
            ['**Controller Manager**', 'The Manager. Ensure desired state matches actual state.', 'Self-healing stops. Crashing pods are not restarted.']
          ]
        }
      },
      {
        type: 'game',
        title: 'Challenge: Build a Cluster',
        content: 'Distinguish between the Brain (Control Plane) and the Muscle (Worker Node) by categorizing these components.',
        gameType: 'drag-classify',
        gameData: {
          categories: [
            { id: 'brain', label: 'Control Plane' },
            { id: 'muscle', label: 'Worker Node' }
          ],
          items: [
            { id: 'etcd', label: 'etcd', categoryId: 'brain' },
            { id: 'api', label: 'API Server', categoryId: 'brain' },
            { id: 'kubelet', label: 'Kubelet', categoryId: 'muscle' },
            { id: 'proxy', label: 'kube-proxy', categoryId: 'muscle' },
            { id: 'sched', label: 'Scheduler', categoryId: 'brain' }
          ]
        }
      },
      {
        type: 'flowchart',
        content: '**Inside the Pod (Sidecar Pattern)**',
        diagramSteps: [
          { label: 'Main Container\n(App Logic)', icon: '📦', color: '#06d6a0' },
          { label: 'Shared Network\n(localhost inter-comm)', icon: '🌐', color: '#118ab2' },
          { label: 'Sidecar Container\n(Logging/Proxy)', icon: '🏍️', color: '#ffb703' }
        ]
      },
      {
        type: 'tip',
        title: '💡 Sidecar Pattern',
        content: 'Why put more than one container in a pod? Usually one is the "Main App" and others are "Helpers" (Sidecars) that handle logging, proxying, or caching for the main one.'
      }
    ],
    quiz: [
      {
        id: 'k8s-3-q1',
        question: 'What is the smallest object you can create in Kubernetes?',
        options: ['Container', 'Node', 'Pod', 'Service'],
        correct: 2,
        explanation: 'Kubernetes manages Pods, not containers directly. A Pod is the atomic unit of deployment.'
      },
      {
        id: 'k8s-3-q2',
        question: 'Containers inside the same Pod share the same...',
        options: [
          'CPU cycle',
          'IP address and Network space',
          'Docker image',
          'Hard drive partition'
        ],
        correct: 1,
        explanation: 'All containers in a pod talk to each other via "localhost" because they share the same network stack and IP.'
      }
    ]
  },
  {
    id: 'k8s-4',
    track: 'k8s',
    order: 4,
    title: 'Deployments & Scaling',
    subtitle: 'Keeping things running and growing',
    emoji: '📈',
    duration: '12 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'You rarely create Pods manually. Instead, you create a **Deployment**. Deployments describe the *desired state* of your app, and K8s makes it happen.'
      },
      {
        type: 'concept',
        title: '📋 Declarative Setup',
        content: 'In Kubernetes, you don\'t say "Add another pod". You say "**I want 3 replicas of this app**". If one pod dies, K8s notices the difference between the Desired State (3) and the Actual State (2) and automatically starts a new one (#SelfHealing).'
      },
      {
        type: 'flowchart',
        content: '**Self-Healing in Action**',
        diagramSteps: [
          { label: 'Desired: 3 Pods\nRunning: 3', icon: '✅', color: '#06d6a0' },
          { label: '1 Pod Dies\nRunning: 2 ❌', icon: '💥', color: '#ff4b4b' },
          { label: 'K8s detects\nmismatch', icon: '👀', color: '#ffb703' },
          { label: 'K8s creates Pod\nRunning: 3 ✨', icon: '✅', color: '#06d6a0' }
        ]
      },
      {
        type: 'concept',
        title: '🔄 Rolling Updates',
        content: 'Deployments allow you to update your app with **zero downtime**. K8s starts a new version pods one by one, and only kills the old ones once the new ones are ready and healthy.'
      },
      {
        type: 'animation',
        content: 'Rolling Update animation'
      },
      {
        type: 'flowchart',
        content: '**Rolling Update (Zero Downtime)**',
        diagramSteps: [
          { label: 'v1 Pods\n(Old)', icon: '🟦', color: '#118ab2' },
          { label: 'Start 1 v2 Pod\n(New)', icon: '🟩', color: '#06d6a0' },
          { label: 'Kill 1 v1 Pod\n(Old)', icon: '❌', color: '#ff4b4b' },
          { label: 'All v2 Pods\n(Complete)', icon: '✅', color: '#06d6a0' }
        ]
      },
      {
        type: 'code',
        title: 'A Deployment YAML',
        content: 'This is how we tell K8s what to run:',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3 # Desired state
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:1.21`,
        language: 'yaml'
      },
      {
        type: 'concept',
        title: '📈 Autoscaling with HPA',
        content: 'Kubernetes can scale automatically based on usage. The **Horizontal Pod Autoscaler (HPA)** monitors metrics like CPU or Memory and automatically increases or decreases the number of pod replicas (horizontal scaling) to match the load.'
      },
      {
        type: 'code',
        title: 'HPA YAML Example',
        content: 'Automatically scale between 2 and 10 pods when CPU hits 70%:',
        code: `apiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: web-app-hpa\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: web-app\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target:\n        type: Utilization\n        averageUtilization: 70`,
        language: 'yaml'
      }
    ],
    quiz: [
      {
        id: 'k8s-4-q1',
        question: 'What happens if a Pod managed by a Deployment crashes?',
        options: [
          'The whole cluster stops',
          'Kubernetes ignores it',
          'Kubernetes automatically starts a new Pod to replace it',
          'You must manually restart it'
        ],
        correct: 2,
        explanation: 'This is "Self-Healing". The Deployment controller always works to match the actual state to your desired state (replicas).'
      }
    ]
  },
  {
    id: 'k8s-5',
    track: 'k8s',
    order: 5,
    title: 'Services & Networking',
    subtitle: 'Connecting Pods together reliably',
    emoji: '🔌',
    duration: '15 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'Pods are temporary (ephemeral). They get new IP addresses every time they restart. How does a Frontend find its Backend if the Backend\'s IP is always changing? Enter the **Service**.'
      },
      {
        type: 'concept',
        title: '🛡️ The Service (The Entry Point)',
        content: 'A Service is an abstraction that defines a logical set of Pods and a policy by which to access them. It provides a **stable IP and DNS name**. You talk to the Service, and it load-balances the traffic to the healthy Pods behind it. \n\nHow does it know which Pods to send traffic to? It uses a **Selector** (a set of labels like `app: web`) to find all Pods with matching tags.'
      },
      {
        type: 'flowchart',
        title: 'Service as a Load Balancer',
        content: 'The Service provides a stable entry point even if the pods behind it are replaced.',
        diagramSteps: [
          { label: 'User Request', icon: '🌍', color: '#118ab2' },
          { label: 'Service (VIP)', icon: '🛡️', color: '#ffb703' },
          { label: 'Pods (app=web)', icon: '📦', color: '#06d6a0' }
        ]
      },
      {
        type: 'game',
        title: 'Challenge: Route the Traffic',
        content: 'Identify which Service type is best suited for these scenarios.',
        gameType: 'drag-classify',
        gameData: {
          categories: [
            { id: 'internal', label: 'Internal Access' },
            { id: 'external', label: 'Public Access' }
          ],
          items: [
            { id: 'db', label: 'PostgreSQL Database', categoryId: 'internal' },
            { id: 'web', label: 'React Frontend', categoryId: 'external' },
            { id: 'api', label: 'Internal Auth Service', categoryId: 'internal' },
            { id: 'shop', label: 'E-commerce Site', categoryId: 'external' }
          ]
        }
      },
      {
        type: 'table',
        title: '🏗️ Types of Services',
        content: 'Choose the right tool for the job:',
        tableData: {
          headers: ['Service Type', 'Scope', 'Best Use Case', 'Cost'],
          rows: [
            ['**ClusterIP**', 'Internal cluster only', 'Backend APIs & Databases (hidden)', 'Free (Default)'],
            ['**NodePort**', 'External (Node IPs)', 'Testing & custom internal routing', 'Free'],
            ['**LoadBalancer**', 'External (Public IP)', 'Public-facing Web Apps / APIs', '$$$ (Cloud billing)']
          ]
        }
      },
      {
        type: 'tip',
        title: '🌐 Ingress',
        content: 'If you have many services, giving each one an expensive cloud LoadBalancer is wasteful. An **Ingress** acts as a Smart Router (like NGINX) that handles multiple services behind one IP based on the URL path (e.g., `/api` goes to service A, `/` goes to service B).'
      },
      {
        type: 'code',
        title: 'A Service YAML',
        content: 'This Service load-balances port 80 traffic to all pods with the `app: web` label on their port 8080.',
        code: `apiVersion: v1\nkind: Service\nmetadata:\n  name: my-web-service\nspec:\n  type: ClusterIP\n  selector:\n    app: web\n  ports:\n    - protocol: TCP\n      port: 80\n      targetPort: 8080`,
        language: 'yaml'
      }
    ],
    quiz: [
      {
        id: 'k8s-5-q1',
        question: 'Why do we need Services if Pods already have IP addresses?',
        options: [
          'Pod IPs are too long',
          'Pod IPs are temporary and change when the Pod restarts; Services provide a stable IP',
          'Services make the code run faster',
          'Pods cannot communicate without a Service'
        ],
        correct: 1,
        explanation: 'Pods are ephemeral. Services provide the stable "identity" (IP/DNS) that other pods can rely on.'
      }
    ]
  },
  {
    id: 'k8s-6',
    track: 'k8s',
    order: 6,
    title: 'ConfigMaps & Secrets',
    subtitle: 'Decoupling code from configuration',
    emoji: '🔒',
    duration: '10 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'Never hardcode database passwords or API URLs in your Docker image! Kubernetes provides two objects to inject settings into your pods at runtime.'
      },
      {
        type: 'concept',
        title: '🗺️ ConfigMap',
        content: 'Used for non-sensitive settings like env variables (LOG_LEVEL, API_URL) or config files. Pods can read them as environment variables or as files in a mounted folder.'
      },
      {
        type: 'concept',
        title: '🤫 Secret',
        content: 'Similar to ConfigMaps but for **sensitive data**: API keys, DB passwords, SSH keys. Kubernetes stores them in base64 encoding (and typically encrypts them at rest in etcd).'
      },
      {
        type: 'flowchart',
        content: '**Same Image, Different Config**',
        diagramSteps: [
          { label: 'Docker Image\n(App v1.0)', icon: '📦', color: '#118ab2' },
          { label: 'ConfigMap\n(Prod DB URL)', icon: '🗺️', color: '#ffb703' },
          { label: 'Secret\n(Prod Pass)', icon: '🤫', color: '#ff4b4b' },
          { label: 'Pod (Prod)\nReady', icon: '✅', color: '#06d6a0' }
        ]
      },
      {
        type: 'table',
        title: '⚖️ ConfigMap vs Secret',
        content: 'When to use which K8s object:',
        tableData: {
          headers: ['Feature', 'ConfigMap 🗺️', 'Secret 🤫'],
          rows: [
            ['**Data Type**', 'Non-sensitive (URLs, Ports, Envs)', 'Sensitive (Passwords, SSH Keys, Tokens)'],
            ['**Encoding**', 'Plain text', 'Base64 Encoded'],
            ['**Security**', 'Stored in plain text in etcd', 'Often encrypted at rest in etcd'],
            ['**Example**', '`DB_HOST=localhost`', '`DB_PASS=S3cr3t!`']
          ]
        }
      },
      {
        type: 'code',
        title: 'A ConfigMap YAML Example',
        content: 'Defining environment variables and consuming them in a Pod:',
        code: `apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: app-config\ndata:\n  API_URL: "https://api.example.com"\n  LOG_LEVEL: "info"\n---\n# Consuming it in a Deployment\napiVersion: apps/v1\nkind: Deployment\n# ... inside the container spec ...\n        envFrom:\n        - configMapRef:\n            name: app-config`,
        language: 'yaml'
      }
    ],
    quiz: [
      {
        id: 'k8s-6-q1',
        question: 'What is the main difference between a ConfigMap and a Secret?',
        options: [
          'ConfigMaps are for files; Secrets are for variables',
          'Secrets are intended for sensitive information like passwords; ConfigMaps are for general settings',
          'ConfigMaps only work on Linux',
          'There is no difference'
        ],
        correct: 1,
        explanation: 'Always use Secrets for sensitive data. Note that standard K8s secrets are base64 encoded, not encrypted by default — use external tools (like Vault or Sealed Secrets) for maximum security.'
      }
    ]
  },
  {
    id: 'k8s-7',
    track: 'k8s',
    order: 7,
    title: 'Storage: PV & PVC',
    subtitle: 'Data that survives pod deletion',
    emoji: '💾',
    duration: '15 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'If a database pod dies, we don\'t want our users\' data to die with it. Just like Docker has Volumes, Kubernetes has a powerful storage system.'
      },
      {
        type: 'concept',
        title: '🧱 PersistentVolume (PV)',
        content: 'The actual piece of storage (a disk on AWS, a folder on the server, etc.) available to the cluster. Managed by administrators.'
      },
      {
        type: 'concept',
        title: '🎫 PersistentVolumeClaim (PVC)',
        content: 'A request for storage by a user. The user say: "I need a 5GB disk with ReadWrite once access". K8s finds a matching **PV** and binds it to the **PVC**.'
      },
      {
        type: 'flowchart',
        content: '**PV ↔ PVC Binding process**',
        diagramSteps: [
          { label: 'PV\n(50GB Disk)', icon: '🧱', color: '#ffb703' },
          { label: 'K8s Binding\n(Match!)', icon: '🤝', color: '#118ab2' },
          { label: 'PVC\n(Needs 50GB)', icon: '🎫', color: '#06d6a0' },
          { label: 'Pod Mounts\n(Volume)', icon: '📂', color: '#118ab2' }
        ]
      },
      {
        type: 'tip',
        title: '📦 StorageClass',
        content: 'Modern clusters use **Dynamic Provisioning**. You just create a PVC, and the StorageClass automatically creates a new cloud disk (PV) on the fly. No manual admin work needed!'
      }
    ],
    quiz: [
      {
        id: 'k8s-7-q1',
        question: 'Which object represents a user\'s request for storage?',
        options: ['PV', 'PVC', 'StorageClass', 'VolumeMount'],
        correct: 1,
        explanation: 'A PVC is like a "ticket" or "voucher". You give the ticket to K8s to get a piece of the Storage "pie" (the PV).'
      }
    ]
  },
  {
    id: 'k8s-8',
    track: 'k8s',
    order: 8,
    title: 'Hands-on Labs: kubectl & Playgrounds',
    subtitle: 'Free browser-based Kubernetes clusters to practice on',
    emoji: '🛠️',
    duration: '45+ min',
    xpReward: 80,
    externalLink: {
      label: 'Open Killercoda K8s Scenarios',
      url: 'https://killercoda.com/playgrounds/scenario/kubernetes',
      xpPrompt: 'How many scenarios/exercises did you complete? Enter the number to earn XP!'
    },
    sections: [
      {
        type: 'intro',
        content: 'How do you actually talk to the cluster? You use **kubectl** (pronounced "kube-control" or "kube-cuttle"). But you don\'t need to install anything — we have free playgrounds!'
      },
      {
        type: 'game',
        title: 'Challenge: Fix the Cluster',
        content: 'A Pod is in CrashLoopBackOff! Order the commands you would use to diagnose and fix the issue.',
        gameType: 'drag-order',
        gameData: [
          { id: '1', label: 'kubectl get pods (Identify the victim)' },
          { id: '2', label: 'kubectl describe pod (Check events)' },
          { id: '3', label: 'kubectl logs pod (Check error messages)' },
          { id: '4', label: 'kubectl apply -f fix.yaml (Fix the config)' }
        ]
      },
      {
        type: 'table',
        title: '⌨️ The kubectl Command Matrix',
        content: 'Categorized commands for daily use: Inspect, Manage, and Debug.',
        tableData: {
          headers: ['Category', 'Command', 'What it does'],
          rows: [
            ['**Inspect** (🟢 Safe)', '`kubectl get pods`', 'Lists all pods in the namespace'],
            ['**Inspect** (🟢 Safe)', '`kubectl describe pod [name]`', 'Shows detailed configuration and events for a pod'],
            ['**Debug** (🟡 Medium)', '`kubectl logs [name]`', 'Prints standard output/error (the logs) of the container'],
            ['**Debug** (🟡 Medium)', '`kubectl exec -it [name] -- sh`', 'Opens an interactive shell inside the container for debugging'],
            ['**Manage** (🔴 Alta)', '`kubectl apply -f [file.yaml]`', 'Creates or updates resources declaratively'],
            ['**Manage** (🔴 Alta)', '`kubectl delete pod [name]`', 'Force deletes a pod (usually self-heals if part of a deployment)']
          ]
        }
      },
      {
        type: 'concept',
        title: '🌐 Tool 1: Killercoda (Guided Scenarios)',
        content: '**Killercoda** is the gold standard for Kubernetes practice. It gives you a **real, live cluster** in your browser — completely free.\n\n- Pre-built scenarios: "Kubernetes Basics", "Deployments", "Services", "CKAD Prep"\n- Each scenario has step-by-step instructions with verification\n- Real `kubectl` access — everything you type actually runs on a real cluster\n- No time limit on individual scenarios\n\n🔗 **URL**: https://killercoda.com/playgrounds/scenario/kubernetes\n\n💡 **Recommended starting scenarios:**\n1. "Kubernetes Playground" (free-form practice)\n2. "Create a Pod" (Beginner)\n3. "Deploy and Scale" (Intermediate)\n4. "Network Policies" (Advanced)'
      },
      {
        type: 'concept',
        title: '🎮 Tool 2: Play with Kubernetes (PWK)',
        content: '**Play with Kubernetes** is the K8s equivalent of Play with Docker. A free, browser-based environment.\n\n- Get a multi-node cluster in seconds\n- Sessions last **4 hours**\n- Perfect for experimenting with YAML files from modules 3-7\n- Can simulate multi-node scenarios (failover, scheduling)\n\n🔗 **URL**: https://labs.play-with-k8s.com'
      },
      {
        type: 'tip',
        title: '🎯 Which playground should I use?',
        content: '**First time with kubectl?** → Killercoda (guided, step-by-step)\n\n**Want free-form practice?** → Play with Kubernetes (blank cluster)\n\n**Preparing for CKA/CKAD?** → Killercoda has dedicated exam-prep scenarios\n\n🏆 Complete at least 3 Killercoda scenarios before moving to the Final Challenge!'
      }
    ],
    quiz: [
      {
        id: 'k8s-8-q1',
        question: 'Which command is used to apply a configuration from a YAML file?',
        options: ['kubectl get', 'kubectl apply -f', 'kubectl run', 'kubectl start'],
        correct: 1,
        explanation: '`kubectl apply -f [filename]` is the standard way to deploy objects. It is declarative: K8s looks at what you want and makes it so.'
      }
    ]
  },
  {
    id: 'k8s-9',
    track: 'k8s',
    order: 9,
    title: 'Final K8s Challenge',
    subtitle: 'Master of the Cluster',
    emoji: '🏆',
    duration: '20 min',
    xpReward: 150,
    sections: [
      {
        type: 'intro',
        content: 'The final exam! 20 questions covering architecture, workloads, services, and troubleshooting. Earn your "Kybernitis" badge now!'
      }
    ],
    quiz: [
      {
        id: 'k8s-9-q1',
        question: 'Which component is responsible for deciding which Node a Pod should run on?',
        options: ['Kubelet', 'kube-scheduler', 'etcd', 'API Server'],
        correct: 1,
        explanation: 'The scheduler is the component that selects a node for an unscheduled pod based on resource availability and constraints.'
      },
      {
        id: 'k8s-9-q2',
        question: 'What is "etcd" in Kubernetes?',
        options: [
          'The container runtime',
          'A distributed key-value store used as the cluster database',
          'A command-line tool',
          'A type of pod'
        ],
        correct: 1,
        explanation: 'etcd is the "source of truth". Every configuration and state of the cluster is stored here.'
      },
      {
        id: 'k8s-9-q3',
        question: 'What is the purpose of HPA (Horizontal Pod Autoscaler)?',
        options: [
          'To make pods larger (more CPU/RAM)',
          'To increase or decrease the number of pod replicas based on load (CPU/Memory)',
          'To restart failing nodes',
          'To move pods between clusters'
        ],
        correct: 1,
        explanation: 'HPA scales "horizontally" (more pods). "Vertical" scaling (bigger pods) is handled by VPA.'
      },
      {
        id: 'k8s-9-q4',
        question: 'In a Service, what is the "Selector"?',
        options: [
          'A dropdown menu in the UI',
          'A set of labels used to identify which Pods the Service should send traffic to',
          'The IP address of the service',
          'The name of the external LoadBalancer'
        ],
        correct: 1,
        explanation: 'Selectors are how Services find their Pods. If a pod has the label `app: web` and the service has the selector `app: web`, they are connected.'
      },
      {
        id: 'k8s-9-q5',
        question: 'What happens if the Control Plane becomes unavailable?',
        options: [
          'All running pods on worker nodes are immediately terminated',
          'Pods keep running on worker nodes, but you cannot change the state (create/delete) of the cluster',
          'The entire cluster is deleted',
          'The pods automatically migrate to Docker'
        ],
        correct: 1,
        explanation: 'K8s worker nodes can survive a control plane failure long enough to keep apps running, but you lose management capabilities until the brain is back online.'
      },
      {
        id: 'k8s-9-q6',
        question: 'What is a "Pod" in Kubernetes?',
        options: [
          'A physical server',
          'The smallest deployable computing unit, which can contain one or more containers',
          'A networking interface',
          'A storage volume'
        ],
        correct: 1,
        explanation: 'The Pod is the atomic unit of Kubernetes. While usually containing a single container, it can hold multiple tightly-coupled containers.'
      },
      {
        id: 'k8s-9-q7',
        question: 'Which component is known as the "Brain" of the worker node?',
        options: ['etcd', 'kube-proxy', 'kubelet', 'scheduler'],
        correct: 2,
        explanation: 'kubelet runs on every worker node. It registers the node with the cluster and ensures containers described in PodSpecs are running and healthy.'
      },
      {
        id: 'k8s-9-q8',
        question: 'What is the primary difference between a Deployment and a Pod?',
        options: [
          'Deployments are for databases; Pods are for web servers',
          'Pods declare desired state; Deployments are the actual running instances',
          'Deployments manage the lifecycle, replication, and updates of Pods',
          'There is no difference'
        ],
        correct: 2,
        explanation: 'You rarely create Pods directly. Deployments supervise Pods, ensuring the right number are running and handling updates without downtime.'
      },
      {
        id: 'k8s-9-q9',
        question: 'What is a "Rolling Update"?',
        options: [
          'Replacing all instances of an application at exactly the same time',
          'Gradually replacing old Pods with new Pods to ensure zero downtime',
          'Restarting the Kubernetes Control Plane',
          'Updating the underlying host Operating System'
        ],
        correct: 1,
        explanation: 'Rolling updates allow Deployments\' updates to take place with zero downtime by incrementally updating Pods instances with new ones.'
      },
      {
        id: 'k8s-9-q10',
        question: 'Which Service type provides an internal IP only reachable from within the cluster?',
        options: ['LoadBalancer', 'NodePort', 'ClusterIP', 'ExternalName'],
        correct: 2,
        explanation: 'ClusterIP is the default Service type. It exposes the Service on a cluster-internal IP, making it only reachable from within the cluster.'
      },
      {
        id: 'k8s-9-q11',
        question: 'What is the purpose of an Ingress?',
        options: [
          'To create a new Node in the cluster',
          'To act as a smart HTTP/S router that directs outside traffic to multiple internal Services',
          'To store sensitive passwords',
          'To monitor CPU usage'
        ],
        correct: 1,
        explanation: 'Ingress manages external access to the services in a cluster, typically HTTP. It can provide load balancing, SSL termination, and name-based virtual hosting.'
      },
      {
        id: 'k8s-9-q12',
        question: 'Where should you store a database password in Kubernetes?',
        options: ['ConfigMap', 'Secret', 'Deployment YAML', 'Docker Image'],
        correct: 1,
        explanation: 'Secrets are designed specifically to hold sensitive information. ConfigMaps are for non-sensitive configuration data.'
      },
      {
        id: 'k8s-9-q13',
        question: 'What is the function of "kube-proxy"?',
        options: [
          'It is a VPN service',
          'It maintains network rules on nodes allowing network communication to your Pods',
          'It proxies API requests to etcd',
          'It creates Docker images'
        ],
        correct: 1,
        explanation: 'kube-proxy runs on each node and is responsible for implementing the Kubernetes Service concept (routing traffic to the right Pod).'
      },
      {
        id: 'k8s-9-q14',
        question: 'Why would you use a "StatefulSet" instead of a "Deployment"?',
        options: [
          'For stateless web applications',
          'When your application requires stable network IDs and persistent storage (e.g. Databases)',
          'When you need horizontal autoscaling',
          'StatefulSets are deprecated'
        ],
        correct: 1,
        explanation: 'Unlike a Deployment, a StatefulSet maintains a sticky identity for each of its Pods, essential for clustered databases like Kafka or MySQL.'
      },
      {
        id: 'k8s-9-q15',
        question: 'What does a "DaemonSet" ensure?',
        options: [
          'That a copy of a Pod runs on ALL (or some) Nodes in the cluster',
          'That only one Pod runs in the entire cluster',
          'That background jobs run on a specific schedule',
          'That external traffic is routed to the Master node'
        ],
        correct: 0,
        explanation: 'DaemonSets are perfect for logging, monitoring, and networking agents that must run exactly once on every single node.'
      },
      {
        id: 'k8s-9-q16',
        question: 'What is a "PersistentVolumeClaim (PVC)"?',
        options: [
          'A request for CPU resources',
          'A request for storage by a user/Pod',
          'A claim for a specific IP address',
          'A networking plugin'
        ],
        correct: 1,
        explanation: 'A PVC is a request for storage, abstracting the details of how the storage is provisioned from how it is consumed by the application.'
      },
      {
        id: 'k8s-9-q17',
        question: 'What is "kubectl"?',
        options: [
          'A type of pod',
          'The Kubernetes command-line tool',
          'A load balancer',
          'A graphical dashboard'
        ],
        correct: 1,
        explanation: 'kubectl is the command line utility used to communicate with the Kubernetes API server and manage the cluster.'
      },
      {
        id: 'k8s-9-q18',
        question: 'In Kubernetes, what is a "Namespace"?',
        options: [
          'A physical separation of hardware',
          'A virtual cluster backed by the same physical cluster, used for isolation',
          'A type of DNS server',
          'A network interface for Pods'
        ],
        correct: 1,
        explanation: 'Namespaces provide a mechanism for isolating groups of resources within a single cluster (e.g. `dev`, `staging`, `prod` namespaces).'
      },
      {
        id: 'k8s-9-q19',
        question: 'What happens when a node fails in a Kubernetes cluster?',
        options: [
          'The pods on it are lost forever',
          'The scheduler detects the failure and reschedules the affected Pods onto healthy nodes',
          'The Control Plane reboots the entire cluster',
          'You must manually re-create the node'
        ],
        correct: 1,
        explanation: 'Kubernetes constantly monitors nodes. If one fails, the Control Plane ensures the desired state is met by creating new Pods on other available nodes.'
      },
      {
        id: 'k8s-9-q20',
        question: 'What is "Helm"?',
        options: [
          'The new name for Kubernetes',
          'A package manager for Kubernetes (like apt or npm)',
          'A secure network overlay',
          'The Kubernetes native database'
        ],
        correct: 1,
        explanation: 'Helm helps you manage Kubernetes applications. Helm Charts help you define, install, and upgrade even the most complex Kubernetes application.'
      }
    ]
  }
]
