const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { User, Mission } = require('../data/models');

/**
 * Retrieve missions associated with a user from the database.
 * @param {string} userId - The user's unique identifier.
 * @throws {TypeError} - If userId is of the wrong type.
 * @throws {ContentError} - If userId contains invalid characters.
 * @throws {ExistenceError} - If the user with the provided userId doesn't exist.
 * @returns {Promise<Array<Object>>} - An array of mission objects.
 */

const retrieveMissions = (userId) => {
  validateId(userId, 'user id');

  return (async () => {
    const foundUser = await User.findById(userId);
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exist`);

    const foundMissions = await Mission.find().lean();

    foundMissions.forEach((mission) => {
      mission.id = mission._id.toString();
      delete mission._id;
      delete mission.__v;
    });

    return foundMissions;
  })();
};

module.exports = retrieveMissions;