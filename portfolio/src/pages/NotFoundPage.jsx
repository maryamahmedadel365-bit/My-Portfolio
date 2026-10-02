import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.css";

/* ---------- small inline icons ---------- */
const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const AwardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

/* ---------- SVG Illustration in site's geometric style ---------- */
function NotFoundArt() {
  return (
    <div className="notfound-art-wrap" aria-hidden="true">
      <svg viewBox="0 0 420 340" className="notfound-art">
        {/* Background yellow offset card */}
        <rect x="230" y="160" width="130" height="140" rx="16" fill="var(--yellow)" opacity="0.9" />

        {/* Navy base card with shadow */}
        <rect x="70" y="70" width="280" height="180" rx="18" fill="#ffffff" stroke="var(--navy)" strokeWidth="6" />

        {/* Decorative corner dots matrix */}
        <g fill="#b7c6da">
          <circle cx="95" cy="95" r="3.5" />
          <circle cx="115" cy="95" r="3.5" />
          <circle cx="135" cy="95" r="3.5" />
          <circle cx="95" cy="115" r="3.5" />
          <circle cx="115" cy="115" r="3.5" />
          <circle cx="135" cy="115" r="3.5" />
        </g>

        {/* Giant 404 typography inside illustration */}
        <text
          x="210"
          y="180"
          textAnchor="middle"
          fontSize="92"
          fontWeight="900"
          fontFamily="'Sora', sans-serif"
          fill="var(--navy)"
          letterSpacing="-2"
        >
          404
        </text>

        {/* Yellow underline dash */}
        <line x1="130" y1="205" x2="290" y2="205" stroke="var(--yellow)" strokeWidth="7" strokeLinecap="round" />

        {/* Floating tech satellite / search beacon */}
        <g className="notfound-float-item">
          <circle cx="330" cy="80" r="32" fill="var(--yellow)" stroke="var(--navy)" strokeWidth="5" />
          <circle cx="326" cy="76" r="14" fill="#ffffff" stroke="var(--navy)" strokeWidth="4" />
          <line x1="336" y1="86" x2="348" y2="98" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Orbit ring */}
        <ellipse cx="210" cy="160" rx="175" ry="95" fill="none" stroke="var(--navy)" strokeWidth="2.5" strokeDasharray="8 8" opacity="0.4" />

        {/* Orbiting mini satellite node */}
        <circle cx="385" cy="160" r="8" fill="var(--yellow)" stroke="var(--navy)" strokeWidth="3" />
        <circle cx="45" cy="130" r="6" fill="var(--navy)" />

        {/* Decorative starburst / cross sparks */}
        <g stroke="var(--yellow)" strokeWidth="4" strokeLinecap="round">
          <line x1="50" y1="50" x2="66" y2="50" />
          <line x1="58" y1="42" x2="58" y2="58" />
          <line x1="365" y1="260" x2="381" y2="260" />
          <line x1="373" y1="252" x2="373" y2="268" />
        </g>
      </svg>
    </div>
  );
}

export default function NotFoundPage() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "404 - Page Not Found | Maryam Ahmed Adel";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="notfound-page">
      {/* Background ambient shapes matching About and Certificates */}
      <div className="notfound-bg" aria-hidden="true">
        <span className="notfound-bg-circle"></span>
        <span className="notfound-bg-ring"></span>
        <span className="notfound-bg-dots"></span>
      </div>

      <div className="notfound-container">
        <div className="notfound-grid">
          <div className="notfound-content">
            <span className="notfound-badge">ERROR 404 • LOST IN CYBERSPACE</span>
            <h1 className="notfound-title">
              Page <span>Not Found</span>
            </h1>
            <p className="notfound-desc">
              Oops! The page you are looking for might have been moved, renamed,
              or doesn't exist anymore. Let's get you back on track!
            </p>

            <div className="notfound-actions">
              <Link to="/" className="notfound-btn notfound-btn--primary" id="btn-404-home">
                <ArrowLeftIcon /> Back to Home
              </Link>
              <Link to="/projects" className="notfound-btn notfound-btn--secondary" id="btn-404-projects">
                <FolderIcon /> View Projects
              </Link>
              <Link to="/certificates" className="notfound-btn notfound-btn--secondary" id="btn-404-certs">
                <AwardIcon /> Certificates
              </Link>
            </div>
          </div>

          <NotFoundArt />
        </div>
      </div>
    </div>
  );
}
