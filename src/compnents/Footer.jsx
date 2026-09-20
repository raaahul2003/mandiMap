import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">
              <MapPin size={18} />
            </span>

            <span>MandiMap</span>
          </Link>

          <p>
            Discover Kerala's best mandi restaurants,
            district by district.
          </p>

          <div className="footer-socials">
            {/* <a href="#" aria-label="Instagram">
              <Instagram size={17} />
            </a> */}

            <a href="mailto:hello@mandimap.com" aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-column">
          <h3>Explore</h3>

          <Link to="/">Home</Link>
          <Link to="/explore">Explore Kerala</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Community */}
        <div className="footer-column">
          <h3>Community</h3>

          <Link to="/add-mandi">Add a Mandi</Link>
          <Link to="/explore">Find a Mandi</Link>
        </div>

        {/* CTA */}
        <div className="footer-column footer-cta">
          <h3>Know a great spot?</h3>

          <p>
            Help other food lovers discover your
            favorite mandi restaurant.
          </p>

          <Link to="/add-mandi" className="footer-add-link">
            Add a Mandi
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} MandiMap. Built for
          Kerala food lovers.
        </p>

        <span>Made with ❤️ in Kerala</span>
      </div>
    </footer>
  );
}

export default Footer;