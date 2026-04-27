import { AreaBox, FlowArrow, COLORS } from './shared';

interface Props { highlight: string; }

export function AreaFlowDiagram({ highlight }: Props) {
  const h = highlight;
  const isAdd = h === 'add' || h === 'add-all';
  const isCommit = h === 'commit';
  const isDiff = h === 'diff';
  const isStatus = h === 'status';
  const isInit = h === 'init';
  const isStash = h === 'stash';
  const isStashPop = h === 'stash-pop';

  return (
    <svg viewBox="0 0 460 180" width="100%" style={{ maxHeight: 200 }}>
      {/* Three main areas */}
      <AreaBox
        x={10} y={20} w={120} h={100}
        icon="📂" label="Working Dir"
        color={COLORS.wd}
        active={isAdd || isDiff || isStatus || isStash}
        delay={0}
      />
      <AreaBox
        x={170} y={20} w={120} h={100}
        icon="📋" label="Staging"
        color={COLORS.staging}
        active={isAdd || isCommit || isDiff || isStatus || isStashPop}
        delay={0.1}
      />
      <AreaBox
        x={330} y={20} w={120} h={100}
        icon="📦" label="Repository"
        color={COLORS.repo}
        active={isCommit || isInit || isStatus}
        delay={0.2}
      />

      {/* Arrow: WD → Staging (git add) */}
      <FlowArrow
        x1={135} y1={70} x2={165} y2={70}
        active={isAdd}
        color={COLORS.git}
        label="add"
        delay={0.15}
      />

      {/* Arrow: Staging → Repo (git commit) */}
      <FlowArrow
        x1={295} y1={70} x2={325} y2={70}
        active={isCommit}
        color={COLORS.git}
        label="commit"
        delay={0.25}
      />

      {/* Diff indicator: gap between WD and Staging */}
      {isDiff && (
        <g>
          <line x1={135} y1={50} x2={165} y2={50} stroke={COLORS.danger} strokeWidth={2} strokeDasharray="4 3" />
          <line x1={135} y1={90} x2={165} y2={90} stroke={COLORS.danger} strokeWidth={2} strokeDasharray="4 3" />
          <text x={150} y={74} textAnchor="middle" fill={COLORS.danger} fontSize={7} fontWeight={700} fontFamily="'JetBrains Mono', monospace">
            diff
          </text>
        </g>
      )}

      {/* Init indicator: .git folder badge */}
      {isInit && (
        <g>
          <rect x={355} y={90} width={70} height={18} rx={9} fill={`${COLORS.repo}25`} stroke={COLORS.repo} strokeWidth={1} />
          <text x={390} y={102} textAnchor="middle" fill={COLORS.repo} fontSize={8} fontWeight={700} fontFamily="'JetBrains Mono', monospace">
            .git/
          </text>
        </g>
      )}

      {/* Stash shelf */}
      {(isStash || isStashPop) && (
        <g>
          <AreaBox
            x={10} y={135} w={120} h={40}
            icon="📥" label="Stash"
            color={COLORS.staging}
            active
            delay={0.3}
          />
          {isStash && (
            <FlowArrow x1={70} y1={122} x2={70} y2={133} active color={COLORS.staging} delay={0.35} />
          )}
          {isStashPop && (
            <FlowArrow x1={70} y1={133} x2={70} y2={122} active color={COLORS.repo} delay={0.35} />
          )}
        </g>
      )}

      {/* Status: small indicators on each area */}
      {isStatus && (
        <g>
          <circle cx={40} cy={100} r={4} fill={COLORS.danger} opacity={0.8} />
          <text x={50} y={103} fill={COLORS.danger} fontSize={6} fontFamily="'JetBrains Mono', monospace">modified</text>
          <circle cx={200} cy={100} r={4} fill={COLORS.repo} opacity={0.8} />
          <text x={210} y={103} fill={COLORS.repo} fontSize={6} fontFamily="'JetBrains Mono', monospace">staged</text>
          <circle cx={360} cy={100} r={4} fill={COLORS.dim} opacity={0.8} />
          <text x={370} y={103} fill={COLORS.dim} fontSize={6} fontFamily="'JetBrains Mono', monospace">committed</text>
        </g>
      )}
    </svg>
  );
}
