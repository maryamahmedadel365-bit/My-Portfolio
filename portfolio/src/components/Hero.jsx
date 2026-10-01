import { useState } from "react";
import { Link } from "react-router-dom";
import { PROFILE } from "../data/profile";
import "../styles/hero.css";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </svg>
);

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Hi, I'm {PROFILE.name}</h1>
        <div className="job-title">{PROFILE.role}</div>
        <p>{PROFILE.summary}</p>

        <div className="buttons">
          <Link className="primary-btn" to="/projects">View Projects</Link>
          <a className="secondary-btn" href={PROFILE.cvLink} download>Download CV</a>
        </div>

        <div className="social-links">
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>
        </div>
      </div>

      <div className="photo-area">
        <div className="photo-wrap">
          <div className="yellow-frame"></div>
          <div className="photo-shape"></div>

          <div className="photo-frame">
            {imgOk ? (
              <img
                src={PROFILE.photo}
                alt={`Portrait of ${PROFILE.name}`}
                onError={() => setImgOk(false)}
              />
            ) : (
              <span style={{ color: "var(--navy)", fontSize: "5rem", fontWeight: 700, alignSelf: "center" }}>
                {PROFILE.name[0]}
              </span>
            )}
          </div>

          <span className="dash dash-1"></span>
          <span className="dash dash-2"></span>
          <span className="dash dash-3"></span>

          <div className="dots">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i}></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
