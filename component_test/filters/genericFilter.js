
/**
 * Make the filters for to read the data microservices
*/
class GenericFilter{
    metaMicroserviceFilter(array,type){
        return array.filter(element=>element.includes(`${type}Docfile.json`));
    }
    apisFilter(array){
        return array.filter(element => !element.includes("."));
    }
    apiMetadataFilter(array){
        return array.filter(element=>element.includes("ApiDocfile.json")).toString();
    }

    apiFolderFilter(array){
        return array.filter(element=>!element.includes('.')).toString();
    }

    endpointFilter(array){
        return array.filter(element=>element.includes('json'));
    }


}

module.exports.GenericFilter = GenericFilter;
