import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
// import adminAuth from "../middlewares/adminAuth";

dotenv.config();
const router = express.Router();
const client = new PrismaClient();

// router.use(adminAuth);

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 10);

  await client.admin.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  res.json({ message: "Admin registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 10);

  try{
    const admin = await client.admin
      .findUnique({
        where: {
          email,
          hashedPassword
        },
      })
      if (admin) {
        const token = jwt.sign({ adminId: admin.id }, "secret");
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}); 

router.post('course', async (req, res) => {
    const { title, description, price, adminId } = req.body;
    try{
      const courseData= await client.course.create({
        data: {
            title,
            description,
            price,
            // image,
            adminId
        }
      });
      res.json(courseData);
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;