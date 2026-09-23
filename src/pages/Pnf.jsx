import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function Pnf() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-badge">404 Error</span>
        <h1>Page not found</h1>
        <p>
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link to="/" className="primary-btn not-found-btn">
          <Home size={17} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Pnf;
