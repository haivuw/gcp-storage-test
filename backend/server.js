import express from "express";
import imageRouter from "./routers/uploadRouter.js";
//import Multer from "multer";
//import { Storage } from "@google-cloud/storage";

function Server(props) {
  // Variables
  const app = express();

  // gsc storage object using credentials
  // const storage = new Storage({
  //   projectID: "detectex",
  //   keyFilename: "../config/keyfile.json",
  // });
  // const bucket = storage.bucket("detectuploads");

  // // Middleware
  // const multer = Multer({
  //   storage: Multer.memoryStorage(),
  //   limits: {
  //     fileSize: 5 * 1024 * 1024,
  //   },
  // });

  // app.disable("x-powered-by");
  // app.use(multer.single("file"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/upload/", imageRouter);

  // Routes
  // app.post("/api/upload", (req, res, next) => {
  //   //, multer.single("file"),
  //   if (!req.file) {
  //     res.status(400).send("No file uploaded.");
  //     return;
  //   }

  //   // Create a new blob in the bucket and upload the file data.
  //   const blob = bucket.file(req.file.originalname);
  //   const blobStream = blob.createWriteStream({
  //     resumable: false,
  //   });

  //   blobStream.on("error", (err) => {
  //     next(err);
  //   });

  //   blobStream.on("finish", () => {
  //     // The public URL can be used to directly access the file via HTTP.
  //     const publicUrl = format(
  //       `https://storage.googleapis.com/${bucket.name}/${blob.name}`
  //     );
  //     res.status(200).send(publicUrl);
  //   });

  //   blobStream.end(req.file.buffer);
  // });

  app.get("/", (req, res) => {
    res.send("Server is Ready!");
  });

  app.listen(5000, () => {
    console.log(`App listening at http://localhost:5000`);
    console.log("Press Ctrl+C to quit.");
  });
}

const server = new Server();

export default server;
