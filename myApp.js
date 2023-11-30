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

// This middleware sets the X-Download-Options header to noopen. This will prevent IE users from executing downloads in the trusted site’s context.
app.use(helmet.ieNoOpen());

// HTTP Strict-Transport-Security, you tell the browsers to use HTTPS for the future requests in a specified amount of time. This will work for the requests coming after the initial request.
nintydaysinsecondsformula = 90*24*60*60;
app.use(helmet.hsts({maxAge: nintydaysinsecondsformula, force: true}));

// most browsers prefetch DNS records for the links in a page. In that way the destination ip is already known when the user clicks on a link. This may lead to over-use of the DNS service, privacy issues or page statistics alteration 
app.use(helmet.dnsPrefetchControl());

// you want the users to always download the newer version, try to disable caching on client’s browser. It can be useful in development too. Caching has performance benefits, which you will lose, so only use this option when there is a real need.
app.use(helmet.noCache());




































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
