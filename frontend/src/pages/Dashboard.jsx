import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    inProgress: 0
  });

useEffect(() => {
  api.get("/users/progress", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then(res => {
    setStats({
      enrolled: res.data.total,
      completed: res.data.completed,
      inProgress: res.data.inProgress,
    });
  })
  .catch(err => console.error(err));
}, []);


  return (
    <div className="bg-[#F8F9FC] min-h-screen">

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard title="Courses Enrolled" value={stats.enrolled} />
          <StatCard title="Completed" value={stats.completed} color="green" />
          <StatCard title="In Progress" value={stats.inProgress} color="blue" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorClass =
    color === "green"
      ? "text-green-600"
      : color === "blue"
      ? "text-blue-600"
      : "text-gray-900";

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className={`text-3xl mt-2 ${colorClass}`}>{value}</p>
    </div>
  );
}

