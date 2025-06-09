import express from "express";
import fs from "fs/promises";
import authMiddleware from "../middleware/authMiddleware.js";
import { v4 as generateId } from "uuid";

const router = express.Router();
const ordersFile = "./data/orders.json";

router.post("/orders", authMiddleware, async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Missing order data" });
  }

  const newOrder = { ...orderData, id: generateId(), userId: req.user.id };

  const orders = JSON.parse(await fs.readFile(ordersFile, "utf8")) || [];
  orders.push(newOrder);
  await fs.writeFile(ordersFile, JSON.stringify(orders));

  res.status(201).json({ message: "Order placed successfully!" });
});

export default router;
