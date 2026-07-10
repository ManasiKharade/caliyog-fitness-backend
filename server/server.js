const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config();
const adminRoutes = require("./routes/adminRoutes");
const batchRoutes = require("./routes/batchRoutes");
const connectDB = require("./config/db");
const aboutRoutes = require("./routes/aboutRoutes");
const whyChooseUsRoutes = require("./routes/whyChooseUsRoutes");
const transformationRoutes = require("./routes/transformationRoutes");

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    const allowedOrigins = [
      "http://localhost:3000",
      
      "http://localhost:3001",
      "http://10.93.11.10:3000",
      "http://192.168.11.10:3001",
      "http://192.168.11.8:3000",
      "http://192.168.11.8:3001",

      // Your live Vercel site
      "https://caliyog-outdoor-fitness.vercel.app",

      // Old Vercel preview URL
      "https://caliyog-outdoor-fitness-669sakid1-devkarsayalis-projects.vercel.app",
    ];

    app.use(
      cors({
        origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            console.log("❌ Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
          }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );

app.options(/.*/, cors());
    app.use(express.json({ limit: "20mb" }));
    app.use(express.urlencoded({ limit: "20mb", extended: true }));

    app.get("/", (req, res) => {
      res.json({
        status: "running",
        message: "CaliYog Fitness Club Backend Running",
        database: "connected",
      });
    });

    app.use("/api/admin", adminRoutes);
    app.use("/api/memberships", require("./routes/membershipRoutes"));
    app.use("/api/events", require("./routes/eventRoutes"));
    app.use("/api/experts", require("./routes/expertRoutes"));
    app.use("/api/contacts", require("./routes/contactRoutes"));
    app.use("/api/join", require("./routes/joinRequestRoutes"));
    app.use("/api/join-request", require("./routes/joinRequestRoutes"));
    app.use("/api/members", require("./routes/memberRoutes"));
    app.use("/api/batches", batchRoutes);
    app.use("/api/batch-members", require("./routes/batchMemberRoutes"));
    app.use("/api/feedbacks", require("./routes/feedbackRoutes"));
    app.use("/api/transformations", transformationRoutes);
    app.use("/api/about", aboutRoutes);
    app.use("/api/why-choose-us", whyChooseUsRoutes);
    app.use((err, req, res, next) => {
      console.error("🔥 Server Error:", err.message);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server Running On Port ${PORT}`);
      console.log(`🌐 Local: http://localhost:${PORT}`);
      console.log(
        `🌐 Railway: https://caliyog-fitness-backend-production-2144.up.railway.app`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();