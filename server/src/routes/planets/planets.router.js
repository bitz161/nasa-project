const { getAllPlanets, gettingAPIValue } = require("./planets.controller");
const express = require("express");

const planetsRouter = express.Router();

planetsRouter.get("/planets", getAllPlanets);

planetsRouter.get("/getAllPlanets", gettingAPIValue);

module.exports = planetsRouter;
