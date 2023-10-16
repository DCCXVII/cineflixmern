import "../index.css";
import React, { useState } from "react";
import backgroundImg from "../assets/BACKGROUND.jpg";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "react-query"; // Import useMutation
import {login} from "../Apis/InternalApi"
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const navigate = useNavigate();
  const { UserId } = useParams();

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/login",
        { email, password },
        { withCredentials: true }
      );
      const { success, message , user} = data;
      const UserId = user._id;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate(`/c/home`);
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    // setEmail("");
    // setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {/* Background Image */}
      <div
        className="relative font-blinker h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ebony-clay-950 to-curious-blue-600 opacity-70"></div>

        {/* Content */}
        <div className="flex justify-center items-center w-screen h-screen  text-white-100">
          <div className="relative m-auto w-2/5 bg-white rounded-xl bg-ebony-clay-600 bg-opacity-70">
            <div className="py-4 px-8 right-0 text-white text-xl border-b flex justify-start items-center ">
              <BsPersonFill className="mr-1 text-curious-blue-600 text-3xl" />{" "}
              Log in
            </div>
            <form onSubmit={handleSubmit}>
              <div className="py-4 px-8">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none font-sans border-none rounded w-full py-2  px-3 text-ebony-clay-950"
                    id="email"
                    type="email"
                    placeholder="xyz@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-1 relative">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none font-sans border-none rounded w-full py-2  px-3 text-ebony-clay-950"
                    id="password"
                    type={showPassword ? "text" : "password"} // Show/hide password based on state
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* Show/hide password toggle button */}
                  <button
                    type="button"
                    className="absolute text-ebony-clay-950 text-xl inset-y-0 right-0 pt-9 pr-2 flex items-center focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-gray-500" />
                    ) : (
                      <AiOutlineEye className="text-gray-500" />
                    )}
                  </button>
                </div>
                <p className="text-base underline text-curious-blue-300">
                  <Link to="/reset-password">Forget your password?</Link>
                </p>

                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-curious-blue-700  hover:bg-curious-blue-600  text-white-100 py-2 px-4 rounded-xl"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <div className="py-3 px-8 border-t ">
              <p className="text-base text-white-50">
                don't you have an acount?{" "}
                <span className="underline text-curious-blue-300">
                  <Link to="/register">Create one </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignIn;