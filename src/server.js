'use strict';

//3rd Party Modules

var path                    = require('path'),
    express                 = require('express'),
    morgan                  = require('morgan'),
    bodyParser              = require('body-parser'),

//Local Modules

    routes                  = require('./routes/router.js'),
    port                    = process.env.PORT || 8000,
    app                     = express();


//*************************************************
//           Middleware and other settings
//*************************************************
app.use(express.static(__dirname + '/public'));

//Logging
//var  accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
//app.use(morgan('dev', {stream: accessLogStream}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, { message: err.message });
});

process.on('uncaughtException', function(err) {
    if (err) console.log(err, err.stack);
});

//*********************************************************
//    Convention based route loading (saves a lot of code)
//*********************************************************
routes.load(app, __dirname + '/controllers');

app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});

//*********************************************************
//    Quick and dirty way to detect event loop blocking
//*********************************************************
var lastLoop = Date.now();

function monitorEventLoop() {
    var time = Date.now();
    if (time - lastLoop > 1000) console.error('Event loop blocked ' + (time - lastLoop));
    lastLoop = time;
    setTimeout(monitorEventLoop, 200);
}

if (app.settings.env === 'development') {
    monitorEventLoop();
}




