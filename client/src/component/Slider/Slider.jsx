import React from "react";
import ItemCard from "../item/ItemCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../Styles/CostumScrollBar.css";
import { BiRightArrowAlt } from "react-icons/bi";

const Slider = ({ items, titre, moreLink, itemType }) => {
  return (
    <div className="instru-div py-2 font-Alber_Sans">
      <section className=" relative overflow-hidden  mx-10 my-10 p-2 h-full">
        <div className="flex justify-between items-center">
          <div className="relative font-Alber_Sans w-fit h-fit justify-center text-2xl font-bold  flex items-center rounded-lg  text-white-50  mt-3 mb-4  px-2 py-1">
            {titre}
          </div>
          <Link to={moreLink}>
            <button className="relative  w-fit text-base  flex  items-center  bg-alabaster-50 hover:bg-alabaster-300 text-shark-950 rounded-lg my-4 mx-2 px-2 py-1 cursor-pointer">
              More <BiRightArrowAlt className="" />
            </button>
          </Link>
        </div>
        <Swiper
          spaceBetween={0}
          slidesPerView={5}
          watchSlidesVisibility={true}
          watchSlidesProgress={true}
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={index}
              className={`${index === 5 ? "swiper-slide-visible" : ""}`}
            >
              <Link to={`/c/${itemType}/${item.id}`}>
                <ItemCard item={item} itemType={itemType} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Slider;
