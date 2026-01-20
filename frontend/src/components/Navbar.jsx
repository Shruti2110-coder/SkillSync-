import  { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
};

return (
    <nav className="bg-indigo-400 text-white px-6 py-4 flex justify-between">
        <h1 className="font-bold text-xl">SkillSync</h1>

        <div className="space-x-4">
            {!token ?(
                <>
                <Link to="/login">login</Link>
                <Link to="/register">Register</Link>
                </>
            ): (
                <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/courses">Courses</Link>  
            <button onClick={logout} className="bg-white text-indigo-600 px-3 py-1 rounded">
                Logout
            </button>
                </>
         
            )}
            
           
        </div>
    </nav>
);
}