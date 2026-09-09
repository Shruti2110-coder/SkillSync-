import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import { authHeader, priceOf, runtimeOf } from "../lib/format";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [done, setDone] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const token = localStorage.getItem("token");

  const load = useCallback(async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data);

      if (token) {
        const progress = await api.get("/users/progress", {
          headers: authHeader(),
        });
        const entry = progress.data.user.enrolledCourses.find(
          (c) => c.course?._id === id
        );
        setEnrolled(Boolean(entry));
        setDone(entry?.completedLessons || []);
      }
    } catch {
      setNotice({ tone: "error", text: "Could not load this course." });
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    load();
  }, [load]);

  const requireLogin = () => {
    setNotice({ tone: "error", text: "Please log in first." });
    setTimeout(() => navigate("/login"), 900);
  };

  const enroll = async () => {
    if (!token) return requireLogin();
    setBusy(true);
    try {
      await api.post(`/users/enroll/${id}`, {}, { headers: authHeader() });
      setEnrolled(true);
      setNotice({ tone: "ok", text: "You are enrolled. Start with lesson 01." });
    } catch (err) {
      setNotice({
        tone: "error",
        text: err.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setBusy(false);
    }
  };

  const complete = async (lessonId) => {
    if (!token) return requireLogin();
    try {
      await api.post(
        `/users/lesson-complete/${id}/${lessonId}`,
        {},
        { headers: authHeader() }
      );
      setDone((prev) => [...prev, lessonId]);
    } catch (err) {
      setNotice({
        tone: "error",
        text: err.response?.data?.message || "Could not save that.",
      });
    }
  };

  if (loading) return <p className="mx-auto max-w-3xl px-6 py-16 text-ink-faint">Loading…</p>;
  if (!course) return <p className="mx-auto max-w-3xl px-6 py-16">Course not found.</p>;

  const lessons = course.lessons || [];
  const completed = lessons.filter((l) => done.includes(l._id)).length;
  const pct = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <Link to="/courses" className="label transition-colors hover:text-ink">
        ← Catalogue
      </Link>

      <header className="mt-8 border-b border-rule pb-10">
        {course.category && <p className="label">{course.category}</p>}
        <h1 className="display mt-3 text-5xl">{course.title}</h1>
        {course.subtitle && (
          <p className="mt-3 text-xl text-ink-muted">{course.subtitle}</p>
        )}

        <p className="mt-6 text-sm text-ink-faint">
          {[
            course.instructor,
            course.level,
            `${lessons.length} lessons`,
            runtimeOf(lessons),
            priceOf(course.price),
          ]
            .filter(Boolean)
            .join("  ·  ")}
        </p>

        {course.description && (
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            {course.description}
          </p>
        )}

        <div className="mt-8 flex items-center gap-4">
          {enrolled ? (
            <span className="label">Enrolled</span>
          ) : (
            <button onClick={enroll} disabled={busy} className="btn">
              {busy ? "Enrolling…" : "Enrol in this course"}
            </button>
          )}
        </div>

        {notice && (
          <p
            className={`mt-4 text-sm ${
              notice.tone === "error" ? "text-ink" : "text-ink-muted"
            }`}
          >
            {notice.text}
          </p>
        )}
      </header>

      {enrolled && (
        <div className="mt-10">
          <div className="flex items-baseline justify-between">
            <span className="label">Progress</span>
            <span className="text-sm tabular-nums text-ink-muted">
              {completed} of {lessons.length} · {pct}%
            </span>
          </div>
          <div className="meter mt-3">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <section className="mt-12">
        <h2 className="label">Lessons</h2>
        <ol className="mt-5">
          {lessons.map((lesson, i) => {
            const isDone = done.includes(lesson._id);
            return (
              <li
                key={lesson._id}
                className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-rule py-5"
              >
                <span
                  className={`label tabular-nums ${isDone ? "opacity-40" : ""}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <p className={isDone ? "text-ink-faint line-through" : ""}>
                    {lesson.title}
                  </p>
                  {lesson.duration && (
                    <p className="mt-1 text-sm text-ink-faint">
                      {lesson.duration}
                    </p>
                  )}
                </div>

                {isDone ? (
                  <span className="label">Done</span>
                ) : (
                  <button
                    onClick={() => complete(lesson._id)}
                    disabled={!enrolled}
                    className="text-sm text-ink-muted underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink disabled:opacity-30 disabled:no-underline"
                    title={enrolled ? "" : "Enrol to track progress"}
                  >
                    Mark done
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
