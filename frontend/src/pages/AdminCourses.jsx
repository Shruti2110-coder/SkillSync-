import { useState } from "react";
import api from "../services/api";
import { authHeader } from "../lib/format";

const EMPTY = {
  title: "",
  subtitle: "",
  description: "",
  category: "",
  instructor: "",
  level: "Beginner",
  price: 0,
};

export default function AdminCourses() {
  const [form, setForm] = useState(EMPTY);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setNotice(null);
    setBusy(true);
    try {
      const { data } = await api.post(
        "/courses",
        { ...form, price: Number(form.price) || 0 },
        { headers: authHeader() }
      );
      setNotice({ tone: "ok", text: `“${data.title}” was added.` });
      setForm(EMPTY);
    } catch (err) {
      setNotice({
        tone: "error",
        text:
          err.response?.status === 403
            ? "Admin access required."
            : err.response?.data?.message || "Could not add the course.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-6 py-14">
      <p className="label">Admin</p>
      <h1 className="display mt-3 text-4xl">Add a course</h1>

      <form onSubmit={submit} className="mt-10 space-y-7">
        <div>
          <label htmlFor="title" className="label">Title</label>
          <input id="title" required className="field mt-2" value={form.title} onChange={set("title")} />
        </div>

        <div>
          <label htmlFor="subtitle" className="label">Subtitle</label>
          <input id="subtitle" className="field mt-2" value={form.subtitle} onChange={set("subtitle")} />
        </div>

        <div>
          <label htmlFor="description" className="label">Description</label>
          <textarea id="description" rows={3} className="field mt-2 resize-none" value={form.description} onChange={set("description")} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="instructor" className="label">Instructor</label>
            <input id="instructor" className="field mt-2" value={form.instructor} onChange={set("instructor")} />
          </div>
          <div>
            <label htmlFor="category" className="label">Category</label>
            <input id="category" className="field mt-2" value={form.category} onChange={set("category")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="level" className="label">Level</label>
            <select id="level" className="field mt-2" value={form.level} onChange={set("level")}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="label">Price (0 = free)</label>
            <input id="price" type="number" min="0" className="field mt-2" value={form.price} onChange={set("price")} />
          </div>
        </div>

        {notice && (
          <p className={`text-sm ${notice.tone === "error" ? "text-ink" : "text-ink-muted"}`}>
            {notice.text}
          </p>
        )}

        <button className="btn" disabled={busy}>
          {busy ? "Adding…" : "Add course"}
        </button>
      </form>
    </main>
  );
}
