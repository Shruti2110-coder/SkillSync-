import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { authHeader, runtimeOf } from "../lib/format";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/users/progress", { headers: authHeader() })
      .then((res) => setData(res.data))
      .catch(() => setError("Could not load your progress."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="mx-auto max-w-5xl px-6 py-16 text-ink-faint">Loading…</p>;
  if (error) return <p className="mx-auto max-w-5xl px-6 py-16">{error}</p>;

  const enrolled = (data.user.enrolledCourses || []).filter((e) => e.course);

  const stats = [
    { label: "Enrolled", value: data.total },
    { label: "Completed", value: data.completed },
    { label: "In progress", value: data.inProgress },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="max-w-2xl">
        <p className="label">My learning</p>
        <h1 className="display mt-3 text-5xl">
          {data.user.name ? `Hello, ${data.user.name.split(" ")[0]}` : "Hello"}
        </h1>
      </header>

      <dl className="mt-12 grid grid-cols-3 border-y border-rule">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`py-8 ${i > 0 ? "border-l border-rule pl-6" : ""} ${
              i < 2 ? "pr-6" : ""
            }`}
          >
            <dt className="label">{s.label}</dt>
            <dd className="display mt-2 text-5xl tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-14">
        <h2 className="label">Your courses</h2>

        {enrolled.length === 0 ? (
          <div className="border-b border-rule py-14 text-center">
            <p className="text-ink-muted">You have not enrolled in anything yet.</p>
            <Link to="/courses" className="btn mt-6">
              Browse the catalogue
            </Link>
          </div>
        ) : (
          <ol className="mt-5">
            {enrolled.map((entry, i) => {
              const lessons = entry.course.lessons || [];
              const done = (entry.completedLessons || []).length;
              const pct = lessons.length
                ? Math.round((done / lessons.length) * 100)
                : 0;

              return (
                <li key={entry.course._id} className="border-b border-rule py-7">
                  <Link
                    to={`/courses/${entry.course._id}`}
                    className="group grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-[3rem_1fr_8rem] sm:gap-x-8"
                  >
                    <span className="label pt-1.5 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="display text-2xl transition-opacity group-hover:opacity-60">
                        {entry.course.title}
                      </h3>
                      <p className="mt-2 text-sm text-ink-faint">
                        {[
                          entry.course.instructor,
                          `${lessons.length} lessons`,
                          runtimeOf(lessons),
                        ]
                          .filter(Boolean)
                          .join("  ·  ")}
                      </p>
                    </div>

                    <div className="col-span-2 mt-4 sm:col-span-1 sm:mt-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm tabular-nums text-ink-muted">
                          {pct}%
                        </span>
                        {pct === 100 && <span className="label">Complete</span>}
                      </div>
                      <div className="meter mt-2">
                        <span style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </main>
  );
}
