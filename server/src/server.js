//Imports
const mongoose = require("mongoose");

const { app } = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const http = require("http");

//Make port configurable, it will run on the available port
//But if unable to find available port then it will run in the default which is 8000
const PORT = process.env.PORT || 8000;

//MongoDB Link connection
const MONGO_URL =
  "mongodb+srv://bitzgarcia1996:zGPdoxHSgpkCOZIA@nasacluster.7i3wbm9.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster";

//create Server
const server = http.createServer(app);

//once - event emitter in node to run it once
mongoose.connection.once("open", () => {
  console.log("mongoDB connection ready");
});
//check if there's any connection issue in mongodb
mongoose.connection.on("error", (err) => {
  console.error(err);
});

//load the datas before proceeding due to data that might take time
async function startServer() {
  //mongoDB Connection before the application starts listening to anything else
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}

startServer();
