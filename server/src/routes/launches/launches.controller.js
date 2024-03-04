const { launches } = require("../../models/launches.model");

function getAllLaunches(req, res) {
  //to get the values of model under a map
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  getAllLaunches,
};
