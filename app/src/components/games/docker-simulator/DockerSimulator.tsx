import React, { useState, useEffect, useRef } from 'react';
import type { DockerGameData, DockerState } from '../../../data/types';
import { DockerEngine } from './DockerEngine';
import { DockerParser } from './DockerParser';
import { DockerVisualizer } from './DockerVisualizer';
import { CheckCircle, TerminalSquare, RotateCcw, Folder, FileCode, FileText, X, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Props {
  data: DockerGameData;
  onComplete?: () => void;
}

export function DockerSimulator({ data, onComplete }: Props) {
  const { t, resolveString } = useLanguage();
  const [state, setState] = useState<DockerState>(data.startState);
  const [history, setHistory] = useState<{type: 'cmd'|'out', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [inspectFile, setInspectFile] = useState<string | null>(null);
  const [taskHintLevels, setTaskHintLevels] = useState<Record<string, number>>({});

  const checkTasksSatisfied = React.useCallback((currentState: DockerState, currentCompleted: Set<string>) => {
    const newlyCompleted = new Set(currentCompleted);
    let changed = false;

    for (const task of data.tasks) {
      if (newlyCompleted.has(task.id)) continue;

      let isDone = false;
      const [type, arg1, arg2] = task.condition.split(':');

      if (type === 'PULLED') {
        isDone = !!currentState.images.find(img => img.name === arg1);
      } else if (type === 'PUSHED') {
        isDone = !!currentState.pushedImages?.includes(arg1);
      } else if (type === 'RUNNING' || type === 'CONTAINER_RUNNING') {
        if (arg1 === '0') {
          isDone = currentState.containers.length === 0 || currentState.containers.every(c => c.status === 'exited');
        } else {
          isDone = !!currentState.containers.find(c => (c.image === arg1 || c.name === arg1) && c.status === 'running');
        }
      } else if (type === 'PORT_MAPPED') {
        const c = currentState.containers.find(c => (c.image === arg1 || c.name === arg1) && c.status === 'running');
        isDone = !!c && c.ports.includes(arg2);
      } else if (type === 'STOPPED') {
        const c = currentState.containers.find(c => c.image === arg1 || c.name === arg1);
        isDone = !!c && c.status === 'exited';
      } else if (type === 'VOLUME_EXISTS') {
        isDone = !!currentState.volumes?.find(v => v.name === arg1);
      } else if (type === 'NETWORK_EXISTS') {
        isDone = !!currentState.networks?.find(n => n.name === arg1);
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
      
      const engine = new DockerEngine(state);
      const result = DockerParser.execute(engine, cmd);
      
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
    setHistory([{ type: 'out', text: resolveString({ en: 'Docker daemon restarted. State cleared.', it: 'Daemon Docker riavviato. Stato cancellato.' }) }]);
    setCompletedTasks(new Set());
    setTaskHintLevels({});
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

  // Calculate XP penalty percentage
  const maxHintLevel = Math.max(0, ...Object.values(taskHintLevels));

  const getXpPercent = () => {
    if (maxHintLevel === 0) return 100;
    if (maxHintLevel === 1) return 85;
    if (maxHintLevel === 2) return 65;
    return 50;
  };

  const currentUncompletedTask = tasks.find(t => !t.completed);
  const currentTaskId = currentUncompletedTask?.id;
  const currentHintLevel = currentTaskId ? (taskHintLevels[currentTaskId] || 0) : 0;

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex justify-between items-start mb-2">
         <div className="flex flex-col">
            <span className="text-xs text-primary font-black uppercase tracking-widest leading-none mb-2">Docker Engine Simulator</span>
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-white">{resolveString({ en: 'Interactive Lab', it: 'Laboratorio Interattivo' })}</h3>
              <button 
                onClick={handleReset}
                className="px-3 py-1 flex items-center gap-2 text-xs bg-white/5 hover:bg-danger/20 text-muted hover:text-danger rounded border border-white/10 hover:border-danger/30 transition-colors"
              >
                <RotateCcw size={12} /> {t('common.restart')}
              </button>
            </div>
         </div>
         {allCompleted && (
           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="px-4 py-2 rounded-xl bg-[#06d6a0]/20 border border-[#06d6a0]/30 text-[#06d6a0] text-xs font-black uppercase flex gap-2 items-center">
              <CheckCircle size={16} /> 
              {maxHintLevel === 0 
                ? resolveString({ en: `Completed! +100% XP (No hints used 🌟)`, it: `Completato! +100% XP (Zero aiuti usati 🌟)` })
                : resolveString({ en: `Completed! +${getXpPercent()}% XP (${maxHintLevel} hint${maxHintLevel > 1 ? 's' : ''} used)`, it: `Completato! +${getXpPercent()}% XP (${maxHintLevel} aiut${maxHintLevel > 1 ? 'i' : 'o'} usat${maxHintLevel > 1 ? 'i' : 'o'})` })}
           </motion.div>
         )}
      </div>

      <div className="flex flex-col gap-6">
         <div className="bg-black/40 border border-white/10 rounded-xl p-3 flex flex-col gap-3 text-xs">
           <div className="flex flex-wrap items-center justify-between gap-3">
             <div className="flex items-center gap-2 text-muted">
               <Folder size={14} className="text-primary" />
               <span className="font-mono text-white/80 font-bold">{resolveString({ en: 'Context (Working Dir ./):', it: 'Contesto (Cartella ./):' })}</span>
             </div>
             <div className="flex items-center gap-2 font-mono">
               <button
                 onClick={() => setInspectFile(prev => prev === 'Dockerfile' ? null : 'Dockerfile')}
                 className={`px-2.5 py-1 border rounded flex items-center gap-1.5 transition-all text-xs font-bold ${
                   inspectFile === 'Dockerfile'
                     ? 'bg-primary/30 text-primary border-primary'
                     : 'bg-primary/20 hover:bg-primary/30 border-primary/40 text-primary'
                 }`}
                 title="Click to view/hide Dockerfile"
               >
                 <FileCode size={13} /> Dockerfile {inspectFile === 'Dockerfile' ? '▲' : '▼'}
               </button>
               <button
                 onClick={() => setInspectFile(prev => prev === 'package.json' ? null : 'package.json')}
                 className={`px-2.5 py-1 border rounded flex items-center gap-1.5 transition-all text-xs ${
                   inspectFile === 'package.json'
                     ? 'bg-white/20 text-white border-white/40 font-bold'
                     : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70'
                 }`}
                 title="Click to view/hide package.json"
               >
                 <FileText size={13} /> package.json {inspectFile === 'package.json' ? '▲' : '▼'}
               </button>
               <button
                 onClick={() => setInspectFile(prev => prev === 'server.js' ? null : 'server.js')}
                 className={`px-2.5 py-1 border rounded flex items-center gap-1.5 transition-all text-xs ${
                   inspectFile === 'server.js'
                     ? 'bg-white/20 text-white border-white/40 font-bold'
                     : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70'
                 }`}
                 title="Click to view/hide server.js"
               >
                 <FileText size={13} /> server.js {inspectFile === 'server.js' ? '▲' : '▼'}
               </button>
             </div>
           </div>

           {inspectFile && (
             <motion.div 
               initial={{ opacity: 0, height: 0 }} 
               animate={{ opacity: 1, height: 'auto' }} 
               exit={{ opacity: 0, height: 0 }}
               className="bg-black/90 border border-white/10 rounded-xl p-4 flex flex-col gap-2 font-mono text-xs mt-1"
             >
               <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-1">
                 <span className="text-primary font-bold flex items-center gap-1.5">
                   <FileCode size={14} /> {inspectFile}
                 </span>
                 <button onClick={() => setInspectFile(null)} className="text-white/50 hover:text-white text-xs">
                   <X size={14} />
                 </button>
               </div>
               <pre className="text-[#06d6a0] overflow-x-auto leading-relaxed">
                 {inspectFile === 'Dockerfile' && `FROM node:18-alpine\nWORKDIR /app\nCOPY package.json ./\nRUN npm install\nCOPY . .\nCMD ["node", "server.js"]`}
                 {inspectFile === 'package.json' && `{\n  "name": "backend-app",\n  "version": "1.0.0",\n  "scripts": { "start": "node server.js" },\n  "dependencies": { "express": "^4.18.2" }\n}`}
                 {inspectFile === 'server.js' && `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.send('Hello from Container!'));\napp.listen(3000);`}
               </pre>
             </motion.div>
           )}
         </div>

         <div className="w-full h-[350px] bg-black/40 rounded-2xl border border-white/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />
            <DockerVisualizer state={state} />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col justify-between gap-4 h-full">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[10px] text-muted font-black uppercase tracking-widest">{resolveString({ en: 'Mission Objectives', it: 'Obiettivi Missione' })}</span>
                  {currentHintLevel > 0 && (
                    <span className="text-[10px] text-yellow-400/80 font-mono font-bold">
                      XP: {getXpPercent()}%
                    </span>
                  )}
                </div>
                {tasks.map(t => (
                  <div key={t.id} className="flex gap-3 items-center">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${t.completed ? 'bg-[#06d6a0] border-[#06d6a0]' : 'border-white/20 bg-black'}`}>
                      {t.completed && <CheckCircle className="text-white" size={10} />}
                    </div>
                    <span className={`text-xs font-bold transition-colors ${t.completed ? 'text-[#06d6a0] font-mono' : 'text-white'}`}>{resolveString(t.instruction)}</span>
                  </div>
                ))}
              </div>

              {!allCompleted && currentUncompletedTask?.hints && (
                <div className="mt-2 flex flex-col gap-2.5 pt-3 border-t border-white/5">
                  {currentHintLevel > 0 && (
                    <div className="flex flex-col gap-2">
                      {currentUncompletedTask.hints.slice(0, currentHintLevel).map((h, idx) => {
                        const hintText = resolveString(h);
                        const codeMatch = hintText.match(/`([^`]+)`/);
                        const cmdToInsert = codeMatch ? codeMatch[1] : '';
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 rounded-lg border text-xs leading-relaxed font-mono ${
                              idx === 0
                                ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200'
                                : idx === 1
                                ? 'bg-orange-500/10 border-orange-500/30 text-orange-200'
                                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span>{hintText}</span>
                              {idx === 2 && cmdToInsert && (
                                <button
                                  onClick={() => setInput(cmdToInsert)}
                                  className="px-2 py-0.5 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-400/40 rounded text-[10px] font-bold shrink-0 transition-colors"
                                >
                                  {resolveString({ en: '⚡ Insert', it: '⚡ Inserisci' })}
                                </button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {currentHintLevel < 3 && (
                    <button
                      onClick={() => {
                        if (currentTaskId) {
                          setTaskHintLevels(prev => ({
                            ...prev,
                            [currentTaskId]: Math.min(3, (prev[currentTaskId] || 0) + 1)
                          }));
                        }
                      }}
                      className="w-full py-2 px-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-300 text-xs font-bold flex items-center justify-center gap-2 transition-all group"
                    >
                      <Lightbulb size={14} className="group-hover:scale-110 transition-transform" />
                      {currentHintLevel === 0 && resolveString({ en: 'Need a Hint? (-15% XP)', it: 'Serve un aiuto? (-15% XP)' })}
                      {currentHintLevel === 1 && resolveString({ en: 'More Details (-35% XP)', it: 'Altro aiuto (-35% XP)' })}
                      {currentHintLevel === 2 && resolveString({ en: 'Reveal Solution (-50% XP)', it: 'Rivela soluzione (-50% XP)' })}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="bg-black/95 rounded-xl border border-white/10 p-5 font-mono text-xs flex flex-col min-h-[250px] shadow-2xl relative overflow-hidden">
              <div className="flex flex-col gap-2 mb-4 border-b border-white/5 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary/80">
                    <TerminalSquare size={14} /> <span className="text-[10px] uppercase font-black tracking-widest text-primary">Docker CLI</span>
                  </div>
                  <span className="text-[10px] text-white/30 font-mono">Try: ls | cat Dockerfile</span>
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
                      placeholder={resolveString({ en: 'Type a Docker command (e.g., docker ps, docker run)...', it: 'Scrivi un comando Docker (es. docker ps, docker run)...' })}
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
