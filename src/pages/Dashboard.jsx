import { Link, useNavigate } from "react-router-dom";

import { useVehicleContext } from "../context/VehicleContext";

import "./Dashboard.css";

function getStorageArray(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function Dashboard() {
  const navigate = useNavigate();

  const { favoriteIds, compareIds } = useVehicleContext();

  const userData = (() => {
    try {
      return JSON.parse(localStorage.getItem("userData")) || null;
    } catch {
      return null;
    }
  })();

  const listings = getStorageArray("sellerListings");
  const enquiries = getStorageArray("enquiries");

  const userName = userData?.fullName || "User";
  const userEmail = userData?.email || "Not available";
  const userMobile = userData?.mobile || "Not available";
  const userCity = userData?.city || "Not available";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("rememberMe");

    navigate("/login");
  };

  return (
    <main className="clean-dashboard">
      <div className="clean-dashboard-container">

        {/* Dashboard Header */}
        <section className="dashboard-top">

          <div>
            <span className="dashboard-small-title">
              MY ACCOUNT
            </span>

            <h1>
              Welcome, {userName} 👋
            </h1>

            <p>
              Manage your DriveNest account from one place.
            </p>
          </div>

          <button
            type="button"
            className="dashboard-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </section>

        {/* Statistics */}
        <section className="dashboard-stats-row">

          <Link
            to="/dashboard/listings"
            className="clean-stat-card"
          >
            <span className="stat-icon">🚗</span>

            <div>
              <strong>{listings.length}</strong>
              <span>My Listings</span>
            </div>
          </Link>

          <Link
            to="/favorites"
            className="clean-stat-card"
          >
            <span className="stat-icon">❤️</span>

            <div>
              <strong>{favoriteIds.length}</strong>
              <span>Favorites</span>
            </div>
          </Link>

          <Link
            to="/compare"
            className="clean-stat-card"
          >
            <span className="stat-icon">⚖️</span>

            <div>
              <strong>{compareIds.length}</strong>
              <span>Compared</span>
            </div>
          </Link>

          <Link
            to="/enquiries"
            className="clean-stat-card"
          >
            <span className="stat-icon">📩</span>

            <div>
              <strong>{enquiries.length}</strong>
              <span>Enquiries</span>
            </div>
          </Link>

        </section>

        {/* Profile */}
        <section className="dashboard-profile-section">

          <div className="dashboard-section-title">
            <div>
              <span>ACCOUNT</span>
              <h2>Profile</h2>
            </div>

            <button
              type="button"
              className="dashboard-edit"
              onClick={() => navigate("/dashboard/edit-profile")}
            >
              Edit Profile
            </button>
          </div>

          <div className="dashboard-profile-card">

            <div className="profile-main">
              <div className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{userName}</h3>
                <p>{userEmail}</p>
              </div>
            </div>

            <div className="profile-details">

              <div>
                <span>Mobile</span>
                <strong>{userMobile}</strong>
              </div>

              <div>
                <span>City</span>
                <strong>{userCity}</strong>
              </div>

            </div>

          </div>

        </section>

        {/* Quick Access */}
        <section className="dashboard-actions-section">

          <div className="dashboard-section-title">
            <div>
              <span>QUICK ACCESS</span>
              <h2>What would you like to do?</h2>
            </div>
          </div>

          <div className="dashboard-actions-grid">

            <Link
              to="/dashboard/listings"
              className="dashboard-action"
            >
              <span>🚗</span>

              <div>
                <h3>My Listings</h3>
                <p>Manage your listings</p>
              </div>

              <b>→</b>
            </Link>

            <Link
              to="/favorites"
              className="dashboard-action"
            >
              <span>❤️</span>

              <div>
                <h3>Favorites</h3>
                <p>View saved vehicles</p>
              </div>

              <b>→</b>
            </Link>

            <Link
              to="/compare"
              className="dashboard-action"
            >
              <span>⚖️</span>

              <div>
                <h3>Compare</h3>
                <p>Compare selected vehicles</p>
              </div>

              <b>→</b>
            </Link>

            <Link
              to="/enquiries"
              className="dashboard-action"
            >
              <span>📩</span>

              <div>
                <h3>Enquiries</h3>
                <p>View your enquiries</p>
              </div>

              <b>→</b>
            </Link>

            <Link
              to="/sell"
              className="dashboard-action"
            >
              <span>➕</span>

              <div>
                <h3>Sell Vehicle</h3>
                <p>Create a new listing</p>
              </div>

              <b>→</b>
            </Link>

            <Link
              to="/vehicles"
              className="dashboard-action"
            >
              <span>🔍</span>

              <div>
                <h3>Browse Vehicles</h3>
                <p>Find your next vehicle</p>
              </div>

              <b>→</b>
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}

export default Dashboard;