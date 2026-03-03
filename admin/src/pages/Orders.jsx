import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return null;
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  if (loading) return <div className="text-center py-20 text-pink-dark font-medium">Loading orders...</div>;

  return (
    <div className='flex flex-col gap-6'>
      <p className='text-2xl font-bold text-pink-dark'>Orders Management</p>

      {orders.length === 0 ? (
        <div className="bg-white p-20 rounded-xl border border-pink-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-pink-dark opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h2>
          <p className="text-gray-500 max-w-sm">
            Once customers start placing orders, they will appear here. You'll be able to manage shipping, status, and details.
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {orders.map((order, index) => (
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-pink-100 p-5 md:p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-all'>
              <div className='bg-pink-50 p-3 rounded-lg flex items-center justify-center w-16 h-16'>
                <img className='w-10 opacity-70' src={assets.parcel_icon || assets.cart_icon} alt="Order" />
              </div>
              <div>
                <div className='flex flex-col gap-1'>
                  {order.items.map((item, idx) => (
                    <p className='py-0.5 font-medium' key={idx}>
                      {item.name} x {item.quantity} <span> {item.size} </span>
                      {idx !== order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>
                <p className='mt-3 mb-2 font-bold text-pink-dark'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='text-sm text-gray-600'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className='mt-2 font-medium'>{order.address.phone}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-semibold text-gray-500'>Items: {order.items.length}</p>
                <p className='text-sm font-semibold text-gray-500'>Method: {order.paymentMethod}</p>
                <p className='text-sm font-semibold text-gray-500'>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p className='text-sm font-semibold text-gray-500'>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-lg font-bold text-pink-dark self-center'>{currency(order.amount)}</p>
              <div className='self-center flex flex-col gap-2'>
                <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Status</p>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold border border-pink-100 rounded-lg bg-pink-50 outline-none cursor-pointer focus:ring-2 focus:ring-pink-200 transition-all'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;