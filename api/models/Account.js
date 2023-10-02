export const AccountModel = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            readonly: true,
        },
        first_name: {
            type: DataTypes.STRING,
        }, 
        last_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Email address must be valid"
                },
            },
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        createdAt: 'account_created',
        updatedAt: 'account_updated',
    });

    return Account;
}