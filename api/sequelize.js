import { Sequelize, DataTypes } from 'sequelize';
import dotenv from "dotenv";
import sequelizeNoUpdateAttributes from 'sequelize-noupdate-attributes';
import { AccountModel } from './models/Account.js';
import { AssignmentModel } from './models/Assignment.js';
import { loadCSVtoDB } from './utils/load-csv-utils.js';

// Load the environment variables
dotenv.config();

// Initialize the database connection
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

// Add the noupdate attribute plugin
sequelizeNoUpdateAttributes(sequelize);

// Initialize the models
export const Account = AccountModel(sequelize, DataTypes);
export const Assignment = AssignmentModel(sequelize, DataTypes);

export const syncDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        //sync with force true if environment is development
        await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
        console.log('All models were synchronized successfully.');

        //load the csv file to the database
        await loadCSVtoDB("../../opt/users.csv");
    } catch (error) {
        console.log(error);
    }
}
