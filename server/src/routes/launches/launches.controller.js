const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithID,
  abortlaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  //to get the values of model under a map
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  //req.body is the content of the request
  const launch = req.body;

  //data validation
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  //convert the string date to New Date
  launch.launchDate = new Date(launch.launchDate);

  //data validation of date
  //isnan will check if the date is a number or not
  if (isNaN(launch.launchDate.valueOf())) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  //access the function within controller
  addNewLaunch(launch);

  //return or show the user what was added
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  //based on parameter "/:id"
  const launchId = Number(req.params.id);

  //check if the id exist
  if (!existsLaunchWithID(launchId)) {
    return res.status(400).json({
      error: "Launch not found",
    });
  }

  const aborted = abortlaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
