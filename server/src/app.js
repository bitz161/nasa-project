//Imports
const planetsRouter = require("./routes/planets/planets.router");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//Middleware chains
app.use(
  cors({
    //for testing purposes: add the localhost of the client for it to access the api without any cors issue
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

//assigning the html template
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(planetsRouter);

//due to issue with the site not directly showing the content of the page due to the routing
//here is how to resolved it
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = {
  app,
};
