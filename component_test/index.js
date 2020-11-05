let axios = require('axios').default;

axios.get(`https://apitester.com/`)

.then(data=>{
    console.log(data.data);
})
.catch(err=>{
    console.log(err);
});

