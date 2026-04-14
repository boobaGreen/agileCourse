const https = require('https');
const topics = [
  "docker vs virtual machine",
  "dockerfile explained",
  "docker hub tutorial",
  "docker volumes explained",
  "play with docker tutorial"
];

topics.forEach(topic => {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
      const matches = [];
      let match;
      while ((match = regex.exec(data)) !== null && matches.length < 3) {
        if (!matches.includes(match[1])) matches.push(match[1]);
      }
      console.log(`${topic}: ${matches.join(', ')}`);
    });
  });
});
