const fs = require('fs');
const file = "c:/Users/ClaudioDall'Ara/Desktop/course_agile/app/src/pages/ModulePage.tsx";
let content = fs.readFileSync(file, 'utf8');

const targetStr = '<div className="w-full flex justify-center">\n              <div className="mono text-[11px] sm:text-xs text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 text-center flex flex-col gap-1 shadow-inner w-full min-w-0 overflow-hidden items-center justify-center">';

const replaceStr = '<div className="w-full hidden sm:flex justify-center">\n              <div className="mono text-[11px] sm:text-xs text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 text-center flex flex-row shadow-inner w-full min-w-0 overflow-hidden items-center justify-center">';

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content);
    console.log("Hid hash on mobile and restored single line on desktop.");
} else {
    // try regex without strict whitespace
    const regex = /<div className="w-full flex justify-center">\s*<div className="mono text-\[11px\].*?flex flex-col gap-1.*?>/g;
    const match = content.match(regex);
    if(match) {
        content = content.replace(regex, '<div className="w-full hidden sm:flex justify-center">\n              <div className="mono text-[11px] sm:text-xs text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 text-center flex flex-row shadow-inner w-full min-w-0 overflow-hidden items-center justify-center">');
        fs.writeFileSync(file, content);
        console.log("Hid hash on mobile via regex.");
    } else {
        console.log("Could not find the target string.");
    }
}
