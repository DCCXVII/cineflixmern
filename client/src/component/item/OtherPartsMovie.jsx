import React from "react";
import "react-circular-progressbar/dist/styles.css";

const OtherPartsMovie = ({ OtherPartsItemData }) => {
  const TMDB_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="more-like-items inline-flex items-center  w-80">
      <div className="relative flex justify-between space-x-5 ">
        <img
          src={`${TMDB_BASE_IMAGE_URL}${OtherPartsItemData.poster_path}`}
          alt=""
          className="w-24 h-36 "
        />
        <div className="flex flex-col justify-start justify-items-start ">
          <div className="flex flex-col">
            <h1 className="text-white-50 text-xl font-bold">
              {OtherPartsItemData.original_title}
            </h1>
            <h1 className="text-curious-blue-300 text-xl font-thin">
              {OtherPartsItemData.release_date.substring(0, 4)}{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherPartsMovie;

