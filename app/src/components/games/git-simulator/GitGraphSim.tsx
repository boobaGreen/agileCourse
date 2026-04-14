import React, { useState, useEffect, useRef } from 'react';
import type { GitGraphGameData, GitGraphState } from '../../../data/types';
import { GitEngine } from './GitEngine';
import { GitParser } from './GitParser';
import { GitVisualGraph } from './GitVisualGraph';
import { CheckCircle, TerminalSquare, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  data: GitGraphGameData;
  onComplete?: () => void;
}

export function GitGraphSim({ data, onComplete }: Props) {
  const [state, setState] = useState<GitGraphState>(data.startState);
  const [history, setHistory] = useState<{type: 'cmd'|'out', text: string}[]>([]);
  const [input, setInput] = useState('');
  // Funzione pura per calcolare quali task sono soddisfatti da uno stato
  const checkTasksSatisfied = React.useCallback((currentState: GitGraphState, currentCompleted: Set<string>) => {
    const newlyCompleted = new Set(currentCompleted);
    let changed = false;

    data.tasks.forEach(task => {
      if (newlyCompleted.has(task.id)) return;

      let isDone = false;
      const [type, arg1, arg2] = task.condition.split(':');

      if (type === 'BRANCH_EXISTS') {
        isDone = !!currentState.branches[arg1];
      } else if (type === 'CURRENT_BRANCH') {
        isDone = currentState.head.type === 'branch' && currentState.head.target === arg1;
      } else if (type === 'COMMIT_COUNT') {
        const branchHash = currentState.branches[arg1];
        if (branchHash) {
          let count = 0;
          let curr: GitGraphState['commits'][string] | undefined = currentState.commits[branchHash];
          while(curr) {
            count++;
            const parentId: string | undefined = curr.parents[0];
            curr = parentId ? currentState.commits[parentId] : undefined;
          }
          if (count >= parseInt(arg2)) isDone = true;
        }
      } else if (type === 'DETACHED_HEAD') {
        isDone = currentState.head.type === 'commit' && (!arg1 || currentState.head.target === arg1);
      } else if (type === 'MERGED') { 
        const currHash = currentState.head.type === 'branch' ? currentState.branches[currentState.head.target] : '';
        if (currHash) {
          const c = currentState.commits[currHash];
          if (c && c.parents.length > 1) isDone = true;
        }
      }

      if (isDone) {
        newlyCompleted.add(task.id);
        changed = true;
      }
    });

    return { newlyCompleted, changed };
  }, [data.tasks]);

  const [completedTasks, setCompletedTasks] = useState<Set<string>>(() => {
    // Inizializzazione corretta al mount
    const results = checkTasksSatisfied(data.startState, new Set());
    return results.newlyCompleted;
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const tasks = React.useMemo(() => {
    return data.tasks.map(t => ({
      ...t,
      completed: completedTasks.has(t.id)
    }));
  }, [data.tasks, completedTasks]);

  const allCompleted = tasks.length > 0 && tasks.every(t => t.completed);

  // Notifica al parent quando il livello è finito
  useEffect(() => {
    if (allCompleted && onComplete) {
      onComplete();
    }
  }, [allCompleted, onComplete]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim();
      const newHistory = [...history, { type: 'cmd' as const, text: `$ ${cmd}` }];
      
      const engine = new GitEngine(state);
      const result = GitParser.execute(engine, cmd);
      
      newHistory.push({ type: 'out' as const, text: result.out });
      
      if (result.success) {
        const newState = engine.getState();
        setState(newState);
        
        // Sincronizziamo i task immediatamente dopo l'azione effettuata
        const { newlyCompleted, changed } = checkTasksSatisfied(newState, completedTasks);
        if (changed) {
          setCompletedTasks(newlyCompleted);
        }
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  const handleReset = () => {
    setState(data.startState);
    setHistory([{ type: 'out', text: 'Time rewound. Scenario reset.' }]);
    setCompletedTasks(new Set());
    setInput('');
  };

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex justify-between items-start mb-2">
         <div className="flex flex-col">
            <span className="text-xs text-primary font-black uppercase tracking-widest leading-none mb-2">Git Graph Simulator</span>
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-white">Interactive Environment</h3>
              <button 
                onClick={handleReset}
                className="px-3 py-1 flex items-center gap-2 text-xs bg-white/5 hover:bg-danger/20 text-muted hover:text-danger rounded border border-white/10 hover:border-danger/30 transition-colors"
                title="Restart level from scratch"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>
         </div>
         {allCompleted && (
           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="px-4 py-2 rounded-xl bg-git/20 border border-git/30 text-git text-xs font-black uppercase flex gap-2 items-center">
              <CheckCircle size={16} /> Level Cleared!
           </motion.div>
         )}
      </div>

      <div className="flex flex-col gap-6">
         {/* Graph Area (Now at the top, full width) */}
         <div className="w-full flex flex-col min-h-[300px] bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
            <GitVisualGraph state={state} />
         </div>

         {/* Tasks & Terminal Area (Grouped together below) */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Task List */}
            <div className="flex flex-col gap-3">
              <div className="bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col gap-3 h-full">
                <span className="text-[10px] text-muted font-black uppercase tracking-widest border-b border-white/5 pb-2">Mission Objectives</span>
                {tasks.map(t => (
                  <div key={t.id} className="flex gap-3 items-center">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${t.completed ? 'bg-git border-git' : 'border-danger/50 bg-black'}`}>
                      {t.completed && <CheckCircle className="text-white" size={10} />}
                    </div>
                    <span className={`text-xs font-bold transition-colors ${t.completed ? 'text-white/50 line-through' : 'text-white'}`}>{t.instruction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div className="bg-black/80 rounded-xl border border-white/10 p-5 font-mono text-xs flex flex-col min-h-[250px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              
              <div className="flex flex-col gap-2 mb-4 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-primary/80">
                  <TerminalSquare size={14} /> <span className="text-[10px] uppercase font-black tracking-widest text-primary">Git Bash Simulator</span>
                </div>
                <p className="text-[10px] text-muted leading-relaxed">
                  💡 Type <span className="text-git font-bold">git commands</span> to reach your mission objectives.
                </p>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-1.5 pb-2 scrollbar-thin">
                {history.map((h, i) => (
                  <div key={i} className={`${h.type === 'cmd' ? "text-primary font-bold" : "text-muted whitespace-pre-wrap pl-2"} mb-1`}>
                    {h.text}
                  </div>
                ))}
                {!allCompleted && (
                  <div className="flex items-center mt-3 gap-2 bg-black/50 border border-white/10 focus-within:border-[#06d6a0]/50 focus-within:bg-black/80 rounded-md p-2 transition-all shadow-inner">
                    <span className="text-[#06d6a0] font-black">$</span>
                    <input 
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleCommand}
                      spellCheck={false}
                      autoFocus
                      placeholder="e.g. git commit"
                      className="flex-1 bg-transparent outline-none border-none text-[#06d6a0] placeholder:text-white/20 font-mono text-sm min-w-0"
                    />
                    <div className="text-[10px] text-white/30 font-sans px-2 hidden sm:block text-right">ENTER</div>
                  </div>
                )}
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
