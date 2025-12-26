import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import { uploadVideo, streamVideo } from "../controllers/videoController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", protect, upload.single("video"), uploadVideo);
router.get("/stream/:id", streamVideo);
router.get("/", protect, async (req, res) => {
  const videos = await (await import("../models/Video.js")).default.find();
  res.json(videos);
});

export default router;
