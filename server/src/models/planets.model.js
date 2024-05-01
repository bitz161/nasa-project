//IMPORTS
const planets = require("./planets.mongo");

const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

// const habitablePlanets = [];

//boolean, filter keplars based on study if habitable.
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

//created a async function that will wait for the info before proceeding
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        //parse is the 3rd party npm
        parse({
          comment: "#",
          columns: true,
        })
      )

      .on("data", async (data) => {
        //pushing data in habitablePlanets array
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        //error handling
        console.log(err);

        reject(err);
      })
      .on("end", async () => {
        //inform that code is done running
        //count the planet found
        const countPlanetFound = (await getAllPlanets()).length;
        console.log(`${countPlanetFound} habitable planets found!`);

        //call resolved once the value has been populated and ready to go
        resolve();
      });
  });
}

async function getAllPlanets() {
  return planets.find(
    {},
    {
      _id: 0,
      __v: 0,
      //exclude a part of the response
    }
  );
  //find: https://mongoosejs.com/docs/api/model.html#Model.find()
}

async function savePlanet(planet) {
  try {
    //Add to Mongo, skip if already added, upsert = Update and Insert
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
