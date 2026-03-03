import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { assets, all_product_images } from '../assets/assets';

const OrderImage = ({ item, index }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fallback = all_product_images[index % all_product_images.length];
  const src = (item.image && item.image.length > 0 && !item.image[0].includes('placeholder.com'))
    ? item.image[0]
    : fallback;

  return (
    <>
      {loading && <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50" />}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-pink-200">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 0 00-2-2H6a2 0 00-2 2v12a2 0 002 2z" />
          </svg>
        </div>
      ) : (
        <img
          className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          src={src}
          onLoad={() => setLoading(false)}
          onError={() => { setError(true); setLoading(false); }}
          alt=""
        />
      )}
    </>
  );
}

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div key={index} className='flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:items-center md:justify-between'>
            <div className='flex items-start gap-6 text-sm'>
              <div className="relative w-16 sm:w-20 aspect-square bg-pink-50 rounded overflow-hidden flex-shrink-0">
                <OrderImage item={item} index={index} />
              </div>
              <div>
                <p className='font-medium sm:text-base'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='flex justify-between md:w-1/2'>
              <div className='flex items-center gap-2'>
                <p className='h-2 bg-green-500 rounded-full min-w-2'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='px-4 py-2 text-sm font-medium border rounded-sm'>TRACK ORDER</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
