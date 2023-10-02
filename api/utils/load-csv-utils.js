import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { fileURLToPath } from 'url';
import { hashPassword } from './bcrypt-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadCSVToDB = async (req, res) => {
    try {
        const csvFilePath = path.join(__dirname, '../../opt/users.csv');
        const readStream = fs.createReadStream(csvFilePath);

        readStream.on('error', (err) => {
            //no such file or directory
            console.log(err);
        })
        
        readStream
            .pipe(parse({ delimiter: ',', from_line: 2 }))
            .on('data', async (row) => {
                //each row is an array of csv columns
                const [first_name, last_name, email, password] = row;
                const hashedPassword = await hashPassword(password);
                
            })
            .on('end', () => {
                readStream.close();
            })
    } catch (error) {
        console.log(error);
    }
};