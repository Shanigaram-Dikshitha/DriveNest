import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  checkRegisteredPassword,
  hasRegisteredPassword,
  resetRegisteredPassword,
} from "../utils/mockAuth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [showForgotPassword, setShowForgotPassword] =
    useState(false);

  const [forgotData, setForgotData] = useState({
    emailOrMobile: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [forgotErrors, setForgotErrors] = useState({});
  const [forgotMessage, setForgotMessage] =
    useState("");

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

    if (!formData.emailOrMobile.trim()) {
      newErrors.emailOrMobile =
        "Email or mobile number is required.";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const savedUser =
      JSON.parse(localStorage.getItem("userData")) || null;

    if (!savedUser) {
      setErrors({
        emailOrMobile:
          "No account found. Please create an account first.",
      });
      return;
    }

    const enteredValue = formData.emailOrMobile
      .trim()
      .toLowerCase();

    const registeredEmail =
      savedUser.email?.trim().toLowerCase() || "";

    const registeredMobile =
      savedUser.mobile?.trim() || "";

    const isValidUser =
      enteredValue === registeredEmail ||
      enteredValue === registeredMobile;

    if (!isValidUser) {
      setErrors({
        emailOrMobile:
          "Email or mobile number does not match the registered account.",
      });
      return;
    }

    if (!hasRegisteredPassword()) {
      setErrors({
        password:
          "No password is available. Please create the account again.",
      });
      return;
    }

    const passwordCorrect =
      await checkRegisteredPassword(
        formData.password
      );

    if (!passwordCorrect) {
      setErrors({
        password:
          "Incorrect password. Please try again.",
      });
      return;
    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    if (formData.rememberMe) {
      localStorage.setItem(
        "rememberMe",
        "true"
      );
    } else {
      localStorage.removeItem("rememberMe");
    }

    setMessage(
      "Login successful! Redirecting..."
    );

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  /* =========================
     FORGOT PASSWORD
  ========================= */

  const handleForgotChange = (e) => {
    const { name, value } = e.target;

    setForgotData({
      ...forgotData,
      [name]: value,
    });

    setForgotErrors({
      ...forgotErrors,
      [name]: "",
    });

    setForgotMessage("");
  };

  const validateForgotPassword = () => {
    const newErrors = {};

    if (!forgotData.emailOrMobile.trim()) {
      newErrors.emailOrMobile =
        "Email or mobile number is required.";
    }

    if (!forgotData.newPassword) {
      newErrors.newPassword =
        "New password is required.";
    } else if (forgotData.newPassword.length < 6) {
      newErrors.newPassword =
        "Password must contain at least 6 characters.";
    }

    if (!forgotData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your new password.";
    } else if (
      forgotData.newPassword !==
      forgotData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    return newErrors;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setForgotErrors({});
    setForgotMessage("");

    const validationErrors =
      validateForgotPassword();

    if (Object.keys(validationErrors).length > 0) {
      setForgotErrors(validationErrors);
      return;
    }

    const savedUser =
      JSON.parse(localStorage.getItem("userData")) || null;

    if (!savedUser) {
      setForgotErrors({
        emailOrMobile:
          "No registered account found.",
      });
      return;
    }

    const enteredValue =
      forgotData.emailOrMobile
        .trim()
        .toLowerCase();

    const registeredEmail =
      savedUser.email?.trim().toLowerCase() || "";

    const registeredMobile =
      savedUser.mobile?.trim() || "";

    const isValidUser =
      enteredValue === registeredEmail ||
      enteredValue === registeredMobile;

    if (!isValidUser) {
      setForgotErrors({
        emailOrMobile:
          "Email or mobile number does not match the registered account.",
      });
      return;
    }

    await resetRegisteredPassword(
      forgotData.newPassword
    );

    setForgotMessage(
      "Password reset successfully. You can now login with your new password."
    );

    setForgotData({
      emailOrMobile: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);

    setForgotData({
      emailOrMobile: "",
      newPassword: "",
      confirmPassword: "",
    });

    setForgotErrors({});
    setForgotMessage("");
  };

  return (
    <main className="auth-page">
      <div className="auth-container">

        {/* Left Section */}
        <div className="auth-intro">

          <p className="section-label">
            WELCOME TO DRIVENEST
          </p>

          <h1>Welcome Back</h1>

          <p>
            Login to manage your listings,
            favorites, comparisons and account
            information.
          </p>

          <div className="auth-benefits">

            <div>
              <span>✓</span>
              Save your favorite vehicles
            </div>

            <div>
              <span>✓</span>
              Manage your vehicle listings
            </div>

            <div>
              <span>✓</span>
              Compare vehicles easily
            </div>

          </div>

        </div>

        {/* Login Card */}
        <section className="auth-card">

          {!showForgotPassword ? (
            <>
              <div className="auth-card-header">

                <h2>Login</h2>

                <p>
                  Enter your registered details to continue.
                </p>

              </div>

              {message && (
                <div className="success-message">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Email / Mobile */}
                <div className="form-group">

                  <label htmlFor="emailOrMobile">
                    Email / Mobile Number
                  </label>

                  <input
                    id="emailOrMobile"
                    type="text"
                    name="emailOrMobile"
                    value={formData.emailOrMobile}
                    onChange={handleChange}
                    placeholder="Enter registered email or mobile"
                  />

                  {errors.emailOrMobile && (
                    <p className="form-error">
                      {errors.emailOrMobile}
                    </p>
                  )}

                </div>

                {/* Password */}
                <div className="form-group">

                  <label htmlFor="password">
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />

                  {errors.password && (
                    <p className="form-error">
                      {errors.password}
                    </p>
                  )}

                </div>

                {/* Remember Me / Forgot Password */}
                <div className="login-options">

                  <label className="remember-option">

                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />

                    Remember Me

                  </label>

                  <button
                    type="button"
                    className="forgot-btn"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setMessage("");
                      setErrors({});
                    }}
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* Login */}
                <button
                  type="submit"
                  className="auth-submit-btn"
                >
                  Login
                </button>

              </form>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <p className="create-account-text">

                Don't have an account?

                <Link to="/register">
                  Create Account
                </Link>

              </p>
            </>
          ) : (
            <>
              {/* Forgot Password */}
              <div className="auth-card-header">

                <h2>Reset Password</h2>

                <p>
                  Enter your registered details and create a new password.
                </p>

              </div>

              {forgotMessage && (
                <div className="success-message">
                  {forgotMessage}
                </div>
              )}

              <form onSubmit={handleResetPassword}>

                {/* Email / Mobile */}
                <div className="form-group">

                  <label htmlFor="forgotEmailOrMobile">
                    Email / Mobile Number
                  </label>

                  <input
                    id="forgotEmailOrMobile"
                    type="text"
                    name="emailOrMobile"
                    value={
                      forgotData.emailOrMobile
                    }
                    onChange={handleForgotChange}
                    placeholder="Enter registered email or mobile"
                  />

                  {forgotErrors.emailOrMobile && (
                    <p className="form-error">
                      {forgotErrors.emailOrMobile}
                    </p>
                  )}

                </div>

                {/* New Password */}
                <div className="form-group">

                  <label htmlFor="newPassword">
                    New Password
                  </label>

                  <input
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    value={
                      forgotData.newPassword
                    }
                    onChange={handleForgotChange}
                    placeholder="Enter new password"
                  />

                  {forgotErrors.newPassword && (
                    <p className="form-error">
                      {forgotErrors.newPassword}
                    </p>
                  )}

                </div>

                {/* Confirm Password */}
                <div className="form-group">

                  <label htmlFor="confirmPassword">
                    Confirm New Password
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={
                      forgotData.confirmPassword
                    }
                    onChange={handleForgotChange}
                    placeholder="Re-enter new password"
                  />

                  {forgotErrors.confirmPassword && (
                    <p className="form-error">
                      {forgotErrors.confirmPassword}
                    </p>
                  )}

                </div>

                <button
                  type="submit"
                  className="auth-submit-btn"
                >
                  Reset Password
                </button>

              </form>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <p className="create-account-text">

                <button
                  type="button"
                  className="forgot-btn"
                  onClick={handleCloseForgotPassword}
                >
                  ← Back to Login
                </button>

              </p>
            </>
          )}

        </section>

      </div>
    </main>
  );
}

export default Login;