import React, { useState } from "react";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiBookmark, BiListPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { API_KEY } from "../../Apis/TmdbApi";
const TMDB_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const ItemCard = ({ item, itemType }) => {
   const renderRating = () => {
    if (itemType === "actor") {
      return item.vote_average ? (
        <div className="nothing"></div>
      ) : (
        <div className="nothing"></div>
      );
    } else {
      return (
        <div className="item-rating z-20 absolute top-2 left-2 text-ebony-clay-950 bg-buttercup-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg">
          <div className="w-fit inline-flex pl-1 text-base rounded-sm">
            {item.vote_average}
          </div>
          <AiFillStar className="text-ebony-clay-950 text-base mx-1" />
        </div>
      );
    }
  };

  const renderImage = () => {
    if (itemType === "actor") {
      return item.profile_path ? (
        <img
          src={`${TMDB_BASE_IMAGE_URL}${item.profile_path}`}
          className="item-thumb w-60 h-5/6 object-cover rounded-xl"
          alt={item.name}
        />
      ) : (
        <img
          src="/default-avatar.jpg" // Provide the URL to your default avatar image.
          className="item-thumb w-60 h-5/6 object-cover "
          alt={item.name}
        />
      );
    } else {
      return (
        <img
          src={`${TMDB_BASE_IMAGE_URL}${item.poster_path}`}
          className="item-thumb w-60 h-5/6 object-cover rounded-xl"
          alt={item.title}
        />
      );
    }
  };

  const renderLinkToDetails = () => {
    let url;
    if (itemType === "movie") {
      url = `/movie/${item.id}`;
    } else if (itemType === "tv") {
      url = `/tv/${item.id}`;
    } else if (itemType === "actor") {
      url = `/person/${item.id}`;
    }

    return (
      <div className="item-image w-60  h-5/6 overflow-hidden relative  ">
        {" "}
        {renderImage()}
        <div className="item-overlay absolute w-60 h-full inset-0 bg-gradient-to-b from-ebony-clay-950 to-curious-blue-600 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg z-10"></div>
        {renderRating()}
        <div className="item-info absolute bottom-0 left-0 right-0 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
          <div className="text-white-50 ml-3 text-base">
            {item.release_date}
          </div>
          <div className="item-title w-60 h-5/6 text-ebony-clay-950 bg-curious-blue-600 flex items-center justify-center py-1 rounded-b-lg">
            <div className="inline-flex px-2 text-xl rounded-sm mr-1">
              <h2 className="text-white-100 text-base">
                {item.title || item.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="item-card flex-none w-60 h-fit transform transition-all duration-500 cursor-pointer group">
      {renderLinkToDetails()}
    </div>
  );
};

export default ItemCard;
