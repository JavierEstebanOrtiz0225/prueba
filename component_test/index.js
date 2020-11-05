let axios = require('axios').default;
let fs = require('fs')
let response;
axios.get(`http://localhost:3001/test/${process.env.DATA}`)

.then(data=>{
    print(data.data)
})
.catch(err=>{
    print(err.response.data)
})

console.log(data);
let print = (data)=>{console.log(data);}