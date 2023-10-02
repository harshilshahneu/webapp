import * as assignmentService from '../services/assignment-service.js';

//get all assignments
//@TODO validate the payload from req
//@TODO refactor to the already existing setResponse function
//@TODO take care of all the edge cases in catch blocks

export const getAssigments = async (req, res) => {
    try {
        const { status, assignments } = await assignmentService.getAll();
        
        res.status(status).json(assignments);
    } catch (err) {
        res.status(404).json(err);
    }
}

//get an assignment by id
export const getAssigmentById = async (req, res) => {
    try {
        const { status, assignment } = await assignmentService.getById(req.params.id);
        res.status(status).json(assignment);
    } catch (err) {
        res.status(404).json(err);
    }
}

//create an assignment
export const createAssigment = async (req, res) => {
    try {
        const { status, newAssignment } = await assignmentService.create(req.body);
        res.status(status).json(newAssignment);
    } catch (err) {
        res.status(404).json(err);
    }
}

//update an assignment
export const updateAssigment = async (req, res) => {
    try {
        const { status, updatedAssignment } = await assignmentService.update(req.params.id, req.body);
        res.status(status).json(updatedAssignment);
    } catch (err) {
        res.status(404).json(err);
    }
}

//delete an assignment
export const deleteAssigment = async (req, res) => {
    try {
        const { status } = await assignmentService.remove(req.params.id);
        res.status(status).json();
    } catch (err) {
        res.status(404).json(err);
    }
}