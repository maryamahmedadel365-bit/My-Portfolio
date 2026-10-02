import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop automatically scrolls the window to the top (0, 0)
 * whenever the route pathname changes, unless navigating to an in-page anchor hash.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
      return () => clearTimeout(timer);
    }

    // Scroll to top immediately on page change
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
