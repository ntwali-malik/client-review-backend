const mongoose = require('mongoose')

let cachedConnection = null;

const connectDB = async() => 
    {
        if (cachedConnection) {
            return cachedConnection;
        }

        try
        {
            const connection = await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 5000,
                maxPoolSize: 10
            });
            
            cachedConnection = connection;
            console.log("MongoDB Connected Successfully")
            return connection;
        }
        catch(err)
        {
            console.log("MongoDB connection Failed:",err)
            throw err;
        }
    }

module.exports = connectDB;