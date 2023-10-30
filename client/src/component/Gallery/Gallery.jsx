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


  return (
    <>
      <div
        className="relative font-blinker h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUND})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ebony-clay-950 to-curious-blue-600 opacity-50"></div>

        <div className="relative pt-32 h-full items-center justify-center">
          <AutoSwiper
            items={trendingItems}
            titre={AutoSwiperTitle}
            itemType={itemType}
          />
        </div>
      </div>
      <div className="relative font-blinker pt-16 bg-curious-blue-900 pb-10">
        <div className="relative container mx-auto   ">
          <div className="grid grid-cols-5 gap-x-0 gap-y-7">
            {items.slice(0, displayedItemsCount).map((item, index) => (
              <div key={index} className="bg-gray-200 h-full">
                <Link
                  key={index}
                  to={`/c/${itemType}/${item.id}`} 
                >
                  <ItemCard item={item} itemType={itemType} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {displayedItemsCount < items.length && (
          <div className="relative justify-center items-center mx-auto text-center py-6 ">
            <button
              className="highlight font-blinker p-2 text-white-50 bg-curious-blue-600 uppercase text-sm w-fit h-fit mr-2  justify-center items-center border-none rounded-xl hover:bg-curious-blue-400 hover:text-curious-blue-100"
              onClick={handleShowMore}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
