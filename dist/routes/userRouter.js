"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import userAuth from "../middlewares/userAuth";
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const client = new client_1.PrismaClient();
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, process.env.SALT_ROUNDS || 10);
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
    const hashedPassword = await bcrypt_1.default.hash(password, process.env.saltRounds || 10);
    try {
        const user = await client.user
            .findUnique({
            where: {
                email,
                hashedPassword
            },
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.userSecret || "secret");
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
// router.use(userAuth);
router.get("/purchases", async (req, res) => {
    const { name, email } = req.body;
    const user = await client.user.findUnique({
        where: {
            name,
            email
        }
    });
    res.json({ user });
});
exports.default = router;
