const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // console.log('MONGODBURI:', process.env.MONGODBURI); // Log the URI
    await mongoose.connect(process.env.MONGODBURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
