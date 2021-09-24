const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/p3-snake', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true, DO WE NEED THIS??
  useFindAndModify: false
});

module.exports = mongoose.connection;