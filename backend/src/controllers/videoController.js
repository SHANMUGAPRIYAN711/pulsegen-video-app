import Video from "../models/Video.js";
import { io } from "../server.js";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import sensitivityAI from "../services/sensitivityAI.js";

export const uploadVideo = async (req, res) => {
  const video = await Video.create({
    title: req.body.title,
    userId: req.user.id,
    tenantId: req.user.tenantId,
    filePath: req.file.path
  });

  processVideo(video);

  res.json({ message: "Upload successful", video });
};

const processVideo = async (video) => {
  io.emit("processing", { id: video._id, progress: 10 });

  ffmpeg(video.filePath)
    .output(video.filePath)
    .on("end", async () => {
      const result = await sensitivityAI(video.filePath);

      video.status = "completed";
      video.safety = result;
      await video.save();

      io.emit("completed", video);
    })
    .run();
};

export const streamVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  const range = req.headers.range;
  const videoPath = video.filePath;
  const videoSize = fs.statSync(videoPath).size;

  const chunk = 10 ** 6;
  const start = Number(range?.replace(/\D/g, "")) || 0;
  const end = Math.min(start + chunk, videoSize - 1);

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4",
  });

  fs.createReadStream(videoPath, { start, end }).pipe(res);
};
