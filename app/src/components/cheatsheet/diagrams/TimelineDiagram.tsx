import { motion } from 'framer-motion';
import { CommitNode, COLORS, fadeIn, pulseGlow } from './shared';

interface Props { highlight: string; }

export function TimelineDiagram({ highlight }: Props) {
  const h = highlight;
  const isLog = h === 'log';
  const isReflog = h === 'reflog';
  const isBisect = h === 'bisect';
  const isBlame = h === 'blame';
  const isTag = h === 'tag';

  const y = 60;
  const commits = [
    { cx: 60,  label: 'C1', msg: 'init' },
    { cx: 130, label: 'C2', msg: 'feat A' },
    { cx: 200, label: 'C3', msg: 'fix bug' },
    { cx: 270, label: 'C4', msg: 'feat B' },
    { cx: 340, label: 'C5', msg: 'refactor' },
  ];

  return (
    <svg viewBox="0 0 460 140" width="100%" style={{ maxHeight: 160 }}>
      {/* Timeline line */}
      <motion.line
        x1={40} y1={y} x2={380} y2={y}
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
          {/* Commit messages for git log */}
          {isLog && (
            <motion.text
              x={c.cx} y={y + 26}
              textAnchor="middle"
              fill={COLORS.dim}
              fontSize={7} fontWeight={500}
              fontFamily="'JetBrains Mono', monospace"
              {...fadeIn(0.15 + 0.06 * i)}
            >
              {c.msg}
            </motion.text>
          )}
        </g>
      ))}

      {/* HEAD pointer */}
      <motion.g {...fadeIn(0.4)}>
        <rect x={316} y={y - 32} width={48} height={16} rx={8}
          fill={`${COLORS.git}20`} stroke={COLORS.git} strokeWidth={1} />
        <text x={340} y={y - 21} textAnchor="middle"
          fill={COLORS.git} fontSize={7} fontWeight={800}
          fontFamily="'JetBrains Mono', monospace">
          HEAD
        </text>
        <line x1={340} y1={y - 16} x2={340} y2={y - 12} stroke={COLORS.git} strokeWidth={1.5} />
      </motion.g>

      {/* Reflog: ghost/deleted commits */}
      {isReflog && (
        <>
          <motion.line
            x1={340} y1={y} x2={420} y2={y}
            stroke={COLORS.danger} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.5}
            {...fadeIn(0.3)}
          />
          <CommitNode cx={390} cy={y} label="C6" color={COLORS.danger} delay={0.35} size={8} />
          <motion.text
            x={390} y={y + 24}
            textAnchor="middle"
            fill={COLORS.danger} opacity={0.7}
            fontSize={7} fontWeight={600}
            fontFamily="'JetBrains Mono', monospace"
            {...fadeIn(0.4)}
          >
            (deleted)
          </motion.text>
          {/* Reflog entries label */}
          <motion.g {...fadeIn(0.45)}>
            <rect x={30} y={y + 35} width={120} height={16} rx={8}
              fill={`${COLORS.staging}15`} stroke={`${COLORS.staging}40`} strokeWidth={1} />
            <text x={90} y={y + 46} textAnchor="middle"
              fill={COLORS.staging} fontSize={7} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace">
              HEAD@{'{0}'} → HEAD@{'{6}'}
            </text>
          </motion.g>
        </>
      )}

      {/* Bisect: good/bad markers */}
      {isBisect && (
        <>
          <motion.text x={60} y={y + 26} textAnchor="middle"
            fill={COLORS.repo} fontSize={7} fontWeight={700}
            fontFamily="'JetBrains Mono', monospace" {...fadeIn(0.3)}>
            ✓ good
          </motion.text>
          <motion.text x={340} y={y + 26} textAnchor="middle"
            fill={COLORS.danger} fontSize={7} fontWeight={700}
            fontFamily="'JetBrains Mono', monospace" {...fadeIn(0.35)}>
            ✗ bad
          </motion.text>
          <motion.text x={200} y={y + 26} textAnchor="middle"
            fill={COLORS.staging} fontSize={7} fontWeight={800}
            fontFamily="'JetBrains Mono', monospace" {...fadeIn(0.4)}>
            ← testing
          </motion.text>
        </>
      )}

      {/* Blame: line annotations */}
      {isBlame && (
        <motion.g {...fadeIn(0.3)}>
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <rect x={30} y={y + 25 + i * 16} width={400} height={14} rx={3}
                fill={i % 2 === 0 ? '#ffffff05' : '#ffffff02'}
                stroke="#ffffff08" strokeWidth={0.5} />
              <text x={40} y={y + 34 + i * 16}
                fill={[COLORS.wd, COLORS.staging, COLORS.wd, COLORS.repo][i]}
                fontSize={7} fontWeight={600}
                fontFamily="'JetBrains Mono', monospace">
                {['Alice C2', 'Bob   C3', 'Alice C4', 'Carol C5'][i]}
              </text>
              <text x={130} y={y + 34 + i * 16}
                fill={COLORS.dim}
                fontSize={7}
                fontFamily="'JetBrains Mono', monospace">
                {['const app = express();', 'app.use(cors());', 'app.get("/", handler);', 'app.listen(3000);'][i]}
              </text>
            </g>
          ))}
        </motion.g>
      )}

      {/* Tag marker */}
      {isTag && (
        <motion.g {...fadeIn(0.3)}>
          <rect x={246} y={y + 20} width={48} height={16} rx={8}
            fill={`${COLORS.staging}25`} stroke={COLORS.staging} strokeWidth={1} />
          <text x={270} y={y + 31} textAnchor="middle"
            fill={COLORS.staging} fontSize={7.5} fontWeight={700}
            fontFamily="'JetBrains Mono', monospace">
            🏷 v1.0
          </text>
          <motion.line
            x1={270} y1={y + 20} x2={270} y2={y + 12}
            stroke={COLORS.staging} strokeWidth={1.5}
            {...pulseGlow}
          />
        </motion.g>
      )}
    </svg>
  );
}
