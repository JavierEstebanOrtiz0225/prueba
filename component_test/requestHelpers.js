var fs = require('fs');
/**
 * Takes the body of the request and checks for the values that are unique,
 * then it replaces them with a new value using Date.now()
 * @param {Object} body body of the request to be modified
 * @returns modified body
 */
const fixUniqueVariables = body => {
    Object.keys(body).map(variableData => {
        if (body[variableData] === 'uniqueVariableData') {
            body[variableData] = Date.now();
        }
    });
    return body;

};
/**
 * Takes the url and modifies it with its path variables
 * (i.e) pathVariable "pathVariable": {"id": "dataFrom"},
 * url = 'mesfix.com/entities/:id' would return mesfix.com/entity/pathVariable.id
 * @param {String} url
 * @param {Object} pathVariable
 */
const setPathVariable = (url, pathVariable) => {
    if (!pathVariable) {
        return url;
    } else {
        Object.keys(pathVariable).forEach(element => {
            url = url.replace(':' + element, pathVariable[element]);
        });
    }
    return url;
};

function verificationParams(url, params) {
    if (typeof params !== "undefined" && params !== null) {
        return setPathVariable(url, params.pathVariable);
    } else {
        return setPathVariable(url);
    }
}
/**
 * Creates and executes a GET request.
 * @param  {Object}    params     Request's parameters.
 * @param  {Object}    headers    Request's headers.
 * @param  {String}    url        Endpoint that is going to be requested.
 * @param  {TestAgent} chaiClient Client generated with chai-http lib.
 * @return {Object}               The response's body for the get request.
 */

const getRequestTestHandler = async(params, headers, url, chaiClient) => {

    url = verificationParams(url, params);
    chaiClient = await setConfigurationRequest(headers, params, chaiClient);
    const resGet = await chaiClient
        .get(`${url}`);
    let response = Object.assign(resGet.body, { status: resGet.status });
    return response;

};
/**
 * Creates and executes a POST request.
 * @param  {Object}    params     Request's parameters.
 * @param  {Object}    headers    Request's headers.
 * @param  {String}    url        Endpoint that is going to be requested.
 * @param  {TestAgent} chaiClient Client generated with chai-http lib.
 * @return {Object}               The response's body for the post request.
 */
const postRequestTestHandler = async(params, headers, url, chaiClient, body) => {

    url = verificationParams(url, params);
    chaiClient = await setConfigurationRequest(headers, params, chaiClient);
    if (body.file) {
        const resGet = await chaiClient
            .post(`${url}`)
            .attach(
                'document',
                fs.readFileSync(process.cwd() + body.file),
                'dummy.pdf');
        let response = Object.assign(resGet.body, { status: resGet.status });

        return response;
    } else {
        body = fixUniqueVariables(body);
        const resGet = await chaiClient
            .post(`${url}`)
            .send(body);
        let response = Object.assign(resGet.body, { status: resGet.status });
        return response;
    }

};

/**
 * Creates and executes a PUT request.
 * @param  {Object}    params     Request's parameters.
 * @param  {Object}    headers    Request's headers.
 * @param  {String}    url        Endpoint that is going to be requested.
 * @param  {TestAgent} chaiClient Client generated with chai-http lib.
 * @return {Object}               The response's body for the get request.
 */
const putRequestTestHandler = async(params, headers, url, chaiClient, body) => {

    chaiClient = await setConfigurationRequest(headers, params, chaiClient);
    url = verificationParams(url, params);
    if (body.file) {
        const resGet = await chaiClient
            .put(`${url}`)
            .attach(
                'document',
                fs.readFileSync(process.cwd() + body.file),
                'dummy.pdf');

        let response = Object.assign(resGet.body, { status: resGet.status });

        return response;
    } else {
        body = fixUniqueVariables(body);
        const resGet = await chaiClient
            .put(`${url}`)
            .send(body);
        let response = Object.assign(resGet.body, { status: resGet.status });
        return response;
    }

};


/**
 * Creates and executes a DELETE request.
 * @param  {Object}    params     Request's parameters.
 * @param  {Object}    headers    Request's headers.
 * @param  {String}    url        Endpoint that is going to be requested.
 * @param  {TestAgent} chaiClient Client generated with chai-http lib.
 * @return {Object}               The response's body for the get request.
 */
const deleteRequestTestHandler = async(params, headers, url, chaiClient) => {

    chaiClient = await setConfigurationRequest(headers, params, chaiClient);
    url = verificationParams(url, params);
    const resGet = await chaiClient
        .delete(`${url}`);
    let response = Object.assign(resGet.body, { status: resGet.status });
    return response;

};

/**
 * Creates and executes a PATCH request.
 * @param  {Object}    params     Request's parameters.
 * @param  {Object}    headers    Request's headers.
 * @param  {String}    url        Endpoint that is going to be requested.
 * @param  {TestAgent} chaiClient Client generated with chai-http lib.
 * @return {Object}               The response's body for the get request.
 */
const patchRequestTestHandler = async(params, headers, url, chaiClient) => {

    chaiClient = await setConfigurationRequest(headers, params, chaiClient);
    url = verificationParams(url, params);
    const resGet = await chaiClient
        .patch(`${url}`);
    let response = Object.assign(resGet.body, { status: resGet.status });
    return response;

};

/**
 * Set the headers and params to request 
 * @param {Object} headers The request headers
 * @param {Object} params The request params
 * @param {Object} chaiClient The object that will do request
 */
async function setConfigurationRequest(headers, params, chaiClient) {
    if (typeof headers !== 'undefined') {
        chaiClient.set(headers);
    }
    if (typeof params !== 'undefined') {
        chaiClient.query(params.query);
    }
    return chaiClient;
}

module.exports = {
    getRequestTestHandler,
    postRequestTestHandler,
    putRequestTestHandler,
    deleteRequestTestHandler,
    patchRequestTestHandler
};