import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, CheckCircle, Trash2, Lock, Edit2, Activity, AlertCircle, Plus, Check, MousePointerClick,
  Server, Cpu, Database, Network, Play, RefreshCw, Zap, Shield, Layers, Terminal, Box, Radio
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const k8sArchDict = {
  en: {
    title: 'Interactive Kubernetes Cluster Architecture Blueprint',
    subtitle: 'Select a view mode and launch targeted simulations to understand Control Plane vs Worker Node mechanics.',
    modeAll: 'Full Cluster Flow',
    modeMaster: 'Control Plane (Brain)',
    modeWorker: 'Worker Node (Muscle)',
    banners: {
      all: '🌐 Full Cluster View: Visualizes end-to-end communication from developer CLI (kubectl) down to Master & Worker nodes.',
      master: '🧠 Control Plane Focus (Master Node): Isolates the 4 decision-making components. Simulates continuous self-healing control loops (etcd, API Server, Scheduler, Controller Manager).',
      worker: '💪 Worker Node Focus (Compute Machine): Isolates the execution machine. Simulates Kubelet execution and Kube-Proxy network routing.'
    },
    simButtons: {
      all: '🚀 Simulate End-to-End Deploy (kubectl -> Pod)',
      master: '🧠 Simulate Control Loop (Self-Healing)',
      worker: '💪 Simulate Worker Container & Net Routing'
    },
    simulating: 'Simulating Flow...',
    controlPlaneTitle: 'Control Plane (Master Node)',
    workerNodeTitle: 'Worker Node (Compute Machine)',
    cliTitle: 'Developer Workstation',
    clickPrompt: 'Click on any component above to view its specs',
    components: {
      api: {
        name: 'API Server (kube-apiserver)',
        role: 'The Front Door & Communication Hub',
        port: '6443 / TCP',
        desc: 'The REST API gateway for all cluster management. Every tool (kubectl, dashboard, worker nodes) talks exclusively to the API Server. It authenticates, validates, and stores data in etcd.'
      },
      etcd: {
        name: 'etcd Key-Value Store',
        role: 'Cluster Memory & Truth Database',
        port: '2379 / TCP',
        desc: 'Consistent, highly-available key-value store holding the complete state of the cluster (configs, secrets, pod states). If etcd data is lost, the cluster loses all state.'
      },
      scheduler: {
        name: 'Scheduler (kube-scheduler)',
        role: 'Workload Placement Engine',
        port: '10259 / TCP',
        desc: 'Watches for newly created Pods with no assigned node. It measures CPU, memory, taints, and affinity to assign the Pod to the healthiest available Worker Node.'
      },
      controller: {
        name: 'Controller Manager (kube-controller-manager)',
        role: 'Continuous Self-Healing Loops',
        port: '10257 / TCP',
        desc: 'Runs continuous control loops (NodeController, ReplicaSetController). It compares actual state to desired state, automatically spinning up new pods if nodes fail.'
      },
      kubelet: {
        name: 'Kubelet',
        role: 'Node Captain & Worker Agent',
        port: '10250 / TCP',
        desc: 'Primary node agent running on every Worker Node. It listens to PodSpecs from the API Server and instructs the Container Runtime to create, start, or stop containers.'
      },
      proxy: {
        name: 'Kube-Proxy',
        role: 'Network Proxy & Load Balancer',
        port: '10256 / TCP',
        desc: 'Maintains network IP routing rules on each node (via iptables/IPVS). Enables Pod-to-Pod communication and balances external traffic across replicas.'
      },
      runtime: {
        name: 'Container Runtime (containerd / CRI-O)',
        role: 'Low-Level Engine',
        port: 'Local Socket',
        desc: 'The underlying container execution engine responsible for pulling container images from registries and running isolated container processes inside Pods.'
      },
      pods: {
        name: 'Pods & Containers',
        role: 'Application Workloads',
        port: 'Dynamic App Ports (80, 8080, etc.)',
        desc: 'The smallest deployable unit in Kubernetes. Wraps one or more tightly coupled containers sharing network IP and storage volumes.'
      }
    }
  },
  it: {
    title: 'Blueprint Interattivo dell\'Architettura Kubernetes',
    subtitle: 'Seleziona una modalità di vista ed esegui simulazioni mirate per capire la differenza tra Control Plane e Worker Node.',
    modeAll: 'Flusso Cluster Completo',
    modeMaster: 'Control Plane (Cervello)',
    modeWorker: 'Worker Node (Muscoli)',
    banners: {
      all: '🌐 Vista Cluster Completo: Visualizza la comunicazione end-to-end dalla CLI dello sviluppatore (kubectl) fino ai nodi Master e Worker.',
      master: '🧠 Focus Control Plane (Nodo Master): Isola i 4 componenti decisionali. Simula i cicli continui di auto-riparazione (etcd, API Server, Scheduler, Controller Manager).',
      worker: '💪 Focus Worker Node (Macchina Esecutiva): Isola la macchina di calcolo. Simula l\'avvio di Kubelet e il routing di rete tramite Kube-Proxy.'
    },
    simButtons: {
      all: '🚀 Simula Deploy End-to-End (kubectl -> Pod)',
      master: '🧠 Simula Ciclo di Controllo (Self-Healing)',
      worker: '💪 Simula Routing Rete & Avvio Container'
    },
    simulating: 'Simulazione Flusso in corso...',
    controlPlaneTitle: 'Control Plane (Nodo Master)',
    workerNodeTitle: 'Worker Node (Nodo di Calcolo)',
    cliTitle: 'Postazione Sviluppatore',
    clickPrompt: 'Clicca su uno dei componenti sopra per vederne i dettagli',
    components: {
      api: {
        name: 'API Server (kube-apiserver)',
        role: 'Porta d\'Ingresso & Hub di Comunicazione',
        port: '6443 / TCP',
        desc: 'Gateway REST per l\'intera gestione del cluster. Qualsiasi strumento (kubectl, dashboard, nodi worker) comunica unicamente con l\'API Server. Autentica, valida e memorizza i dati in etcd.'
      },
      etcd: {
        name: 'etcd Key-Value Store',
        role: 'Memoria del Cluster & Stato di Verità',
        port: '2379 / TCP',
        desc: 'Database chiave-valore ad altissima disponibilità che memorizza l\'intero stato del cluster (configurazioni, secret, stati dei pod). Se etcd viene perso, il cluster dimentica tutto.'
      },
      scheduler: {
        name: 'Scheduler (kube-scheduler)',
        role: 'Motore di Assegnazione Carichi',
        port: '10259 / TCP',
        desc: 'Monitora i nuovi Pod non ancora assegnati. Analizza RAM, CPU, tolleranze e vincoli per assegnare il Pod al nodo Worker più idoneo.'
      },
      controller: {
        name: 'Controller Manager (kube-controller-manager)',
        role: 'Cicli di Auto-Riparazione Continua',
        port: '10257 / TCP',
        desc: 'Esegue i cicli di controllo (NodeController, ReplicaSetController). Confronta costantemente lo stato reale con lo stato desiderato, riavviando pod se i nodi falliscono.'
      },
      kubelet: {
        name: 'Kubelet',
        role: 'Capitano del Nodo & Agente Worker',
        port: '10250 / TCP',
        desc: 'Agente principale in esecuzione su ogni nodo Worker. Ascolta le specifiche del Pod dall\'API Server e comanda al Container Runtime di avviare o arrestare i container.'
      },
      proxy: {
        name: 'Kube-Proxy',
        role: 'Proxy di Rete & Bilanciatore',
        port: '10256 / TCP',
        desc: 'Gestisce le regole di rete IP su ciascun nodo (tramite iptables/IPVS). Permette la comunicazione tra Pod e bilancia il traffico di rete tra le repliche.'
      },
      runtime: {
        name: 'Container Runtime (containerd / CRI-O)',
        role: 'Motore Esecutivo di Basso Livello',
        port: 'Socket Locale',
        desc: 'Il motore di esecuzione dei container responsabile di scaricare le immagini dai registri e avviare i processi isolati all\'interno dei Pod.'
      },
      pods: {
        name: 'Pod & Container',
        role: 'Carico di Lavoro Applicativo',
        port: 'Porte App Dinamiche (80, 8080, ecc.)',
        desc: 'L\'unità minima distribuibile in Kubernetes. Avvolge uno o più container strettamente collegati che condividono indirizzo IP e volumi di storage.'
      }
    }
  }
}

const pizzaDict: Record<'en' | 'it', Record<string, string>> = {
  en: {
    recipeTitle: 'Docker Image (Read-Only Recipe)',
    runButton: 'Bake Pizza (docker run)',
    runningContainers: 'Docker Host: Running Containers (Pizzas)',
    noContainers: 'No active containers. Click "Bake Pizza" to run one from the recipe!',
    containerLabel: 'Container',
    portLabel: 'Port',
    statusLabel: 'Status',
    running: 'Running ⚡',
    baseLayers: 'Base Layers (Inherited from Image - Read-Only)',
    baseDough: 'Base Dough',
    tomatoSauce: 'Tomato Sauce',
    mozzarella: 'Mozzarella Cheese',
    customToppings: 'Writeable Layer (Container Customizations)',
    clickToCustomize: 'Click to add/remove ingredient',
    pepperoni: 'Pepperoni',
    mushrooms: 'Mushrooms',
    pineapple: 'Pineapple (Contaminant!)',
    eatButton: 'Eat Pizza (docker rm)',
    alertPineapple: '⚠️ Warning: You customized this container with Pineapple! (Still running independently, did not affect the image recipe.)',
    alertGenericTopping: 'ℹ️ Customization written ONLY to this container\'s R/W layer. Image recipe and other pizzas remain untouched!',
    successBaked: 'Baked new container instance!',
    readOnlyTip: 'Notice: The Recipe (Image) stays read-only and untouched. Any toppings are written only to that specific Pizza (Container\'s Read-Write Layer).',
  },
  it: {
    recipeTitle: 'Immagine Docker (Ricetta di Sola Lettura)',
    runButton: 'Inforna Pizza (docker run)',
    runningContainers: 'Docker Host: Container in Esecuzione (Pizze)',
    noContainers: 'Nessun container attivo. Clicca "Inforna Pizza" per avviarne uno dalla ricetta!',
    containerLabel: 'Container',
    portLabel: 'Porta',
    statusLabel: 'Stato',
    running: 'In Esecuzione ⚡',
    baseLayers: 'Layer di Base (Ereditati dall\'Immagine - Sola Lettura)',
    baseDough: 'Impasto Base',
    tomatoSauce: 'Salsa di Pomodoro',
    mozzarella: 'Mozzarella',
    customToppings: 'Layer Scrivibile (Personalizza Container)',
    clickToCustomize: 'Clicca per aggiungere/rimuovere',
    pepperoni: 'Salame Piccante',
    mushrooms: 'Funghi',
    pineapple: 'Ananas (Contaminante!)',
    eatButton: 'Mangia Pizza (docker rm)',
    alertPineapple: '⚠️ Attenzione: Hai personalizzato questo container con Ananas! (Gira in isolamento, la ricetta dell\'immagine non è stata alterata.)',
    alertGenericTopping: 'ℹ️ Modifica salvata SOLO nel Layer R/W di questo container. La ricetta dell\'immagine e le altre pizze rimangono inalterate!',
    successBaked: 'Nuovo container avviato con successo!',
    readOnlyTip: 'Nota: La Ricetta (Immagine) rimane immutabile. Ogni ingrediente extra viene scritto solo su quella specifica Pizza (Layer R/W del Container).',
  }
}

const layersDict: Record<'en' | 'it', Record<string, string>> = {
  en: {
    layersTitle: 'Interactive Layer Cake Architecture',
    toggleImage: 'Image Blueprint (Read-Only)',
    toggleContainer: 'Running Container (Read-Write)',
    layerBaseOS: 'Base OS Layer (Ubuntu - 50MB)',
    layerDeps: 'Dependencies Layer (Node.js - 20MB)',
    layerApp: 'App Code Layer (index.js - 2KB)',
    layerRW: 'Container Writable Layer (Read-Write - 0B)',
    layerRWDesc: 'This layer is temporary. All writes (logs, temporary files) are stored here. Deleting the container discards this layer without modifying the image below.',
    readOnlyImage: 'Docker Image (Read-Only Template)',
    lockedTip: 'Locked Base Layers (Immutable)'
  },
  it: {
    layersTitle: 'Architettura Interattiva a Layer ("Layer Cake")',
    toggleImage: 'Blueprint Immagine (Sola Lettura)',
    toggleContainer: 'Container in Esecuzione (Scrivibile)',
    layerBaseOS: 'Layer Base OS (Ubuntu - 50MB)',
    layerDeps: 'Layer Dipendenze (Node.js - 20MB)',
    layerApp: 'Layer Codice App (index.js - 2KB)',
    layerRW: 'Layer Scrivibile del Container (Read-Write - 0B)',
    layerRWDesc: 'Questo layer è temporaneo. Tutte le modifiche e i file temporanei sono salvati qui. Eliminando il container, questo layer viene rimosso senza alterare l\'immagine.',
    readOnlyImage: 'Immagine Docker (Template Sola Lettura)',
    lockedTip: 'Layer Base Bloccati (Immutabili)'
  }
}

const layerDetailsDict = {
  en: {
    osTitle: 'Base OS Layer',
    osDesc: 'The foundation of the image. Typically a lightweight Linux distribution like Alpine (5MB) or Ubuntu (50MB) that provides the core libraries and shell tools.',
    depsTitle: 'Dependencies Layer',
    depsDesc: 'Contains the runtimes, SDKs, and libraries installed by your app (e.g., Node.js, Python, npm packages, or pip requirements).',
    appTitle: 'App Code Layer',
    appDesc: 'Contains your actual application source code, assets, and configurations. This layer changes most frequently during development.',
    rwTitle: 'Writable Container Layer',
    rwDesc: 'A thin, temporary layer added on top of the image when you execute `docker run`. Any file edits, log outputs, or temp files are stored here. It is destroyed when the container is deleted, leaving the image layers completely untouched.',
    overviewTitle: 'Layer Cake Architecture',
    overviewDesc: 'Docker images are built from stacked, read-only layers. Each line in a Dockerfile creates a new layer. This stack is immutable (read-only) and shared. When you run a container, Docker simply adds a thin, writeable layer on top!'
  },
  it: {
    osTitle: 'Layer del Sistema Operativo Base',
    osDesc: 'La base dell\'immagine. Solitamente una distribuzione Linux minimale come Alpine (5MB) o Ubuntu (50MB) che fornisce le librerie di sistema e gli strumenti essenziali.',
    depsTitle: 'Layer delle Dipendenze',
    depsDesc: 'Contiene i runtime, gli SDK e i pacchetti di librerie installati per l\'app (ad esempio Node.js, Python, moduli npm o pacchetti pip).',
    appTitle: 'Layer del Codice Applicativo',
    appDesc: 'Contiene il codice sorgente effettivo dell\'applicazione, gli asset e i file di configurazione. Cambia frequentemente durante lo sviluppo.',
    rwTitle: 'Layer Scrivibile del Container (R/W)',
    rwDesc: 'Un sottile strato temporaneo inserito sopra l\'immagine all\'avvio del container. Ogni scrittura (log, file temporanei o modifiche) avviene qui. Se elimini il container, questo layer scompare mantenendo intatta l\'immagine sottostante.',
    overviewTitle: 'Architettura a Layer ("Layer Cake")',
    overviewDesc: 'Le immagini Docker sono composte da strati sovrapposti in sola lettura. Ogni comando nel Dockerfile crea un nuovo layer. Questo stack è immutabile e condiviso. All\'avvio di un container, viene aggiunto un sottile layer scrivibile in cima!'
  }
}

export function EducationAnimation({ type }: { type: string }) {
  const [input, setInput] = useState('Git')
  const [pizzas, setPizzas] = useState<{ id: string; name: string; port: number; toppings: string[]; status: 'cooking' | 'ready' }[]>([])
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)
  const [isContainerMode, setIsContainerMode] = useState(false)
  const { language } = useLanguage()


  const hash = useMemo(() => {
    // Simple but deterministic hash for educational visual demo
    if (!type.includes('SHA')) return ''
    let h1 = 0x811c9dc5, h2 = 0xad3f3d1e
    for (let i = 0; i < input.length; i++) {
      h1 = Math.imul(h1 ^ input.charCodeAt(i), 16777619)
      h2 = Math.imul(h2 ^ input.charCodeAt(i), 0x5bd1e995)
    }
    const s1 = (h1 >>> 0).toString(16).padStart(8, '0')
    const s2 = (h2 >>> 0).toString(16).padStart(8, '0')
    const s3 = ((Math.imul(h1, h2) >>> 0).toString(16) + 'abcdef0123456789').slice(0, 24)
    return (s1 + s2 + s3).slice(0, 40)
  }, [input, type])
  
  if (type.includes('SHA')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-4">
         <div className="flex items-center justify-between">
           <div className="text-[10px] text-muted uppercase fw-black tracking-widest">Avalanche Effect Simulator</div>
           <div className="flex gap-2">
              <button 
                onClick={() => setInput('Git')} 
                className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted hover:text-white transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={() => setInput(input === 'Git' ? 'Git!' : 'Git')} 
                className="text-[9px] px-2 py-0.5 rounded bg-primary/20 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all fw-bold"
              >
                Change 1 char
              </button>
           </div>
         </div>
         <div className="relative group">
           <input 
             value={input} 
             onChange={e => setInput(e.target.value)}
             className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-center text-sm font-medium focus:border-primary/50 outline-none transition-all shadow-inner"
             placeholder="Type message here..."
           />
           <Sparkles size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
         </div>
         
         <div className="bg-surface p-5 rounded-2xl border border-primary/20 flex flex-col items-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={14} className="text-primary" />
              <span className="text-[10px] text-primary fw-black uppercase tracking-widest">Git Snapshot ID (SHA-1)</span>
            </div>
            <div className="w-full hidden sm:flex justify-center">
              <div className="mono text-[11px] sm:text-xs text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 text-center flex flex-row shadow-inner w-full min-w-0 overflow-hidden items-center justify-center">
                <div className="whitespace-nowrap">
                  {hash.substring(0, 20).split('').map((char, i) => (
                    <motion.span 
                      key={`${input}-${i}`}
                      initial={{ opacity: 0, scale: 0.5 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      transition={{ delay: i * 0.005 }}
                      className={/[a-f]/.test(char) ? 'text-primary/80' : 'text-xp'}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="whitespace-nowrap">
                  {hash.substring(20, 40).split('').map((char, j) => {
                    const i = j + 20;
                    return (
                      <motion.span 
                        key={`${input}-${i}`}
                        initial={{ opacity: 0, scale: 0.5 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: i * 0.005 }}
                        className={/[a-f]/.test(char) ? 'text-primary/80' : 'text-xp'}
                      >
                        {char}
                      </motion.span>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 opacity-50">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-[9px] text-muted fw-bold uppercase">Integrity Verified</span>
            </div>
         </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('rolling') || type.toLowerCase().includes('update')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-6 items-center">
        <div className="text-[10px] text-muted uppercase fw-black tracking-widest text-center">Rolling Update Visualization</div>
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ backgroundColor: '#118ab2', y: 0 }}
              animate={{ backgroundColor: ['#118ab2', '#ffb703', '#06d6a0'], y: [0, -10, 0] }}
              transition={{ delay: i * 2, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              className="w-12 h-16 rounded-lg flex items-center justify-center text-white fw-black shadow-lg"
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ delay: i * 2, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                v1
              </motion.span>
              <motion.span
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1] }}
                transition={{ delay: i * 2, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                v2
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('container') || type.toLowerCase().includes('shipping')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-6 items-center">
        <div className="text-[10px] text-muted uppercase fw-black tracking-widest text-center">Build Once, Run Anywhere</div>
        <div className="flex items-center gap-4 w-full justify-between relative px-4">
          <div className="text-3xl">💻</div>
          
          <motion.div 
            className="absolute left-10 text-2xl z-10"
            animate={{ x: [0, 200], y: [0, -20, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            📦
          </motion.div>
          
          <div className="flex-1 border-b-2 border-dashed border-white/20 mx-4" />
          <div className="text-3xl">☁️</div>
        </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('distributed') || type.toLowerCase().includes('network')) {
    return (
      <div className="w-full flex flex-col items-center gap-6 py-4">
        <div className="text-[10px] text-muted uppercase fw-black tracking-widest text-center">Distributed Architecture</div>
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Central Cloud (The concept of a shared remote) */}
          <motion.div 
            animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-4xl z-20 bg-surface rounded-full p-4 border border-white/10 shadow-[0_0_30px_rgba(17,138,178,0.2)]"
          >
            ☁️
          </motion.div>
          
          {/* Connection lines from center to peers */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 200 200">
             {[0, 45, 135, 180, 225, 315].map((angle, i) => {
                const r = 85;
                const rad = (angle - 90) * (Math.PI / 180);
                const x = 100 + Math.cos(rad) * r;
                const y = 100 + Math.sin(rad) * r;
                return (
                  <motion.line 
                    key={i}
                    x1="100" y1="100" x2={x} y2={y} 
                    stroke="var(--color-primary)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                  />
                );
             })}
          </svg>
          
          {/* Peer Nodes around */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const r = 75;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = Math.cos(rad) * r;
            const y = Math.sin(angle === 180 ? rad + 0.1 : rad) * r; // Tiny jitter
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                style={{ 
                  position: 'absolute',
                  left: `calc(50% + ${x}px - 16px)`, 
                  top: `calc(50% + ${y}px - 16px)` 
                }}
                className="flex flex-col items-center group cursor-help"
              >
                <div className="text-xl sm:text-2xl bg-surface2 rounded-xl p-2 border border-white/5 shadow-lg group-hover:border-primary/50 transition-colors">
                  {i === 0 ? '👩‍💻' : i === 3 ? '👨‍💻' : '💻'}
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-[7px] text-primary/70 fw-black uppercase mt-1 tracking-tighter"
                >
                  FULL COPY
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('pizza')) {
    const isIt = language === 'it'
    const dict = pizzaDict[isIt ? 'it' : 'en']

    const bakePizza = () => {
      const nextPort = pizzas.length > 0 ? Math.max(...pizzas.map(p => p.port)) + 1 : 8080
      const adjectives = ['swift', 'agile', 'dockerized', 'mighty', 'cozy', 'spicy', 'classic', 'supreme']
      const nouns = ['margherita', 'napoli', 'diavola', 'calzone', 'marinara', 'quattro-formaggi']
      const randomName = `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${nouns[Math.floor(Math.random() * nouns.length)]}`
      const id = Math.random().toString(36).substring(2, 8)
      
      const newPizza = {
        id,
        name: randomName,
        port: nextPort,
        toppings: [],
        status: 'cooking' as const
      }
      
      setPizzas(prev => [...prev, newPizza])
      
      setTimeout(() => {
        setPizzas(prev => prev.map(p => p.id === id ? { ...p, status: 'ready' } : p))
      }, 1200)
    }

    const deletePizza = (id: string) => {
      setPizzas(prev => prev.filter(p => p.id !== id))
    }

    const toggleTopping = (pizzaId: string, topping: string) => {
      setPizzas(prev => prev.map(p => {
        if (p.id !== pizzaId) return p
        const exists = p.toppings.includes(topping)
        const newToppings = exists 
          ? p.toppings.filter(t => t !== topping) 
          : [...p.toppings, topping]
        return { ...p, toppings: newToppings }
      }))
    }
    
    return (
      <div className="w-full flex flex-col gap-6">
        {/* Header/Explainer */}
        <div className="flex flex-col gap-1 text-center">
          <div className="text-[10px] text-primary fw-black uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Activity size={12} className="animate-pulse" />
            {isIt ? 'Simulatore Interattivo Immagine vs Container' : 'Interactive Image vs Container Simulator'}
          </div>
          <p className="text-xs text-muted max-w-2xl mx-auto leading-relaxed">
            {dict.readOnlyTip}
          </p>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left panel: Recipe (The Docker Image) */}
          <div className="flex flex-col lg:w-5/12 bg-surface border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📄</span>
              <div className="text-left">
                <h4 className="text-xs text-white fw-bold leading-tight">{dict.recipeTitle}</h4>
                <span className="text-[9px] text-muted mono">IMAGE ID: pizza-recipe:latest</span>
              </div>
            </div>

            {/* Dockerfile/Recipe Code block representation */}
            <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-4 mono text-[11px] leading-relaxed text-sub mb-5 shadow-inner text-left">
              <div className="text-muted mb-1"># Dockerfile for Margherita Base</div>
              <div><span className="text-blue-400 font-bold">FROM</span> <span className="text-orange-300">wheat-crust:latest</span></div>
              <div><span className="text-blue-400 font-bold">RUN</span> <span className="text-emerald-400">add-topping</span> <span className="text-yellow-200">tomato-sauce</span></div>
              <div><span className="text-blue-400 font-bold">RUN</span> <span className="text-emerald-400">add-topping</span> <span className="text-yellow-200">mozzarella-cheese</span></div>
              <div className="text-muted my-1"># Expose default HTTP Port</div>
              <div><span className="text-blue-400 font-bold">EXPOSE</span> <span className="text-purple-400">80</span></div>
              <div className="mt-4 text-[9px] text-blue-400/70 border-t border-white/5 pt-2 flex items-center gap-1">
                <Lock size={10} /> {isIt ? 'Layer base immutabili (Sola Lettura)' : 'Base layers are immutable (Read-Only)'}
              </div>
            </div>

            {/* Action button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              animate={pizzas.length === 0 ? {
                scale: [1, 1.025, 1],
              } : {}}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              onClick={bakePizza}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm fw-black uppercase tracking-wider shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-2 border border-orange-400/25 cursor-pointer"
            >
              <span className="text-base">🍕</span> {dict.runButton}
            </motion.button>
          </div>

          {/* Right panel: Active Pizzas (Containers running on the Docker Host) */}
          <div className="flex-1 bg-surface border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col relative overflow-hidden min-h-[300px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐳</span>
                <div className="text-left">
                  <h4 className="text-xs text-white fw-bold leading-tight">{dict.runningContainers}</h4>
                  <span className="text-[9px] text-muted mono">docker ps --format "table"</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] text-muted font-bold uppercase mono">
                Active: {pizzas.length}
              </span>
            </div>

            {pizzas.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 rounded-xl bg-black/10">
                <div className="text-3xl mb-2 opacity-40">🍕</div>
                <p className="text-xs text-muted max-w-xs">
                  {dict.noContainers}
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[360px] pr-1">
                <AnimatePresence initial={false}>
                  {pizzas.map((pizza) => (
                    <motion.div
                      key={pizza.id}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                      className="bg-black/25 border border-white/5 rounded-xl p-4 flex flex-col gap-3 relative"
                    >
                      {/* Container Title Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs fw-black text-white font-mono">{pizza.name}</span>
                          <span className="text-[9px] text-muted bg-white/5 px-1.5 py-0.5 rounded font-mono">ID: {pizza.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-muted font-mono">{dict.portLabel}: <strong className="text-white">{pizza.port}→80</strong></span>
                          {pizza.status === 'cooking' ? (
                            <span className="flex items-center gap-1 text-[9px] text-yellow-400 font-bold bg-yellow-400/10 border border-yellow-400/25 px-2 py-0.5 rounded-full">
                              <span className="w-1 h-1 rounded-full bg-yellow-400 animate-ping" />
                              {isIt ? 'Infornamento...' : 'Baking...'}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/25 px-2 py-0.5 rounded-full">
                              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                              {dict.running}
                            </span>
                          )}
                        </div>
                      </div>

                      {pizza.status === 'cooking' ? (
                        <div className="py-6 flex flex-col items-center justify-center gap-2">
                          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                          <span className="text-[10px] text-muted font-mono">docker run pizza-recipe:latest</span>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-left">
                          {/* Pizza Dynamic SVG visualizer */}
                          <div className="relative shrink-0 flex items-center justify-center p-1 bg-white/5 border border-white/10 rounded-2xl shadow-inner">
                            <svg width="72" height="72" viewBox="0 0 64 64" className="drop-shadow-lg">
                              {/* Crust */}
                              <circle cx="32" cy="32" r="30" fill="#e9c46a" stroke="#d4a373" strokeWidth="1.5" />
                              {/* Sauce */}
                              <circle cx="32" cy="32" r="25" fill="#e76f51" />
                              {/* Mozzarella */}
                              <circle cx="24" cy="24" r="5" fill="#fcf6bd" />
                              <circle cx="40" cy="24" r="6" fill="#fcf6bd" />
                              <circle cx="22" cy="38" r="6" fill="#fcf6bd" />
                              <circle cx="38" cy="40" r="5" fill="#fcf6bd" />
                              <circle cx="31" cy="31" r="5.5" fill="#fcf6bd" />
                              
                              {/* Pepperoni Slices */}
                              {pizza.toppings.includes('pepperoni') && (
                                <g>
                                  <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} cx="22" cy="24" r="3.5" fill="#c1121f" />
                                  <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} cx="42" cy="24" r="3.5" fill="#c1121f" transition={{ delay: 0.05 }} />
                                  <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} cx="20" cy="40" r="3.5" fill="#c1121f" transition={{ delay: 0.1 }} />
                                  <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} cx="36" cy="42" r="3.5" fill="#c1121f" transition={{ delay: 0.15 }} />
                                  <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} cx="31" cy="30" r="3.5" fill="#c1121f" transition={{ delay: 0.2 }} />
                                </g>
                              )}
                              
                              {/* Mushrooms */}
                              {pizza.toppings.includes('mushrooms') && (
                                <g>
                                  <motion.path initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} d="M 28,19 A 2.5,2.5 0 0,1 33,19 L 32,23 L 29,23 Z" fill="#e5e5e5" stroke="#a9a9a9" strokeWidth="0.5" />
                                  <motion.path initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} d="M 44,32 A 2.5,2.5 0 0,1 49,32 L 48,36 L 45,36 Z" fill="#e5e5e5" stroke="#a9a9a9" strokeWidth="0.5" transition={{ delay: 0.05 }} />
                                  <motion.path initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} d="M 18,31 A 2.5,2.5 0 0,1 23,31 L 22,35 L 19,35 Z" fill="#e5e5e5" stroke="#a9a9a9" strokeWidth="0.5" transition={{ delay: 0.1 }} />
                                  <motion.path initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} d="M 32,43 A 2.5,2.5 0 0,1 37,43 L 36,47 L 33,47 Z" fill="#e5e5e5" stroke="#a9a9a9" strokeWidth="0.5" transition={{ delay: 0.15 }} />
                                </g>
                              )}
                              
                              {/* Pineapple chunks */}
                              {pizza.toppings.includes('pineapple') && (
                                <g>
                                  <motion.rect initial={{ scale: 0, opacity: 0, rotate: 0 }} animate={{ scale: 1, opacity: 1, rotate: 15 }} x="26" y="34" width="5" height="5" rx="1" fill="#fee440" />
                                  <motion.rect initial={{ scale: 0, opacity: 0, rotate: 0 }} animate={{ scale: 1, opacity: 1, rotate: 45 }} x="36" y="24" width="5" height="5" rx="1" fill="#fee440" transition={{ delay: 0.05 }} />
                                  <motion.rect initial={{ scale: 0, opacity: 0, rotate: 0 }} animate={{ scale: 1, opacity: 1, rotate: -30 }} x="42" y="38" width="5" height="5" rx="1" fill="#fee440" transition={{ delay: 0.1 }} />
                                  <motion.rect initial={{ scale: 0, opacity: 0, rotate: 0 }} animate={{ scale: 1, opacity: 1, rotate: 60 }} x="14" y="24" width="5" height="5" rx="1" fill="#fee440" transition={{ delay: 0.15 }} />
                                </g>
                              )}
                            </svg>
                          </div>

                          {/* Control panel & layers */}
                          <div className="flex-1 flex flex-col gap-2.5 w-full">
                            {/* Read Only base list */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] text-muted font-bold uppercase tracking-wider flex items-center gap-1 flex-row">
                                <Lock size={10} className="text-blue-400" />
                                {dict.baseLayers}
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">🌾 {dict.baseDough}</span>
                                <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">🍅 {dict.tomatoSauce}</span>
                                <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">🧀 {dict.mozzarella}</span>
                              </div>
                            </div>

                            {/* Writeable customizations */}
                            <div className="flex flex-col gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-2.5">
                              <div className="flex items-center justify-between gap-1 flex-wrap">
                                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                  <Edit2 size={10} className="text-emerald-400" />
                                  {dict.customToppings}
                                </span>
                                <span className="text-[9px] text-emerald-300/90 font-bold flex items-center gap-1 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                  <MousePointerClick size={10} className="animate-bounce text-emerald-300" />
                                  {dict.clickToCustomize}
                                </span>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-0.5">
                                {[
                                  { id: 'pepperoni', emoji: '🌶️', label: dict.pepperoni },
                                  { id: 'mushrooms', emoji: '🍄', label: dict.mushrooms },
                                  { id: 'pineapple', emoji: '🍍', label: dict.pineapple }
                                ].map((top) => {
                                  const active = pizza.toppings.includes(top.id)
                                  return (
                                    <button
                                      key={top.id}
                                      onClick={() => toggleTopping(pizza.id, top.id)}
                                      className={`px-2.5 py-1 rounded-lg text-[10px] fw-bold transition-all flex items-center gap-1.5 border cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${
                                        active
                                          ? 'bg-emerald-500/30 border-emerald-400 text-white shadow-emerald-500/20 ring-1 ring-emerald-400/50'
                                          : 'bg-white/10 border-emerald-500/40 text-white/90 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-400'
                                      }`}
                                    >
                                      {active ? (
                                        <Check size={11} className="text-emerald-400 stroke-[3]" />
                                      ) : (
                                        <Plus size={11} className="text-emerald-300" />
                                      )}
                                      <span>{top.emoji}</span>
                                      {top.label}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>

                            {/* Warning message if toppings selected */}
                            {pizza.toppings.includes('pineapple') ? (
                              <div className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg p-2 flex items-start gap-1.5 mt-1 leading-normal font-medium text-left">
                                <AlertCircle size={12} className="shrink-0 text-amber-400 mt-0.5" />
                                <span>{dict.alertPineapple}</span>
                              </div>
                            ) : pizza.toppings.length > 0 && (
                              <div className="text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg p-2 flex items-start gap-1.5 mt-1 leading-normal font-medium text-left">
                                <CheckCircle size={12} className="shrink-0 text-blue-400 mt-0.5" />
                                <span>{dict.alertGenericTopping}</span>
                              </div>
                            )}

                            {/* Delete container */}
                            <div className="flex justify-end mt-2 pt-2 border-t border-white/5">
                              <button
                                onClick={() => deletePizza(pizza.id)}
                                className="px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[9px] fw-bold flex items-center gap-1"
                              >
                                <Trash2 size={10} />
                                {dict.eatButton}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('layers')) {
    const isIt = language === 'it'
    const dict = layersDict[isIt ? 'it' : 'en']
    const details = layerDetailsDict[isIt ? 'it' : 'en']

    const getActiveDetails = () => {
      if (selectedLayer === 'os') return { title: details.osTitle, desc: details.osDesc, color: 'border-red-500/30 bg-red-500/5 text-red-400' }
      if (selectedLayer === 'deps') return { title: details.depsTitle, desc: details.depsDesc, color: 'border-amber-500/30 bg-amber-500/5 text-amber-400' }
      if (selectedLayer === 'app') return { title: details.appTitle, desc: details.appDesc, color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' }
      if (selectedLayer === 'rw') return { title: details.rwTitle, desc: details.rwDesc, color: 'border-blue-500/30 bg-blue-500/5 text-blue-400' }
      return { title: details.overviewTitle, desc: details.overviewDesc, color: 'border-white/10 bg-white/5 text-muted' }
    }

    const activeInfo = getActiveDetails()

    return (
      <div className="w-full flex flex-col gap-6">
        {/* Toggle Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="text-left">
            <h4 className="text-sm font-black text-white">{dict.layersTitle}</h4>
            <p className="text-[10px] text-muted">{isIt ? 'Clicca sui layer per esplorarne i dettagli architettonici' : 'Click on the layers to explore their architectural details'}</p>
          </div>
          
          <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 shrink-0">
            <button
              onClick={() => {
                setIsContainerMode(false)
                if (selectedLayer === 'rw') setSelectedLayer(null)
              }}
              className={`px-4 py-2 rounded-lg text-xs fw-black transition-all ${
                !isContainerMode
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-muted hover:text-white'
              }`}
            >
              📷 {dict.toggleImage}
            </button>
            <button
              onClick={() => {
                setIsContainerMode(true)
                setSelectedLayer('rw')
              }}
              className={`px-4 py-2 rounded-lg text-xs fw-black transition-all ${
                isContainerMode
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20'
                  : 'text-muted hover:text-white'
              }`}
            >
              ⚡ {dict.toggleContainer}
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left panel: Vertical Stack */}
          <div className="flex-1 flex flex-col items-center justify-center py-5 bg-black/25 border border-white/5 rounded-2xl relative min-h-[260px] select-none overflow-hidden">
            {/* Visual background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

            <div className="flex flex-col items-center w-full max-w-xs gap-2">
              {/* Stack Wrapper with AnimatePresence */}
              <AnimatePresence>
                {isContainerMode && (
                  <motion.div
                    key="rw-layer"
                    initial={{ opacity: 0, y: -25, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    onClick={() => setSelectedLayer('rw')}
                    className={`w-full py-2.5 px-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between shadow-lg relative group ${
                      selectedLayer === 'rw'
                        ? 'border-blue-400 bg-blue-500/20 text-white'
                        : 'border-blue-500/30 bg-blue-500/10 text-blue-300 hover:border-blue-400 hover:bg-blue-500/15'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-xl">✏️</span>
                      <div>
                        <div className="text-xs font-black">{dict.layerRW}</div>
                        <span className="text-[8px] uppercase tracking-wider font-bold opacity-60">{isIt ? 'Layer Temporaneo Scrivibile' : 'Temporary Writable Layer'}</span>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[9px] font-black shrink-0">
                      R/W
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Immutable layers box */}
              <div className="w-full border border-white/5 bg-black/10 rounded-xl p-2.5 flex flex-col gap-2 relative">
                <div className="text-[9px] text-muted/60 font-black tracking-widest uppercase text-left flex items-center gap-1 select-none">
                  🔒 {dict.readOnlyImage}
                </div>

                {/* App Layer */}
                <div
                  onClick={() => setSelectedLayer('app')}
                  className={`w-full py-2.5 px-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between shadow-sm relative group ${
                    selectedLayer === 'app'
                      ? 'border-emerald-400 bg-emerald-500/20 text-white'
                      : 'border-emerald-500/10 bg-emerald-500/5 text-emerald-300 hover:border-emerald-400/50 hover:bg-emerald-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-lg">💻</span>
                    <div>
                      <div className="text-xs font-black">{dict.layerApp}</div>
                      <span className="text-[8px] uppercase tracking-wider font-bold opacity-60">COPY . . /app</span>
                    </div>
                  </div>
                  <Lock size={10} className="text-emerald-400 opacity-60" />
                </div>

                {/* Deps Layer */}
                <div
                  onClick={() => setSelectedLayer('deps')}
                  className={`w-full py-2.5 px-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between shadow-sm relative group ${
                    selectedLayer === 'deps'
                      ? 'border-amber-400 bg-amber-500/20 text-white'
                      : 'border-amber-500/10 bg-amber-500/5 text-amber-300 hover:border-amber-400/50 hover:bg-amber-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-lg">📚</span>
                    <div>
                      <div className="text-xs font-black">{dict.layerDeps}</div>
                      <span className="text-[8px] uppercase tracking-wider font-bold opacity-60">RUN npm install</span>
                    </div>
                  </div>
                  <Lock size={10} className="text-amber-400 opacity-60" />
                </div>

                {/* Base OS Layer */}
                <div
                  onClick={() => setSelectedLayer('os')}
                  className={`w-full py-2.5 px-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between shadow-sm relative group ${
                    selectedLayer === 'os'
                      ? 'border-red-400 bg-red-500/20 text-white'
                      : 'border-red-500/10 bg-red-500/5 text-red-300 hover:border-red-400/50 hover:bg-red-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-lg">🐧</span>
                    <div>
                      <div className="text-xs font-black">{dict.layerBaseOS}</div>
                      <span className="text-[8px] uppercase tracking-wider font-bold opacity-60">FROM ubuntu:22.04</span>
                    </div>
                  </div>
                  <Lock size={10} className="text-red-400 opacity-60" />
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Details Box */}
          <div className="md:w-5/12 flex flex-col bg-surface border border-white/10 rounded-2xl p-5 shadow-xl justify-between text-left">
            <div className="flex flex-col gap-3">
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border self-start ${activeInfo.color}`}>
                {selectedLayer ? (isIt ? 'Dettagli Layer' : 'Layer Details') : (isIt ? 'Panoramica' : 'Overview')}
              </span>
              
              <h4 className="text-sm font-black text-white text-left">{activeInfo.title}</h4>
              <p className="text-xs text-muted leading-relaxed text-left whitespace-pre-line">
                {activeInfo.desc}
              </p>
            </div>

          </div>
        </div>
      </div>
    )
  }



  if (type.toLowerCase().includes('k8s') || type.toLowerCase().includes('cluster')) {
    const isIt = language === 'it'
    const [selectedComp, setSelectedComp] = useState<string | null>('api')
    const [activeFilter, setActiveFilter] = useState<'all' | 'master' | 'worker'>('all')
    const [isSimulating, setIsSimulating] = useState(false)
    const [simStep, setSimStep] = useState<number>(0)

    const dict = k8sArchDict[isIt ? 'it' : 'en']

    const runSimulation = () => {
      if (isSimulating) return
      setIsSimulating(true)

      const sequences = {
        all: [
          { step: 1, comp: 'api', delay: 600 },
          { step: 2, comp: 'etcd', delay: 1600 },
          { step: 3, comp: 'scheduler', delay: 2600 },
          { step: 4, comp: 'kubelet', delay: 3600 },
          { step: 5, comp: 'runtime', delay: 4600 },
          { step: 6, comp: 'pods', delay: 5600 }
        ],
        master: [
          { step: 1, comp: 'controller', delay: 600 },
          { step: 2, comp: 'api', delay: 1600 },
          { step: 3, comp: 'etcd', delay: 2600 },
          { step: 4, comp: 'scheduler', delay: 3600 }
        ],
        worker: [
          { step: 1, comp: 'kubelet', delay: 600 },
          { step: 2, comp: 'runtime', delay: 1600 },
          { step: 3, comp: 'pods', delay: 2600 },
          { step: 4, comp: 'proxy', delay: 3600 }
        ]
      }

      const currentSeq = sequences[activeFilter]
      setSimStep(1)
      setSelectedComp(currentSeq[0].comp)

      currentSeq.forEach(({ step, comp, delay }, idx) => {
        setTimeout(() => {
          setSimStep(step)
          setSelectedComp(comp)
          if (idx === currentSeq.length - 1) {
            setTimeout(() => {
              setIsSimulating(false)
              setSimStep(0)
            }, 2000)
          }
        }, delay)
      })
    }

    const currentDetails = selectedComp ? dict.components[selectedComp as keyof typeof dict.components] : null

    return (
      <div className="w-full flex flex-col gap-6 select-none">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="text-left">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <Server size={16} className="text-purple-400" />
              {dict.title}
            </h4>
            <p className="text-[10px] text-muted">{dict.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 shrink-0">
              <button
                onClick={() => { setActiveFilter('all'); setSelectedComp('api'); }}
                className={`px-3 py-1.5 rounded-lg text-[10px] fw-black transition-all cursor-pointer ${
                  activeFilter === 'all' ? 'bg-primary text-white shadow' : 'text-muted hover:text-white'
                }`}
              >
                {dict.modeAll}
              </button>
              <button
                onClick={() => { setActiveFilter('master'); setSelectedComp('controller'); }}
                className={`px-3 py-1.5 rounded-lg text-[10px] fw-black transition-all cursor-pointer ${
                  activeFilter === 'master' ? 'bg-purple-500 text-white shadow' : 'text-muted hover:text-white'
                }`}
              >
                {dict.modeMaster}
              </button>
              <button
                onClick={() => { setActiveFilter('worker'); setSelectedComp('kubelet'); }}
                className={`px-3 py-1.5 rounded-lg text-[10px] fw-black transition-all cursor-pointer ${
                  activeFilter === 'worker' ? 'bg-emerald-500 text-white shadow' : 'text-muted hover:text-white'
                }`}
              >
                {dict.modeWorker}
              </button>
            </div>

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`px-4 py-2 rounded-xl text-xs fw-black transition-all flex items-center gap-1.5 cursor-pointer ${
                isSimulating
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 animate-pulse'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95'
              }`}
            >
              <Play size={12} className={isSimulating ? 'animate-spin' : ''} />
              {isSimulating ? dict.simulating : dict.simButtons[activeFilter]}
            </button>
          </div>
        </div>

        {/* Filter Explanation Banner */}
        <div className={`p-3 rounded-xl border text-xs font-medium text-left flex items-start gap-2 transition-all ${
          activeFilter === 'master'
            ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
            : activeFilter === 'worker'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
        }`}>
          <Sparkles size={14} className="shrink-0 mt-0.5" />
          <span>{dict.banners[activeFilter]}</span>
        </div>

        {/* Interactive Diagram Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Visual Topology (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Top Bar: Developer / CLI */}
            <motion.div
              onClick={() => setSelectedComp('api')}
              animate={simStep === 1 ? { scale: [1, 1.02, 1] } : {}}
              className={`bg-surface2/60 border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all ${
                simStep === 1 ? 'border-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2 text-left">
                <Terminal size={16} className="text-blue-400" />
                <div>
                  <div className="text-xs fw-black text-white">{dict.cliTitle}</div>
                  <div className="text-[9px] text-muted mono">kubectl apply -f deployment.yaml</div>
                </div>
              </div>
              {simStep === 1 && (
                <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono animate-pulse">
                  1. Sending HTTP REST Request →
                </span>
              )}
            </motion.div>

            {/* Architecture Grid: Control Plane vs Worker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* CONTROL PLANE (Master Node) */}
              <div className={`border rounded-2xl p-4 flex flex-col gap-3 relative transition-all ${
                activeFilter === 'worker' ? 'opacity-40 grayscale-[50%]' : ''
              } bg-purple-950/10 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.05)]`}>
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                  <div className="flex items-center gap-1.5 text-purple-300 fw-black text-xs">
                    <Cpu size={14} />
                    {dict.controlPlaneTitle}
                  </div>
                  <span className="text-[8px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono">The Brain 🧠</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* API Server */}
                  <motion.button
                    onClick={() => setSelectedComp('api')}
                    animate={simStep === 1 || simStep === 2 ? { scale: [1, 1.05, 1] } : {}}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      selectedComp === 'api'
                        ? 'bg-purple-500/30 border-purple-400 text-white shadow-lg shadow-purple-500/20 ring-1 ring-purple-400'
                        : simStep === 1 || simStep === 2
                        ? 'bg-amber-500/30 border-amber-400 text-white animate-pulse'
                        : 'bg-purple-900/20 border-purple-500/30 text-purple-200 hover:bg-purple-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Zap size={14} className="text-amber-400" />
                      <span className="text-[8px] opacity-60 mono">6443</span>
                    </div>
                    <div className="text-xs fw-bold">API Server</div>
                    <div className="text-[8px] opacity-70">kube-apiserver</div>
                  </motion.button>

                  {/* etcd */}
                  <motion.button
                    onClick={() => setSelectedComp('etcd')}
                    animate={simStep === 2 ? { scale: [1, 1.05, 1] } : {}}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      selectedComp === 'etcd'
                        ? 'bg-purple-500/30 border-purple-400 text-white shadow-lg shadow-purple-500/20 ring-1 ring-purple-400'
                        : simStep === 2
                        ? 'bg-amber-500/30 border-amber-400 text-white animate-pulse'
                        : 'bg-purple-900/20 border-purple-500/30 text-purple-200 hover:bg-purple-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Database size={14} className="text-cyan-400" />
                      <span className="text-[8px] opacity-60 mono">2379</span>
                    </div>
                    <div className="text-xs fw-bold">etcd Store</div>
                    <div className="text-[8px] opacity-70">Key-Value DB</div>
                  </motion.button>

                  {/* Scheduler */}
                  <motion.button
                    onClick={() => setSelectedComp('scheduler')}
                    animate={simStep === 3 ? { scale: [1, 1.05, 1] } : {}}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      selectedComp === 'scheduler'
                        ? 'bg-purple-500/30 border-purple-400 text-white shadow-lg shadow-purple-500/20 ring-1 ring-purple-400'
                        : simStep === 3
                        ? 'bg-amber-500/30 border-amber-400 text-white animate-pulse'
                        : 'bg-purple-900/20 border-purple-500/30 text-purple-200 hover:bg-purple-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <RefreshCw size={14} className="text-purple-400" />
                      <span className="text-[8px] opacity-60 mono">10259</span>
                    </div>
                    <div className="text-xs fw-bold">Scheduler</div>
                    <div className="text-[8px] opacity-70">Node Placement</div>
                  </motion.button>

                  {/* Controller Manager */}
                  <motion.button
                    onClick={() => setSelectedComp('controller')}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      selectedComp === 'controller'
                        ? 'bg-purple-500/30 border-purple-400 text-white shadow-lg shadow-purple-500/20 ring-1 ring-purple-400'
                        : 'bg-purple-900/20 border-purple-500/30 text-purple-200 hover:bg-purple-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Activity size={14} className="text-emerald-400" />
                      <span className="text-[8px] opacity-60 mono">10257</span>
                    </div>
                    <div className="text-xs fw-bold">Controller Mgr</div>
                    <div className="text-[8px] opacity-70">Self-Healing Loops</div>
                  </motion.button>
                </div>
              </div>

              {/* WORKER NODE (Compute Node) */}
              <div className={`border rounded-2xl p-4 flex flex-col gap-3 relative transition-all ${
                activeFilter === 'master' ? 'opacity-40 grayscale-[50%]' : ''
              } bg-emerald-950/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]`}>
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <div className="flex items-center gap-1.5 text-emerald-300 fw-black text-xs">
                    <Server size={14} />
                    {dict.workerNodeTitle}
                  </div>
                  <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">The Muscle 💪</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Kubelet */}
                  <motion.button
                    onClick={() => setSelectedComp('kubelet')}
                    animate={simStep === 4 ? { scale: [1, 1.05, 1] } : {}}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      selectedComp === 'kubelet'
                        ? 'bg-emerald-500/30 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400'
                        : simStep === 4
                        ? 'bg-amber-500/30 border-amber-400 text-white animate-pulse'
                        : 'bg-emerald-900/20 border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Shield size={14} className="text-emerald-400" />
                      <span className="text-[8px] opacity-60 mono">10250</span>
                    </div>
                    <div className="text-xs fw-bold">Kubelet</div>
                    <div className="text-[8px] opacity-70">Node Captain</div>
                  </motion.button>

                  {/* Kube-Proxy */}
                  <motion.button
                    onClick={() => setSelectedComp('proxy')}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      selectedComp === 'proxy'
                        ? 'bg-emerald-500/30 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400'
                        : 'bg-emerald-900/20 border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Network size={14} className="text-blue-400" />
                      <span className="text-[8px] opacity-60 mono">10256</span>
                    </div>
                    <div className="text-xs fw-bold">Kube-Proxy</div>
                    <div className="text-[8px] opacity-70">Net & LoadBalancer</div>
                  </motion.button>
                </div>

                {/* Container Runtime & Pod Container */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {/* Container Runtime */}
                  <motion.button
                    onClick={() => setSelectedComp('runtime')}
                    animate={simStep === 5 ? { scale: [1, 1.05, 1] } : {}}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      selectedComp === 'runtime'
                        ? 'bg-emerald-500/30 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400'
                        : simStep === 5
                        ? 'bg-amber-500/30 border-amber-400 text-white animate-pulse'
                        : 'bg-emerald-900/20 border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Layers size={14} className="text-cyan-400" />
                      <span className="text-[8px] opacity-60 mono">CRI</span>
                    </div>
                    <div className="text-xs fw-bold">Container Runtime</div>
                    <div className="text-[8px] opacity-70">containerd / CRI-O</div>
                  </motion.button>

                  {/* Pod Workload */}
                  <motion.button
                    onClick={() => setSelectedComp('pods')}
                    animate={simStep === 6 ? { scale: [1, 1.1, 1] } : {}}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      selectedComp === 'pods'
                        ? 'bg-emerald-500/30 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400'
                        : simStep === 6
                        ? 'bg-emerald-400 border-white text-black font-black animate-bounce shadow-xl'
                        : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Box size={14} className="text-green-400" />
                      <span className="text-[8px] opacity-60 mono">POD</span>
                    </div>
                    <div className="text-xs fw-bold">Pods & Containers</div>
                    <div className="text-[8px] opacity-70">Active Workloads</div>
                  </motion.button>
                </div>

              </div>
            </div>

          </div>

          {/* Side Panel: Component Inspection (4 Cols) */}
          <div className="lg:col-span-4 bg-surface border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-500" />

            {currentDetails ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="px-2 py-0.5 rounded text-[8px] fw-black uppercase tracking-widest bg-white/10 text-white border border-white/10">
                    Component Spec
                  </span>
                  <span className="text-[9px] text-muted mono bg-black/40 px-2 py-0.5 rounded border border-white/5">
                    {currentDetails.port}
                  </span>
                </div>

                <div>
                  <h3 className="text-base fw-black text-white leading-tight mb-1">{currentDetails.name}</h3>
                  <div className="text-xs text-primary fw-bold mb-3">{currentDetails.role}</div>
                  <p className="text-xs text-sub leading-relaxed">{currentDetails.desc}</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted">
                <Radio size={24} className="mb-2 opacity-30 animate-pulse" />
                <p className="text-xs">{dict.clickPrompt}</p>
              </div>
            )}

            {isSimulating && (
              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                <span>
                  {activeFilter === 'all' && (
                    <>
                      {simStep === 1 && (isIt ? 'Step 1: kubectl invia il manifesto YAML all\'API Server (6443)' : 'Step 1: kubectl sends YAML spec to API Server (6443)')}
                      {simStep === 2 && (isIt ? 'Step 2: API Server valida e salva lo stato nel database etcd (2379)' : 'Step 2: API Server validates & persists state in etcd (2379)')}
                      {simStep === 3 && (isIt ? 'Step 3: Scheduler analizza le risorse e assegna il Worker Node migliore' : 'Step 3: Scheduler inspects resources & assigns optimal Worker Node')}
                      {simStep === 4 && (isIt ? 'Step 4: Kubelet sul nodo Worker riceve l\'ordine dal Control Plane' : 'Step 4: Kubelet on Worker receives PodSpec from Control Plane')}
                      {simStep === 5 && (isIt ? 'Step 5: Container Runtime scarica l\'immagine dal registro' : 'Step 5: Container Runtime pulls image from container registry')}
                      {simStep === 6 && (isIt ? 'Step 6: Pod ATTIVO e pronto a servire gli utenti! 🚀' : 'Step 6: Pod is LIVE and ready for traffic! 🚀')}
                    </>
                  )}
                  {activeFilter === 'master' && (
                    <>
                      {simStep === 1 && (isIt ? 'Step 1: Controller Manager rileva un Pod guasto e avvia l\'auto-riparazione' : 'Step 1: Controller Manager detects dead Pod & triggers self-healing')}
                      {simStep === 2 && (isIt ? 'Step 2: Controller Manager aggiorna lo stato desiderato con l\'API Server' : 'Step 2: Controller Manager pushes desired state update to API Server')}
                      {simStep === 3 && (isIt ? 'Step 3: API Server aggiorna la memoria di stato immutabile in etcd' : 'Step 3: API Server updates state record inside etcd key-value store')}
                      {simStep === 4 && (isIt ? 'Step 4: Scheduler assegna la replica sostitutiva sul nodo disponibile!' : 'Step 4: Scheduler places replacement replica on available worker node!')}
                    </>
                  )}
                  {activeFilter === 'worker' && (
                    <>
                      {simStep === 1 && (isIt ? 'Step 1: Kubelet riceve l\'ordine di esecuzione dal Control Plane' : 'Step 1: Kubelet agent receives PodSpec order from Control Plane')}
                      {simStep === 2 && (isIt ? 'Step 2: Kubelet comanda al Container Runtime (containerd) di avviare il container' : 'Step 2: Kubelet instructs Container Runtime (containerd) to launch container')}
                      {simStep === 3 && (isIt ? 'Step 3: Il Pod viene avviato ed esposto con IP locale del nodo' : 'Step 3: Pod starts & receives a local node IP address')}
                      {simStep === 4 && (isIt ? 'Step 4: Kube-Proxy aggiorna le regole IP tables per bilanciare il traffico!' : 'Step 4: Kube-Proxy updates iptables rules to balance traffic!')}
                    </>
                  )}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    )
  }

  // Fallback
  return null
}
