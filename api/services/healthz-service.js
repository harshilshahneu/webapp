import Sequelize from 'sequelize';
import dotenv from "dotenv";

// Load the environment variables
// dotenv.config();

// Initialize the database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

export const getConnection = async () => {
  try {
    await sequelize.authenticate();
    return {
        status: 200,
    }
  } catch ({parent}) {
    
    return {
      status: parent.errno,
    };
  }
};
