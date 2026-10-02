import { Link } from "react-router-dom";
import { useVehicleContext } from "../context/VehicleContext";

function VehicleCard({ vehicle }) {
  const {
    favoriteIds,
    compareIds,
    toggleFavorite,
    toggleCompare,
  } = useVehicleContext();

  const isFavorite = favoriteIds.includes(vehicle.id);
  const isCompared = compareIds.includes(vehicle.id);

  return (
    <article className="vehicle-card">

      <div className="vehicle-image-container">

        {/* Click the image to open Vehicle Details */}
        <Link
          to={`/vehicles/${vehicle.id}`}
          className="vehicle-image-link"
        >
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="vehicle-image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "/images/vehicle-1.jpg";
            }}
          />
        </Link>

        <button
          type="button"
          className={`favorite-btn ${
            isFavorite
              ? "favorite-active"
              : ""
          }`}
          onClick={() =>
            toggleFavorite(vehicle.id)
          }
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>

      </div>

      <div className="vehicle-card-content">

        <p className="vehicle-type">
          {vehicle.type}
        </p>

        <h3>
          {vehicle.brand} {vehicle.model}
        </h3>

        <p className="vehicle-variant">
          {vehicle.variant}
        </p>

        <div className="vehicle-price">
          ₹{vehicle.price.toLocaleString("en-IN")}
        </div>

        <div className="vehicle-meta">

          <span>
            {vehicle.manufacturingYear}
          </span>

          <span>
            {vehicle.kilometers.toLocaleString("en-IN")} km
          </span>

          <span>
            {vehicle.fuel}
          </span>

          <span>
            {vehicle.transmission}
          </span>

        </div>

        <p className="vehicle-location">
          📍 {vehicle.location}
        </p>

        <div className="card-actions">

          <Link
            to={`/vehicles/${vehicle.id}`}
            className="view-details-btn"
          >
            View Details
          </Link>

          <button
            type="button"
            className={`compare-btn ${
              isCompared
                ? "compare-active"
                : ""
            }`}
            onClick={() =>
              toggleCompare(vehicle.id)
            }
          >
            {isCompared
              ? "✓ Compared"
              : "Compare"}
          </button>

        </div>

      </div>
    </article>
  );
}

export default VehicleCard;