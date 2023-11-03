import React from "react";
import logo from "../../assets/logo160.png";
import { GoHome } from "react-icons/go";
import { RiMovie2Line } from "react-icons/ri";
import { PiTelevisionSimple } from "react-icons/pi";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = ({ buttonText }) => {
  return (
    <>
      {/* bg-ebony-clay-950 */}
      <div className=" w-screen h-14 font-Alber_Sans backdrop-blur-2xl fixed shadow z-50 ">
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
              <a
                href="/login"
                className="bg-slate-900  rounded-xl text-base flex justify-center items-center text-center hover:bg-opacity-30 duration-300  text-white-100 no-underline mx-2 px-4 py-2"
              >
                <BsPersonFill className="mr-1" /> {buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
