import React, { useRef, useEffect, useState } from "react";
import ItemCard from "../item/ItemCard";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

const AutoSwiper = ({ items, titre, itemType }) => {
  const productContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleNextButtonClick = () => {
    const containerWidth = productContainerRef.current.offsetWidth;
    const scrollAmount =
      productContainerRef.current.scrollLeft + containerWidth;

    if (scrollAmount >= productContainerRef.current.scrollWidth) {
      // If the last item is visible, scroll back to the first item
      productContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      productContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePrevButtonClick = () => {
    const containerWidth = productContainerRef.current.offsetWidth;
    const scrollAmount =
      productContainerRef.current.scrollLeft - containerWidth;

    if (scrollAmount < 0) {
      // If the first item is visible, scroll to the last item
      productContainerRef.current.scrollTo({
        left: productContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    } else {
      productContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    let timer;
    if (!isHovered) {
      // Scroll every 3 seconds (you can adjust the interval as needed)
      timer = setInterval(() => {
        handleNextButtonClick();
      }, 1500);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isHovered]);

  const {UserId} = useParams();

  return (
    <div
      className="instru-div py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <section className="prof overflow-hidden mx-3 p-3 first-letter:my-10 h-full bg-curious-blue-950 rounded-xl">
        <div className="w-44 h-fit justify-center text-base mb-2 flex items-center rounded-xl text-white-50 px-3 py-2 bg-ebony-clay-900 bg-opacity-30">
          {titre} <FaArrowTrendUp className="mx-3 text-medium-purple-400" />
        </div>

        {/* Check if items is valid before mapping */}
        {items && items.length > 0 ? (
          <div
            className="prof-container flex overflow-x-hidden overflow-y-hidden h-full py-3 px-2 mr-1 scrollbar-hide"
            ref={productContainerRef}
          >
            {items.map((item, index) => (
              <Link key={index} to={`/user/${UserId}/${itemType}/${item.id}`}>
                <ItemCard key={index} item={item} />
              </Link>
            ))}
          </div>
        ) : (
          <div>No items to display</div>
        )}
      </section>
    </div>
  );
};

export default AutoSwiper;
