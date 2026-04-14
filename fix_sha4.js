const fs = require('fs');
const file = "c:/Users/ClaudioDall'Ara/Desktop/course_agile/app/src/pages/ModulePage.tsx";
let content = fs.readFileSync(file, 'utf8');

const targetStr = '<div className="mono text-[11px] sm:text-xs text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 text-center flex flex-col sm:flex-row shadow-inner w-full min-w-0 overflow-hidden items-center justify-center">';
const replaceStr = '<div className="mono text-[11px] sm:text-xs text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 text-center flex flex-col gap-1 shadow-inner w-full min-w-0 overflow-hidden items-center justify-center">';

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content);
    console.log("Forced flex-col only.");
} else {
    // try a regex just in case
    const regex = /<div className="mono text-\[11px\].*?flex flex-col sm:flex-row.*?">/;
    if (regex.test(content)) {
        content = content.replace(regex, replaceStr);
        fs.writeFileSync(file, content);
        console.log("Forced flex-col only via regex.");
    } else {
        console.log("Could not find the target string.");
    }
}
