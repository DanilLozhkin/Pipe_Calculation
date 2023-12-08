
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');


const https = require('https');
const fs = require('fs');
const app = express();
const router = require('../controllers/control');

app.disable('x-powered-by');
app.use(helmet())

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    //console.log(req.method, req.url, "/", req.httpVersion);
    console.log("HOST:", req.socket.address().address, ":", req.socket.address().port);
    next();
});
app.use(morgan('dev'));

app.use('/', router);


const hostname = '192.168.1.64';
const PORT = 8000;


https
    .createServer(
    {
        key: fs.readFileSync('./cert/private.key'),
        cert: fs.readFileSync('./cert/certificate.crt'),
    },
    app
    )
    .listen(PORT, hostname, function () {
    console.log(
        `Server listens https://${hostname}:${PORT}`
    );
});