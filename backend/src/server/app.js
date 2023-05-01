const express = require("express");
const app = express();
const cors = require("cors");
const rentalRouter = require("../api/routes/rental");
const userRouter = require("../api/routes/user");
const carRouter = require("../api/routes/car");

// Add middleware for handling CORS
app.use(cors());

// Add middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add routes for rental, user, car, pickup, and return
app.get("/", (req, res) => {
  res.json("Server is up!");
});
app.use("/api/rental", rentalRouter);
app.use("/api/user", userRouter);
app.use("/api/car", carRouter);
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

// Add middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
