import React, { useRef, useState } from "react";
// Import Swiper React components
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";


import ItemCard from "../item/ItemCard";

const SwiperA = ({items,itemType }) => {
  return (
    <>
       {items && items.length > 0 ? (
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            slidesPerView={6}
            modules={[Autoplay, Pagination, Navigation]}
          >
              {items.map((item, index) => (
                <SwiperSlide key={index} className={`${index === 4 ? "swiper-slide-visible" : ""} mx-5`}>
                  <Link to={`/c/${itemType}/${item.id}`}>
                    <ItemCard key={index} item={item} />
                  </Link>
                </SwiperSlide>
              ))}
            {/* </div> */}
          </Swiper>
        ) : (
          <div>No items to display</div>
        )}
    </>
  );
};

export default SwiperA;