import { useState, useEffect } from "react";
import "../styles/scroll-up.css";

/**
 * Floating ScrollUpButton:
 * Appears smoothly when the user scrolls down, and scrolls back to the top when clicked.
 */
export default function ScrollUpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop || 0;
      setVisible(scrolled > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      id="scroll-up-btn"
      className={`scroll-up-btn ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      title="Scroll to top"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
