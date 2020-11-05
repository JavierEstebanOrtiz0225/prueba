let chai = require('chai')
let chaiHttp = require('chai-http')
let action = require('@actions/core')
chai.use(chaiHttp);
async function response(){


    let chaiClient = chai.request.agent(`http://localhost:3001/`)

    let res  = await chaiClient.get(`test/${process.env.DATA}`)
    action.setCommandEcho(true)
    action.debug(res.text)
    action.setOutput('data',res.text)
    console.log(res.text);
}

response()