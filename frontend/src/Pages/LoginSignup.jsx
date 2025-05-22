import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import Swal from "sweetalert2";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Function Executed - Form Data: ", formData);
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Login API Response: ", responseData);

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        const usernameToStore = responseData.username || formData.username || formData.email;
        console.log("Storing username: ", usernameToStore);
        localStorage.setItem("username", usernameToStore);
        window.location.replace("/");
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Login Error: ", error);
      alert("Something went wrong!");
    }
  };

  const signup = async () => {
    console.log("Signup Function Executed - Form Data: ", formData);
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Signup API Response: ", responseData);

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        const usernameToStore = formData.username || formData.email;
        console.log("Storing username: ", usernameToStore);
        localStorage.setItem("username", usernameToStore);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Signup Error: ", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          <input
            name="username"
            value={formData.username}
            onChange={changeHandler}
            type="text"
            placeholder="Your Name"
            required // Make username required
          />
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click Here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;