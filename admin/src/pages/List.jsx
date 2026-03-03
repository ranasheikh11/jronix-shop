import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const List = ({ token }) => {
  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchListProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setListProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.info(response.data.message);
        await fetchListProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchListProducts();
  }, []);

  if (loading) return <div className="text-center py-20 text-pink-dark font-medium">Fetching inventory...</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-pink-dark mb-2">Inventory Management</p>
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[0.5fr_1fr_2fr_0.8fr_0.8fr_0.8fr_0.5fr] items-center py-3 px-4 border border-pink-100 bg-pink-50 text-sm font-bold text-pink-dark rounded-t-xl">
          <span>Image</span>
          <span>Name</span>
          <span>Description</span>
          <span>Category</span>
          <span>Sub Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Display Products */}
        <div className="bg-white rounded-b-xl border border-pink-100 overflow-hidden shadow-sm">
          {listProducts.length === 0 ? (
            <p className="text-center py-10 text-gray-400">No products found in inventory.</p>
          ) : (
            listProducts.map((item, index) => (
              <div
                className="grid grid-cols-[0.5fr_1fr_2fr_0.8fr_0.8fr_0.8fr_0.5fr] items-center gap-4 py-4 px-4 border-b border-pink-50 text-sm text-gray-600 hover:bg-pink-50/30 transition-colors"
                key={index}
              >
                <img
                  className="w-14 h-14 object-cover rounded shadow-sm border border-pink-100"
                  src={item.image[0]}
                  alt={item.name}
                  onError={(e) => { e.target.src = assets.upload_area }}
                />
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="truncate pr-4" title={item.description}>{item.description}</p>
                <p><span className="px-2 py-1 bg-gray-100 rounded-full text-[10px] uppercase font-bold">{item.category}</span></p>
                <p><span className="px-2 py-1 bg-pink-50 text-pink-dark rounded-full text-[10px] uppercase font-bold">{item.subCategory}</span></p>
                <p className="font-bold text-pink-dark">{currency(item.price)}</p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/edit/${item._id}`)}
                    className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-all shadow-sm hover:shadow-md"
                    title="Edit Product"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="p-2 text-white bg-pink-dark rounded-full hover:bg-red-600 transition-all shadow-sm hover:shadow-md"
                    title="Delete Product"
                  >
                    <img className="w-4 h-4 invert" src={assets.bin_icon} alt="Delete" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default List;
