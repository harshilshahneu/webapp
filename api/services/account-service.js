import { Account } from "../sequelize.js";
import { validatePassword } from "../utils/bcrypt-utils.js";

//get and validate account by email and password
export const getByLogin = async ({email, password}) => {
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
}