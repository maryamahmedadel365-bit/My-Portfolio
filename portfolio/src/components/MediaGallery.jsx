import { useState } from "react";

/**
 * Photo + video gallery shown at the top of a project card.
 * - Videos never autoplay: a poster + "Play video" button loads the iframe on demand.
 * - Prev/next buttons, thumbnail buttons and ← → keys all work.
 * - Every control has an accessible name; the counter is announced politely.
 */
export default function MediaGallery({ items, title }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState({});

  if (!items.length) {
    return (
      <div className="pg-stage pg-stage--empty" role="img" aria-label={`No media yet for ${title}`}>
        <span>Media coming soon</span>
      </div>
    );
  }

  const total = items.length;
  const current = items[index];
  const go = (i) => {
    setPlaying(false);
    setIndex((i + total) % total);
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  };
  const label = (item, i) =>
    item.type === "video" ? `${title}: video ${i + 1} of ${total}` : `${title}: screenshot ${i + 1} of ${total}`;

  return (
    <div className="pg" role="group" aria-roledescription="carousel" aria-label={`${title} media`} onKeyDown={onKeyDown}>
      <div className="pg-stage">
        {current.type === "image" ? (
          <img src={current.src} alt={label(current, index)} loading="lazy" decoding="async" />
        ) : playing ? (
          <iframe
            src={current.embed}
            title={label(current, index)}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            {!thumbFailed[index] && (
              <img
                src={current.thumb}
                alt=""
                loading="lazy"
                onError={() => setThumbFailed((s) => ({ ...s, [index]: true }))}
              />
            )}
            <button type="button" className="pg-play" onClick={() => setPlaying(true)}>
              <span className="pg-play-icon" aria-hidden="true">▶</span>
              <span>Play video</span>
            </button>
          </>
        )}

        {total > 1 && (
          <>
            <button type="button" className="pg-nav pg-nav--prev" onClick={() => go(index - 1)} aria-label="Previous media">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="pg-nav pg-nav--next" onClick={() => go(index + 1)} aria-label="Next media">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </>
        )}
        <span className="pg-count" aria-live="polite">{index + 1} of {total}</span>
      </div>

      {total > 1 && (
        <ul className="pg-thumbs">
          {items.map((item, i) => (
            <li key={i}>
              <button
                type="button"
                className="pg-thumb"
                aria-current={i === index ? "true" : undefined}
                aria-label={`${item.type === "video" ? "Video" : "Photo"} ${i + 1}${i === index ? ", selected" : ""}`}
                onClick={() => go(i)}
              >
                {item.type === "video" ? <span aria-hidden="true">▶</span> : <img src={item.thumb} alt="" loading="lazy" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
