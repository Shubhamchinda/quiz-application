import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
// import mongo from "connect-mongo";
import mongoose from "mongoose";


import {MONGODB_URI} from "./config/_utils";


import api from "./api/routes";

const rejectFolders: string[] = [];
const dotenv = require('dotenv').config()

const app = express();

console.log(process.env.MONGO_URI)
mongoose
    .connect(
      // process.env.MONGO_URI || 
      MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
      console.log("MongoDB connected!")
    })
    .catch((err : any) => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        // process.exit();
    });

app.use(compression());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    skip: (req: any) => rejectFolders.indexOf(req.url.split("/")[1]) !== -1
  })
);

app.use(cors());
app.use(express.json()); //middleware

app.get("/", (req, res) => {
  res.send("Hello");
});
mongoose.set("debug", true);

app.use("/api", api);

export default app;


