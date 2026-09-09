import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create your account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="display text-4xl">Create an account</h1>
      <p className="mt-3 text-ink-muted">Free, and takes a moment.</p>

      <form onSubmit={submit} className="mt-10 space-y-7">
        <div>
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            required
            className="field mt-2"
            placeholder="Your name"
            value={form.name}
            onChange={set("name")}
          />
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="field mt-2"
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="field mt-2"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={set("password")}
          />
        </div>

        {error && <p className="text-sm text-ink">{error}</p>}

        <button className="btn w-full" disabled={busy}>
          {busy ? "Creating…" : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-sm text-ink-muted">
        Already have an account?{" "}
        <Link
          to="/login"
          className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
        >
          Log in
        </Link>
      </p>
    </main>
  );
}
