import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  duration: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  price: Number,
  level: String,
  category: String,
  instructor: String,
  lessons: [lessonSchema],
});

export default mongoose.model("Course", courseSchema);
