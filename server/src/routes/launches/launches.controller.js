const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  //to get the values of model under a map
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  //req.body is the content of the request
  const launch = req.body;

  //convert the string date to New Date
  launch.launchDate = new Date(launch.launchDate);

  //access the function within controller
  addNewLaunch(launch);

  //return or show the user what was added
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
