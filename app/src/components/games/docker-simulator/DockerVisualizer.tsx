import { Box, Layers, Play, Square, Activity, Database, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  state: DockerState;
}

export function DockerVisualizer({ state }: Props) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-10 overflow-y-auto scrollbar-hide">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Registry Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary">
            <Layers size={16} />
            <h4 className="text-xs font-black uppercase tracking-widest">Image Registry (Local)</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence>
              {state.images.map(img => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <Box size={16} />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[11px] font-bold text-white truncate">{img.name}:{img.tag}</span>
                    <span className="text-[10px] text-muted">{img.size}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Volumes & Networks */}
        <div className="flex flex-col gap-6">
          {/* Volumes */}
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-xp">
               <Database size={14} />
               <h4 className="text-[10px] font-black uppercase tracking-widest text-white/70">Named Volumes</h4>
             </div>
             <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {state.volumes?.map(vol => (
                    <motion.div 
                      key={vol.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1.5 rounded-lg bg-xp/10 border border-xp/20 text-xp text-[10px] font-bold flex items-center gap-2"
                    >
                      <Database size={10} /> {vol.name}
                    </motion.div>
                  ))}
                  {(!state.volumes || state.volumes.length === 0) && (
                    <div className="text-[10px] text-muted italic p-2 border border-dashed border-white/5 rounded-lg w-full text-center">No volumes</div>
                  )}
                </AnimatePresence>
             </div>
          </div>

          {/* Networks */}
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-blue-400">
               <Share2 size={14} />
               <h4 className="text-[10px] font-black uppercase tracking-widest text-white/70">Docker Networks</h4>
             </div>
             <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {state.networks?.map(net => (
                    <motion.div 
                      key={net.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1.5 rounded-lg bg-blue-400/10 border border-blue-400/20 text-blue-400 text-[10px] font-bold flex items-center gap-2"
                    >
                      <Share2 size={10} /> {net.name} ({net.driver})
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>

      {/* Host Section */}
      <div className="flex flex-col gap-3 flex-1 min-h-[250px]">
        <div className="flex items-center gap-2 text-[#06d6a0]">
          <Activity size={16} />
          <h4 className="text-xs font-black uppercase tracking-widest">Docker Host (Running Containers)</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {state.containers.map(container => (
              <motion.div
                key={container.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  boxShadow: container.status === 'running' ? '0 0 20px rgba(6, 214, 160, 0.15)' : '0 0 0px transparent'
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                className={`relative overflow-hidden bg-black/40 border ${container.status === 'running' ? 'border-[#06d6a0]/30' : 'border-white/10'} rounded-2xl p-4 flex flex-col gap-4 transition-colors duration-500`}
              >
                {container.status === 'running' && (
                  <motion.div 
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 right-0 p-2 text-[#06d6a0]"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#06d6a0] shadow-[0_0_8px_#06d6a0]" />
                  </motion.div>
                )}
                
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${container.status === 'running' ? 'bg-[#06d6a0]/20 text-[#06d6a0]' : 'bg-white/5 text-muted'}`}>
                    {container.status === 'running' ? <Play size={20} /> : <Square size={20} />}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-black text-white truncate">{container.name}</span>
                    <span className="text-[10px] text-muted truncate">from {container.image}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1">
                    {container.ports.map(port => (
                      <span key={port} className="text-[9px] bg-white/5 border border-white/5 rounded px-1.5 py-0.5 text-white/50 font-mono">
                        {port}
                      </span>
                    ))}
                  </div>
                  
                  {container.volumes && container.volumes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                       {container.volumes.map(v => (
                         <span key={v} className="text-[9px] bg-xp/10 text-xp border border-xp/10 rounded px-1.5 py-0.5 flex items-center gap-1">
                           <Database size={8} /> {v.split(':')[0]}
                         </span>
                       ))}
                    </div>
                  )}

                  {container.networks && container.networks.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                       {container.networks.map(n => (
                         <span key={n} className="text-[9px] bg-blue-400/10 text-blue-400 border border-blue-400/10 rounded px-1.5 py-0.5 flex items-center gap-1">
                           <Share2 size={8} /> {n}
                         </span>
                       ))}
                    </div>
                  )}
                </div>

                <div className={`mt-auto pt-2 text-[9px] font-black uppercase tracking-widest ${container.status === 'running' ? 'text-[#06d6a0]' : 'text-danger'} border-t border-white/5`}>
                  {container.status}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {state.containers.length === 0 && (
            <div className="col-span-full h-32 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center">
              <span className="text-xs text-muted font-bold">No containers spawned yet.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
