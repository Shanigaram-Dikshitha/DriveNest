import { useState } from "react";
import { Link } from "react-router-dom";

import "./Enquiries.css";

function getEnquiries() {
  try {
    return JSON.parse(localStorage.getItem("enquiries")) || [];
  } catch {
    return [];
  }
}

function Enquiries() {
  const [enquiries, setEnquiries] = useState(getEnquiries);

  const deleteEnquiry = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmed) return;

    const updated = enquiries.filter(
      (enquiry) => enquiry.id !== id
    );

    setEnquiries(updated);

    localStorage.setItem(
      "enquiries",
      JSON.stringify(updated)
    );
  };

  const handleReply = (enquiry) => {
    const email = enquiry.email || "";

    const subject = encodeURIComponent(
      "Re: Your enquiry on DriveNest"
    );

    const body = encodeURIComponent(
      `Hello ${enquiry.name || "there"},\n\n` +
      `Thank you for contacting us through DriveNest.\n\n` +
      `Regarding your enquiry:\n` +
      `"${enquiry.message || ""}"\n\n` +
      `We will get back to you shortly.\n\n` +
      `Regards,\nDriveNest`
    );

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(email)}` +
      `&su=${subject}` +
      `&body=${body}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <main className="enquiries-page">
      <div className="enquiries-container">

        <div className="enquiries-header">
          <div>
            <span className="enquiries-label">
              DASHBOARD
            </span>

            <h1>Enquiries</h1>

            <p>
              View messages submitted by vehicle buyers.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="enquiries-back"
          >
            ← Dashboard
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <section className="enquiries-empty">

            <div className="enquiries-empty-icon">
              📩
            </div>

            <h2>No enquiries yet</h2>

            <p>
              When someone contacts a seller through
              DriveNest, enquiries will appear here.
            </p>

            <Link
              to="/vehicles"
              className="enquiries-primary-btn"
            >
              Browse Vehicles
            </Link>

          </section>
        ) : (
          <section className="enquiries-list">

            {enquiries.map((enquiry) => (
              <article
                className="enquiry-card"
                key={enquiry.id}
              >

                <div className="enquiry-top">

                  <div className="enquiry-avatar">
                    {enquiry.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div className="enquiry-person">

                    <h2>
                      {enquiry.name || "Unknown User"}
                    </h2>

                    <span>
                      {enquiry.date || "Date not available"}
                    </span>

                  </div>

                </div>

                <div className="enquiry-details">

                  <div>
                    <span>Email</span>

                    <strong>
                      {enquiry.email || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Phone</span>

                    <strong>
                      {enquiry.phone || "Not provided"}
                    </strong>
                  </div>

                </div>

                <div className="enquiry-message">

                  <span>Message</span>

                  <p>
                    {enquiry.message || "No message provided."}
                  </p>

                </div>

                <div className="enquiry-actions">

                  <button
                    type="button"
                    className="enquiry-reply"
                    onClick={() => handleReply(enquiry)}
                  >
                    Reply in Gmail
                  </button>

                  <button
                    type="button"
                    className="enquiry-delete"
                    onClick={() =>
                      deleteEnquiry(enquiry.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </article>
            ))}

          </section>
        )}

      </div>
    </main>
  );
}

export default Enquiries;