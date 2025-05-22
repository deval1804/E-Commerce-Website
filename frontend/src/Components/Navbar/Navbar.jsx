import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import Swal from "sweetalert2";
import Logo from "../Assets/Logo.png";
import Cart_Icon from "../Assets/Cart_Icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Nav_Dropdown_Icon from "../Assets/Nav_Dropdown_Icon.png";

const Navbar = () => {
    const [menu, setMenu] = useState("Shop");
    const { getTotalCartItems, logout } = useContext(ShopContext);
    const menuRef = useRef();
    const username = localStorage.getItem("username");

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle("open");
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure you want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={Logo} alt="Logo" />
                <p>SHOPPER</p>
            </div>
            <img
                className="nav-dropdown"
                onClick={dropdown_toggle}
                src={Nav_Dropdown_Icon}
                alt="Dropdown Icon"
            />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => setMenu("shop")}>
                    <Link style={{ textDecoration: "none" }} to="/">
                        Shop
                    </Link>
                    {menu === "shop" ? <hr /> : null}
                </li>
                <li onClick={() => setMenu("mens")}>
                    <Link style={{ textDecoration: "none" }} to="/mens">
                        Men
                    </Link>
                    {menu === "mens" ? <hr /> : null}
                </li>
                <li onClick={() => setMenu("womens")}>
                    <Link style={{ textDecoration: "none" }} to="/womens">
                        Women
                    </Link>
                    {menu === "womens" ? <hr /> : null}
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link style={{ textDecoration: "none" }} to="/kids">
                        Kids
                    </Link>
                    {menu === "kids" ? <hr /> : null}
                </li>
                {/* <li onClick={() => setMenu("order-history")}>
                    <Link style={{ textDecoration: "none" }} to="/order-history">
                        Order History
                    </Link>
                    {menu === "order-history" ? <hr /> : null}
                </li> */}
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem("auth-token") ? (
                    <>
                        <span className="nav-username">
                            Welcome, {username || "Guest"}!
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                )}
                <Link to="/cart">
                    <img src={Cart_Icon} alt="Cart Icon" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;