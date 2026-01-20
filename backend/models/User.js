import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  enrolledCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId, // ✅ FIX
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
