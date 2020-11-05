let axios = require('axios').default;
let url = `http://localhost:3001/test/${process.env.DATA}`;
axios.get(`http://localhost:3001/test/${process.env.DATA}`)

.then(data=>{
    console.log(data.data);
})
.catch(err=>{
    console.log(err);
});

