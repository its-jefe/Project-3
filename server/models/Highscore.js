const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserScores = new Schema({
  highscore: {
    type: Number,
    default: 0
  },
  
});

module.exports = UserScores;
