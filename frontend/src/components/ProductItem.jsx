import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { assets, all_product_images } from "../assets/assets";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // INFO: Smart Fallback - Use a consistent static image if the primary is a placeholder or missing
  const isPlaceholder = !image || image.length === 0 || (image[0] && image[0].includes('placeholder.com'));

  const getFallbackImage = () => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return all_product_images[hash % all_product_images.length];
  }

  const productImage = isPlaceholder ? getFallbackImage() : image[0];

  return (
    <Link
      className="text-gray-700 cursor-pointer bg-white p-3 rounded-lg border border-pink-50 hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 transform hover:-translate-y-1 block h-full flex flex-col"
      to={`/product/${id}`}
    >
      <div className="relative overflow-hidden rounded-md bg-pink-50 aspect-square group">
        {/* Shimmer / Loading State */}
        {loading && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50" />
        )}

        {/* Error / Icon Falling back */}
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-200 gap-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">No Image</span>
          </div>
        ) : (
          <img
            className={`transition duration-500 ease-in-out group-hover:scale-110 aspect-square object-cover w-full h-full ${loading ? 'opacity-0' : 'opacity-100'}`}
            src={productImage}
            alt={name}
            onLoad={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <p className="pt-4 pb-1 text-sm font-medium truncate">{name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-lg font-bold text-pink-dark">
            {currency}{price.toLocaleString()}
          </p>
          <span className="text-[10px] text-pink-300 font-bold uppercase tracking-tighter">View</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
