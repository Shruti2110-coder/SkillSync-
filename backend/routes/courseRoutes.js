import express from "express";
import {
  getCourses,
    addCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  addLessonToCourse
} from "../controllers/courseController.js";


import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router(); 

// PUBLIC ROUTES
router.get("/", getCourses);
router.get("/:id", getCourseById);   // ✅ NOW SAFE

// ADMIN ROUTES
router.post("/", protect, adminOnly, addCourse);
router.put("/:id", protect, adminOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

// ADD LESSON (ADMIN)
router.post(
  "/:id/lessons",
  protect,
  adminOnly,
  addLessonToCourse
);

export default router;
