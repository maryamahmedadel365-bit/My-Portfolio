import "../styles/pages.css";

export default function ProjectsPage() {
  return (
    <div className="page">
      <h1 className="page-title">Projects</h1>
      <div className="card-grid">
        {/* later: map over projects loaded from your Excel file */}
        <div className="card">
          <h3>Project name</h3>
          <p>Short description.</p>
        </div>
      </div>
    </div>
  );
}
