const { authenticateUser } = require('../logic');

const authenticateUserHandler = (req, res) => {
  try {
    const { email, password } = req.body;

    authenticateUser(email, password)
      .then((userId) => res.json(userId))
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = authenticateUserHandler;
