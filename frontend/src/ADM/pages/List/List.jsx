import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from "../../AdminLayout";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const data = response.data.data;
        setList(data);

        // extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (err) {
      toast.error("Server error while fetching food list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error removing food item");
      }
    } catch (err) {
      toast.error("Server error while removing food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // filter list by category
  const filteredList =
    selectedCategory === "All"
      ? list
      : list.filter((item) => item.category === selectedCategory);

  return (
    <AdminLayout>
      <div className="list add flex-col" style={{ margin: "20px" }}>
        <p className="mb-3">All Foods List</p>

        {/* Category Select */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {filteredList.length === 0 ? (
            <p className="no-items">No food items available</p>
          ) : (
            filteredList.map((item, index) => (
              <div
                key={index}
                className={`list-table-format ${index % 2 === 0 ? "even-row" : "odd-row"}`}
              >
                <img src={`${url}/images/` + item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>Rs. {item.price}</p>
                <p onClick={() => removeFood(item._id)} className="cursor">
                  X
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default List;
