import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsPage from "./pages/ProjectsPage";
import CertificatesPage from "./pages/CertificatesPage";
import Footer from "./components/Footer";
import ScrollUpButton from "./components/ScrollUpButton";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home"><Hero /></section>
        <section id="experience"><About /></section>
        <section id="certificates"><CertificatesPage /></section>
        <section id="projects"><ProjectsPage /></section>
      </main>
      <Footer />
      <ScrollUpButton />
    </>
  );
}
