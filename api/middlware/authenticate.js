import * as accountService from '../services/account-service.js';
import { setResponse } from '../utils/response-utils.js';

export const authenticate = async (req, res, next) => {
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [email, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    
    // Verify login and password are set and correct
    if (email && password) {
        //check if login and password are in the database
        const AccountId = await accountService.getByLogin({ email, password });
        if(AccountId) {
            // Access granted...
            req.user = { email, AccountId };
            return next();
        }
    }

    // Access denied...
    // if the email and password are not set, challenge the client to authenticate
    // if the email and password are set, but incorrect, send only 401
    const authenticateHeader = email && password ? {} : { "WWW-Authenticate": 'Basic realm="Access to the staging site", charset="UTF-8"' };
    setResponse(
        res,
        401,
        authenticateHeader
    )
}
