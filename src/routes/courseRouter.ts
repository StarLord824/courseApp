import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const client = new PrismaClient();

router.get("/all", async (req, res) => {
  const courses = await client.course.findMany()
    res.json(courses);
});

router.get("/:title", async (req, res) => {
  const { title } = req.params;
  const {id} = req.body;
  const course = await client.course.findUnique({
     where: { 
        id: id,
        title: title 
      }
    })
    res.json(course);
}); 

export default router;