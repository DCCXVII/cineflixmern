import React, { useEffect, useState } from "react";
import logo from "../../assets/logo160.png";
import { PiTelevisionSimple } from "react-icons/pi";
import { BsFillPersonFill, BsStarFill } from "react-icons/bs";
import { MdFavorite, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import landscape2 from "../../assets/landscape2.jpg";
import { GoHome } from "react-icons/go";
import { RiMovie2Line } from "react-icons/ri";
const SignedInNavbar = ({ userName, loginOut }) => {
  const [isListHovered, setIsListHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);


 

  return (
    <>
      {/* bg-ebony-clay-950 */}
      <div className=" w-screen h-14 font-blinker backdrop-blur-2xl fixed shadow z-50 ">
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center py-2 px-8">
            {/* Brand */}
            <Link to={`/c/home`}>
              <img src={logo} alt="Logo" />
            </Link>

            {/* Navigation */}
            <div className="items-center hidden sm:flex space-x-7">
            <a
                href="/"
                className="text-alabaster-50 text-2xl hover:text-alabaster-500 rounded-full no-underline px-4 py-2"
              >
                <GoHome />{" "}
              </a>

              <a
                href="/movies"
                className="text-alabaster-50 text-2xl hover:text-alabaster-500 rounded-full no-underline px-4 py-2"
              >
                <RiMovie2Line />{" "}
              </a>

              
              <a
                href="/series"
                className="text-alabaster-50 text-2xl hover:text-alabaster-500 rounded-full no-underline px-4 py-2"
              >
                <PiTelevisionSimple />
              </a>
            </div>

            {/* Sign in button */}
            <div className="items-center h-fit  flex">
              <button
                href="/login"
                className="bg-slate-900 text-alabaster-50 hover:bg-alabaster-950 rounded-lg  text-base flex justify-center items-center text-center  hover:bg-curious-blue-60 no-underline mx-4 p-2 "
                onMouseEnter={() => setIsListHovered(true)}
                onMouseLeave={() => setIsListHovered(false)} // Use onMouseLeave here
              >
               <BsStarFill className="mr-1 text-sm text-buttercup-600" /> Favorites 
                {isListHovered && (
                  <div className="absolute top-14 right-36  bg-ebony-clay-800 bg-opacity-90 text-curious-blue-100 rounded-lg w-72">
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
              </button>

              <button
                className="bg-alabaster-50  text-alabaster-900 rounded-full text-xl flex justify-center items-center text-center  hover:bg-alabaster-200 hover:text-alabaster-950 no-underline mx-2 p-2"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
              >
                <BsFillPersonFill className="" /> {/* {buttonText} */}
                {isProfileHovered && (
                  <div className="absolute top-14 right-20 bg-ebony-clay-800 bg-opacity-90 text-curious-blue-100 rounded-lg w-fit h-fit">
                    <ul className="py-2 text-base">
                      <li className="hover:bg-ebony-clay-600 ">
                        <Link to="/c/profile">
                          <button className="flex items-center p-2">
                            <BsFillPersonFill className="mr-3 text-xl text-curious-blue-400" />
                            <span className="text-white text-base flex items-center">
                              Cu/{userName}
                            </span>
                          </button>
                        </Link>
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignedInNavbar;
