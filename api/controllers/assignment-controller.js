import * as assignmentService from '../services/assignment-service.js';
import { setResponse } from '../utils/response-utils.js';
import Sequelize from 'sequelize';

//get all assignments
export const getAssigments = async (req, res) => {
    try {
        const assignments = await assignmentService.getAll();
        setResponse({ req, res, status: 200, data: assignments });
    } catch (err) {
        setResponse({ req, res, status: 400, err });
    }
}

//get an assignment by id
export const getAssigmentById = async (req, res) => {
    try {
        const assignment = await assignmentService.getById(req.params.id);
        if(assignment) {
            setResponse({ req, res, status: 200, data: assignment });
        } else {
            setResponse({ req, res, status: 404, err: new Error('Assignment Not Found') });
        }
    } catch (err) {
        setResponse({ req, res, status: 400, err});
    }
}

//create an assignment
export const createAssigment = async (req, res) => {
    try {
        const newAssignment = await assignmentService.create(req.body, req.user.AccountId);
        setResponse({ req, res, status: 201, data: newAssignment });
    } catch (err) {
        let message;
        if(err instanceof Sequelize.DatabaseError) {
            message = err.message;
        } else if (err instanceof Sequelize.ValidationError || err instanceof Sequelize.UniqueConstraintError) {
            message = err.errors.map(err => err.message);
        }

        setResponse({ req, res, status: 400, err: new Error(message) });
    }
}

//update an assignment
export const updateAssigment = async (req, res) => {
    try {
        const status = await assignmentService.update(req.params.id, req.body, req.user.AccountId);
        setResponse({ req, res, status });
    } catch (err) {
        let message;
        if(err instanceof Sequelize.DatabaseError) {
            message = err.message;
        } else if (err instanceof Sequelize.ValidationError || err instanceof Sequelize.UniqueConstraintError) {
            message = err.errors.map(err => err.message);
        }

        setResponse({ req, res, status: 400, err: new Error(message) });
    }
}

//delete an assignment
export const deleteAssigment = async (req, res) => {
    try {
        const status = await assignmentService.remove(req.params.id, req.user.AccountId);
        setResponse({ req, res, status });
    } catch (err) {
        setResponse({ req, res, status: 400, err });
    }
}

//@EDGE CASES - WHAT IF DEADLINE / NUM OF ATTEMPTS IS CHANGED AFTER SUBMISSIONS HAVE BEEN MADE?
//submit the assignment 
export const submitAssigment = async (req, res) => {
    try {
        const newSubmission = await assignmentService.submit(req.params.id, req.body.submission_url, req.user);
        switch(newSubmission.status) {
            case 201:
                setResponse({ req, res, status: newSubmission.status, data: newSubmission.submission });
                break;
            default: //@TODO: add other cases with error messages
                setResponse({ req, res, status: newSubmission.status, data: {error: newSubmission.errorMessage} });
                break;
        }
    } catch (err) {
        let message;
        if(err instanceof Sequelize.DatabaseError) {
            message = err.message;
        } else if (err instanceof Sequelize.ValidationError || err instanceof Sequelize.UniqueConstraintError) {
            message = err.errors.map(err => err.message);
        }

        setResponse({ req, res, status: 400, err: new Error(message) });
    }
}