import React from "react";
import { AiFillStar } from "react-icons/ai";

const itemPerson = ({ item, pathName }) => {
  const TMDB_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="item-card flex-none w-72 h-fit mr-8 transform transition-all duration-500 cursor-pointer group">
      <div className="item-image w-full h-fit overflow-hidden relative">
        <img
          src={`${TMDB_BASE_IMAGE_URL}${item.poster_path}`}
          className="item-thumb w-full h-5/6 object-cover"
          alt={item.title}
        />

        <div className="item-overlay absolute inset-0 bg-gradient-to-b from-ebony-clay-950 to-curious-blue-600 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

        <div className="item-rating absolute top-0 left-0 text-ebony-clay-950 bg-buttercup-400 flex items-center justify-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-fit mx-1 inline-flex px-1 text-lg rounded-sm mr-1">
            {item.vote_average}
          </div>
          <AiFillStar className="text-ebony-clay-950 text-lg mx-1" />
        </div>

        <div className="item-info absolute bottom-0 left-0 right-0 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="text-white-50 ml-3 text-xl">
            {item.release_date}
          </div>

          <div className="item-title text-ebony-clay-950 bg-curious-blue-600 flex items-center justify-center py-1">
            <div className="w-fit inline-flex px-2 text-xl rounded-sm mr-1">
              <h2 className="text-white-100 text-xl">{item.title} {item.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default itemPerson;
