import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Shield,
} from "lucide-react";
import Navbar from "../compnents/Navbar";


function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("mandimapAdmin", "true");

      navigate("/admin/dashboard");
      return;
    }

    setError("Invalid email or password.");
  }

  return (
    <>
      <Navbar />

      <main className="admin-login-page">
        <div className="admin-login-container">

          <div className="admin-login-card">

            <div className="admin-login-icon">
              <Shield size={26} />
            </div>

            <div className="admin-login-heading">
              <span className="section-label">
                MandiMap Admin
              </span>

              <h1>Welcome back</h1>

              <p>
                Sign in to manage mandi listings.
              </p>
            </div>

            <form
              className="admin-login-form"
              onSubmit={handleSubmit}
            >

              {/* Email */}

              <div className="admin-form-group">
                <label htmlFor="admin-email">
                  Email Address
                </label>

                <div className="admin-input-wrapper">
                  <Mail size={17} />

                  <input
                    id="admin-email"
                    type="email"
                    placeholder="admin@mandimap.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Password */}

              <div className="admin-form-group">
                <label htmlFor="admin-password">
                  Password
                </label>

                <div className="admin-input-wrapper">
                  <LockKeyhole size={17} />

                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="admin-login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="admin-login-button"
              >
                Sign In
              </button>

            </form>

            <div className="admin-login-footer">
              <Link to="/">
                <ArrowLeft size={15} />
                Back to MandiMap
              </Link>
            </div>

          </div>

          <p className="admin-login-note">
            Admin access is restricted to authorized users.
          </p>

        </div>
      </main>
    </>
  );
}

export default AdminLogin;