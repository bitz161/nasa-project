//IMPORTS
const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const habitablePlanets = [];

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
      .on("data", (data) => {
        //pushing data in habitablePlanets array
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        //error handling
        console.log(err);

        reject(err);
      })
      .on("end", () => {
        //inform that code is done running
        console.log(`${habitablePlanets.length} habitable planets found!`);

        //call resolved once the value has been populated and ready to go
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};
