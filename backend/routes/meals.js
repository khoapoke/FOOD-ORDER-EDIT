import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Fix relative path issue
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", async (req, res) => {
    try {
        const meals = await fs.readFile(path.join(__dirname, "../data/available-meals.json"), "utf8");
        res.json(JSON.parse(meals));
    } catch (error) {
        console.error("Error reading meals file:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
