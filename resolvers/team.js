import formatErrors from '../formatErrors'
import requiresAuth from '../permissions'

export default {
  Query: {
    allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      models.Team.findAll({ owner: user.id }, { raw: true })
    }),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver(async (parent, args, { models }) => {
      try {
        await models.Team.create({ ...args, owner: user.id })

        return {
          ok: true,
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err),
        }
      }
    }),
  },
}
