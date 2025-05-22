import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./OrderHistory.css";

const OrderHistory = () => {
    const { orderHistory } = useContext(ShopContext);

    return (
        <div className="order-history">
            <h1>Order History</h1>
            {orderHistory.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                orderHistory.map((order) => (
                    <div key={order.id} className="order">
                        <h2>Order #{order.id}</h2>
                        <p>Date: {order.date}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        {order.address && (
                            <div className="order-address">
                                <h3>Shipping Address:</h3>
                                <p>{order.address.name}</p>
                                <p>{order.address.mobile}</p>
                                <p>{order.address.street}</p>
                                <p>{order.address.city}, {order.address.pincode}</p>
                            </div>
                        )}
                        <h3>Items:</h3>
                        <div className="order-items">
                            {order.items.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="order-item">
                                    <img src={item.image} alt={item.name} className="order-item-image" />
                                    <div className="order-item-details">
                                        <p>{item.name}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ₹{item.new_price}</p>
                                        <p>Total: ₹{item.new_price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h3>Total: ₹{order.total}</h3>  </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;