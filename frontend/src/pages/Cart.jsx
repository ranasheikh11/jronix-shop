import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets, all_product_images } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const CartImage = ({ productData, index }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fallback = all_product_images[index % all_product_images.length];
  const src = (productData && productData.image && productData.image.length > 0 && !productData.image[0].includes('placeholder.com'))
    ? productData.image[0]
    : fallback;

  return (
    <div className="relative w-16 sm:w-20 aspect-square bg-pink-50 rounded overflow-hidden flex-shrink-0">
      {loading && <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50" />}
      {error || !productData ? (
        <div className="absolute inset-0 flex items-center justify-center text-pink-200">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
    </div>
  );
}

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const isCartEmpty = cartData.length === 0;

  return (
    <div className='border-t pt-14'>
      <div className='mb-3 text-2xl'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          if (!productData) {
            return (
              <div key={index} className='grid py-4 text-gray-400 border-t border-b grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 opacity-60'>
                <div className='flex items-start gap-6'>
                  <CartImage productData={null} index={index} />
                  <div>
                    <p className='text-sm font-medium sm:text-lg italic'>Product no longer available</p>
                    <p className='text-xs mt-1'>Please remove this item to proceed</p>
                  </div>
                </div>
                <div />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-4 mr-4 cursor-pointer sm:w-5 opacity-50 hover:opacity-100 transition-opacity'
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            );
          }

          return (
            <div key={index} className='grid py-4 text-gray-700 border-t border-b grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 hover:bg-pink-50/20 transition-colors px-2 rounded-lg'>
              <div className='flex items-start gap-6'>
                <CartImage productData={productData} index={index} />
                <div>
                  <p className='text-sm font-medium sm:text-lg'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p className="font-bold text-pink-dark">
                      {currency}&nbsp;{productData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className='px-2 border rounded-md text-xs font-bold text-pink-400 bg-pink-50 border-pink-100'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                className='px-1 py-1 border max-w-10 sm:max-w-20 sm:px-2'
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className='w-4 mr-4 cursor-pointer sm:w-5'
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className={`px-8 py-3 my-8 text-sm text-white bg-black active:bg-gray-700 ${isCartEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isCartEmpty}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
