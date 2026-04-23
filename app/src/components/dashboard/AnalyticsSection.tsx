import { motion } from 'framer-motion'
import { Target, Activity } from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

interface AnalyticsSectionProps {
  radarData: any[]
  activeTrack: any
  heatmapData: any[][]
}

export function AnalyticsSection({ radarData, activeTrack, heatmapData }: AnalyticsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24">
      {/* Skills Radar */}
      <div className="lg:col-span-1 card p-6 bg-surface/40 flex flex-col items-center justify-center min-h-[320px] min-w-0">
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="text-xs fw-black text-muted uppercase tracking-widest flex items-center gap-2">
            <Target size={14} className="text-primary" /> Skill Radar
          </h3>
        </div>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} />
              <Radar
                name="Skills"
                dataKey="value"
                stroke={activeTrack.color}
                fill={activeTrack.color}
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress Activity Feed / Heatmap */}
      <div className="lg:col-span-2 card p-6 bg-surface/40 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h3 className="text-xs fw-black text-muted uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} className="text-green" /> Activity Heatmap
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-1 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            {heatmapData.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-1">
                {week.map((day, dayIdx) => {
                  const count = day.count
                  return (
                    <div 
                      key={dayIdx} 
                      title={`${day.date}: ${count} XP`}
                      className="w-3 h-3 rounded-sm transition-colors duration-500" 
                      style={{ 
                        background: count > 300 ? activeTrack.color : count > 100 ? `${activeTrack.color}80` : count > 0 ? `${activeTrack.color}40` : 'rgba(255,255,255,0.05)'
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted fw-bold">
            <span>1 YEAR OF ACTIVITY</span>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
                <div className="w-2.5 h-2.5 rounded-sm opacity-50" style={{ background: activeTrack.color }} />
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: activeTrack.color }} />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
