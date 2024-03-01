const { planets } = require("../../models/planets.model");

function getAllPlanets(req, res) {
  return res.status(200).json(planets);
}

function gettingAPIValue(req, res) {
  res.json(planets);
}

module.exports = {
  getAllPlanets,
  gettingAPIValue,
};
