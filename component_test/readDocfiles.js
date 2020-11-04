let fs = require('fs');


let GenericFilter = require('./filters/genericFilter').GenericFilter;
let generic = new GenericFilter();

class readDataMicroservice {
    /**
     * Read and filter the files the structure microservice
     * @param {String} root the path root the microservices
     * @param {GenericFilter} filter class filter files the microservice
     */
    constructor(docUrls = './urls.json', filter = generic) {
        this.paths = require(docUrls);
        this.filter = filter;
    }
    /**
     * Return microservice metadata
     */
    microserviceMetaData() {
        let data = fs.readdirSync(this.paths.root);
        let dataFilter = this.filter.metaMicroserviceFilter(data, 'Ms');
        let microservice = require(this.paths.root + '/' + dataFilter);
        return microservice;
    }
    apis() {
        let apis = fs.readdirSync(`${this.paths.root}${this.paths.apis}`);
        let apisFilter = this.filter.apisFilter(apis);
        return apisFilter;
    }
    endpointFolder(api) {
        let apiContent = fs.readdirSync(`${this.paths.root}${this.paths.apis}/${api}`);
        return this.filter.apiFolderFilter(apiContent);
    }
    apiMetadata(api) {
        let paths = `${this.paths.root}${this.paths.apis}/${api}`;
        let dataApi = this.filter.apiMetadataFilter(fs.readdirSync(paths));
        let meta = require(`${paths}/${dataApi}`);
        return meta;
    }
    endpoints(api) {
        let innerFolderEndpoints = fs.readdirSync(`${this.paths.root}${this.paths.apis}/${api}/${this.endpointFolder(api)}`);
        let endpoints = this.filter.endpointFilter(innerFolderEndpoints);
        return endpoints;
    }
    endpoint(api, endpointName) {
        let path = `${this.paths.root}${this.paths.apis}/${api}/${this.endpointFolder(api)}/${endpointName}`;
        return require(path);
    }
}

module.exports.readDataMicroservice = readDataMicroservice;