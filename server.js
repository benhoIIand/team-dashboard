var http = require('http');
var express = require('express');

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

var jenkinsOptions = {
    host: 'ci.flubdev.info',
    port: 8080,
    path: '/api/json',
    headers: {
        'Authorization': 'Basic ' + new Buffer('BenH' + ':' + '729c06d81c39e0a960b60f1793c199b0').toString('base64')
    }
};

app.get('/jenkins', function(req, res) {

    http.request(jenkinsOptions, function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            res.send(JSON.parse(str));
        });
    }).end();
});

app.listen(app.get('port'), function(){
    console.log('Express server listening on port: ' + app.get('port'));
});
