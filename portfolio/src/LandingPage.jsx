import { useState } from "react";

/* =========================
   YOUR INFORMATION
========================= */

const PROFILE = {
  name: "Maryam Ahmed Adel",
  role: "AI Engineer",
  summary:
    "I turn ideas into intelligent systems — from Machine Learning and Computer Vision to Generative AI and real-world applications.",
  photo: "https://res.cloudinary.com/lrmifkhy/image/upload/v1790626661/me.jpg",
  cvLink: "/cv.pdf",
  github: "https://github.com/maryamahmedadel365-bit",
  linkedin: "https://www.linkedin.com/in/maryam-ahmed-298875327/",
};

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Certificates", href: "#certificates" },
  { label: "Projects", href: "#projects" },
];

const css = `

:root {
  --navy: #0b3554;
  --yellow: #ffc928;
  --cream: #faf9f5;
  --soft-blue: #e8eef3;
  --text: #36566d;
  --arch: 190px 70px 0 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

/* CHANGE 2: use the Sora font you already load */
body {
  font-family: 'Sora', Arial, sans-serif;
  background: var(--cream);
  color: var(--navy);
}

a {
  text-decoration: none;
}

/* =========================
   NAVBAR
========================= */

.navbar {
  height: 70px;
  background: var(--navy);
  border-bottom: 4px solid var(--yellow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14%;
  position: relative;
  z-index: 100;
}

/* Hamburger button (mobile only) */
.menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: 0;
  cursor: pointer;
}

.menu-btn span {
  width: 24px;
  height: 3px;
  background: white;
  transition: 0.3s;
}

.menu-btn.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.menu-btn.open span:nth-child(2) { opacity: 0; }
.menu-btn.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

.logo {
  color: white;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 35px;
  list-style: none;
}

.nav-links a {
  position: relative;
  color: white;
  font-size: 16px;
  font-weight: 500;
}

.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -12px;
  width: 0;
  height: 3px;
  background: var(--yellow);
  transition: 0.3s;
}

.nav-links a:hover::after,
.nav-links a.active::after {
  width: 100%;
}

/* =========================
   HERO
========================= */

.hero {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 14%;
  background: var(--cream);
  overflow: hidden;
}

.hero-text {
  width: 52%;
  z-index: 5;
}

/* CHANGE 4: smaller heading, wraps naturally (no <br>) */
.hero-text h1 {
  color: var(--navy);
  font-size: clamp(38px, 4.4vw, 68px);
  line-height: 1.15;
  font-weight: 800;
  margin-bottom: 22px;
}

.job-title {
  display: inline-block;
  background: var(--yellow);
  color: var(--navy);
  padding: 4px 12px;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 28px;
}

.hero-text p {
  max-width: 600px;
  color: var(--text);
  font-size: 17px;
  line-height: 1.7;
  margin-bottom: 35px;
}

.buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
}

.primary-btn,
.secondary-btn {
  padding: 16px 28px;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
}

.primary-btn {
  background: var(--navy);
  color: white;
  border: 2px solid var(--navy);
}

.primary-btn:hover {
  transform: translateY(-3px);
}

.secondary-btn {
  background: transparent;
  border: 2px solid var(--navy);
  color: var(--navy);
}

.secondary-btn:hover {
  background: var(--navy);
  color: white;
}

.social-links {
  display: flex;
  gap: 30px;
}

.social-links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--navy);
  font-size: 17px;
  border-bottom: 2px solid var(--yellow);
  padding-bottom: 3px;
  transition: 0.25s;
}

.social-links a svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.social-links a:hover {
  border-bottom-color: var(--navy);
}

.social-links a:hover svg {
  transform: translate(2px, -2px);
}

.social-links a svg {
  transition: 0.25s;
}

/* =========================
   PHOTO AREA
   CHANGE 5: shape, yellow frame, photo, dots and
   dashes now all live inside ONE wrapper (.photo-wrap)
   so they stay aligned with each other.
========================= */

.photo-area {
  width: 44%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 22px;
}

.photo-wrap {
  position: relative;
  width: 413px;
  height: 482px;
  max-width: 100%;
}

/* Yellow offset frame (only the right + bottom edges peek out) */
.yellow-frame {
  position: absolute;
  left: 18px;
  top: 115px;
  right: -22px;
  bottom: -20px;
  background: var(--yellow);
  z-index: 0;
}

/* Pale blue arch */
.photo-shape {
  position: absolute;
  inset: 0;
  background: var(--soft-blue);
  border-radius: var(--arch);
  z-index: 1;
}

/* Photo */
.photo-frame {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 2;
  /* clip the photo to the same arch as the blue shape */
  border-radius: var(--arch);
  overflow: hidden;
}

.photo-frame img {
  width: 100%;
  height: 100%;
  /* cover = photo fills the whole arch (no gap at the top) */
  object-fit: cover;
  object-position: center bottom;
  display: block;
}

/* Dots: cream patch that cuts into the corner of the arch */
.dots {
  position: absolute;
  top: 0;
  right: -42px;
  width: 104px;
  height: 100px;
  padding: 20px 10px;
  background: var(--cream);
  display: grid;
  grid-template-columns: repeat(5, 7px);
  justify-content: space-between;
  align-content: space-between;
  z-index: 3;
}

.dots span {
  width: 7px;
  height: 7px;
  background: #b8cbd6;
  border-radius: 50%;
}

/* Yellow spark dashes at the top-left of the photo */
.dash {
  position: absolute;
  width: 26px;
  height: 4px;
  background: var(--yellow);
  border-radius: 2px;
  z-index: 3;
}

.dash-1 { left: 48px;  top: 10px; transform: rotate(60deg); }
.dash-2 { left: 20px;  top: 40px; transform: rotate(35deg); }
.dash-3 { left: -2px;  top: 76px; transform: rotate(10deg); }

/* =========================
   ABOUT
========================= */

.about {
  padding: 80px 14%;
  background: var(--navy);
  color: white;
  scroll-margin-top: 0;
}

.about h2 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 20px;
  display: inline-block;
  border-bottom: 4px solid var(--yellow);
  padding-bottom: 6px;
}

.about p {
  max-width: 700px;
  font-size: 17px;
  line-height: 1.7;
  color: #cfdbe4;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {
  .navbar { padding: 0 6%; }
  .hero { padding: 50px 7%; }
  .hero-text { width: 55%; }
  .photo-area { width: 45%; padding-right: 20px; }
  .photo-wrap { width: 320px; height: 390px; }
}

/* Phones + small tablets: hamburger menu */
@media (max-width: 800px) {
  .navbar { padding: 0 5%; }
  .menu-btn { display: flex; }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    padding: 10px 5% 16px;
    background: var(--navy);
    border-bottom: 4px solid var(--yellow);
  }

  .nav-links.open { display: flex; }

  .nav-links a {
    display: inline-block;
    padding: 14px 0;
    font-size: 16px;
  }

  .nav-links a::after { bottom: 6px; }
}

/* Phones: stack the hero */
@media (max-width: 700px) {
  :root { --arch: 140px 50px 0 0; }

  .hero {
    flex-direction: column;
    text-align: center;
    padding: 40px 5% 60px;
  }

  .hero-text { width: 100%; }
  .hero-text h1 { font-size: clamp(30px, 9vw, 40px); }
  .job-title { font-size: 20px; margin-bottom: 22px; }
  .hero-text p { font-size: 16px; margin-left: auto; margin-right: auto; }

  .buttons { justify-content: center; flex-wrap: wrap; }
  .primary-btn, .secondary-btn { padding: 14px 22px; font-size: 15px; }
  .social-links { justify-content: center; }

  .photo-area {
    width: 100%;
    margin-top: 50px;
    padding-right: 22px;
    justify-content: center;
  }

  .photo-wrap {
    width: min(300px, 72vw);
    height: auto;
    aspect-ratio: 413 / 482;
  }

  .dots { right: -30px; width: 84px; height: 80px; padding: 14px 8px; }
  .dots span { width: 6px; height: 6px; }

  .about { padding: 60px 6%; }
  .about h2 { font-size: 30px; }
  .about p { font-size: 16px; }
}

`;

/* =========================
   NAVBAR COMPONENT
========================= */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <a href="#home" className="logo" onClick={() => setOpen(false)}>
        {PROFILE.name}
      </a>

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
          {NAV.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={index === 0 ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/* =========================
   HERO COMPONENT
========================= */

function Hero() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="home" className="hero">
      {/* LEFT SIDE */}
      <div className="hero-text">
        {/* no <br /> so it wraps like the design */}
        <h1>Hi, I'm {PROFILE.name}</h1>

        <div className="job-title">{PROFILE.role}</div>

        <p>{PROFILE.summary}</p>

        <div className="buttons">
          <a className="primary-btn" href="#projects">
            View Projects
          </a>
          <a className="secondary-btn" href={PROFILE.cvLink} download>
            Download CV
          </a>
        </div>

        <div className="social-links">
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14L21 3" />
            </svg>
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>

      {/* RIGHT SIDE */}
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
              <span
                style={{
                  color: "var(--navy)",
                  fontSize: "5rem",
                  fontWeight: "700",
                  alignSelf: "center",
                }}
              >
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

/* =========================
   ABOUT COMPONENT
========================= */

function About() {
  return (
    <section id="about" className="about">
      <h2>About</h2>
      <p>
        Write a short paragraph about yourself here: your background,
        what you study, and the kind of AI work you want to do.
      </p>
    </section>
  );
}

/* =========================
   MAIN APP
========================= */

export default function LandingPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{css}</style>

      <Navbar />

      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}