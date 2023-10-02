import { Assignment } from "../sequelize.js";

//get all the assignments
export const getAll = async () => {
    try {
        const assignments = await Assignment.findAll();
        return {
            status: 200,
            assignments,
        };
    } catch (err) {
        return {
            status: err,
        };
    }
}

//get an assignment by id
export const getById = async (id) => {
    try {
        const assignment = await Assignment.findByPk(id);
        return {
            status: 200,
            assignment,
        };
    } catch (err) {
        return {
            status: err,
        };
    }
}
 
//create an assignment
export const create = async (assignment) => {
    try {
        const newAssignment = await Assignment.create(assignment);

        return {
            status: 201,
            newAssignment,
        };
    } catch (err) {
        return {
            status: err,
        };
    }
}

//update an assignment
export const update = async (id, assignment) => {
    try {
        const updatedAssignment = await Assignment.update(assignment, {
            where: {
                id,
            },
        });

        return {
            status: 204,
            updatedAssignment,
        };
    } catch (err) {
        return {
            status: err,
        };
    }
}

//delete an assignment
export const remove = async (id) => {
    try {
        const deletedAssignment = await Assignment.destroy({
            where: {
                id,
            },
        });

        return {
            status: 204,
            deletedAssignment,
        };
    } catch (err) {
        return {
            status: err,
        };
    }
}