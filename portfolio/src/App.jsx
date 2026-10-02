import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import CertificatesPage from "./pages/CertificatesPage";
import ProjectsPage from "./pages/ProjectsPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
