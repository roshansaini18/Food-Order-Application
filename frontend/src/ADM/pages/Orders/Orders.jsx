import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from "../../AdminLayout";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Soup",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please select an image.");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({ name: "", description: "", price: "", category: "Soup" });
        setImage(null);
        toast.success(response.data.message);
      } else toast.error(response.data.message);
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-slate-100 min-h-screen w-full px-4 sm:px-6 lg:px-12 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-800">Add New Item</h1>
            <p className="text-slate-500 mt-2">Create a new product for the menu.</p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6 sm:space-y-8">

            {/* Image Upload */}
            <div className="flex items-center space-x-4">
              <label
                htmlFor="image"
                className={`flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-lg cursor-pointer
                  ${image ? "border-emerald-500" : "border-slate-300"} hover:border-emerald-500 transition-colors duration-300`}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-full w-full object-contain rounded-md"
                  />
                ) : (
                  <span className="text-xs text-slate-400 text-center">Click to upload</span>
                )}
              </label>
              <input
                type="file"
                id="image"
                className="sr-only"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
              <p className="text-sm text-slate-500">PNG, JPG, WEBP</p>
            </div>

            {/* Name and Description */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
                <input
                  type="text" name="name" id="name"
                  value={data.name} onChange={onChangeHandler}
                  placeholder="e.g. Classic Margherita"
                  className="w-3/4 px-4 py-6 rounded-md border border-slate-300 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Product Description</label>
                <textarea
                  name="description" id="description" rows="6"
                  value={data.description} onChange={onChangeHandler}
                  placeholder="Describe the item, ingredients, etc."
                  className="w-3/4 px-4 py-6 rounded-md border border-slate-300 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  name="category" id="category"
                  value={data.category} onChange={onChangeHandler}
                  className="w-3/4 px-4 py-6 rounded-md border border-slate-300 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option>Soup</option>
                  <option>Bakery</option>
                  <option>Deserts</option>
                  <option>Sandwich</option>
                  <option>Cake</option>
                  <option>Rice</option>
                  <option>Pasta</option>
                  <option>Noodles</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">Price(Rs:)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"></span>
                  <input
                    type="number" name="price" id="price"
                    value={data.price} onChange={onChangeHandler}
                    placeholder="0.00"
                    className="w-3/4 pl-12 px-4 py-6 rounded-md border border-slate-300 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
           <button
  type="submit"
  className="w-1/4 py-3 mt-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1"
>
  ADD ITEM
</button>


          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Add;
