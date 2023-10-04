import { setResponse } from "../utils/response-utils.js";
import * as healthZService from '../services/healthz-service.js';

export const getDBStatus = async (req, res, next) => {
    try {
        const { status } = await healthZService.getConnection();

        if(status === 200) {
            return next();
        } else {
            switch(status) {
                case -61:
                    setResponse(res, 503);
                    break;
                default:
                    setResponse(res, 400);
                    break;
            }
        }
    } catch (err) {
        console.log(err);
        return setResponse(res, 400, err);
    }
}