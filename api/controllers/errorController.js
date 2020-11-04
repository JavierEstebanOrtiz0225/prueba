let fs = require('fs');

function notFoundApiController(req,res,next){
    let app = fs.readFileSync('./public/templates/notFoundDirMS.html');
    res.status(500);
    res.send(app.toString());
}

function notFoundDocfileController(req,res,next){
    let app = fs.readFileSync('./public/templates/notFoundDocfiles.html');

    res.status(500);
    res.send(app.toString());
}

function notFoundPathController(req,res,next){
    let app = fs.readFileSync('./public/templates/notFoundPath.html');

    res.status(500);
    res.send(app.toString());
}
module.exports = {notFoundApiController,notFoundDocfileController,notFoundPathController};