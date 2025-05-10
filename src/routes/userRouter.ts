import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import userAuth from "../middlewares/userAuth";

const router = express.Router();
const client = new PrismaClient();

// router.use(userAuth);

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  await client.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  await client.user
    .findUnique({
      where: {
        email,
        password
      },
    })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ userId: user.id }, "secret");
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    });
});

export default router;