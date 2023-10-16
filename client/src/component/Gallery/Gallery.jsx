import React, { useState } from "react";
import ItemCard from "../item/ItemCard";
import { Link, useParams } from "react-router-dom";
import BACKGROUND from "../../assets/BACKGROUND.jpg";
import AutoSwiper from "../Slider/AutoSwiper";

const Gallery = ({ AutoSwiperTitle, items, trendingItems, itemType }) => {
  const [displayedItemsCount, setDisplayedItemsCount] = useState(10);

  const handleShowMore = () => {
    // Increase the number of displayed items by 10 or a different number if desired
    setDisplayedItemsCount((prevCount) => prevCount + 10);
  };

  const { UserId } = useParams();

  return (
    <>
      <div
        className="font-blinker h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUND})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ebony-clay-950 to-curious-blue-600 opacity-50"></div>

        <div className="relative h-full items-center justify-center">
          <div className="flex justify-center items-center pt-28"></div>
          <AutoSwiper
            items={trendingItems}
            titre={AutoSwiperTitle}
            itemType={itemType}
          />
        </div>
        <div className="relative  bg-curious-blue-950">
          <div className="relative pt-16"></div>
          <div className="relative container mx-auto mt-10 my-auto mb-4 ">
            <div className="grid grid-cols-5 gap-x-4 gap-y-7">
              {items.slice(0, displayedItemsCount).map((item, index) => (
                <div key={index} className="bg-gray-200 h-full">
                  <Link
                    key={index}
                    to={`/user/${UserId}/${itemType}/${item.id}`} // Include the '/user/:UserId' part
                  >
                    <ItemCard item={item} itemType={itemType} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {displayedItemsCount < items.length && (
            <div className="relative justify-center items-center mx-auto text-center ">
              <button
                className="highlight text-lg p-2 rounded-xl bg-ebony-clay-800 bg-opacity-90 text-white-50 hover:bg-ebony-clay-900"
                onClick={handleShowMore}
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
