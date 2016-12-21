const express = require("express");
const fs      = require("fs");
const http    = require('http');
const https   = require('https');

const HTTP_PORT  = 8080;
const HTTPS_PORT = 8443;

const app = express();



// Express Setup

app.all('*', function(req, res) {
  if (req.secure)
    res.send('Hello World!');
  else
    res.send('Please use HTTPs connection.');
});



// Server Setup

http
  .createServer(app)
  .listen(HTTP_PORT, function() {
    console.log('Insecure Server listening on port %d', HTTP_PORT);
  });

https
  .createServer({
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.pem')
  }, app)
  .listen(HTTPS_PORT, function() {
    console.log('Secure Server listening on port %d', HTTPS_PORT);
  });
