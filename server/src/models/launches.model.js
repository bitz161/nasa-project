const launchesDatabase = require("./launches.mongo");

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Explorartion X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);
//old function calling
// launches.set(launch.flightNumber, launch);

//getting the data inside the database
async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  try {
    await launchesDatabase.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      { upsert: true }
    );
  } catch (error) {}
}

//adding function
function addNewLaunch(launch) {
  //due to continues running of the system in the future,
  //we can put the latest flight number to 100 immediately so
  //everytime someone post a data it will keep adding up
  latestFlightNumber++;

  //object assigning to a specific object only
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["Zero to Mastery", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
}

//checking if there is an id on the launches
function existsLaunchWithID(launchId) {
  return launches.has(launchId);
}

//Updating request
function abortlaunchById(launchID) {
  const aborted = launches.get(launchID);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithID,
  abortlaunchById,
};
