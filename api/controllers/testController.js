
let shell = require('child_process').execSync;
let fs = require('fs');

function testController(req,res,next){
    writeEnv({"typeTest":req.params.typeTest});
    if(fs.existsSync(`/opt/app/${req.params.typeTest}`)){
        if(fs.existsSync(`/opt/app/${req.params.typeTest}/docfiles`)){
            try{
                shell(`cp -r /opt/app/${req.params.typeTest}/docfiles /opt/app/testing_components_v1/component_test/docfiles && cd  /opt/app/testing_components_v1/component_test && npm test --forceExit --detectOpenHandles`);
            }catch(err){
                console.log(err);
            }
    
            res.redirect('/report');
        }else{
            res.redirect('/docfilesNotFound');
        }
    
    }else{
        res.redirect('/apiNotFound');
    }
}

function writeEnv(data){
    fs.writeFileSync('../microservice.json',JSON.stringify(data));
}

module.exports = testController;