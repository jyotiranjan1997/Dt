const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      dbName: "swag-shop",
    });
    console.log("DB Connection Success...");
  } catch (ex) {
    console.log("DB connection Failed...");
  }
};

module.exports = { connect };
