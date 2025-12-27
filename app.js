const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const requestLogger = require("./middlewares/requestLogger");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(
  "/api/v1/payments/webhook",
  require("express").raw({ type: "application/json" })
);

app.use("/api/v1", routes);

app.use(errorHandler);

module.exports = app;
