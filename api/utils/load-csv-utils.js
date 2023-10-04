import fs from 'fs';
import { parse } from 'csv-parse';
import { hashPassword } from './bcrypt-utils.js';
import { Account } from '../sequelize.js';

export const loadCSVtoDB = async (file) => {

    return new Promise ((resolve, reject) => {
        const accounts = [];
        const readStream = fs.createReadStream(file);
    
        readStream.on('error', (err) => {
            //no such file or directory
            reject(err);
        })
            
        readStream
            .pipe(parse({ delimiter: ',', from_line: 2 }))
            .on('data', row => {
                const [first_name, last_name, email, password] = row;
                    
                accounts.push({
                    first_name,
                    last_name,
                    email,
                    password,
                });
            })
            .on('end', async () => {
                try {
                    //hash the passwords
                    for (const account of accounts) {
                        account.password = await hashPassword(account.password);
                    }
    
                    //bulk create the accounts
                    await Account.bulkCreate(accounts, {
                        ignoreDuplicates: true,
                    });
                    console.log('CSV file successfully seeded to DB');
                    
                    //close the read stream
                    readStream.close();
                    resolve();
                } catch(err) {
                    reject(err);
                }
            })
        })
};