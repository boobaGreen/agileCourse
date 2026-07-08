import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, CheckCircle, Trash2, Lock, Edit2, Activity, AlertCircle } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

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
    pepperoni: 'Pepperoni',
    mushrooms: 'Mushrooms',
    pineapple: 'Pineapple (Contaminant!)',
    eatButton: 'Eat Pizza (docker rm)',
    alertPineapple: '⚠️ Warning: You customized this container with Pineapple! (Still running independently, did not affect the image recipe.)',
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
    customToppings: 'Layer Scrivibile (Modifiche del Container)',
    pepperoni: 'Salame Piccante',
    mushrooms: 'Funghi',
    pineapple: 'Ananas (Contaminante!)',
    eatButton: 'Mangia Pizza (docker rm)',
    alertPineapple: '⚠️ Attenzione: Hai personalizzato questo container con Ananas! (Gira in isolamento, la ricetta dell\'immagine non è stata alterata.)',
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

const cacheDict: Record<'en' | 'it', Record<string, string>> = {
  en: {
    cacheTitle: 'Interactive Build Cache Visualizer',
    badBtn: '❌ The Bad Way',
    goodBtn: '✅ The Good Way',
    editCodeBtn: '✏️ Edit index.html (Simulate Code Change)',
    cachedText: 'Using Cache (0.0s) ⚡',
    rebuildText: 'Rebuilding Layer (45.0s) ⏳',
    rebuildFastText: 'Rebuilding Layer (0.1s) ⚡',
    statusTitle: 'Build Results:',
    badStatusDesc: '❌ Re-downloaded 500MB of dependencies because COPY invalidation broke the cache cascade!',
    goodStatusDesc: '✅ Reused cache for npm install! Built in 0.1 seconds by copying package.json first.',
    badCodeDesc: 'Everything is copied at once. Changing one line of code rebuilds the install step.',
    goodCodeDesc: 'package.json is copied first. npm install is cached unless dependencies change.'
  },
  it: {
    cacheTitle: 'Visualizzatore Interattivo della Cache di Build',
    badBtn: '❌ Via Sbagliata',
    goodBtn: '✅ Via Corretta (Ottimizzata)',
    editCodeBtn: '✏️ Modifica index.html (Simula Cambio Codice)',
    cachedText: 'Usa Cache (0.0s) ⚡',
    rebuildText: 'Ricostruzione Layer (45.0s) ⏳',
    rebuildFastText: 'Ricostruzione Layer (0.1s) ⚡',
    statusTitle: 'Risultati della Build:',
    badStatusDesc: '❌ Riscaricati 500MB di librerie perché la modifica del codice ha rotto la cascata della cache!',
    goodStatusDesc: '✅ Riutilizzata la cache per npm install! Compilato in 0.1 secondi separando package.json.',
    badCodeDesc: 'Tutto viene copiato insieme. Modificare una riga di codice ricostruisce l\'installazione.',
    goodCodeDesc: 'Copia prima package.json. npm install rimane in cache finché non cambiano le dipendenze.'
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

  const [isOptimized, setIsOptimized] = useState(false)
  const [buildStatus, setBuildStatus] = useState<'idle' | 'building' | 'done'>('idle')
  const [codeChanged, setCodeChanged] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(-1)

  const runBuildSimulation = () => {
    setBuildStatus('building')
    setActiveStep(0)
    
    const delay = isOptimized ? 600 : 1200
    
    setTimeout(() => {
      setActiveStep(1)
      setTimeout(() => {
        if (isOptimized) {
          setActiveStep(2)
          setTimeout(() => {
            setBuildStatus('done')
            setActiveStep(-1)
          }, 500)
        } else {
          setBuildStatus('done')
          setActiveStep(-1)
        }
      }, delay)
    }, 600)
  }

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
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[9px] text-muted font-bold uppercase tracking-wider flex items-center gap-1 flex-row">
                                <Edit2 size={10} className="text-emerald-400" />
                                {dict.customToppings}
                              </span>
                              
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
                                      className={`px-2 py-1 rounded-lg text-[10px] fw-bold transition-all flex items-center gap-1 border ${
                                        active
                                          ? 'bg-emerald-500/20 border-emerald-400 text-white'
                                          : 'bg-white/5 border-white/10 text-muted hover:text-sub hover:bg-white/10'
                                      }`}
                                    >
                                      <span>{top.emoji}</span>
                                      {top.label}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>

                            {/* Warning message if pineapple */}
                            {pizza.toppings.includes('pineapple') && (
                              <div className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg p-2 flex items-start gap-1.5 mt-1 leading-normal font-medium text-left">
                                <AlertCircle size={12} className="shrink-0 text-amber-400 mt-0.5" />
                                <span>{dict.alertPineapple}</span>
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

  if (type.toLowerCase().includes('cache')) {
    const isIt = language === 'it'
    const dict = cacheDict[isIt ? 'it' : 'en']

    return (
      <div className="w-full flex flex-col gap-6">
        {/* Toggle Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="text-left">
            <h4 className="text-sm font-black text-white">{dict.cacheTitle}</h4>
            <p className="text-[10px] text-muted">
              {isIt ? 'Simula il comportamento della cache modificando il codice sorgente' : 'Simulate cache behavior by modifying the source code'}
            </p>
          </div>
          
          <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 shrink-0">
            <button
              onClick={() => {
                setIsOptimized(false)
                setBuildStatus('idle')
                setCodeChanged(false)
                setActiveStep(-1)
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !isOptimized 
                  ? 'bg-danger/20 border border-danger/30 text-white' 
                  : 'text-muted hover:text-sub'
              }`}
            >
              {dict.badBtn}
            </button>
            <button
              onClick={() => {
                setIsOptimized(true)
                setBuildStatus('idle')
                setCodeChanged(false)
                setActiveStep(-1)
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isOptimized 
                  ? 'bg-emerald-500/20 border border-emerald-400/30 text-white' 
                  : 'text-muted hover:text-sub'
              }`}
            >
              {dict.goodBtn}
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel: Build Controller */}
          <div className="md:w-7/12 flex flex-col gap-4 bg-black/20 border border-white/5 rounded-2xl p-5 shadow-inner">
            
            {/* Simulation status */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-muted font-black uppercase tracking-wider">
                {isIt ? 'Stato Codice Sorgente:' : 'Source Code Status:'}
              </span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${codeChanged ? 'bg-yellow-400/20 border border-yellow-400/30 text-yellow-300' : 'bg-white/5 text-muted'}`}>
                {codeChanged 
                  ? (isIt ? 'Modificato (index.html cambiato)' : 'Modified (index.html changed)') 
                  : (isIt ? 'Nessuna modifica (Pulito)' : 'Unmodified (Clean)')
                }
              </span>
            </div>

            {/* Code edit simulation button */}
            <button
              onClick={() => {
                setCodeChanged(true)
                setBuildStatus('idle')
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>✏️</span> {dict.editCodeBtn}
            </button>

            {/* Build action button */}
            <button
              disabled={buildStatus === 'building'}
              onClick={runBuildSimulation}
              className={`w-full py-3 px-4 rounded-xl text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                buildStatus === 'building'
                  ? 'bg-white/5 border-white/10 text-muted cursor-not-allowed'
                  : isOptimized 
                    ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-400/25 shadow-emerald-500/10'
                    : 'bg-danger hover:bg-danger/80 border-danger/25 shadow-danger/10'
              }`}
            >
              <span>⚡</span> {isIt ? 'Esegui Build (docker build)' : 'Run Build (docker build)'}
            </button>

            {/* Dockerfile Preview */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[9px] text-muted/60 font-black uppercase tracking-widest text-left select-none">
                Dockerfile ({isOptimized ? 'Optimized' : 'Unoptimized'})
              </span>
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 mono text-[10px] sm:text-xs leading-relaxed text-sub shadow-inner text-left">
                <div className="text-muted mb-1"># Dockerfile</div>
                <div><span className="text-blue-400 font-bold">FROM</span> <span className="text-orange-300">node:18-alpine</span></div>
                
                {!isOptimized ? (
                  <>
                    <div className={codeChanged ? 'bg-yellow-400/10 border-l-2 border-yellow-400 pl-1 my-0.5' : ''}>
                      <span className="text-blue-400 font-bold">COPY</span> <span className="text-emerald-300">. .</span>
                    </div>
                    <div className={codeChanged ? 'bg-red-500/10 border-l-2 border-red-500 pl-1 my-0.5' : ''}>
                      <span className="text-blue-400 font-bold">RUN</span> <span className="text-purple-300">npm install</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="my-0.5 pl-1">
                      <span className="text-blue-400 font-bold">COPY</span> <span className="text-emerald-300">package.json ./</span>
                    </div>
                    <div className="my-0.5 pl-1">
                      <span className="text-blue-400 font-bold">RUN</span> <span className="text-purple-300">npm install</span>
                    </div>
                    <div className={codeChanged ? 'bg-yellow-400/10 border-l-2 border-yellow-400 pl-1 my-0.5' : ''}>
                      <span className="text-blue-400 font-bold">COPY</span> <span className="text-emerald-300">. .</span>
                    </div>
                  </>
                )}
                
                <div><span className="text-blue-400 font-bold">CMD</span> <span className="text-emerald-400">["node", "server.js"]</span></div>
              </div>
              <p className="text-[10px] text-muted italic text-left">
                {isOptimized ? dict.goodCodeDesc : dict.badCodeDesc}
              </p>
            </div>

          </div>

          {/* Right Panel: Cache status stack */}
          <div className="md:w-5/12 flex flex-col bg-surface border border-white/10 rounded-2xl p-5 shadow-xl justify-between text-left">
            <div className="flex flex-col gap-4">
              <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-white/10 bg-white/5 text-muted self-start">
                {isIt ? 'Layer Stack & Cache' : 'Layer Stack & Cache'}
              </span>

              {/* Stack Visual Representation */}
              <div className="flex flex-col gap-2 w-full my-2">
                
                {/* CMD Layer */}
                <div className="w-full py-2 px-3 rounded-lg border border-white/5 bg-white/5 text-muted flex items-center justify-between text-xs font-mono">
                  <span>CMD ["node", "server.js"]</span>
                  <span className="text-[9px] opacity-60">{isIt ? 'Metadati' : 'Metadata'}</span>
                </div>

                {!isOptimized ? (
                  // Unoptimized Stack
                  <>
                    {/* RUN npm install */}
                    <motion.div 
                      animate={buildStatus === 'building' && activeStep === 1 ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className={`w-full py-3 px-4 rounded-lg border transition-all flex items-center justify-between text-xs font-mono ${
                        buildStatus === 'idle'
                          ? 'border-white/10 bg-white/5 text-sub'
                          : buildStatus === 'building' && activeStep === 0
                            ? 'border-white/10 bg-white/5 text-sub'
                            : buildStatus === 'building' && activeStep === 1
                              ? 'border-red-400/40 bg-red-500/10 text-red-300'
                              : buildStatus === 'done' && codeChanged
                                ? 'border-red-400 bg-red-500/20 text-white'
                                : 'border-emerald-400 bg-emerald-500/20 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>⚡ RUN npm install</span>
                      </div>
                      <span className="text-[9px] font-bold">
                        {buildStatus === 'done' && codeChanged ? dict.rebuildText : (buildStatus === 'done' ? dict.cachedText : '...')}
                      </span>
                    </motion.div>

                    {/* COPY . . */}
                    <motion.div 
                      animate={buildStatus === 'building' && activeStep === 0 ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className={`w-full py-3 px-4 rounded-lg border transition-all flex items-center justify-between text-xs font-mono ${
                        buildStatus === 'idle'
                          ? 'border-white/10 bg-white/5 text-sub'
                          : buildStatus === 'building' && activeStep === 0
                            ? 'border-yellow-400/40 bg-yellow-500/10 text-yellow-300'
                            : buildStatus === 'done' && codeChanged
                              ? 'border-yellow-400 bg-yellow-500/20 text-white'
                              : 'border-emerald-400 bg-emerald-500/20 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>📂 COPY . .</span>
                      </div>
                      <span className="text-[9px] font-bold">
                        {buildStatus === 'done' && codeChanged ? dict.rebuildFastText : (buildStatus === 'done' ? dict.cachedText : '...')}
                      </span>
                    </motion.div>
                  </>
                ) : (
                  // Optimized Stack
                  <>
                    {/* COPY . . */}
                    <motion.div 
                      animate={buildStatus === 'building' && activeStep === 2 ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className={`w-full py-3 px-4 rounded-lg border transition-all flex items-center justify-between text-xs font-mono ${
                        buildStatus === 'idle'
                          ? 'border-white/10 bg-white/5 text-sub'
                          : buildStatus === 'building' && activeStep < 2
                            ? 'border-white/10 bg-white/5 text-sub'
                            : buildStatus === 'building' && activeStep === 2
                              ? 'border-yellow-400/40 bg-yellow-500/10 text-yellow-300'
                              : buildStatus === 'done' && codeChanged
                                ? 'border-yellow-400 bg-yellow-500/20 text-white'
                                : 'border-emerald-400 bg-emerald-500/20 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>📂 COPY . .</span>
                      </div>
                      <span className="text-[9px] font-bold">
                        {buildStatus === 'done' && codeChanged ? dict.rebuildFastText : (buildStatus === 'done' ? dict.cachedText : '...')}
                      </span>
                    </motion.div>

                    {/* RUN npm install */}
                    <motion.div 
                      animate={buildStatus === 'building' && activeStep === 1 ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className={`w-full py-3 px-4 rounded-lg border transition-all flex items-center justify-between text-xs font-mono ${
                        buildStatus === 'idle'
                          ? 'border-white/10 bg-white/5 text-sub'
                          : buildStatus === 'building' && activeStep === 0
                            ? 'border-white/10 bg-white/5 text-sub'
                            : buildStatus === 'building' && activeStep === 1
                              ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300'
                              : 'border-emerald-400 bg-emerald-500/20 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>⚡ RUN npm install</span>
                      </div>
                      <span className="text-[9px] font-bold">
                        {buildStatus === 'done' ? dict.cachedText : '...'}
                      </span>
                    </motion.div>

                    {/* COPY package.json */}
                    <motion.div 
                      animate={buildStatus === 'building' && activeStep === 0 ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className={`w-full py-3 px-4 rounded-lg border transition-all flex items-center justify-between text-xs font-mono ${
                        buildStatus === 'idle'
                          ? 'border-white/10 bg-white/5 text-sub'
                          : buildStatus === 'building' && activeStep === 0
                            ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300'
                            : 'border-emerald-400 bg-emerald-500/20 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>📂 COPY package.json ./</span>
                      </div>
                      <span className="text-[9px] font-bold">
                        {buildStatus === 'done' ? dict.cachedText : '...'}
                      </span>
                    </motion.div>
                  </>
                )}

                {/* FROM Layer */}
                <div className="w-full py-2 px-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 flex items-center justify-between text-xs font-mono">
                  <span>FROM node:18-alpine</span>
                  <span className="text-[9px] font-bold">{dict.cachedText}</span>
                </div>

              </div>

              {/* Simulation Result feedback message */}
              {buildStatus === 'done' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-3.5 border text-xs text-left leading-normal font-medium ${
                    isOptimized && codeChanged
                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                      : !isOptimized && codeChanged
                        ? 'bg-danger/10 border-danger/25 text-red-300'
                        : 'bg-white/5 border-white/10 text-muted'
                  }`}
                >
                  <div className="font-bold mb-1">{dict.statusTitle}</div>
                  <div>{codeChanged ? (isOptimized ? dict.goodStatusDesc : dict.badStatusDesc) : (isIt ? 'Build completata usando la cache per tutti i passaggi.' : 'Build completed using cache for all steps.')}</div>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fallback
  return null
}
