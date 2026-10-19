import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollUpButton from "./components/ScrollUpButton";
import CertificatesPage from "./pages/CertificatesPage";
import ProjectsPage from "./pages/ProjectsPage";
import NotFoundPage from "./pages/NotFoundPage";

function Home() {
  // arriving from the 404 page via "/#projects" -> jump to that section
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <section id="home"><Hero /></section>
      <section id="experience"><About /></section>
      <section id="certificates"><CertificatesPage /></section>
      <section id="projects"><ProjectsPage /></section>
    </>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHome = path === "/" || path === "/index.html";

  return (
    <>
      <Navbar />
      <main>{isHome ? <Home /> : <NotFoundPage />}</main>
      <Footer />
      <ScrollUpButton />
    </>
  );
}