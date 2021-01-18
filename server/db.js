const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

// async connect to mongo atlas database
const connectDB = async () => {
    try {

    await mongoose.connect(db, {
         useNewUrlParser: true,
         useUnifiedTopology: true
     });
     
     // log successful connection to console
     console.log('MongoDB connection successful...');

    } catch(err) {
     // log error message to console
     console.error(err.message);

    }
   
};

//export module
module.exports = connectDB;