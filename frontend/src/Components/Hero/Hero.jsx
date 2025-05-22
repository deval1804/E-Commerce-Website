import React from "react";
import './Hero.css';
import Hand_Icon from "../Assets/Hand_Icon.png";
import Arrow_Icon from "../Assets/Arrow_Icon.png";
import Hero_Image from "../Assets/Hero_Image.png";

const Hero = () => {
  const handleScrollToCollection = () => {
    const element = document.getElementById("new-collections");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hero-hand-icon">
          <p>New</p>
          <img src={Hand_Icon} alt="" />
        </div>
        <p>Collection</p>
        <p>For Everyone</p>
        <div className="hero-latest-btn" onClick={handleScrollToCollection}>
          <div>Latest Collection</div>
          <img src={Arrow_Icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={Hero_Image} alt="" />
      </div>
    </div>
  );
}

export default Hero;
