import React from "react";
import ItemCard from "../item/ItemCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import "../../Styles/CostumScrollBar.css";

const Slider = ({ items, titre, moreLink, itemType }) => {
  return (
    <div className="instru-div py-2 ">
      <section className=" relative overflow-hidden  mx-20 my-10 p-2 h-full rounded-xl bg-curious-blue-950 backdrop-blur-sm">
        <div className="w-fit h-fit justify-center text-base  flex items-center rounded-xl bg-ebony-clay-950 text-white-50 px-3 py-1 ml-3 mt-3 mb-4">
          {titre}
        </div>
        <Link to={moreLink}>
          <div className="absolute top-0 right-0 w-fit text-sm  flex items-center bg-curious-blue-500 hover:bg-medium-purple-400 text-white-50 rounded-xl mx-3 mt-3 mb-4  px-2 py-1 cursor-pointer">
            More
          </div>
        </Link>
        <Swiper spaceBetween={0} slidesPerView={5} watchSlidesVisibility={true} watchSlidesProgress={true} wrapperClass="my-swiper">
          {items.map((item, index) => (
            <SwiperSlide key={index} className={`${index === 4 ? 'swiper-slide-visible' : ''} mx-1`}>
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