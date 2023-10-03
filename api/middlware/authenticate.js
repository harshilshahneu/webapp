import * as accountService from '../services/account-service.js';

export const authenticate = async (req, res, next) => {
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [email, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    
    // Verify login and password are set and correct
    if (email && password) {
        //check if login and password are in the database
        if(await accountService.getByLogin({ email, password })) {
            // Access granted...
            return next()
        }
    }

    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') // challenge
    res.status(401).send('Authentication required.')
}
