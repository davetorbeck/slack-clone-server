export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
    });

    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: 'member',
            foreignKey: 'team_id',
        });

        Team.belongsTo(models.User, {
            foreignKey: 'owner_id', // <-- might need to change back to 'owner'
        });
    };

    return Team;
};
