var express  = require('express');

var app = express();

app.configure(function() {
    app.set('port', parseInt(process.env.PORT, 10) || 5000);
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/dist'));
    // app.use(express.favicon('app/favicon.ico'));

    app.set('view engine', 'ejs'); // set up ejs for templating
    app.set('views' ,__dirname + '/dist');

    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    app.use(app.router);
});

app.listen(app.get('port'), function(){
    console.log('Express server listening on port: ' + app.get('port'));
});
