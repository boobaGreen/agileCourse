$file = "c:\Users\ClaudioDall'Ara\Desktop\course_agile\app\src\pages\ModulePage.tsx"
$content = [System.IO.File]::ReadAllText($file)

# 1. git-core-sim terminal (~line 930)
$old1 = 'className="bg-black/60 rounded-xl p-2.5 border border-white/5 shadow-inner flex items-center gap-3">'
$new1 = 'className="bg-black/60 rounded-xl p-2.5 border border-white/5 shadow-inner flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">'
$content = $content.Replace($old1, $new1)

$old1c = 'className="text-[10px] mono text-git fw-bold">'
$new1c = 'className="text-[10px] sm:text-[11px] mono text-git fw-bold whitespace-nowrap pr-6">'
$content = $content.Replace($old1c, $new1c)

# 2. RemoteSyncLab terminal (~line 1623-1632)
$old2a = 'className="bg-black/60 border border-white/10 rounded-2xl p-2 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-inner">'
$new2a = 'className="bg-black/60 border border-white/10 rounded-2xl p-2 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-inner overflow-x-auto min-w-0 scrollbar-hide">'
$content = $content.Replace($old2a, $new2a)

$old2b = 'className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">'
$new2b = 'className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">'
$content = $content.Replace($old2b, $new2b)

$old2c = 'className="text-[15px] font-mono text-secondary fw-bold flex items-center gap-2">'
$new2c = 'className="text-[11px] sm:text-[15px] font-mono text-secondary fw-bold flex items-center gap-2 whitespace-nowrap pr-6">'
$content = $content.Replace($old2c, $new2c)

# 3. CherryPickLab terminal (~line 2014)
$old3a = '<div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3">' + "`n" + '              <TermIcon size={18} className="text-muted" />' + "`n" + '              <code className="text-sm font-mono text-xp fw-bold">'
$new3a = '<div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">' + "`n" + '              <TermIcon size={18} className="text-muted shrink-0" />' + "`n" + '              <code className="text-[11px] sm:text-sm font-mono text-xp fw-bold whitespace-nowrap pr-6">'
$content = $content.Replace($old3a, $new3a)

# 4. StashLab terminal (~line 2321) - same structure but text-git color
$old4a = '<div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3">' + "`n" + '              <TermIcon size={18} className="text-muted" />' + "`n" + '              <code className="text-sm font-mono text-git fw-bold">'
$new4a = '<div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">' + "`n" + '              <TermIcon size={18} className="text-muted shrink-0" />' + "`n" + '              <code className="text-[11px] sm:text-sm font-mono text-git fw-bold whitespace-nowrap pr-6">'
$content = $content.Replace($old4a, $new4a)

# 5. BisectLab terminal (~line 2424) - same structure but text-primary color
$old5a = '<div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3">' + "`n" + '              <TermIcon size={18} className="text-muted" />' + "`n" + '              <code className="text-sm font-mono text-primary fw-bold">'
$new5a = '<div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">' + "`n" + '              <TermIcon size={18} className="text-muted shrink-0" />' + "`n" + '              <code className="text-[11px] sm:text-sm font-mono text-primary fw-bold whitespace-nowrap pr-6">'
$content = $content.Replace($old5a, $new5a)

# 6. TerminalSimulatorGame input min-w fix (~line 2623)
$old6 = 'font-mono caret-primary min-w-[200px]"'
$new6 = 'font-mono caret-primary min-w-0"'
$content = $content.Replace($old6, $new6)

# Also fix the dots container in git-core-sim to add shrink-0
# This is tricky because "flex gap-1" appears multiple times. Let's target the specific surrounding context.
# The dots in git-core-sim are inside the terminal div we already modified.
# After our change, the pattern is: scrollbar-hide">\n                       <div className="flex gap-1">
$old7 = 'scrollbar-hide">' + "`n" + '                       <div className="flex gap-1">'
$new7 = 'scrollbar-hide">' + "`n" + '                       <div className="flex gap-1 shrink-0">'
$content = $content.Replace($old7, $new7)

[System.IO.File]::WriteAllText($file, $content)
Write-Output "Done! All replacements applied."

# Verify
$verify = [System.IO.File]::ReadAllText($file)
$checks = @(
    @("overflow-x-auto min-w-0 scrollbar-hide", "Terminal overflow fix"),
    @("text-[11px] sm:text-[15px] font-mono text-secondary", "RemoteSyncLab font responsive"),
    @("text-[11px] sm:text-sm font-mono text-xp", "CherryPickLab font responsive"),
    @("text-[11px] sm:text-sm font-mono text-git", "StashLab font responsive"),
    @("text-[11px] sm:text-sm font-mono text-primary fw-bold whitespace-nowrap pr-6", "BisectLab font responsive"),
    @("caret-primary min-w-0", "TerminalSim min-w fix")
)
foreach ($check in $checks) {
    if ($verify.Contains($check[0])) {
        Write-Output "  OK: $($check[1])"
    } else {
        Write-Output "  MISSING: $($check[1])"
    }
}
