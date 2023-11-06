import { logger } from './../../configs/logger.config.js';
import client from '../../configs/statsd.config.js';
export const setResponse = (res, status, headers, data) => {
    //set logs for response
    client.increment(`response.status.${status}`);
    if(status >= 400) {
        //@TODO add error message to logs
        logger.error(`Response status: ${status}`);
    } else {
        logger.info(`Response status: ${status}`);
    }


    res.status(status)
        .header('cache-control', 'no-cache, no-store, must-revalidate')
        .header('pragma', 'no-cache')

    //set the headers
    if (headers) {
        for (const [key, value] of Object.entries(headers)) {
            res.header(key, value);
        }
    }
    
    res.json(data);
}
