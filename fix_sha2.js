const fs = require('fs');
const file = "c:/Users/ClaudioDall'Ara/Desktop/course_agile/app/src/pages/ModulePage.tsx";
let content = fs.readFileSync(file, 'utf8');

// We are currently rendering the SHA block with this:
const startBlock = '<div className="mono text-[11px] sm:text-xs text-xp leading-relaxed tracking-wider bg-black/20 py-3 px-4 w-full rounded-lg border border-white/5 mx-auto overflow-x-auto scrollbar-hide">';

if (content.includes(startBlock)) {
    // Replace the outer container to guarantee scrolling
    const newBlock = '<div className="w-full min-w-0 max-w-full overflow-x-auto pb-2">\n              <div className="mono text-[11px] sm:text-[13px] text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 flex items-center justify-start w-max mx-auto">';
    content = content.replace(startBlock + '\n              <div className="whitespace-nowrap w-max mx-auto">', newBlock);
    
    // The closing div needs to be adjusted
    // we have:
    //                 </motion.span>
    //               ))}
    //               </div>
    //             </div>
    // No change needed for closing divs actually! The closing structure remains 2 divs deep!
    
    fs.writeFileSync(file, content);
    console.log("Applied bulletproof overflow container.");
} else {
    console.log("Could not find start sequence.");
}
