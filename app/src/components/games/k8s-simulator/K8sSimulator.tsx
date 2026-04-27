import React, { useState, useEffect, useRef } from 'react';
import type { K8sGameData, K8sState } from '../../../data/types';
import { K8sEngine } from './K8sEngine';
import { K8sParser } from './K8sParser';
import { K8sVisualizer } from './K8sVisualizer';
import { CheckCircle, TerminalSquare, RotateCcw, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Props {
  data: K8sGameData;
  onComplete?: () => void;
}

export function K8sSimulator({ data, onComplete }: Props) {
  const { resolveString } = useLanguage();
  const [state, setState] = useState<K8sState>(data.startState);
  const [history, setHistory] = useState<{type: 'cmd'|'out', text: string}[]>([]);
  const [input, setInput] = useState('');
  const checkTasksSatisfied = React.useCallback((currentState: K8sState, currentCompleted: Set<string>) => {
    const newlyCompleted = new Set(currentCompleted);
    let changed = false;

    for (const task of data.tasks) {
      if (newlyCompleted.has(task.id)) continue;

      let isDone = false;
      const [type, arg1, arg2] = task.condition.split(':');

      if (type === 'DEPLOYMENT_EXISTS') {
        isDone = !!currentState.deployments.find(d => d.name === arg1);
      } else if (type === 'REPLICAS') {
        const d = currentState.deployments.find(d => d.name === arg1);
        isDone = !!d && d.replicas === parseInt(arg2);
      } else if (type === 'SERVICE_EXISTS') {
        isDone = !!currentState.services.find(s => s.name === arg1);
      } else if (type === 'PODS_RUNNING') {
        const count = currentState.pods.filter(p => p.status === 'Running').length;
        isDone = count >= parseInt(arg1);
      }

      if (isDone) {
        newlyCompleted.add(task.id);
        changed = true;
      } else {
        break;
      }
    }

    return { newlyCompleted, changed };
  }, [data.tasks]);

  const [completedTasks, setCompletedTasks] = useState<Set<string>>(() => {
    const results = checkTasksSatisfied(data.startState, new Set());
    return results.newlyCompleted;
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim();
      setHistory(prev => [...prev, { type: 'cmd', text: `$ ${cmd}` }]);
      
      const engine = new K8sEngine(state);
      const result = K8sParser.execute(engine, cmd);
      
      setHistory(prev => [...prev, { type: 'out', text: resolveString(result.out) }]);
      
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
    setHistory([{ type: 'out', text: resolveString({ en: 'Kubernetes cluster reset. API server restarted.', it: 'Cluster Kubernetes resettato. API server riavviato.' }) }]);
    setCompletedTasks(new Set());
    setInput('');
  };

  const tasks = data.tasks.map(t => ({
    ...t,
    completed: completedTasks.has(t.id)
  }));

  const allCompleted = tasks.length > 0 && tasks.every(t => t.completed);

  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (allCompleted && onComplete && !hasNotifiedRef.current) {
      hasNotifiedRef.current = true;
      onComplete();
    } else if (!allCompleted) {
      hasNotifiedRef.current = false;
    }
  }, [allCompleted, onComplete]);

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex justify-between items-start mb-2">
         <div className="flex flex-col">
            <span className="text-xs text-secondary font-black uppercase tracking-widest leading-none mb-2">Kubernetes Cluster Simulator</span>
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-white">{resolveString({ en: 'Cloud Laboratory', it: 'Laboratorio Cloud' })}</h3>
              <button 
                onClick={handleReset}
                className="px-3 py-1 flex items-center gap-2 text-xs bg-white/5 hover:bg-danger/20 text-muted hover:text-danger rounded border border-white/10 hover:border-danger/30 transition-colors"
              >
                <RotateCcw size={12} /> {resolveString({ en: 'Reset Cluster', it: 'Resetta Cluster' })}
              </button>
            </div>
         </div>
         {allCompleted && (
           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="px-4 py-2 rounded-xl bg-secondary/20 border border-secondary/30 text-secondary text-xs font-black uppercase flex gap-2 items-center">
              <CheckCircle size={16} /> {resolveString({ en: 'Orchestration Successful!', it: 'Orchestrazione Riuscita!' })}
           </motion.div>
         )}
      </div>

      <div className="flex flex-col gap-6">
         <div className="w-full h-[400px] bg-black/40 rounded-2xl border border-white/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(65,105,225,0.1),transparent)] pointer-events-none" />
            <K8sVisualizer state={state} />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col gap-3 h-full">
              <span className="text-[10px] text-muted font-black uppercase tracking-widest border-b border-white/5 pb-2">{resolveString({ en: 'Cluster Objectives', it: 'Obiettivi del Cluster' })}</span>
              {tasks.map(t => (
                <div key={t.id} className="flex gap-3 items-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${t.completed ? 'bg-secondary border-secondary' : 'border-white/20 bg-black'}`}>
                    {t.completed && <CheckCircle className="text-white" size={10} />}
                  </div>
                  <span className={`text-xs font-bold transition-colors ${t.completed ? 'text-white/50 line-through' : 'text-white'}`}>{resolveString(t.instruction)}</span>
                </div>
              ))}
            </div>

            <div className="bg-black/95 rounded-xl border border-white/10 p-5 font-mono text-xs flex flex-col min-h-[250px] shadow-2xl relative overflow-hidden">
              <div className="flex flex-col gap-2 mb-4 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-secondary/80">
                  <TerminalSquare size={14} /> <span className="text-[10px] uppercase font-black tracking-widest text-secondary">kubectl CLI</span>
                </div>
                <div className="flex items-start gap-1 p-2 bg-secondary/10 rounded-lg text-[9px] text-secondary border border-secondary/20">
                  <Info size={10} className="shrink-0 mt-0.5" />
                  <span>Try: `kubectl apply -f nginx-deployment.yaml` or `kubectl get nodes`</span>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-1.5 pb-2 scrollbar-hide">
                {history.map((h, i) => (
                  <div key={i} className={`${h.type === 'cmd' ? "text-secondary font-bold" : "text-muted whitespace-pre-wrap pl-2"} mb-1`}>
                    {h.text}
                  </div>
                ))}
                {!allCompleted && (
                  <div className="flex items-center mt-3 gap-2 bg-black/50 border border-white/10 focus-within:border-secondary/50 focus-within:bg-black/80 rounded-md p-2 transition-all">
                    <span className="text-secondary font-black">$</span>
                    <input 
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleCommand}
                      spellCheck={false}
                      autoFocus
                      placeholder={resolveString({ en: 'Type kubectl command...', it: 'Scrivi comando kubectl...' })}
                      className="flex-1 bg-transparent outline-none border-none text-secondary placeholder:text-white/20 font-mono text-sm min-w-0"
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
