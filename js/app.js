
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');


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


const hostname = '127.0.0.1';
const PORT = 3000;


app.listen(PORT, hostname, () => {
    console.log("OK server");
    
});
