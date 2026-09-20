import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

import { districts } from "../data/mockData";
import { createMandi } from "../services/mandiAPI";
import Navbar from "../compnents/Navbar";

function AddMandi() {
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

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Restaurant name is required.");
      return;
    }

    if (!formData.district) {
      setError("Please select a district.");
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

    if (!formData.priceRange) {
      setError("Please select a price range.");
      return;
    }



    try {
      const newMandi = await createMandi({
        ...formData,
        rating: formData.rating
          ? Number(formData.rating)
          : 0,
      });

      console.log("Created mandi:", newMandi);

      alert("Mandi added successfully!");

      navigate(
        `/district/${newMandi.district}`
      );
    } catch (error) {
      console.error(
        "Failed to create mandi:",
        error
      );

      setError(
        "Unable to add mandi. Please try again."
      );
    }
  }

  return (
    <>
      <Navbar />

      <main className="add-mandi-page">
        <div className="add-mandi-container">

          <Link to="/explore" className="back-link">
            <ArrowLeft size={17} />
            Back to Explore
          </Link>

          <div className="add-mandi-header">
            <span className="section-label">
              Community Contribution
            </span>

            <h1>Add a Mandi</h1>

            <p>
              Know a great mandi restaurant in Kerala?
              Help others discover it by adding it to MandiMap.
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
                  Tell us about the restaurant.
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
                    placeholder="e.g. Mandi House"
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
                    placeholder="e.g. Palakkad Town"
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
                    placeholder="https://maps.google.com/..."
                    value={formData.mapLink}
                    onChange={handleChange}
                  />

                  <small className="form-help">
                    Open the restaurant in Google Maps, choose Share, and paste the link here.
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
                    placeholder="Describe the mandi restaurant..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </section>

            {/* Contact Information */}

            <section className="form-section">
              <div className="form-section-heading">
                <h2>Contact & Hours</h2>
                <p>
                  Optional restaurant contact information.
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
                    placeholder="+91 98765 43210"
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
                    placeholder="https://example.com"
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
                  Add an image URL for the restaurant.
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
                    placeholder="https://images.unsplash.com/..."
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
                    placeholder="4.5"
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
                to="/explore"
                className="secondary-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="primary-btn"
              >
                <Plus size={17} />
                Add Mandi
              </button>

            </div>

          </form>
        </div>
      </main>
    </>
  );
}

export default AddMandi;