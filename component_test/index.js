let axios = require('axios').default;
let fs = require('fs')
let response;
axios.get(`https://youtube.com`)

.then(data=>{
    console.log(data.data);
})
.catch(err=>{
    if(typeof err.response == 'undefined'){
        console.log(err);
    }else{
        console.log(err.response.data);
    }
})

