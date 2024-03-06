//Imports
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();

//Middleware chains
app.use(
  cors({
    //for testing purposes: add the localhost of the client for it to access the api without any cors issue
    origin: "http://localhost:3000",
  })
);

//logger middleware
app.use(morgan("combined"));

app.use(express.json());

//assigning the html template
app.use(express.static(path.join(__dirname, "..", "public")));

//simplify to avoid repetitive in routers
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = {
  app,
};
