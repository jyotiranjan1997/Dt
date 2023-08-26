require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ContactRoute } = require("./src/Routes/ContactRoutes");
const { connect } = require("./src/Config/db");
const { UserRoute } = require("./src/Routes/UserRoute");
const { DoctorRoute } = require("./src/Routes/DoctorRoutes");
const { DepartmentRoute } = require("./src/Routes/DepartmentRoute");
const { AppointmentRoute } = require("./src/Routes/AppointmentRoute");
const { MemberRoute } = require("./src/Routes/MemberRoute");
const { OfferRoute } = require("./src/Routes/OfferRoute");

const PORT = process.env.PORT || 5000;

const app = express();
/* BASIC */
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json({ Result: "Welcome to Backend" });
});
app.use("/user", UserRoute);
app.use("/contact", ContactRoute);
app.use("/doctor", DoctorRoute);
app.use("/department", DepartmentRoute);
app.use("/appointment", AppointmentRoute);
app.use("/member", MemberRoute);
app.use("/offer", OfferRoute);

app.listen(PORT, async (req, res) => {
  await connect();
  console.log("Listening at " + PORT);
});
