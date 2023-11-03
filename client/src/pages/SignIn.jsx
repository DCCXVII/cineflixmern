import React, { useState, useEffect } from "react";
import backgroundImg from "../assets/BACKGROUND.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsEye, BsEyeSlash, BsPersonFill } from "react-icons/bs";
import { ImSpinner4 } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetAllFavoritesMutation } from "../slices/favoriteListApiSlice";
import { updateFavoriteList } from "../slices/favoriteListSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favorites, { isFavsLoading }] = useGetAllFavoritesMutation();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { favoritelistItems } = useSelector((state) => state.favoriteList);
  useEffect(() => {
    if (userInfo) {
      navigate("/c/home");
    }
  }, [navigate, userInfo, favoritelistItems]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      const favoritesList = await favorites().unwrap();
      //console.log(favoritesList);
      dispatch(setCredentials({ ...res }));
      dispatch(updateFavoriteList(favoritesList));
      navigate("/c/home");
    } catch (err) {
      console.log(err);
    }
  };

  // old  Login function
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:4000/api/login",
  //       { email, password },
  //       { withCredentials: true }
  //     );
  //     const { success, message , user} = data;
  //     const UserId = user._id;
  //     if (success) {
  //       handleSuccess(message);
  //       setTimeout(() => {
  //         navigate(`/c/home`);
  //       }, 1000);
  //     } else {
  //       handleError(message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // setEmail("");
  //   // setPassword("");
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {/* Background Image */}
      <div className="relative  w-full  font-blinker  bg-slate-950 overflow-x-hidden">
        {/* Overlay */}
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

        {/* Content */}
        <div className="flex justify-center items-center  h-screen">
          <div className="relative m-auto w-[27rem] bg-white rounded-xl bg-opacity-70">
            <h1 className="text-4xl font-medium text-alabaster-50 text-center mb-6 font-Alber_Sans">
              Welcome back!
            </h1>
            <form onSubmit={submitHandler}>
              <div className="py-4 px-8">
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
                      <BsEyeSlash className="text-alabaster-950" />
                    ) : (
                      <BsEye className="text-alabaster-950" />
                    )}
                  </button>
                </div>
                <p className="text-base text-alabaster-400 my-2 hover:text-alabaster-100">
                  <Link to="/reset-password">Forget your password?</Link>
                </p>

                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-slate-900  hover:bg-opacity-40 duration-300  text-white-100 p-2 rounded-lg w-full"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <div className="py-3 px-8 items-center justify-center text-center ">
              <p className="text-base text-alabaster-400">
                don't you have an acount?{" "}
                <span className="underline text-slate-900 ">
                  <Link to="/register">Create one </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-alabaster-50 bg-opacity-40">
            <ImSpinner4 className="animate-spin text-4xl text-slate-950" />
          </div>
        )}
      </div>
    </>
  );
};

export default SignIn;
