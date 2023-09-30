import healthzRoutes from './healthz-routes.js';
import { setResponse } from '../utils/response-utils.js';

//Pass the app to the routes
const routes = (app) => {
    //All the task routes will come under /tasks
    app.use('/healthz', healthzRoutes);
    
    // Catch-all middleware for unhandled routes
    app.use((req, res) => {
        setResponse(res, 404);
    });
}

export default routes;
