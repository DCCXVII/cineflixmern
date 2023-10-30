import React from "react";
import ItemCard from "../item/ItemCard";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const AutoSwiper = ({ items, titre, itemType , sectionWidth}) => {
  return (
    <div className="instru-div py-4">
      <section className={`prof overflow-hidden w-${sectionWidth} mx-3 p-3 first-letter:my-10  bg-curious-blue-900 rounded-xl`}>
        <div className="w-fit  justify-center text-base mb-2 flex items-center rounded-xl text-white-50 px-3 py-2 bg-ebony-clay-900 bg-opacity-30">
          {titre} <FaArrowTrendUp className="mx-3 text-medium-purple-400" />
        </div>

        {items && items.length > 0 ? (
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            slidesPerView={6}
            modules={[Autoplay, Pagination, Navigation]}
          >
            <div className="prof-container flex overflow-x-hidden overflow-y-hidden w-96 h-fit py-3 px-2 mr-1 scrollbar-hide">
              {items.map((item, index) => (
                <SwiperSlide key={index} className={`${index === 4 ? "swiper-slide-visible" : ""} mx-3`}>
                  <Link to={`/c/${itemType}/${item.id}`}>
                    <ItemCard key={index} item={item} />
                  </Link>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        ) : (
          <div>No items to display</div>
        )}
      </section>
    </div>
  );
};

export default AutoSwiper;
