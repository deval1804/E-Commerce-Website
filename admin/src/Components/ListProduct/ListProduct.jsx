import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched products:", data); // Log data to verify
                setAllProducts(data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_product = async (id) => {
        console.log("Removing product with ID:", id); // Log ID to verify
        await fetch("http://localhost:4000/removeproduct", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
            .catch((error) => console.error("Error removing product:", error));
        await fetchInfo(); // Refresh the list
    };

    return (
        <div className="list-product">
            <h1>All Product List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return (
                        <>
                            <div key={index} className="listproduct-format-main listproduct-format">
                                <img src={product.image} alt="" className="listproduct-product-icon" />
                                <p>{product.name}</p>
                                <p>₹{product.old_price}</p>
                                <p>₹{product.new_price}</p>
                                <p>{product.category}</p>
                                <img
                                    onClick={() => {
                                        console.log("Remove clicked for ID:", product.id); // Log click
                                        remove_product(product.id);
                                    }}
                                    className="listproduct-remove-icon"
                                    src={cross_icon}
                                    alt=""
                                />
                            </div>
                            <hr />
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default ListProduct;