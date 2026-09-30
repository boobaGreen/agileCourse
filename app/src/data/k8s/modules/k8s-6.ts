import type { Module } from '../../types'

export const k8s6: Module = {
  id: `k8s-6`,
  track: `k8s`,
  order: 6,
  title: { en: `ConfigMaps & Secrets`, it: `ConfigMap e Secret in Kubernetes` },
  subtitle: { en: `Decoupling configuration and sensitive data from code`, it: `Disaccoppiare configurazioni e dati sensibili dal codice` },
  emoji: `🔑`,
  duration: `25 min`,
  xpReward: 200,
  sections: [
    {
      type: `intro`,
      title: { en: `The Immutable Image Principle`, it: `Il Principio dell'Immagine Immutabile` },
      content: {
        en: `You should **NEVER hardcode passwords, API keys, or environment settings** (like \`NODE_ENV=production\` or \`DATABASE_URL\`) directly inside your Docker images.\n\n` +
            `Why is hardcoding configuration a dangerous anti-pattern?\n` +
            `1. **Security Risk**: Anyone with read access to the Docker image or repository can inspect your database credentials.\n` +
            `2. **Environment Rigidity**: If you hardcode configurations, you would have to rebuild an entire Docker image for every single environment (Dev, Staging, Production).\n\n` +
            `💡 **The Golden Rule**: The exact same Docker image artifact tested in Development must deploy to Production without modification. Only the injected configuration values should change!`,
        it: `Non dovresti **MAI inserire password, chiavi API o impostazioni di ambiente** (come \`NODE_ENV=production\` o \`DATABASE_URL\`) direttamente dentro le tue immagini Docker.\n\n` +
            `Perché hardcodare la configurazione è un grave errore di architettura?\n` +
            `1. **Rischio di Sicurezza**: Chiunque acceda all'immagine Docker o al repository può leggere le password del tuo database.\n` +
            `2. **Rigidità tra Ambienti**: Se hardcodi i valori, sei costretto a ricompilare un'immagine Docker diversa per ciascun ambiente (Dev, Staging, Produzione).\n\n` +
            `💡 **La Regola d'Oro**: Lo stesso identico artefatto immagine Docker testato in Sviluppo deve volare in Produzione senza ricompilazioni. Solo i valori di configurazione iniettati devono cambiare!`
      }
    },
    {
      type: `concept`,
      title: { en: `💡 Real-World Analogy: The Desk Notebook vs The Safe`, it: `💡 L'Analogia del Mondo Reale: L'Agenda ed la Cassaforte` },
      content: {
        en: `Kubernetes provides two specialized objects to inject configurations into running Pods:\n\n` +
            `• **🗺️ ConfigMap (The Open Agenda)**:\n` +
            `  - Stores non-sensitive plain-text settings (e.g. \`PORT=8080\`, \`LOG_LEVEL=debug\`, \`THEME=dark\`).\n` +
            `  - Visible to all developers and components in the cluster.\n\n` +
            `• **🤫 Secret (The Armored Safe)**:\n` +
            `  - Stores sensitive data (e.g. DB passwords, API tokens, SSH keys, TLS certificates).\n` +
            `  - Protected by Role-Based Access Control (RBAC) and loaded only into volatile RAM (tmpfs) on worker nodes so it is never saved to physical disk storage.`,
        it: `Kubernetes mette a disposizione due oggetti specializzati per iniettare le configurazioni nei Pod in esecuzione:\n\n` +
            `• **🗺️ ConfigMap (L'Agenda Aperta sulla Scrivania)**:\n` +
            `  - Memorizza impostazioni non sensibili in chiaro (es. \`PORT=8080\`, \`LOG_LEVEL=debug\`, \`THEME=dark\`).\n` +
            `  - Visibile a tutti gli sviluppatori e componenti del cluster.\n\n` +
            `• **🤫 Secret (La Cassaforte Blindata)**:\n` +
            `  - Memorizza dati riservati (es. password di DB, token API, chiavi SSH, certificati TLS).\n` +
            `  - Protetti dal controllo degli accessi RBAC e caricati solo nella RAM volatile (tmpfs) dei nodi worker per evitare che vengano salvati su disco fisico.`
      }
    },
    {
      type: `flowchart`,
      title: { en: `🔄 Visual Flow: Injecting Configs & Secrets into Pods`, it: `🔄 Flusso Visivo: Iniezione di ConfigMap e Secret nei Pod` },
      content: {
        en: `How Kubernetes decouples configuration from container images at runtime:`,
        it: `Come Kubernetes disaccoppia la configurazione dalle immagini dei container a runtime:`
      },
      diagramSteps: [
        { label: { en: `YAML Manifest\nConfigMap / Secret`, it: `Manifesto YAML\nConfigMap / Secret` }, icon: `📄`, color: `#118ab2` },
        { label: { en: `K8s Control Plane\nStores in Cluster Memory`, it: `K8s Control Plane\nMemorizza in Memoria Cluster` }, icon: `🧠`, color: `#ffb703` },
        { label: { en: `Running Pod Container\nInjected via ENV or File Mount`, it: `Container del Pod\nIniettato via ENV o File Montato` }, icon: `🫛`, color: `#06d6a0` }
      ]
    },
    {
      type: `concept`,
      title: { en: `🗺️ ConfigMaps: Plain-Text Configuration`, it: `🗺️ ConfigMap: Configurazione in Chiaro` },
      content: {
        en: `A **ConfigMap** is a dictionary of plain-text key-value pairs.\n\n` +
            `### Two Ways to Inject ConfigMaps into a Pod:\n` +
            `1. **As Environment Variables**: Values are injected as standard environment variables (\`process.env.PORT\` in Node.js, \`os.Getenv\` in Go).\n` +
            `2. **As Mounted Files in a Volume**: ConfigMaps can be mounted as physical files inside a directory (e.g. mounting an \`nginx.conf\` or \`application.properties\` file).\n\n` +
            `🔄 **Live Updates Behavior (Crucial for Production!)**:\n` +
            `• **Environment Variables**: Values are loaded **only once at container startup**. If you edit the ConfigMap, running containers **will NOT see the new values** unless you restart the Pod (\`kubectl rollout restart deployment\`).\n` +
            `• **Volume Mounted Files**: Files in mounted volumes are **automatically updated in real-time** by the Kubelet when the ConfigMap is modified. Applications that support hot-reloading can pick up new settings without downtime or container restarts!`,
        it: `Una **ConfigMap** è un dizionario di coppie chiave-valore in chiaro.\n\n` +
            `### Due Modi per Iniettare una ConfigMap in un Pod:\n` +
            `1. **Come Variabili d'Ambiente**: I valori vengono iniettati come normali variabili d'ambiente (\`process.env.PORT\` in Node.js, \`os.Getenv\` in Go).\n` +
            `2. **Come File Montati in un Volume**: Le ConfigMap possono essere montate come file fisici all'interno di una cartella (es. montare un file \`nginx.conf\` o \`application.properties\`).\n\n` +
            `🔄 **Comportamento degli Aggiornamenti in Tempo Reale (Fondamentale!)**:\n` +
            `• **Variabili d'Ambiente**: I valori vengono letti **solo una volta all'avvio del container**. Se aggiorni la ConfigMap, i container in esecuzione **NON vedranno i nuovi valori** a meno di riavviare il Pod (\`kubectl rollout restart deployment\`).\n` +
            `• **File Montati in un Volume**: I file montati nei volumi vengono **sincronizzati automaticamente in tempo reale** da Kubelet quando la ConfigMap viene modificata. Le applicazioni con supporto al ricaricamento a caldo (hot-reload) possono leggere la nuova configurazione senza alcun riavvio o downtime!`
      }
    },
    {
      type: `code`,
      title: { en: 'YAML Manifest: ConfigMap & Deployment Injection', it: 'Manifesto YAML: ConfigMap e Iniezione nel Deployment' },
      language: `yaml`,
      code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_PORT: "8080"
  LOG_LEVEL: "debug"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend-api
  template:
    metadata:
      labels:
        app: backend-api
    spec:
      containers:
      - name: api-container
        image: my-company/api:v1.0
        env:
        - name: PORT
          valueFrom:
            configMapKeyRef:
              name: app-config  # Points to ConfigMap name
              key: APP_PORT     # Pulls value "8080"`,
      content: {
        en: `The container receives the environment variable \`PORT=8080\` dynamically without changing the container image.`,
        it: `Il container riceve la variabile d'ambiente \`PORT=8080\` in modo dinamico senza modificare l'immagine del container.`
      }
    },
    {
      type: `concept`,
      title: { en: `🤫 Secrets: Sensitive Data & Base64 Encoding`, it: `🤫 Secret: Dati Sensibili e Codifica Base64` },
      content: {
        en: `A **Secret** is used for confidential credentials like database passwords, API tokens, or SSH keys.\n\n` +
            `⚠️ **CRITICAL WARNING: Base64 is NOT Encryption!**\n` +
            `In a Secret YAML file, values must be encoded in **Base64**. Base64 is only an encoding format, NOT encryption! Anyone who runs:\n` +
            `\`echo "cGFzc3dvcmQxMjM=" | base64 --decode\`\n` +
            `will see the plaintext string \`password123\` immediately!\n\n` +
            `🔒 **How Kubernetes Protects Secrets**: Kubernetes ensures that Secrets are loaded exclusively into the **volatile RAM (tmpfs)** of the worker node running the Pod, preventing credentials from being saved to physical hard drives or log files.`,
        it: `Un **Secret** viene usato per credenziali riservate come password di database, token API o chiavi SSH.\n\n` +
            `⚠️ **AVVERTIMENTO FONDAMENTALE: Base64 NON è Crittografia!**\n` +
            `Nel file YAML di un Secret, i valori devono essere codificati in **Base64**. Base64 è solo un formato di codifica, NON crittografia! Chiunque esegua:\n` +
            `\`echo "cGFzc3dvcmQxMjM=" | base64 --decode\`\n` +
            `vedrà immediatamente la password in chiaro \`password123\`!\n\n` +
            `🔒 **Come Kubernetes Protegge i Secret**: Kubernetes assicura che i Secret vengano caricati esclusivamente nella **RAM volatile (tmpfs)** del nodo worker su cui gira il Pod, impedendo che le credenziali vengano salvate su dischi rigidi fisici o log.`
      }
    },
    {
      type: `code`,
      title: { en: 'YAML Manifest: Secret & Deployment Injection', it: 'Manifesto YAML: Secret e Iniezione nel Deployment' },
      language: `yaml`,
      code: `apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  # Base64 string for "supersecret123"
  DB_PASSWORD: c3VwZXJzZWNyZXQxMjM=
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-api
spec:
  template:
    spec:
      containers:
      - name: api-container
        image: my-company/api:v1.0
        env:
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: DB_PASSWORD`,
      content: {
        en: `When the container starts, Kubernetes decodes the Base64 payload in memory and exposes the plaintext password into the container environment variable \`DATABASE_PASSWORD\`.`,
        it: `All'avvio del container, Kubernetes decodifica la stringa Base64 in memoria ed espone la password in chiaro nella variabile d'ambiente \`DATABASE_PASSWORD\` del container.`
      }
    },
    {
      type: `tip`,
      title: { en: `💡 Advanced GitOps: Bitnami Sealed Secrets`, it: `💡 GitOps Avanzato: Bitnami Sealed Secrets` },
      content: {
        en: `Wait! If I write a Secret in a YAML file so I can commit it to Git, anyone with access to my GitHub repository can decode my passwords with \`base64 --decode\`!\n\n` +
            `How do modern Cloud Native teams solve this?\n` +
            `They use tools like **Bitnami Sealed Secrets** or **HashiCorp Vault**:\n` +
            `1. You encrypt your Secret locally using an asymmetric public key -> creating a \`SealedSecret\` YAML file.\n` +
            `2. The \`SealedSecret\` YAML contains encrypted ciphertext and is **100% safe to commit to public GitHub**!\n` +
            `3. Only the Sealed Secrets controller running inside your private Kubernetes cluster holds the private key required to decrypt it back into a real K8s Secret.`,
        it: `Aspetta! Se scrivo un Secret in un file YAML per poter fare commit su Git, chiunque acceda al mio repository GitHub può decodificare le mie password con \`base64 --decode\`!\n\n` +
            `Come risolvono questo problema i team Cloud Native moderni?\n` +
            `Usano strumenti come **Bitnami Sealed Secrets** o **HashiCorp Vault**:\n` +
            `1. Cripti il tuo Secret in locale usando una chiave pubblica asimmetrica -> generando un file YAML \`SealedSecret\`.\n` +
            `2. Il file \`SealedSecret\` contiene testo cifrato ed è **sicuro al 100% da caricare su GitHub pubblico**!\n` +
            `3. Solo il controller dei Sealed Secrets in esecuzione all'interno del tuo cluster Kubernetes privato possiede la chiave privata per decriptarlo in un vero Secret K8s.`
      }
    },
    {
      type: `table`,
      title: { en: `📊 Comparison Table: ConfigMap vs Secret`, it: `📊 Tabella Comparativa: ConfigMap vs Secret` },
      content: { en: 'Quick reference breakdown when deciding between ConfigMaps and Secrets:', it: 'Guida di riferimento rapida per scegliere tra ConfigMap e Secret:' },
      tableData: {
        headers: [
          { en: `Feature`, it: `Caratteristica` },
          { en: `ConfigMap`, it: `ConfigMap` },
          { en: `Secret`, it: `Secret` },
          { en: `Best Practice`, it: `Regola Consigliata` }
        ],
        rows: [
          [
            { en: `**Data Format**`, it: `**Formato Dati**` },
            { en: `Plain Text`, it: `Testo in Chiaro` },
            { en: `Base64 Encoded`, it: `Stringhe Codificate Base64` },
            { en: `Never put passwords in ConfigMaps`, it: `Mai inserire password nelle ConfigMap` }
          ],
          [
            { en: `**Security Level**`, it: `**Livello Sicurezza**` },
            { en: `Standard cluster access`, it: `Accesso standard nel cluster` },
            { en: `RBAC protected + RAM tmpfs`, it: `Protetto da RBAC + RAM tmpfs` },
            { en: `Use Secrets for DB pass, OAuth, TLS`, it: `Usa Secret per DB, OAuth, certificati TLS` }
          ],
          [
            { en: `**Injection Methods**`, it: `**Metodi d'Iniezione**` },
            { en: `Environment variables or Volume files`, it: `Variabili ENV o File montati` },
            { en: `Environment variables or Volume files`, it: `Variabili ENV o File montati` },
            { en: `Mount as volume files for live reload`, it: `Monta come file per reload in tempo reale` }
          ],
          [
            { en: `**Git Storage**`, it: `**Salvataggio su Git**` },
            { en: `Safe for Version Control`, it: `Sicuro da salvare su Git` },
            { en: `Requires SealedSecrets / Vault`, it: `Richiede SealedSecrets o Vault` },
            { en: `Encrypt Secrets before committing`, it: `Cripta i Secret prima del commit` }
          ]
        ]
      }
    },
    {
      type: `tip`,
      title: { en: `⌨️ Handy kubectl CLI Commands for Configs & Secrets`, it: `⌨️ Comandi CLI Utili per ConfigMap e Secret` },
      content: {
        en: `• **Create ConfigMap from terminal**: \`kubectl create configmap app-config --from-literal=PORT=8080\`.\n` +
            `• **Create Secret from terminal**: \`kubectl create secret generic db-pass --from-literal=password=supersecret\`.\n` +
            `• **Encode string to Base64 (Linux/Mac)**: \`echo -n "mypassword" | base64\`.\n` +
            `• **Decode Base64 string**: \`echo -n "bXlwYXNzd29yZA==" | base64 --decode\`.\n` +
            `• **List active ConfigMaps**: \`kubectl get cm\` (or \`kubectl get configmap\`).\n` +
            `• **List active Secrets**: \`kubectl get secrets\`.`,
        it: `• **Crea ConfigMap da terminale**: \`kubectl create configmap app-config --from-literal=PORT=8080\`.\n` +
            `• **Crea Secret da terminale**: \`kubectl create secret generic db-pass --from-literal=password=supersecret\`.\n` +
            `• **Codifica stringa in Base64 (Linux/Mac)**: \`echo -n "mia-password" | base64\`.\n` +
            `• **Decodifica stringa Base64**: \`echo -n "bWlhLXBhc3N3b3Jk" | base64 --decode\`.\n` +
            `• **Elenca ConfigMap attive**: \`kubectl get cm\` (o \`kubectl get configmap\`).\n` +
            `• **Elenca Secret attivi**: \`kubectl get secrets\`.`
      }
    },
    {
      type: `game`,
      title: { en: `Lab: Configuration & Secrets Simulator`, it: `Lab: Simulatore di ConfigMap & Secret` },
      content: { en: 'Apply configuration manifests and inspect active ConfigMaps and Secrets in the interactive cluster.', it: 'Applica manifesti di configurazione ed ispeziona le ConfigMap ed i Secret attivi nel cluster interattivo.' },
      gameType: `k8s-sim`,
      gameData: {
        startState: {
          nodes: [{ id: `node-1`, name: `minikube`, status: `Ready` }],
          pods: [],
          services: [],
          deployments: [],
          configMaps: [],
          secrets: []
        },
        tasks: [
          {
            id: `1`,
            instruction: { en: `Apply the application configuration manifest \`app-config.yaml\``, it: `Applica il manifesto di configurazione \`app-config.yaml\`` },
            condition: `CONFIGMAP_EXISTS:app-config`,
            hints: [
              { en: `Use \`kubectl apply -f\` specifying the manifest filename.`, it: `Usa \`kubectl apply -f\` specificando il nome del file manifesto.` },
              { en: `The configuration file name is \`app-config.yaml\`.`, it: `Il nome del file di configurazione è \`app-config.yaml\`.` },
              { en: `Run: \`kubectl apply -f app-config.yaml\``, it: `Esegui: \`kubectl apply -f app-config.yaml\`` }
            ]
          },
          {
            id: `2`,
            instruction: { en: `Verify that the ConfigMap exists in the cluster (\`kubectl get cm\`)`, it: `Verifica che la ConfigMap esista nel cluster (\`kubectl get cm\`)` },
            condition: `CMD_RAN:get cm`,
            hints: [
              { en: `Use \`kubectl get\` to list active configuration objects.`, it: `Usa \`kubectl get\` per elencare gli oggetti di configurazione attivi.` },
              { en: `Use \`cm\` or \`configmaps\` as the resource type.`, it: `Usa \`cm\` o \`configmaps\` come tipo di risorsa.` },
              { en: `Run: \`kubectl get cm\``, it: `Esegui: \`kubectl get cm\`` }
            ]
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: `k8s-6-q1`,
      question: { en: `Why is it considered a bad practice to tightly couple configuration settings directly into a Docker image?`, it: `Perché è considerato un errore di architettura inserire le impostazioni di configurazione direttamente in un'immagine Docker?` },
      options: [
        { en: `It causes a severe syntax error during image layer compression`, it: `Causa un grave errore di sintassi durante la compressione dei layer dell'immagine` },
        { en: `It breaks the immutable image principle, forcing you to rebuild a new image for every environment (Dev, Staging, Prod).`, it: `Rompe il principio dell'immagine immutabile, costringendoti a ricompilare un'immagine diversa per ciascun ambiente (Dev, Staging, Prod).` },
        { en: `Images containing configuration settings are blocked by Docker Hub`, it: `Le immagini che contengono impostazioni di configurazione vengono bloccate da Docker Hub` },
        { en: `It consumes massive amounts of RAM when the container process starts`, it: `Consuma enormi quantità di RAM all'avvio del processo nel container` }
      ],
      correct: 1,
      explanation: { en: `Container images should be completely stateless and environment-agnostic. The exact same image artifact tested in QA must be deployed to Production, injecting differences via ConfigMaps and Secrets.`, it: `Le immagini container dovrebbero essere totalmente agnostiche rispetto all'ambiente. Lo stesso identico artefatto immagine testato in QA deve volare in Produzione, iniettando le differenze via ConfigMap e Secret.` }
    },
    {
      id: `k8s-6-q2`,
      question: { en: `Which of the following is true regarding standard Kubernetes Secrets by default?`, it: `Quale delle seguenti affermazioni è vera sui Secret standard di Kubernetes per impostazione predefinita?` },
      options: [
        { en: `They are protected by AES-256 military-grade encryption automatically`, it: `Sono protetti automaticamente da crittografia AES-256 di livello militare` },
        { en: `They are encoded in Base64 (NOT encrypted) and can be easily decoded by anyone with access to the YAML file.`, it: `Sono codificati in Base64 (NON crittografati) e possono essere facilmente decodificati da chiunque acceda al file YAML.` },
        { en: `They are strictly forbidden from being mounted as volumes`, it: `È severamente vietato montarli come volumi` },
        { en: `They require a paid enterprise license from the Linux Foundation`, it: `Richiedono una licenza enterprise a pagamento dalla Linux Foundation` }
      ],
      correct: 1,
      explanation: { en: `Base64 is an encoding format, NOT encryption. Anyone running echo "bXlwYXNzd29yZA==" | base64 --decode gets the plaintext password. Kubernetes protects Secrets at runtime via RBAC and RAM tmpfs mounting.`, it: `Base64 è un formato di codifica, NON crittografia. Chiunque esegua echo "bWlhcGFzc3dvcmQ=" | base64 --decode legge la password. Kubernetes protegge i Secret a runtime tramite RBAC e montaggio in RAM volatile tmpfs.` }
    },
    {
      id: `k8s-6-q3`,
      question: { en: `How are ConfigMaps and Secrets injected into container processes inside a Pod?`, it: `Come vengono iniettati i dati di ConfigMap e Secret nei processi dei container all'interno di un Pod?` },
      options: [
        { en: `As Environment Variables (env) or mounted as physical text files in a Volume directory`, it: `Come Variabili d'Ambiente (env) o montati come file di testo fisici in una cartella di Volume` },
        { en: `Only by sending HTTP REST requests to port 6443 on the API server`, it: `Solo inviando richieste HTTP REST alla porta 6443 dell'API server` },
        { en: `They are compiled directly into the binary executable during the build phase`, it: `Vengono compilati direttamente nell'eseguibile binario durante la fase di build` },
        { en: `Only via manual SSH connections by root administrators`, it: `Solo tramite connessioni SSH manuali da parte degli amministratori root` }
      ],
      correct: 0,
      explanation: { en: `Kubernetes allows injecting key-value pairs from ConfigMaps and Secrets as environment variables inside container specs or mounting them as files in a volume directory.`, it: `Kubernetes permette di iniettare le coppie chiave-valore di ConfigMap e Secret come variabili d'ambiente dentro le specifiche dei container oppure montandole come file in una cartella di volume.` }
    },
    {
      id: `k8s-6-q4`,
      question: { en: `How do Cloud Native teams safely store Secret manifest files in public Git repositories without exposing plain passwords?`, it: `Come fanno i team Cloud Native a salvare in sicurezza i file di manifesto dei Secret nei repository Git pubblici senza esporre le password in chiaro?` },
      options: [
        { en: `By deleting the Git commit history after every push`, it: `Eliminando lo storico dei commit Git dopo ogni push` },
        { en: `Using tools like Bitnami Sealed Secrets or HashiCorp Vault to cryptographically encrypt the YAML payload before committing.`, it: `Usando strumenti come Bitnami Sealed Secrets o HashiCorp Vault per cifrare crittograficamente il contenuto YAML prima del commit.` },
        { en: `By renaming the file extension from .yaml to .txt`, it: `Rinominando l'estensione del file da .yaml a .txt` },
        { en: `Git repositories automatically encrypt all uploaded files`, it: `I repository Git cifrano automaticamente tutti i file caricati` }
      ],
      correct: 1,
      explanation: { en: `Tools like Bitnami Sealed Secrets use asymmetric public key cryptography to encrypt Secret payloads into SealedSecrets. The encrypted YAML can be safely stored on GitHub, and only the cluster holds the private key to decrypt it.`, it: `Strumenti come Bitnami Sealed Secrets usano la crittografia a chiave pubblica per cifrare i dati dei Secret in SealedSecret. Il file YAML cifrato può essere salvato in sicurezza su GitHub e solo il cluster possiede la chiave privata per decriptarlo.` }
    },
    {
      id: `k8s-6-q5`,
      question: { en: `What happens when you update a ConfigMap mounted as a Volume inside a Pod versus one injected as Environment Variables?`, it: `Cosa succede quando aggiorni una ConfigMap montata come Volume all'interno di un Pod rispetto a una iniettata come Variabili d'Ambiente?` },
      options: [
        { en: `Volume mounted files update automatically inside the container; Environment variables require restarting the Pod.`, it: `I file montati come Volume si aggiornano automaticamente nel container; le Variabili d'Ambiente richiedono il riavvio del Pod.` },
        { en: `Environment variables update live, while Volume mounted files require a cluster reboot`, it: `Le variabili d'ambiente si aggiornano dal vivo, mentre i file dei volumi richiedono un riavvio del cluster` },
        { en: `Neither method allows updating configurations after deployment`, it: `Nessuno dei due metodi consente di aggiornare le configurazioni dopo il deployment` },
        { en: `ConfigMaps automatically reboot all worker nodes upon any update`, it: `Le ConfigMap riavviano automaticamente tutti i nodi worker ad ogni aggiornamento` }
      ],
      correct: 0,
      explanation: { en: `Mounted volume files are continuously synchronized by Kubelet when the ConfigMap changes. Environment variables are evaluated only once at container startup and require a Pod restart/rollout to refresh.`, it: `I file nei volumi montati vengono sincronizzati continuamente da Kubelet al cambiare della ConfigMap. Le variabili d'ambiente vengono valutate solo una volta all'avvio del container e richiedono il riavvio/rollout del Pod per aggiornarsi.` }
    }
  ]
}
