import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import mealRoutes from "./routes/meals.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/meals", mealRoutes);

// Fallback: serve index.html for any other route (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});