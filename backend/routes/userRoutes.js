import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET all users
router.get("/", protect, async (req, res) => {
  const users = await User.find().populate("enrolledCourses.course");
  res.json(users);
});

// ✅ ENROLL COURSE
router.post("/enroll/:courseId", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const user = await User.findById(userId);

    const alreadyEnrolled = user.enrolledCourses.some(
      (c) => c.course.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    user.enrolledCourses.push({ course: courseId });
    await user.save();

    res.json({ message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📊 USER PROGRESS
router.get("/progress", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "enrolledCourses.course"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    let completed = 0;
    let inProgress = 0;

    user.enrolledCourses.forEach((c) => {
      if (!c.course) return; // skip if course deleted

      const totalLessons = c.course.lessons.length;
      const completedLessons = c.completedLessons?.length || 0;

      if (completedLessons === totalLessons && totalLessons > 0) {
        completed++;
      } else {
        inProgress++;
      }
    });

    res.json({
      user, // <--- send user data as well
      completed,
      inProgress,
      total: user.enrolledCourses.length,
    });
  } catch (error) {
    console.error(error); // <-- log the real error
    res.status(500).json({ message: error.message });
  }
});


// MARK LESSON AS COMPLETED
router.post("/lesson-complete/:courseId/:lessonId", protect, async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const user = await User.findById(req.user.id);

    const enrolledCourse = user.enrolledCourses.find(
      (c) => c.course.toString() === courseId
    );

    if (!enrolledCourse) {
      return res.status(400).json({ message: "Not enrolled in this course" });
    }

    // Add lesson to completedLessons if not already added
    if (!enrolledCourse.completedLessons.includes(lessonId)) {
      enrolledCourse.completedLessons.push(lessonId);
    }

    await user.save();
    res.json({ message: "Lesson marked completed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
