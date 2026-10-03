import { useId, useMemo, useRef, useState } from "react";
import ProjectModal from "./ProjectModal";
import { coverOf, mediaSummary, toMediaList } from "../utils/media";

const TECH_PREVIEW = 4; // how many tech chips show on the card (the modal shows all)

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);
  const uid = useId();
  const ctaRef = useRef(null);
  const items = useMemo(() => toMediaList(project.media), [project.media]);
  const cover = coverOf(items);
  const shown = project.tech.slice(0, TECH_PREVIEW);
  const extra = project.tech.length - shown.length;

  return (
    <>
      <article className="pc" aria-labelledby={`${uid}-title`} onClick={() => setOpen(true)}>
        <div className="pc-accent" />
        <div className="pc-img">
          {cover && !coverFailed ? (
            <img src={cover} alt="" loading="lazy" decoding="async" onError={() => setCoverFailed(true)} />
          ) : (
            <span className="pc-img-fallback">No preview yet</span>
          )}
          {items.length > 0 && <span className="pc-badge">{mediaSummary(items)}</span>}
        </div>

        <div className="pc-body">
          <h2 id={`${uid}-title`} className="pc-title">{project.title}</h2>
          {shown.length > 0 && (
            <ul className="pc-chips" aria-label="Main technologies">
              {shown.map((t) => <li key={t} title={t}>{t}</li>)}
              {extra > 0 && <li className="pc-chip-more">+{extra} more</li>}
            </ul>
          )}
        </div>

        <button
          ref={ctaRef}
          type="button"
          className="pc-cta"
          aria-haspopup="dialog"
          aria-label={`View details: ${project.title}`}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <span>View details</span>
          <svg className="pc-cta-arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </article>

      {open && <ProjectModal project={project} items={items} returnFocusRef={ctaRef} onClose={() => setOpen(false)} />}
    </>
  );
}