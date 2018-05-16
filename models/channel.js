export default (sequelize, DataTypes) => {
  const Channel = sequelize.define("channel", {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  });

  Channel.associate = models => {
    // 1:M
    Channel.belongsTo(models.Team, {
      foreignKey: "team_id"
    });

    // N:M
    Channel.belongsToMany(models.User, {
      through: "channel_member",
      foreignKey: "channel_id"
    });
  };

  return Channel;
};
