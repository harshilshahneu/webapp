import { Assignment } from "../sequelize.js";

//get all the assignments
export const getAll = async () => {
    const assignments = await Assignment.scope('withoutAccountId').findAll();
    return assignments;
}

//get an assignment by id
export const getById = async (id) => {
    const assignment = await Assignment.scope('withoutAccountId').findByPk(id);
    return assignment;
}

//check ownership of an assignment
export const checkOwnership = async (id, AccountId) => {
    //check if the assignment exists
    const assignment = await Assignment.findByPk(id);
    
    let status = 200;
     
    if(!assignment) {
        status = 404;
    } else if(assignment.AccountId !== AccountId) { //check if the assignment belongs to the user
        status = 403;
    }
        
    return status;
}
        
 
//create an assignment
export const create = async (assignment, AccountId) => {
    const newAssignment = await Assignment.create({
        ...assignment,
        AccountId,
    });

    //remove the AccountId from the response
    delete newAssignment.dataValues.AccountId;

    return newAssignment;
}

//update an assignment
export const update = async (id, assignment, AccountId) => {
    
    let status = await checkOwnership(id, AccountId);

    if(status === 200) {
        await Assignment.update(assignment, {
            where: {
                id,
            },
        });
    
        status = 204;
    }

    return status;
}

//delete an assignment
export const remove = async (id, AccountId) => {
    let status = await checkOwnership(id, AccountId);

    if(status === 200) {
        await Assignment.destroy({
            where: {
                id,
            },
        });

        status = 204;
    }

    return status;
}