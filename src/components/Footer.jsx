function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">
          <h2>DriveNest</h2>
          <p>
            Find reliable pre-owned vehicles at the right price.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/vehicles">Buy Vehicle</a>
          <a href="/sell">Sell Vehicle</a>
          <a href="/compare">Compare</a>
          <a href="/favorites">Favorites</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@drivenest.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 DriveNest. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;