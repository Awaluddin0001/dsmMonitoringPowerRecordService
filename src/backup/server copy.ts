import express from "express";
import cors from "cors";
import connectDB from "../config/mongoDb";
import powerMeter from "../routes/powersMeter";
import manual from "../routes/input";
import https from "https";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, "../selfsigned.key")),
  cert: fs.readFileSync(path.resolve(__dirname, "../selfsigned.crt")),
};

const hostname = "0.0.0.0"; // Specify the host you want

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"], // Mengizinkan header yang spesifik
  })
);
app.use(express.json());

app.use("/api/v1/monitoring/powersmeter", powerMeter);
app.use("/api/v1/monitoring/manual/add/", manual);

const startServer = async () => {
  try {
    await connectDB();

    // Create HTTPS server
    https.createServer(sslOptions, app).listen(Number(port), hostname, () => {
      console.log(`HTTPS Server running on https://0.0.0.0:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

startServer();
