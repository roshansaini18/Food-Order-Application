import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserLayout from "../../UserLayout";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.email) {
        try {
          await axios.post(`${url}/api/cart/get`, {
            email: user.email,
          });
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };
    fetchCart();
  }, [user, url]);

  return (
    <UserLayout>
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "Poppins, sans-serif",
        background: "#1c1f26",
        minHeight: "100vh",
        color: "#f5f5f5",
      }}
    >
      {/* User Welcome */}
      {user && (
        <div
          style={{
            marginBottom: "25px",
            padding: "18px",
            background: "linear-gradient(135deg, #2a2f3a, #1c1f26)",
            borderRadius: "14px",
            boxShadow: "0 4px 20px rgba(255,191,105,0.15)",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: 0, color: "#ffcc70" }}>
            🍴 Welcome back, {user.name}!
          </h2>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#aaa" }}>
            Let’s finalize your tasty picks 🛒
          </p>
        </div>
      )}

      {/* Cart Items */}
      <div
        style={{
          background: "#2a2f3a",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ color: "#ffcc70", marginBottom: "15px" }}>
          🥗 Your Crunchy Picks
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr 100px 100px 100px 60px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#ffcc70",
            paddingBottom: "12px",
            borderBottom: "1px solid #444",
          }}
        >
          <p>Item</p>
          <p>Snack</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p></p>
        </div>

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "100px 1fr 100px 100px 100px 60px",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "14px 0",
                  }}
                >
                  <img
                    src={url + "/images/" + item.image}
                    alt=""
                    style={{
                      width: "70px",
                      borderRadius: "12px",
                      margin: "0 auto",
                    }}
                  />
                  <p>{item.name}</p>
                  <p style={{ color: "#27ae60", fontWeight: "bold" }}>
                    ₹{item.price}
                  </p>
                  <p>{cartItems[item._id]}</p>
                  <p style={{ fontWeight: "bold", color: "#ffb347" }}>
                    ₹{item.price * cartItems[item._id]}
                  </p>
                  <span
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      color: "#e74c3c",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    ✖
                  </span>
                </div>
                <hr style={{ border: "1px solid #333" }} />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Totals + Promo Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {/* Cart Totals */}
        <div
          style={{
            flex: 2,
            background: "linear-gradient(145deg, #2a2f3a, #232730)",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(255,191,105,0.2)",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#ffcc70" }}>
            💰 Golden Bill
          </h2>
          <div style={{ fontSize: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "12px 0",
              }}
            >
              <span>Subtotal</span>
              <span>₹{getTotalCartAmount()}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "12px 0",
              }}
            >
              <span>Delivery Fee</span>
              <span>₹{getTotalCartAmount() === 0 ? 0 : 59}</span>
            </div>
            <hr style={{ border: "1px solid #444" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "15px 0",
                fontWeight: "bold",
                fontSize: "18px",
                color: "#ffb347",
              }}
            >
              <span>Total</span>
              <span>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 59}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/user/placeorder")}
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "20px",
              background:
                "linear-gradient(135deg, #ffcc70, #ff9933)",
              color: "#1c1f26",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            ✅ Place Order
          </button>
          <p
            style={{
              marginTop: "12px",
              fontSize: "13px",
              textAlign: "center",
              color: "#aaa",
            }}
          >
          </p>
        </div>

        {/* Promo Code */}
        <div
          style={{
            flex: 1,
            background: "#2a2f3a",
            padding: "22px",
            borderRadius: "18px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#ffcc70" }}>
            🎁 Add a Tasty Deal Code
          </h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Snackify50"
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #666",
                background: "#1c1f26",
                color: "#fff",
                outline: "none",
              }}
            />
            <button
              style={{
                padding: "12px 15px",
                background: "#27ae60",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Apply
            </button>
          </div>
          <p style={{ marginTop: "10px", fontSize: "13px", color: "#aaa" }}>
            Use promo codes to spice up your order 🌶️
          </p>
        </div>
      </div>
    </div>
    </UserLayout>
  );
};

export default Cart;
