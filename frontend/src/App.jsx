import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCourses from './pages/AdminCourses';
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
 <BrowserRouter>
 <Navbar />

<Routes>
   <Route path="/" element={<Navigate to="/login" />} />
 <Route path="/login" element={<Login/>}/>
 <Route path="/register" element={<Register/>}/>
 <Route path="/dashboard" element={<Dashboard/>}/>
 <Route path="/courses" element={<Courses/>}/> 
   <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
 <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
  />
<Route path="/adminCourses" element={<AdminCourses/>}/>
</Routes>
 </BrowserRouter>
  )
}

export default App;
