const express = require("express");
const glob = require("glob");
const path = require("path");
const { connectDB } = require("../server/config/config.js");
require("dotenv").config();
const app = express();
app.use(express.json());

connectDB();
mountRoutes();

function mountRoutes() {
  const files = glob.sync("server/apis/**/*.route.js");
  files.forEach((routeFilename) => {
    const routes = require(`./${routeFilename}`);
    const routeName = path.basename(routeFilename, ".route.js");
    const url = `/${routeName}`;
    app.use(url, routes);
  });
}

app.get("/", (req, res, next) => {
  res.send("Hello, world!");
});
app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`);
});
