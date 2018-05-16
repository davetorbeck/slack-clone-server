export default {
  Mutation: {
    createTeam: async (parent, args, { models }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
