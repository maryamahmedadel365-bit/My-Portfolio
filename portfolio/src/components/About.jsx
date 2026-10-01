import { useEffect, useState } from "react";
import { ABOUT } from "../data/profile";
import { loadInternships } from "../data/internships";
import "../styles/about.css";

const ICONS = {
  brain: (
    <>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M12 5v13" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  spark: <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z" />,
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

function Icon({ name, size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export default function About() {
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInternships()
      .then(setInternships)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section id="about" className="about">
      {/* soft decorative shapes behind the content */}
      <div className="about-bg" aria-hidden="true">
        <span className="about-bg-circle"></span>
        <span className="about-bg-ring"></span>
        <span className="about-bg-dots"></span>
        <span className="about-bg-dots about-bg-dots--b"></span>
      </div>

      <div className="about-inner">
        {/* SKILLS */}
        <h3 className="about-sub">Skills</h3>
        <div className="skill-groups">
          {ABOUT.skills.map((g) => (
            <div className="skill-group" key={g.group}>
              <div className="skill-group-head">
                <span className="skill-group-icon"><Icon name={g.icon} /></span>
                <div className="skill-group-name">{g.group}</div>
              </div>
              <div className="skill-chips">
                {g.items.map((s) => (
                  <span className="skill-chip" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* INTERNSHIP JOURNEY (from Excel, newest first) */}
        <h3 className="about-sub about-sub--short">Internship Journey</h3>

        {error && <p className="timeline-msg">Couldn't load internships: {error}</p>}

        <ul className="timeline">
          {internships.map((item, i) => (
            <li className="timeline-item" key={i}>
              <span className="timeline-dot"></span>

              <div className="timeline-logo">
                {item.icon ? (
                  <img src={item.icon} alt={item.orgShort} loading="lazy" />
                ) : (
                  <span>{item.orgShort}</span>
                )}
              </div>

              <div className="timeline-body">
                <h4>{item.orgFull ? `${item.orgFull} (${item.orgShort})` : item.orgShort}</h4>
                <div className="timeline-org">{item.title}</div>
                <p>{item.desc}</p>

                {item.certificate && (
                  <a className="timeline-badge" href={item.certificate} target="_blank" rel="noreferrer">
                    <Icon name="shield" size={16} />
                    View certificate
                  </a>
                )}
              </div>

              <div className="timeline-period">{item.period}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}