import { tryLogin } from '../auth'
import formatErrors from '../formatErrors'
import requiresAuth from '../permissions'

export default {
  User: {
    teams: (parent, args, { models, user }) =>
      models.sequelize.query(
        `
          SELECT * 
            FROM teams 
            AS team 
            JOIN members 
            AS member 
            ON team.id = member.team_id 
            WHERE member.user_id = ?
        `,
        {
          replacements: [user.id],
          model: models.Team,
          raw: true,
        }
      ),
  },
  Query: {
    getUser: (parent, { userId }, { models }) => models.User.findOne({ where: { id: userId } }),
    me: requiresAuth.createResolver((parent, { id }, { models, user }) =>
      models.User.findOne({ where: { id: user.id } })
    ),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args)

        return {
          ok: true,
          user,
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        }
      }
    },
  },
}
