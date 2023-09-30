import express from "express";
import * as healthzController from "../controllers/healthz-controller.js";
import { setResponse } from "../utils/response-utils.js";

const Router = express.Router();

//Get route to check health
Router.route('/')
    .get(healthzController.get)
    .all((req, res) => {
        setResponse(res, 405);
    });

export default Router;
