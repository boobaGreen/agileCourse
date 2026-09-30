import type { Module } from '../../types'

export const k8s5: Module = {
  id: `k8s-5`,
  track: `k8s`,
  order: 5,
  title: { en: `Services & Networking`, it: `Service e Networking in Kubernetes` },
  subtitle: { en: `Connecting the dots: ClusterIP, Headless, NodePort, LoadBalancer & Ingress`, it: `Unire i punti: ClusterIP, Headless, NodePort, LoadBalancer ed Ingress` },
  emoji: `🌐`,
  duration: `30 min`,
  xpReward: 200,
  sections: [
    {
      type: `intro`,
      title: { en: `Pods are Ephemeral: The Dynamic IP Problem`, it: `I Pod sono Effimeri: Il Problema degli Indirizzi IP Dinamici` },
      content: {
        en: `In Kubernetes, **Pods are mortal**. They die, crash, get replaced by Deployment updates, or move to different nodes. Every time a Pod restarts, **it receives a brand new internal IP address**.\n\n` +
            `💡 **Real-World Analogy: The Hotel Receptionist**\n` +
            `Imagine an office where employees (Pods) change desks and phone numbers every single day. If clients tried to call an employee directly on their private extension (Pod IP), calls would fail constantly. You need a **central fixed phone number (a Service)** that routes incoming calls to whichever employee is sitting at a desk right now!\n\n` +
            `You can view current Pod IP addresses with \`kubectl get pod -o wide\`. But hardcoding these Pod IPs into your microservice code is an architectural disaster. We need a **Kubernetes Service**.`,
        it: `In Kubernetes, **i Pod sono mortali**. Muoiono, vanno in crash, vengono sostituiti dagli aggiornamenti dei Deployment o spostati su nodi diversi. Ogni volta che un Pod si riavvia, **riceve un nuovo indirizzo IP interno**.\n\n` +
            `💡 **L'Analogia del Mondo Reale: Il Centralino dell'Hotel**\n` +
            `Immagina un'azienda in cui gli impiegati (i Pod) cambiano scrivania e numero di telefono ogni giorno. Se i clienti provassero a chiamare gli impiegati direttamente al loro cellulare privato (IP del Pod), la linea cadrebbe in continuazione. Serve un **Centralino unico con numero fisso (il Service)** che smista la chiamata a qualsiasi impiegato sia presente in quel momento!\n\n` +
            `Puoi vedere gli IP attuali dei Pod eseguendo \`kubectl get pod -o wide\`. Ma inserire questi IP direttamente nel codice è un disastro architetturale. Abbiamo bisogno di un **Kubernetes Service**.`
      }
    },
    {
      type: `video`,
      title: { en: `📺 Services vs Ingress in Action`, it: `📺 Service vs Ingress Spiegati Visivamente` },
      content: {
        en: `Watch this excellent visual breakdown of how internal cluster traffic flows from Pods to Services, and how Ingress sits at the front door of your cloud architecture.`,
        it: `Guarda questo fantastico video esplicativo visivo che mostra come il traffico fluisce dai Pod ai Service e come l'Ingress gestisce gli accessi da Internet.`
      },
      videoUrl: `https://www.youtube.com/watch?v=T4Z7visMM4E`
    },
    {
      type: `concept`,
      title: { en: `🌉 What is a Kubernetes Service? (Selector & targetPort)`, it: `🌉 Cos'è un Kubernetes Service? (Selector e targetPort)` },
      content: {
        en: `A **Service** creates a permanent, virtual IP address and an internal DNS name (e.g. \`backend-service\`) that **NEVER changes**.\n\n` +
            `### How a Service Maps Traffic to Pods:\n` +
            `• **\`selector\`**: A key-value tag (e.g. \`app: backend-api\`) used by the Service to find matching healthy Pods.\n` +
            `• **\`port\`**: The port exposed by the Service itself inside the cluster (e.g. port \`80\`).\n` +
            `• **\`targetPort\`**: The port where your application container inside the Pod is actually listening (e.g. port \`8080\` for Node.js/Java).\n` +
            `• **\`nodePort\`**: Optional static port opened on every cluster node (range **30000-32767**).`,
        it: `Un **Service** crea un indirizzo IP virtuale permanente e un nome DNS interno (es. \`backend-service\`) che **NON cambia mai**.\n\n` +
            `### Come un Service Mappa il Traffico sui Pod:\n` +
            `• **\`selector\`**: Un'etichetta chiave-valore (es. \`app: backend-api\`) usata dal Service per trovare i Pod sani associati.\n` +
            `• **\`port\`**: La porta esposta dal Service stesso all'interno del cluster (es. porta \`80\`).\n` +
            `• **\`targetPort\`**: La porta effettiva su cui ascolta il container dell'applicazione dentro il Pod (es. porta \`8080\` per Node.js/Java).\n` +
            `• **\`nodePort\`**: Porta statica opzionale aperta su ogni nodo del cluster (range **30000-32767**).`
      }
    },
    {
      type: `flowchart`,
      title: { en: `🔄 Visual Flow: Service -> Selector -> Pod Containers`, it: `🔄 Flusso Visivo: Service -> Selector -> Pod Container` },
      content: {
        en: `Traffic flow from a client Pod through the Service to container target ports:`,
        it: `Percorso del traffico da un Pod client attraverso il Service fino alla targetPort del container:`
      },
      diagramSteps: [
        { label: { en: `Frontend Pod\nRequests: http://backend-svc:80`, it: `Pod Frontend\nRichiede: http://backend-svc:80` }, icon: `📱`, color: `#118ab2` },
        { label: { en: `Backend Service (ClusterIP: 10.96.42.10)\nSelector: app=backend-api`, it: `Service Backend (ClusterIP: 10.96.42.10)\nSelector: app=backend-api` }, icon: `🚦`, color: `#ffb703` },
        { label: { en: `Healthy Backend Pod\nTargetPort: 8080 (10.244.0.14)`, it: `Pod Backend Sano\nTargetPort: 8080 (10.244.0.14)` }, icon: `🫛`, color: `#06d6a0` }
      ]
    },
    {
      type: `code`,
      title: { en: `YAML Manifest: ClusterIP Service Example`, it: `Manifesto YAML: Esempio di Service ClusterIP` },
      language: `yaml`,
      code: `apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: ClusterIP      # Default internal cluster service
  selector:
    app: backend-api   # Matches pods with label app: backend-api
  ports:
    - protocol: TCP
      port: 80         # Port exposed on backend-service
      targetPort: 8080 # Port listening inside the app container`,
      content: {
        en: `Any Pod in the cluster making a request to \`http://backend-service:80\` will be load balanced to port \`8080\` of any healthy Pod with label \`app: backend-api\`.`,
        it: `Qualsiasi Pod nel cluster che effettua una richiesta a \`http://backend-service:80\` verrà bilanciato sulla porta \`8080\` di uno dei Pod sani con etichetta \`app: backend-api\`.`
      }
    },
    {
      type: `concept`,
      title: { en: `🔒 ClusterIP vs Headless Services (\`clusterIP: None\`)`, it: `🔒 ClusterIP vs Headless Service (\`clusterIP: None\`)` },
      content: {
        en: `### 1. ClusterIP (Default)\n` +
            `Creates a single internal IP address visible ONLY inside the Kubernetes cluster. External internet users cannot reach ClusterIP services. Perfect for databases, Redis caches, and internal microservices.\n\n` +
            `### 2. Headless Service (\`clusterIP: None\`)\n` +
            `What if you do NOT want a single load balancing IP in front of your Pods?\n` +
            `By setting \`clusterIP: None\` in your YAML manifest, you create a **Headless Service**.\n\n` +
            `💡 **How Headless Services Work**:\n` +
            `Instead of allocating a Virtual IP, Kubernetes CoreDNS responds to DNS queries with a list of **individual Pod IPs directly** (the same dynamic IPs visible in \`kubectl get pod -o wide\`).\n\n` +
            `🎯 **Real-World Headless Use Cases**:\n` +
            `• **StatefulSets & Database Clusters**: MongoDB primary/secondary nodes, Kafka brokers, Cassandra peers where nodes need direct peer-to-peer discovery.\n` +
            `• **Client-Side Load Balancing**: Applications managing gRPC connections or custom connection pools directly.`,
        it: `### 1. ClusterIP (Predefinito)\n` +
            `Crea un IP interno unico visibile SOLO all'interno del cluster Kubernetes. Gli utenti esterni da Internet non possono raggiungere i servizi ClusterIP. Perfetto per database, cache Redis e microservizi interni.\n\n` +
            `### 2. Headless Service (\`clusterIP: None\`)\n` +
            `E se NON volessi un IP unico di bilanciamento davanti ai tuoi Pod?\n` +
            `Impostando \`clusterIP: None\` nel manifesto YAML, crei un **Headless Service**.\n\n` +
            `💡 **Come Funziona un Headless Service**:\n` +
            `Invece di assegnare un IP virtuale centrale, il DNS di Kubernetes (CoreDNS) risponde fornendo direttamente **l'elenco degli IP individuali di ciascun Pod** (gli stessi IP mostrati da \`kubectl get pod -o wide\`).\n\n` +
            `🎯 **Casi d'Uso Reali per i Servizi Headless**:\n` +
            `• **StatefulSets e Cluster di Database**: Nodi MongoDB primary/secondary, broker Kafka, nodi Cassandra che devono comunicare direttamente peer-to-peer.\n` +
            `• **Load Balancing lato Client**: Applicazioni che gestiscono connessioni gRPC o pool di connessioni in modo autonomo.`
      }
    },
    {
      type: `code`,
      title: { en: `YAML Manifest: Headless Service Example (\`clusterIP: None\`)`, it: `Manifesto YAML: Esempio Headless Service (\`clusterIP: None\`)` },
      language: `yaml`,
      code: `apiVersion: v1
kind: Service
metadata:
  name: kafka-headless
spec:
  clusterIP: None        # 👈 Makes the service Headless!
  selector:
    app: kafka-broker
  ports:
    - port: 9092
      targetPort: 9092`,
      content: {
        en: `Querying \`kafka-headless\` via DNS returns all individual Pod IPs directly without passing through a central load balancer.`,
        it: `Interrogare \`kafka-headless\` via DNS restituisce direttamente gli IP di ciascun Pod senza passare da un bilanciatore centrale.`
      }
    },
    {
      type: `concept`,
      title: { en: `⚡ Exposing Apps: NodePort vs LoadBalancer`, it: `⚡ Esposizione Esterna: NodePort vs LoadBalancer` },
      content: {
        en: `### 3. NodePort\n` +
            `Exposes the service on **every Worker Node's IP address** on a static port allocated from the range **30000 - 32767**.\n\n` +
            `⚠️ **Why NodePort is NOT SECURE for Production!**:\n` +
            `1. **Direct Infrastructure Exposure**: External traffic hits physical/virtual worker node IP addresses directly.\n` +
            `2. **Weird High Ports**: End-users must append weird port numbers in browser URLs (e.g. \`http://198.51.100.5:30452\`).\n` +
            `3. **No Native SSL/TLS Management**: Managing HTTPS certificates at node level is dangerous and complex.\n` +
            `4. **Security Vulnerability**: Bypasses perimeter firewalls and centralized cluster ingress security.\n\n` +
            `### 4. LoadBalancer\n` +
            `Integrates directly with cloud providers (AWS ELB/NLB, GCP Cloud Load Balancing, Azure LB) to provision an external public IP address (\`203.0.113.45\`).\n\n` +
            `💰 **Drawback**: Creating a cloud \`LoadBalancer\` for every single internal microservice is extremely expensive!`,
        it: `### 3. NodePort\n` +
            `Espone il servizio sull'**IP di ogni Nodo Worker** su una porta statica scelta nel range **30000 - 32767**.\n\n` +
            `⚠️ **Perché NodePort NON è SICURO per la Produzione!**:\n` +
            `1. **Esposizione Diretta dell'Infrastruttura**: Il traffico esterno colpisce direttamente gli IP dei nodi worker.\n` +
            `2. **Porte Alte Non Standard**: Gli utenti devono digitare porte strane nel browser (es. \`http://198.51.100.5:30452\`).\n` +
            `3. **Nessuna Gestione SSL/TLS Nativa**: Gestire i certificati HTTPS a livello di porta del nodo è rischioso e complesso.\n` +
            `4. **Vulnerabilità di Sicurezza**: Bypassa i firewall perimetrali e le regole centralizzate del cluster.\n\n` +
            `### 4. LoadBalancer\n` +
            `Si integra con i Cloud Provider (AWS ELB, GCP Cloud Load Balancing, Azure LB) fornendo un IP pubblico esterno (\`203.0.113.45\`).\n\n` +
            `💰 **Svantaggio**: Creare un \`LoadBalancer\` Cloud per ogni singolo microservizio è molto costoso!`
      }
    },
    {
      type: `flowchart`,
      title: { en: `🌐 Visual Flow: NodePort Traffic`, it: `🌐 Flusso Visivo: Traffico NodePort` },
      content: {
        en: `How internet traffic reaches a Pod via a NodePort:`,
        it: `Come il traffico internet raggiunge un Pod tramite la NodePort:`
      },
      diagramSteps: [
        { label: { en: `Internet User\nhttp://node-ip:30123`, it: `Utente Internet\nhttp://node-ip:30123` }, icon: `🌐`, color: `#e76f51` },
        { label: { en: `Worker Node IP\nListens on Port 30123`, it: `IP Nodo Worker\nAscolta sulla Porta 30123` }, icon: `🖥️`, color: `#ffb703` },
        { label: { en: `Target Pod Container\nTargetPort: 80`, it: `Container Pod Target\nTargetPort: 80` }, icon: `🫛`, color: `#06d6a0` }
      ]
    },
    {
      type: `concept`,
      title: { en: `🚪 Enter Ingress: Smart L7 Gateway & Huge Cost Savings`, it: `🚪 Entra l'Ingress: Portinaio Intelligente di Layer 7 e Risparmio Costi` },
      content: {
        en: `💡 **Real-World Analogy: The Apartment Concierge**\n` +
            `Instead of paying 10 security guards for 10 separate doors (10 LoadBalancers), you hire **ONE Concierge (Ingress Controller)** at the front main entrance of the building. The concierge reads the envelope address (\`api.company.com\` or \`/api\`) and guides visitors to the exact internal apartment (ClusterIP Service).\n\n` +
            `### Key Ingress Features:\n` +
            `• **Host-Based Routing**: \`api.company.com\` -> \`api-svc\` vs \`app.company.com\` -> \`frontend-svc\`.\n` +
            `• **Path-Based Routing**: \`company.com/api\` -> \`api-svc\` vs \`company.com/docs\` -> \`docs-svc\`.\n` +
            `• **Centralized TLS/SSL**: Automatic HTTPS certificates for all domain names via Let's Encrypt / Cert-Manager.\n` +
            `• **Single Cloud LB**: You pay for only 1 Cloud LoadBalancer in front of the Ingress Controller!`,
        it: `💡 **L'Analogia del Mondo Reale: Il Portinaio del Condominio**\n` +
            `Invece di pagare 10 guardie giurate per 10 porte diverse (10 LoadBalancer), ingaggi **UN SOLO Portinaio (Ingress Controller)** all'ingresso principale dell'edificio. Il portinaio legge la busta (\`api.company.com\` o \`/api\`) e accompagna i visitatori all'appartamento interno corretto (Service ClusterIP).\n\n` +
            `### Caratteristiche Chiave dell'Ingress:\n` +
            `• **Routing per Host**: \`api.company.com\` -> \`api-svc\` vs \`app.company.com\` -> \`frontend-svc\`.\n` +
            `• **Routing per Path**: \`company.com/api\` -> \`api-svc\` vs \`company.com/docs\` -> \`docs-svc\`.\n` +
            `• **TLS/SSL Centralizzato**: Certificati HTTPS automatici per tutti i domini via Cert-Manager / Let's Encrypt.\n` +
            `• **Un Solo LoadBalancer Cloud**: Paghi un solo LoadBalancer Cloud davanti all'Ingress Controller!`
      }
    },
    {
      type: `code`,
      title: { en: `YAML Manifest: Ingress Rule Example`, it: `Manifesto YAML: Esempio di Regola Ingress` },
      language: `yaml`,
      code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
spec:
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service    # Routes to internal ClusterIP Service
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service   # Routes to internal ClusterIP Service
            port:
              number: 80`,
      content: {
        en: `The Ingress Controller intercepts external HTTP traffic for \`myapp.com\`, routing \`/api\` requests to \`backend-service\` and all other requests to \`frontend-service\`.`,
        it: `L'Ingress Controller intercetta il traffico HTTP per \`myapp.com\`, instradando \`/api\` al \`backend-service\` e tutte le altre richieste al \`frontend-service\`.`
      }
    },
    {
      type: `table`,
      title: { en: `📊 Service Types Comparison Table`, it: `📊 Tabella Comparativa dei Tipi di Service` },
      content: { en: `Quick reference guide for Kubernetes networking options:`, it: `Guida di riferimento rapida per le opzioni di networking Kubernetes:` },
      tableData: {
        headers: [
          { en: `Type`, it: `Tipo` },
          { en: `IP & Access`, it: `IP e Accesso` },
          { en: `Use Case`, it: `Caso d'Uso` },
          { en: `Security & Cost`, it: `Sicurezza & Costi` }
        ],
        rows: [
          [
            { en: `**ClusterIP** (Default)`, it: `**ClusterIP** (Default)` },
            { en: `Internal Cluster IP only`, it: `Solo IP Interno al Cluster` },
            { en: `Databases, internal microservices`, it: `Database, microservizi interni` },
            { en: `🟢 Highest Security / Free`, it: `🟢 Massima Sicurezza / Gratuito` }
          ],
          [
            { en: `**Headless** (\`clusterIP: None\`)`, it: `**Headless** (\`clusterIP: None\`)` },
            { en: `No Cluster IP (DNS lists Pod IPs)`, it: `Nessun IP Unico (DNS con IP dei Pod)` },
            { en: `StatefulSets (Kafka, MongoDB, Cassandra)`, it: `StatefulSets (Kafka, MongoDB, Cassandra)` },
            { en: `🟢 High Security / Free`, it: `🟢 Alta Sicurezza / Gratuito` }
          ],
          [
            { en: `**NodePort**`, it: `**NodePort**` },
            { en: `Node IP + Port (30000-32767)`, it: `IP del Nodo + Porta (30000-32767)` },
            { en: `Quick local dev tests`, it: `Test veloci locali in dev` },
            { en: `🔴 **UNSECURE** / Exposes Nodes`, it: `🔴 **NON SICURO** / Espone Nodi` }
          ],
          [
            { en: `**LoadBalancer**`, it: `**LoadBalancer**` },
            { en: `External Cloud Public IP`, it: `IP Pubblico Cloud Esterno` },
            { en: `Single public entrypoint`, it: `Punto di ingresso pubblico` },
            { en: `🟡 Secure / 💰 Expensive per Service`, it: `🟡 Sicuro / 💰 Costoso per Service` }
          ],
          [
            { en: `**Ingress Controller**`, it: `**Ingress Controller**` },
            { en: `1 Public LB -> L7 Host/Path Router`, it: `1 LB Pubblico -> Router L7 Host/Path` },
            { en: `Production multi-domain/path apps`, it: `App multi-dominio/path in produzione` },
            { en: `🟢 Top Security / 💰 Highly Cost-Effective`, it: `🟢 Massima Sicurezza / 💰 Economico` }
          ]
        ]
      }
    },
    {
      type: `tip`,
      title: { en: `💡 Useful CLI Diagnostics & Tips`, it: `💡 Comandi Utili per l'Ispezione ed il Debugging` },
      content: {
        en: `• **Inspect dynamic Pod IPs**: \`kubectl get pod -o wide\` (shows assigned Pod IP and worker host node).\n` +
            `• **Inspect active cluster services**: \`kubectl get svc\` (or \`kubectl get service\` - displays Cluster-IP, External-IP, and Ports).\n` +
            `• **Expose deployment via CLI**: \`kubectl expose deployment web-deployment --type=LoadBalancer --port=80\`.\n` +
            `• **Cross-Namespace FQDN Routing**: To reach a service in another namespace, use: \`<service-name>.<namespace>.svc.cluster.local\`.`,
        it: `• **Ispeziona IP dinamici dei Pod**: \`kubectl get pod -o wide\` (mostra l'IP del Pod ed il nodo ospite).\n` +
            `• **Ispeziona i servizi attivi**: \`kubectl get svc\` (o \`kubectl get service\` - mostra Cluster-IP, External-IP e Porte).\n` +
            `• **Esponi un deployment via CLI**: \`kubectl expose deployment web-deployment --type=LoadBalancer --port=80\`.\n` +
            `• **Routing FQDN tra Namespace**: Per contattare un servizio in un altro namespace, usa: \`<nome-servizio>.<namespace>.svc.cluster.local\`.`
      }
    },
    {
      type: `game`,
      title: { en: `Lab: Services & Networking Simulator`, it: `Lab: Simulatore di Service & Networking` },
      content: { en: `Inspect dynamic Pod IPs, check existing services, and expose your app using kubectl commands.`, it: `Ispeziona gli IP dinamici dei Pod, controlla i servizi esistenti ed esponi la tua applicazione usando comandi kubectl.` },
      gameType: `k8s-sim`,
      gameData: {
        startState: {
          nodes: [{ id: `node-1`, name: `worker-minikube`, status: `Ready` }],
          pods: [
            { id: `web-1`, name: `web-7bb9x`, node: `node-1`, status: `Running`, labels: { app: `web` } },
            { id: `web-2`, name: `web-2ab4c`, node: `node-1`, status: `Running`, labels: { app: `web` } }
          ],
          services: [],
          deployments: [
            { id: `dep-web`, name: `web-deployment`, replicas: 2, selector: { app: `web` } }
          ]
        },
        tasks: [
          {
            id: `1`,
            instruction: { en: `Inspect running pods with extended details including dynamic IPs (\`kubectl get pod -o wide\`)`, it: `Ispeziona i pod in esecuzione con dettagli estesi inclusi gli IP dinamici (\`kubectl get pod -o wide\`)` },
            condition: `CMD_RAN:get pod -o wide`,
            hints: [
              { en: `Use \`kubectl get pod\` and append \`-o wide\`.`, it: `Usa \`kubectl get pod\` ed aggiungi \`-o wide\`.` },
              { en: `The \`-o wide\` flag displays assigned Pod IPs and host nodes.`, it: `Il flag \`-o wide\` mostra gli IP assegnati ai Pod ed i nodi ospiti.` },
              { en: `Run: \`kubectl get pod -o wide\``, it: `Esegui: \`kubectl get pod -o wide\`` }
            ]
          },
          {
            id: `2`,
            instruction: { en: `Expose \`web-deployment\` as a LoadBalancer service on port 80`, it: `Esponi \`web-deployment\` come servizio LoadBalancer sulla porta 80` },
            condition: `SERVICE_EXISTS:web-deployment`,
            hints: [
              { en: `Use \`kubectl expose deployment web-deployment\`.`, it: `Usa \`kubectl expose deployment web-deployment\`.` },
              { en: `Add flags \`--type=LoadBalancer\` and \`--port=80\`.`, it: `Aggiungi i flag \`--type=LoadBalancer\` e \`--port=80\`.` },
              { en: `Run: \`kubectl expose deployment web-deployment --type=LoadBalancer --port=80\``, it: `Esegui: \`kubectl expose deployment web-deployment --type=LoadBalancer --port=80\`` }
            ]
          },
          {
            id: `3`,
            instruction: { en: `Check active cluster services to verify external IP and ports (\`kubectl get svc\`)`, it: `Controlla i servizi attivi nel cluster per verificare l'IP esterno e le porte (\`kubectl get svc\`)` },
            condition: `CMD_RAN:get svc`,
            hints: [
              { en: `Use \`kubectl get\` to list cluster endpoints.`, it: `Usa \`kubectl get\` per elencare gli endpoint di rete del cluster.` },
              { en: `Use \`svc\` or \`service\` as the resource name.`, it: `Usa \`svc\` o \`service\` come nome della risorsa.` },
              { en: `Run: \`kubectl get svc\``, it: `Esegui: \`kubectl get svc\`` }
            ]
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: `k8s-5-q1`,
      question: { en: `Why should you NEVER hardcode the IP address of a Pod into microservice configurations?`, it: `Perché NON dovresti mai inserire l'indirizzo IP di un Pod nelle configurazioni di un microservizio?` },
      options: [
        { en: `Pods do not have IP addresses in Kubernetes`, it: `I Pod non hanno indirizzi IP in Kubernetes` },
        { en: `Because Pods are ephemeral; when a Pod dies or restarts, it receives a completely new dynamic IP address.`, it: `Perché i Pod sono effimeri; quando un Pod muore o si riavvia, riceve un indirizzo IP dinamico totalmente nuovo.` },
        { en: `Pod IP addresses can only be viewed by cluster administrators`, it: `Gli indirizzi IP dei Pod possono essere visti solo dagli amministratori del cluster` },
        { en: `Dynamic IP addresses require premium cloud licenses`, it: `Gli indirizzi IP dinamici richiedono licenze cloud a pagamento` }
      ],
      correct: 1,
      explanation: { en: `Pods constantly die and restart with new IPs. A Kubernetes Service provides a permanent DNS hostname and stable virtual IP (VIP) to shield clients from dynamic Pod IPs.`, it: `I Pod muoiono e si riavviano continuamente con nuovi IP. Un Service Kubernetes fornisce un nome host DNS permanente e un IP virtuale (VIP) per isolare i client dai cambi di IP dei Pod.` }
    },
    {
      id: `k8s-5-q2`,
      question: { en: `What is the primary characteristic of a Headless Service (\`clusterIP: None\`) in Kubernetes?`, it: `Qual è la caratteristica principale di un Headless Service (\`clusterIP: None\`) in Kubernetes?` },
      options: [
        { en: `It deletes all associated pods from the cluster`, it: `Elimina tutti i pod associati dal cluster` },
        { en: `It does not assign a single cluster IP; CoreDNS returns DNS A-records pointing directly to individual Pod IPs.`, it: `Non assegna un unico cluster IP; CoreDNS restituisce record DNS A che puntano direttamente agli IP dei singoli Pod.` },
        { en: `It automatically creates an AWS Elastic Load Balancer`, it: `Crea automaticamente un Load Balancer AWS` },
        { en: `It allows external traffic without authentication`, it: `Consente il traffico esterno senza autenticazione` }
      ],
      correct: 1,
      explanation: { en: `Headless Services (\`clusterIP: None\`) bypass single virtual IP load balancing, enabling direct pod discovery via DNS for StatefulSets (Kafka, MongoDB, Cassandra).`, it: `I servizi Headless (\`clusterIP: None\`) bypassano il bilanciamento su IP virtuale unico, consentendo la scoperta diretta dei Pod via DNS per gli StatefulSet (Kafka, MongoDB, Cassandra).` }
    },
    {
      id: `k8s-5-q3`,
      question: { en: `What is the valid port range allocated for Kubernetes NodePort services, and why is NodePort considered insecure for production?`, it: `Qual è l'intervallo di porte valido riservato ai servizi NodePort in Kubernetes, e perché NodePort è considerato non sicuro per la produzione?` },
      options: [
        { en: `Range 80-443; it is insecure because it blocks HTTPS traffic`, it: `Range 80-443; è non sicuro perché blocca il traffico HTTPS` },
        { en: `Range 30000-32767; it is insecure because it exposes node infrastructure directly to the public internet on non-standard ports.`, it: `Range 30000-32767; è non sicuro perché espone direttamente l'infrastruttura dei nodi su internet pubblico usando porte non standard.` },
        { en: `Range 1000-2000; it is insecure because it consumes high CPU memory`, it: `Range 1000-2000; è non sicuro perché consuma molta memoria CPU` },
        { en: `Range 8080-8090; it is insecure because it requires SSH keys`, it: `Range 8080-8090; è non sicuro perché richiede chiavi SSH` }
      ],
      correct: 1,
      explanation: { en: `NodePort uses the 30000-32767 port range. It bypasses perimeter security, exposes node IPs directly to the internet, and lacks native TLS certificate management.`, it: `NodePort usa il range di porte 30000-32767. Bypassa la sicurezza perimetrale, espone gli IP dei nodi direttamente a internet e manca di una gestione nativa dei certificati TLS.` }
    },
    {
      id: `k8s-5-q4`,
      question: { en: `In a Service YAML specification, what is the difference between "port" and "targetPort"?`, it: `In una specifica YAML di un Service, qual è la differenza tra "port" e "targetPort"?` },
      options: [
        { en: `"port" is the port exposed by the Service; "targetPort" is the container port inside the Pod where traffic is delivered.`, it: `"port" è la porta esposta dal Service; "targetPort" è la porta del container all'interno del Pod dove viene consegnato il traffico.` },
        { en: `"port" is for NodePort only; "targetPort" is for ClusterIP only`, it: `"port" è solo per NodePort; "targetPort" è solo per ClusterIP` },
        { en: `"port" is the Docker port; "targetPort" is the Linux kernel port`, it: `"port" è la porta Docker; "targetPort" è la porta del kernel Linux` },
        { en: `There is no difference; they are exact aliases`, it: `Non c'è alcuna differenza; sono alias identici` }
      ],
      correct: 0,
      explanation: { en: `"port" is what internal/external clients connect to on the Service. "targetPort" is where the container application inside the Pod receives the traffic.`, it: `"port" è la porta a cui si collegano i client sul Service. "targetPort" è dove l'applicazione nel container all'interno del Pod riceve il traffico.` }
    },
    {
      id: `k8s-5-q5`,
      question: { en: `Why is an Ingress Controller preferred over deploying multiple LoadBalancer services for a microservices application?`, it: `Perché un Ingress Controller è preferito rispetto alla creazione di più servizi LoadBalancer per un'applicazione a microservizi?` },
      options: [
        { en: `Because Ingress allows running Docker containers without Kubernetes`, it: `Perché l'Ingress permette di eseguire container Docker senza Kubernetes` },
        { en: `Because it consolidates Layer 7 routing (hosts/paths) and SSL termination behind ONE single Cloud LoadBalancer, drastically reducing costs.`, it: `Perché consolida il routing di Layer 7 (host/percorsi) e la terminazione SSL dietro UN UNICO LoadBalancer Cloud, riducendo drasticamente i costi.` },
        { en: `Because LoadBalancer services cannot process HTTP GET requests`, it: `Perché i servizi LoadBalancer non possono elaborare richieste HTTP GET` },
        { en: `Because Ingress disables pod restart policies`, it: `Perché l'Ingress disabilita le policy di riavvio dei pod` }
      ],
      correct: 1,
      explanation: { en: `Ingress acts as a single intelligent reverse proxy front door (L7 routing for multiple domain hosts and paths with SSL termination), saving money by requiring only one cloud LoadBalancer.`, it: `L'Ingress agisce come un unico reverse proxy intelligente all'ingresso (routing L7 per più domini e percorsi con terminazione SSL), risparmiando denaro richiedendo un solo LoadBalancer cloud.` }
    }
  ]
}
