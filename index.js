import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/userDatabase.js";
import route from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

const app = express();
// middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json()); // it is convert  into json
dotenv.config();
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connected failed !!", error);
  });

app.use("/api", route);
