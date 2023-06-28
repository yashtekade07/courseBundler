import  express from "express";
import {config} from "dotenv"
import course from "./routes/courseRoutes.js"
import user from "./routes/userRoutes.js"
import payment from "./routes/paymentRoutes.js"
import ErrorMiddleware from "./middlewares/Error.js"
import cookieParser from "cookie-parser";
import other from "./routes/otherRoutes.js"
import dotenv from 'dotenv'
import cors from "cors"

dotenv.config({
    path:"./config/config.env",
})
const app=express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true,  // otherwise we cannot access req.body;
}))


app.use(cookieParser());
app.use(
    cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
}));

app.use("/api/v1",course);
app.use("/api/v1",user);
app.use("/api/v1",payment);
app.use("/api/v1",other);

export default app;
app.get("/",(req,res)=>res.send(`<h1>Server is working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend</h1>`))
app.use(ErrorMiddleware);