const { updatePost } = require('../logic');
const { extractToken } = require('../helpers');

const updatePostHandler = (req, res) => {
  try {
    const token = extractToken(req);

    const payload = jwt.verify(token, process.env.SECRET, { expiresIn: '10s' });

    const { sub: userId } = payload;

    const { postId } = req.params;
    const { image, text } = req.body;

    return updatePost(userId, postId, image, text)
      .then(() => res.status(204).send())
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updatePostHandler;
