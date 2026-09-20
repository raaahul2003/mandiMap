import React from 'react'
import { Link, NavLink } from 'react-router-dom'
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
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Explore
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            About
          </NavLink>
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
