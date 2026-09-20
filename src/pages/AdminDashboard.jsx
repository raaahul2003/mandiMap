import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CheckCircle,
  Edit,
  LogOut,
  MapPin,
  Plus,
  ShieldCheck,
  Star,
  Trash2,
  Utensils,
  X,
} from "lucide-react";

import { districts } from "../data/mockData";
import { getMandis, deleteMandi } from "../services/mandiAPI";
import Navbar from "../compnents/Navbar";

function AdminDashboard() {
  const navigate = useNavigate();

  const [mandiList, setMandiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mandiToDelete, setMandiToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("mandimapAdmin");

    if (isAdmin !== "true") {
      navigate("/admin");
    }
  }, [navigate]);


  useEffect(() => {
    async function loadMandis() {
      try {
        const data = await getMandis();
        setMandiList(data);
      } catch (error) {
        console.error("Failed to load mandis:", error);
        setError("Unable to load mandi data.");
      } finally {
        setLoading(false);
      }
    }

    loadMandis();
  }, []);

  const highestRating = useMemo(() => {
    if (mandiList.length === 0) return 0;

    return Math.max(
      ...mandiList.map((mandi) => mandi.rating)
    );
  }, [mandiList]);

  const districtCount = useMemo(() => {
    return new Set(
      mandiList.map((mandi) => mandi.district)
    ).size;
  }, [mandiList]);

  function handleLogout() {
    localStorage.removeItem("mandimapAdmin");
    navigate("/admin");
  }

  function openDeleteModal(mandi) {
    setMandiToDelete(mandi);
  }

  function closeDeleteModal() {
    setMandiToDelete(null);
  }

  async function confirmDelete() {
    if (!mandiToDelete) return;

    try {
      await deleteMandi(mandiToDelete.id);

      setMandiList((currentList) =>
        currentList.filter(
          (mandi) => mandi.id !== mandiToDelete.id
        )
      );

      setMandiToDelete(null);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to delete mandi:", error);
      setError("Unable to delete mandi. Please try again.");
    }
  }

  return (
    <>
      <Navbar />

      <main className="admin-dashboard-page">
        <div className="admin-dashboard-container">

          {/* Header */}

          <section className="admin-dashboard-header">
            <div>
              <span className="section-label">
                Admin Panel
              </span>

              <h1>Mandi Dashboard</h1>

              <p>
                Manage mandi listings across Kerala.
              </p>
            </div>

            <div className="admin-dashboard-actions">
              <Link
                to="/add-mandi"
                className="primary-btn"
              >
                <Plus size={17} />
                Add Mandi
              </Link>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </section>

          {/* Statistics */}

          <section className="admin-stats-grid">

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <Utensils size={21} />
              </div>

              <div>
                <span>Total Mandis</span>
                <strong>{mandiList.length}</strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <MapPin size={21} />
              </div>

              <div>
                <span>Districts Covered</span>
                <strong>{districtCount}</strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <Star size={21} />
              </div>

              <div>
                <span>Highest Rating</span>
                <strong>{highestRating}</strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <BarChart3 size={21} />
              </div>

              <div>
                <span>All Districts</span>
                <strong>{districts.length}</strong>
              </div>
            </div>

          </section>

          {/* Listings */}

          <section className="admin-listings">

            <div className="admin-listings-header">
              <div>
                <h2>Mandi Listings</h2>

                <p>
                  Manage restaurants currently displayed
                  on MandiMap.
                </p>
              </div>

              <span className="admin-listing-count">
                {mandiList.length} listings
              </span>
            </div>

            <div className="admin-table-wrapper">
              {loading ? (
                <p className="api-message">Loading mandi data...</p>
              ) : error ? (
                <p className="api-error">{error}</p>
              ) : (
                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Restaurant</th>
                      <th>District</th>
                      <th>Location</th>
                      <th>Rating</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {mandiList.length > 0 ? (
                      mandiList.map((mandi) => (
                        <tr key={mandi.id}>

                          <td>
                            <div className="admin-restaurant">

                              <div className="admin-restaurant-image">
                                <img
                                  src={mandi.image}
                                  alt={mandi.name}
                                />
                              </div>

                              <div>
                                <strong>
                                  {mandi.name}
                                </strong>

                                <span>
                                  {mandi.cuisine}
                                </span>
                              </div>

                            </div>
                          </td>

                          <td>
                            <span className="admin-district">
                              {mandi.district}
                            </span>
                          </td>

                          <td>
                            <span className="admin-location">
                              {mandi.location}
                            </span>
                          </td>

                          <td>
                            <span className="admin-rating">
                              <Star
                                size={14}
                                fill="currentColor"
                              />
                              {mandi.rating}
                            </span>
                          </td>

                          <td>
                            <span className="admin-price">
                              {mandi.priceRange}
                            </span>
                          </td>

                          <td>
                            <div className="admin-row-actions">

                              <button
                                type="button"
                                className="table-action edit"
                                onClick={() =>
                                  navigate(
                                    `/admin/mandis/${mandi.id}/edit`
                                  )
                                }
                              >
                                <Edit size={15} />
                                Edit
                              </button>

                              <button
                                type="button"
                                className="table-action delete"
                                onClick={() =>
                                  openDeleteModal(mandi)
                                }
                              >
                                <Trash2 size={15} />
                                Delete
                              </button>

                            </div>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="admin-table-empty"
                        >
                          <Utensils size={25} />

                          <strong>
                            No mandis available
                          </strong>

                          <span>
                            Add a new mandi to see it here.
                          </span>
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>
              )}
            </div>

          </section>

          {/* Security note */}

          <div className="admin-security-note">
            <ShieldCheck size={18} />

            <div>
              <strong>Admin access</strong>

              <p>
                Only authorized administrators should manage
                mandi listings.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Delete Modal */}

      {mandiToDelete && (
        <div
          className="delete-modal-overlay"
          onClick={closeDeleteModal}
        >
          <div
            className="delete-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="delete-modal-close"
              onClick={closeDeleteModal}
              aria-label="Close"
            >
              <X size={19} />
            </button>

            <div className="delete-modal-icon">
              <Trash2 size={23} />
            </div>

            <h2>Delete Mandi?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{mandiToDelete.name}</strong>?
              This action cannot be undone.
            </p>

            <div className="delete-modal-actions">

              <button
                type="button"
                className="secondary-btn"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm-btn"
                onClick={confirmDelete}
              >
                <Trash2 size={16} />
                Delete Mandi
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Success Toast */}

      {showToast && (
        <div className="admin-toast">
          <CheckCircle size={19} />

          <div>
            <strong>Mandi deleted</strong>
            <span>
              The mandi was removed successfully.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowToast(false)}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;