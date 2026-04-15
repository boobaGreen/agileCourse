import type { Module } from '../../types'

export const k8s6: Module = {
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
    },
    {
      type: 'game',
      title: 'Lab: Injecting the Configuration',
      content: 'In this simulation, you will apply a configuration manifest and watch it enter the cluster state. Later, this would be injected into your pods.',
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'minikube', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: [],
          configMaps: [],
          secrets: []
        },
        tasks: [
          { id: '1', instruction: 'Apply the application configuration: `kubectl apply -f app-config.yaml`', condition: 'CONFIGMAP_EXISTS:app-config' },
          { id: '2', instruction: 'Verify the ConfigMap exists in the cluster: `kubectl get cm`', condition: 'CONFIGMAP_EXISTS:app-config' }
        ]
      }
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
        'They require an payment to CNCF'
      ],
      correct: 1,
      explanation: 'Base64 is an encoding format, NOT encryption. Anyone who runs `echo "cGFzc3dvcmQ=" | base64 --decode` gets the plain text password instantly.'
    }
  ]
}
