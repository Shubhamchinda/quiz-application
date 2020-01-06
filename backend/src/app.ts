import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
// import mongo from "connect-mongo";
import mongoose from "mongoose";


// import {MONGODB_URI, SESSION_SECRET} from "./util/secrets";


import api from "./api/routes";

const rejectFolders: string[] = [];

const app = express();

mongoose
    .connect("mongodb://localhost:27017/quiz-app", {useNewUrlParser: true})
    .then(() => {
      console.log("MongoDB connected!")
    })
    .catch(err => {
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

app.use("/api", api);

export default app;


