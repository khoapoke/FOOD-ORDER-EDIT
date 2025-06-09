import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import mealRoutes from "./routes/meals.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/meals", mealRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
