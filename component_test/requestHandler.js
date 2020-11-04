"use strict";
//node in testing enviroment
process.env.NODE_ENV = "test";
var chai = require("chai"),
    chaiHttp = require("chai-http");
chai.use(chaiHttp);
const requestFactory = require('./requestFactory');
let CurrentUseCases = [];
/**
 * It works like forEach but supports
 * asynchronous calls
 * @param {Array} array
 * @param {Function} callback
 */
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
/**
 * Replaces the values in the req with the specified values of the response.
 * @param {Object} subRequests Endpoints subrequest object
 * @param {Object} req Endpoint's requests object
 */
const replaceValues = async(subRequests, request) => {
    await asyncForEach(subRequests, async subRequest => {
        let subReqFile = require(subRequest.endpointFile);
        let subReq = subReqFile.useCases[subRequest.case];
        let subRes = await requestHandler(
            subReq.req,
            subRequest.host,
            subRequest.port,
            subReq.infoCase.method,
            subReqFile.info.url,
            subRequest.case
        );
        await asyncForEach(subRequest.toReplace, async element => {
            //obtener el valor a reemplazar
            let {
                valueToUse,
                keyToReplace
            } = element;
            let arrayOfKeys = valueToUse.split(".");
            while (arrayOfKeys.length > 1) {
                subRes = subRes[arrayOfKeys.shift()];
            }
            let value = subRes[arrayOfKeys[0]];
            //asignar valor a la clave deseada del objeto req
            arrayOfKeys = keyToReplace.split(".");
            while (arrayOfKeys.length > 1) {
                request = request[arrayOfKeys.shift()];
            }
            request[arrayOfKeys[0]] = value;
        });
    });
};

/**s
 * Replaces the needed values for the request that come from
 * its asocciated subrequest
 * @param {Object} request request object to be modified
 * @returns modified request with data from its subrequests
 */
const useSubRequests = async request => {
    try {
        if (request.subRequests) {
            let subRequests = request.subRequests;
            await replaceValues(subRequests, request);
            return request;
        } else {
            return request;
        }
    } catch (err) {
        console.log("Los varoles en req son indefinidos: " + err);
    }
};


/**
 * Executes an http request and returns its an object with the response's body and status.
 * @param   {Object}    request             Request to be performed.
 * @param   {String}    port                Port assign to the microservice.
 * @param   {String}    method              Http method: GET, POST, PUT or DELETE.
 * @param   {String}    url                 Endpoint to be tested.
 * @return  {Object}                        Response body with status.
 */
const requestHandler = async(request, host, port, method, url, useCase) => {
    host = process.env[host];
    port = process.env[port];

    if (CurrentUseCases > 1) {
        // eslint-disable-next-line no-unused-vars
        var first = CurrentUseCases.shift();
    }

    CurrentUseCases.push(useCase + url);
    const hostService = `http://${host}:${port}`;

    let chaiClient = chai.request.agent(hostService);
    request = await useSubRequests(request);
    let data;
    if (typeof request !== 'undefined') {
        data = {
            'params': request.params,
            'headers': request.headers,
            'method': method,
            'url': url,
            'chai': chaiClient,
            'bodyData': request.bodyData,
            'attach': request.attach
        };
    } else {
        data = {

            'method': method,
            'url': url,
            'chai': chaiClient,
        };
    }
    return await requestFactory(method, data);
};

module.exports = {
    requestHandler
};