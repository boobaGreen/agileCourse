import { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { motion, Reorder } from 'framer-motion'
import { CheckCircle, Trophy } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useLanguage } from '../../../contexts/LanguageContext'

// Types
import type { 
  GameDataItem, 
  GameDataClassify, 
  TerminalGameData,
  GitGraphGameData,
  DockerGameData,
  K8sGameData
} from '../../../data/types'

// Specialized Simulators
import { GitGraphSim } from '../../games/git-simulator/GitGraphSim'
import { DockerSimulator } from '../../games/docker-simulator/DockerSimulator'
import { K8sSimulator } from '../../games/k8s-simulator/K8sSimulator'

export function MiniGame({ gameType, gameData, onComplete }: { gameType: string, gameData: unknown, onComplete?: () => void }) {
  if (gameType === 'drag-order') {
    return <DragOrderGame items={gameData as GameDataItem[]} onComplete={onComplete} />
  }

  if (gameType === 'drag-classify') {
    const data = gameData as GameDataClassify
    return <DragClassifyGame categories={data.categories} items={data.items} onComplete={onComplete} />
  }

  if (gameType === 'terminal-sim') {
    return <TerminalSimulatorGame data={gameData as TerminalGameData} onComplete={onComplete} />
  }

  if (gameType === 'git-graph-sim') {
    return <GitGraphSim data={gameData as GitGraphGameData} onComplete={onComplete} />
  }

  if (gameType === 'docker-sim') {
    return <DockerSimulator data={gameData as DockerGameData} onComplete={onComplete} />
  }

  if (gameType === 'k8s-sim') {
    return <K8sSimulator data={gameData as K8sGameData} onComplete={onComplete} />
  }

  return <div className="p-10 text-center text-muted border border-dashed rounded-xl">Game Module Coming Soon...</div>
}

export function DragOrderGame({ items, onComplete }: { items: GameDataItem[], onComplete?: () => void }) {
  const { resolveString } = useLanguage()
  const [solved, setSolved] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(() => [...items].sort(() => Math.random() - 0.5))
  
  const handleReorder = (newOrder: typeof currentOrder) => {
    if (solved) return
    setCurrentOrder(newOrder)
    const isCorrect = newOrder.every((item, i) => item.id === items[i].id)
    if (isCorrect) {
        setSolved(true)
        if (onComplete) onComplete()
    }
  }

  return (
    <div className="card p-6 border-purple-500/20 bg-purple-500/5">
      <div className="text-center mb-6">
        <h4 className="text-white fw-black uppercase tracking-tight mb-1">Challenge: Order the Workflow</h4>
        <p className="text-muted text-xs">Drag the steps into the correct chronological sequence.</p>
      </div>

      <Reorder.Group axis="y" values={currentOrder} onReorder={handleReorder} className="flex flex-col gap-2 mb-6">
         {currentOrder.map((item, idx) => (
           <Reorder.Item
             key={item.id}
             value={item}
             className={`p-3 rounded-xl border flex items-center justify-between cursor-grab active:cursor-grabbing group transition-colors shadow-sm
               ${solved ? 'bg-green/10 border-green/30 !cursor-default' : 'bg-surface2 border-white/5 hover:border-white/20'}
             `}
           >
              <div className="flex items-center gap-3 select-none">
                  <div className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center text-[10px] fw-black text-muted group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  <span className="text-sm fw-bold text-sub group-hover:text-white transition-colors">{resolveString(item.label)}</span>
               </div>
               {solved && <CheckCircle size={14} className="text-green" />}
           </Reorder.Item>
         ))}
      </Reorder.Group>

      {solved && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green text-white fw-black text-sm">
              <Trophy size={16} /> Workflow Mastered! (+10 XP)
           </div>
        </motion.div>
      )}
    </div>
  )
}

const gameDict = {
  en: {
    classifyTitle: 'Challenge: Categorize Components',
    classifySubtitle: 'Drag and drop the cards below into the correct category box, or click the buttons on each card to place them.',
    validated: 'Architecture Validated! (+15 XP)'
  },
  it: {
    classifyTitle: 'Sfida: Categorizza i Componenti',
    classifySubtitle: 'Trascina le schede in basso nel riquadro della categoria corretta, oppure clicca sui pulsanti di ciascuna scheda per posizionarle.',
    validated: 'Architettura Validata! (+15 XP)'
  }
}

export function DragClassifyGame({ categories, items, onComplete }: { categories: GameDataClassify['categories'], items: GameDataClassify['items'], onComplete?: () => void }) {
  const { resolveString, language } = useLanguage()
  const [solved, setSolved] = useState(false)
  const [selections, setSelections] = useState<Record<string, string>>({}) // itemId -> categoryId
  const [currentItems] = useState(() => [...items].sort(() => Math.random() - 0.5))
  const [errorItem, setErrorItem] = useState<string | null>(null)
  const [draggedOver, setDraggedOver] = useState<string | null>(null)

  const classify = (itemId: string, catId: string) => {
    const item = items.find(i => i.id === itemId)
    if (!item) return

    if (catId === item.categoryId) {
      // Correct placement
      setSelections(prev => {
        const next = { ...prev, [itemId]: catId }
        const allDone = items.length === Object.keys(next).length
        if (allDone) {
          setSolved(true)
          if (onComplete) onComplete()
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } })
        }
        return next
      })
    } else {
      // Incorrect placement: shake the card
      setErrorItem(itemId)
      setTimeout(() => {
        setErrorItem(null)
      }, 500)
    }
  }

  const isIt = language === 'it'
  const dict = gameDict[isIt ? 'it' : 'en']

  return (
    <div className="card p-6 border-blue-500/20 bg-blue-500/5 text-left">
      <div className="text-center mb-6">
        <h4 className="text-white fw-black uppercase tracking-tight mb-1">{dict.classifyTitle}</h4>
        <p className="text-muted text-xs leading-relaxed max-w-lg mx-auto">{dict.classifySubtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
         {categories.map(cat => {
           const isOver = draggedOver === cat.id
           return (
             <div 
               key={cat.id}
               onDragOver={(e) => {
                 e.preventDefault()
                 if (!solved) setDraggedOver(cat.id)
               }}
               onDragLeave={() => setDraggedOver(null)}
               onDrop={(e) => {
                 e.preventDefault()
                 setDraggedOver(null)
                 if (solved) return
                 const itemId = e.dataTransfer.getData('text/plain')
                 if (itemId) classify(itemId, cat.id)
               }}
               className={`p-4 rounded-xl border text-center min-h-[130px] flex flex-col items-center gap-3 transition-all duration-200 relative ${
                 isOver 
                   ? 'border-primary bg-primary/10 scale-[1.02] shadow-lg shadow-primary/10' 
                   : 'border-white/10 bg-black/20'
               }`}
             >
                <span className="text-[10px] sm:text-xs fw-black text-white uppercase tracking-widest">{resolveString(cat.label)}</span>
                <div className="flex flex-wrap justify-center gap-2">
                   {items.filter(i => selections[i.id] === cat.id).map(i => (
                     <motion.div 
                       key={i.id}
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="px-2.5 py-1 rounded bg-green/10 border border-green/30 text-[10px] sm:text-xs text-green flex items-center gap-1 font-bold"
                     >
                       ✅ {resolveString(i.label)}
                     </motion.div>
                   ))}
                </div>
             </div>
           )
         })}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
         {currentItems.filter(i => !selections[i.id]).map(item => (
           <motion.div 
             key={item.id}
             animate={errorItem === item.id ? { x: [-6, 6, -6, 6, 0] } : {}}
             transition={{ duration: 0.4 }}
           >
             <div
               draggable={!solved}
               onDragStart={(e) => {
                 if (solved) return
                 e.dataTransfer.setData('text/plain', item.id)
               }}
               className={`p-3 pr-2 rounded-xl bg-surface2 border flex flex-col sm:flex-row items-center gap-3 sm:gap-4 transition-all duration-200 select-none ${
                 errorItem === item.id 
                   ? 'border-red-500/50 bg-red-500/10' 
                   : solved 
                     ? 'border-white/5 opacity-50 cursor-default' 
                     : 'border-white/5 hover:border-white/20 cursor-grab active:cursor-grabbing hover:bg-surface2/80 shadow-md'
               }`}
             >
                <span className="text-xs fw-bold text-white text-center sm:text-left">{resolveString(item.label)}</span>
                <div className="flex gap-1 flex-wrap justify-center">
                   {categories.map(cat => (
                     <button 
                       key={cat.id} 
                       onClick={() => classify(item.id, cat.id)}
                       disabled={solved}
                       className="px-3 py-1.5 rounded text-[10px] sm:text-xs fw-black bg-white/5 hover:bg-primary hover:text-white transition-colors uppercase cursor-pointer"
                     >
                       {resolveString(cat.label)}
                     </button>
                   ))}
                </div>
             </div>
           </motion.div>
         ))}
      </div>

      {solved && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center mt-6">
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green text-white fw-black text-sm shadow-lg shadow-green/20">
              <Trophy size={16} /> {dict.validated}
           </div>
        </motion.div>
      )}
    </div>
  )
}

export function TerminalSimulatorGame({ data, onComplete }: { data: TerminalGameData, onComplete?: () => void }) {
  const { resolveString } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{type: 'cmd' | 'out', text: string}[]>([])
  
  // Use a ref to scroll to bottom
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const step = data?.steps?.[currentStep]
  const isFinished = data?.steps && currentStep >= data.steps.length;

  if (!data?.steps) return null

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const val = input.trim()
      const startText = resolveString(data.startText || { en: '$ ', it: '$ ' })
      const newHistory = [...history, { type: 'cmd' as const, text: startText + val }]
      
      if (!isFinished && val === step?.expectedCommand) {
         if (step.output) {
           newHistory.push({ type: 'out' as const, text: resolveString(step.output) })
         }
         const nextStep = currentStep + 1;
         setCurrentStep(nextStep);
         
         // Se abbiamo finito tutti gli step
         if (data?.steps && nextStep >= data.steps.length) {
           if (onComplete) onComplete();
           confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
         }
      } else {
         newHistory.push({ type: 'out' as const, text: `Command not found or unexpected: ${val}` })
      }
      
      setHistory(newHistory)
      setInput('')
    }
  }

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex justify-between items-center mb-2">
         <div className="flex flex-col">
            <span className="text-xs text-secondary font-black uppercase tracking-widest leading-none mb-2">Interactive Terminal</span>
            <h3 className="text-xl font-black text-white">Command Line Simulator</h3>
         </div>
         <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-[10px] font-black text-muted">
            STEP: <span className={isFinished ? 'text-git' : 'text-primary'}>{Math.min(currentStep + 1, data.steps.length)} / {data.steps.length}</span>
         </div>
      </div>

      <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
         {!isFinished ? (
            <p className="text-sm text-white/90 leading-relaxed fw-medium">
              {resolveString(step.instruction)}
            </p>
         ) : (
           <div className="p-3 bg-git/10 text-git rounded-xl border border-git/20 text-xs font-black tracking-wider uppercase text-center flex items-center justify-center gap-2">
             <CheckCircle size={16} /> Simulator Completed!
           </div>
         )}
      </div>

      <div className="w-full bg-black rounded-lg border border-white/10 p-4 font-mono text-xs md:text-sm flex flex-col min-h-[300px] h-[300px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-2 pb-2 scrollbar-thin scrollbar-thumb-white/10">
           {history.map((h, i) => (
             <div key={i} className={h.type === 'cmd' ? "text-white" : "text-muted whitespace-pre-wrap"}>
               {h.text}
             </div>
           ))}
            {!isFinished && (
              <div className="flex items-center mt-3 gap-2 bg-black/50 border border-white/10 focus-within:border-primary/50 focus-within:bg-black/80 rounded-md p-2 transition-all shadow-inner">
                <span className="text-primary font-black whitespace-pre">{resolveString(data.startText || { en: '$ ', it: '$ ' })}</span>
               <input 
                 type="text"
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 onKeyDown={handleKeyDown}
                 spellCheck={false}
                 className="flex-1 bg-transparent outline-none border-none text-primary placeholder:text-white/20 font-mono caret-primary min-w-0"
                 placeholder="Type here..."
               />
               <div className="text-[10px] text-white/30 font-sans px-2 hidden sm:block">Press ENTER</div>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}
