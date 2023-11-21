import { Assignment } from "../sequelize.js";
import { Submission } from "../sequelize.js";
import { publishToSns } from "../utils/sns-utils.js";

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

export const getSubmissionsById = async (assignment_id) => {
    const submissions = await Submission.findAll({
        where: {
            assignment_id,
        }
    });

    return submissions;
}
//submit an assignment
export const submit = async (id, submission_url, AccountId) => {
    let status = await checkOwnership(id, AccountId);
    let submission = null;

    if(status === 200) {
        //check number of attempts remaining for the assignment
        const assignment = await getById(id);
      
        //check existing submissions
        const submissions = await getSubmissionsById(id);

        //check if the number of submissions is less than the number of attempts allowed and check the deadline as well
        if(submissions.length < assignment.num_of_attempts && new Date() < assignment.deadline) {
            submission = await Submission.create({
                assignment_id: id,
                submission_url,
            });

            //publish to SNS
            await publishToSns(submission_url);

            status = 201;
        } else {
            //rejection status code
            status = 400;
        }
    }

    return {
        submission,
        status,
    };
}