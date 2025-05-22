import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollection from "../Components/NewCollection/NewCollection";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import MenPopular from "../Components/MenPopular/MenPopular";


const Shop = () => {
    return (
        <div>
            <Hero />
            <Popular />
            <MenPopular />
            <Offers />
            <NewCollection />
            <NewsLetter />
        </div>
    );
};

export default Shop;