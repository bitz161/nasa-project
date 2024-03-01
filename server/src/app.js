//Imports
const planetsRouter = require("./routes/planets/planets.router");
const express = require("express");
const cors = require("cors");

const app = express();

//Middleware chains
app.use(
  cors({
    //for testing purposes: add the localhost of the client for it to access the api without any cors issue
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(planetsRouter);

module.exports = {
  app,
};
