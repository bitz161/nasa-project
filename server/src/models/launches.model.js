const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

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
  //create a referencing if planet is actually listed in planets
  const planet = await planets.findOne({ keplerName: launch.target });
  if (planet) {
    await launchesDatabase.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      { upsert: true }
    );
  } else {
    //throw error if no planet was found in the list of planets
    throw new Error("No matching planet found");
  }
}

//adding function
function addNewLaunch(launch) {
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
