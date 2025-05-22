import React from "react";
import "./Navbar.css"
import Navlogo from "../../assets/Nav-logo.svg"
import NavProfile from "../../assets/Nav-Profile.svg"

const Navbar = () => {
  return (
    <div className="navbar">
        <img src={Navlogo} alt="" className="nav-logo"/>
        <img src={NavProfile} alt="" className="nav-profile"/>
    </div>
  )
}
export default Navbar