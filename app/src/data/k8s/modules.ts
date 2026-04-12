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
        type: 'intro',
        content: 'Docker gave us the ship (the container). But what if you have ten thousand ships? You need a captain to coordinate them, scale them, and fix them when they break. That captain is Kubernetes.'
      },
      {
        type: 'concept',
        title: '🚢 The Orchestrator',
        content: 'Kubernetes (often called **K8s**) is an open-source platform for automating deployment, scaling, and management of containerized applications. It groups containers that make up an application into logical units for easy management and discovery.'
      },
      {
        type: 'analogy',
        title: '🎼 The Orchestra Conductor',
        content: 'Imagine an orchestra. Every musician is a container. They know how to play their instrument. But without a **conductor**, they won\'t play in sync, and if a violinist gets sick, the show stops. The conductor (K8s) makes sure everyone plays together and brings in a new musician if someone fails.'
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
        type: 'concept',
        title: '🧠 Control Plane vs Worker Nodes',
        content: '- **Control Plane (The Brain)**: Manages the cluster via several components:\n  - **etcd**: The source of truth. A database that stores all cluster configurations.\n  - **kube-scheduler**: Decides which worker node should run a new pod.\n  - **API Server**: The communication hub for everything in the cluster.\n- **Worker Nodes (The Muscle)**: Actually run the containers. If the brain (Control Plane) goes down, pods keep running, but you cannot change the cluster state until it recovers.'
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
        type: 'concept',
        title: '🔄 Rolling Updates',
        content: 'Deployments allow you to update your app with **zero downtime**. K8s starts a new version pods one by one, and only kills the old ones once the new ones are ready and healthy.'
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
        type: 'tip',
        title: '📈 Autoscaling with HPA',
        content: 'Kubernetes can scale automatically based on usage. The **Horizontal Pod Autoscaler (HPA)** monitors CPU or memory and increases/decreases the number of pod replicas (horizontal scaling) to match the load.'
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
        content: 'A Service is an abstraction that defines a logical set of Pods and a policy by which to access them. It provides a **stable IP and DNS name**. You talk to the Service, and it load-balances the traffic to the healthy Pods behind it.'
      },
      {
        type: 'concept',
        title: '🏗️ Types of Services',
        content: '1. **ClusterIP** (Default): Internal only. Used for Backend/DB.\n2. **NodePort**: Exposes the service on a static port on every Node\'s IP.\n3. **LoadBalancer**: Links to a cloud provider\'s load balancer (AWS/GCP/Azure) to expose the app to the internet.'
      },
      {
        type: 'tip',
        title: '🌐 Ingress',
        content: 'If you have many services, giving each one an expensive cloud LoadBalancer is wasteful. An **Ingress** acts as a Smart Router (like NGINX) that handles multiple services behind one IP based on the URL path (e.g., `/api` goes to service A, `/` goes to service B).'
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
        type: 'tip',
        title: '💡 Best Practice',
        content: 'Use ConfigMaps/Secrets so you can use the **exact same Docker image** for Development, Staging, and Production. Only the K8s objects (and their values) change between environments.'
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
    title: 'Interacting with K8s',
    subtitle: 'kubectl: The Swiss Army Knife of K8s',
    emoji: '🛠️',
    duration: '12 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'How do you actually talk to the cluster? You use **kubectl** (pronounced "kube-control" or "kube-cuttle"). It\'s the command-line tool for communicating with the K8s API server.'
      },
      {
        type: 'code',
        title: 'Essential Commands',
        content: 'The basics of inspection and debugging:',
        code: `# See all pods
kubectl get pods

# Get detailed info about a specific pod
kubectl describe pod [pod-name]

# Check logs for a crashing app
kubectl logs [pod-name]

# Open a shell inside a container
kubectl exec -it [pod-name] -- /bin/bash

# Apply a YAML configuration
kubectl apply -f deployment.yaml

# Delete everything in a file
kubectl delete -f deployment.yaml`,
        language: 'bash'
      },
      {
        type: 'tip',
        title: '🎮 Hands-on Platform: Killercoda',
        content: 'Ready to try it for real? We recommend **Killercoda** for interactive scenarios. It provides a real Kubernetes cluster in the browser for free. Start with the "Kubernetes Basics" scenarios!'
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
      }
    ]
  }
]
