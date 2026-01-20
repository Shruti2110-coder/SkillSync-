import { useState } from "react";
import  api  from "../services/api";

export default function AdminCourses() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: 0
  });

  const addCourse = async () => {
    await api.post("/courses", course, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    alert("Course Added");
  };

  return (
    <div className="p-6">
      <input placeholder="Title" onChange={e => setCourse({ ...course, title: e.target.value })} />
      <button onClick={addCourse}>Add Course</button>
    </div>
  );
}
