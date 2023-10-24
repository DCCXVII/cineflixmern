import React, { useRef } from "react";
import ItemCard from "../item/ItemCard";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

const Slider = ({ items, titre, moreLink, itemType }) => {
  const productContainerRef = useRef(null);

  const handleNextButtonClick = () => {
    const containerWidth = productContainerRef.current.offsetWidth;
    productContainerRef.current.scrollLeft += containerWidth;
  };

  const handlePrevButtonClick = () => {
    const containerWidth = productContainerRef.current.offsetWidth;
    productContainerRef.current.scrollLeft -= containerWidth;
  };


  return (
    <div className="instru-div py-2 ">
      <button
        className="pre-btn z-10 border-none w-8 h-9   absolute top-1/2 left-3 transform-translate-y-1/2 bg-curious-blue-500 rounded-xl mx-2 pl-2 shadow-3xl"
        onClick={handlePrevButtonClick}
      >
        <GrFormPrevious />
      </button>
      <button
        className="nxt-btn z-10 border-none w-8 h-9 absolute top-1/2 right-3 transform -translate-y-1/2 bg-curious-blue-500 rounded-xl mx-2 pl-2 shadow-3xl"
        onClick={handleNextButtonClick}
      >
        <GrFormNext />
      </button>

      <section className=" relative overflow-hidden  mx-20 my-10 h-full  rounded-xl bg-curious-blue-900">
        <div className="w-fit h-fit justify-center text-base  flex items-center rounded-xl bg-ebony-clay-950 text-white-50 px-3 py-1 ml-3 mt-3 mb-4">
          {titre} <FaArrowTrendUp className="ml-2 text-buttercup-500" />
        </div>
        <Link to={moreLink}>
          <div className="absolute top-0 right-0 w-fit text-sm  flex items-center bg-curious-blue-500 hover:bg-medium-purple-400 text-white-50 rounded-xl mx-3 mt-3 mb-4  px-2 py-1 cursor-pointer">
            More <GrFormNext className=" text-curious-blue-200 text-sm " />
          </div>
        </Link>
        <div
          className="prof-container flex overflow-x-hidden  overflow-y-hidden h-full py-2 px-2 scrollbar-hide"
          ref={productContainerRef}
        >
          {items.map((item, index) => (
            <Link key={index} to={`/c/${itemType}/${item.id}`}>
              <div className="z-20">
                {" "}
                <ItemCard item={item} itemType={itemType} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Slider;
