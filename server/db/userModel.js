const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    unique: false,
  },

  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    unique: false,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "Email exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    unique: false,
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
