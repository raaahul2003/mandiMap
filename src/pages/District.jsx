import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ArrowLeft, Search, Utensils } from "lucide-react";

import { districts } from "../data/mockData";
import Navbar from "../compnents/Navbar";
import MandiCard from "../compnents/MandiCard";
import { getMandis } from "../services/mandiAPI";

function District() {
  const { districtName } = useParams();

  // -----------------------------
  // STATE
  // -----------------------------

  // API state
  const [mandis, setMandis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------
  // GET DISTRICT
  // -----------------------------

  const district = districts.find(
    (item) =>
      item.toLowerCase() === districtName.toLowerCase()
  );

  // -----------------------------
  // FETCH MANDIS FROM API
  // -----------------------------

  useEffect(() => {
    async function loadMandis() {
      try {
        const data = await getMandis();

        setMandis(data);
      } catch (error) {
        console.error(
          "Failed to load mandis:",
          error
        );

        setError(
          "Unable to load mandi data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadMandis();
  }, []);

  // -----------------------------
  // FILTER BY DISTRICT
  // -----------------------------

  const districtMandis = useMemo(() => {
    if (!district) return [];

    return mandis.filter(
      (mandi) =>
        mandi.district.toLowerCase() ===
        district.toLowerCase()
    );
  }, [mandis, district]);

  // -----------------------------
  // SEARCH + FILTER + SORT
  // -----------------------------

  const filteredMandis = useMemo(() => {
    return [...districtMandis];
  }, [districtMandis]);

  // -----------------------------
  // DISTRICT NOT FOUND
  // -----------------------------

  if (!district) {
    return (
      <>
        <Navbar />

        <main className="district-page">
          <section className="district-not-found">

            <div className="district-not-found-icon">
              <Utensils size={28} />
            </div>

            <h1>District Not Found</h1>

            <p>
              We couldn't find the district you're
              looking for.
            </p>

            <Link
              to="/explore"
              className="primary-btn"
            >
              Explore Kerala
            </Link>

          </section>
        </main>
      </>
    );
  }

  // -----------------------------
  // MAIN PAGE
  // -----------------------------

  return (
    <>
      <Navbar />

      <main className="district-page">

        {/* =========================
            HEADER
        ========================= */}

        <section className="district-header">

          <Link
            to="/explore"
            className="back-link"
          >
            <ArrowLeft size={17} />
            Back to Explore
          </Link>

          <div className="district-title-row">

            <div>

              <span className="section-label">
                Kerala District
              </span>

              <h1>
                Mandis in {district}
              </h1>

              <p>
                Discover mandi restaurants and find
                your next delicious destination in{" "}
                {district}.
              </p>

            </div>

            <div className="district-count">

              <Utensils size={18} />

              <strong>
                {loading
                  ? "..."
                  : districtMandis.length}
              </strong>

              <span>
                Mandi Spots
              </span>

            </div>

          </div>

        </section>

        {/* =========================
            RESULTS
        ========================= */}

        <section className="district-results">

          <div className="results-heading">

            <div>

              <h2>
                {filteredMandis.length}{" "}
                {filteredMandis.length === 1
                  ? "Mandi"
                  : "Mandis"}{" "}
                Found
              </h2>

              <p>
                Showing mandi restaurants in{" "}
                {district}
              </p>

            </div>

          </div>

          {/* Loading */}

          {loading && (

            <div className="district-empty">

              <div className="district-empty-icon">
                <Utensils size={25} />
              </div>

              <h3>
                Loading mandis...
              </h3>

              <p>
                Please wait while we load the
                restaurants.
              </p>

            </div>

          )}

          {/* Error */}

          {!loading && error && (

            <div className="district-empty">

              <div className="district-empty-icon">
                <Search size={25} />
              </div>

              <h3>
                Unable to load mandis
              </h3>

              <p>
                {error}
              </p>

            </div>

          )}

          {/* Results */}

          {!loading &&
            !error &&
            filteredMandis.length > 0 && (

              <div className="mandi-grid">

                {filteredMandis.map((mandi) => (

                  <MandiCard
                    key={mandi.id}
                    mandi={mandi}
                  />

                ))}

              </div>

            )}

          {/* Empty */}

          {!loading &&
            !error &&
            filteredMandis.length === 0 && (

              <div className="district-empty">

                <div className="district-empty-icon">
                  <Search size={25} />
                </div>

                <h3>
                  No mandis found
                </h3>

                <p>
                  Try changing your search or
                  filters to find more mandi
                  restaurants.
                </p>

                <Link to="/explore" className="primary-btn">
                  Explore More
                </Link>

              </div>

            )}

        </section>

        {/* =========================
            BOTTOM CTA
        ========================= */}

        <section className="district-bottom-cta">

          <div>

            <span className="section-label">
              Know a great spot?
            </span>

            <h2>
              Add a mandi to {district}
            </h2>

            <p>
              Help other food lovers discover a
              mandi restaurant in your area.
            </p>

          </div>

          <Link
            to="/add-mandi"
            className="primary-btn"
          >
            Add a Mandi
          </Link>

        </section>

      </main>
    </>
  );
}

export default District;