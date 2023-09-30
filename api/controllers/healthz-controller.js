import * as healthZService from '../services/healthz-service.js';
import { setResponse } from '../utils/response-utils.js';

export const get = async (req, res) => {
    if(Object.keys(req.body).length || Object.keys(req.query).length) {
        //payload not allowed
        setResponse(res, 400);
        return;
    }

    const { status } = await healthZService.getConnection();

    switch(status) {
        case 200:
            setResponse(res, 200);
            break;
        case -61:
            setResponse(res, 503);
            break;
        default:
            setResponse(res, 400);
            break;
    }
}
