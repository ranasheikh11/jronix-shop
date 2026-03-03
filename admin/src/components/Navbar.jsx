import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <div className="top-0 left-0 z-50 w-full transition-all duration-300 bg-white border-b border-pink-100 shadow-sm">
      <div className="flex items-center py-4 px-[4%] justify-between">
        <Link to={"/"}>
          <span className='text-2xl font-bold tracking-widest text-pink-dark'>JERONIX SHOP</span>
        </Link>
        <button
          onClick={() => setToken("")}
          className="px-8 py-2 text-sm text-white bg-pink-dark rounded-full hover:bg-pink-900 transition-all shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
