import express from "express";
import * as assignmentController from "../controllers/assignment-controller.js";
import { validateEmptyPayload, validatePayloadProperties, validatePayloadSchema } from "../middlware/validate-payload.js";
import { setResponse } from "../utils/response-utils.js";
import { authenticate } from '../middlware/authenticate.js';
import { getDBStatus } from '../middlware/check-db-health.js';
import { increment } from "../middlware/statsd.js";

const Router = express.Router();

//CRUD routes for assignments
//Get and Post routes for tasks
Router.route('/')
    .get(increment(`get.all.assignments`), getDBStatus, authenticate, validateEmptyPayload, assignmentController.getAssigments)
    .post(increment(`create.assignment`), getDBStatus, authenticate, validatePayloadSchema([
        "name",
        "points",
        "num_of_attempts",
        "deadline",
    ], [
        "assignment_created",
        "assignment_updated"
    ]), assignmentController.createAssigment)
    .all(getDBStatus, authenticate, (req, res) => {
        setResponse({ req, res, status: 405, err: new Error('Method Not Allowed') });
    });


//Get, Put and Delete routes with id as the wildcard 
Router.route('/:id')
    .get(increment(`get.assignment.by.id`), getDBStatus, authenticate, validateEmptyPayload, assignmentController.getAssigmentById)
    .put(increment(`update.assignment`), getDBStatus, authenticate, validatePayloadProperties([
        "name",
        "points",
        "num_of_attempts",
        "deadline",
    ], [
        "assignment_created",
        "assignment_updated"
    ]), assignmentController.updateAssigment)
    .delete(increment(`delete.assignment`), getDBStatus, authenticate, validateEmptyPayload, assignmentController.deleteAssigment)
    .all(getDBStatus, authenticate, (req, res) => {
        setResponse({ req, res, status: 405, err: new Error('Method Not Allowed') });
    });

Router.route('/:id/submission')
    .post(increment(`create.submission`), getDBStatus, authenticate, validatePayloadProperties([
        "submission_url",
    ]), assignmentController.submitAssigment)
    .all(getDBStatus, authenticate, (req, res) => {
        setResponse({ req, res, status: 405, err: new Error('Method Not Allowed') });
    });
export default Router;
