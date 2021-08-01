const express = require("express");
const app = express();

const { json, urlencoded } = express;
const { join } = require("path");

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));


app.use("/api", require("./src/routes/api"));

module.exports = app;