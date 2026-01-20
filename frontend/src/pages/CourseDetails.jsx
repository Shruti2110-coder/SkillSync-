import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch course + user progress
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // 1️⃣ Get course details
        const courseRes = await api.get(`/courses/${id}`);
        const courseData = courseRes.data;

        let lessonsWithStatus = courseData.lessons.map(lesson => ({
          ...lesson,
          completed: false,
        }));

        // 2️⃣ If user is logged in, get their progress
        if (token) {
          const userRes = await api.get("/users/progress", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const enrolledCourse = userRes.data.user.enrolledCourses.find(
            (c) => c.course._id === id
          );

          if (enrolledCourse) {
            lessonsWithStatus = courseData.lessons.map((lesson) => ({
              ...lesson,
              completed: enrolledCourse.completedLessons.includes(lesson._id),
            }));
          }
        }

        setCourse({ ...courseData, lessons: lessonsWithStatus });
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token]);

  // Enroll in course
  const handleEnroll = async () => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      await api.post(
        `/users/enroll/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Enrolled successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Mark lesson as completed
  const handleMarkCompleted = async (lessonId) => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      await api.post(
        `/users/lesson-complete/${id}/${lessonId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.map((lesson) =>
          lesson._id === lessonId ? { ...lesson, completed: true } : lesson
        ),
      }));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!course) return <p className="p-6">Course not found</p>;

  return (
    <div className="bg-[#F8F9FC] min-h-screen">
   
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>

          <h3 className="font-bold mb-3">Lessons</h3>
          {course.lessons.map((lesson) => (
            <div
              key={lesson._id}
              className={`border p-3 rounded mb-2 flex justify-between items-center ${
                lesson.completed ? "bg-green-50" : ""
              }`}
            >
              <span>
                ▶ {lesson.title} ({lesson.duration}){" "}
                {lesson.completed && (
                  <span className="text-green-600 font-bold">✓ Completed</span>
                )}
              </span>

              {!lesson.completed && (
                <button
                  onClick={() => handleMarkCompleted(lesson._id)}
                  className="text-sm text-green-600"
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))}

          <button
            onClick={handleEnroll}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Enroll Course
          </button>
        </div>
      </div>
    </div>
  );
}
