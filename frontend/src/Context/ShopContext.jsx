import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({}); // Now stores { itemId: { size: quantity } }
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("auth-token"));

  // Fetch products and initialize cart
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    let initialCart = savedCart ? JSON.parse(savedCart) : {};

    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAll_Product(data);
        let cart = {};
        data.forEach((product) => {
          cart[product.id] = initialCart[product.id] || {};
        });

        if (localStorage.getItem("auth-token")) {
          fetch("http://localhost:4000/getcart", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "ok" && data.cartData) {
                const updatedCart = { ...cart, ...data.cartData };
                setCartItems(updatedCart);
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
              } else {
                setCartItems(cart);
                localStorage.setItem("cartItems", JSON.stringify(cart));
              }
            })
            .catch((error) => {
              console.error("Error fetching cart:", error);
              setCartItems(cart);
              localStorage.setItem("cartItems", JSON.stringify(cart));
            });
        } else {
          setCartItems(initialCart);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [isLoggedIn]);

  // Add to cart with size
  const addToCart = (itemID, size) => {
    console.log("Adding to cart:", itemID, "Size:", size);
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemID, size }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCartItems((prev) => {
              const updatedCart = { ...prev };
              if (!updatedCart[itemID]) {
                updatedCart[itemID] = {};
              }
              updatedCart[itemID][size] = (updatedCart[itemID][size] || 0) + 1;
              localStorage.setItem("cartItems", JSON.stringify(updatedCart));
              return updatedCart;
            });
          } else {
            console.error("Failed to add to cart:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (!updatedCart[itemID]) {
          updatedCart[itemID] = {};
        }
        updatedCart[itemID][size] = (updatedCart[itemID][size] || 0) + 1;
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  // Remove from cart with size
  const removeFromCart = (itemID, size) => {
    if (!cartItems[itemID] || !cartItems[itemID][size] || cartItems[itemID][size] <= 0) return;
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemID, size }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCartItems((prev) => {
              const updatedCart = { ...prev };
              updatedCart[itemID][size] -= 1;
              if (updatedCart[itemID][size] === 0) {
                delete updatedCart[itemID][size];
                if (Object.keys(updatedCart[itemID]).length === 0) {
                  delete updatedCart[itemID];
                }
              }
              localStorage.setItem("cartItems", JSON.stringify(updatedCart));
              return updatedCart;
            });
          } else {
            console.error("Failed to remove from cart:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error removing from cart:", error);
        });
    } else {
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        updatedCart[itemID][size] -= 1;
        if (updatedCart[itemID][size] === 0) {
          delete updatedCart[itemID][size];
          if (Object.keys(updatedCart[itemID]).length === 0) {
            delete updatedCart[itemID];
          }
        }
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  // Update cart item size
  const updateCartItemSize = (itemID, oldSize, newSize) => {
    if (oldSize === newSize) return;
    if (cartItems[itemID] && cartItems[itemID][oldSize]) {
      const quantity = cartItems[itemID][oldSize];
      removeFromCart(itemID, oldSize);
      addToCart(itemID, newSize);
      // Adjust quantity if needed
      for (let i = 1; i < quantity; i++) {
        addToCart(itemID, newSize);
      }
    }
  };

  // Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const sizes = cartItems[itemId];
      const itemInfo = all_product.find((product) => product.id === Number(itemId));
      if (itemInfo) {
        for (const size in sizes) {
          if (sizes[size] > 0) {
            totalAmount += itemInfo.new_price * sizes[size];
          }
        }
      }
    }
    return totalAmount;
  };

  // Total Cart Items
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const itemId in cartItems) {
      const sizes = cartItems[itemId];
      for (const size in sizes) {
        if (sizes[size] > 0) {
          totalItem += sizes[size];
        }
      }
    }
    return totalItem;
  };

  // Logout function to clear cart and auth token
  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("cartItems");
    setCartItems({});
    setIsLoggedIn(false);
    window.location.replace("/");
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemSize,
    logout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;