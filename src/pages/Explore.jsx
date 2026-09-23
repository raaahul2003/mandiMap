import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    MapPin,
    Search,
    Utensils,
} from "lucide-react";

import { districts } from "../data/mockData";
import Navbar from "../compnents/Navbar";
import { getMandis } from "../services/mandiAPI";


function Explore() {
    const [search, setSearch] = useState("");
    const [mandis, setMandis] = useState([])

    const filteredDistricts = useMemo(() => {
        return districts.filter((district) =>
            district.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const getMandiCount = (district) => {
        return mandis.filter(
            (mandi) => mandi.district === district
        ).length;
    };

    useEffect(() => {
        async function loadMandis() {
            try {
                const data = await getMandis();
                setMandis(data)

            } catch (error) {
                console.error("Failed to load mandis:", error);
            }
        }
        loadMandis();
    }, [])

    return (
        <>
            <Navbar />

            <main className="explore-page">

                {/* HEADER */}

                <section className="explore-header">

                    <div>
                        <span className="section-label">
                            EXPLORE KERALA
                        </span>

                        <h1>
                            Find your next mandi
                        </h1>

                        <p>
                            Choose a district and discover
                            mandi restaurants across Kerala.
                        </p>
                    </div>

                    <div className="district-search">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search district..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                </section>


                {/* MAP */}

                <section className="map-section">

                    <div className="map-heading">

                        <div>
                            <h2>Explore Kerala</h2>

                            <p>
                                Select a district to explore
                                local mandi restaurants.
                            </p>
                        </div>

                        <div className="map-count">
                            <MapPin size={16} />
                            14 Districts
                        </div>

                    </div>


                    <div className="kerala-map-wrapper">

                        <div className="kerala-map">

                            <div className="map-shape">

                                <div className="map-decoration map-one">
                                    <Utensils size={18} />
                                </div>

                                <div className="map-decoration map-two">
                                    <MapPin size={18} />
                                </div>

                                <div className="map-center">

                                    <MapPin size={28} />

                                    <strong>Kerala</strong>

                                    <span>
                                        14 Districts
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="map-info">

                            <span className="map-info-label">
                                DISCOVER
                            </span>

                            <h3>
                                Mandi across Kerala
                            </h3>

                            <p>
                                From Kasaragod to
                                Thiruvananthapuram, explore
                                mandi restaurants district by
                                district.
                            </p>

                            <div className="map-stat">

                                <strong>14</strong>

                                <span>Districts</span>

                            </div>

                        </div>

                    </div>

                </section>


                {/* DISTRICT LIST */}

                <section className="all-districts">

                    <div className="section-heading">

                        <div>
                            <span className="section-label">
                                ALL DISTRICTS
                            </span>

                            <h2>
                                Browse by district
                            </h2>

                            <p>
                                Select a district to see available
                                mandi restaurants.
                            </p>
                        </div>

                    </div>


                    {filteredDistricts.length > 0 ? (

                        <div className="explore-district-grid">

                           

                            {filteredDistricts.map((district, index) => {

                                const count = getMandiCount(district);

                                return (
                                    <Link
                                        key={district}
                                        to={`/district/${district}`}
                                        className="explore-district-card"
                                    >

                                        <div className="district-number">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <div className="district-main">

                                            <div className="district-icon">
                                                <MapPin size={17} />
                                            </div>

                                            <div>

                                                <h3>
                                                    {district}
                                                </h3>

                                                <span>
                                                    {count}{" "}
                                                    {count == 1
                                                        ? "Mandi"
                                                        : "Mandis"}
                                                </span>

                                            </div>

                                        </div>

                                        <ArrowRight size={17} />

                                    </Link>
                                );
                            })}

                        </div>

                    ) : (

                        <div className="explore-empty">

                            <Search size={28} />

                            <h3>
                                No district found
                            </h3>

                            <p>
                                Try searching for another
                                Kerala district.
                            </p>

                        </div>

                    )}

                </section>


                {/* BOTTOM CTA */}

                <section className="explore-cta">

                    <div>

                        <span className="section-label">
                            KNOW A GREAT PLACE?
                        </span>

                        <h2>
                            Add a mandi to MandiMap
                        </h2>

                        <p>
                            Help other food lovers discover
                            great mandi restaurants.
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

export default Explore;