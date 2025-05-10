import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter";

const app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the 100xDeveloper API!");
});


//frontend route

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});