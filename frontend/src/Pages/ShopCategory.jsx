import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 12);
  };

  const handleSearch = () => {
    setVisibleCount(all_product.length);  // search pe saare dikha de
  };

  const filteredProducts = all_product.filter((item) =>
    item.category === props.category &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="shop-category">
      <img
        className="shopcategory-banner"
        src={props.banner}
        alt={`${props.category} banner`}
      />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {visibleProducts.length} of {filteredProducts.length}</span> products
        </p>

        <div className="shopcategory-search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shopcategory-search-input"
          />
          <button onClick={handleSearch} className="shopcategory-search-btn">
            Search
          </button>
        </div>
      </div>

      <div className="shopcategory-products">
        {visibleProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      {visibleProducts.length < filteredProducts.length && (
        <div className="shopcategory-loadmore" onClick={handleLoadMore}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
