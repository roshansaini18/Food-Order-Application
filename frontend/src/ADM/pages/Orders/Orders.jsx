import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Server error while fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (err) {
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders-page">
      <div className="order-add">
        <h3>Orders</h3>
        <div className="order-list">
          {orders.length === 0 ? (
            <p className="no-orders">No orders available</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="parcel_icon" />
                <div className="order-details">
                  <p className="order-item-food">
                    {order.items.map((item, idx) =>
                      idx === order.items.length - 1
                        ? `${item.name} x ${item.quantity}`
                        : `${item.name} x ${item.quantity}, `
                    )}
                  </p>
                  <p className="order-item-name">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street},</p>
                    <p>
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country}, {order.address.zipcode}
                    </p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p className="order-summary">Items: {order.items.length}</p>
                <p className="order-amount">Rs. {order.amount}</p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
