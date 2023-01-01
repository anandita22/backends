const mongoose = require('mongoose');

const DB_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_PROD_URI
    : process.env.DB_DEV_URI;

const connectDB = () => {
  mongoose.connect(
    DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      process.env.NODE_ENV === 'production'
        ? console.log('Production db connected!')
        : console.log('Development db connected!');
    }
  );
};

exports.connectDB = connectDB;
exports.mongoose = mongoose;
