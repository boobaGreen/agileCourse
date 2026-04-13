const fs = require('fs');

let content = fs.readFileSync('src/pages/ModulePage.tsx', 'utf8');

const s1 = "if (type.toLowerCase().includes('merge') || type.toLowerCase().includes('rebase')) {";
const s2 = "if (type === 'git-force-danger') {";

const idx1 = content.indexOf(s1);
const idx2 = content.indexOf(s2);

if (idx1 !== -1 && idx2 !== -1) {
  const replacement = `  if (type.toLowerCase().includes('merge') || type.toLowerCase().includes('rebase')) {
    return <MergeRebaseLab />
  }

  if (type.toLowerCase().includes('remote') || type.toLowerCase().includes('sim')) {
    return <RemoteSyncLab />
  }

  `;
  const result = content.slice(0, idx1) + replacement + content.slice(idx2);
  fs.writeFileSync('src/pages/ModulePage.tsx', result);
  console.log("SUCCESS");
} else {
  console.log("FAILED TO FIND SUBSTRINGS");
}
