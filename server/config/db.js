const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Validate URI exists before connecting
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    console.log("⏳ Connecting to MongoDB Atlas...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options help with Atlas connections
      serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds
      socketTimeoutMS: 45000,          // Close sockets after 45 seconds
      family: 4,                       // Use IPv4, skip IPv6 (fixes some issues)
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB Disconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Error:", err.message);
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB Reconnected");
    });

  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    
    // Helpful error messages based on error type
    if (error.message.includes("ENOTFOUND")) {
      console.error("🔍 Check: Is your cluster URL correct in .env?");
    } else if (error.message.includes("Authentication failed")) {
      console.error("🔍 Check: Is your username/password correct in MONGO_URI?");
    } else if (error.message.includes("IP")) {
      console.error("🔍 Check: Is your IP whitelisted in MongoDB Atlas Network Access?");
    } else if (error.message.includes("MONGO_URI is not defined")) {
      console.error("🔍 Check: Does your .env file exist and have MONGO_URI?");
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;