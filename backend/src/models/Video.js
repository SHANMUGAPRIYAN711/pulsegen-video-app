import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  userId: String,
  tenantId: String,
  filePath: String,
  status: { type: String, default: "processing" },
  safety: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Video", videoSchema);
