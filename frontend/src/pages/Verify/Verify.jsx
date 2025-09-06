import React, { useContext, useEffect, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);

  const [status, setStatus] = useState("loading"); // loading | success | failed
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });

      if (response.data.success) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify-page">
      {status === "loading" && (
        <div className="spinner">
          <p>Verifying your payment...</p>
        </div>
      )}

      {status === "success" && (
        <div className="thank-you">
          <h1>🎉 Thank you for your order!</h1>
          <p>Your payment was successful and your food is on the way 🍴</p>
          <button onClick={() => navigate("home")}>Return to Home</button>
          <button onClick={() => navigate("myorders")}>View My Orders</button>
        </div>
      )}

      {status === "failed" && (
        <div className="failed">
          <h1>❌ Payment Failed</h1>
          <p>Something went wrong. Please try again.</p>
          <button onClick={() => navigate("/cart")}>Back to Cart</button>
        </div>
      )}
    </div>
  );
};

export default Verify;
