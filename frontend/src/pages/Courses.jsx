import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/courses")
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load courses.");
        setLoading(false);
      });
  }, []);

  // Only one conditional rendering block needed
  if (loading) return <p className="p-6 text-center">Loading courses...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;
  if (courses.length === 0) return <p className="p-6 text-center">No courses available.</p>;

  return (
    <div className='p-6 grid md:grid-cols-3 gap-6'>
      {courses.map(c => (
        <div
          key={c._id}
          onClick={() => navigate(`/courses/${c._id}`)}
          className='bg-white p-5 rounded-2xl shadow cursor-pointer hover:scale-105 transition transform duration-200'
        >
          <h2 className='font-bold text-lg mb-2'>{c.title}</h2>
          <p className='text-gray-600'>{c.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Courses;
