export const AssignmentModel = (sequelize, DataTypes) => {
    const Assigment = sequelize.define('Assignment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            readonly: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        points: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100,
            },
            allowNull: false,
        },
        num_of_attempts: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100,
            },
            allowNull: false,
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        createdAt: 'account_created',
        updatedAt: 'account_updated',
    });

    return Assigment;
}