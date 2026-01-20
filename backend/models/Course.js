import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  duration: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  level: String,
  lessons: [lessonSchema]   // 👈 ADD THIS
});

export default mongoose.model("Course", courseSchema);
