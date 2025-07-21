const mongoose = require("mongoose");

const connectDatabase = async (uri) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
