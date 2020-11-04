const {
    getRequestTestHandler,
    postRequestTestHandler,
    putRequestTestHandler,
    deleteRequestTestHandler,
    patchRequestTestHandler
} = require("./requestHelpers");

/**
 * Executes the method http validation and return response of http methods 
 * @param {String} method request method http
 * @param {*Object} data data request
 */
const requestFactory = async(method, data) => {

    let body;
    if (data.bodyData) {
        body = data.bodyData;

    } else {
        body = data.attach;
    }
    method = method.toUpperCase();
    let res;
    try {
        switch (method) {
        case 'GET':
            res = await getRequestTestHandler(data.params, data.headers, data.url, data.chai);
            break;

        case 'POST':
            res = await postRequestTestHandler(data.params, data.headers, data.url, data.chai, body);
            break;
        case 'PUT':
            res = await putRequestTestHandler(data.params, data.headers, data.url, data.chai, body);
            break;
        case 'DELETE':
            res = await deleteRequestTestHandler(data.params, data.headers, data.url, data.chai);
            break;
        case 'PATCH':
            res = await patchRequestTestHandler(data.params, data.headers, data.url, data.chai);
            break;
        default:
            throw 'Method http invalid';

        }
    } catch (err) {
        console.log(err);
    }
    return res;
};

module.exports = requestFactory;