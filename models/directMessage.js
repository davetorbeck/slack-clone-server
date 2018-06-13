export default (sequelize, DataTypes) => {
  const DirectMessage = sequelize.define('direct_message', {
    text: DataTypes.STRING,
  })

  DirectMessage.associate = (models) => {
    DirectMessage.belongsTo(models.Team, {
      name: 'teamId',
      foreignKey: 'team_id',
    })

    DirectMessage.belongsto(models.User, {
      name: 'receiverId',
      foreignKey: 'receiver_id',
    })

    DirectMessage.belongsTo(models.User, {
      name: 'senderId',
      foreignKey: 'sender_id',
    })
  }

  return DirectMessage
}
