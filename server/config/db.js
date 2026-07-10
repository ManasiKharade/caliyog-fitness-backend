const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    console.log("⏳ Connecting to MongoDB Atlas...");

    // ⭐ INCREASED TIMEOUTS - The fix!
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,  // 30 seconds (was 5000)
      socketTimeoutMS: 60000,            // 60 seconds
      connectTimeoutMS: 30000,           // 30 seconds
      family: 4,
      maxPoolSize: 10,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);

  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;