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
const { MemberPayOutRoute } = require("./src/Routes/MemberPayOutRoute");
const { PromoCode } = require("./src/Routes/PromoCode");

const PORT = process.env.PORT || 5000;

const app = express();
/* BASIC */
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json({ Result: "Welcome to Backend" });
});
app.use("/api/user", UserRoute);
app.use("/api/contact", ContactRoute);
app.use("/api/doctor", DoctorRoute);
app.use("/api/department", DepartmentRoute);
app.use("/api/appointment", AppointmentRoute);
app.use("/api/member", MemberRoute);
app.use("/api/offer", OfferRoute);
app.use("/api/payout", MemberPayOutRoute);
app.use("/api/promocode", PromoCode);
app.listen(PORT, async (req, res) => {
  await connect();
  console.log("Listening at " + PORT);
});
