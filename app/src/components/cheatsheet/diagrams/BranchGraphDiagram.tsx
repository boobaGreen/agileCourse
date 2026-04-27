import { motion } from 'framer-motion';
import { CommitNode, BranchLabel, COLORS, fadeIn } from './shared';

interface Props { highlight: string; }

export function BranchGraphDiagram({ highlight }: Props) {
  const h = highlight;
  const isCreate = h === 'create';
  const isCheckout = h === 'checkout';
  const isMerge = h === 'merge';
  const isRebase = h === 'rebase';
  const isCherryPick = h === 'cherry-pick';
  const isList = h === 'list';

  // Common commit positions on main branch
  const mainY = 55;
  const featureY = 125; // Increased spacing
  const commits = [
    { cx: 60, cy: mainY, label: 'C1' },
    { cx: 150, cy: mainY, label: 'C2' }, // Increased horizontal spacing
    { cx: 240, cy: mainY, label: 'C3' },
  ];
  const featureCommits = [
    { cx: 240, cy: featureY, label: 'C4' },
    { cx: 330, cy: featureY, label: 'C5' },
  ];

  return (
    <svg viewBox="0 0 520 180" width="100%" style={{ maxHeight: 200 }}>
      {/* Main branch line */}
      <motion.line
        x1={60} y1={mainY} x2={isMerge ? 420 : 240} y2={mainY}
        stroke={isList || isMerge ? COLORS.git : '#ffffff20'}
        strokeWidth={2}
        {...fadeIn(0)}
      />

      {/* Main commits */}
      {commits.map((c, i) => (
        <CommitNode
          key={c.label} cx={c.cx} cy={c.cy} label={c.label}
          color={isList ? COLORS.git : COLORS.wd}
          active={isList}
          delay={0.05 * i}
        />
      ))}

      {/* Merge commit on main */}
      {isMerge && (
        <>
          <CommitNode cx={420} cy={mainY} label="M" color={COLORS.repo} active delay={0.4} size={12} />
          {/* Feature → merge line */}
          <motion.path
            d={`M 330 ${featureY} Q 380 ${featureY} 420 ${mainY}`}
            fill="none" stroke={COLORS.repo} strokeWidth={2}
            strokeDasharray="6 3"
            {...fadeIn(0.3)}
          />
        </>
      )}

      {/* Feature branch line */}
      {(isCreate || isCheckout || isMerge || isCherryPick || isRebase) && (
        <motion.path
          d={`M 150 ${mainY} Q 180 ${(mainY + featureY) / 2} 240 ${featureY}`}
          fill="none"
          stroke={isCheckout || isCreate ? COLORS.git : COLORS.staging}
          strokeWidth={2}
          {...fadeIn(0.15)}
        />
      )}

      {/* Feature branch horizontal line */}
      {(isCheckout || isMerge || isCherryPick || isRebase) && (
        <motion.line
          x1={240} y1={featureY} x2={330} y2={featureY}
          stroke={isCheckout ? COLORS.git : COLORS.staging}
          strokeWidth={2}
          {...fadeIn(0.2)}
        />
      )}

      {/* Feature commits */}
      {(isCheckout || isMerge || isCherryPick || isRebase) && featureCommits.map((c, i) => (
        <CommitNode
          key={c.label} cx={c.cx} cy={c.cy} label={c.label}
          color={isCheckout ? COLORS.git : COLORS.staging}
          active={isCheckout}
          delay={0.2 + 0.08 * i}
        />
      ))}

      {/* Branch labels - Moved up further */}
      <BranchLabel
        x={commits[commits.length - 1].cx}
        y={mainY - 35}
        name="main"
        color={COLORS.wd}
        active={isList || !isCheckout}
        isHead={!isCheckout && !isCherryPick}
        delay={0.1}
      />

      {(isCreate || isCheckout || isMerge || isCherryPick || isRebase) && (
        <BranchLabel
          x={isCheckout || isMerge ? 330 : 240}
          y={featureY + 35}
          name="feature"
          color={isCheckout || isCreate ? COLORS.git : COLORS.staging}
          active={isCheckout || isCreate}
          isHead={isCheckout}
          delay={0.25}
        />
      )}

      {/* Rebase: ghost commits replayed on main */}
      {isRebase && (
        <>
          <motion.line
            x1={240} y1={mainY} x2={420} y2={mainY}
            stroke={COLORS.git} strokeWidth={2} strokeDasharray="6 3"
            {...fadeIn(0.35)}
          />
          <CommitNode cx={330} cy={mainY} label="C4'" color={COLORS.git} active delay={0.4} />
          <CommitNode cx={420} cy={mainY} label="C5'" color={COLORS.git} active delay={0.45} />
          {/* Strikethrough on old feature commits */}
          {featureCommits.map((c, i) => (
            <motion.line
              key={i}
              x1={c.cx - 8} y1={c.cy} x2={c.cx + 8} y2={c.cy}
              stroke={COLORS.danger} strokeWidth={2} opacity={0.6}
              {...fadeIn(0.4 + 0.05 * i)}
            />
          ))}
        </>
      )}

      {/* Cherry-pick: copy single commit */}
      {isCherryPick && (
        <>
          <motion.path
            d={`M 330 ${featureY} Q 380 ${(mainY + featureY) / 2} 330 ${mainY}`}
            fill="none" stroke={COLORS.git} strokeWidth={2} strokeDasharray="6 3"
            {...fadeIn(0.3)}
          />
          <CommitNode cx={330} cy={mainY} label="C5'" color={COLORS.git} active delay={0.4} />
          <motion.line
            x1={240} y1={mainY} x2={330} y2={mainY}
            stroke={COLORS.git} strokeWidth={2}
            {...fadeIn(0.35)}
          />
        </>
      )}
    </svg>
  );
}
