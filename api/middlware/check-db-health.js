import { setResponse } from "../utils/response-utils.js";
import * as healthZService from '../services/healthz-service.js';

export const getDBStatus = async (req, res, next) => {
    try {
        const { status } = await healthZService.getConnection();

        if(status === 200) {
            return next();
        } else {
            setResponse({ req, res, status: 503, err: new Error('Service Unavailable')});
        }
    } catch (err) {
        return  setResponse({req, res, status: 400, err: new Error('Bad Request') }) ;
    }
}