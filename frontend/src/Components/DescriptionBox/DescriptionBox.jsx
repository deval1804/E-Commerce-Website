import React, { useState } from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([
    { id: 1, user: "John Doe", rating: 4, comment: "Great product! Very comfortable and stylish.", date: "2025-05-10" },
    { id: 2, user: "Jane Smith", rating: 5, comment: "Absolutely love it! Worth every penny.", date: "2025-05-12" },
  ]);
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.user.trim() && newReview.comment.trim()) {
      const review = {
        id: reviews.length + 1,
        ...newReview,
        date: new Date().toISOString().split("T")[0],
      };
      setReviews([...reviews, review]);
      setNewReview({ user: "", rating: 5, comment: "" });
    }
  };

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === "description" ? "active" : ""}`}
          onClick={() => handleTabClick("description")}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box ${activeTab === "reviews" ? "active" : "fade"}`}
          onClick={() => handleTabClick("reviews")}
        >
          Reviews ({reviews.length})
        </div>
      </div>
      {activeTab === "description" ? (
        <div className="descriptionbox-description">
          <p>
            Discover the perfect blend of style and comfort with our latest
            collection. Crafted using high-quality materials, this product offers
            durability and a sleek, modern look to suit your everyday lifestyle.
          </p>
          <p>
            <strong>Product Statistics:</strong> Over <strong>10,000+</strong>{" "}
            units sold worldwide with a{" "}
            <strong>98% customer satisfaction rate</strong>. Join the community of
            happy customers and experience unmatched quality today!
          </p>
        </div>
      ) : (
        <div className="descriptionbox-reviews">
          <h3>Customer Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <div className="review-header">
                  <span className="review-user">{review.user}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
          <div className="review-form">
            <h4>Write a Review</h4>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label htmlFor="user">Name:</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={newReview.user}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  name="rating"
                  value={newReview.rating}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="comment">Review:</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;