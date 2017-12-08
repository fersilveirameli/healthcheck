
global.__base = __dirname + '/';

const express      = require('express');
const bodyParser   = require('body-parser');
const validator    = require('express-validator');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const url          = require("url");
const path         = require('path');
const http         = require('http');
const healthcheck  = require(__base+'lib/healthcheck');
const app          = express();


app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(validator());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());

//CORS on ExpressJS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

// HEALTH CHECKS
app.use('/health', healthcheck());




// server
const server = http.createServer(app);
server.listen(process.env.PORT || 3000,  function () {
    console.log('Start: ' + 3000);
});





module.exports = app;
