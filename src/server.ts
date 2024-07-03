import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import routes from "./services/powersMeter";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/monitoring/powersmeter", routes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
