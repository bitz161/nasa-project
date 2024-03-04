const { httpGetAllPlanets } = require("./planets.controller");
const express = require("express");

const planetsRouter = express.Router();

planetsRouter.get("/planets", httpGetAllPlanets);

module.exports = planetsRouter;
