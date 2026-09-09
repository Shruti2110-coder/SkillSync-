import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  enrolledCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      completedLessons: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export default mongoose.model("User", userSchema);
