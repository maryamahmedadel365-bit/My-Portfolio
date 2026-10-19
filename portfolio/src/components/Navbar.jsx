import { useState, useEffect, useRef } from "react";
import { PROFILE, NAV } from "../data/profile";
import useActiveSection from "../utils/useActiveSection";
import "../styles/navbar.css";

const IDS = NAV.map((item) => item.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuBtnRef = useRef(null);
  const active = useActiveSection(IDS);
  const onHome = window.location.pathname === "/";

  const goTo = (id) => {
    setOpen(false);
    // wait for the drawer to release the body scroll lock
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

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
      <a
        href="#home"
        className="logo"
        onClick={(e) => {
          if (!onHome) return;
          e.preventDefault();
          goTo("home");
        }}
      >
        {PROFILE.name}
      </a>

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
            <li key={item.id}>
              <a
                href={`/#${item.id}`}
                className={active === item.id ? "active" : ""}
                onClick={(e) => {
                  if (!onHome) return;
                  e.preventDefault();
                  goTo(item.id);
                }}
              >
                {item.label}
              </a>
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