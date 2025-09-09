
import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-section logo-section">
          <img src="/logo.png" alt="Akshita Crackers" className="footer-logo" />
        </div>

        {/* Information Section */}
        <div className="footer-section">
          <h3>Information</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Products</li>
            <li>Safety Tips</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>RR nagar to kannicheri road, EB office near, RR nagar</p>
          <p>📞 (+91) 96298 36731</p>
          <p>📞 (+91) 99523 49604</p>
          <p>✉️ akshitacrackers@gmail.com</p>
        </div>

        {/* Route Map Section */}
        <div className="footer-section">
          <h3>Route Map</h3>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
            width="200"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="footer-disclaimer">
        <p>
       As per 2018 supreme court order, online sale of firecrackers are not permitted! We value our customers and at the same time, respect jurisdiction. We request you to add your products to the cart and submit the required crackers through the enquiry button. We will contact you within 24 hrs and confirm the order through WhatsApp or phone call. Please add and submit your enquiries and enjoy your Diwali with Akshita Crackers. Our License No.----. Akshita Crackers as a company following 100% legal & statutory compliances and all our shops, go-downs are maintained as per the explosive acts. We send the parcels through registered and legal transport service providers as like every other major companies in Sivakasi is doing so.
        </p>
      </div>
    </footer>
  );
}
