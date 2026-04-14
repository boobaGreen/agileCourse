import { useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GitGraphState } from '../../../data/types';

interface GitVisualGraphProps {
  state: GitGraphState;
}

// Interfaccia interna per il layout calcolato
interface NodeLayout {
  id: string;
  x: number;
  y: number;
  message: string;
}

export function GitVisualGraph({ state }: GitVisualGraphProps) {
  // 1. Calcolo del layout algoritmico del grafo (Depth = X, Branch/Divergence = Y)
  const layout = useMemo(() => {
    const nodes = new Map<string, NodeLayout>();
    const depths = new Map<string, number>();
    
    // Assegna profondità partendo da C1 (root assumed to be the first commit without parents)
    let maxDepth = 0;
    
    // In un DAG vero servirebbe scorrere topologicamente, 
    // ma siccome le chiavi aumentano (C1, C2) facciamo un approccio semplificato per garantito ordine.
    const commitKeys = Object.keys(state.commits).sort((a, b) => {
      return parseInt(a.replace('C','')) - parseInt(b.replace('C',''));
    });

    // Per determinare la corsia Y: main = 0
    // Ogni volta che c'è una biforcazione (due figli dello stesso parent), uno prende Y del parent, l'altro Y+1
    const yTracks = new Map<string, number>();

    for (const key of commitKeys) {
      const commit = state.commits[key];
      let depth = 0;
      let y = 0;

      if (commit.parents.length === 0) {
        depth = 0;
        y = 0; // Root is always on track 0
        yTracks.set(key, 0);
      } else {
        // Find deepest parent
        const parentDepths = commit.parents.map(p => depths.get(p) || 0);
        depth = Math.max(...parentDepths) + 1;
        
        // Assegna corsia Y. Se è un branch, cerca di rimanere nella corsia.
        // Semplificazione UX per il React renderer: 
        // Se un nodo ha genitore X, prende la corsia di X (se è l'unico figlio elaborato finora),
        // Altrimenti prende corsia libera.
        const parentId = commit.parents[0];
        const pY = yTracks.get(parentId) || 0;
        
        // Verifica se qualche altro nodo (biforcazione) ha già reclamato la corsia del genitore a questa deepness
        // Molto base: usiamo solo la "storia cronologica".
        y = pY; 
        // Se questo genitore ha già un altro figlio registrato (quindi siamo un ramo divergente)
        const sibling = Array.from(nodes.values()).find(n => state.commits[n.id].parents.includes(parentId));
        if (sibling && sibling.id !== key) {
           y = pY + 1; // Sposta giù di uno slot se è una biforcazione
        }
        yTracks.set(key, y);
      }

      depths.set(key, depth);
      maxDepth = Math.max(maxDepth, depth);

      nodes.set(key, { id: key, x: depth, y, message: commit.message });
    }

    return { nodes: Array.from(nodes.values()), maxDepth };
  }, [state]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollContainerRef.current) {
      // scroll smoothly to the right when state updates
      scrollContainerRef.current.scrollTo({ left: scrollContainerRef.current.scrollWidth, behavior: 'smooth' });
    }
  }, [layout.maxDepth, state.commits]);

  const CELL_SIZE = 80;

  return (
    <div ref={scrollContainerRef} className="w-full relative overflow-x-auto overflow-y-hidden border border-white/10 rounded-2xl bg-[#0d1117] p-10 min-h-[250px] scrollbar-thin flex items-center">
      <div 
        className="relative" 
        style={{ width: (layout.maxDepth + 2) * CELL_SIZE, height: '100%' }}
      >
        {/* Draw edges (SVG background layer) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
          {layout.nodes.map(node => {
            const commit = state.commits[node.id];
            return commit.parents.map(parentId => {
              const parentNode = layout.nodes.find(n => n.id === parentId);
              if (!parentNode) return null;
              
              const startX = parentNode.x * CELL_SIZE + 20; // 20 is node half-width
              const startY = parentNode.y * CELL_SIZE + 20;
              const endX = node.x * CELL_SIZE + 20;
              const endY = node.y * CELL_SIZE + 20;

              // Curved path per belle linee di merge/branch
              const path = `M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`;

              return (
                <motion.path 
                  key={`${parentId}-${node.id}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  d={path} 
                  stroke="rgba(240,80,51,0.5)" 
                  strokeWidth="3" 
                  fill="none" 
                  style={{ filter: 'drop-shadow(0px 0px 4px rgba(240,80,51,0.4))' }}
                />
              );
            });
          })}
        </svg>

        {/* Draw commits (HTML layer for nice Framer motion components) */}
        <AnimatePresence>
          {layout.nodes.map(node => (
            <motion.div
              key={node.id}
              layoutId={`commit-${node.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="absolute w-12 h-12 bg-gradient-to-br from-[#2D333B] to-[#22272E] rounded-full border-[3px] border-[#F05033] flex items-center justify-center shadow-[0_0_15px_rgba(240,80,51,0.4)] z-10"
              style={{
                left: node.x * CELL_SIZE,
                top: node.y * CELL_SIZE
              }}
              title={node.message}
            >
              <span className="text-[10px] font-black font-mono text-white select-none">{node.id}</span>

              {state.head.type === 'commit' && state.head.target === node.id && (
                <motion.div layoutId="head-pointer" className="absolute -top-10 px-2 py-1 bg-[#06d6a0] text-black text-[9px] font-black rounded uppercase flex gap-1 items-center before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:border-l-4 before:border-r-4 before:border-t-4 before:border-transparent before:border-t-[#06d6a0] shadow-xl">
                  📍 HEAD
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Draw Branch Pointers */}
        {layout.nodes.map(node => {
          // Find all branches pointing to this node
          const branchesHere = Object.entries(state.branches)
                                     .filter(([_, target]) => target === node.id)
                                     .map(([name]) => name);
          
          if (branchesHere.length === 0) return null;

          return (
            <div 
              key={`labels-${node.id}`} 
              className="absolute flex flex-col gap-1 z-20 pointer-events-none items-center"
              style={{
                left: node.x * CELL_SIZE + 24, // 24 = half of 48px circle
                top: node.y * CELL_SIZE + 55, // below node
                transform: 'translateX(-50%)'
              }}
            >
              {branchesHere.map(branchName => {
                const isHeadHere = state.head.type === 'branch' && state.head.target === branchName;
                return (
                  <motion.div
                    key={`branch-${branchName}`}
                    layoutId={`branch-${branchName}`}
                    className={`px-2 py-1 flex items-center gap-1.5 rounded text-[10px] font-black shadow-lg border ${
                      isHeadHere ? 'bg-[#06d6a0] text-black border-[#06d6a0] shadow-[0_0_10px_rgba(6,214,160,0.5)]' : 'bg-[#3b434f] text-white border-white/30 shadow-black/80'
                    }`}
                  >
                     {isHeadHere && <span className="text-[12px]">📍</span>} {branchName}
                  </motion.div>
                )
              })}
            </div>
          )
        })}

      </div>
    </div>
  );
}
