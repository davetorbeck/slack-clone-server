import bcrypt from 'bcrypt';
import _ from 'lodash';
import { tryLogin } from '../auth.js';

const formatErrors = (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    return e.errors.map((x) => _.pick(x, ['path', 'message']));
  }

  return [{ path: 'name', message: 'something went wrong' }];
};

export default {
  Query: {
    getUser: (parent, args, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        if (password.length < 6) {
          return {
            ok: false,
            errors: [{ path: 'password', message: 'Password needs to be at least 6 characters long.' }],
          };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({ ...otherArgs, password: hashedPassword });
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
