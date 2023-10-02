import express from "express";
import * as assignmentController from "../controllers/assignment-controller.js";
import { setResponse } from "../utils/response-utils.js";

const Router = express.Router();

//CRUD routes for assignments
//Get and Post routes for tasks
Router.route('/')
    .get(assignmentController.getAssigments)
    .post(assignmentController.createAssigment)


//Get, Put and Delete routes with id as the wildcard 
Router.route('/:id')
    .get(assignmentController.getAssigmentById)
    .put(assignmentController.updateAssigment)
    .delete(assignmentController.deleteAssigment);


//Catch-all middleware for unhandled routes
//@TODO check if this is needed
Router.all((req, res) => {
        setResponse(res, 405);
    });

export default Router;
