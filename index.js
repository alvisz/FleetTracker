const   express = require("express"),
        app     = express(),
        favicon     = require('serve-favicon'),
        bodyParser  = require('body-parser'),
        MainRoute   = require('./routes/main'),
        { createProxyMiddleware } = require('http-proxy-middleware'),

        port = 80;

class Server {

    constructor() {
        this.initExpress()
        this.initRoutes()
        this.start()
    }

    start(){
        app.listen(port, (err) => {
            console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
        });
    }


    initExpress(){
        app.use(favicon(__dirname + '/public/favicon.ico'));
        app.use(express.static(__dirname + '/public'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }

    initRoutes(){
        app.use('/fleetapi', createProxyMiddleware({ target: 'https://app.ecofleet.com/seeme/Api', changeOrigin: true }));
        app.use('/api/', MainRoute);

        app.all('/*', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });
    }


}

new Server();
