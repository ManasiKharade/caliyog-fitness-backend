const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    console.log("⏳ Connecting to MongoDB Atlas...");

    // ⭐ KEY FIX: Increased timeouts + IPv4 + retry logic
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,  // 30 seconds
      socketTimeoutMS: 60000,            // 60 seconds
      connectTimeoutMS: 30000,           // 30 seconds
      family: 4,                         // Force IPv4
      maxPoolSize: 10,
      retryWrites: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);

    // Connection event handlers
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB Disconnected - attempting reconnect...");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Error:", err.message);
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB Reconnected");
    });

  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;