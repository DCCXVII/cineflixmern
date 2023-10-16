import React from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBar = () => {
  return (
    <div className="searchBox bg-white-50 relative w-1/3 h-16 flex items-center rounded-full  px-4 py-4 transition-all duration-300 hover:w-1/2">
      <input
        className="searchInput bg-transparent outline-none text-white text-xl flex-grow  transition-all duration-300"
        type="text"
        name=""
        placeholder="Search a movie or serie..."
      />
      <button className="searchButton text-2xl absolute top-0 right-0 text-white-100 bg-curious-blue-700 rounded-full w-16 h-16 flex justify-center items-center transition duration-400 hover:bg-gray-200 ">
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default SearchBar;
