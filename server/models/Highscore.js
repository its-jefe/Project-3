const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserScores = new Schema({
  highscore: {
    type: Number,
  },
});

module.exports = UserScores;
