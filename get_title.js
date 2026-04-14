const https = require('https');
https.get('https://www.youtube.com/watch?v=KjusL9BBZ7U', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<title>(.*?)<\/title>/);
    if(match) console.log(match[1]);
  });
});
