import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const linkClass = ({ isActive }) =>
  `text-sm transition-opacity hover:opacity-100 ${
    isActive ? "text-ink opacity-100" : "text-ink-muted opacity-80"
  }`;

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="border-b border-rule">
      <nav className="mx-auto flex max-w-5xl items-baseline justify-between px-6 py-5">
        <Link to={token ? "/courses" : "/login"} className="display text-2xl">
          SkillSync
        </Link>

        <div className="flex items-center gap-6">
          {!token ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Log in
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/courses" className={linkClass}>
                Catalogue
              </NavLink>
              <NavLink to="/dashboard" className={linkClass}>
                My learning
              </NavLink>
              <button
                onClick={logout}
                className="text-sm text-ink-muted underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
              >
                Log out
              </button>
            </>
          )}

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
