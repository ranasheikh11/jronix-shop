import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-pink-100 bg-white">
      <div className="flex flex-col gap-2 pt-6 pl-[10%] text-[15px]">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-pink-100 border-r-0 px-3 py-3 rounded-l-full transition-all duration-300 ${isActive ? 'bg-pink-50 text-pink-dark border-pink-200' : 'text-gray-600 hover:bg-gray-50'}`
          }
          to={"/add"}
        >
          <img className="w-5 h-5 opacity-70" src={assets.add_icon} alt="Add Items" />
          <p className="hidden font-medium md:block text-pink-dark">Add Items</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-pink-100 border-r-0 px-3 py-3 rounded-l-full transition-all duration-300 ${isActive ? 'bg-pink-50 text-pink-dark border-pink-200' : 'text-gray-600 hover:bg-gray-50'}`
          }
          to={"/list"}
        >
          <img className="w-5 h-5 opacity-70" src={assets.parcel_icon} alt="List Items" />
          <p className="hidden font-medium md:block text-pink-dark">List Items</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-pink-100 border-r-0 px-3 py-3 rounded-l-full transition-all duration-300 ${isActive ? 'bg-pink-50 text-pink-dark border-pink-200' : 'text-gray-600 hover:bg-gray-50'}`
          }
          to={"/orders"}
        >
          <img className="w-5 h-5 opacity-70" src={assets.order_icon} alt="Add Products" />
          <p className="hidden font-medium md:block text-pink-dark">View Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
