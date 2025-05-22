import React from "react";
import './Offers.css'
import Exclusive_Image from "../Assets/Exclusive_Image.png";

const Offers = () => {
    return (
        <div className="offers">
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCT</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={Exclusive_Image} alt="" />
            </div>

        </div>
    )
}

export default Offers