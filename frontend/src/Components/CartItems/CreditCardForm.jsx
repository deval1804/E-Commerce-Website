import React, { useState } from "react";
import "./CartItems.css";

const CreditCardForm = ({ totalAmount }) => {
    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Payment of ₹${totalAmount} processed successfully!`);
    };

    return (
        <form className="credit-card-form" onSubmit={handleSubmit}>
            <h3>Enter Card Details</h3>
            <div className="form-group">
                <label>Card Number</label>
                <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Cardholder Name</label>
                <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    required
                />
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        type="text"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        required
                    />
                </div>
            </div>
            <button type="submit" className="pay-now-btn">
                Pay ₹{totalAmount}
            </button>
        </form>
    );
};

export default CreditCardForm;