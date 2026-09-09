import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not sign you in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="display text-4xl">Log in</h1>
      <p className="mt-3 text-ink-muted">Pick up where you left off.</p>

      <form onSubmit={submit} className="mt-10 space-y-7">
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
            placeholder="••••••••"
            value={form.password}
            onChange={set("password")}
          />
        </div>

        {error && <p className="text-sm text-ink">{error}</p>}

        <button className="btn w-full" disabled={busy}>
          {busy ? "Signing in…" : "Log in"}
        </button>
      </form>

      <p className="mt-8 text-sm text-ink-muted">
        New here?{" "}
        <Link
          to="/register"
          className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
        >
          Create an account
        </Link>
      </p>
    </main>
  );
}
