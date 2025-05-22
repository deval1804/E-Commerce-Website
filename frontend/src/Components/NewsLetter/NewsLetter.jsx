import React, { useState } from "react";
import './NewsLetter.css';
import Swal from "sweetalert2";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      Swal.fire("Oops!", "Please enter your email!", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/subscribe", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Subscription API Response: ", data);

      if (data.success) {
        Swal.fire("Subscribed!", data.message, "success");
        setEmail("");
      } else {
        Swal.fire("Failed!", data.message, "error");
      }
    } catch (error) {
      console.error("Subscription Error: ", error);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          placeholder="Your Email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
