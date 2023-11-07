import { logger } from './../../configs/logger.config.js';

export const setResponse = ({ req, res, status, headers, data, err }) => {
    //set logs for response
    if(status >= 400) {
        logger.error(`${req.method} ${req.originalUrl} ${status} "${err.message.replace(/(\r\n|\n|\r)/gm,"")}"`);
    } else {
        logger.info(`${req.method} ${req.originalUrl} ${status}`);
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
