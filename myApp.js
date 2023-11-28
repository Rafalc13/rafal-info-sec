const express = require('express');
const app = express();
const helmet = require('helmet');

// this is helmet to keep powredBy hidden from hackers
app.use(helmet.hidePoweredBy());

// sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM
app.use(helmet.frameguard({action: 'deny'}));

//The X-XSS-Protection HTTP header is a basic protection. The browser detects a potential injected script using a heuristic filter. If the header is enabled, the browser changes the script code, neutralizing it. It still has limited support
app.use(helmet.xssFilter());

// This middleware sets the X-Content-Type-Options header to nosniff, instructing the browser to not bypass the provided Content-Type
app.use(helmet.noSniff());







































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
