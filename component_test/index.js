let axios = require('axios').default;
let fs = require('fs')

axios.get(`http://localhost:3001/test/${process.env.DATA}`)

.then(data=>{
    fs.appendFileSync('./artefact/response.html',data.data)
    console.log(data.data);
})
.catch(err=>{
    fs.appendFileSync('./artefact/response.html',err.response.data)
    console.log(err.response.data);
})