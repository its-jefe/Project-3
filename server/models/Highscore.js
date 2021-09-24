const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScores = new Schema({
  highscore: {
    type: Number,
  },
});

module.exports = userScores;
