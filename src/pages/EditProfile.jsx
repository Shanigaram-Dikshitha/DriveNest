import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./EditProfile.css";

function getUserData() {
  try {
    return JSON.parse(localStorage.getItem("userData")) || {};
  } catch {
    return {};
  }
}

function EditProfile() {
  const navigate = useNavigate();

  const savedUser = getUserData();

  const [formData, setFormData] = useState({
    fullName: savedUser.fullName || "",
    email: savedUser.email || "",
    mobile: savedUser.mobile || "",
    city: savedUser.city || "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[6-9][0-9]{9}$/.test(formData.mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const currentUserData = getUserData();

    const updatedUserData = {
      ...currentUserData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      city: formData.city.trim(),
    };

    localStorage.setItem(
      "userData",
      JSON.stringify(updatedUserData)
    );

    setSuccessMessage(
      "Your profile has been updated successfully."
    );
  };

  return (
    <main className="edit-profile-page">
      <div className="edit-profile-container">

        <div className="edit-profile-header">
          <span className="edit-profile-label">
            ACCOUNT
          </span>

          <h1>Edit Profile</h1>

          <p>
            Update your personal information and keep
            your DriveNest profile up to date.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="edit-profile-back"
        >
          ← Back to Dashboard
        </Link>

        <section className="edit-profile-card">

          <div className="edit-profile-card-header">
            <div>
              <span>PROFILE</span>
              <h2>Personal Information</h2>
            </div>
          </div>

          {successMessage && (
            <div className="edit-profile-success">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* FULL NAME */}
            <div className="edit-profile-group">
              <label htmlFor="fullName">
                Full Name *
              </label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              {errors.fullName && (
                <span className="edit-profile-error">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* EMAIL */}
            <div className="edit-profile-group">
              <label htmlFor="email">
                Email Address *
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />

              {errors.email && (
                <span className="edit-profile-error">
                  {errors.email}
                </span>
              )}
            </div>

            {/* MOBILE */}
            <div className="edit-profile-group">
              <label htmlFor="mobile">
                Mobile Number *
              </label>

              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />

              {errors.mobile && (
                <span className="edit-profile-error">
                  {errors.mobile}
                </span>
              )}
            </div>

            {/* CITY */}
            <div className="edit-profile-group">
              <label htmlFor="city">
                City *
              </label>

              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />

              {errors.city && (
                <span className="edit-profile-error">
                  {errors.city}
                </span>
              )}
            </div>

            <div className="edit-profile-actions">

              <button
                type="button"
                className="edit-profile-cancel"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-profile-save"
              >
                Save Changes
              </button>

            </div>

          </form>

        </section>

      </div>
    </main>
  );
}

export default EditProfile;