import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import AdminLayout from "../../AdminLayout";

const STATUS_TABS = [
  { label: "Preparing", status: "Food Processing" },
  { label: "Processing", status: "Out for delivery" },
  { label: "Delivered", status: "Delivered" }
];

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Server error while fetching orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated.");
      }
    } catch (err) {
      toast.error("Error updating order status");
    }
  };

  const tabStatus = STATUS_TABS[selectedTab].status;
  const filteredOrders = orders.filter(order => order.status === tabStatus);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Dropdown to filter status */}
          <div className="mb-6 w-60">
            <label htmlFor="orderStatus" className="block text-sm font-medium text-slate-700 mb-2">
              Filter by Status
            </label>
            <select
              id="orderStatus"
              value={selectedTab}
              onChange={(e) => setSelectedTab(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-400 focus:outline-none bg-white"
            >
              {STATUS_TABS.map((tab, idx) => (
                <option key={tab.label} value={idx}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-lg shadow-md">
              <img src={assets.parcel_icon} alt="No orders" className="w-16 h-16 opacity-30 mb-4" />
              <p className="text-lg font-semibold text-slate-600">No Orders in this category</p>
              <p className="text-slate-400">Orders will appear here as they progress.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="hidden md:table min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order Details</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredOrders.map(order => (
                    <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                      {/* Order Details with images */}
                      <td className="py-3 px-4 align-top">
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <img
                                src={`${url}/images/${item.image}`}
                                alt={item.name}
                                className="w-10 h-10 rounded object-cover border"
                              />
                              <span className="text-sm text-slate-700">
                                {item.name} × {item.quantity}
                              </span>
                            </div>
                          ))}
                          <p className="text-xs text-slate-500 font-mono">ID: {order._id}</p>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="py-3 px-4 align-top">
                        <p className="font-medium text-slate-800">
                          {order.address.firstName} {order.address.lastName}
                        </p>
                        <p className="text-xs text-slate-500">{order.address.street}, {order.address.city}</p>
                        <p className="text-xs text-slate-500">{order.address.phone}</p>
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 font-bold text-slate-800 align-top">
                        ₹{order.amount.toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 align-top">
                        <select
                          onChange={(e) => statusHandler(e, order._id)}
                          value={order.status}
                          className="px-2 py-1 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-200 outline-none bg-white"
                        >
                          <option value="Food Processing">Preparing</option>
                          <option value="Out for delivery">Processing</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card View */}
              <div className="grid gap-4 md:hidden">
                {filteredOrders.map(order => (
                  <div key={order._id} className="bg-white rounded-lg shadow p-4 space-y-3">
                    {/* Items */}
                    <div>
                      <h3 className="font-semibold text-slate-700 mb-2">Items</h3>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <img
                            src={`${url}/images/${item.image}`}
                            alt={item.name}
                            className="w-10 h-10 rounded object-cover border"
                          />
                          <span className="text-sm">{item.name} × {item.quantity}</span>
                        </div>
                      ))}
                      <p className="text-xs text-slate-500 font-mono">ID: {order._id}</p>
                    </div>

                    {/* Customer */}
                    <div>
                      <h3 className="font-semibold text-slate-700">Customer</h3>
                      <p>{order.address.firstName} {order.address.lastName}</p>
                      <p className="text-xs text-slate-500">{order.address.street}, {order.address.city}</p>
                      <p className="text-xs text-slate-500">{order.address.phone}</p>
                    </div>

                    {/* Amount + Status */}
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">₹{order.amount.toFixed(2)}</span>
                      <select
                        onChange={(e) => statusHandler(e, order._id)}
                        value={order.status}
                        className="px-2 py-1 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-200 outline-none bg-white"
                      >
                        <option value="Food Processing">Preparing</option>
                        <option value="Out for delivery">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
