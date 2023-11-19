const mongoose = require("mongoose");

const pollschema = mongoose.Schema({
  username: {
    type: String,
  },
  password: String,
  email: String,
  registrationDate: {
    type: Date,
    format: "mm/dd/yyyy",
  },
});
const User = mongoose.model("User", pollschema);

module.exports = User;
