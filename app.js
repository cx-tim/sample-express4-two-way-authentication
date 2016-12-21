const express = require("express");
const fs      = require("fs");
const http    = require('http');
const https   = require('https');

const HTTP_PORT  = 8080;
const HTTPS_PORT = 8443;

const app = express();



// Express Setup

app.all('*', function(req, res) {
  // Does the client connect with SSL encryption?
  if (req.secure) {
    // Is the client certificate authorized?
    if (req.client.authorized)
      res.send('Hope this simple demo helps you :)');
    else
      res.send('Unauthorized: you should provide a trusted certificate');
  }
  else {
    res.send('Please use HTTPs connection.');
  }
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
    cert: fs.readFileSync('ssl/server.pem'),

    // the magic for client authentication
    requestCert: true,

    // set this to `true` if unauthorized client should be rejected automatically
    rejectUnauthorized: false,

    // authorize the client certificate against our own CA
    ca: [ fs.readFileSync('ssl/ca/demo.pem') ]
  }, app)
  .listen(HTTPS_PORT, function() {
    console.log('Secure Server listening on port %d', HTTPS_PORT);
  });
