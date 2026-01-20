import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  api  from '../services/api';


function Login() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
   try {
const res = await api.post("/auth/login", { email, password });
localStorage.setItem("token", res.data.token);
alert(" Login successful!");
navigate("/dashboard");
} catch (err) {
alert(" Invalid email or password");
}
}
  return (
   <form onSubmit={handleLogin} className='flex items-center justify-center h-screen bg-[#F8F9FC]'>
    <div className='bg-white p-8 rounded-2xl shadow w-96'>
        <h2 className='text-xl font-bold mb-4'>Login</h2>
        <input type='email' className='border p-2 w-full mb-3' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
       <input type='password' className='border p-2 w-full mb-3' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
       <button className='bg-indigo-500 text-white w-full py-2 rounded'>Login</button>
    </div>
   </form>
  )
}

export default Login