import { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () =>
      localStorage.getItem("isLoggedIn") === "true"
  );

  const isHome = location.pathname === "/";

  useEffect(() => {
    setIsLoggedIn(
      localStorage.getItem("isLoggedIn") === "true"
    );
  }, [location.pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("rememberMe");

    setIsLoggedIn(false);
    setMenuOpen(false);

    navigate("/login");
  };

  return (
    <header
      className={`navbar ${
        isHome ? "home-navbar" : "page-navbar"
      }`}
    >
      {/* Logo */}
      <NavLink
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        DriveNest
      </NavLink>

      {/* Hamburger */}
      <button
        type="button"
        className={`menu-toggle ${
          menuOpen ? "menu-open" : ""
        }`}
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation */}
      <nav
        className={`navigation ${
          menuOpen ? "navigation-open" : ""
        }`}
      >
        <ul className="nav-links">

          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/vehicles"
              onClick={closeMenu}
            >
              Buy Vehicle
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sell"
              onClick={closeMenu}
            >
              Sell Vehicle
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/compare"
              onClick={closeMenu}
            >
              Compare
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favorites"
              onClick={closeMenu}
            >
              Favorites
            </NavLink>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
                <button
                  type="button"
                  className="navbar-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </nav>
    </header>
  );
}

export default Navbar;