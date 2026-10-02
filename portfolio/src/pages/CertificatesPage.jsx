import { useEffect, useState } from "react";
import { loadCertificates } from "../data/certificates";
import "../styles/certificates.css";

/* ---------- small inline icons ---------- */
const P = {
  building: <><path d="M3 21h18M5 21V10l7-5 7 5v11" /><path d="M9 21v-6h6v6M3 10h18" /></>,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12 4.5 4.5L19 7" />,
  medal: <><circle cx="12" cy="9" r="5" /><path d="m9 13-2 8 5-3 5 3-2-8" /></>,
};
function Icon({ name, size = 16, stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name]}
    </svg>
  );
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/* ---------- hero illustration ---------- */
function HeroArt() {
  const dots = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) dots.push([262 + c * 18, 14 + r * 18]);
  return (
    <svg viewBox="0 0 360 290" className="certs-art" aria-hidden="true">
      {/* yellow offset block, like the one behind your photo on Home */}
      <rect x="226" y="150" width="104" height="124" fill="var(--yellow)" />
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#b7c6da" />)}
      <g stroke="var(--yellow)" strokeWidth="4" strokeLinecap="round">
        <line x1="40" y1="96" x2="62" y2="92" />
        <line x1="52" y1="62" x2="70" y2="76" />
        <line x1="86" y1="38" x2="92" y2="58" />
      </g>
      <g transform="rotate(-8 190 150)">
        <rect x="90" y="86" width="210" height="130" rx="8" fill="#fff" stroke="var(--navy)" strokeWidth="6" />
        <g stroke="var(--navy)" strokeWidth="6" strokeLinecap="round">
          <line x1="118" y1="118" x2="236" y2="118" />
          <line x1="118" y1="140" x2="226" y2="140" />
          <line x1="118" y1="162" x2="196" y2="162" />
        </g>
      </g>
      <path d="M250 196l-12 52 24-12 22 16 4-52z" fill="var(--yellow)" stroke="var(--navy)" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="262" cy="188" r="30" fill="var(--yellow)" stroke="var(--navy)" strokeWidth="5" />
      <circle cx="262" cy="188" r="15" fill="var(--navy)" />
    </svg>
  );
}

/* ---------- card: image first, then text ---------- */
function CertCard({ item, onOpen }) {
  return (
    <article
      className="cert-card"
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(item)}
    >
      <div className="cert-card-accent-bar" />
      <div className="cert-img">
        {item.image ? (
          <img src={item.image} alt={item.name} loading="lazy" />
        ) : (
          <div className="cert-img-fallback">
            <Icon name="medal" size={48} stroke={1.3} />
          </div>
        )}
      </div>

      <div className="cert-body">
        <div className="cert-issuer-row">
          <Icon name="building" size={14} />
          <span>{item.issuer}</span>
        </div>
        <h3 className="cert-name" title={item.name}>{item.name}</h3>
      </div>

      <button
        type="button"
        className="cert-more"
        onClick={(e) => { e.stopPropagation(); onOpen(item); }}
        aria-label={`View details for ${item.name}`}
      >
        <span>View Details</span>
        <span className="cert-more-arrow"><Icon name="arrow" size={16} stroke={2.4} /></span>
      </button>
    </article>
  );
}

/* ---------- modal ---------- */
function CertModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="cert-overlay" onClick={onClose}>
      <div
        className="cert-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed/Sticky close button: stays anchored at the top-right of the modal window at all times */}
        <button
          type="button"
          className="cert-close"
          onClick={onClose}
          aria-label="Close dialog"
          title="Close (Esc)"
        >
          <Icon name="close" size={20} stroke={2.4} />
        </button>

        <div className="cert-modal-scroll">
          <div className="cert-modal-left">
            <div className="cert-preview">
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="cert-preview-fallback">
                  <Icon name="medal" size={56} stroke={1.3} />
                  <span>Verified Credential</span>
                </div>
              )}
            </div>
            {item.link && (
              <a className="cert-btn" href={item.link} target="_blank" rel="noreferrer">
                <Icon name="external" size={16} /> <span>View Certificate</span>
              </a>
            )}
          </div>

          <div className="cert-modal-right">
            <div className="cert-modal-header">
              {item.category && <span className="cert-tag">{item.category}</span>}
              <h3 id="cert-modal-title" className="cert-modal-title">{item.name}</h3>
            </div>

            <div className="cert-facts">
              <span className="cert-facts-icon"><Icon name="building" size={16} /></span>
              <div className="cert-facts-info">
                <span className="cert-facts-label">Issued by</span>
                <strong className="cert-facts-val">{item.issuer}</strong>
              </div>
            </div>

            {item.summary && (
              <div className="cert-modal-block">
                <h4>About this certificate</h4>
                <p className="cert-summary">{item.summary}</p>
              </div>
            )}

            {item.points && item.points.length > 0 && (
              <div className="cert-modal-block">
                <h4>Key Learning Points</h4>
                <ul className="cert-points">
                  {item.points.map((p, i) => (
                    <li key={i}>
                      <span className="cert-check"><Icon name="check" size={12} stroke={3} /></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom action bar: user can close or view link without scrolling back to the top */}
            <div className="cert-modal-footer">
              {item.link && (
                <a className="cert-btn cert-btn--outline" href={item.link} target="_blank" rel="noreferrer">
                  <Icon name="external" size={15} /> Open Link
                </a>
              )}
              <button type="button" className="cert-modal-close-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */
export default function Certificates() {
  const [data, setData] = useState({ total: 0, categories: [] });
  const [error, setError] = useState("");
  const [active, setActive] = useState(null);

  useEffect(() => {
    loadCertificates().then(setData).catch((e) => setError(e.message));
  }, []);

  return (
    <main className="certs">
      {/* soft decorative shapes behind the content (same as About) */}
      <div className="certs-bg" aria-hidden="true">
        <span className="certs-bg-circle"></span>
        <span className="certs-bg-ring"></span>
        <span className="certs-bg-dots"></span>
        <span className="certs-bg-dots certs-bg-dots--b"></span>
      </div>

      {/* HERO */}
      <section className="certs-hero-band">
        <header className="certs-inner certs-hero">
          <div>
            <div className="certs-eyebrow">MY CERTIFICATES &amp; LEARNING</div>
            <h1 className="certs-title">
              Certifications<br /><span>&amp; Learning</span>
            </h1>
            <p className="certs-sub">
              A collection of certifications and learning milestones that shaped my journey in AI, software, and technology.
            </p>

            <div className="certs-stats">
              <div><strong>{data.total}+</strong><span>Certificates</span></div>
              <div><strong>{data.categories.length}</strong><span>Categories</span></div>
              <div><strong>Continuous</strong><span>Learning</span></div>
            </div>
          </div>
          <HeroArt />
        </header>

        {error && <p className="certs-inner certs-error">Couldn't load certificates: {error}</p>}

        {data.categories.length > 0 && (
          <nav className="certs-inner certs-jump" aria-label="Categories">
            {data.categories.map((c) => (
              <a key={c.name} href={`#cat-${slug(c.name)}`}>{c.name}</a>
            ))}
          </nav>
        )}
      </section>

      {/* ONE HEADER PER CATEGORY (bands alternate off-white / light blue) */}
      {data.categories.map((cat, idx) => (
        <section
          className={`cert-band ${idx % 2 === 0 ? "" : "alt"}`}
          id={`cat-${slug(cat.name)}`}
          key={cat.name}
        >
          <div className="certs-inner">
            <div className="cert-cat-head">
              <h2>{cat.name}</h2>
              <span className="cert-cat-count">
                {cat.items.length} {cat.items.length === 1 ? "certificate" : "certificates"}
              </span>
            </div>

            <div className="cert-grid">
              {cat.items.map((item, i) => (
                <CertCard key={i} item={item} onOpen={setActive} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {active && <CertModal item={active} onClose={() => setActive(null)} />}
    </main>
  );
}