import "../index.css";
import logo from "../assets/logo160.png";
import React, { useState } from "react";
import backgroundImg from "../assets/BACKGROUND.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { HiOutlineIdentification } from "react-icons/hi2";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(" http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
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
              Reset your password
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
                    className="appearance-none border-none rounded w-full py-2 text-ebony-clay-950 px-3 text-gray-700"
                    id="email"
                    type="email"
                    placeholder="xyz@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-curious-blue-700  hover:bg-curious-blue-600  text-white-100 py-2 px-4 rounded-xl"
                    type="submit"
                  >
                    Reset password
                  </button>
                </div>
              </div>
            </form>
            <div className="py-3 px-8 border-t ">
              <p className="text-base text-white-50">
                you remembered your password?{" "}
                <span className="underline text-curious-blue-300">
                  <Link to="/login">Log in </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
