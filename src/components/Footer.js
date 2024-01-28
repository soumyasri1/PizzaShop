import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Importing React Icons
import '../componentStyles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">Doughlicious</div>
                <p className="footer-text">
                    When the mood's not in your favor, pizza's the savior!
                </p>
                <div className="footer-links">
                    <a href="#home" className="footer-link">Home</a>
                    <a href="#about" className="footer-link">About</a>
                    <div className="footer-contact">
                        <p className="contact-details">Contact: support@Doughlicious.com | +1 (123) 456-7890</p>
                    </div>
                </div>
                <div className="footer-social-icons">
                    <FaFacebook className="footer-social-icon" /> {/* Using React Icons */}
                    <FaTwitter className="footer-social-icon" /> {/* Using React Icons */}
                    <FaInstagram className="footer-social-icon" /> {/* Using React Icons */}
                </div>
                <p className="footer-copyright">&copy; 2024 Your Doughlicious App. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
