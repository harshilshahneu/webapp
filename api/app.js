import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dotenv from "dotenv";

// Load the environment variables
dotenv.config();

// Create the app
const app = express();

// Disable X-Powered-By header
app.disable('x-powered-by');

//Add middleware
app.use(express.json());

//catch invalid json
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json();
        return;
    }

    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Pass the app to the routes
routes(app);

export default app;
