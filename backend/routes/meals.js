import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const router = express.Router();

// Fix relative path issue
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../public/images");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// Get all meals
router.get("/", async (req, res) => {
    try {
        const meals = await fs.readFile(path.join(__dirname, "../data/available-meals.json"), "utf8");
        res.json(JSON.parse(meals));
    } catch (error) {
        console.error("Error reading meals file:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Add new meal
router.post("/", upload.single('image'), async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        console.log('Received file:', req.file);

        const { name, price, description } = req.body;
        const image = req.file ? `/images/${req.file.filename}` : null;

        // Validate required fields
        if (!name || !price || !description || !image) {
            console.log('Missing required fields:', { name, price, description, image });
            return res.status(400).json({ 
                message: "All fields are required",
                received: { name, price, description, image }
            });
        }

        // Read current meals
        const mealsData = await fs.readFile(path.join(__dirname, "../data/available-meals.json"), "utf8");
        const meals = JSON.parse(mealsData);

        // Create new meal
        const newMeal = {
            id: Date.now().toString(),
            name,
            price: parseFloat(price),
            description,
            image
        };

        console.log('Creating new meal:', newMeal);

        // Add to meals array
        meals.push(newMeal);

        // Save updated meals
        await fs.writeFile(
            path.join(__dirname, "../data/available-meals.json"),
            JSON.stringify(meals, null, 2)
        );

        res.status(201).json(newMeal);
    } catch (error) {
        console.error("Error adding meal:", error);
        res.status(500).json({ 
            message: "Internal Server Error",
            error: error.message 
        });
    }
});

// Update meal
router.put("/:id", upload.single('image'), async (req, res) => {
    try {
        const mealId = req.params.id;
        const { name, price, description } = req.body;
        const image = req.file ? `/images/${req.file.filename}` : null;

        // Read current meals
        const mealsData = await fs.readFile(path.join(__dirname, "../data/available-meals.json"), "utf8");
        const meals = JSON.parse(mealsData);

        // Find meal to update
        const mealIndex = meals.findIndex(meal => meal.id === mealId);
        if (mealIndex === -1) {
            return res.status(404).json({ message: "Meal not found" });
        }

        // Update meal
        const updatedMeal = {
            ...meals[mealIndex],
            name: name || meals[mealIndex].name,
            price: price ? parseFloat(price) : meals[mealIndex].price,
            description: description || meals[mealIndex].description,
            image: image || meals[mealIndex].image
        };

        // If new image uploaded, delete old image
        if (image && meals[mealIndex].image) {
            const oldImagePath = path.join(__dirname, "..", meals[mealIndex].image);
            try {
                await fs.unlink(oldImagePath);
            } catch (error) {
                console.error("Error deleting old image:", error);
            }
        }

        // Update meals array
        meals[mealIndex] = updatedMeal;

        // Save updated meals
        await fs.writeFile(
            path.join(__dirname, "../data/available-meals.json"),
            JSON.stringify(meals, null, 2)
        );

        res.status(200).json(updatedMeal);
    } catch (error) {
        console.error("Error updating meal:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete meal
router.delete("/:id", async (req, res) => {
    try {
        const mealId = req.params.id;

        // Read current meals
        const mealsData = await fs.readFile(path.join(__dirname, "../data/available-meals.json"), "utf8");
        const meals = JSON.parse(mealsData);

        // Find meal to delete
        const mealIndex = meals.findIndex(meal => meal.id === mealId);
        if (mealIndex === -1) {
            return res.status(404).json({ message: "Meal not found" });
        }

        // Get image path
        const imagePath = meals[mealIndex].image;
        if (imagePath) {
            // Delete image file
            const fullImagePath = path.join(__dirname, "..", imagePath);
            try {
                await fs.unlink(fullImagePath);
            } catch (error) {
                console.error("Error deleting image file:", error);
            }
        }

        // Remove meal from array
        meals.splice(mealIndex, 1);

        // Save updated meals
        await fs.writeFile(
            path.join(__dirname, "../data/available-meals.json"),
            JSON.stringify(meals, null, 2)
        );

        res.status(200).json({ message: "Meal deleted successfully" });
    } catch (error) {
        console.error("Error deleting meal:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
