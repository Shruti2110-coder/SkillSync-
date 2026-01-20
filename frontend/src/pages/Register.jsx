import { useState } from "react";
import  api  from "../services/api";
import { useNavigate } from "react-router-dom";


export default function Register() {
const [form, setForm] = useState({ name: "", email: "", password: "" });
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
await api.post("/auth/register", form);
navigate("/login");
};


return (
<form onSubmit={submit} className="flex items-center justify-center h-screen bg-[#F8F9FC]">
<div className="bg-white p-8 rounded-2xl shadow w-96">
<h2 className="text-xl font-bold mb-4">Register</h2>
<input className="border p-2 w-full mb-3" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
<input className="border p-2 w-full mb-3" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
<input type="password" className="border p-2 w-full mb-3" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
<button className="bg-indigo-500 text-white w-full py-2 rounded">Register</button>
</div>
</form>
);
}