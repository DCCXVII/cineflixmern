import React from "react";
import logo from "../../assets/logo160.png";
import { FiCompass } from "react-icons/fi";
import {PiFilmStrip,PiTelevision} from "react-icons/pi"
import {BsPersonFill} from "react-icons/bs";
import { FaTheaterMasks } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ buttonText }) => {
  return (
    <>
    {/* bg-ebony-clay-950 */}
      <div className=" w-screen h-14 font-blinker backdrop-blur-2xl fixed shadow z-50 ">
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center py-2 px-8">
            {/* Brand */}
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            
            {/* Navigation */}
            <div className="items-center hidden sm:flex space-x-7">
              <a
                href="/"
                className="text-curious-blue-600 text-2xl hover:text-curious-blue-300 rounded-full no-underline px-4 py-2"
              >
                <FiCompass />{" "}
              </a>

              <a
                href="/movies"
                className="text-curious-blue-100 text-2xl hover:text-curious-blue-300 rounded-full no-underline px-4 py-2"
              >
                <PiFilmStrip />{" "}
              </a>

              <a
                href="/series"
                className="text-curious-blue-100 text-2xl hover:text-curious-blue-300 rounded-full no-underline px-4 py-2"
              >
                <PiTelevision />
              </a>

              <a
                href="/actor"
                className="text-curious-blue-100 text-2xl hover:text-curious-blue-300 rounded-full no-underline px-4 py-2"
              >
                <FaTheaterMasks />{" "}
              </a>
            </div>

            {/* Sign in button */}
            <div className="items-center h-fit  flex">
              <a
                href="/login"
                className="bg-curious-blue-700 rounded-xl text-base flex justify-center items-center text-center hover:bg-curious-blue-600  text-white-100 no-underline mx-2 px-4 py-2"
              >
                <BsPersonFill className="mr-1"/>{" "}
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
