import express from "express";
import { Storage } from "@google-cloud/storage";

const signRouter = express.Router();

signRouter.post("/", (req, res, next) => {
  const file = req.body;

  const storage = new Storage({
    keyFilename: process.env.GCP_SERVICE_ACCOUNT,
  });

  const bucket = process.env.GCP_BUCKET;

  // const bucket = storage.bucket(process.env.GCP_BUCKET);

  async function generateV4UploadSignedUrl() {
    // These options will allow temporary uploading of the file with outgoing
    // Content-Type: application/octet-stream header.
    const options = {
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: file.type,
    };

    // Get a v4 signed URL for uploading file
    const [signedUrl] = await storage
      .bucket(bucket)
      .file(file.name)
      .getSignedUrl(options);

    res.send({ signedUrl, name: file.name });
  }

  generateV4UploadSignedUrl().catch(console.error);
});

export default signRouter;
