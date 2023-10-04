import express from "express";
import * as assignmentController from "../controllers/assignment-controller.js";
import { validateEmptyPayload, validatePayloadProperties, validatePayloadSchema } from "../middlware/validate-payload.js";
import { setResponse } from "../utils/response-utils.js";

const Router = express.Router();

//CRUD routes for assignments
//Get and Post routes for tasks
Router.route('/')
    .get(validateEmptyPayload, assignmentController.getAssigments)
    .post(validatePayloadSchema([
        "name",
        "points",
        "num_of_attempts",
        "deadline"
    ]), assignmentController.createAssigment)
    .all((req, res) => {
        setResponse(res, 405);
    });


//Get, Put and Delete routes with id as the wildcard 
Router.route('/:id')
    .get(validateEmptyPayload, assignmentController.getAssigmentById)
    .put(validatePayloadProperties([
        "name",
        "points",
        "num_of_attempts",
        "deadline"
    ]), assignmentController.updateAssigment)
    .delete(validateEmptyPayload, assignmentController.deleteAssigment)
    .all((req, res) => {
        setResponse(res, 405);
    });

export default Router;
