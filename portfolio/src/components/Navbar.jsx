import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { PROFILE, NAV } from "../data/profile";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const sidebarRef = useRef(null);
  const menuBtnRef = useRef(null);

  const isActive = (item) =>
    item.hash
      ? pathname === "/" && hash === item.hash
      : item.to === "/"
      ? pathname === "/" && !hash
      : pathname === item.to;

  // Handle click outside, Escape key, and body scroll lock
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={() => setOpen(false)}>
        {PROFILE.name}
      </Link>

      <button
        ref={menuBtnRef}
        className={`menu-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Dimmed backdrop overlay - sitting behind sidebar drawer */}
      <div
        className={`nav-backdrop ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <nav ref={sidebarRef} className={`nav-drawer ${open ? "open" : ""}`}>
        <div className="nav-drawer-header">
          <span className="nav-drawer-title">Menu</span>
          <button
            className="nav-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <ul className="nav-links">
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

        <div className="nav-drawer-footer">
          <a
            className="nav-drawer-cv"
            href={PROFILE.cvLink}
            download
            onClick={() => setOpen(false)}
          >
            Download CV
          </a>
        </div>
      </nav>
    </header>
  );
}
