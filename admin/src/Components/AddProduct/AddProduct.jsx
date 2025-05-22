import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  // Image upload ke liye handler
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Input value change ke liye handler
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Product Add karne ka main function
  const Add_Product = async () => {
    console.log("Product details before upload:", productDetails);

    if (!image) {
      alert("Please select an image!");
      return;
    }

    let formData = new FormData();
    formData.append("product", image);

    try {
      // Image Upload API Call
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      console.log("Upload response:", uploadData);

      if (uploadData.success) {
        let product = { ...productDetails, image: uploadData.image_url };

        // Product Add API Call
        const addProductResponse = await fetch("http://localhost:4000/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const addProductData = await addProductResponse.json();
        console.log("Add product response:", addProductData);

        addProductData.success ? alert("Product Added Successfully") : alert("Product Add Failed");
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while adding product.");
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="add-product-price">
        <div className="add-product-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="add-product-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="">Select Category</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="add-product-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="add-product-thumnail-img"
            alt="Upload Thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={Add_Product} className="add-product-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
