import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import UserLayout from "../../UserLayout";

const colors = {
  primary: "#3498db",
  primaryDark: "#2980b9",
  success: "#27ae60",
  warning: "#e67e22",
  danger: "#e74c3c",
  gray: "#7f8c8d",
  dark: "#2c3e50",
  light: "#f4f7fb",
  white: "#ffffff",
};

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <UserLayout>
    <div
      style={{
        padding: "50px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: colors.light,
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: colors.dark,
          marginBottom: "40px",
          fontSize: "28px",
        }}
      >
        My Orders
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {data.length === 0 ? (
          <p style={{ textAlign: "center", color: colors.gray }}>
            No orders yet. Start ordering delicious meals! 🍴
          </p>
        ) : (
          data.map((order, index) => {
            const statusColors = {
              Delivered: colors.success,
              Pending: colors.warning,
              Cancelled: colors.danger,
            };

            return (
              <div
                key={index}
                style={{
                  background: colors.white,
                  borderRadius: "15px",
                  padding: "20px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.08)";
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <img
                    src={assets.parcel_icon}
                    alt="parcel_icon"
                    style={{
                      width: "45px",
                      marginRight: "15px",
                      background: "#ecf0f1",
                      padding: "8px",
                      borderRadius: "12px",
                    }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: "600", color: colors.dark }}>
                      Order #{index + 1}
                    </p>
                    <p style={{ margin: 0, fontSize: "13px", color: colors.gray }}>
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <p
                  style={{
                    margin: "10px 0",
                    fontSize: "14px",
                    color: colors.dark,
                  }}
                >
                  {order.items
                    .map((item) => `${item.name} × ${item.quantity}`)
                    .join(", ")}
                </p>

                {/* Amount + Status */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: colors.dark,
                    }}
                  >
                    ₹{order.amount}.00
                  </p>
                  <span
                    style={{
                      background: statusColors[order.status] || colors.gray,
                      color: colors.white,
                      fontSize: "13px",
                      fontWeight: "600",
                      padding: "6px 12px",
                      borderRadius: "20px",
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Track Button */}
                <button
                  onClick={fetchOrders}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "20px",
                    background: colors.primary,
                    color: colors.white,
                    fontSize: "14px",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = colors.primaryDark)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = colors.primary)
                  }
                >
                  Track Order
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
    </UserLayout>
  );
};

export default MyOrders;

