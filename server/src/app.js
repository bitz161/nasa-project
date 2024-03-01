//Imports
const planetsRouter = require("./routes/planets/planets.router");
const express = require("express");

const app = express();

app.use(express.json());

app.use(planetsRouter);

module.exports = {
  app,
};
