import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";
const app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the 100xDeveloper API!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});