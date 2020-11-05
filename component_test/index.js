let axios = require('axios').default;
let fs = require('fs');
axios.get(`http://localhost:3001/test/${process.env.DATA}`)

.then(data=>{
    print(data.data)
})
.catch(err=>{
    print(err.response.data)
})

let print = (data)=>{console.log(data);}