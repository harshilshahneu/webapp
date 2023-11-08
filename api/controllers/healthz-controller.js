import * as healthZService from '../services/healthz-service.js';
import { setResponse } from '../utils/response-utils.js';
import client from '../../configs/statsd.config.js';

export const get = async (req, res) => {
    try {
        client.increment(`get.healthz`);
        
        const { status } = await healthZService.getConnection();
        if(status === 200) {
            setResponse({ req, res, status: 200 })
        } else {
            setResponse({ req, res, status: 503, err: new Error('Service Unavailable') })
        }
    } catch (err) {
        setResponse({ req, res, status: 400, err });
    }
}
