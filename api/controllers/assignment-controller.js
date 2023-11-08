import * as assignmentService from '../services/assignment-service.js';
import { setResponse } from '../utils/response-utils.js';
import Sequelize from 'sequelize';
import client from '../../configs/statsd.config.js';

//get all assignments
export const getAssigments = async (req, res) => {
    try {
        client.increment(`get.all.assignments`);

        const assignments = await assignmentService.getAll();
        setResponse({ req, res, status: 200, data: assignments });
    } catch (err) {
        setResponse({ req, res, status: 400, err });
    }
}

//get an assignment by id
export const getAssigmentById = async (req, res) => {
    try {
        client.increment(`get.assignment.by.id`);

        const assignment = await assignmentService.getById(req.params.id);
        if(assignment) {
            setResponse({ req, res, status: 200, data: assignment });
        } else {
            setResponse({ req, res, status: 404, err: new Error('Assignment Not Found') });
        }
    } catch (err) {
        setResponse({ req, res, stats: 400, err});
    }
}

//create an assignment
export const createAssigment = async (req, res) => {
    try {
        client.increment(`create.assignment`);

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
        client.increment(`update.assignment`);

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
        client.increment(`delete.assignment`);

        const status = await assignmentService.remove(req.params.id, req.user.AccountId);
        setResponse({ req, res, status });
    } catch (err) {
        setResponse({ req, res, status: 400, err });
    }
}