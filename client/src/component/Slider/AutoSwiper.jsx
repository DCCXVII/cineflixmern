import React from "react";
import ItemCard from "../item/ItemCard";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const AutoSwiper = ({ items, titre, itemType, sectionWidth }) => {
  return (
    <div className="instru-div py-4 font-blinker">
      <section
        className={`prof overflow-hidden w-${sectionWidth} mx-3 p-3 first-letter:my-10  `}
      >
        <div className="relative font-Alber_Sans w-fit h-fit justify-center text-2xl font-bold  flex items-center rounded-lg  text-white-50  mt-3 mb-4  px-2 py-1">
          {titre}
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
                <SwiperSlide
                  key={index}
                  className={`${
                    index === 4 ? "swiper-slide-visible" : ""
                  } mx-3`}
                >
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
