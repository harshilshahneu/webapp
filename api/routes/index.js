import healthzRoutes from './healthz-routes.js';
import assignmentRoutes from './assignment-routes.js';
import { setResponse } from '../utils/response-utils.js';
import { authenticate } from '../middlware/authenticate.js';

//Pass the app to the routes
const routes = (app) => {
    //Health check route
    app.use('/healthz', healthzRoutes);
    
    //Assignment routes
    app.use('/v1/assignments', authenticate, assignmentRoutes);

    // Catch-all middleware for unhandled routes
    app.use((req, res) => {
        setResponse(res, 404);
    });
}

export default routes;
