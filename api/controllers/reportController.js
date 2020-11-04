
let fs = require('fs');
let shell = require('child_process').execSync;

function reporterController(req,res,next){
    fs.readFile('/opt/app/testing_components_v1/component_test/api/test/reporters/report.html','utf-8',(err,data)=>{

        if(err) throw err;
        res.send(data);
        try{
            let res = shell('rm -r /opt/app/testing_components_v1/component_test/docfiles && rm -r /opt/app/testing_components_v1/component_test/api/test/reporters/report.html');
            console.log(res.toString());
        }catch(err){
            console.log(err.toString());
        }
    });
}

module.exports = reporterController;