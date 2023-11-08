import client from '../../configs/statsd.config.js';

export const increment = (key) => {
    return (req, res, next) => {
        client.increment(key);
        return next();
    }
}