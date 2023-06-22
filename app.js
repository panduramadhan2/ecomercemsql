const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./models/bundle.model");

app.use(bodyParser.json());

db.sequelize.sync({ force: false });
const productRouter = require("./routes/produk");

app.use("/produk", productRouter);

module.exports = app;
