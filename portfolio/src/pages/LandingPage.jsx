import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";

export default function LandingPage() {
  const { hash } = useLocation();

  // "/#about" scrolls to About; "/" scrolls to top
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
    </>
  );
}
