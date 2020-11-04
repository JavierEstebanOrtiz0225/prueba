let express = require('express');

let app = express();

let routers = require('../routes/router');

app.se(routers);

module.exports = app;