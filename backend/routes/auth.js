import express from "express";
import fs from "fs/promises";
import bcrypt from "bcrypt"; 
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const router = express.Router();
const USERS_FILE = "./data/users.json"; 

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, "utf8");
      users = JSON.parse(data);
    } catch (err) {
      if (err.code !== "ENOENT") {
        console.error("Error reading users file:", err);
        return res.status(500).json({ message: "Server Error" });
      }
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      let users = [];
      try {
        const data = await fs.readFile(USERS_FILE, "utf8");
        users = JSON.parse(data);
      } catch (err) {
        return res.status(500).json({ message: "Server Error" });
      }
  
      const user = users.find((u) => u.email === email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
export default router;
