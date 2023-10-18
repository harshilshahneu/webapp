import * as healthZService from '../services/healthz-service.js';
import { setResponse } from '../utils/response-utils.js';

export const get = async (req, res) => {
    try {
        const { status } = await healthZService.getConnection();
    
        setResponse(res, status === 200 ? 200 : 503)
    } catch (err) {
        setResponse(res, 400);
    }
}
