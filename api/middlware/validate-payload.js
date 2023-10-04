import { setResponse } from "../utils/response-utils.js";

/**
 * Ignoring query params everywhere since the REST spec mentions that query params to be used for filtering / response modification
 */

export const validateEmptyPayload = (req, res, next) => {  
    //payload and query params should be empty
    if(Object.keys(req.body).length || Object.keys(req.query).length) {
        setResponse(res, 400) 
    } else {
        return next();
    }
}

//for POST requests where the payload should be exaclty the schema
export const validatePayloadSchema = (schemaKeys) => {
    let valid = true;
    return (req, res, next) => {
        //no query params allowed
        if(Object.keys(req.query).length) {
            valid = false;
        } else {
            //check if the payload has all the schema properties and no extra properties
            const reqKeys = Object.keys(req.body);
            const hasAllSchemaProperties = schemaKeys.every(key => reqKeys.includes(key));
            const hasNoExtraProperties = reqKeys.every(key => schemaKeys.includes(key));
            valid = hasAllSchemaProperties && hasNoExtraProperties;
        }

        if(!valid) {
            setResponse(res, 400);
            return;
        }
        
        return next();
    }
}

//for PUT requests where the payload should have atleast one of the schema properties and no extra properties
export const validatePayloadProperties = (schemaKeys) => {
    return (req, res, next) => {
        let valid = false;

        //no query params allowed
        if(Object.keys(req.query).length) {
            valid = false;
        } else {
            //check if the payload has atleast one of the schema properties and no extra properties
            const reqKeys = Object.keys(req.body);
            const hasAtLeastOneSchemaProperty = schemaKeys.some(key => reqKeys.includes(key));
            const hasNoExtraProperties = reqKeys.every(key => schemaKeys.includes(key));
            valid = hasAtLeastOneSchemaProperty && hasNoExtraProperties;
        }

        if(!valid) {
            setResponse(res, 400);
            return;
        }

        return next();
    }
}