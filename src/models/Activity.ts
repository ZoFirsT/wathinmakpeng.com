import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "กรุณากรอกชื่อกิจกรรม"],
  },
  description: {
    type: String,
    required: [true, "กรุณากรอกรายละเอียด"],
  },
  date: {
    type: Date,
    required: [true, "กรุณาเลือกวันที่"],
  },
  time: {
    type: String,
    required: [true, "กรุณาระบุเวลา"],
  },
  location: {
    type: String,
    required: [true, "กรุณาระบุสถานที่"],
  },
  imageUrl: {
    type: String,
    required: [true, "กรุณาใส่รูปภาพ"],
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
