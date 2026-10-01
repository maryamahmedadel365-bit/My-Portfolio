import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PROFILE, NAV } from "../data/profile";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  const isActive = (item) =>
    item.hash
      ? pathname === "/" && hash === item.hash
      : item.to === "/"
      ? pathname === "/" && !hash
      : pathname === item.to;

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={() => setOpen(false)}>
        {PROFILE.name}
      </Link>

      <button
        className={`menu-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          {NAV.map((item) => (
            <li key={item.label}>
              <Link
                to={item.hash ? item.to + item.hash : item.to}
                className={isActive(item) ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
