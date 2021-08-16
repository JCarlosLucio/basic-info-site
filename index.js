const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', (_req, res) => {
  res.sendFile(__dirname + '/about.html');
});

app.get('/contact-me', (_req, res) => {
  res.sendFile(__dirname + '/contact-me.html');
});

app.get('/404', (_req, res) => {
  res.sendFile(__dirname + '/404.html');
});

/** Handles unknown routes */
app.use((_req, res, _next) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
