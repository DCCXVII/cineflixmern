import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

const Filter = ({ onFilterChange }) => {
  const [selectedGenre, setSelectedGenre] = useState("-- Genre --");
  const [selectedYear, setSelectedYear] = useState("-- Year --");
  const [selectedRating, setSelectedRating] = useState("-- Rating --");

  const handleFilterChange = () => {
    // Prepare the filter parameters based on selected options
    const filterParams = {
      genre: selectedGenre !== "-- Genre --" ? selectedGenre : "",
      year: selectedYear !== "-- Year --" ? selectedYear : "",
      rating: selectedRating !== "-- Rating --" ? selectedRating : "",
    };

    // Trigger the filter change callback with the filter parameters
    onFilterChange(filterParams);
  }

  return (
    <div className="flex font-blinker bg-curious-blue-900 items-center justify-between p-3 mx-16 h-full rounded-xl">
      <div className="flex text-white-100 items-center">
        <select
          className="bg-curious-blue-800 w-72 h-9 p-1 text-base rounded-md"
          onChange={(e) => setSelectedGenre(e.target.value)}
          value={selectedGenre}
        >
          <option value="-- Genre --">-- Genre --</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Drama">Drama</option>
          {/* Add more genre options */}
        </select>
      </div>
      <div className="flex text-white-100 items-center">
        <select
          className="bg-curious-blue-800 w-72 h-9 p-1 text-base rounded-md"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          <option value="-- Year --">-- Year --</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          {/* Add more year options */}
        </select>
      </div>
      <div className="flex text-white-100 items-center">
        <select
          className="bg-curious-blue-800 w-72 h-9 p-1 text-base rounded-md"
          onChange={(e) => setSelectedRating(e.target.value)}
          value={selectedRating}
        >
          <option value="-- Rating --">-- Rating --</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          {/* Add more rating options */}
        </select>
      </div>
      <button
        className="bg-curious-blue-800 text-white-100 p-1 rounded-md ml-4"
        onClick={handleFilterChange}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
