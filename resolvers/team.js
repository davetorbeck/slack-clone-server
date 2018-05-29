import formatErrors from '../formatErrors';

export default {
  Mutation: {
    createTeam: async (parent, args, { models }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
  },
};
