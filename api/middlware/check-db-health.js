import { setResponse } from "../utils/response-utils.js";
import * as healthZService from '../services/healthz-service.js';

export const getDBStatus = async (req, res, next) => {
    try {
        const { status } = await healthZService.getConnection();

        if(status === 200) {
            return next();
        } else {
            setResponse(res, 503);
        }
    } catch (err) {
        console.log(err);
        return setResponse(res, 400, err);
    }
}