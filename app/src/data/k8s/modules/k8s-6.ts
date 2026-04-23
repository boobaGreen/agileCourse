import type { Module } from '../../types'

export const k8s6: Module = {
  id: 'k8s-6',
  track: 'k8s',
  order: 6,
  title: { en: 'ConfigMaps & Secrets', it: 'ConfigMap e Secret' },
  subtitle: { en: 'Decoupling configuration from code', it: 'Disaccoppiare la configurazione dal codice' },
  emoji: '🔑',
  duration: '20 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: { en: 'You should never hardcode passwords, API keys, or environment settings (like `NODE_ENV=production`) directly into your Docker images. If you do, anyone with the image has the password. Furthermore, a single image should be deployable to Dev, Staging, and Prod without modification. We need K8s objects to inject these vars dynamically.', it: 'Non dovresti mai inserire password, chiavi API o impostazioni di ambiente (come `NODE_ENV=production`) direttamente nelle tue immagini Docker. Se lo fai, chiunque abbia l\'immagine ha la password. Inoltre, una singola immagine dovrebbe essere distribuibile in Dev, Staging e Prod senza modifiche. Abbiamo bisogno degli oggetti K8s per iniettare queste variabili dinamicamente.' }
    },
    {
      type: 'concept',
      title: { en: '🗺️ ConfigMaps (The Safe Stuff)', it: '🗺️ ConfigMap (Le cose sicure)' },
      content: { en: 'A **ConfigMap** is a dictionary of plain-text key-value pairs. You use them to store non-sensitive data:\n- Language toggle: `LANG=en_US`\n- Application Port: `PORT=8080`\n- UI Theme: `THEME=dark`\n\nThese can be injected into your pods as Environment Variables or mounted as physical configuration files.', it: 'Una **ConfigMap** è un dizionario di coppie chiave-valore in chiaro. Le usi per memorizzare dati non sensibili:\n- Lingua: `LANG=it_IT`\n- Porta dell\'applicazione: `PORT=8080`\n- Tema UI: `THEME=dark`\n\nQueste possono essere iniettate nei tuoi pod come Variabili d\'Ambiente o montate come file di configurazione fisici.' }
    },
    {
      type: 'concept',
      title: { en: '🤫 Secrets (The Dangerous Stuff)', it: '🤫 Secret (Le cose pericolose)' },
      content: { en: 'A **Secret** is conceptually identical to a ConfigMap, but it is explicitly designed for sensitive data (Passwords, SSH keys, TLS certificates). \n\nBy default, secrets are stored as base64-encoded strings and are loaded only into the RAM (tmpfs) of the Worker Node, ensuring they aren\'t accidentally logged or saved to a physical hard drive.', it: 'Un **Secret** è concettualmente identico a una ConfigMap, ma è progettato esplicitamente per dati sensibili (password, chiavi SSH, certificati TLS). \n\nPer impostazione predefinita, i secret sono memorizzati come stringhe codificate in base64 e vengono caricati solo nella RAM (tmpfs) del Nodo Worker, assicurando che non vengano loggati accidentalmente o salvati su un disco rigido fisico.' }
    },
    {
      type: 'code',
      title: { en: 'Injecting a ConfigMap into a Deployment', it: 'Iniettare una ConfigMap in un Deployment' },
      content: { en: 'See how the Pod references the external ConfigMap object.', it: 'Guarda come il Pod fa riferimento all\'oggetto ConfigMap esterno.' },
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
      title: { en: '💡 The "Sealed Secrets" Problem', it: '💡 Il problema dei "Sealed Secret"' },
      content: { en: 'Wait, if I write a Secret in a YAML file so I can `kubectl apply` it, anyone who hacks my GitHub repository can read my plaintext passwords! \nTo solve this, advanced teams use tools like **Bitnami Sealed Secrets**. It cryptographically encrypts the YAML file so it\'s perfectly safe to upload to public GitHub. Only the K8s cluster possesses the private key to decrypt it back into a real K8s Secret.', it: 'Aspetta, se scrivo un Secret in un file YAML per poter fare `kubectl apply`, chiunque entri nel mio repository GitHub può leggere le mie password in chiaro! \nPer risolvere questo problema, i team avanzati usano strumenti come **Bitnami Sealed Secrets**. Cripta crittograficamente il file YAML rendendolo perfettamente sicuro da caricare su GitHub pubblico. Solo il cluster K8s possiede la chiave privata per decriptarlo in un vero Secret K8s.' }
    },
    {
      type: 'game',
      title: { en: 'Lab: Injecting the Configuration', it: 'Lab: Iniezione della configurazione' },
      content: { en: 'In this simulation, you will apply a configuration manifest and watch it enter the cluster state. Later, this would be injected into your pods.', it: 'In questa simulazione, applicherai un manifest di configurazione e vedrai come entra nello stato del cluster. In seguito, questo verrà iniettato nei tuoi pod.' },
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
          { id: '1', instruction: { en: 'Apply the application configuration: `kubectl apply -f app-config.yaml`', it: 'Applica la configurazione dell\'applicazione: `kubectl apply -f app-config.yaml`' }, condition: 'CONFIGMAP_EXISTS:app-config' },
          { id: '2', instruction: { en: 'Verify the ConfigMap exists in the cluster: `kubectl get cm`', it: 'Verifica che la ConfigMap esista nel cluster: `kubectl get cm`' }, condition: 'CONFIGMAP_EXISTS:app-config' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-6-q1',
      question: { en: 'Why is it considered a bad practice to tightly couple configuration settings directly into a Docker image?', it: 'Perché è considerato una cattiva pratica inserire le impostazioni di configurazione direttamente in un\'immagine Docker?' },
      options: [
        { en: 'It causes a severe syntax error during the image layer compression phase', it: 'Causa un grave errore di sintassi durante la fase di compressione dei layer dell\'immagine' },
        { en: 'It forces you to rebuild an entirely new image for every single environment', it: 'Ti costringe a ricostruire un\'immagine completamente nuova per ogni singolo ambiente' },
        { en: 'Images containing any configuration data are automatically blocked by registries', it: 'Le immagini che contengono dati di configurazione vengono bloccate automaticamente dai registri' },
        { en: 'It consumes massive amounts of RAM when the container process starts', it: 'Consuma enormi quantità di RAM all\'avvio del processo del container' }
      ],
      correct: 1,
      explanation: { en: 'Images should be completely stateless. The exact same image artifact that passes QA testing must be the artifact that deploys to Prod. Only the K8s ConfigMap should inject the difference (e.g. `DB_URL_PROD`).', it: 'Le immagini dovrebbero essere completamente stateless. Lo stesso identico artefatto immagine che supera i test QA deve essere l\'artefatto distribuito in Prod. Solo la ConfigMap di K8s deve iniettare la differenza (es. `DB_URL_PROD`).' }
    },
    {
      id: 'k8s-6-q2',
      question: { en: 'Which of the following is true about standard Kubernetes Secrets by default?', it: 'Quale delle seguenti affermazioni è vera sui Secret standard di Kubernetes per impostazione predefinita?' },
      options: [
        { en: 'They are protected by military-grade AES-256 encryption automatically', it: 'Sono protetti automaticamente da crittografia AES-256 di livello militare' },
        { en: 'They are simply Base64-encoded and can be easily decoded by anyone', it: 'Sono semplicemente codificati in Base64 e possono essere facilmente decodificati da chiunque' },
        { en: 'They are strictly forbidden from being used as environment variables', it: 'È severamente vietato usarli come variabili d\'ambiente' },
        { en: 'They require an active subscription and payment to the Linux Foundation', it: 'Richiedono un abbonamento attivo e un pagamento alla Linux Foundation' }
      ],
      correct: 1,
      explanation: { en: 'Base64 is an encoding format, NOT encryption. Anyone who runs `echo "cGFzc3dvcmQ=" | base64 --decode` gets the plain text password instantly.', it: 'Base64 è un formato di codifica, NON una crittografia. Chiunque esegua `echo "cGFzc3dvcmQ=" | base64 --decode` ottiene istantaneamente la password in chiaro.' }
    }
  ]
}
