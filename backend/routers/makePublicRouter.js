import express from "express";
import { Storage } from "@google-cloud/storage";

const makePublicRouter = express.Router();

makePublicRouter.post("/", (req, res, next) => {
  const file = req.body;

  const storage = new Storage({
    keyFilename: process.env.GCP_SERVICE_ACCOUNT,
  });

  const bucket = process.env.GCP_BUCKET;

  // const bucket = storage.bucket(process.env.GCP_BUCKET);

  async function makePublic() {
    await storage.bucket(bucket).file(file.name).makePublic();
    res.send({ name: file.name });
  }

  makePublic().catch(console.error);
});

export default makePublicRouter;
