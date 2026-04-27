import { motion } from 'framer-motion';
import { CommitNode, COLORS, fadeIn } from './shared';

interface Props { highlight: string; }

export function UndoOpDiagram({ highlight }: Props) {
  const h = highlight;
  const isResetSoft = h === 'reset-soft';
  const isResetHard = h === 'reset-hard';
  const isRevert = h === 'revert';

  const y = 65;
  const labelY = 20;

  return (
    <svg viewBox="0 0 460 140" width="100%" style={{ maxHeight: 160 }}>
      {/* ── BEFORE side ── */}
      <motion.text
        x={115} y={labelY}
        textAnchor="middle"
        fill={COLORS.dim} fontSize={9} fontWeight={800}
        fontFamily="'Inter', sans-serif" letterSpacing={1.5}
        {...fadeIn(0)}
      >
        BEFORE
      </motion.text>

      {/* Before: commit chain C1 → C2 → C3 */}
      <motion.line x1={50} y1={y} x2={180} y2={y} stroke="#ffffff15" strokeWidth={2} {...fadeIn(0.05)} />
      <CommitNode cx={50} cy={y} label="C1" color={COLORS.dim} delay={0.08} size={9} />
      <CommitNode cx={115} cy={y} label="C2" color={COLORS.dim} delay={0.12} size={9} />
      <CommitNode cx={180} cy={y} label="C3" color={COLORS.danger} delay={0.16} size={9} />

      {/* C3 label: "bug" */}
      <motion.text
        x={180} y={y + 22}
        textAnchor="middle"
        fill={COLORS.danger} fontSize={7} fontWeight={600}
        fontFamily="'JetBrains Mono', monospace"
        {...fadeIn(0.2)}
      >
        💥 bug
      </motion.text>

      {/* ── Separator arrow ── */}
      <motion.g {...fadeIn(0.25)}>
        <line x1={215} y1={y - 15} x2={245} y2={y} stroke={COLORS.git} strokeWidth={2} />
        <line x1={215} y1={y + 15} x2={245} y2={y} stroke={COLORS.git} strokeWidth={2} />
      </motion.g>

      {/* ── AFTER side ── */}
      <motion.text
        x={350} y={labelY}
        textAnchor="middle"
        fill={COLORS.git} fontSize={9} fontWeight={800}
        fontFamily="'Inter', sans-serif" letterSpacing={1.5}
        {...fadeIn(0.1)}
      >
        AFTER
      </motion.text>

      {/* After: depends on operation */}
      <motion.line
        x1={270} y1={y}
        x2={isRevert ? 430 : 335} y2={y}
        stroke={isRevert ? COLORS.git : '#ffffff15'}
        strokeWidth={2}
        {...fadeIn(0.3)}
      />
      <CommitNode cx={270} cy={y} label="C1" color={COLORS.dim} delay={0.32} size={9} />
      <CommitNode cx={335} cy={y} label="C2" color={COLORS.dim} delay={0.36} size={9} />

      {/* Reset soft: C3 gone, changes badge at staging */}
      {isResetSoft && (
        <>
          {/* Faded C3 */}
          <motion.g {...fadeIn(0.4)} style={{ opacity: 0.2 }}>
            <circle cx={400} cy={y} r={9} fill="none" stroke={COLORS.danger} strokeWidth={1.5} strokeDasharray="3 2" />
            <text x={400} y={y + 3.5} textAnchor="middle" fill={COLORS.danger} fontSize={8} fontWeight={700} fontFamily="'JetBrains Mono', monospace">C3</text>
          </motion.g>
          {/* "Changes kept in staging" badge */}
          <motion.g {...fadeIn(0.45)}>
            <rect x={280} y={y + 24} width={110} height={18} rx={9}
              fill={`${COLORS.staging}20`} stroke={COLORS.staging} strokeWidth={1} />
            <text x={335} y={y + 36} textAnchor="middle"
              fill={COLORS.staging} fontSize={7.5} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace">
              📋 changes staged
            </text>
          </motion.g>
          {/* HEAD moves back */}
          <motion.g {...fadeIn(0.42)}>
            <rect x={311} y={y - 30} width={48} height={16} rx={8}
              fill={`${COLORS.git}20`} stroke={COLORS.git} strokeWidth={1} />
            <text x={335} y={y - 19} textAnchor="middle"
              fill={COLORS.git} fontSize={7} fontWeight={800}
              fontFamily="'JetBrains Mono', monospace">
              HEAD
            </text>
          </motion.g>
        </>
      )}

      {/* Reset hard: C3 gone, everything deleted */}
      {isResetHard && (
        <>
          {/* Faded C3 with X */}
          <motion.g {...fadeIn(0.4)} style={{ opacity: 0.15 }}>
            <circle cx={400} cy={y} r={9} fill="none" stroke={COLORS.danger} strokeWidth={1.5} strokeDasharray="3 2" />
            <text x={400} y={y + 3.5} textAnchor="middle" fill={COLORS.danger} fontSize={8} fontWeight={700} fontFamily="'JetBrains Mono', monospace">C3</text>
          </motion.g>
          <motion.g {...fadeIn(0.42)}>
            <line x1={392} y1={y - 8} x2={408} y2={y + 8} stroke={COLORS.danger} strokeWidth={2.5} />
            <line x1={408} y1={y - 8} x2={392} y2={y + 8} stroke={COLORS.danger} strokeWidth={2.5} />
          </motion.g>
          {/* "All changes lost" badge */}
          <motion.g {...fadeIn(0.45)}>
            <rect x={280} y={y + 24} width={110} height={18} rx={9}
              fill={`${COLORS.danger}15`} stroke={`${COLORS.danger}50`} strokeWidth={1} />
            <text x={335} y={y + 36} textAnchor="middle"
              fill={COLORS.danger} fontSize={7.5} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace">
              ⚠️ changes lost
            </text>
          </motion.g>
          {/* HEAD */}
          <motion.g {...fadeIn(0.42)}>
            <rect x={311} y={y - 30} width={48} height={16} rx={8}
              fill={`${COLORS.danger}20`} stroke={COLORS.danger} strokeWidth={1} />
            <text x={335} y={y - 19} textAnchor="middle"
              fill={COLORS.danger} fontSize={7} fontWeight={800}
              fontFamily="'JetBrains Mono', monospace">
              HEAD
            </text>
          </motion.g>
        </>
      )}

      {/* Revert: C3 stays, new C4 "Revert C3" appears */}
      {isRevert && (
        <>
          <CommitNode cx={400} cy={y} label="C3" color={COLORS.dim} delay={0.38} size={9} />
          {/* C3 with strikethrough */}
          <motion.line
            x1={392} y1={y} x2={408} y2={y}
            stroke={COLORS.danger} strokeWidth={2} opacity={0.6}
            {...fadeIn(0.4)}
          />
          {/* New revert commit */}
          <CommitNode cx={430} cy={y} label="" color={COLORS.repo} active delay={0.44} size={9} />
          <motion.text
            x={430} y={y + 3.5}
            textAnchor="middle"
            fill="#fff" fontSize={7} fontWeight={700}
            fontFamily="'JetBrains Mono', monospace"
            {...fadeIn(0.46)}
          >
            R
          </motion.text>
          {/* "Safe undo" badge */}
          <motion.g {...fadeIn(0.48)}>
            <rect x={370} y={y + 22} width={110} height={18} rx={9}
              fill={`${COLORS.repo}20`} stroke={COLORS.repo} strokeWidth={1} />
            <text x={425} y={y + 34} textAnchor="middle"
              fill={COLORS.repo} fontSize={7.5} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace">
              ✓ history safe
            </text>
          </motion.g>
        </>
      )}
    </svg>
  );
}
