import formatErrors from '../formatErrors'
import requiresAuth from '../permissions'

export default {
  Mutation: {
    createChannel: requiresAuth.createResolver(async (parent, args, { models }) => {
      try {
        const team = await models.Team.findOne({ where: { id: args.teamId } }, { raw: true })

        if (team.onwer !== user.id) {
          return {
            ok: false,
            errors: [
              {
                path: 'name',
                message: 'You have to be the owner of the team to create channels',
              },
            ],
          }
        }

        const channel = await models.Channel.create(args)
        return {
          ok: true,
          channel,
        }
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models),
        }
      }
    }),
  },
}
