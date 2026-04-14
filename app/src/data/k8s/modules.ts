import type { Module } from '../git/modules'

export const K8S_MODULES: Module[] = [
  {
    id: 'k8s-1',
    track: 'k8s',
    order: 1,
    title: 'The Need for Orchestration',
    subtitle: 'Managing thousands of containers',
    emoji: '🚢',
    duration: '15 min',
    xpReward: 100,
    funFact: 'Kubernetes is often abbreviated as "K8s" because there are exactly 8 letters between the "K" and the "s" in "Kubernetes".',
    sections: [
      {
        type: 'intro',
        content: 'Docker is fantastic for running a few containers. But what happens when you have millions of users, and you need to run 5,000 containers across 50 different servers? How do they talk to each other? What if a server catches fire? You need an orchestrator.'
      },
      {
        type: 'video',
        title: '📺 Kubernetes in 5 Minutes',
        content: 'A brilliant, high-level animated breakdown of exactly what problem Kubernetes solves in modern architecture.',
        videoUrl: 'https://www.youtube.com/watch?v=s_o8dwzRlu4'
      },
      {
        type: 'concept',
        title: '🎯 The Orchestrator\'s Job',
        content: 'Kubernetes does not run containers itself. It manages the tools (like Docker or containerd) that do.\n\nImagine a symphony orchestra: the musicians (containers) make the actual sound, but the **Conductor** (Kubernetes) tells them when to play, how loud to play, and replaces them if they fall asleep.'
      },
      {
        type: 'flowchart',
        content: '**Life Without vs With Kubernetes**',
        diagramSteps: [
          { label: 'Server Dies\n(Plain Docker)', icon: '🔥', color: '#ff4b4b' },
          { label: 'Site Goes Down!\n(Downtime)', icon: '💀', color: '#ff4b4b' },
          { label: 'Server Dies\n(Kubernetes)', icon: '🔥', color: '#ffb703' },
          { label: 'Auto-Restarts\non New Server', icon: '✨', color: '#06d6a0' }
        ]
      },
      {
        type: 'table',
        title: '⚖️ Core Features of K8s',
        content: 'Why does every modern enterprise use it?',
        tableData: {
          headers: ['Feature', 'What it means practically'],
          rows: [
            ['**Self-healing**', 'Restarts containers that fail, replaces containers when nodes die.'],
            ['**Auto-scaling**', 'Spins up more containers during Black Friday traffic, shuts them down at night.'],
            ['**Load Balancing**', 'Distributes incoming network traffic evenly across your containers.'],
            ['**Rollouts & Rollbacks**', 'Updates your app bit by bit, pausing and reverting if a bug is detected!']
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'k8s-1-q1',
        question: 'Which of the following is NOT a core responsibility of Kubernetes?',
        options: [
          'Load balancing incoming traffic across multiple containers',
          'Writing and compiling your application source code',
          'Restarting failed containers automatically',
          'Scaling the number of running containers up and down'
        ],
        correct: 1,
        explanation: 'Kubernetes is purely an orchestration engine. It does not compile code or build images. It relies on CI/CD pipelines and tools like Docker for that.'
      },
      {
        id: 'k8s-1-q2',
        question: 'What happens in a Kubernetes cluster if a physical server (node) suddenly loses power?',
        options: [
          'The entire cluster goes completely offline',
          'An administrator must write a YAML file to buy a new server',
          'Kubernetes detects the dead node and automatically schedules its containers onto healthy surviving nodes',
          'The containers on that server are permanently deleted along with their data'
        ],
        correct: 2,
        explanation: 'This is the "Self-healing" mechanism. The Control Plane notices the worker is dead and immediately asks other workers to spin up replacement containers.'
      }
    ]
  },
  {
    id: 'k8s-2',
    track: 'k8s',
    order: 2,
    title: 'Cluster Architecture',
    subtitle: 'The Brain and the Muscles',
    emoji: '🧠',
    duration: '20 min',
    xpReward: 120,
    sections: [
      {
        type: 'intro',
        content: 'A Kubernetes cluster is not a single entity. It is a collection of distinct machines (physical or virtual VMs) working together. They are strictly divided into two distinct roles: The Control Plane (The Brain) and the Worker Nodes (The Muscle).'
      },
      {
        type: 'video',
        title: '📺 Architecture Deep Dive',
        content: 'TechWorld with Nana provides the absolute best visual breakdown of every component inside a K8s node.',
        videoUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do'
      },
      {
        type: 'concept',
        title: '🧠 The Control Plane (Master Node)',
        content: 'The Control Plane makes global decisions about the cluster. It does not run your application code.\n\n- **API Server**: The only component you interact with directly. The front-door.\n- **etcd**: The cluster\'s memory. A highly-available key-value store containing the cluster state.\n- **Scheduler**: Watches for new unassigned containers and assigns them to an appropriate Worker node.\n- **Controller Manager**: The endless "loop" that ensures the current state matches your desired state.'
      },
      {
        type: 'concept',
        title: '💪 The Worker Nodes',
        content: 'Worker Nodes are the machines that actually run your application containers.\n\n- **Kubelet**: The captain of the worker node. It listens to the API Server and makes sure containers are running healthy.\n- **Kube-Proxy**: Maintains network rules, allowing communication to and from containers.\n- **Container Runtime**: The actual engine pulling images and running them (like containerd or Docker).'
      },
      {
        type: 'flowchart',
        content: '**The Architecture Visualized**',
        diagramSteps: [
          { label: 'Developer\n(kubectl)', icon: '👨‍💻', color: '#118ab2' },
          { label: 'Control Plane\n(API Server)', icon: '🧠', color: '#ffb703' },
          { label: 'Worker Node 1\n(Kubelet)', icon: '💪', color: '#06d6a0' },
          { label: 'Worker Node 2\n(Kubelet)', icon: '💪', color: '#06d6a0' }
        ]
      },
      {
        type: 'game',
        title: 'Challenge: Master vs Worker',
        content: 'Drag the components to their correct architectural home.',
        gameType: 'drag-classify',
        gameData: {
          categories: [
            { id: 'master', label: 'Control Plane (Master)' },
            { id: 'worker', label: 'Worker Node' }
          ],
          items: [
            { id: 'api', label: 'API Server', categoryId: 'master' },
            { id: 'etcd', label: 'etcd Database', categoryId: 'master' },
            { id: 'scheduler', label: 'Scheduler', categoryId: 'master' },
            { id: 'kubelet', label: 'Kubelet', categoryId: 'worker' },
            { id: 'proxy', label: 'Kube-Proxy', categoryId: 'worker' },
            { id: 'runtime', label: 'Container Runtime', categoryId: 'worker' }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'k8s-2-q1',
        question: 'Which component serves as the cluster\'s fundamental "Brain and Memory", storing all state information?',
        options: ['Kubelet', 'Kube-Proxy', 'The API Server', 'etcd'],
        correct: 3,
        explanation: '`etcd` is arguably the most critical component. It is the highly-available dictionary where Kubernetes stores all data. If you lose your etcd data cleanly, your cluster forgets everything.'
      },
      {
        id: 'k8s-2-q2',
        question: 'When you type a command into your terminal to deploy an app, which component receives it?',
        options: ['The Worker node directly', 'The Scheduler', 'The API Server', 'The Container Runtime'],
        correct: 2,
        explanation: 'The `kube-apiserver` acts as the grand central station. No component bypasses it; everything, including UI dashboards, CLIs, and internal nodes, must talk to the API Server.'
      },
      {
        id: 'k8s-2-q3',
        question: 'What is the primary job of the Kubelet?',
        options: [
          'To route external internet traffic into the cluster',
          'To store secret passwords',
          'To ensure that containers scheduled to its specific node are actively running and healthy',
          'To schedule pods to other nodes'
        ],
        correct: 2,
        explanation: 'The Kubelet is the local agent on every worker node. It registers the node with the cluster and ensures the containers it was assigned are actually running.'
      }
    ]
  },
  {
    id: 'k8s-3',
    track: 'k8s',
    order: 3,
    title: 'Pods & kubectl',
    subtitle: 'The smallest atomic unit',
    emoji: '🫛',
    duration: '20 min',
    xpReward: 100,
    sections: [
      {
        type: 'intro',
        content: 'In Docker, the smallest unit is a Container. In Kubernetes, the smallest unit is a **Pod**. Kubernetes does not run individual containers; it runs Pods, which are wrappers that *contain* one or more containers.'
      },
      {
        type: 'concept',
        title: '🫛 Why Pods instead of Containers?',
        content: 'Why add a wrapper layer? Because sometimes, containers are forcefully coupled. \n\nImagine a Web Server container and a Logging container. By putting them in the **same Pod**, they are guaranteed to run on the exact same physical machine, share the same IP address, and share the same internal localhost network.'
      },
      {
        type: 'flowchart',
        content: '**The Pod Wrapper Structure**',
        diagramSteps: [
          { label: 'Node (Server)', icon: '🖥️', color: '#118ab2' },
          { label: 'Pod Environment\n(Shared IP)', icon: '🫛', color: '#06d6a0' },
          { label: 'Container 1\n(App)', icon: '📦', color: '#ffd166' },
          { label: 'Container 2\n(Logger)', icon: '📦', color: '#ffd166' }
        ]
      },
      {
        type: 'concept',
        title: '⌨️ The kubectl CLI',
        content: '`kubectl` (pronounced "kube-control" or "kube-cuddle") is the command line tool used to communicate with the API Server. It is the absolute daily-driver for a DevOps engineer.'
      },
      {
        type: 'table',
        title: '🛠️ Essential kubectl Commands',
        content: 'Memorize these, you will use them thousands of times.',
        tableData: {
          headers: ['Command', 'Purpose'],
          rows: [
            ['`kubectl get pods`', 'List all pods in the current namespace'],
            ['`kubectl describe pod [name]`', 'Show incredibly detailed info and events (vital for debugging)'],
            ['`kubectl logs [name]`', 'View the internal console logs of the containers in the pod'],
            ['`kubectl apply -f [file.yml]`', 'Create or update resources from a YAML definition file'],
            ['`kubectl delete pod [name]`', 'Destroy a pod (It will likely be immediately recreated!)']
          ]
        }
      },
      {
        type: 'game',
        title: 'Terminal: Meet kubectl',
        content: 'Let\'s run some basic commands against a virtual cluster.',
        gameType: 'terminal',
        gameData: {
          startText: 'k8s-admin@k8s-master:~$ ',
          steps: [
            {
              instruction: 'First, see what pods are currently running. Type: kubectl get pods',
              expectedCommand: 'kubectl get pods',
              output: 'NAME                     READY   STATUS    RESTARTS   AGE\nnginx-web-6b7df-x8mqp    1/1     Running   0          10m\nredis-cache-4f2xx        1/1     Running   0          5m'
            },
            {
              instruction: 'The nginx pod has "READY 1/1", which means its 1 container is healthy. Let\'s see its logs. Type: kubectl logs nginx-web-6b7df-x8mqp',
              expectedCommand: 'kubectl logs nginx-web-6b7df-x8mqp',
              output: '10.244.1.1 - - [14/Apr/2026:10:00:01] "GET / HTTP/1.1" 200 612\n10.244.1.1 - - [14/Apr/2026:10:00:05] "GET /images/logo.png HTTP/1.1" 200 4500'
            },
            {
              instruction: 'What happens if we forcefully destroy the pod? Type: kubectl delete pod nginx-web-6b7df-x8mqp',
              expectedCommand: 'kubectl delete pod nginx-web-6b7df-x8mqp',
              output: 'pod "nginx-web-6b7df-x8mqp" deleted'
            },
            {
              instruction: 'Now quickly check the pods again! Type: kubectl get pods',
              expectedCommand: 'kubectl get pods',
              output: 'NAME                     READY   STATUS              RESTARTS   AGE\nnginx-web-6b7df-z9rtc    0/1     ContainerCreating   0          2s\nredis-cache-4f2xx        1/1     Running             0          6m'
            }
          ]
        }
      },
      {
        type: 'tip',
        title: '💡 Wait, why did it come back?',
        content: 'Pods are mortal. When you deleted the Pod, Kubernetes immediately created a BRAND NEW one (`z9rtc`) to replace it. This is because Pods are managed by higher-level controllers (like Deployments) which enforce a desired state. Never make naked Pods!'
      }
    ],
    quiz: [
      {
        id: 'k8s-3-q1',
        question: 'What is true about containers inside the exact same Pod?',
        options: [
          'They must be written in the same programming language',
          'They share the exact same localhost network space and IP address',
          'They are automatically protected against infinite loops',
          'They cannot communicate with each other'
        ],
        correct: 1,
        explanation: 'Containers in the same pod share networking and storage. If Container A runs an app on port 8080, Container B can reach it simply by pinging `localhost:8080`.'
      },
      {
        id: 'k8s-3-q2',
        question: 'Which tool is the primary way human administrators give commands to the Kubernetes API server?',
        options: ['docker-compose', 'kubelet', 'kubectl', 'k8s-admin'],
        correct: 2,
        explanation: '`kubectl` translates human commands like `get pods` into secure REST API HTTP requests aimed at the cluster\'s Control Plane.'
      }
    ]
  },
  {
    id: 'k8s-4',
    track: 'k8s',
    order: 4,
    title: 'Deployments & Self-Healing',
    subtitle: 'Declaring the desired state',
    emoji: '📄',
    duration: '25 min',
    xpReward: 150,
    sections: [
      {
        type: 'intro',
        content: 'As we saw, you should never create individual Pods manually. If a naked Pod crashes, it\'s gone forever. We want K8s to maintain a **desired state** (e.g. "I always want 3 copies of this app running"). We achieve this using a **Deployment**.'
      },
      {
        type: 'video',
        title: '📺 Imperative vs Declarative',
        content: 'Understand why Kubernetes uses a Declarative system instead of a list of bash scripts.',
        videoUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do'
      },
      {
        type: 'concept',
        title: '📄 The Deployment YAML',
        content: 'A Deployment is a YAML file where you say: \n\n"I want a Deployment named *my-app*. I want exactly *3 replicas* (Pods). Use the container image *node:18*."\n\nKubernetes constantly reads this file. If it sees only 2 Pods running, it spins up a 3rd. If it sees 4, it assassinates 1. It is a tireless robot enforcing your will.'
      },
      {
        type: 'code',
        title: 'Look at a real Deployment YAML',
        content: 'Notice the `replicas: 3` and the `template`, which is basically an embedded Pod definition.',
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
        title: '🚀 Rollouts (Zero-Downtime Updates)',
        content: 'Deployments allow you to update your application without anyone noticing.',
        tableData: {
          headers: ['Action', 'What K8s does automatically under the hood', 'Result'],
          rows: [
            ['Update image to v2', 'Spins up a new v2 pod. Waits for it to be healthy.', 'No downtime'],
            ['v2 pod is Ready', 'Shuts down one of the old v1 pods.', 'Traffic smoothly shifts'],
            ['Repeat', 'Continues rolling out 1 by 1 until all are v2.', '100% updated safely'],
            ['Wait, v2 crashes!', 'Deployment halts! Old v1 pods are kept alive.', 'Vast majority of users unaffected']
          ]
        }
      },
      {
        type: 'game',
        title: 'Terminal: The Force Multiplier',
        content: 'Apply a declarative file and scale millions of requests.',
        gameType: 'terminal',
        gameData: {
          startText: 'k8s-admin@k8s-master:~/configs$ ',
          steps: [
            {
              instruction: 'We have a web.yml file. Apply it to the cluster to create the Deployment. Type: kubectl apply -f web.yml',
              expectedCommand: 'kubectl apply -f web.yml',
              output: 'deployment.apps/web-deployment created'
            },
            {
              instruction: 'Let\'s check the pods it created. Type: kubectl get pods',
              expectedCommand: 'kubectl get pods',
              output: 'NAME                               READY   STATUS    RESTARTS   AGE\nweb-deployment-7bb9x               1/1     Running   0          4s\nweb-deployment-2ab4c               1/1     Running   0          4s\nweb-deployment-9zq1f               1/1     Running   0          4s'
            },
            {
              instruction: 'Traffic just spiked 10x! We need more power. Scale the deployment immediately to 10 replicas. Type: kubectl scale deployment web-deployment --replicas=10',
              expectedCommand: 'kubectl scale deployment web-deployment --replicas=10',
              output: 'deployment.apps/web-deployment scaled'
            }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'k8s-4-q1',
        question: 'Why is a declarative approach (writing YAML files) better than an imperative approach (running terminal scripts sequentially)?',
        options: [
          'Imperative approaches cannot run on Linux servers',
          'Declarative files tell K8s exactly what the END RESULT should be, allowing the system to handle the complexity, self-healing, and drift-correction automatically.',
          'Declarative approaches use less CPU',
          'Declarative files are impossible to delete'
        ],
        correct: 1,
        explanation: 'If a node dies in an imperative script, you have to write a script to detect and fix it. In a declarative system, you simply stated "I want 3 pods." The system constantly acts to make reality match that file.'
      },
      {
        id: 'k8s-4-q2',
        question: 'During a Rolling Update with a Deployment, what happens if the newly deployed v2 Pod immediately crashes?',
        options: [
          'The entire cluster reboots',
          'The update proceeds anyway, destroying all old v1 pods',
          'The Deployment halts the rollout indefinitely until human intervention, preserving the remaining v1 pods so the app doesn\'t go totally offline',
          'The database is wiped'
        ],
        correct: 2,
        explanation: 'A key feature of Deployments is that they verify "readiness" of new pods. If the new pod crashes (e.g. `CrashLoopBackOff`), the rollout stops, preventing a catastrophic 100% outage.'
      }
    ]
  },
  {
    id: 'k8s-5',
    track: 'k8s',
    order: 5,
    title: 'Services & Networking',
    subtitle: 'Connecting the dots',
    emoji: '🌐',
    duration: '25 min',
    xpReward: 150,
    sections: [
      {
        type: 'intro',
        content: 'Pods are mortal. They die, they restart, and when they do, **they get a new IP address**. If your Frontend talks to your Backend via an IP address, your app breaks the moment a pod restarts. We need a stable identifier. We need a **Service**.'
      },
      {
        type: 'concept',
        title: '🌉 What is a Service?',
        content: 'A Service creates a static, permanent IP address and a DNS name (e.g., `backend-service`) that NEVER changes. \n\nWhen traffic hits the Service, the Service acts as a load balancer, instantly forwarding the request to one of the healthy backend Pods.'
      },
      {
        type: 'flowchart',
        content: '**The Service Load Balancer**',
        diagramSteps: [
          { label: 'Frontend Pod\n(Makes Request)', icon: '📱', color: '#118ab2' },
          { label: 'Backend Service\n(Stable static IP)', icon: '🚦', color: '#ffb703' },
          { label: 'Any Healthy Pod\n(Dynamic IP)', icon: '🫛', color: '#06d6a0' }
        ]
      },
      {
        type: 'video',
        title: '📺 Services vs Ingress',
        content: 'A great visual comparison of how traffic flows internally vs from the public internet.',
        videoUrl: 'https://www.youtube.com/watch?v=7Xw2ON_lI6c'
      },
      {
        type: 'table',
        title: '🌍 Types of Services',
        content: 'Depending on who needs to make the connection:',
        tableData: {
          headers: ['Service Type', 'Who can access it?', 'Use case'],
          rows: [
            ['**ClusterIP** (Default)', 'ONLY other pods inside the cluster.', 'Your Database Service. High security.'],
            ['**NodePort**', 'External traffic, but using a weird port (30000+).', 'Quick dev tests. Unprofessional for prod.'],
            ['**LoadBalancer**', 'The entire open internet.', 'Spins up an expensive AWS/Azure Load Balancer.']
          ]
        }
      },
      {
        type: 'concept',
        title: '🚪 Enter the Ingress',
        content: 'A `LoadBalancer` service is expensive. If you have 5 web apps, you don\'t want to pay for 5 AWS Load Balancers. \n\nInstead, you deploy ONE **Ingress Controller**. It is a smart router (like Nginx) that sits at the front door. It looks at the URL requested (e.g. `myapp.com/api`) and routes the traffic to the correct internal ClusterIP service.'
      }
    ],
    quiz: [
      {
        id: 'k8s-5-q1',
        question: 'Why should you NOT hardcode the IP address of a Pod into your application configuration?',
        options: [
          'Pods do not have IP addresses',
          'Because K8s IP addresses are only 4 digits long',
          'Because Pods are ephemeral; when a pod is destroyed and recreated (which is frequent), its new replica will receive a totally different IP address.',
          'IP addresses cost money inside the cluster'
        ],
        correct: 2,
        explanation: 'K8s networking assumes constant death and rebirth. You MUST use a `Service` to abstract away the dynamic Pod IPs into a single, permanent DNS hostname.'
      },
      {
        id: 'k8s-5-q2',
        question: 'You have a backend NodeJS API pod, and a PostgreSQL database pod. Which Service type should you place in front of the PostgreSQL pod to ensure maximum security?',
        options: [
          'LoadBalancer',
          'Ingress',
          'NodePort',
          'ClusterIP'
        ],
        correct: 3,
        explanation: '`ClusterIP` completely blocks external internet traffic. Only other pods INSIDE the cluster can reach the database. This is the gold standard for backend resource security.'
      }
    ]
  },
  {
    id: 'k8s-6',
    track: 'k8s',
    order: 6,
    title: 'ConfigMaps & Secrets',
    subtitle: 'Decoupling configuration from code',
    emoji: '🔑',
    duration: '20 min',
    xpReward: 100,
    sections: [
      {
        type: 'intro',
        content: 'You should never hardcode passwords, API keys, or environment settings (like `NODE_ENV=production`) directly into your Docker images. If you do, anyone with the image has the password. Furthermore, a single image should be deployable to Dev, Staging, and Prod without modification. We need K8s objects to inject these vars dynamically.'
      },
      {
        type: 'concept',
        title: '🗺️ ConfigMaps (The Safe Stuff)',
        content: 'A **ConfigMap** is a dictionary of plain-text key-value pairs. You use them to store non-sensitive data:\n- Language toggle: `LANG=en_US`\n- Application Port: `PORT=8080`\n- UI Theme: `THEME=dark`\n\nThese can be injected into your pods as Environment Variables or mounted as physical configuration files.'
      },
      {
        type: 'concept',
        title: '🤫 Secrets (The Dangerous Stuff)',
        content: 'A **Secret** is conceptually identical to a ConfigMap, but it is explicitly designed for sensitive data (Passwords, SSH keys, TLS certificates). \n\nBy default, secrets are stored as base64-encoded strings and are loaded only into the RAM (tmpfs) of the Worker Node, ensuring they aren\'t accidentally logged or saved to a physical hard drive.'
      },
      {
        type: 'code',
        title: 'Injecting a ConfigMap into a Deployment',
        content: 'See how the Pod references the external ConfigMap object.',
        code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "debug"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  template:
    spec:
      containers:
      - name: my-app
        image: my-app:v1
        env:
        - name: K8S_LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-config   # Matches the ConfigMap name
              key: LOG_LEVEL     # Pulls the exact value "debug"`,
        language: 'yaml'
      },
      {
        type: 'tip',
        title: '💡 The "Sealed Secrets" Problem',
        content: 'Wait, if I write a Secret in a YAML file so I can `kubectl apply` it, anyone who hacks my GitHub repository can read my plaintext passwords! \nTo solve this, advanced teams use tools like **Bitnami Sealed Secrets**. It cryptographically encrypts the YAML file so it\'s perfectly safe to upload to public GitHub. Only the K8s cluster possesses the private key to decrypt it back into a real K8s Secret.'
      }
    ],
    quiz: [
      {
        id: 'k8s-6-q1',
        question: 'Why is it considered a bad practice to tightly couple configuration settings directly into a Docker image?',
        options: [
          'It creates a syntax error during Docker build',
          'It forces you to rebuild an entirely new image for every single environment (Dev, Staging, Prod), defeating the purpose of the "Build Once, Run Anywhere" philosophy.',
          'Images containing configuration data are blocked by Docker Hub',
          'It consumes massive amounts of RAM'
        ],
        correct: 1,
        explanation: 'Images should be completely stateless. The exact same image artifact that passes QA testing must be the artifact that deploys to Prod. Only the K8s ConfigMap should inject the difference (e.g. `DB_URL_PROD`).'
      },
      {
        id: 'k8s-6-q2',
        question: 'Which of the following is true about standard Kubernetes Secrets by default?',
        options: [
          'They correspond to military-grade AES-256 encryption automatically',
          'They are simply Base64-encoded, which is easily decoded. Do not commit naked Secret YAMLs to GitHub!',
          'They cannot be used as environment variables',
          'They require an immediate payment to CNCF'
        ],
        correct: 1,
        explanation: 'Base64 is an encoding format, NOT encryption. Anyone who runs `echo "cGFzc3dvcmQ=" | base64 --decode` gets the plain text password instantly.'
      }
    ]
  },
  {
    id: 'k8s-7',
    track: 'k8s',
    order: 7,
    title: 'Storage & Persistence',
    subtitle: 'Where data goes to survive',
    emoji: '💾',
    duration: '20 min',
    xpReward: 100,
    sections: [
      {
        type: 'intro',
        content: 'Just like Docker, Kubernetes Pods are entirely ephemeral. When a pod is deleted, everything on its local disk is utterly wiped out. For a frontend app this is fine. For a Database, it\'s a disaster. Kubernetes introduces a complex but brilliant dual-layer system for permanent storage.'
      },
      {
        type: 'video',
        title: '📺 Kubernetes Storage Explained',
        content: 'Understand why the PV and PVC objects are intentionally separated.',
        videoUrl: 'https://www.youtube.com/watch?v=0swOh5C3OVM'
      },
      {
        type: 'concept',
        title: '💽 Persistent Volumes (PV)',
        content: 'A PV is the actual physical representation of storage. It is an AWS EBS drive, an Azure Disk, or an NFS share pre-provisioned by your infrastructure admin. It sits in the cluster, completely separate from any pods, waiting to be used.'
      },
      {
        type: 'concept',
        title: '📜 Persistent Volume Claims (PVC)',
        content: 'A PVC is a **request** by a Pod. \n\nThink of a PV as an empty hotel room. The PVC is the reservation ticket. \nThe application developer writes a PVC saying: "I need 10GB of fast SSD storage." \nKubernetes then searches the available PVs. If it finds a match, it **Binds** them together. The Pod then mounts the PVC.'
      },
      {
        type: 'flowchart',
        content: '**Separation of Concerns: DevOps vs Devs**',
        diagramSteps: [
          { label: 'Cloud Admin\nCreates PV (100GB Disk)', icon: '☁️', color: '#118ab2' },
          { label: 'Kubernetes\n(Binding Layer)', icon: '🤝', color: '#ffb703' },
          { label: 'Developer\nRequests PVC (10GB)', icon: '📝', color: '#06d6a0' },
          { label: 'Pod\nMounts PVC', icon: '🫛', color: '#06d6a0' }
        ]
      },
      {
        type: 'game',
        title: 'Terminal: Diagnosing State',
        content: 'Common status checks every admin does.',
        gameType: 'terminal',
        gameData: {
          startText: 'k8s-admin@k8s-master:~$ ',
          steps: [
            {
              instruction: 'List your Persistent Volume Claims to see their statuses. Type: kubectl get pvc',
              expectedCommand: 'kubectl get pvc',
              output: 'NAME          STATUS    VOLUME   CAPACITY   ACCESS MODES   AGE\npg-data-pvc   Bound     pvc-x7   5Gi        RWO            10d\nminio-pvc     Pending                       RWO            2m'
            },
            {
              instruction: 'The minio-pvc is stuck in "Pending". We need clues. Describe it using the describe command. Type: kubectl describe pvc minio-pvc',
              expectedCommand: 'kubectl describe pvc minio-pvc',
              output: '...\nEvents:\n  Type     Reason              Age               From                         Message\n  ----     ------              ----              ----                         -------\n  Warning  ProvisioningFailed  12s (x4 over 2m)  persistentvolume-controller  no volume plugin matched'
            }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'k8s-7-q1',
        question: 'What is the primary reason K8s splits storage into two objects (PV and PVC)?',
        options: [
          'To increase the speed of SSDs',
          'Separation of concerns: It allows Cloud Admins to deal with the exact hardware details (PV), while Developers only need to write generic requests for size and access modes (PVC).',
          'Because AWS requires it',
          'To allow K8s to compress the data automatically'
        ],
        correct: 1,
        explanation: 'A developer shouldn\'t have to know the exact ARN of an AWS disk. They just want 10GB of space. By splitting the logic, the file becomes portable. It works on AWS, and if moved to Azure, it binds to Azure disks transparently.'
      },
      {
        id: 'k8s-7-q2',
        question: 'If a PVC is stuck in the "Pending" state, what does it most likely mean?',
        options: [
          'The K8s cluster ran out of memory',
          'The Pod crashed inside',
          'Kubernetes could not find a physical volume (PV) that met the exact size and access requirements requested in the PVC.',
          'The base64 secret failed to decrypt'
        ],
        correct: 2,
        explanation: 'A claim must bind to a volume. If you ask for a 50GB fast SSD, and the cluster only has 10GB slow HDDs available, the claim stays Pending forever until an Admin provisions the right hardware.'
      }
    ]
  },
  {
    id: 'k8s-8',
    track: 'k8s',
    order: 8,
    title: 'Hands-on Labs: Playground',
    subtitle: 'Free clusters to practice safely',
    emoji: '🧪',
    duration: '45+ min',
    xpReward: 100,
    externalLink: {
      label: 'Launch Killercoda K8s Lab',
      url: 'https://killercoda.com/playgrounds/scenario/kubernetes',
      xpPrompt: 'How many Killercoda tasks did you conquer? Enter below!'
    },
    sections: [
      {
        type: 'intro',
        content: 'You cannot learn Kubernetes entirely by reading theory. You MUST use `kubectl`. The good news? You do not need to install Minikube or pay Google Cloud. Free browser-based cluster environments exist.'
      },
      {
        type: 'concept',
        title: '🌐 Tool 1: Killercoda Playgrounds',
        content: '**Killercoda** is the absolute best free Kubernetes playground. \n\n- Gives you a two-node cluster (1 Master, 1 Worker)\n- Already configured with autocomplete and right permissions\n- 100% Free, runs instantly in the browser\n\n🔗 **URL**: [https://killercoda.com](https://killercoda.com)'
      },
      {
        type: 'concept',
        title: '📚 Tool 2: K8s Official Tutorials',
        content: 'The official K8s documentation has an excellent interactive tutorial track.\n\n🔗 **URL**: [https://kubernetes.io/docs/tutorials/kubernetes-basics/](https://kubernetes.io/docs/tutorials/kubernetes-basics/)\n\n💡 **Recommended Focus:**\nDeploy an App -> Expose your app (Service) -> Scale your app -> Update your app.'
      },
      {
        type: 'tip',
        title: '🎯 The Golden Rule of Debugging',
        content: 'When things break in your lab, follow the **K8s Debugging Trinity** in this exact order:\n1. `kubectl get pods` (Are they running or crashing?)\n2. `kubectl describe pod [name]` (Look at the "Events" at the bottom for errors!)\n3. `kubectl logs [name]` (Read the actual application error stacktrace)'
      }
    ]
  },
  {
    id: 'k8s-9',
    track: 'k8s',
    order: 9,
    title: 'Final K8s Challenge',
    subtitle: 'The Helm Master Certification',
    emoji: '🥇',
    duration: '25 min',
    xpReward: 250,
    sections: [
      {
        type: 'intro',
        content: 'So you think you understand the orchestrator? Prove it. 10 deep questions covering architecture, lifecycles, and debugging edge cases.'
      }
    ],
    quiz: [
      {
        id: 'k8s-9-q1',
        question: 'Which component physically resides on the Worker Nodes (not the Control Plane)?',
        options: ['etcd database', 'Kubelet', 'Kube-apiserver', 'Controller Manager'],
        correct: 1,
        explanation: 'Kubelet is the local agent on every worker node that reports back to the master.'
      },
      {
        id: 'k8s-9-q2',
        question: 'Under normal K8s best practices, how should you scale a web application from 1 to 5 instances?',
        options: [
          'Run `kubectl run web --replicas=5`',
          'Deploy 5 separate individual Pod YAMLs',
          'Change the `replicas: 5` property in the existing Deployment YAML and `kubectl apply` it.',
          'Manually provision 4 more worker nodes'
        ],
        correct: 2,
        explanation: 'Kubernetes relies on declarative Deployments. Altering the `replicas` field in the file and reapplying it is the standard GitOps way.'
      },
      {
        id: 'k8s-9-q3',
        question: 'You type `kubectl get pods` and see a pod\'s status is `ImagePullBackOff`. What is the most likely cause?',
        options: [
          'The application script crashed with a stack trace error',
          'Kubernetes could not download the container image (perhaps a typo in the image name, or the image is perfectly private and lacks credentials)',
          'The cluster ran out of CPU resources',
          'The API server is currently offline'
        ],
        correct: 1,
        explanation: '`ImagePullBackOff` explicitly means the Container Runtime failed to pull the image from the registry (Hub/ECR). The pod hasn\'t even started executing code yet.'
      },
      {
        id: 'k8s-9-q4',
        question: 'True or False: A ClusterIP Service allows public internet users to access your frontend Pods.',
        options: ['True', 'False'],
        correct: 1,
        explanation: 'False. ClusterIP is strictly for internal cluster-only communication.'
      },
      {
        id: 'k8s-9-q5',
        question: 'What is the function of an Ingress Resource?',
        options: [
          'It deletes old containers',
          'It encrypts Secret data in etcd',
          'It acts as an intelligent Nginx/HAProxy load balancer managing external URL routing rules (e.g. sending /api traffic to the backend, and / traffic to the frontend).',
          'It manages the deployment rollout process'
        ],
        correct: 2,
        explanation: 'Ingress is a smart layer 7 router at the front of the cluster.'
      },
      {
        id: 'k8s-9-q6',
        question: 'If a worker node catches fire and completely dies, what does a Deployment controller do?',
        options: [
          'Nothing, it awaits admin commands',
          'It immediately re-creates the missing Pods by scheduling them onto surviving, healthy Worker nodes',
          'It sends an email via SendGrid',
          'It shuts down the cluster to prevent data corruption'
        ],
        correct: 1,
        explanation: 'This is the self-healing power. The controller notices 3 active pods dropped to 1, and commands the scheduler to provision 2 new ones instantly.'
      },
      {
        id: 'k8s-9-q7',
        question: 'Regarding storage, what is the role of a PVC?',
        options: [
          'To format the hard drive on a worker node',
          'To encrypt the volume data',
          'To act as a flexible "request" or "claim" ticket from the developer asking the cluster for an appropriate amount of storage.',
          'To define persistent variables'
        ],
        correct: 2,
        explanation: 'A Persistent Volume Claim (PVC) is the developer\'s abstract request for storage hardware.'
      },
      {
        id: 'k8s-9-q8',
        question: 'You type `kubectl get pods` and see a pod\'s status is `CrashLoopBackOff`. You run `kubectl logs <pod-name>`. What are you hoping to find?',
        options: [
          'Kubelet authorization failure messages',
          'Node resource starvation metrics',
          'The actual stack trace error outputted by your application crashing (e.g. Runtime Exception or DB Timeout)',
          'Docker pull errors'
        ],
        correct: 2,
        explanation: '`CrashLoopBackOff` means the container starts running, crashes, restarts, and crashes again. The `logs` command outputs the std-out/std-err of the app, revealing the code issue.'
      },
      {
        id: 'k8s-9-q9',
        question: 'Where is the safest and most proper place to store a third-party API Access Token for your application in K8s?',
        options: [
          'Hardcoded into the Docker Image',
          'As a Kubernetes ConfigMap',
          'As a Kubernetes Secret',
          'Inside the Deployment YAML as plaintext'
        ],
        correct: 2,
        explanation: 'You must use a K8s Secret. While it\'s technically similar to a ConfigMap, Secrets are mounted securely into RAM (tmpfs) on worker nodes to prevent them from landing on physical disk drives.'
      },
      {
        id: 'k8s-9-q10',
        question: 'What happens to the data inside a container\'s default writable filesystem when a naked Pod is deleted?',
        options: [
          'It is backed up to etcd',
          'It is completely and irreversibly destroyed along with the Pod',
          'It transfers instantly to the new Pod',
          'It is converted to a PV automatically'
        ],
        correct: 1,
        explanation: 'Without mounted Volumes, ALL data inside a container/pod is totally completely ephemeral.'
      }
    ]
  }
]
