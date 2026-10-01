import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import CertificatesPage from "./pages/CertificatesPage";
import ProjectsPage from "./pages/ProjectsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
