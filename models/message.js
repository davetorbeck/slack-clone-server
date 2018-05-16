export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Channel, {
      foreignKey: 'channel_id',
    });

    Message.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return Message;
};
