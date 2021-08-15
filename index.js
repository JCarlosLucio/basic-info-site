const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const extname = path.extname(req.url);

  const contentType = extname !== '.css' ? 'text/html' : 'text/css';

  const fileName = `${req.url === '/' ? '/index' : req.url}${
    !extname ? '.html' : ''
  }`;
  const filePath = path.join(__dirname, 'public', fileName);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (error, content) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content);
          }
        );
      } else {
        res.writeHead(500);
        res.end(`Server error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
