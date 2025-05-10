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
exports.default = router;
