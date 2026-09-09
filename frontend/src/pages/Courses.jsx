import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { priceOf, runtimeOf } from "../lib/format";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => setCourses(res.data))
      .catch(() => setError("Could not load the catalogue."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(courses.map((c) => c.category).filter(Boolean))],
    [courses]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const inCategory = category === "All" || c.category === category;
      const inQuery =
        !q ||
        [c.title, c.subtitle, c.description, c.instructor]
          .filter(Boolean)
          .some((f) => f.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [courses, query, category]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="mb-12 max-w-2xl">
        <h1 className="display text-5xl">Catalogue</h1>
        <p className="mt-4 text-ink-muted">
          {loading
            ? "Loading courses…"
            : `${courses.length} courses on frontend, backend, architecture and the craft in between. Every one of them free.`}
        </p>
      </header>

      {!loading && !error && courses.length > 0 && (
        <div className="mb-10 flex flex-col gap-6 border-b border-rule pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="sm:w-72">
            <label htmlFor="search" className="label">
              Search
            </label>
            <input
              id="search"
              className="field mt-2"
              placeholder="Title, topic or instructor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-sm transition-colors ${
                  category === c
                    ? "text-ink underline decoration-ink underline-offset-4"
                    : "text-ink-faint hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <p className="text-ink-faint">Loading…</p>}
      {error && <p className="text-ink">{error}</p>}

      {!loading && !error && visible.length === 0 && (
        <p className="py-16 text-center text-ink-muted">
          Nothing matches that search.
        </p>
      )}

      <ol>
        {visible.map((c, i) => (
          <li key={c._id}>
            <button
              onClick={() => navigate(`/courses/${c._id}`)}
              className="group grid w-full grid-cols-[2.5rem_1fr] gap-x-4 border-b border-rule py-7 text-left sm:grid-cols-[3rem_1fr_auto] sm:gap-x-8"
            >
              <span className="label pt-1.5 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h2 className="display text-2xl transition-opacity group-hover:opacity-60">
                  {c.title}
                </h2>
                {c.subtitle && (
                  <p className="mt-1 text-ink-muted">{c.subtitle}</p>
                )}
                <p className="mt-3 text-sm text-ink-faint">
                  {[
                    c.instructor,
                    c.level,
                    `${c.lessons?.length || 0} lessons`,
                    runtimeOf(c.lessons),
                  ]
                    .filter(Boolean)
                    .join("  ·  ")}
                </p>
              </div>

              <div className="col-span-2 mt-3 sm:col-span-1 sm:mt-1.5 sm:text-right">
                <span className="text-sm tabular-nums">{priceOf(c.price)}</span>
                {c.category && (
                  <span className="label mt-1 block">{c.category}</span>
                )}
              </div>
            </button>
          </li>
        ))}
      </ol>
    </main>
  );
}
