import React, { useEffect, useState } from "react";
import './MenPopular.css';
import Item from "../Item/Item";

const MenPopular = () => {

    const [menpopularproducts, setMenPopularProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/popularinman')
            .then((response) => response.json())
            .then((data) => setMenPopularProducts(data));
    }, [])


    return (
        <div className="popular">
            <h1>POPULAR IN MEN</h1>
            <hr />
            <div className="popular-item">
                {menpopularproducts.map((item, i) => {
                    return <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                })}
            </div>
        </div>
    );
};

export default MenPopular;