const fs = require('fs');
const file = "c:/Users/ClaudioDall'Ara/Desktop/course_agile/app/src/pages/ModulePage.tsx";
let content = fs.readFileSync(file, 'utf8');

// Replace the opening tag
content = content.replace('<p key={i} className="mb-2 last:mb-0">', '<div key={i} className="mb-2 last:mb-0">');

// The closing tag is:
//             })}
//          </p>
//        ))}
// Let's replace ONLY that specific closing </p> which occurs around line 496. 
content = content.replace('</p>\n        ))}', '</div>\n        ))}');
content = content.replace('</p>\r\n        ))}', '</div>\r\n        ))}');

fs.writeFileSync(file, content);
console.log("Done");
