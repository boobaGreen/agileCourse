const fs = require('fs');
const file = "c:/Users/ClaudioDall'Ara/Desktop/course_agile/app/src/pages/ModulePage.tsx";
let content = fs.readFileSync(file, 'utf8');

const target1 = '<div className="mono text-[10px] sm:text-xs text-xp flex flex-wrap justify-center leading-relaxed tracking-wider bg-black/20 p-2 sm:p-3 w-full rounded-lg border border-white/5 mx-auto overflow-hidden">';

const replace1 = '<div className="mono text-[11px] sm:text-xs text-xp leading-relaxed tracking-wider bg-black/20 py-3 px-4 w-full rounded-lg border border-white/5 mx-auto overflow-x-auto scrollbar-hide">\n              <div className="whitespace-nowrap w-max mx-auto">';

const target2 = '                </motion.span>\n              ))}\n            </div>';
const replace2 = '                </motion.span>\n              ))}\n              </div>\n            </div>';

if (content.includes(target1)) {
    content = content.replace(target1, replace1);
    content = content.replace(target2, replace2);
    fs.writeFileSync(file, content);
    console.log("Replaced with scrolling container.");
} else {
    console.log("Could not find target string.");
}
