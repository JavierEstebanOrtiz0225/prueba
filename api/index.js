
let server = require('./config/server');
let shell = require('child_process').execSync

server.listen(3001,()=>{
    console.log('Abierto en el puerto 3001');
    shell('cd .. && cd component_test && node index.js')
});