import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import { getMandiById, updateMandi } from "../services/mandiAPI";
import { districts, mandis } from "../data/mockData";
import Navbar from "../compnents/Navbar";

function EditMandi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    location: "",
    mapLink: "",
    description: "",
    cuisine: "Arabian",
    priceRange: "",
    phone: "",
    openingTime: "",
    closingTime: "",
    rating: "",
    image: "",
    website: "",
  });

  useEffect(() => {
    async function loadMandi() {
      try {
        const data = await getMandiById(id);

        setFormData({
          name: data.name || "",
          district: data.district || "",
          location: data.location || "",
          mapLink: data.mapLink || "",
          description: data.description || "",
          cuisine: data.cuisine || "Arabian",
          priceRange: data.priceRange || "",
          phone: data.phone || "",
          openingTime: data.openingTime || "",
          closingTime: data.closingTime || "",
          rating: data.rating ?? "",
          image: data.image || "",
          website: data.website || "",
        });
      } catch (error) {
        console.error("Failed to load mandi:", error);
        setError("Unable to load mandi.");
      } finally {
        setLoading(false);
      }
    }

    loadMandi();
  }, [id]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Restaurant name is required.");
      return;
    }

    if (!formData.district) {
      setError("District is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!formData.mapLink.trim()) {
      setError("Google Maps link is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required.");
      return;
    }

    if (!formData.priceRange.trim()) {
      setError("Price range is required.");
      return;
    }

    try {
      setError("");

      const updatedMandi = await updateMandi(id, {
        ...formData,
        rating: formData.rating
          ? Number(formData.rating)
          : 0,
      });

      console.log("Updated mandi:", updatedMandi);

      alert("Mandi updated successfully!");

      navigate(`/mandi/${updatedMandi.id}`);
    } catch (error) {
      console.error("Failed to update mandi:", error);
      setError("Unable to update mandi. Please try again.");
    }
  }

  if (error && !formData) {
    return (
      <>
        <Navbar />

        <main className="add-mandi-page">
          <div className="district-not-found">
            <h1>Mandi Not Found</h1>

            <p>{error}</p>

            <Link
              to="/admin/dashboard"
              className="primary-btn"
            >
              Back to Dashboard
            </Link>
          </div>
        </main>
      </>
    );
  }

  if (!formData) {
    return (
      <>
        <Navbar />

        <main className="add-mandi-page">
          <div className="edit-loading">
            Loading mandi...
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="add-mandi-page">
        <div className="add-mandi-container">

          <Link
            to="/admin/dashboard"
            className="back-link"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="add-mandi-header">
            <span className="section-label">
              Admin Panel
            </span>

            <h1>Edit Mandi</h1>

            <p>
              Update the information for{" "}
              <strong>{formData.name}</strong>.
            </p>
          </div>

          <form
            className="mandi-form"
            onSubmit={handleSubmit}
          >

            {/* Basic Information */}

            <section className="form-section">
              <div className="form-section-heading">
                <h2>Basic Information</h2>
                <p>
                  Update the restaurant details.
                </p>
              </div>

              <div className="form-grid">

                <div className="form-group form-full">
                  <label htmlFor="name">
                    Restaurant Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="district">
                    District *
                  </label>

                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select district
                    </option>

                    {districts.map((district) => (
                      <option
                        key={district}
                        value={district}
                      >
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="location">
                    Location *
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group form-full">
                  <label htmlFor="mapLink">
                    Google Maps Link *
                  </label>

                  <input
                    id="mapLink"
                    name="mapLink"
                    type="url"
                    placeholder="https://maps.app.goo.gl/..."
                    value={formData.mapLink}
                    onChange={handleChange}
                  />

                  <small className="form-help">
                    Paste the exact Google Maps sharing link
                    for this restaurant.
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="cuisine">
                    Cuisine
                  </label>

                  <select
                    id="cuisine"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                  >
                    <option value="Arabian">
                      Arabian
                    </option>

                    <option value="Indian">
                      Indian
                    </option>

                    <option value="Mixed">
                      Mixed
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priceRange">
                    Price Range *
                  </label>

                  <select
                    id="priceRange"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select price range
                    </option>

                    <option value="₹200 - ₹450">
                      ₹200 - ₹450
                    </option>

                    <option value="₹250 - ₹500">
                      ₹250 - ₹500
                    </option>

                    <option value="₹300 - ₹600">
                      ₹300 - ₹600
                    </option>

                    <option value="₹300 - ₹650">
                      ₹300 - ₹650
                    </option>
                  </select>
                </div>

                <div className="form-group form-full">
                  <label htmlFor="description">
                    Description *
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </section>

            {/* Contact */}

            <section className="form-section">
              <div className="form-section-heading">
                <h2>Contact & Hours</h2>
                <p>
                  Update contact information.
                </p>
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="website">
                    Website
                  </label>

                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="openingTime">
                    Opening Time
                  </label>

                  <input
                    id="openingTime"
                    name="openingTime"
                    type="time"
                    value={formData.openingTime}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="closingTime">
                    Closing Time
                  </label>

                  <input
                    id="closingTime"
                    name="closingTime"
                    type="time"
                    value={formData.closingTime}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </section>

            {/* Image */}

            <section className="form-section">
              <div className="form-section-heading">
                <h2>Restaurant Image</h2>
                <p>
                  Update the restaurant image and rating.
                </p>
              </div>

              <div className="form-grid">

                <div className="form-group form-full">
                  <label htmlFor="image">
                    Image URL
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rating">
                    Rating
                  </label>

                  <input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </section>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <div className="form-actions">

              <Link
                to="/admin/dashboard"
                className="secondary-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="primary-btn"
              >
                <Save size={17} />
                Save Changes
              </button>

            </div>

          </form>
        </div>
      </main>
    </>
  );
}

export default EditMandi;