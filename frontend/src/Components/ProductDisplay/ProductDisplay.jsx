import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import Star_Icon from "../Assets/Star_Icon.png";
import Star_Dull_Icon from "../Assets/Star_Dull_Icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);

  // Get size options based on product type
  const getSizeOptions = () => {
    const name = product.name.toLowerCase();

    if (
      name.includes("shoe") ||
      name.includes("sandal") ||
      name.includes("sneaker") ||
      name.includes("footwear") ||
      name.includes("loafer") ||
      name.includes("chappal") ||
      name.includes("flip-flop")

    ) {
      return ["6", "7", "8", "9", "10", "11", "12"];
    } else if (
      name.includes("shirt") ||
      name.includes("t-shirt") ||
      name.includes("pant") ||
      name.includes("jeans") ||
      name.includes("jacket") ||
      name.includes("kurta") ||
      name.includes("top") ||
      name.includes("dress")
    ) {
      return ["S", "M", "L", "XL", "XXL"];
    } else {
      return ["one-size"];
    }
  };

  const sizeOptions = getSizeOptions();

  const handleAddToCart = () => {
    if (sizeOptions.length > 1 && !selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }
    addToCart(product.id, selectedSize || "one-size");
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={Star_Icon} alt="star" />
          <img src={Star_Icon} alt="star" />
          <img src={Star_Icon} alt="star" />
          <img src={Star_Icon} alt="star" />
          <img src={Star_Dull_Icon} alt="dull-star" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">₹{product.old_price}</div>
          <div className="productdisplay-right-price-new">₹{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          Discover the latest trends and premium products at unbeatable prices. Your one-stop destination for hassle-free online shopping
        </div>
        
        {sizeOptions.length > 1 && (
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              {sizeOptions.map((size) => (
                <div
                  key={size}
                  className={`size-option ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category : </span>Women, Crop Top, T-Shirt, Shirt
        </p>
        <p className="productdisplay-right-category">
          <span>Tags : </span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;