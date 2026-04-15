import { HardDrive, Circle, Network, Zap, Shield, FileJson, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  state: K8sState;
}

export function K8sVisualizer({ state }: Props) {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-10 overflow-y-auto scrollbar-hide">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Services Area */}
        {state.services.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-warning">
              <Network size={16} />
              <h4 className="text-xs font-black uppercase tracking-widest">Services (Entrypoints)</h4>
            </div>
            <div className="flex flex-wrap gap-4">
              <AnimatePresence>
                {state.services.map(svc => (
                  <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-warning/10 border border-warning/30 rounded-xl px-4 py-2 flex flex-col backdrop-blur-md relative overflow-hidden"
                  >
                    <span className="text-xs font-black text-white">{svc.name}</span>
                    <span className="text-[10px] text-warning font-mono">{svc.clusterIP}</span>
                    {svc.externalIP && (
                       <span className="text-[9px] text-[#06d6a0] font-black mt-1">EXTERNAL: {svc.externalIP}</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Configurations Area */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary">
            <FileJson size={16} />
            <h4 className="text-xs font-black uppercase tracking-widest">Configurations & Secrets</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            <AnimatePresence>
              {state.configMaps?.map(cm => (
                <motion.div key={cm.id} layout className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2 text-[10px] text-white/70">
                  <FileJson size={12} className="text-primary" /> {cm.name}
                </motion.div>
              ))}
              {state.secrets?.map(sec => (
                <motion.div key={sec.id} layout className="px-3 py-1 bg-white/5 border border-white/20 rounded-lg flex items-center gap-2 text-[10px] text-white/70">
                  <Shield size={12} className="text-danger" /> {sec.name}
                </motion.div>
              ))}
            </AnimatePresence>
            {(!state.configMaps?.length && !state.secrets?.length) && <span className="text-[10px] text-muted italic">No config resources</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Nodes & Pods Area */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <HardDrive size={16} />
            <h4 className="text-xs font-black uppercase tracking-widest">Cluster Nodes</h4>
          </div>
          
          <div className="flex flex-col gap-4">
            {state.nodes.map(node => (
              <div key={node.id} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 backdrop-blur-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-sm font-black text-white">{node.name}</span>
                  <span className="text-[10px] bg-[#06d6a0]/20 text-[#06d6a0] px-2 py-0.5 rounded font-bold uppercase tracking-tighter">{node.status}</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 min-h-[60px] content-start">
                  <AnimatePresence>
                    {state.pods.filter(p => p.node === node.id).map(pod => (
                      <motion.div
                        key={pod.id}
                        layout
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative group cursor-help flex items-center justify-center"
                      >
                        <Circle size={28} className={`transition-colors duration-500 ${pod.status === 'Running' ? 'text-[#06d6a0] fill-[#06d6a0]/20' : 'text-warning fill-warning/20'}`} />
                        <Zap size={10} className="absolute inset-0 m-auto text-white/80" />
                        
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/90 border border-white/10 rounded p-2 z-50 pointer-events-none min-w-[max-content]">
                          <p className="text-[10px] font-black text-white">{pod.name}</p>
                          {pod.volumes && pod.volumes.length > 0 && <p className="text-[8px] text-xp font-bold">Volumes: {pod.volumes.join(', ')}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Persistence Area */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xp">
            <Database size={16} />
            <h4 className="text-xs font-black uppercase tracking-widest">Persistence (Storage)</h4>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
             <AnimatePresence>
                {state.pvc?.map(pvc => (
                  <motion.div 
                    key={pvc.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-xp/20 flex items-center justify-center text-xp">
                        <Database size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-white">{pvc.name}</span>
                        <span className="text-[9px] text-muted">Request: {pvc.size}</span>
                      </div>
                    </div>
                    <span className="text-[9px] bg-xp/20 text-xp px-2 py-0.5 rounded font-black uppercase">{pvc.status}</span>
                  </motion.div>
                ))}
                {(!state.pvc || state.pvc.length === 0) && (
                   <div className="text-center py-8 text-[10px] text-muted font-bold border-2 border-dashed border-white/5 rounded-xl">
                      NO ACTIVE PVCs
                   </div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
