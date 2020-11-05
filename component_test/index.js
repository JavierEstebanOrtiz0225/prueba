let chai = require('chai')
let chaiHttp = require('chai-http')
chai.use(chaiHttp);
async function response(){


    let chaiClient = chai.request.agent(`http://localhost:3001/`)

    let res  = await chaiClient.get(`test/${process.env.DATA}`)

    console.log(res);
}

response()