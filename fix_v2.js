import fs from 'fs';
let content = fs.readFileSync('generate_themes_v2.js', 'utf8');
content = content.replace(/\\\`/g, '\`');
content = content.replace(/\\\${/g, '${');
fs.writeFileSync('generate_themes_v2.js', content);
