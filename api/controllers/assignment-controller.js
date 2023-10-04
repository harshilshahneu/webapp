import * as assignmentService from '../services/assignment-service.js';
import { setResponse } from '../utils/response-utils.js';
import Sequelize from 'sequelize';

//get all assignments
export const getAssigments = async (req, res) => {
    try {
        const assignments = await assignmentService.getAll();
        setResponse(res, 200, null, assignments);
    } catch (err) {
        setResponse(res, 400, null, err);
    }
}

//get an assignment by id
export const getAssigmentById = async (req, res) => {
    try {
        const assignment = await assignmentService.getById(req.params.id);
        if(assignment) {
            setResponse(res, 200, null, assignment);
        } else {
            setResponse(res, 404);
        }
    } catch (err) {
        setResponse(res, 400, null, err);
    }
}

//create an assignment
export const createAssigment = async (req, res) => {
    try {
        const newAssignment = await assignmentService.create(req.body, req.user.AccountId);
        setResponse(res, 201, null, newAssignment);
    } catch (err) {
        if(err instanceof Sequelize.DatabaseError) {
            err = err.message;
        } else if (err instanceof Sequelize.ValidationError || err instanceof Sequelize.UniqueConstraintError) {
            err = err.errors.map(err => err.message);
        }

        setResponse(res, 400, null, err);
    }
}

//update an assignment
export const updateAssigment = async (req, res) => {
    try {
        const status = await assignmentService.update(req.params.id, req.body, req.user.AccountId);
        setResponse(res, status);
    } catch (err) {
        if(err instanceof Sequelize.DatabaseError) {
            err = err.message;
        } else if (err instanceof Sequelize.ValidationError || err instanceof Sequelize.UniqueConstraintError) {
            err = err.errors.map(err => err.message);
        }

        setResponse(res, 400, null, err);
    }
}

//delete an assignment
export const deleteAssigment = async (req, res) => {
    try {
        const status = await assignmentService.remove(req.params.id, req.user.AccountId);
        setResponse(res, status);
    } catch (err) {
        if(err instanceof Sequelize.DatabaseError) {
            err = err.message;
        }

        setResponse(res, 400, null, err);
    }
}