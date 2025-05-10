"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const userAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken_1.default.verify(token, "secret", (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Invalid token" });
            }
            else {
                client.user
                    .findUnique({
                    where: {
                        id: decoded.userId,
                    },
                })
                    .then((user) => {
                    if (user) {
                        req.user = user;
                        next();
                    }
                    else {
                        res.status(401).json({ message: "Invalid token" });
                    }
                });
            }
        });
    }
    else {
        res.status(401).json({ message: "No token provided" });
    }
};
exports.default = userAuth;
