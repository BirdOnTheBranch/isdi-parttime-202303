const context = require('./context');
const {
  validators: { validateId },
} = require('com');
const { ObjectId } = require('mongodb');

const retrieveUser = (userId) => {
  validateId(userId, 'user id');

  const { users } = context,
    objectId = new ObjectId(userId);

  return users.findOne({ _id: objectId }).then((foundUser) => {
    if (!foundUser) throw new Error('user not exists');

    delete foundUser.password;
    delete foundUser.favourites;

    return foundUser;
  });
};

module.exports = retrieveUser;
