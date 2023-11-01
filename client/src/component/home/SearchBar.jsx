import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  return (
    <div className="searchBox bg-white-50 relative w-96 h-12 flex items-center rounded-l-2xl rounded-r-none   px-4 py-4 transition-all duration-300 hover:w-[27rem]">
      <input
        className="searchInput bg-transparent outline-none text-white text-xl flex-grow  transition-all duration-300"
        type="text"
        name=""
        placeholder="Search a movie or serie..."
      />
      <button className="searchButton text-xl absolute top-0 -right-5 text-neutral-300 bg-slate-950  border-slate-50 border-[1px] rounded-r-2xl rounded-l-none w-12 h-12 flex justify-center items-center transition duration-400 hover:bg-gray-200 ">
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchBar;
