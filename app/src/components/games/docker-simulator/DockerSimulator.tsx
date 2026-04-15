import React, { useState, useEffect, useRef } from 'react';
import type { DockerGameData, DockerState } from '../../../data/types';
import { DockerEngine } from './DockerEngine';
import { DockerParser } from './DockerParser';
import { DockerVisualizer } from './DockerVisualizer';
import { CheckCircle, TerminalSquare, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  data: DockerGameData;
  onComplete?: () => void;
}

export function DockerSimulator({ data, onComplete }: Props) {
  const [state, setState] = useState<DockerState>(data.startState);
  const [history, setHistory] = useState<{type: 'cmd'|'out', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const checkTasksSatisfied = React.useCallback((currentState: DockerState, currentCompleted: Set<string>) => {
    const newlyCompleted = new Set(currentCompleted);
    let changed = false;

    data.tasks.forEach(task => {
      if (newlyCompleted.has(task.id)) return;

      let isDone = false;
      const [type, arg1, arg2] = task.condition.split(':');

      if (type === 'PULLED') {
        isDone = !!currentState.images.find(img => img.name === arg1);
      } else if (type === 'RUNNING') {
        isDone = !!currentState.containers.find(c => c.image === arg1 && c.status === 'running');
      } else if (type === 'PORT_MAPPED') {
        const c = currentState.containers.find(c => c.image === arg1 && c.status === 'running');
        isDone = !!c && c.ports.includes(arg2);
      } else if (type === 'STOPPED') {
        const c = currentState.containers.find(c => c.image === arg1);
        isDone = !!c && c.status === 'exited';
      }

      if (isDone) {
        newlyCompleted.add(task.id);
        changed = true;
      }
    });

    return { newlyCompleted, changed };
  }, [data.tasks]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim();
      setHistory(prev => [...prev, { type: 'cmd', text: `$ ${cmd}` }]);
      
      const engine = new DockerEngine(state);
      const result = DockerParser.execute(engine, cmd);
      
      setHistory(prev => [...prev, { type: 'out', text: result.out }]);
      
      if (result.success) {
        const newState = engine.getState();
        setState(newState);
        
        const { newlyCompleted, changed } = checkTasksSatisfied(newState, completedTasks);
        if (changed) {
          setCompletedTasks(newlyCompleted);
        }
      }
      
      setInput('');
    }
  };

  const handleReset = () => {
    setState(data.startState);
    setHistory([{ type: 'out', text: 'Docker daemon restarted. State cleared.' }]);
    setCompletedTasks(new Set());
    setInput('');
  };

  const tasks = data.tasks.map(t => ({
    ...t,
    completed: completedTasks.has(t.id)
  }));

  const allCompleted = tasks.length > 0 && tasks.every(t => t.completed);

  useEffect(() => {
    if (allCompleted && onComplete) {
      onComplete();
    }
  }, [allCompleted, onComplete]);

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex justify-between items-start mb-2">
         <div className="flex flex-col">
            <span className="text-xs text-primary font-black uppercase tracking-widest leading-none mb-2">Docker Engine Simulator</span>
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-white">Interactive Lab</h3>
              <button 
                onClick={handleReset}
                className="px-3 py-1 flex items-center gap-2 text-xs bg-white/5 hover:bg-danger/20 text-muted hover:text-danger rounded border border-white/10 hover:border-danger/30 transition-colors"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>
         </div>
         {allCompleted && (
           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="px-4 py-2 rounded-xl bg-[#06d6a0]/20 border border-[#06d6a0]/30 text-[#06d6a0] text-xs font-black uppercase flex gap-2 items-center">
              <CheckCircle size={16} /> Image Built & Shipped!
           </motion.div>
         )}
      </div>

      <div className="flex flex-col gap-6">
         <div className="w-full h-[350px] bg-black/40 rounded-2xl border border-white/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />
            <DockerVisualizer state={state} />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col gap-3 h-full">
              <span className="text-[10px] text-muted font-black uppercase tracking-widest border-b border-white/5 pb-2">Mission Objectives</span>
              {tasks.map(t => (
                <div key={t.id} className="flex gap-3 items-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${t.completed ? 'bg-[#06d6a0] border-[#06d6a0]' : 'border-white/20 bg-black'}`}>
                    {t.completed && <CheckCircle className="text-white" size={10} />}
                  </div>
                  <span className={`text-xs font-bold transition-colors ${t.completed ? 'text-white/50 line-through' : 'text-white'}`}>{t.instruction}</span>
                </div>
              ))}
            </div>

            <div className="bg-black/95 rounded-xl border border-white/10 p-5 font-mono text-xs flex flex-col min-h-[250px] shadow-2xl relative overflow-hidden">
              <div className="flex flex-col gap-2 mb-4 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-primary/80">
                  <TerminalSquare size={14} /> <span className="text-[10px] uppercase font-black tracking-widest text-primary">Docker CLI</span>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-1.5 pb-2 scrollbar-hide">
                {history.map((h, i) => (
                  <div key={i} className={`${h.type === 'cmd' ? "text-primary font-bold" : "text-muted whitespace-pre-wrap pl-2"} mb-1`}>
                    {h.text}
                  </div>
                ))}
                {!allCompleted && (
                  <div className="flex items-center mt-3 gap-2 bg-black/50 border border-white/10 focus-within:border-primary/50 focus-within:bg-black/80 rounded-md p-2 transition-all">
                    <span className="text-primary font-black">$</span>
                    <input 
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleCommand}
                      spellCheck={false}
                      autoFocus
                      placeholder="Type docker command..."
                      className="flex-1 bg-transparent outline-none border-none text-[#06d6a0] placeholder:text-white/20 font-mono text-sm min-w-0"
                    />
                  </div>
                )}
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
