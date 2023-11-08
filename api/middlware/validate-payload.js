import { setResponse } from "../utils/response-utils.js";

/**
 * Ignoring query params everywhere since the REST spec mentions that query params to be used for filtering / response modification
 */

export const validateEmptyPayload = (req, res, next) => {  
    //payload and query params should be empty
    if(Object.keys(req.body).length || Object.keys(req.query).length ||  req.get('Content-Length') > 0) {
        setResponse({req, res, status: 400, err: new Error('Bad Request') }) 
    } else {
        return next();
    }
}

//for POST requests where the payload should be exaclty the schema
export const validatePayloadSchema = (schemaKeys, optionalKeys) => {
    let valid = true;
    return (req, res, next) => {
        //no query params allowed
        if(Object.keys(req.query).length) {
            valid = false;
        } else {
            const reqKeys = Object.keys(req.body);
           
            //delete the optional keys from the schema
            if(optionalKeys) {
                optionalKeys.forEach(key => {
                    const index = reqKeys.indexOf(key);
                    if(index > -1) {
                        reqKeys.splice(index, 1);
                        delete req.body[key];
                    }
                });
            }

            //check if the payload has all the schema properties and no extra properties
            const hasAllSchemaProperties = schemaKeys.every(key => reqKeys.includes(key));
            const hasNoExtraProperties = reqKeys.every(key => schemaKeys.includes(key));
            valid = hasAllSchemaProperties && hasNoExtraProperties;
        }

        if(!valid) {
            setResponse({req, res, status: 400, err: new Error('Bad Request') });
            return;
        }
        
        return next();
    }
}

//for PUT requests where the payload should have atleast one of the schema properties and no extra properties
export const validatePayloadProperties = (schemaKeys, optionalKeys) => {
    return (req, res, next) => {
        let valid = false;

        //no query params allowed
        if(Object.keys(req.query).length) {
            valid = false;
        } else {
            const reqKeys = Object.keys(req.body);

             //delete the optional keys from the schema
            if(optionalKeys) {
                optionalKeys.forEach(key => {
                    const index = reqKeys.indexOf(key);
                    if(index > -1) {
                        reqKeys.splice(index, 1);
                        delete req.body[key];
                    }
                });
            }

            //check if the payload has atleast one of the schema properties and no extra properties
            const hasAtLeastOneSchemaProperty = schemaKeys.some(key => reqKeys.includes(key));
            const hasNoExtraProperties = reqKeys.every(key => schemaKeys.includes(key));
            valid = hasAtLeastOneSchemaProperty && hasNoExtraProperties;
        }

        if(!valid) {
            setResponse({req, res, status: 400, err: new Error('Bad Request') });
            return;
        }

        return next();
    }
}