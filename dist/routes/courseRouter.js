"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const client = new client_1.PrismaClient();
router.get("/all", async (req, res) => {
    const courses = await client.course.findMany();
    res.json(courses);
});
router.get("/:title", async (req, res) => {
    const { title } = req.params;
    const { id } = req.body;
    const course = await client.course.findUnique({
        where: {
            id: id,
            title: title
        }
    });
    res.json(course);
});
exports.default = router;
