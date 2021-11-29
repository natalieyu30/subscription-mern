import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute";
import subsRoute from "./routes/subsRoute";
import articlesRoute from "./routes/articlesRoute";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("connected to mongodb -> ");
    const app = express();
    app.listen(8080, () => console.log("Listening to port 8080"));

    app.use(express.json());
    app.use(cors());

    app.use("/api/auth", authRoute);
    app.use("/api/subs", subsRoute);
    app.use("/api/articles", articlesRoute);
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  });
