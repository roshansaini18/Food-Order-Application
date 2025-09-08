import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../UserLayout";

// Stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// STRIPE KEY - replace with your publishable key in production
const stripePromise = loadStripe("pk_test_51S3hfABN3Cra25xtqDe7yBZNBhcCSqJcV58AHYoQOwPWgg2chcS60Wmqx89Eu5ZSs4f4I0ZMGrv8adUFcvQDNFG00WS8wTCi8");

// Stripe payment form component
const CheckoutForm = ({ orderData, url, token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      const clientSecret = data.client_secret;
      // const orderId = data.orderId; // If you want to use orderId, you can save it in state or query

      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${orderData.address.firstName} ${orderData.address.lastName}`,
            email: orderData.address.email,
          },
        },
      });

      // Go to success page always after payment attempt (success or failure)
      navigate("/user/order-success");
    } catch (err) {
      // Redirect to success page even on error
      navigate("/user/order-success");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

// Main PlaceOrder component
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, userId } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => setData({ ...data, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) navigate("/cart");
  }, [token, getTotalCartAmount, navigate]);

  const orderData = {
    userId,
    items: food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] })),
    address: data,
    amount: getTotalCartAmount() + 250,
  };

  return (
    <UserLayout>
      <div className="place-order">
        <div className="place-order-left">
          <h2>Delivery Info</h2>
          <input name="firstName" placeholder="First Name" onChange={onChangeHandler} />
          <input name="lastName" placeholder="Last Name" onChange={onChangeHandler} />
          <input name="email" placeholder="Email" onChange={onChangeHandler} />
          <input name="street" placeholder="Street" onChange={onChangeHandler} />
          <input name="city" placeholder="City" onChange={onChangeHandler} />
          <input name="state" placeholder="State" onChange={onChangeHandler} />
          <input name="zipcode" placeholder="Zipcode" onChange={onChangeHandler} />
          <input name="country" placeholder="Country" onChange={onChangeHandler} />
          <input name="phone" placeholder="Phone" onChange={onChangeHandler} />
        </div>
        <div className="place-order-right">
          <h2>Payment</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm orderData={orderData} url={url} token={token} />
          </Elements>
        </div>
      </div>
    </UserLayout>
  );
};

export default PlaceOrder;

