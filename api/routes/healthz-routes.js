import express from "express";
import * as healthzController from "../controllers/healthz-controller.js";
import { validateEmptyPayload } from "../middlware/validate-payload.js";
import { setResponse } from "../utils/response-utils.js";
import { increment } from "../middlware/statsd.js";

const Router = express.Router();

//Get route to check health
Router.route('/')
    .get(increment(`get.healthz`), validateEmptyPayload, healthzController.get)
    .all((req, res) => {
        setResponse({ req, res, status: 405, err: new Error('Method Not Allowed') });
    });

export default Router;
