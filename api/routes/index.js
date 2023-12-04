import healthzRoutes from './healthz-routes.js';
import assignmentRoutes from './assignment-routes.js';
import { setResponse } from '../utils/response-utils.js';

//Pass the app to the routes
const routes = (app) => {
    //Health check route
    app.use('/healthz', healthzRoutes);
    
    //Assignment routes
    // check the db status -> authenticate -> validate the payload -> call the controller
    app.use('/v1/assignments', assignmentRoutes);

    // Catch-all middleware for unhandled routes
    app.use((req, res) => {
        setResponse({ req, res, status: 404, err: new Error('Route Not Found') });
    });
}

export default routes;
