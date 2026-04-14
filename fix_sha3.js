const fs = require('fs');
const file = "c:/Users/ClaudioDall'Ara/Desktop/course_agile/app/src/pages/ModulePage.tsx";
let content = fs.readFileSync(file, 'utf8');

// Find the entire SHA container block
// It starts with: <div className="w-full min-w-0 max-w-full overflow-x-auto pb-2">
// and ends after the `))} </div> </div>`

const extractRegex = /<div className="w-full min-w-0 max-w-full overflow-x-auto pb-2">[\s\S]*?<\/motion\.span>\s*\)\)\}\s*<\/div>\s*<\/div>/g;

const match = content.match(extractRegex);
if (match) {
    const newBlock = `<div className="w-full flex justify-center">
              <div className="mono text-[11px] sm:text-xs text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 text-center flex flex-col sm:flex-row shadow-inner w-full min-w-0 overflow-hidden items-center justify-center">
                <div className="whitespace-nowrap">
                  {hash.substring(0, 20).split('').map((char, i) => (
                    <motion.span 
                      key={\`\${input}-\${i}\`}
                      initial={{ opacity: 0, scale: 0.5 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      transition={{ delay: i * 0.005 }}
                      className={/[a-f]/.test(char) ? 'text-primary/80' : 'text-xp'}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="whitespace-nowrap">
                  {hash.substring(20, 40).split('').map((char, j) => {
                    const i = j + 20;
                    return (
                      <motion.span 
                        key={\`\${input}-\${i}\`}
                        initial={{ opacity: 0, scale: 0.5 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: i * 0.005 }}
                        className={/[a-f]/.test(char) ? 'text-primary/80' : 'text-xp'}
                      >
                        {char}
                      </motion.span>
                    )
                  })}
                </div>
              </div>
            </div>`;
    
    content = content.replace(match[0], newBlock);
    fs.writeFileSync(file, content);
    console.log("Applied 2-line split for mobile.");
} else {
    console.log("Could not find the target code to replace.");
}
