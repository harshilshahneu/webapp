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
export const getById = async (id, AccountId) => {
    try {
        //check if the assignment exists
        let assignment = await Assignment.findByPk(id);
        let status = 200;
     
        if(!assignment) {
            status = 404;
            assignment = {};
        }

        //check if the assignment belongs to the user
        if(assignment.AccountId !== AccountId) {
            status = 403;
            assignment = {};
        }
        
        return {
            status,
            assignment,
        };
    } catch (err) {
        return {
            status: err,
        };
    }
}
 
//create an assignment
export const create = async (assignment, AccountId) => {
    try {
        const newAssignment = await Assignment.create({
            ...assignment,
            AccountId,
        });

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
export const update = async (id, assignment, AccountId) => {
    try {
        const { status } = await getById(id, AccountId);

        if(status === 200) {
            const updatedAssignment = await Assignment.update(assignment, {
                where: {
                    id,
                },
            });
    
            return {
                status: 204,
                updatedAssignment,
            };
        }

        return {
            status,
        };
    } catch (err) {
        return {
            status: err,
        };
    }
}

//delete an assignment
export const remove = async (id, AccountId) => {
    try {
        const { status } = await getById(id, AccountId);

        if(status === 200) {
            const deletedAssignment = await Assignment.destroy({
                where: {
                    id,
                },
            });
    
            return {
                status: 204,
                deletedAssignment,
            };
        }

        return {
            status,
        }
    } catch (err) {
        return {
            status: err,
        };
    }
}