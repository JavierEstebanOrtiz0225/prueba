let express = require('express');
let routers = express.Router();

let test = require('../controllers/testController');
let report = require('../controllers/reportController');
let {notFoundApiController,notFoundPathController,notFoundDocfileController} = require('../controllers/errorController');

routers.get('/test/:typeTest',test);
routers.get('/report',report);
routers.get('/apiNotFound',notFoundApiController);
routers.get('/docfilesNotFound',notFoundDocfileController);

routers.use(notFoundPathController);

module.exports = routers;
