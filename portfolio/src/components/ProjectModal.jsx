import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import MediaGallery from "./MediaGallery";

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3h7v7M21 3l-9 9M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
  </svg>
);
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
);

export default function ProjectModal({ project, items, onClose, returnFocusRef }) {
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const closeFn = useRef(onClose);
  closeFn.current = onClose;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeFn.current();
      } else if (e.key === "Tab" && rootRef.current) {
        const nodes = [...rootRef.current.querySelectorAll(FOCUSABLE)];
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const returnTo = returnFocusRef?.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus();
    };
  }, [returnFocusRef]);

  return createPortal(
    <div className="pm-overlay" onClick={onClose}>
      <div
        ref={rootRef}
        className="pm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="pm-close" onClick={onClose} aria-label="Close project details">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <div className="pm-scroll">
          <div className="pm-left">
            <MediaGallery items={items} title={project.title} />
            {(project.github || project.live) && (
              <div className="pm-links">
                {project.github && (
                  <a className="pm-btn" href={project.github} target="_blank" rel="noreferrer">
                    <GithubIcon /> GitHub<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                {project.live && (
                  <a className="pm-btn" href={project.live} target="_blank" rel="noreferrer">
                    <ExternalIcon /> Live demo<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="pm-right">
            <h2 id="pm-title" className="pm-title">{project.title}</h2>

            {project.tech.length > 0 && (
              <section className="pm-block">
                <h3>Tech stack</h3>
                <ul className="pm-chips">
                  {project.tech.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </section>
            )}

            {project.description && (
              <section className="pm-block">
                <h3>About the project</h3>
                <p className="pm-text">{project.description}</p>
              </section>
            )}

            {project.team.length > 0 && (
              <div className="pm-facts">
                <span className="pm-facts-icon"><UsersIcon /></span>
                <div>
                  <span className="pm-facts-label">Team</span>
                  <span className="pm-facts-val">{project.team.join(", ")}</span>
                </div>
              </div>
            )}

            {project.achievements.length > 0 && (
              <section className="pm-block">
                <h3>My contribution</h3>
                <ul className="pm-points">
                  {project.achievements.map((a) => (
                    <li key={a}><span className="pm-check"><CheckIcon /></span><span>{a}</span></li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}