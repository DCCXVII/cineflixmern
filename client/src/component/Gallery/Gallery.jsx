import React, { useState } from "react";
import ItemCard from "../item/ItemCard";
import { Link, useParams } from "react-router-dom";
import AutoSwiper from "../Slider/AutoSwiper";
import { AiOutlineDown } from "react-icons/ai";

const Gallery = ({ AutoSwiperTitle, items, trendingItems, itemType }) => {
  const [displayedItemsCount, setDisplayedItemsCount] = useState(10);

  const handleShowMore = () => {
    // Increase the number of displayed items by 10 or a different number if desired
    setDisplayedItemsCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      <div className="relative font-blinker w-full   bg-slate-950 overflow-x-hidden">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

        <div className="relative pt-20 h-full items-center justify-center">
          <AutoSwiper
            items={trendingItems}
            titre={AutoSwiperTitle}
            itemType={itemType}
          />
        </div>

        <div className="relative container mx-auto  mt-20  ">
          <div className="relative items-center justify-center justify-items-center text-2xl text-alabaster-50 font-Alber_Sans font-bold my-5">
            Explore {itemType}s
          </div>
          <div className="grid grid-cols-5 gap-x-0 gap-y-7">
            {items.slice(0, displayedItemsCount).map((item, index) => (
              <div key={index} className="bg-gray-200 h-full">
                <Link key={index} to={`/c/${itemType}/${item.id}`}>
                  <ItemCard item={item} itemType={itemType} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {displayedItemsCount < items.length && (
          <div className="relative  mx-auto text-center py-6 ">
            <button
              className="bg-alabaster-900 text-alabaster-50 hover:bg-alabaster-950 rounded-lg  text-base justify-center items-center text-center  hover:bg-curious-blue-60 no-underline mx-4 p-2 "
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
