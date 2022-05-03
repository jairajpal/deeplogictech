"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const responses = require("./common/responses");
const v1Routes = require("./v1/routes/Times");

require("./v1/controllers/index");

app.use(cors());
app.use(responses());
app.set('view-engine', 'ejs')

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/", v1Routes);

// 404, Not Found
app.use((req, res, next) => res.error(404, "NOT_FOUND"));

// Error handling
app.use((error, req, res, next) => {
  console.error(error);
  return res.error(400, error.message || error);
});


// Listening & Initializing
const httpServer = server.listen(process.env.PORT, async () => {
  console.log(`Environment:`, process.env.NODE_ENV);
  console.log(`Running on:`, process.env.PORT);
});
