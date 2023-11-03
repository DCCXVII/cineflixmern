import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { HiOutlineIdentification } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { ImSpinner4 } from "react-icons/im";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { BsEye, BsEyeSlash } from "react-icons/bs";
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
      <div className="relative  w-full  font-Alber_Sans bg-slate-950 overflow-x-hidden">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

        {/* Content */}
        <div className="flex justify-center items-center w-screen h-screen  text-white-100">
          <div className="relative m-auto w-[27rem] bg-white rounded-xl bg-opacity-70">
            <h1 className="text-4xl font-medium text-alabaster-50 text-center mb-6 font-Alber_Sans">
              Update your{" "}
              <span className="text-slate-900 font-bold">Profile</span>
            </h1>
            <form onSubmit={submitHandler}>
              <div className="py-4 px-8">
                <div className="mb-4">
                  <label
                    className="block text-alabaster-50 text-lg font-medium mb-1"
                    htmlFor="Name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none font-Alber_Sans border-none rounded-lg w-full p-3 text-black-950"
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
                    className="block text-alabaster-50 text-lg font-medium mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none font-Alber_Sans border-none rounded-lg w-full p-3 text-black-950"
                    id="email"
                    type="email"
                    value={email}
                    placeholder="xyz@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-1 relative">
                  <label
                    className="block text-alabaster-50 text-lg font-medium mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none font-Alber_Sans border-none rounded-lg w-full p-3 text-black-950"
                    id="password"
                    type={showPassword ? "text" : "password"} // Show/hide password based on state
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* Show/hide password toggle button */}
                  <button
                    type="button"
                    className="absolute text-ebony-clay-950 text-xl inset-y-0 right-0 pt-9 pr-3 flex items-center focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <BsEyeSlash className="text-gray-500" />
                    ) : (
                      <BsEye className="text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-slate-900  hover:bg-opacity-40 duration-300  text-white-100 p-2 rounded-lg w-full"
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
