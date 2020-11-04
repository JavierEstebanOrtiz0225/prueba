process.env.NODE_ENV = "test";

const DataMicroservice = require('./readDocfiles').readDataMicroservice;

const read = new DataMicroservice();

const {
    requestHandler
} = require("./requestHandler");
const {
    responseHandler
} = require("./responseHandler");
const fs = require("fs");
// // const sendSlackMessage = require('./utils/rabbitmq.utils').sendSlackMessage;

// get docfile of the microservice

// get microservice
let microservice = read.microserviceMetaData();

describe(`Staged [${microservice.name}] Microservice`, () => {
    // get apis
    let apis = read.apis();

    apis.forEach(api => {


        //get ApiDocfile
        let apiDocfile = read.apiMetadata(api);
        
        describe(` ON [${apiDocfile.name}] Api`, () => {
            //get endpoints

            let endpoints = read.endpoints(api);

            if (endpoints.length > 0) {
                endpoints.forEach(endpoint => {
                    let {
                        info,
                        useCases
                    } = read.endpoint(api,endpoint);
                    describe(` Endpoint: ${info.url}`, () => {
                        Object.keys(useCases).forEach(useCase => {
                            let {
                                infoCase,
                                req,
                                res
                            } = useCases[useCase];
                            /**
                             *   Make the test validation between the expect response and the request response
                             */
                            test(`[${infoCase.method}] ${infoCase.title}`, async () => {
                                let received = await requestHandler(
                                    req,
                                    microservice.host,
                                    microservice.port,
                                    infoCase.method,
                                    info.url,
                                    useCase
                                );
                            

                                let expected = await responseHandler(res, received);
                                try {
                                    if(infoCase.typeOfRes){
                                        if ((infoCase.testStrict === true) || (infoCase.testStrict === false)) {
                                            /**
                                             * Validate if the test need are strict or not 
                                             */
                                            if (infoCase.testStrict) {
                                                expect(expected).toEqual(expect.arrayContaining(received));
                                            } else {
                                                expect(Object.keys(received).sort()).toEqual(
                                                    Object.keys(expected).sort()
                                                );
                                                if (received !== expected) {
                                                    expect(Object.keys(received).sort()).toEqual(
                                                        Object.keys(expected).sort()
                                                    );
                                                } else {
                                                    expect(res).toEqual(received);
                                                }
                                            }
                                        } else {
                                            throw "el valor de teststrict es invalido o esta undefined";
                                        }
                                    }else{
                                        if ((infoCase.testStrict === true) || (infoCase.testStrict === false)) {
                                            if (infoCase.testStrict) {
                                                expect(expected).toEqual(received);
                                            } else {
                                                expect(Object.keys(received).sort()).toEqual(
                                                    Object.keys(expected).sort()
                                                );
                                                if (received !== expected) {
                                                    expect(Object.keys(received).sort()).toEqual(
                                                        Object.keys(expected).sort()
                                                    );
                                                } else {
                                                    expect(res).toEqual(received);
                                                }
                                            }
                                        } else {
                                            throw "el valor de teststrict es invalido o esta undefined";
                                        }
                                    }
                                }
                                catch (err) {
                                    console.log("Fail:" + err);
                                    // sendSlackMessage(`:penguin: Error!
                                    // In Microservice: [${microservice.name}]  
                                    // In Api: [${apiDocfile.name}]  
                                    // In Endpoint: [${info.url}]`);
                                    // // sendSlackMessage(`:X: Compnent testing error: <@UK3GF0ZRR> <@USCPNCTQT>`);
                                }
                            }, 50000);
                        });
                    });
                });
            }
        });
    });
});