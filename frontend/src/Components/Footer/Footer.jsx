import React from "react";
import './Footer.css';
import Logo from "../Assets/Logo.png";
import Instagram_Icon from "../Assets/Instagram_Icon.png";
import Pinterest_Icon from "../Assets/Pinterest_Icon.png";
import WhatsApp_Icon from "../Assets/WhatsApp_Icon.png"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={Logo} alt="Shopper Logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icon-container">
                    <img src={Instagram_Icon} alt="Instagram" />
                </div>
                <div className="footer-icon-container">
                    <img src={Pinterest_Icon} alt="Pinterest" />
                </div>
                <div className="footer-icon-container">
                    <img src={WhatsApp_Icon} alt="WhatsApp" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2025 - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;