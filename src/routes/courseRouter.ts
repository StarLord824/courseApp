import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const client = new PrismaClient();

router.get("/all", async (req, res) => {
  await client.course.findMany().then((courses) => {
    res.json(courses);
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await client.course.findUnique({ where: { id: Number(id) } }).then((course) => {
    res.json(course);
  }); 
});

export default router;