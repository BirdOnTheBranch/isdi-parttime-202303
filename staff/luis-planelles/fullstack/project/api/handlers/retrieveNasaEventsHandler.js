const { retrieveNasaEvents } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
  const { missionId } = req.params;

  return retrieveNasaEvents(missionId).then((events) => res.json(events));
});
