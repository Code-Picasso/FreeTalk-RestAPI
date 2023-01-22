import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "something went wrong" });
  }
);

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error(" Mongo URI is required");

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    throw new Error("database error");
  }
  app.listen(8080, () => console.log("server is running on port 8080"));
};

start();
