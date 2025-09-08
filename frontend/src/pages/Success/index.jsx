import React from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../UserLayout";

const Success = () => {
  const navigate = useNavigate();

  return (
    <UserLayout>
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate("/user/order")}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
    </UserLayout>
  );
};

export default Success;
