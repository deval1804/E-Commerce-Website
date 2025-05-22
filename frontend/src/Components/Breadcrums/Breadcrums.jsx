import React from "react";
import "./Breadcrums.css";
import Arrow_Icon from "../Assets/Arrow_Icon.png";

const Breadcrums = (props) => {
    const { product } = props;
    return (
        <div className="breadcrums">
            HOME <img src={Arrow_Icon} alt="arrow" /> 
            SHOP <img src={Arrow_Icon} alt="arrow" /> 
            {product.category} <img src={Arrow_Icon} alt="arrow" /> 
            {product.name}
        </div>
    );
};

export default Breadcrums;