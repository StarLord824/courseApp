"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const client = new client_1.PrismaClient();
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    await client.admin.create({
        data: {
            name,
            email,
            password,
        },
    });
    res.json({ message: "Admin registered successfully" });
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    await client.admin
        .findUnique({
        where: {
            email,
            password
        },
    })
        .then((admin) => {
        if (admin) {
            const token = jsonwebtoken_1.default.sign({ adminId: admin.id }, "secret");
            res.json({ token });
        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    });
});
exports.default = router;
