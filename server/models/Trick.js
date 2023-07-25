const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  difficulty: {
    type: String,
    require: true,
  },
  grip: {
    type: String,
    enum: ["tama", "ken", "sara", "candlestick"],
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trick", UserSchema);
