//Imports
const { app } = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const http = require("http");

//Make port configurable, it will run on the available port
//But if unable to find available port then it will run in the default which is 8000
const PORT = process.env.PORT || 8100;

//create Server
const server = http.createServer(app);

//load the datas before proceeding due to data that might take time
async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}

startServer();
