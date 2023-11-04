import React, { useState } from "react";
import logo from "../../assets/logo160.png";
import { PiTelevisionSimple } from "react-icons/pi";
import { BsFillPersonFill, BsStarFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiMovie2Line } from "react-icons/ri";
import "../../Styles/CostumScrollBar.css";

const SignedInNavbar = ({ userName, loginOut, favoriteList }) => {
  const [isListHovered, setIsListHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const URL_BACKDROP = "https://image.tmdb.org/t/p/original";
  return (
    <>
      {/* bg-ebony-clay-950 */}
      <div className=" w-screen h-14 font-Alber_Sans backdrop-blur-2xl fixed shadow z-50 ">
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center py-2 px-8">
            {/* Brand */}
            <Link to={`/c/home`}>
              <img src={logo} alt="Logo" />
            </Link>

            {/* Navigation */}
            <div className="items-center hidden sm:flex space-x-7">
              <a
                href="/c/home"
                className="text-alabaster-50 text-2xl hover:text-alabaster-500 rounded-full no-underline px-4 py-2"
              >
                <GoHome />{" "}
              </a>

              <a
                href="/c/movies"
                className="text-alabaster-50 text-2xl hover:text-alabaster-500 rounded-full no-underline px-4 py-2"
              >
                <RiMovie2Line />{" "}
              </a>

              <a
                href="/c/series"
                className="text-alabaster-50 text-2xl hover:text-alabaster-500 rounded-full no-underline px-4 py-2"
              >
                <PiTelevisionSimple />
              </a>
            </div>

            {/* Sign in button */}
            <div className="items-center h-fit  flex">
              <div
                className="bg-slate-900 text-alabaster-50 hover:bg-opacity-80 duration-300 rounded-lg  text-base flex justify-center items-center text-center  hover:bg-curious-blue-60 no-underline mx-4 p-2 w-fit h-fit cursor-pointer"
                onMouseEnter={() => setIsListHovered(true)}
                onMouseLeave={() => setIsListHovered(false)} // Use onMouseLeave here
              >
                <BsStarFill className="mr-1 text-sm text-buttercup-600" />{" "}
                Favorites
                {isListHovered && (
                  <div className="absolute top-14 right-36 bg-slate-950 bg-opacity-80 text-curious-blue-100 rounded-lg w-96 ">
                    <div className="max-h-72 min-h-[8rem] overflow-y-auto my-1 custom-scroll-bar">
                      <ul className="py-2 custom-scroll-bar ">
                        {[...favoriteList]
                          .reverse()
                          .map((favorite) => (
                            <li
                              key={favorite.id}
                              className="hover:bg-ebony-clay-600 "
                            >
                              <div className="flex items-center p-2">
                                <Link
                                  to={`/c/${favorite.type}/${favorite.tmdb_id}`}
                                  className="flex justify-between space-x-2 items-center"
                                >
                                  <img
                                    src={`${URL_BACKDROP}${favorite.image}`}
                                    className="w-12 h-16 rounded-lg"
                                  />
                                  <div className="ml-2 felx flex-col justify-start ">
                                    <h1 className="title text-alabaster-50 font-Alber_Sans text-base text-left">
                                      {favorite.name}
                                    </h1>
                                    <h1 className="title text-alabaster-300 font-Alber_Sans text-base text-left">
                                      <span className="title  font-Alber_Sans text-base text-left">
                                        type :
                                      </span>{" "}
                                      {favorite.type}
                                    </h1>
                                  </div>
                                </Link>
                              </div>
                              <div className="bg-alabaster-50 bg-opacity-10 h-[1px] w-full"></div>

                            </li>
                          ))}
                        {favoriteList.length === 0 && (
                          <h1 className="text-center justify-items-center text-2xl">
                            Your list is empty
                          </h1>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="bg-alabaster-50  text-alabaster-900 rounded-full text-xl flex justify-center items-center text-center  hover:bg-alabaster-200 hover:text-alabaster-950 no-underline mx-2 p-2 w-fit h-fit  cursor-pointer"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
              >
                <BsFillPersonFill className="" /> {/* {buttonText} */}
                {isProfileHovered && (
                  <div className="absolute top-14 right-20  bg-slate-950 bg-opacity-80 text-curious-blue-100 rounded-lg w-40 font-Alber_Sans">
                    <ul className="py-2 text-base">
                      <li className="hover:bg-ebony-clay-600 ">
                        <Link to="/c/profile">
                          <button className="flex items-center p-2">
                            <BsFillPersonFill className="mr-3 text-xl text-alabaster-50" />
                            <span className="text-white text-base flex items-center">
                              Cu/{userName}
                            </span>
                          </button>
                        </Link>
                      </li>
                      <div className="bg-alabaster-50 bg-opacity-10 h-[1px] w-full"></div>

                      <li className="hover:bg-ebony-clay-600 ">
                        <button
                          className="flex items-center p-2 text-alabaster-50"
                          onClick={loginOut}
                        >
                          {" "}
                          <MdLogout className="mr-3 text-xl " />{" "}
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
