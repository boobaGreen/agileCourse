import { motion } from 'framer-motion';
import { CommitNode } from './shared';
import { COLORS, fadeIn, pulseGlow } from './theme';

interface Props { highlight: string; }

export function TimelineDiagram({ highlight }: Props) {
  const h = highlight;
  const isLog = h === 'log';
  const isReflog = h === 'reflog';
  const isBisect = h === 'bisect';
  const isBlame = h === 'blame';
  const isTag = h === 'tag';

  const y = 50; // Main line height
  const commits = [
    { cx: 60,  label: 'C1', msg: 'init' },
    { cx: 140, label: 'C2', msg: 'feat A' },
    { cx: 220, label: 'C3', msg: 'fix bug' },
    { cx: 300, label: 'C4', msg: 'feat B' },
    { cx: 380, label: 'C5', msg: 'refactor' },
  ];

  return (
    <svg viewBox="0 0 520 180" width="100%" style={{ maxHeight: 220 }}>
      {/* Timeline line */}
      <motion.line
        x1={40} y1={y} x2={420} y2={y}
        stroke={isLog ? COLORS.git : '#ffffff15'}
        strokeWidth={2}
        {...fadeIn(0)}
      />

      {/* Commit nodes */}
      {commits.map((c, i) => (
        <g key={c.label}>
          <CommitNode
            cx={c.cx} cy={y} label={c.label}
            color={
              isBisect && i < 2 ? COLORS.repo :
              isBisect && i > 3 ? COLORS.danger :
              isBisect && i === 2 ? COLORS.staging :
              isLog ? COLORS.git : COLORS.dim
            }
            active={isLog || (isBisect && i === 2)}
            delay={0.05 + 0.06 * i}
          />
          {/* Commit messages for git log - Moved further down */}
          {isLog && (
            <motion.text
              x={c.cx} y={y + 30}
              textAnchor="middle"
              fill={COLORS.dim}
              fontSize={8} fontWeight={500}
              fontFamily="'JetBrains Mono', monospace"
              {...fadeIn(0.15 + 0.06 * i)}
            >
              {c.msg}
            </motion.text>
          )}
        </g>
      ))}

      {/* HEAD pointer - Moved higher up */}
      <motion.g {...fadeIn(0.4)}>
        <rect x={356} y={y - 45} width={48} height={18} rx={9}
          fill={`${COLORS.git}20`} stroke={COLORS.git} strokeWidth={1} />
        <text x={380} y={y - 32} textAnchor="middle"
          fill={COLORS.git} fontSize={8} fontWeight={800}
          fontFamily="'JetBrains Mono', monospace">
          HEAD
        </text>
        <line x1={380} y1={y - 27} x2={380} y2={y - 12} stroke={COLORS.git} strokeWidth={1.5} />
      </motion.g>

      {/* Reflog: ghost/deleted commits */}
      {isReflog && (
        <>
          <motion.line
            x1={380} y1={y} x2={460} y2={y}
            stroke={COLORS.danger} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.5}
            {...fadeIn(0.3)}
          />
          <CommitNode cx={430} cy={y} label="C6" color={COLORS.danger} delay={0.35} size={8} />
          <motion.text
            x={430} y={y + 30}
            textAnchor="middle"
            fill={COLORS.danger} opacity={0.7}
            fontSize={8} fontWeight={600}
            fontFamily="'JetBrains Mono', monospace"
            {...fadeIn(0.4)}
          >
            (deleted)
          </motion.text>
          {/* Reflog entries label - Moved further down */}
          <motion.g {...fadeIn(0.45)}>
            <rect x={40} y={y + 55} width={130} height={18} rx={9}
              fill={`${COLORS.staging}15`} stroke={`${COLORS.staging}40`} strokeWidth={1} />
            <text x={105} y={y + 67} textAnchor="middle"
              fill={COLORS.staging} fontSize={8} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace">
              HEAD@{'{0}'} → HEAD@{'{6}'}
            </text>
          </motion.g>
        </>
      )}

      {/* Bisect: good/bad markers - Moved below commits */}
      {isBisect && (
        <>
          <motion.text x={60} y={y + 30} textAnchor="middle"
            fill={COLORS.repo} fontSize={8} fontWeight={700}
            fontFamily="'JetBrains Mono', monospace" {...fadeIn(0.3)}>
            ✓ good
          </motion.text>
          <motion.text x={380} y={y + 30} textAnchor="middle"
            fill={COLORS.danger} fontSize={8} fontWeight={700}
            fontFamily="'JetBrains Mono', monospace" {...fadeIn(0.35)}>
            ✗ bad
          </motion.text>
          <motion.text x={220} y={y + 30} textAnchor="middle"
            fill={COLORS.staging} fontSize={8} fontWeight={800}
            fontFamily="'JetBrains Mono', monospace" {...fadeIn(0.4)}>
            ← testing
          </motion.text>
        </>
      )}

      {/* Blame: line annotations - Moved much further down */}
      {isBlame && (
        <motion.g {...fadeIn(0.3)}>
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <rect x={40} y={y + 25 + i * 18} width={420} height={16} rx={4}
                fill={i % 2 === 0 ? '#ffffff05' : '#ffffff02'}
                stroke="#ffffff08" strokeWidth={0.5} />
              <text x={50} y={y + 36 + i * 18}
                fill={[COLORS.wd, COLORS.staging, COLORS.wd, COLORS.repo][i]}
                fontSize={8} fontWeight={600}
                fontFamily="'JetBrains Mono', monospace">
                {['Alice C2', 'Bob   C3', 'Alice C4', 'Carol C5'][i]}
              </text>
              <text x={140} y={y + 36 + i * 18}
                fill={COLORS.dim}
                fontSize={8}
                fontFamily="'JetBrains Mono', monospace">
                {['const app = express();', 'app.use(cors());', 'app.get("/", handler);', 'app.listen(3000);'][i]}
              </text>
            </g>
          ))}
        </motion.g>
      )}

      {/* Tag marker - Moved further up or down to avoid other elements */}
      {isTag && (
        <motion.g {...fadeIn(0.3)}>
          <rect x={276} y={y + 25} width={48} height={18} rx={9}
            fill={`${COLORS.staging}25`} stroke={COLORS.staging} strokeWidth={1} />
          <text x={300} y={y + 37} textAnchor="middle"
            fill={COLORS.staging} fontSize={8} fontWeight={700}
            fontFamily="'JetBrains Mono', monospace">
            🏷 v1.0
          </text>
          <motion.line
            x1={300} y1={y + 25} x2={300} y2={y + 12}
            stroke={COLORS.staging} strokeWidth={1.5}
            {...pulseGlow}
          />
        </motion.g>
      )}
    </svg>
  );
}
