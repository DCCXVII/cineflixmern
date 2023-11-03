import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { HiOutlineIdentification } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { ImSpinner4 } from "react-icons/im";
import { useUpdateUserMutation } from "../slices/userApiSlice";
const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const isPasswordValid = password.length >= 8;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isPasswordValid && isEmailValid) {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name: userInfo.name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("Invalid fields");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Background Image */}
      <div className="relative font-blinker h-screen bg-cover bg-center bg-curious-blue-400">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ebony-clay-950 to-curious-blue-600 opacity-70"></div>

        {/* Content */}
        <div className="flex justify-center items-center w-screen h-screen  text-white-100">
          <div className="relative m-auto w-2/5 bg-white rounded-xl bg-ebony-clay-600 bg-opacity-70">
            <div className="py-4 px-8 right-0 text-white text-xl border-b flex justify-start items-center ">
              <HiOutlineIdentification className="mr-1 text-curious-blue-600 text-3xl" />{" "}
              Update Profile
            </div>
            <form onSubmit={submitHandler}>
              <div className="py-4 px-8">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="Name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none border-none rounded w-full py-2 text-ebony-clay-950 px-3 text-gray-700 cursor-not-allowed "
                    id="Name"
                    type="Name"
                    placeholder="John Doe"
                    value={name}
                    readOnly
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label
                    className="block text-ebony-clay-300 mt-1  text-sm font-Alber_Sans"
                    htmlFor="Name"
                  >
                    You cannot change the name
                  </label>
                </div>
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
                    value={email}
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
                    className="appearance-none border-none rounded w-full py-2 px-3 text-ebony-clay-700 pr-10"
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

                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-curious-blue-700  hover:bg-curious-blue-600  text-white-100 py-2 px-4 rounded-xl"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-ebony-clay-600 bg-opacity-40">
          <ImSpinner4 className="animate-spin text-4xl text-curious-blue-600" />
        </div>
      )}
    </>
  );
};

export default Profile;
