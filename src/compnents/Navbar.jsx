import React from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Plus,
  Shield
} from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          <span className="logo-icon">
            <MapPin size={19} />
          </span>

          <span>MandiMap</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/about">About</Link>
        </nav>

        <div className="nav-actions">

          <Link
            to="/add-mandi"
            className="add-mandi-btn"
          >
            <Plus size={16} />
            Add Mandi
          </Link>

          <Link
            to="/admin"
            className="admin-btn"
          >
            <Shield size={16} />
            Admin
          </Link>

        </div>

      </div>
    </header>
  )
}

export default Navbar
