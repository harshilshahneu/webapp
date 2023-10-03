import { Account } from "../sequelize.js";
import { validatePassword } from "../utils/bcrypt-utils.js";

//get all the accounts
export const getByLogin = async ({email, password}) => {
    try {
        const account = await Account.findOne({
            where: {
                email,
            },
        });

        if(!account) {
            return false;
        }
       
        return await validatePassword(password, account.password); 
    } catch (err) {
        return false;
    }
}