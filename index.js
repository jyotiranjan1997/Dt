require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ContactRoute } = require("./src/Routes/ContactRoutes");
const PORT = process.env.PORT;
const app = express();
const { connect } = require("./src/Config/db");
const { UserRoute } = require("./src/Routes/UserRoute");

connect();

app.get("/", async (req, res) => {
  res.status(200).json({ Result: "Welcome to Backend" });
});

app.use(cors);
app.use(express.json());

app.use("/contact", ContactRoute);
app.use("/user", UserRoute);

app.listen(PORT, async (req, res) => {
  console.log("Listening at " + PORT);
});
