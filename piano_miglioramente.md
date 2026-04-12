# 🎓 Piano Miglioramenti Didattici — DevHarbor

> [!NOTE]
> Questo documento è un'analisi modulo per modulo di **tutti e 27 i moduli** (9 Git + 9 Docker + 9 K8s) con proposte concrete di contenuti multimediali e interattivi da aggiungere per migliorare apprendimento e piacevolezza.

---

## 📊 Riepilogo Generale

| Tipo di Enhancement                   | Simbolo       | Conteggio Proposto |
| ------------------------------------- | ------------- | ------------------ |
| 🎨 Diagramma di flusso / Architettura | `diagram`     | 18                 |
| 📊 Tabella comparativa                | `table`       | 12                 |
| 🖼️ Immagine / Infografica generata    | `image`       | 14                 |
| 🎮 Mini-gioco interattivo             | `game`        | 9                  |
| 🎬 Animazione CSS/Framer Motion       | `animation`   | 15                 |
| 📹 Video embed (YouTube/Lottie)       | `video`       | 6                  |
| 🧩 Componente interattivo drag & drop | `interactive` | 8                  |
| **TOTALE**                            |               | **82 enhancement** |

---

## 🔴 TRACK: GIT (9 moduli)

---

### 📘 git-1 · What is Version Control?

| #   | Tipo           | Proposta                                                                                                                                                                                                 | Priorità |
| --- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`   | **Timeline animata dei commit** — Una linea temporale interattiva che mostra visivamente come i commit si accumulano nel tempo. L'utente può cliccare su ogni "nodo" per vedere il messaggio del commit. | 🔴 Alta  |
| 2   | 🖼️ `image`     | **Infografica "Centralized vs Distributed"** — Due diagrammi affiancati: SVN (un server centrale con frecce) vs Git (tutti i nodi collegati).                                                            | 🔴 Alta  |
| 3   | 🎮 `game`      | **"File Chaos" Mini-game** — Mostrare 5 file (final.docx, final_v2.docx, ecc.) e far trascinare l'utente nel giusto ordine cronologico. Poi mostrare come Git risolve il problema.                       | 🟡 Media |
| 4   | 🎬 `animation` | **Animazione "Save Game"** — Quando si legge la sezione sull'analogia del videogioco, mostrare un'animazione di checkpoint che si illuminano su una mappa di gioco.                                      | 🟡 Media |

---

### 📘 git-2 · The Name & Origin Story

| #   | Tipo           | Proposta                                                                                                                                               | Priorità |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 🖼️ `image`     | **Timeline storica 2005→2024** — Infografica orizzontale: creazione Git (2005) → GitHub (2008) → GitLab (2011) → acquisizione Microsoft (2018) → oggi. | 🔴 Alta  |
| 2   | 🎬 `animation` | **Logo "graph in disguise"** — Animazione SVG del logo Git che si "scompone" mostrando i nodi e le connessioni del grafo sottostante.                  | 🟡 Media |
| 3   | 📹 `video`     | **Embed YouTube** — Breve clip di Linus Torvalds che presenta Git al Google Tech Talk (2007), video pubblico iconico.                                  | 🟢 Bassa |

---

### 📘 git-3 · Core Concepts

| #   | Tipo           | Proposta                                                                                                                                                     | Priorità |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 🎨 `diagram`   | **Diagramma "Le 3 Zone di Git"** — Working Directory → Staging Area → Repository. Mostrare il flusso con frecce animate (`git add` → `git commit`).          | 🔴 Alta  |
| 2   | 📊 `table`     | **Tabella: Repository vs Commit vs Branch vs Merge** — 4 colonne: Cos'è, Analogia, Comando chiave, Quando si usa.                                            | 🔴 Alta  |
| 3   | 🎮 `game`      | **"Ordina il Workflow"** — Drag & drop delle operazioni nel giusto ordine: edit file → `git add` → `git commit` → `git push`.                                | 🔴 Alta  |
| 4   | 🎬 `animation` | **SHA Hash "Fingerprint"** — Animazione che mostra come cambiando un singolo carattere in un file, l'intero hash cambia completamente (effetto "avalanche"). | 🟡 Media |

---

### 📘 git-4 · Working with Branches

| #   | Tipo         | Proposta                                                                                                                                                                                             | Priorità |
| --- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram` | **Grafo interattivo dei branch** — Visualizzazione a nodi del flusso: `main` → `feature/login` → merge back. L'utente può cliccare "Create Branch", "Commit", "Merge" e vedere il grafo aggiornarsi. | 🔴 Alta  |
| 2   | 🎨 `diagram` | **Merge vs Rebase side by side** — Due diagrammi animati affiancati che mostrano lo stesso scenario risolto con merge (merge commit) e con rebase (storia lineare).                                  | 🔴 Alta  |
| 3   | 📊 `table`   | **Tabella: Merge vs Rebase** — Colonne: Risultato, Quando usare, Pro, Contro, Rischio.                                                                                                               | 🟡 Media |

---

### 📘 git-5 · Remote & Collaboration

| #   | Tipo             | Proposta                                                                                                                                                                                | Priorità |
| --- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`     | **Diagramma "Local ↔ Remote"** — Visualizzare con frecce animate: `push` (→), `pull` (←), `fetch` (← tratteggiato), `clone` (⇐ doppia).                                                 | 🔴 Alta  |
| 2   | 🎨 `diagram`     | **Flusso di una Pull Request** — Diagramma a 6 step: Branch → Code → Push → Open PR → Review → Merge. Ogni step si illumina progressivamente.                                           | 🔴 Alta  |
| 3   | 🧩 `interactive` | **Simulatore fetch vs pull** — Due "terminali" affiancati: uno esegue `fetch` (scarica ma non integra), l'altro `pull` (scarica e integra). L'utente vede la differenza in tempo reale. | 🟡 Media |

---

### 📘 git-6 · Common Workflows

| #   | Tipo         | Proposta                                                                                                                                                     | Priorità |
| --- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 🎨 `diagram` | **Gitflow Completo** — Diagramma con 5 linee parallele colorate (main, develop, feature, release, hotfix) e frecce di merge tra loro.                        | 🔴 Alta  |
| 2   | 🎨 `diagram` | **Trunk-Based vs GitHub Flow** — Due flussi affiancati, uno ultra-semplice (trunk) e uno con PR (GitHub Flow).                                               | 🟡 Media |
| 3   | 📊 `table`   | **Tabella decisionale: quale workflow scegliere** — Righe: dimensione team, frequenza deploy, tipo prodotto. Colonne: Gitflow, Trunk, GitHub Flow con ✅/❌. | 🔴 Alta  |
| 4   | 🖼️ `image`   | **Infografica "Chi lo usa"** — Loghi aziendali: Google/Netflix → Trunk, Aziende enterprise → Gitflow, Startup → GitHub Flow.                                 | 🟡 Media |

---

### 📘 git-7 · The Command Cheat Sheet

| #   | Tipo             | Proposta                                                                                                                                                                                   | Priorità |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 📊 `table`       | **Tabella interattiva dei comandi** — Raggruppati per categoria (Setup, Save, Branch, Remote, Undo) con colore per livello di rischio (verde=sicuro, giallo=attenzione, rosso=pericoloso). | 🔴 Alta  |
| 2   | 🧩 `interactive` | **"Terminal Simulator"** — Un finto terminale dove l'utente può digitare i comandi e vedere l'output simulato + animazione del grafo Git.                                                  | 🟡 Media |
| 3   | 🎬 `animation`   | **Animazione HEAD** — Pallino "You are here" che si sposta lungo i branch quando l'utente preme "checkout", "commit", "switch".                                                            | 🔴 Alta  |
| 4   | 🖼️ `image`       | **Poster "Git Cheat Sheet"** — Infografica scaricabile PDF con tutti i comandi raggruppati per categoria.                                                                                  | 🟡 Media |

---

### 📘 git-8 · Learn Git Branching (External)

| #   | Tipo           | Proposta                                                                                                                | Priorità |
| --- | -------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🖼️ `image`     | **Screenshot / Preview** — Screenshot animato di Learn Git Branching in azione per incuriosire prima di aprire il link. | 🟡 Media |
| 2   | 🎬 `animation` | **Gamification countdown** — Barra XP animata: "Completa X livelli → Y XP" con effetto progress bar crescente.          | 🟢 Bassa |

---

### 📘 git-9 · Final Quiz

| #   | Tipo           | Proposta                                                                                                                                 | Priorità |
| --- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎬 `animation` | **Timer animato** — Cerchio SVG che si svuota progressivamente durante il quiz di 15 minuti, con cambio colore (verde → giallo → rosso). | 🔴 Alta  |
| 2   | 🎬 `animation` | **Confetti explosion** — Animazione di coriandoli per punteggio 100%, e animazione "try again" simpatica per < 70%.                      | 🟡 Media |
| 3   | 📊 `table`     | **Tabella risultati dettagliata** — Per ogni domanda: argomento coperto, modulo di riferimento, link per ripassare.                      | 🟡 Media |

---

## 🐳 TRACK: DOCKER (9 moduli)

---

### 📘 docker-1 · What is a Container?

| #   | Tipo           | Proposta                                                                                                                                                                 | Priorità |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 🎨 `diagram`   | **VM vs Container — Architettura a strati** — Due stack affiancati: VM (Hardware → Hypervisor → Guest OS → App) vs Container (Hardware → Host OS → Docker Engine → App). | 🔴 Alta  |
| 2   | 🎬 `animation` | **Animazione "Shipping Container"** — Container merci che si carica su una nave, poi si scarica identico su un'altra. Metafora visiva della portabilità.                 | 🔴 Alta  |
| 3   | 📊 `table`     | **Tabella: VM vs Container** — Colonne: Startup time, Size, Isolation, Overhead, Use case.                                                                               | 🔴 Alta  |
| 4   | 🖼️ `image`     | **Infografica "It works on my machine"** — Meme/illustrazione professionale del problema classico, con la soluzione Docker.                                              | 🟡 Media |

---

### 📘 docker-2 · The Whale & The Dock

| #   | Tipo           | Proposta                                                                                                         | Priorità |
| --- | -------------- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🖼️ `image`     | **Timeline Docker 2013→oggi** — Infografica: dotCloud → Open Source → Docker Inc → Moby Project → Oggi.          | 🟡 Media |
| 2   | 🎬 `animation` | **Moby Dock animato** — SVG della balena Docker che "nuota" con i container sulla schiena, con effetto onda.     | 🟡 Media |
| 3   | 📹 `video`     | **Video: Solomon Hykes presenta Docker** — Embed del talk originale PyCon 2013 "The Future of Linux Containers". | 🟢 Bassa |

---

### 📘 docker-3 · Images vs Containers

| #   | Tipo             | Proposta                                                                                                                                                                      | Priorità |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`     | **Diagramma "Image → Container(s)"** — Un'immagine al centro con frecce verso 3 container in esecuzione. Eliminare un container mostra che l'immagine resta intatta.          | 🔴 Alta  |
| 2   | 🎨 `diagram`     | **Layer Cake animato** — Stack di layer con colori diversi. Quando un layer cambia, solo quel layer si aggiorna (evidenziato in giallo), gli altri restano cacheati (grigio). | 🔴 Alta  |
| 3   | 🎮 `game`        | **"Identify the Layer"** — Dato un Dockerfile, l'utente deve associare ogni istruzione al layer corrispondente nella torta. Drag & drop.                                      | 🟡 Media |
| 4   | 🧩 `interactive` | **CLI Simulator** — Terminale simulato dove eseguire `docker pull`, `docker images`, `docker run`, `docker ps` e vedere l'output.                                             | 🟡 Media |

---

### 📘 docker-4 · The Dockerfile

| #   | Tipo           | Proposta                                                                                                                                           | Priorità |
| --- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`   | **Flusso di build** — Dockerfile → `docker build` → Image → `docker run` → Container. Ogni step evidenziato con animazione.                        | 🔴 Alta  |
| 2   | 📊 `table`     | **Tabella istruzioni Dockerfile** — FROM, WORKDIR, COPY, RUN, CMD, EXPOSE, ENV — con descrizione, quando usare, esempio.                           | 🔴 Alta  |
| 3   | 🎮 `game`      | **"Riordina il Dockerfile"** — Istruzioni sparpagliate che l'utente deve ordinare correttamente (FROM prima, CMD alla fine, ecc.).                 | 🔴 Alta  |
| 4   | 🎬 `animation` | **Build Cache visualization** — Animazione che mostra: cambio nel layer 4 → layer 1-3 "from cache" (grigi) → solo layer 4-5 "rebuilding" (gialli). | 🟡 Media |

---

### 📘 docker-5 · Docker Hub & Registry

| #   | Tipo         | Proposta                                                                                                                          | Priorità |
| --- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🖼️ `image`   | **Infografica Docker Hub** — Screenshot stilizzato di Docker Hub con annotazioni: Official Images, Community Images, Tags, Stars. | 🟡 Media |
| 2   | 🎨 `diagram` | **Flusso Push/Pull** — Developer → `docker push` → Docker Hub → `docker pull` → Server di produzione.                             | 🟡 Media |
| 3   | 📊 `table`   | **Tabella: Image Tags best practices** — `latest` vs versione specifica, quando usare ciascuno, rischi.                           | 🟡 Media |

---

### 📘 docker-6 · Volumes & Persistence

| #   | Tipo           | Proposta                                                                                                                                                          | Priorità |
| --- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`   | **Diagramma "Ephemeral vs Persistent"** — Container con dati dentro (rosso/pericoloso) vs Container con volume montato su host (verde/sicuro).                    | 🔴 Alta  |
| 2   | 🎬 `animation` | **Animazione "Container dies, data survives"** — Container che "esplode" ma il volume con il database resta intatto sull'host.                                    | 🔴 Alta  |
| 3   | 🎮 `game`      | **"Salva i dati!"** — Scenario: stai lanciando un database. Scegli la configurazione giusta (con o senza volume) e vedi il risultato: dati persi vs dati salvati. | 🟡 Media |

---

### 📘 docker-7 · Networking & Ports

| #   | Tipo             | Proposta                                                                                                                              | Priorità |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`     | **Port Mapping visualizzato** — Due "scatole": Host (porta 8080) ⇄ Container (porta 80). Con frecce animate che mostrano il traffico. | 🔴 Alta  |
| 2   | 🎨 `diagram`     | **Docker Network** — Rete interna con "web" e "db" container che comunicano via nome, senza esporre "db" all'esterno.                 | 🔴 Alta  |
| 3   | 🧩 `interactive` | **Port Mapper** — L'utente scrive un comando `-p X:Y` e vede in tempo reale quale porta del browser raggiunge quale porta interna.    | 🟡 Media |

---

### 📘 docker-8 · Docker Compose

| #   | Tipo           | Proposta                                                                                                                         | Priorità |
| --- | -------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`   | **Architettura multi-service** — Web + DB + Redis + Nginx connessi con frecce. Tutto dentro un riquadro "docker-compose.yml".    | 🔴 Alta  |
| 2   | 🎬 `animation` | **"docker-compose up" animation** — I container si "accendono" uno alla volta in sequenza con effetto glow.                      | 🟡 Media |
| 3   | 📊 `table`     | **Tabella: chiavi docker-compose.yml** — `services`, `volumes`, `networks`, `ports`, `build`, `image` con descrizione e esempio. | 🟡 Media |
| 4   | 🎨 `diagram`   | **Multi-stage build** — Diagramma: Stage 1 (build, grande, 1GB) → copia file → Stage 2 (runtime, piccolo, 50MB).                 | 🟡 Media |

---

### 📘 docker-9 · Final Docker Quiz

| #   | Tipo           | Proposta                                                                                               | Priorità |
| --- | -------------- | ------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 🎬 `animation` | **Progress ring + confetti** — Come git-9, timer animato e celebrazione al 100%.                       | 🟡 Media |
| 2   | 📊 `table`     | **Tabella risultati** — Per ogni domanda: argomento, modulo corrispondente, link rapido per ripassare. | 🟡 Media |

---

## ☸️ TRACK: KUBERNETES (9 moduli)

---

### 📘 k8s-1 · What is Kubernetes?

| #   | Tipo           | Proposta                                                                                                                                    | Priorità |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🖼️ `image`     | **Infografica "Docker vs K8s"** — Docker = build & run container singoli. K8s = orchestrare flotta. Due livelli di astrazione ben distinti. | 🔴 Alta  |
| 2   | 🎬 `animation` | **Orchestra animation** — Musicisti (container) che suonano a caso → direttore (K8s) alza la bacchetta → tutti in sincrono.                 | 🔴 Alta  |
| 3   | 📹 `video`     | **Animazione breve "What is Kubernetes?" stile Lottie** — 30 secondi di spiegazione visiva animata.                                         | 🟡 Media |

---

### 📘 k8s-2 · Origins: Borg & The Wheel

| #   | Tipo           | Proposta                                                                                                                                            | Priorità |
| --- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🖼️ `image`     | **Timeline Borg → K8s** — 2003 (Borg interno) → 2014 (K8s open source) → 2015 (CNCF) → oggi (standard de facto).                                    | 🟡 Media |
| 2   | 🎬 `animation` | **Logo K8s SVG animato** — La ruota con 7 raggi che gira lentamente, con tooltip su "Perché 7?" quando hover.                                       | 🟡 Media |
| 3   | 🖼️ `image`     | **Infografica CNCF Landscape (semplificata)** — Versione semplificata del CNCF landscape mostrando K8s al centro e i progetti satellite principali. | 🟢 Bassa |

---

### 📘 k8s-3 · Nodes & Pods

| #   | Tipo             | Proposta                                                                                                                                                           | Priorità |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 🎨 `diagram`     | **Architettura Cluster completa** — Control Plane (API Server, etcd, Scheduler) + Worker Nodes (Kubelet, Pods, Containers). Il diagramma più importante del corso. | 🔴 Alta  |
| 2   | 🎨 `diagram`     | **Zoom: Pod dettaglio** — Pod come "appartamento" con 2 container (main + sidecar), shared network, shared volumes.                                                | 🔴 Alta  |
| 3   | 🧩 `interactive` | **"Build a Cluster"** — L'utente trascina componenti (API Server, etcd, Kubelet, Pod) nelle posizioni corrette (Control Plane vs Worker Node).                     | 🔴 Alta  |
| 4   | 📊 `table`       | **Tabella componenti Control Plane** — etcd, kube-scheduler, API Server, Controller Manager: ruolo, analogia, cosa succede se va giù.                              | 🔴 Alta  |

---

### 📘 k8s-4 · Deployments & Scaling

| #   | Tipo             | Proposta                                                                                                                  | Priorità |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`     | **Self-Healing visualizzato** — 3 pod "desired" → 1 muore (❌) → K8s ne crea uno nuovo (✨) → torna a 3. Animazione loop. | 🔴 Alta  |
| 2   | 🎬 `animation`   | **Rolling Update** — Pod v1 (blu) si spengono uno alla volta mentre pod v2 (verde) si accendono. Zero downtime visibile.  | 🔴 Alta  |
| 3   | 🎨 `diagram`     | **HPA Autoscaling** — Grafico CPU che sale → K8s aggiunge pod → CPU scende → K8s rimuove pod.                             | 🟡 Media |
| 4   | 🧩 `interactive` | **"Scale the App"** — Slider per il numero di repliche + simulazione di carico. L'utente vede i pod apparire/scomparire.  | 🟡 Media |

---

### 📘 k8s-5 · Services & Networking

| #   | Tipo         | Proposta                                                                                                                         | Priorità |
| --- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram` | **Service come Load Balancer** — Service (IP stabile) davanti a 3 Pod tramite Selector. Traffico distribuito con frecce animate. | 🔴 Alta  |
| 2   | 📊 `table`   | **Tabella tipi di Service** — ClusterIP, NodePort, LoadBalancer: scope, use case, costo, esempio.                                | 🔴 Alta  |
| 3   | 🎨 `diagram` | **Ingress come Smart Router** — Un IP pubblico → Ingress → `/api` → Service A, `/` → Service B.                                  | 🟡 Media |
| 4   | 🎮 `game`    | **"Route the Traffic"** — Dato un URL path, l'utente deve scegliere il Service corretto che gestirà la richiesta.                | 🟡 Media |

---

### 📘 k8s-6 · ConfigMaps & Secrets

| #   | Tipo             | Proposta                                                                                                                                            | Priorità |
| --- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`     | **"Same Image, Different Config"** — Stessa immagine Docker deployata in 3 ambienti (Dev/Staging/Prod) con ConfigMap diverse colorate diversamente. | 🔴 Alta  |
| 2   | 📊 `table`       | **Tabella: ConfigMap vs Secret** — Tipo dati, Encoding, Sicurezza, Esempio, Best practice.                                                          | 🟡 Media |
| 3   | 🧩 `interactive` | **"Classify the Config"** — Lista di valori (API_URL, DB_PASSWORD, LOG_LEVEL, SSH_KEY) che l'utente deve trascinare in ConfigMap o Secret.          | 🔴 Alta  |

---

### 📘 k8s-7 · Storage: PV & PVC

| #   | Tipo           | Proposta                                                                                                                          | Priorità |
| --- | -------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`   | **PV ↔ PVC binding** — Admin crea PV (disco) → User crea PVC (richiesta) → K8s fa il match (binding). Con animazione "handshake". | 🔴 Alta  |
| 2   | 🎬 `animation` | **Dynamic Provisioning** — PVC → StorageClass → cloud disk creato automaticamente → PV → bound. Tutto animato in sequenza.        | 🟡 Media |
| 3   | 🖼️ `image`     | **Analogia visiva "Ticket → Seat"** — PVC come biglietto del cinema, PV come il posto assegnato.                                  | 🟡 Media |

---

### 📘 k8s-8 · Interacting with K8s (kubectl)

| #   | Tipo             | Proposta                                                                                                                                                     | Priorità |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 📊 `table`       | **Tabella comandi kubectl** — Raggruppati: Inspect (get, describe, logs), Manage (apply, delete, scale), Debug (exec, port-forward). Con colore per rischio. | 🔴 Alta  |
| 2   | 🧩 `interactive` | **kubectl Playground** — Terminale simulato dove l'utente digita comandi e vede output finto ma realistico.                                                  | 🟡 Media |
| 3   | 📹 `video`       | **Embed: Killercoda preview** — Screenshot animato o breve video dell'ambiente Killercoda per motivare l'utente ad andarci.                                  | 🟢 Bassa |
| 4   | 🎮 `game`        | **"Fix the Cluster"** — Scenario: il pod è in CrashLoopBackOff. L'utente deve scegliere la sequenza corretta di comandi per diagnosticare e risolvere.       | 🔴 Alta  |

---

### 📘 k8s-9 · Final K8s Challenge

| #   | Tipo           | Proposta                                                                                                                            | Priorità |
| --- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎬 `animation` | **Timer + Achievement animations** — Come per gli altri quiz finali.                                                                | 🟡 Media |
| 2   | 📊 `table`     | **Tabella risultati dettagliata** — Come git-9 e docker-9.                                                                          | 🟡 Media |
| 3   | 🎬 `animation` | **Badge "Kybernitis" reveal** — Animazione speciale quando si ottiene il badge finale: la ruota K8s che si compone pezzo per pezzo. | 🟡 Media |

---

## 🏗️ ENHANCEMENT TRASVERSALI (tutte le pagine)

---

### 🏠 Landing Page

| #   | Tipo           | Proposta                                                                                                   | Priorità |
| --- | -------------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎬 `animation` | **Particle background migliorato** — Particelle che formano i loghi Git/Docker/K8s prima di dissolversi.   | 🟡 Media |
| 2   | 📹 `video`     | **Hero video loop** — Breve animazione 10s di codice che scorre su terminale + container che si deployano. | 🟢 Bassa |

---

### 📊 Dashboard

| #   | Tipo           | Proposta                                                                                                                             | Priorità |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 📊 `chart`     | **Radar chart competenze** — Grafico radar che mostra il livello raggiunto su ogni sub-topic (branching, networking, volumes, ecc.). | 🔴 Alta  |
| 2   | 🎬 `animation` | **XP counter animato** — Numero XP che "conta" verso l'alto con easing quando cambia.                                                | 🟡 Media |
| 3   | 📊 `chart`     | **Progress heatmap** — Calendarietto stile GitHub contributions che mostra i giorni di studio.                                       | 🟡 Media |

---

### 🗺️ Cert Roadmap Page

| #   | Tipo             | Proposta                                                                                                                                 | Priorità |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | 🎨 `diagram`     | **Roadmap visiva verticale** — Percorso tipo "mappa del tesoro" con tappe: Badge interno → Cert Entry → Cert Pro. Ogni tappa si sblocca. | 🔴 Alta  |
| 2   | 🧩 `interactive` | **Filtro per stato** — Toggle: "Tutti" / "Pronti" / "In Progress" per filtrare le certificazioni.                                        | 🟡 Media |

---

### 🏅 Leaderboard & Profile

| #   | Tipo           | Proposta                                                                                                           | Priorità |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------------ | -------- |
| 1   | 🎬 `animation` | **Leaderboard entry animations** — Ogni riga appare con stagger animation, la posizione #1 ha effetto glow dorato. | 🟡 Media |
| 2   | 📊 `chart`     | **Profilo: grafico a barre XP per track** — 3 barre colorate (Git/Docker/K8s) che mostrano dove si è più forti.    | 🟡 Media |

---

## 🎯 Piano di Implementazione Suggerito

### Fase 1 — Quick Wins (🔴 Alta priorità, impatto immediato)

1. **Tabelle comparative** (VM vs Container, Merge vs Rebase, ecc.) — Componente `<ComparisonTable>` riusabile
2. **Diagrammi architetturali core** (3 Zone Git, VM vs Container, Cluster K8s) — Componente `<AnimatedDiagram>` con SVG + Framer Motion
3. **Timer quiz animato** — Componente `<QuizTimer>` con SVG circle progress

### Fase 2 — Visual Storytelling (diagrammi + animazioni)

4. **Tutti i flowchart** — Libreria leggera come `reactflow` o SVG custom
5. **Animazioni sezione** — Micro-animazioni con Framer Motion per ogni section type
6. **Confetti/celebration** — Libreria `canvas-confetti` per risultati quiz

### Fase 3 — Interattività Avanzata (giochi + drag & drop)

7. **Mini-games drag & drop** — Libreria `@dnd-kit/core` per ordinamento, classificazione
8. **Terminal Simulator** — Componente `<TerminalSim>` con comandi predefiniti
9. **Branch graph interattivo** — SVG animato con stato React

### Fase 4 — Multimedia (immagini + video)

10. **Infografiche generate** — Usare tool di generazione immagini per creare asset
11. **Video embed** — Componente `<VideoEmbed>` con lazy loading e thumbnail
12. **Charts** — Libreria `recharts` per radar, barre, heatmap

> [!IMPORTANT]
> Tutte le proposte sono progettate per essere **modulari**: ogni enhancement è un componente React indipendente che può essere aggiunto come nuovo `section.type` nel data model esistente, senza modificare i moduli già funzionanti.

---

## 🔧 Modifiche al Data Model Necessarie

```typescript
// Nuovi section types da aggiungere all'interfaccia Section
export interface Section {
  type:
    | "intro"
    | "concept"
    | "diagram"
    | "code"
    | "analogy"
    | "tip"
    | "table" // NEW: tabelle comparative
    | "flowchart" // NEW: diagrammi di flusso SVG
    | "animation" // NEW: animazioni didattiche
    | "interactive" // NEW: componenti interattivi
    | "game" // NEW: mini-giochi
    | "video" // NEW: embed video
    | "infographic"; // NEW: immagini/infografiche
  title?: string;
  content: string;
  code?: string;
  language?: string;
  // NEW fields:
  tableData?: { headers: string[]; rows: string[][] };
  videoUrl?: string;
  imageUrl?: string;
  gameType?: "drag-order" | "drag-classify" | "choose-path" | "terminal-sim";
  gameData?: any;
}
```
