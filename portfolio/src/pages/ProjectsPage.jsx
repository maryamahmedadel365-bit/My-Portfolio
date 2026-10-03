import { useEffect, useMemo, useState } from "react";
import { loadProjects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "../styles/projects.css";

/* hero illustration — same style as the Certificates page */
function HeroArt() {
  const dots = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) dots.push([262 + c * 18, 14 + r * 18]);
  return (
    <svg viewBox="0 0 360 290" className="projects-art" aria-hidden="true">
      <rect x="226" y="150" width="104" height="124" fill="var(--yellow)" />
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#b7c6da" />)}
      <g stroke="var(--yellow)" strokeWidth="4" strokeLinecap="round">
        <line x1="40" y1="96" x2="62" y2="92" />
        <line x1="52" y1="62" x2="70" y2="76" />
        <line x1="86" y1="38" x2="92" y2="58" />
      </g>
      {/* laptop */}
      <rect x="86" y="70" width="210" height="140" rx="8" fill="#fff" stroke="var(--navy)" strokeWidth="6" />
      <path d="M60 222h262l-14 20H74z" fill="var(--navy)" />
      <g fill="none" stroke="var(--navy)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M156 114l-26 26 26 26" />
        <path d="M226 114l26 26-26 26" />
        <path d="M200 106l-20 68" />
      </g>
    </svg>
  );
}

// Navbar, <main>, Footer and ScrollUpButton already come from App.jsx.
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let alive = true;
    loadProjects()
      .then((list) => {
        if (!alive) return;
        setProjects(list);
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const stats = useMemo(() => {
    const teamProjects = projects.filter((p) => p.team.length > 0 && !p.team.includes("Solo project")).length;
    const technologies = new Set(projects.flatMap((p) => p.tech.map((t) => t.toLowerCase()))).size;
    return { total: projects.length, teamProjects, technologies };
  }, [projects]);

  return (
    <div className="projects-page">
      {/* background shapes — same as the Certificates page */}
      <div className="projects-bg" aria-hidden="true">
        <span className="projects-bg-circle" />
        <span className="projects-bg-ring" />
        <span className="projects-bg-dots" />
        <span className="projects-bg-dots projects-bg-dots--b" />
      </div>

      <div className="projects-hero-band">
        <header className="projects-inner projects-hero">
          <div>
            <h1 className="projects-title">My <span>Projects</span></h1>
            <p className="projects-sub">
              A collection of the projects I have worked on, showcasing my skills in AI, data science,
              web development and problem solving.
            </p>
            {status === "ready" && (
              <div className="projects-stats">
                <div><strong>{stats.total}</strong><span>Projects</span></div>
                <div><strong>{stats.teamProjects}</strong><span>Team projects</span></div>
                <div><strong>{stats.technologies}</strong><span>Technologies</span></div>
              </div>
            )}
          </div>
          <HeroArt />
        </header>
      </div>

      <section className="projects-band" aria-label="Projects">
        <div className="projects-inner">
          {status === "loading" && <p className="projects-status" role="status">Loading projects…</p>}
          {status === "error" && (
            <p className="projects-status projects-status--error" role="alert">
              Projects could not be loaded. Check that Portfolio_2.xlsx is in the public folder, then refresh.
            </p>
          )}
          {status === "ready" && (
            <div className="projects-grid">
              {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}