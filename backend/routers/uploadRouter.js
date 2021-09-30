import Multer from "multer";
import express from "express";
import { Storage } from "@google-cloud/storage";

const uploadRouter = express.Router();

const storage = new Storage({
  projectID: "detectex",
  keyFilename: "../config/keyfile.json",
});
const bucket = storage.bucket("detectuploads");

// Middleware
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

uploadRouter.post("/", (req, res, next) => {
  //, multer.single("file"),
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

export default uploadRouter;
