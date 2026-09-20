import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  Star,
  Utensils,
} from "lucide-react";

import { getMandiById } from "../services/mandiAPI";
import Navbar from "../compnents/Navbar";
import { useEffect, useState } from "react";


function MandiDetails() {
  const { id } = useParams();
  const [mandi, setMandi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(mandi);
  

  useEffect(() => {
    async function loadMandi() {
      try {
        const data = await getMandiById(id);

        setMandi(data);
      } catch (error) {
        console.error(
          "Failed to load mandi:",
          error
        );

        setError("Unable to load mandi.");
      } finally {
        setLoading(false);
      }
    }

    loadMandi();
  }, [id]);

  if (!mandi) {
    return (
      <>
        <Navbar />

        <main className="details-page">
          <section className="details-not-found">
            <div className="details-not-found-icon">
              <Utensils size={28} />
            </div>

            <h1>Mandi Not Found</h1>

            <p>
              We couldn't find the mandi you're looking for.
            </p>

            <Link to="/explore" className="primary-btn">
              Explore Kerala
            </Link>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="details-page">
        <section className="details-container">

          <Link
            to={`/district/${mandi.district}`}
            className="back-link"
          >
            <ArrowLeft size={17} />
            Back to {mandi.district}
          </Link>

          <div className="details-layout">

            {/* Image */}
            <div className="details-image-wrapper">
              <img
                src={mandi.image}
                alt={mandi.name}
                className="details-image"
              />

              <span className="details-cuisine">
                {mandi.cuisine}
              </span>
            </div>

            {/* Information */}
            <div className="details-content">

              <div className="details-rating">
                <Star size={17} fill="currentColor" />
                <strong>{mandi.rating}</strong>
                <span>Excellent</span>
              </div>

              <h1>{mandi.name}</h1>

              <div className="details-location">
                <MapPin size={18} />
                <span>
                  {mandi.location}, {mandi.district}
                </span>
              </div>

              <p className="details-description">
                {mandi.description}
              </p>

              <div className="details-meta">

                <div className="details-meta-item">
                  <Utensils size={19} />
                  <div>
                    <span>Cuisine</span>
                    <strong>{mandi.cuisine}</strong>
                  </div>
                </div>

                <div className="details-meta-item">
                  <span className="price-symbol">₹</span>
                  <div>
                    <span>Price Range</span>
                    <strong>{mandi.priceRange}</strong>
                  </div>
                </div>

                <div className="details-meta-item">
                  <Clock size={19} />
                  <div>
                    <span>Opening Hours</span>
                    <strong>11:00 AM – 11:00 PM</strong>
                  </div>
                </div>

              </div>

              <div className="details-actions">
                <a
                  href={mandi.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-btn"
                >
                  <MapPin size={17} />
                  Get Directions
                </a>

                <button className="secondary-btn">
                  <Phone size={17} />
                  Call Restaurant
                </button>
              </div>

            </div>
          </div>

          {/* About */}
          <section className="details-section">

            <div className="details-section-heading">
              <span className="section-label">
                About this place
              </span>

              <h2>Why visit {mandi.name}?</h2>
            </div>

            <p>
              {mandi.description} Whether you're looking for
              a casual meal with friends or a family dining
              experience, this mandi spot offers a taste of
              Arabian-inspired cuisine in {mandi.district}.
            </p>

          </section>

          {/* Information cards */}
          <section className="details-info-grid">

            <div className="details-info-card">
              <div className="details-info-icon">
                <Clock size={20} />
              </div>

              <div>
                <span>Opening Hours</span>
                <strong>11:00 AM – 11:00 PM</strong>
                <small>Open every day</small>
              </div>
            </div>

            <div className="details-info-card">
              <div className="details-info-icon">
                <MapPin size={20} />
              </div>

              <div>
                <span>Location</span>
                <strong>{mandi.location}</strong>
                <small>{mandi.district}, Kerala</small>
              </div>
            </div>

            <div className="details-info-card">
              <div className="details-info-icon">
                <ExternalLink size={20} />
              </div>

              <div>
                <span>Discover More</span>
                <strong>MandiMap</strong>
                <small>Explore more mandi spots</small>
              </div>
            </div>

          </section>

        </section>
      </main>
    </>
  );
}

export default MandiDetails;