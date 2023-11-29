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

    //check if the assignment has any submissions
    const submissions = await getSubmissionsById({assignment_id: id});

    if(status === 200 && submissions.length === 0) {
        await Assignment.update(assignment, {
            where: {
                id,
            },
        });
    
        status = 204;
    } else {
        status = 400;
    }

    return status;
}

//delete an assignment
export const remove = async (id, AccountId) => {
    let status = await checkOwnership(id, AccountId);

    //check if the assignment has any submissions
    const submissions = await getSubmissionsById({assignment_id: id});

    if(status === 200 && submissions.length === 0) {
        await Assignment.destroy({
            where: {
                id,
            },
        });

        status = 204;
    } else {
        status = 400;
    }

    return status;
}

export const getSubmissionsById = async (conditions) => {
    const submissions = await Submission.findAll({
        where: {
            ...conditions
        }
    });

    return submissions;
}
//submit an assignment
export const submit = async (id, submission_url, user) => {
    const { AccountId, email } = user;
    let submission = null;
    let status = null;
    let errorMessage = '';
    const currentDate = new Date();

    //check number of attempts remaining for the assignment
    const assignment = await getById(id);
    
    //check existing submissions
    const submissions = await getSubmissionsById({
        assignment_id: id,
        account_id: AccountId,
    });

    //check if the number of submissions is less than the number of attempts allowed and check the deadline as well
    if(submissions.length < assignment.num_of_attempts && currentDate < assignment.deadline) {
        submission = await Submission.create({
            assignment_id: id,
            account_id: AccountId,
            submission_url,
        });

        //remove assignment_id from the response
        delete submission.dataValues.account_id;

        //publish to SNS
        await publishToSns({
            assignment_id: id,
            submission_url,
            account_id: AccountId,
            email,
        });

        status = 201;
    } else {
        if(submissions.length >= assignment.num_of_attempts) {
            errorMessage = 'Maximum number of attempts reached';
        } else if(currentDate > assignment.deadline) {
            errorMessage = 'Assignment deadline has passed';
        } 

        //rejection status code
        status = 400;
    }

    return {
        submission,
        status,
        errorMessage,
    };
}