
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../component/navbar/navbar";
import SignedInNavbar from "../component/navbar/SignedInNavbar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UserLayout = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const { UserId } = useParams();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token && !cookies.user._id) {
        navigate("/login");
        return;
      }
      try {
        const { data } = await axios.post(
          `http://localhost:4000/api/user`,
          {},
          { withCredentials: true }
        );
        const { status, user, name } = data;
        console.log(user);

        setName(name);
        setId(user);

        if (status) {
          toast(`Hello ${name}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <SignedInNavbar userName={name} loginOut={Logout} id={id} />
      <Outlet />
    </>
  );
};

export default UserLayout;
