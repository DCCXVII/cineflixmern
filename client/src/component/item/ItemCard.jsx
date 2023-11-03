import React from "react";
import { AiFillStar } from "react-icons/ai";

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
        <div className="item-rating z-20 absolute top-2 left-2 text-alabaster-50 bg-slate-900  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg">
          <div className="w-fit inline-flex pl-1 text-base rounded-sm">
          {item.vote_average.toFixed(1)}
          </div>
          <AiFillStar className="text-buttercup-600 text-base mx-1" />
        </div>
      );
    }
  };

  const renderImage = () => {
    if (itemType === "actor") {
      return item.profile_path ? (
        <img
          src={`${TMDB_BASE_IMAGE_URL}${item.profile_path}`}
          className="item-thumb w-60 h-[26rem] object-cover rounded-lg"
          alt={item.name}
        />
      ) : (
        <img
          src="/default-avatar.jpg" // Provide the URL to your default avatar image.
          className="item-thumb w-60 h-[26rem] object-cover "
          alt={item.name}
        />
      );
    } else {
      return (
        <img
          src={`${TMDB_BASE_IMAGE_URL}${item.poster_path}`}
          className="item-thumb w-60 h-[26rem] object-cover rounded-lg"
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
      <div className="item-image w-60  h-[26rem] overflow-hidden relative  ">
        {" "}
        {renderImage()}
        <div className="item-overlay absolute w-60 h-[26rem] inset-0 bg-gradient-to-b from-alabaster-50  to-slate-950 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg z-10"></div>
        {renderRating()}
        <div className="item-info relative mx-3 transform translate-y-full group-hover:-translate-y-16 transition-transform duration-300 z-10 w-56 h-fit">
          <h2 className="text-alabaster-50  text-xl ">
            {item.title || item.name}
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div className="item-card flex-none w-60 h-[26rem] transform transition-all duration-500 cursor-pointer group">
      {renderLinkToDetails()}
    </div>
  );
};

export default ItemCard;
