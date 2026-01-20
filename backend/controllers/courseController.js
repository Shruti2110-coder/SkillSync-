import Course from "../models/Course.js";

// GET ALL
export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

// GET ONE
export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
};

// ADD
export const addCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
};

// UPDATE
export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(course);
};

// DELETE
export const deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
};

// ADD LESSON
export const addLessonToCourse = async (req, res) => {
  const { title, videoUrl, duration } = req.body;

  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  course.lessons.push({ title, videoUrl, duration });
  await course.save();

  res.json(course);
};
