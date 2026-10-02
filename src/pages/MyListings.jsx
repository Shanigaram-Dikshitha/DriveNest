import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import vehicles from "../data/vehicles";

import "./MyListings.css";

function getListings() {
  try {
    return JSON.parse(localStorage.getItem("sellerListings")) || [];
  } catch {
    return [];
  }
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function getAutomaticVehicleImage(listing) {
  // 1. If the user has manually selected an image, use it.
  if (listing.imageData) {
    return listing.imageData;
  }

  // 2. If an image filename was already saved, use it.
  if (listing.imageName) {
    return `/images/${listing.imageName}`;
  }

  const listingBrand = normalizeText(listing.brand);
  
  // Small correction for common spelling variation
  const listingModel = normalizeText(listing.model).replace(
    "inniva",
    "innova"
  );

  const listingColor = normalizeText(listing.color);

  if (!listingBrand && !listingModel) {
    return "";
  }

  let bestVehicle = null;
  let bestScore = 0;

  vehicles.forEach((vehicle) => {
    const vehicleBrand = normalizeText(vehicle.brand);
    const vehicleModel = normalizeText(vehicle.model);
    const vehicleColor = normalizeText(vehicle.color);

    let score = 0;

    // Brand match
    if (listingBrand && vehicleBrand === listingBrand) {
      score += 100;
    }

    // Model match
    if (listingModel && vehicleModel === listingModel) {
      score += 100;
    } else if (
      listingModel &&
      (
        vehicleModel.includes(listingModel) ||
        listingModel.includes(vehicleModel)
      )
    ) {
      score += 70;
    }

    // Color match
    if (
      listingColor &&
      vehicleColor &&
      vehicleColor === listingColor
    ) {
      score += 30;
    }

    if (score > bestScore) {
      bestScore = score;
      bestVehicle = vehicle;
    }
  });

  return bestVehicle?.image || "";
}

function ListingImage({ listing, alt }) {
  const [hasError, setHasError] = useState(false);

  const imageSource = getAutomaticVehicleImage(listing);

  if (!imageSource || hasError) {
    return (
      <div
        className="my-listing-no-image"
        aria-label="Vehicle image not available"
      >
        <div style={{ fontSize: "38px" }}>🚗</div>
        <span>No image available</span>
      </div>
    );
  }

  return (
    <img
      src={imageSource}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}

function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(getListings);

  const deleteListing = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmed) return;

    const updatedListings = listings.filter(
      (listing) => String(listing.id) !== String(id)
    );

    setListings(updatedListings);

    localStorage.setItem(
      "sellerListings",
      JSON.stringify(updatedListings)
    );
  };

  const continueEditing = (id) => {
    navigate(`/sell?editId=${id}`);
  };

  return (
    <main className="my-listings-page">
      <div className="my-listings-container">

        <div className="my-listings-header">
          <div>
            <span className="my-listings-label">
              DASHBOARD
            </span>

            <h1>My Listings</h1>

            <p>
              Manage your saved and submitted vehicle listings.
            </p>
          </div>

          <Link
            to="/sell"
            className="my-listings-add-btn"
          >
            + Sell Vehicle
          </Link>
        </div>

        <Link
          to="/dashboard"
          className="my-listings-back"
        >
          ← Back to Dashboard
        </Link>

        {listings.length === 0 ? (
          <section className="my-listings-empty">

            <div className="my-listings-empty-icon">
              🚗
            </div>

            <h2>No listings yet</h2>

            <p>
              Start a vehicle listing and save it as a draft
              or submit it for sale.
            </p>

            <Link
              to="/sell"
              className="my-listings-primary-btn"
            >
              Sell Your Vehicle
            </Link>

          </section>
        ) : (
          <section className="my-listings-grid">

            {listings.map((listing) => {

              const vehicleName = [
                listing.brand,
                listing.model,
              ]
                .filter(Boolean)
                .join(" ");

              const displayName =
                vehicleName || "Untitled Vehicle";

              const price = Number(listing.price || 0);

              const isDraft =
                listing.status !== "Submitted";

              return (
                <article
                  className="my-listing-card"
                  key={listing.id}
                >

                  <div className="my-listing-image-wrapper">

                    <ListingImage
                      listing={listing}
                      alt={displayName}
                    />

                    <span
                      className={`my-listing-status ${
                        isDraft
                          ? "draft"
                          : "submitted"
                      }`}
                    >
                      {isDraft
                        ? "Draft"
                        : "Submitted"}
                    </span>

                  </div>

                  <div className="my-listing-content">

                    <h2>
                      {displayName}
                    </h2>

                    <p className="my-listing-variant">
                      {listing.variant ||
                        "Vehicle details in progress"}
                    </p>

                    <div className="my-listing-info">

                      {listing.type && (
                        <span>
                          🚗 {listing.type}
                        </span>
                      )}

                      {listing.manufacturingYear && (
                        <span>
                          📅 {listing.manufacturingYear}
                        </span>
                      )}

                      {listing.kilometers && (
                        <span>
                          🛣️ {listing.kilometers} km
                        </span>
                      )}

                      {listing.fuel && (
                        <span>
                          ⛽ {listing.fuel}
                        </span>
                      )}

                    </div>

                    <div className="my-listing-bottom">

                      <strong>
                        {price > 0
                          ? `₹${price.toLocaleString("en-IN")}`
                          : "Price not added"}
                      </strong>

                      <span>
                        {listing.city ||
                          listing.state ||
                          "Location not added"}
                      </span>

                    </div>

                    {isDraft && (
                      <p
                        style={{
                          margin: "14px 0 0",
                          fontSize: "13px",
                          color: "#92400e",
                        }}
                      >
                        You can continue this listing
                        from where you stopped.
                      </p>
                    )}

                    <div className="my-listing-actions">

                      <button
                        type="button"
                        className="my-listing-edit"
                        onClick={() =>
                          continueEditing(listing.id)
                        }
                      >
                        {isDraft
                          ? "Continue Editing"
                          : "Edit Listing"}
                      </button>

                      <button
                        type="button"
                        className="my-listing-delete"
                        onClick={() =>
                          deleteListing(listing.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </section>
        )}

      </div>
    </main>
  );
}

export default MyListings;