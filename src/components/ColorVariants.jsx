import { Link } from "react-router-dom";

function ColorVariants({ vehicle, vehicles }) {
  const relatedColorVehicles = vehicles.filter(
    (item) =>
      item.brand.toLowerCase() === vehicle.brand.toLowerCase() &&
      item.model.toLowerCase() === vehicle.model.toLowerCase()
  );

  return (
    <div className="related-colors">
      <h3>Available Colors</h3>

      <div className="related-color-list">
        {relatedColorVehicles.map((relatedVehicle) => (
          <Link
            key={relatedVehicle.id}
            to={`/vehicles/${relatedVehicle.id}`}
            className={
              relatedVehicle.id === vehicle.id
                ? "related-color-card selected-color-card"
                : "related-color-card"
            }
          >
            <img
              src={relatedVehicle.image}
              alt={`${relatedVehicle.brand} ${relatedVehicle.model} ${relatedVehicle.color}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/vehicle-1.jpg";
              }}
            />

            <div className="related-color-info">
              <strong>{relatedVehicle.color}</strong>

              <span>
                ₹
                {Number(relatedVehicle.price).toLocaleString("en-IN")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ColorVariants;
