import { Account } from "../sequelize.js";
import { validatePassword } from "../utils/bcrypt-utils.js";

//get all the accounts
//@TODO clean th catch block
export const getByLogin = async ({email, password}) => {
    try {
        let AccountId = null;
        const account = await Account.findOne({
            where: {
                email,
            },
        });

        if(account && (await validatePassword(password, account.password))) {
            AccountId = account.id;
        }
       
        return AccountId;
    } catch (err) {
        return "";
    }
}