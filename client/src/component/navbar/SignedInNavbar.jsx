import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

import logo from "../../assets/logo160.png";
import { FiCompass } from "react-icons/fi";
import { PiFilmStrip, PiTelevision, PiListFill } from "react-icons/pi";
import { RiPlayList2Fill } from "react-icons/ri";
import { BsFillPersonFill, BsBookmarkFill } from "react-icons/bs";
import { MdFavorite, MdLogout } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import landscape2 from "../../assets/landscape2.jpg";

const SignedInNavbar = ({ userName, loginOut, id }) => {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isListHovered, setIsListHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [itemsWatchlist, setWatchlistItems] = useState([]);

  axios
    .get("http://localhost:4000/api/user/Mywatchlist/")
    .then((response) => {
      const itemsWatchlist = response.data.watchlistItems;
      setWatchlistItems(itemsWatchlist);
      console.log(itemsWatchlist); // Log the watchlist items here
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <>
      {/* bg-ebony-clay-950 */}
      <div className=" w-screen h-14 font-blinker backdrop-blur-2xl fixed shadow z-50 ">
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center py-2 px-8">
            {/* Brand */}
            <Link to={`/user/${id}`}>
              <img src={logo} alt="Logo" />
            </Link>

            {/* Navigation */}
            <div className="items-center hidden sm:flex space-x-7">
              <a
                href={`/user/${id}`}
                className="text-curious-blue-600 text-2xl hover:text-curious-blue-300 rounded-full no-underline px-4 py-2"
              >
                <FiCompass />{" "}
              </a>

              <a
                href={`/user/${id}/movies`}
                className="text-curious-blue-100 text-2xl hover:text-curious-blue-300 rounded-full no-underline px-4 py-2"
              >
                <PiFilmStrip />{" "}
              </a>

              <a
                href={`/user/${id}/series`}
                className="text-curious-blue-100 text-2xl hover:text-curious-blue-300 rounded-full no-underline px-4 py-2"
              >
                <PiTelevision />
              </a>

              {/* <a
                href="/actor"
                className="text-curious-blue-100 text-2xl hover:text-curious-blue-300 rounded-full no-underline px-4 py-2"
              >
                <FaTheaterMasks />{" "}
              </a> */}
            </div>

            {/* Sign in button */}
            <div className="items-center h-fit  flex">
              <button
                className="text-white-100 rounded-xl text-base flex justify-center items-center text-center hover:bg-curious-blue-60 no-underline px-3 py-2 h-fit w-fit"
                onClick={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}
              >
                <RiPlayList2Fill className="text-lg" />{" "}
                {isMenuHovered && (
                  <div className="absolute top-12 right-48 bg-ebony-clay-800 bg-opacity-90 text-curious-blue-100 rounded-lg w-72">
                    <ul className="py-2 text-base">
                      {itemsWatchlist.map((item) => (
                        <li className="hover:bg-ebony-clay-600" key={item._id}>
                          <button className="flex items-center p-2">
                            <img
                              src={item.image}
                              className="w-20 h-14 rounded-xl"
                            />
                            <div className="ml-3 grid grid-cols-1 justify-items-start">
                              <span className="title font-sans text-white text-lg font-bold">
                                {item.title}
                              </span>
                              <span className="date font-normal text-ebony-clay-400 text-base">
                                Added:{" "}
                                <span className="font-sans">
                                  {item.dateAdded}
                                </span>
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </button>

              <div
                href="/login"
                className="bg-medium-purple-600 text-white-100 rounded-xl  text-base flex justify-center items-center text-center  hover:bg-curious-blue-60 no-underline mx-4 px-3 py-2 h-fit w-fit"
                onMouseEnter={() => setIsListHovered(true)}
                onMouseLeave={() => setIsListHovered(false)} // Use onMouseLeave here
              >
                <MdFavorite className=" text-lg" />{" "}
                {isListHovered && (
                  <div className="absolute top-12 right-36  bg-ebony-clay-800 bg-opacity-90 text-curious-blue-100 rounded-lg w-72">
                    <ul className="py-2 text-base">
                      <li className="hover:bg-ebony-clay-600">
                        <div className="flex items-center p-2">
                          <img
                            src={landscape2}
                            className="w-20 h-14 rounded-xl"
                          />
                          <div className="ml-3 grid grid-cols-1 justify-items-start flex-grow">
                            <span className="title font-sans text-white text-lg font-bold">
                              1917
                            </span>
                          </div>
                          <button className="favorited relative rounded-full text-red-700 bg-ebony-clay-200 p-1">
                            <MdFavorite />
                          </button>
                        </div>
                      </li>
                      <li className="hover:bg-ebony-clay-600">
                        <div className="flex items-center p-2">
                          <img
                            src={landscape2}
                            className="w-20 h-14 rounded-xl"
                          />
                          <div className="ml-3 grid grid-cols-1 justify-items-start flex-grow">
                            <span className="title font-sans text-white text-lg font-bold">
                              1917
                            </span>
                          </div>
                          <button className="favorited relative rounded-full text-red-700 bg-ebony-clay-200 p-1">
                            <MdFavorite />
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div
                href="/login"
                className="bg-curious-blue-300  text-curious-blue-600 rounded-full text-xl flex justify-center items-center text-center  hover:bg-curious-blue-600 hover:text-white-100 no-underline mx-2 px-2 py-2"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
              >
                <BsFillPersonFill className="" /> {/* {buttonText} */}
                {isProfileHovered && (
                  <div className="absolute top-12 right-20  bg-ebony-clay-800 bg-opacity-90 text-curious-blue-100 rounded-lg w-fit  ">
                    <ul className="py-2 text-base">
                      <li className="hover:bg-ebony-clay-600 ">
                        <button className="flex items-center p-2">
                          {" "}
                          <BsFillPersonFill className="mr-3 text-xl text-curious-blue-400" />{" "}
                          <span className="text-white text-base">
                            Cu/<span>{userName}</span>
                          </span>
                        </button>
                      </li>
                      <li className="hover:bg-ebony-clay-600 ">
                        <button
                          className="flex items-center p-2"
                          onClick={loginOut}
                        >
                          {" "}
                          <MdLogout className="mr-3 text-xl text-curious-blue-400" />{" "}
                          <span className="text-white text-base">Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignedInNavbar;