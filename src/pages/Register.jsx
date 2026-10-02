import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setRegisteredPassword } from "../utils/mockAuth";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    city: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    setMessage("");
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
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City/location is required.";
    }

    if (!formData.terms) {
      newErrors.terms =
        "You must accept the terms and conditions.";
    }

    return newErrors;
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    /*
      Mock frontend registration.
      User data is stored in localStorage.
    */

    const userData = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      city: formData.city.trim(),
    };
    await setRegisteredPassword(
  formData.password
);

    localStorage.setItem(
      "userData",
      JSON.stringify(userData)
    );

    setMessage(
      "Account created successfully! Redirecting to login..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        {/* Left Section */}
        <div className="auth-intro">

          <p className="section-label">
            JOIN DRIVENEST
          </p>

          <h1>Create Your Account</h1>

          <p>
            Create your DriveNest account to save vehicles,
            manage listings and compare your favorite options.
          </p>

          <div className="auth-benefits">

            <div>
              <span>✓</span>
              Save favorite vehicles
            </div>

            <div>
              <span>✓</span>
              Manage your listings
            </div>

            <div>
              <span>✓</span>
              Compare vehicles
            </div>

            <div>
              <span>✓</span>
              Contact sellers
            </div>

          </div>
        </div>

        {/* Registration Card */}
        <section className="auth-card register-card">

          <div className="auth-card-header">
            <h2>Register</h2>
            <p>Fill in your details to create an account.</p>
          </div>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">
                Full Name
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
                <p className="form-error">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="form-error">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label htmlFor="mobile">
                Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
              />

              {errors.mobile && (
                <p className="form-error">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="registerPassword">
                Password
              </label>

              <input
                id="registerPassword"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />

              {errors.password && (
                <p className="form-error">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
              />

              {errors.confirmPassword && (
                <p className="form-error">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city">
                City / Location
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
                <p className="form-error">
                  {errors.city}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="terms-group">

              <label className="terms-option">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />

                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    className="terms-link"
                    onClick={() =>
                      alert(
                        "Terms and Conditions are available as a frontend demo."
                      )
                    }
                  >
                    Terms and Conditions
                  </button>
                </span>
              </label>

              {errors.terms && (
                <p className="form-error">
                  {errors.terms}
                </p>
              )}

            </div>

            <button
              type="submit"
              className="auth-submit-btn"
            >
              Create Account
            </button>

          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="create-account-text">
            Already have an account?
            <Link to="/login">
              Login
            </Link>
          </p>

        </section>
      </div>

    </main>
  );
}

export default Register;