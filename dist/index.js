"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/user', userRouter_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the 100xDeveloper API!");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
