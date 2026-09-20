import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  MapPin,
  Search,
  Users,
  Utensils,
} from "lucide-react";
import Navbar from "../compnents/Navbar";
import Footer from "../compnents/Footer";
const features = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Find mandi restaurants across all 14 districts of Kerala.",
  },
  {
    icon: MapPin,
    title: "Explore Locally",
    description:
      "Browse restaurants by district and discover places near you.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Help fellow food lovers by adding mandi restaurants you know.",
  },
  {
    icon: Heart,
    title: "Built for Food Lovers",
    description:
      "A simple platform created to make discovering mandi easier.",
  },
];

function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">

        {/* Hero */}

        <section className="about-hero">
          <div className="about-hero-content">
            <span className="section-label">
              About MandiMap
            </span>

            <h1>
              Making it easier to discover
              <span> great mandi in Kerala.</span>
            </h1>

            <p>
              MandiMap is a community-driven platform for
              discovering mandi restaurants across Kerala,
              district by district.
            </p>

            <div className="about-hero-actions">
              <Link to="/explore" className="primary-btn">
                Explore Kerala
                <ArrowRight size={17} />
              </Link>

              <Link to="/add-mandi" className="secondary-btn">
                Add a Mandi
              </Link>
            </div>
          </div>

          <div className="about-hero-card">
            <div className="about-food-icon">
              <Utensils size={34} />
            </div>

            <strong>14 Districts</strong>
            <span>One place to discover mandi</span>
          </div>
        </section>

        {/* Story */}

        <section className="about-story">
          <div>
            <span className="section-label">
              Our Story
            </span>

            <h2>
              Discovering mandi,
              <br />
              one district at a time.
            </h2>
          </div>

          <div className="about-story-text">
            <p>
              Kerala has a vibrant food culture, and mandi has
              become a favorite for many food lovers. But finding
              a good mandi restaurant can often mean searching
              through multiple platforms.
            </p>

            <p>
              MandiMap brings these discoveries together in one
              simple place. Choose a district, explore restaurants,
              check the details, and find your next mandi
              destination.
            </p>
          </div>
        </section>

        {/* Features */}

        <section className="about-features">
          <div className="about-section-heading">
            <span className="section-label">
              What MandiMap Does
            </span>

            <h2>Simple. Local. Useful.</h2>

            <p>
              Everything you need to discover your next mandi
              spot.
            </p>
          </div>

          <div className="about-feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  className="about-feature-card"
                  key={feature.title}
                >
                  <div className="about-feature-icon">
                    <Icon size={21} />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}

        <section className="about-how">
          <div className="about-section-heading">
            <span className="section-label">
              How It Works
            </span>

            <h2>Find your next mandi in three steps.</h2>
          </div>

          <div className="about-steps">

            <div className="about-step">
              <span>01</span>
              <h3>Choose a district</h3>
              <p>
                Explore any of Kerala's 14 districts.
              </p>
            </div>

            <div className="about-step">
              <span>02</span>
              <h3>Find a mandi</h3>
              <p>
                Search restaurants and compare their details.
              </p>
            </div>

            <div className="about-step">
              <span>03</span>
              <h3>Visit the place</h3>
              <p>
                Use the Google Maps link to find the restaurant.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}

        <section className="about-cta">
          <div>
            <span className="section-label">
              Join the community
            </span>

            <h2>
              Know a mandi worth discovering?
            </h2>

            <p>
              Add it to MandiMap and help other food lovers
              find it.
            </p>
          </div>

          <Link to="/add-mandi" className="primary-btn">
            Add a Mandi
            <ArrowRight size={17} />
          </Link>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default About;