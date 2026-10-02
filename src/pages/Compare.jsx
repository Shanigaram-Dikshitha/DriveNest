import { Link } from "react-router-dom";
import { useVehicleContext } from "../context/VehicleContext";
import vehicles from "../data/vehicles";

function Compare() {
  const {
    compareIds,
    removeCompare,
    clearCompare,
  } = useVehicleContext();

  const selectedVehicles = vehicles.filter((vehicle) =>
    compareIds.includes(vehicle.id)
  );

  if (selectedVehicles.length === 0) {
    return (
      <main className="compare-page">
        <div className="compare-container">
          <div className="compare-empty">
            <h2>No Vehicles Selected</h2>
            <p>
              Add vehicles from the Vehicles page to compare
              them side by side.
            </p>
            <Link to="/vehicles" className="primary-btn">
              Browse Vehicles
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const comparisonRows = [
    ["Brand", (vehicle) => vehicle.brand],
    ["Model", (vehicle) => vehicle.model],
    ["Vehicle Type", (vehicle) => vehicle.type],
    ["Manufacturing Year", (vehicle) => vehicle.manufacturingYear],
    ["Registration Year", (vehicle) => vehicle.registrationYear],
    ["Price", (vehicle) => `₹${Number(vehicle.price).toLocaleString("en-IN")}`],
    [
      "Kilometers Driven",
      (vehicle) => `${Number(vehicle.kilometers).toLocaleString("en-IN")} km`,
    ],
    ["Fuel Type", (vehicle) => vehicle.fuel],
    ["Transmission", (vehicle) => vehicle.transmission],
    ["Owners", (vehicle) => vehicle.owners],
    ["Condition", (vehicle) => vehicle.condition],
    ["Color", (vehicle) => vehicle.color],
    ["Location", (vehicle) => vehicle.location],
  ];

  return (
    <main className="compare-page">
      <div className="compare-container">
        <div className="compare-header">
          <p className="details-type">VEHICLE COMPARISON</p>
          <h1>Compare Vehicles</h1>
          <p>
            Compare your selected vehicles side by side.
          </p>
        </div>

        <div className="compare-controls">
          <p>
            {selectedVehicles.length} vehicle
            {selectedVehicles.length !== 1 ? "s" : ""} selected
          </p>

          <button
            type="button"
            className="clear-compare-btn"
            onClick={clearCompare}
          >
            Clear Comparison
          </button>
        </div>

        <div className="compare-table-wrapper">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>

                {selectedVehicles.map((vehicle) => (
                  <th key={vehicle.id}>
                    <div className="compare-vehicle-card">
                      <Link to={`/vehicles/${vehicle.id}`}>
                        <img
                          src={vehicle.image}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          className="compare-vehicle-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "/images/vehicle-1.jpg";
                          }}
                        />
                      </Link>

                      <div className="compare-vehicle-name">
                        {vehicle.brand} {vehicle.model}
                      </div>

                      <div className="compare-vehicle-variant">
                        {vehicle.variant}
                      </div>

                      <button
                        type="button"
                        className="remove-compare-btn"
                        onClick={() => removeCompare(vehicle.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map(([label, getValue]) => (
                <tr key={label}>
                  <td>{label}</td>

                  {selectedVehicles.map((vehicle) => (
                    <td key={vehicle.id}>
                      <span className="compare-value-strong">
                        {getValue(vehicle)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 20 }}>
          <Link to="/vehicles" className="primary-btn">
            Add More Vehicles
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Compare;
