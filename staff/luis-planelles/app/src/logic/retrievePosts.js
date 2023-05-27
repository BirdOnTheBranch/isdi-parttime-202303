import { loadPosts } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateCallback, validateId } from './helpers/validators.js';

const retrievePosts = (userId, callback) => {
  validateId(userId, 'user id');
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error(`user with id ${userId} not found`));

      return;
    }

    loadPosts((posts) => {
      posts.forEach((post) => {
        post.author = {
          id: foundUser.id,
          name: foundUser.info.name,
          avatar: foundUser.info.avatar,
        };
      });

      callback(null, posts.toReversed());
    });
  });
};

export default retrievePosts;
