const User = require('../db/schemas/userSchema');

exports.getUser = async (email, next) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (user, next) => {
  try {
    return await User.create(user);
  } catch (err) {
    next(err);
  }
};
