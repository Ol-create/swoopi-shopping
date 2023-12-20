import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 9090

import userRouter from "./routers/user.js"

const app = express()
app.use(express.json())
app.use("/api/users", userRouter)

app.listen(9000, () => console.log(`App listening on port: ${port}`))