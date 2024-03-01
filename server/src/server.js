const { app } = require("./app");

//Make port configurable, it will run on the available port
//But if unable to find available port then it will run in the default which is 8000
const PORT = process.env.PORT || 8100;

//build in to node
const http = require("http");

//create Server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
