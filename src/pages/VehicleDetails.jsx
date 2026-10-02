import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import vehicles from "../data/vehicles";
import { useVehicleContext } from "../context/VehicleContext";
import ColorVariants from "../components/ColorVariants";

function VehicleDetails() {
  const { id } = useParams();

  const vehicle = vehicles.find(
    (item) => item.id === Number(id)
  );

  const {
    favoriteIds,
    compareIds,
    toggleFavorite,
    toggleCompare,
  } = useVehicleContext();

  const [selectedImage, setSelectedImage] = useState(
    vehicle?.images?.[0] || vehicle?.image
  );

  if (!vehicle) {
    return (
      <main className="details-page">
        <div className="details-not-found">
          <h1>Vehicle Not Found</h1>
          <p>
            Sorry, the vehicle you are looking for is no longer available.
          </p>
          <Link to="/vehicles" className="primary-btn">
            Back to Vehicles
          </Link>
        </div>
      </main>
    );
  }

  const isFavorite = favoriteIds.includes(vehicle.id);
  const isCompared = compareIds.includes(vehicle.id);

  const shareVehicle = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${vehicle.brand} ${vehicle.model}`,
          text: `Check out this ${vehicle.brand} ${vehicle.model} on DriveNest.`,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Vehicle link copied!");
      } else {
        alert("Sharing is not supported in this browser.");
      }
    } catch {
      console.log("Share cancelled");
    }
  };

  return (
    <main className="details-page">
      <div className="details-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/vehicles">Vehicles</Link>
          <span>/</span>
          <span>
            {vehicle.brand} {vehicle.model}
          </span>
        </div>

        <section className="details-top">
          <div className="details-gallery">
            <div className="main-image">
              <img
                src={selectedImage}
                alt={`${vehicle.brand} ${vehicle.model}`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/vehicle-1.jpg";
                }}
              />
            </div>

            <div className="thumbnail-list">
              {(vehicle.images || [vehicle.image]).map((image, index) => (
                <button
                  type="button"
                  key={index}
                  className={
                    selectedImage === image
                      ? "thumbnail selected-thumbnail"
                      : "thumbnail"
                  }
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${vehicle.brand} ${vehicle.model} ${index + 1}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/vehicle-1.jpg";
                    }}
                  />
                </button>
              ))}
            </div>

            <ColorVariants
              vehicle={vehicle}
              vehicles={vehicles}
            />
          </div>

          <div className="details-info">
            <p className="details-type">{vehicle.type}</p>

            <h1>
              {vehicle.brand} {vehicle.model}
            </h1>

            <p className="details-variant">{vehicle.variant}</p>

            <h2 className="details-price">
              ₹{Number(vehicle.price).toLocaleString("en-IN")}
            </h2>

            <p className="details-location">
              📍 {vehicle.location}
            </p>

            <div className="details-actions">
              <button
                type="button"
                className={`primary-btn ${
                  isFavorite ? "favorite-details-active" : ""
                }`}
                onClick={() => toggleFavorite(vehicle.id)}
              >
                {isFavorite ? "♥ Saved" : "♡ Add to Favorites"}
              </button>

              <button
                type="button"
                className={`secondary-btn ${
                  isCompared ? "compare-details-active" : ""
                }`}
                onClick={() => toggleCompare(vehicle.id)}
              >
                {isCompared ? "✓ Compared" : "Compare"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={shareVehicle}
              >
                Share
              </button>
            </div>

            <div className="details-contact-actions">
              <Link to="/contact" className="primary-btn">
                Contact Seller
              </Link>

              {isCompared && (
                <Link to="/compare" className="secondary-btn">
                  View Comparison
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="details-section">
          <h2>Vehicle Information</h2>

          <div className="spec-grid">
            <div className="spec-item"><span>Brand</span><strong>{vehicle.brand}</strong></div>
            <div className="spec-item"><span>Model</span><strong>{vehicle.model}</strong></div>
            <div className="spec-item"><span>Variant</span><strong>{vehicle.variant}</strong></div>
            <div className="spec-item"><span>Manufacturing Year</span><strong>{vehicle.manufacturingYear}</strong></div>
            <div className="spec-item"><span>Registration Year</span><strong>{vehicle.registrationYear}</strong></div>
            <div className="spec-item"><span>Price</span><strong>₹{Number(vehicle.price).toLocaleString("en-IN")}</strong></div>
            <div className="spec-item"><span>Kilometers Driven</span><strong>{Number(vehicle.kilometers).toLocaleString("en-IN")} km</strong></div>
            <div className="spec-item"><span>Fuel Type</span><strong>{vehicle.fuel}</strong></div>
            <div className="spec-item"><span>Transmission</span><strong>{vehicle.transmission}</strong></div>
            <div className="spec-item"><span>Number of Owners</span><strong>{vehicle.owners}</strong></div>
            <div className="spec-item"><span>Condition</span><strong>{vehicle.condition}</strong></div>
            <div className="spec-item"><span>Color</span><strong>{vehicle.color}</strong></div>
            <div className="spec-item"><span>Location</span><strong>{vehicle.location}</strong></div>
          </div>
        </section>

        <section className="details-section">
          <h2>Description</h2>
          <p className="vehicle-description">{vehicle.description}</p>
        </section>

        <section className="details-section">
          <h2>Features</h2>
          <div className="features-grid">
            {(vehicle.features || []).map((feature, index) => (
              <div className="feature-item" key={index}>
                ✓ {feature}
              </div>
            ))}
          </div>
        </section>

        <section className="details-section">
          <h2>Seller Information</h2>
          <div className="seller-box">
            <div>
              <h3>{vehicle.seller.name}</h3>
              <p>📍 {vehicle.seller.location}</p>
            </div>

            <div className="seller-actions">
              <Link to="/contact" className="primary-btn">
                Contact Seller
              </Link>
              <Link to="/contact" className="secondary-btn">
                Message Seller
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default VehicleDetails;
