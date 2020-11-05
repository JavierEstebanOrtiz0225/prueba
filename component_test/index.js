let axios = require('axios').default;
axios.get(`http://localhost:3001/test/${process.env.DATA}`)

.then(data=>{
    console.log(data.data);
})
.catch(err=>{
    console.log(err);
})

