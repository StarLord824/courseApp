"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
// import adminAuth from "../middlewares/adminAuth";
dotenv_1.default.config();
const router = express_1.default.Router();
const client = new client_1.PrismaClient();
// router.use(adminAuth);
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, process.env.SALT_ROUNDS || 10);
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
    const hashedPassword = await bcrypt_1.default.hash(password, process.env.SALT_ROUNDS || 10);
    try {
        const admin = await client.admin
            .findUnique({
            where: {
                email,
                hashedPassword
            },
        });
        if (admin) {
            const token = jsonwebtoken_1.default.sign({ adminId: admin.id }, "secret");
            res.json({ token });
        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post('course', async (req, res) => {
    const { title, description, price, adminId } = req.body;
    try {
        const courseData = await client.course.create({
            data: {
                title,
                description,
                price,
                // image,
                adminId
            }
        });
        res.json(courseData);
    }
    catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
