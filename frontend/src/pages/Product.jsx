import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets, all_product_images } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [mainLoading, setMainLoading] = useState(true);
  const [mainError, setMainError] = useState(false);

  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item)

        const isPlaceholder = !item.image || item.image.length === 0 || (item.image[0] && item.image[0].includes('placeholder.com'));

        const getFallbackImage = () => {
          const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          return all_product_images[hash % all_product_images.length];
        }

        setImage(isPlaceholder ? getFallbackImage() : item.image[0])
        return;
      }
    })
  }

  const getPriceFallbackImage = () => {
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return all_product_images[hash % all_product_images.length];
  }

  useEffect(() => {
    fetchProductData();
    setMainLoading(true);
    setMainError(false);
  }, [productId, products]);

  return productData ? (
    <div className='pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100'>
      {/* Product Data */}
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        {/* Product Images */}
        <div className='flex flex-col-reverse flex-1 gap-3 sm:flex-row'>
          <div className='flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full'>
            {
              (productData.image || []).map((item, index) => (
                <div key={index} className="relative w-[24%] sm:w-full sm:mb-3 flex-shrink-0 aspect-square bg-pink-50 rounded overflow-hidden">
                  <img
                    src={item}
                    onClick={() => { setImage(item); setMainLoading(true); setMainError(false); }}
                    onError={(e) => { e.target.src = getPriceFallbackImage() }}
                    className={`w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity ${image === item ? 'border-2 border-pink-dark p-1' : ''}`}
                    alt="Thumbnail"
                  />
                </div>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] relative aspect-square bg-pink-50 rounded-lg overflow-hidden'>
            {mainLoading && (
              <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50" />
            )}
            {mainError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-200 gap-3 bg-pink-50/50">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-widest opacity-50 text-pink-300">Image Unavailable</span>
              </div>
            ) : (
              <img
                src={image}
                className={`w-full h-full object-cover transition-opacity duration-300 ${mainLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setMainLoading(false)}
                onError={() => { setMainError(true); setMainLoading(false); }}
                alt="Main Product"
              />
            )}
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='mt-2 text-2xl font-medium'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="Ratings" className="w-3 5" />
            <img src={assets.star_icon} alt="Ratings" className="w-3 5" />
            <img src={assets.star_icon} alt="Ratings" className="w-3 5" />
            <img src={assets.star_icon} alt="Ratings" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="Ratings" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 rounded-md ${item === size ? 'border-orange-500' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className='px-8 py-3 text-sm text-white bg-black active:bg-gray-700'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='flex flex-col gap-1 mt-5 text-sm text-gray-500'>
            <p>Guaranteed 100% Authentic – Shop with Confidence!</p>
            <p>Enjoy Cash on Delivery – Pay at Your Doorstep!</p>
            <p>Hassle-Free Returns & Exchanges – 10 Days, No Questions Asked!</p>
          </div>
        </div>
      </div>
      {/* Description and Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='px-5 py-3 text-sm border'>Description</b>
          <p className='px-5 py-3 text-sm border'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border'>
          <p>Elevate your style with our meticulously crafted Jeronix Shop quality products. Designed with a perfect balance of elegance and practicality, these Jeronix Shop quality products made from premium materials that ensure both durability and comfort.</p>
          <p>Whether you're dressing up for a special occasion or adding a touch of sophistication to your everyday look, the Jeronix Shop quality products offer unparalleled versatility. Its timeless design, coupled with a flawless fit, makes it a must-have addition to any wardrobe. Don’t miss out on the chance to own a piece that combines both form and function—experience the difference today.</p>
        </div>
      </div>
      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
