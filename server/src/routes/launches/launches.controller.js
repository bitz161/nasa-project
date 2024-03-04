const { getAllLaunches } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  //to get the values of model under a map
  return res.status(200).json(getAllLaunches());
}

module.exports = {
  httpGetAllLaunches,
};
