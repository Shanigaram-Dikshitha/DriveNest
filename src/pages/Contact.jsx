import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function getSavedEnquiries() {
  try {
    return JSON.parse(localStorage.getItem("enquiries")) || [];
  } catch {
    return [];
  }
}

function Contact() {
  const [searchParams] = useSearchParams();

  const vehicleId = searchParams.get("vehicleId");
  const vehicleName = searchParams.get("vehicleName") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9][0-9]{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit mobile number.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSuccessMessage("");
      return;
    }

    const savedEnquiries = getSavedEnquiries();

    const newEnquiry = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
      vehicleId: vehicleId || "",
      vehicleName: vehicleName || "",
      status: "New",
      createdAt: new Date().toLocaleString("en-IN"),
    };

    const updatedEnquiries = [
      ...savedEnquiries,
      newEnquiry,
    ];

    localStorage.setItem(
      "enquiries",
      JSON.stringify(updatedEnquiries)
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setErrors({});

    setSuccessMessage(
      "Your enquiry has been sent successfully."
    );
  };

  return (
    <main className="contact-page">
      <div className="contact-container">

        {/* INTRO */}
        <section className="contact-intro">
          <p className="section-label">
            CONTACT SELLER
          </p>

          <h1>
            Get in touch with the seller
          </h1>

          <p>
            Have a question about a vehicle? Send a
            message to the seller using the form.
          </p>

          {vehicleName && (
            <p>
              <strong>Vehicle:</strong>{" "}
              {vehicleName}
            </p>
          )}

          <div className="contact-info-box">

            <div className="contact-info-item">
              <span>✉</span>

              <div>
                <strong>Email</strong>
                <p>
                  Seller will receive your enquiry.
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <span>☎</span>

              <div>
                <strong>Phone</strong>
                <p>
                  Enter your mobile number so the
                  seller can contact you.
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <span>💬</span>

              <div>
                <strong>Message</strong>
                <p>
                  Clearly describe your question or
                  interest in the vehicle.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="contact-card">

          <div className="contact-card-header">
            <h2>Contact Seller</h2>

            <p>
              Fill in your details and send your
              enquiry.
            </p>
          </div>

          {successMessage && (
            <div className="form-message">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="form-group">
              <label htmlFor="name">
                Name *
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />

              {errors.name && (
                <span className="error">
                  {errors.name}
                </span>
              )}
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                Email *
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
                <span className="error">
                  {errors.email}
                </span>
              )}
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number *
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />

              {errors.phone && (
                <span className="error">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* MESSAGE */}
            <div className="form-group">
              <label htmlFor="message">
                Message *
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="I am interested in this vehicle. Please share more details."
              />

              {errors.message && (
                <span className="error">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="primary-btn"
            >
              Send Enquiry
            </button>

          </form>

          <div className="contact-back-link">
            <Link to="/vehicles">
              ← Back to Vehicles
            </Link>
          </div>

        </section>

      </div>
    </main>
  );
}

export default Contact;