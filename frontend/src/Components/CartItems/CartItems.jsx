import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import Remove_Cart_Icon from "../Assets/Remove_Cart_Icon.png";
import UPI_Scanner from "../Assets/upi-scanner.png";
import CreditCardForm from "./CreditCardForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItems = () => {
  const { 
    getTotalCartAmount, 
    all_product, 
    cartItems, 
    removeFromCart, 
    updateCartItemSize 
  } = useContext(ShopContext);
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showUPIScanner, setShowUPIScanner] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    street: "",
    city: "",
    pincode: "",
  });

  // Get size options based on product type
  const getSizeOptions = (productId) => {
    const product = all_product.find((p) => p.id === productId);
    if (!product) return ["one-size"];

    const name = product.name.toLowerCase();

    if (
      name.includes("shoe") ||
      name.includes("sandal") ||
      name.includes("sneaker") ||
      name.includes("footwear") ||
      name.includes("loafer") ||
      name.includes("chappal")
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

  const handleProceedToCheckout = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    setShowUPIScanner(method === "UPI");
    setShowCardForm(method === "Credit/Debit Card");
    setShowAddressForm(method === "Cash on Delivery");
  };

  const handlePaymentSubmit = () => {
    if (selectedPayment === "Cash on Delivery") {
      toast.success(
        `COD Order Confirmed! Amount: ₹${getTotalCartAmount() - discount}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else {
      toast.success(
        `Payment of ₹${getTotalCartAmount() - discount} successful via ${selectedPayment}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
    setShowPaymentModal(false);
  };

  const applyPromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(getTotalCartAmount() * 0.1);
      toast.success("10% discount applied!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Invalid promo code", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="cartitems">
      <ToastContainer />
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id]) {
          return Object.entries(cartItems[e.id]).map(([size, quantity]) => {
            if (quantity > 0) {
              const sizeOptions = getSizeOptions(e.id);
              return (
                <div key={`${e.id}-${size}`}>
                  <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className="carticon-product-icon" />
                    <p>{e.name}</p>
                    <p>₹{e.new_price}</p>
                    {sizeOptions.length > 1 ? (
                      <select
                        value={size}
                        onChange={(event) => updateCartItemSize(e.id, size, event.target.value)}
                        className="cartitems-size-select"
                      >
                        {sizeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>{size === "one-size" ? "One Size" : size}</p>
                    )}
                    <button className="cartitem-quantity">{quantity}</button>
                    <p>₹{e.new_price * quantity}</p>
                    <img
                      className="cartitems-remove-icon"
                      src={Remove_Cart_Icon}
                      onClick={() => removeFromCart(e.id, size)}
                      alt=""
                    />
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          });
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
                <div className="cartitems-total-item">
                  <p>Discount</p>
                  <p>-₹{discount}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount() - discount}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitem-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitem-promobox">
            <input
              type="text"
              placeholder="promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={applyPromoCode}>Submit</button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <h2>Select Payment Method</h2>

            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "Credit/Debit Card"}
                  onChange={() => handlePaymentSelect("Credit/Debit Card")}
                />
                Credit/Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "UPI"}
                  onChange={() => handlePaymentSelect("UPI")}
                />
                UPI Payment
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "Net Banking"}
                  onChange={() => handlePaymentSelect("Net Banking")}
                />
                Net Banking
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "Cash on Delivery"}
                  onChange={() => handlePaymentSelect("Cash on Delivery")}
                />
                Cash on Delivery (COD)
              </label>
            </div>

            {/* UPI Scanner */}
            {showUPIScanner && (
              <div className="upi-scanner">
                <img src={UPI_Scanner} alt="UPI QR Code" />
                <p>Scan this QR code to pay ₹{getTotalCartAmount() - discount}</p>
                <button onClick={handlePaymentSubmit}>I've Made Payment</button>
              </div>
            )}

            {/* Credit Card Form */}
            {showCardForm && <CreditCardForm totalAmount={getTotalCartAmount() - discount} />}

            {/* Address Form for COD */}
            {showAddressForm && (
              <div className="address-form">
                <h3>Delivery Address</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={address.name}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={address.mobile}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>
                <button
                  className="payment-confirm-btn"
                  onClick={handlePaymentSubmit}
                  disabled={!address.name || !address.mobile || !address.street || !address.city || !address.pincode}
                >
                  Confirm COD Order
                </button>
              </div>
            )}

            {/* For Net Banking */}
            {selectedPayment === "Net Banking" && !showUPIScanner && !showCardForm && !showAddressForm && (
              <div className="payment-confirmation">
                <p>Pay ₹{getTotalCartAmount() - discount} via Net Banking</p>
                <button onClick={handlePaymentSubmit}>Confirm Payment</button>
              </div>
            )}

            <button
              className="close-modal-btn"
              onClick={() => setShowPaymentModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;