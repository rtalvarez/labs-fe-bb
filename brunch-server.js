var apiProxy, conektaProxy, express, http, httpProxy, sysPath;

express = require('express');
sysPath = require('path');
http = require('http');
httpProxy = require('http-proxy');

apiProxy = httpProxy.createServer({
  target: 'http://localhost:8080'
});

conektaProxy = httpProxy.createServer({
    target: 'http://localhost:3000'
});

exports.startServer = function(port, path, callback) {
    var app, server;

    app = express();
    app.use(express.static(path));

    app.all('/api/*', function(req, res) {
        delete req.headers.host;

        console.log('[PROXY]: Routing request: ', req.url);
        return apiProxy.web(req, res);
    });

    app.all('/conekta/*', function(req, res) {
        delete req.headers.host;

        console.log('[PROXY]: Routing request: ', req.url);
        return conektaProxy.web(req, res);
    });

    app.all('/fonts/', function(request, response) {
        var splitted = request.url.split('/'),
            filename = splitted[splitted.length - 1];

        return response.sendFile(sysPath.resolve(sysPath.join(path, '/fonts/roboto/' + filename)));
    });

    app.all(/.css/, function(request, response) {
        return response.sendfile(sysPath.resolve(sysPath.join(path, 'stylesheets/app.css')));
    });

    app.all(/.js/, function(request, response) {
        var splitted = request.url.split('/'),
            filename = splitted[splitted.length - 1];

        return response.sendfile(sysPath.resolve(sysPath.join(path, 'javascripts/' + filename)));
    });

    app.all('/*', function(request, response) {
        return response.sendfile(sysPath.resolve(sysPath.join(path, 'index.html')));
    });

    server = http.createServer(app);
    server.listen(parseInt(port, 10), callback);

    return server;
};
