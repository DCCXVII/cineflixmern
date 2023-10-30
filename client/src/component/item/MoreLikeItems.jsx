import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MoreLikeItems = ({ MoreLikeItemData }) => {
  const TMDB_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="more-like-items inline-flex items-center  w-fit">
      <div className="relative flex justify-between space-x-5">
        <img
          src={`${TMDB_BASE_IMAGE_URL}${MoreLikeItemData.poster_path}`}
          alt=""
          className="w-20 h-32 rounded-xl"
        />
        <div className="flex flex-col justify-start justify-items-start w-44">
          <div className="flex flex-col">
            <h1 className="text-white-50 text-base font-bold">
              {MoreLikeItemData.title || MoreLikeItemData.name}{" "}
              {/* Display title or name */}
            </h1>
            <h1 className="text-curious-blue-300 text-base font-thin">
              {MoreLikeItemData.release_date?.substring(0, 4) ||
                MoreLikeItemData.first_air_date?.substring(0, 4)}{" "}
              {/* Display release_date or first_air_date */}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreLikeItems;
