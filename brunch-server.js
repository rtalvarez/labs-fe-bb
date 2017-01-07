var apiProxy, express, http, httpProxy, sysPath;

express = require('express');
sysPath = require('path');
http = require('http');
httpProxy = require('http-proxy');

apiProxy = httpProxy.createServer({
  target: 'http://localhost:8080'
});

exports.startServer = function(port, path, callback) {
    var app, server;

    app = express();
    app.use(express["static"](path));

    app.all("/api/*", function(req, res) {
        delete req.headers.host;

        console.log('[PROXY]: Routing request: ', req.url);
        return apiProxy.web(req, res);
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