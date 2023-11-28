export const SubmissionModel = (sequelize, DataTypes) => {
    const Submission = sequelize.define('Submission', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            readonly: true,
        },
        assignment_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        account_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        submission_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: {
                  protocols: ['http', 'https'],
                  requireProtocol: true,
                },
                endsWithZip(value) {
                    if (!value.endsWith('.zip')) {
                        throw new Error('Submission URL must end with .zip');
                    }
                },
            },
        }
    }, {
        createdAt: 'submission_date',
        updatedAt: 'assignment_updated', //@TODO: change the logic and verify what should be the value here.
    });

    return Submission;
}