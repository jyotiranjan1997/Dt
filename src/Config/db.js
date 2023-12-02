const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    console.log("DB Connection Success...");
  } catch (ex) {
    console.log("DB connection Failed...");
  }
};

const Disconnect = async () => {
  const db = await mongoose.connect(process.env.DB_URL);
  db.disconnect();
  console.log("disconnect !");
};

module.exports = { connect, Disconnect };
