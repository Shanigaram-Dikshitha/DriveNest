import { Link } from "react-router-dom";
import vehicles from "../data/vehicles";
import VehicleCard from "../components/VehicleCard";
import { useVehicleContext } from "../context/VehicleContext";

function Favorites() {
  const { favoriteIds } = useVehicleContext();

  const favoriteVehicles = vehicles.filter((vehicle) =>
    favoriteIds.includes(vehicle.id)
  );

  return (
    <main className="favorites-page">

      <div className="favorites-container">

        {/* Header */}
        <div className="favorites-header">

          <p className="section-label">
            YOUR SAVED VEHICLES
          </p>

          <h1>Favorites</h1>

          <p>
            Vehicles you've saved for later.
          </p>

        </div>

        {/* Favorite Vehicles */}
        {favoriteVehicles.length > 0 ? (

          <div className="vehicle-grid">

            {favoriteVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))}

          </div>

        ) : (

          <div className="favorites-empty">

            <div className="empty-icon">
              ♡
            </div>

            <h2>
              No Favorite Vehicles Yet
            </h2>

            <p>
              Save vehicles you like and they
              will appear here.
            </p>

            <Link
              to="/vehicles"
              className="primary-btn"
            >
              Browse Vehicles
            </Link>

          </div>

        )}

      </div>

    </main>
  );
}

export default Favorites;