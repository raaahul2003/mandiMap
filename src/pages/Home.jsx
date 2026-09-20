import { Link } from "react-router-dom";

import {
  ArrowRight,
  MapPin,
  Star,
  Utensils
} from "lucide-react";

import Navbar from "../compnents/Navbar";
import { useEffect, useState } from "react";
import { getMandis } from "../services/mandiAPI";
import { districts } from "../data/mockData";


function Home() {
  const [mandis, setMandis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const featuredMandis = mandis.slice(0, 4);


  useEffect(() => {
    async function loadMandis() {
      try {
        const data = await getMandis();

        setMandis(data);
      } catch (error) {
        console.error("Failed to load mandis:", error);

        setError("Unable to load mandi data.");
      } finally {
        setLoading(false);
      }
    }

    loadMandis();
  }, []);

  return (
    <>
      <Navbar />

      <main>

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <div className="hero-badge">
              <MapPin size={14} />
              Kerala's Mandi Discovery Platform
            </div>

            <h1>
              Discover Kerala's
              <span> Best Mandi</span>
            </h1>

            <p>
              Explore mandi restaurants across Kerala,
              district by district. Find your next
              delicious destination.
            </p>

            <div className="hero-buttons">

              <Link
                to="/explore"
                className="primary-btn"
              >
                Explore Kerala
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/add-mandi"
                className="secondary-btn"
              >
                Add a Mandi
              </Link>

            </div>

          </div>

          <div className="hero-image">

            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950"
              alt="Mandi food"
            />

            <div className="hero-floating-card">

              <div className="floating-icon">
                <Utensils size={18} />
              </div>

              <div>
                <strong>Explore Mandis</strong>
                <span>Across 14 districts</span>
              </div>

            </div>

          </div>

        </section>


        {/* DISTRICTS */}

        <section className="district-section">

          <div className="section-heading">

            <div>
              <span className="section-label">
                EXPLORE KERALA
              </span>

              <h2>
                Find mandi in your district
              </h2>

              <p>
                Choose a district and discover
                mandi restaurants near you.
              </p>
            </div>

            <Link
              to="/explore"
              className="view-all"
            >
              View all
              <ArrowRight size={16} />
            </Link>

          </div>


          <div className="district-grid">

            {districts.map((district) => (

              <Link
                key={district}
                to={`/district/${district}`}
                className="district-card"
              >

                <MapPin size={17} />

                <span>{district}</span>

                <ArrowRight size={14} />

              </Link>

            ))}

          </div>

        </section>


        {/* FEATURED MANDIS */}

        <section className="featured-section">

          <div className="section-heading">

            <div>

              <span className="section-label">
                FEATURED
              </span>

              <h2>
                Popular mandi spots
              </h2>

              <p>
                Explore some of the popular mandi
                restaurants around Kerala.
              </p>

            </div>

            <Link
              to="/explore"
              className="view-all"
            >
              Explore all
              <ArrowRight size={16} />
            </Link>

          </div>


          {/* <div  className="mandi-grid">

            {featuredMandis.map((mandi) => (

              <Link
                key={mandi.id}
                to={`/mandi/${mandi.id}`}
                className="mandi-card"
              >

                <div className="mandi-image">

                  <img
                    src={mandi.image}
                    alt={mandi.name}
                  />

                  <span className="rating">
                    <Star size={13} fill="currentColor" />
                    {mandi.rating}
                  </span>

                </div>

                <div className="mandi-card-content">

                  <h3>{mandi.name}</h3>

                  <div className="location">
                    <MapPin size={14} />
                    {mandi.location}
                  </div>

                  <div className="mandi-meta">

                    <span>
                      {mandi.cuisine}
                    </span>

                    <span>
                      {mandi.priceRange}
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div> */}

          <div className="mandi-grid">

            {loading && (
              <p>Loading mandi restaurants...</p>
            )}

            {error && (
              <p>{error}</p>
            )}

            {!loading &&
              !error &&
              featuredMandis.map((mandi) => (
                <Link
                  key={mandi.id}
                  to={`/mandi/${mandi.id}`}
                  className="mandi-card"
                >
                  <div className="mandi-image">

                    <img
                      src={mandi.image}
                      alt={mandi.name}
                    />

                    <span className="rating">
                      <Star
                        size={13}
                        fill="currentColor"
                      />
                      {mandi.rating}
                    </span>

                  </div>

                  <div className="mandi-card-content">

                    <h3>{mandi.name}</h3>

                    <div className="location">
                      <MapPin size={14} />
                      {mandi.location}
                    </div>

                    <div className="mandi-meta">

                      <span>{mandi.cuisine}</span>

                      <span>{mandi.priceRange}</span>

                    </div>

                  </div>
                </Link>
              ))}
          </div>

        </section>


        {/* HOW IT WORKS */}

        <section className="how-section">

          <div className="center-heading">

            <span className="section-label">
              SIMPLE DISCOVERY
            </span>

            <h2>
              Find your mandi in three steps
            </h2>

          </div>


          <div className="steps">

            <div className="step">
              <span>01</span>
              <h3>Choose a District</h3>
              <p>
                Select any district across Kerala.
              </p>
            </div>

            <div className="step">
              <span>02</span>
              <h3>Discover Mandi</h3>
              <p>
                Browse restaurants and compare
                your options.
              </p>
            </div>

            <div className="step">
              <span>03</span>
              <h3>Enjoy Your Meal</h3>
              <p>
                Pick your favorite place and enjoy.
              </p>
            </div>

          </div>

        </section>


        {/* COMMUNITY CTA */}

        <section className="community-section">

          <div>

            <span className="section-label">
              COMMUNITY
            </span>

            <h2>
              Know a great mandi?
            </h2>

            <p>
              Help others discover it by adding
              it to MandiMap.
            </p>

          </div>

          <Link
            to="/add-mandi"
            className="primary-btn"
          >
            Add a Mandi
            <ArrowRight size={17} />
          </Link>

        </section>

      </main>
    </>
  );
}

export default Home;