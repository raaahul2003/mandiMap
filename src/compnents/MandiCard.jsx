import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

function MandiCard({ mandi }) {
  return (
    <article className="mandi-card">
      <img src={mandi.image} alt={mandi.name} />

      <div className="mandi-card-content">
        <div className="mandi-card-top">
          <span className="mandi-cuisine">
            {mandi.cuisine}
          </span>

          <span className="mandi-rating">
            <Star size={14} fill="currentColor" />
            {mandi.rating}
          </span>
        </div>

        <h3>{mandi.name}</h3>

        <p className="mandi-location">
          <MapPin size={15} />
          {mandi.location}
        </p>

        <p className="mandi-description">
          {mandi.description}
        </p>

        <div className="mandi-card-bottom">
          <span>{mandi.priceRange}</span>

          <Link to={`/mandi/${mandi.id}`}>
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default MandiCard;