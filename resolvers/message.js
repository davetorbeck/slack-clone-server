import requiresAuth from '../permissions'

export default {
  Message: {
    user: ({ userId }, args, { models }) => models.User.findOne({ where: { id: userId } }),
  },
  Query: {
    messages: requiresAuth.createResolver(async (parent, { channelId }, { models, user }) =>
      models.Message.findAll({ order: [['createdAt', 'ASC']], where: { channelId } }, { raw: true })
    ),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Message.create({
          ...args,
          userId: user.id,
        })
      } catch (error) {
        console.log(error)
        return false
      }
    }),
  },
}
