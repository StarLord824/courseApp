import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
// import userAuth from "../middlewares/userAuth";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const client = new PrismaClient();


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 10);
  
  await client.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });
  
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, process.env.saltRounds || 10);

  try {
    const user = await client.user
    .findUnique({
      where: {
        email,
        hashedPassword
        },
      })
      
      if (user) {
        const token = jwt.sign({ userId: user.id }, process.env.userSecret || "secret");
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } 
  catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.use(userAuth);

router.get("/purchases", async (req, res) => {
  const {name, email} =  req.body;
  const user = await client.user.findUnique({
    where: {
        name,
        email
    }
  });
  res.json({ user });

});

export default router;