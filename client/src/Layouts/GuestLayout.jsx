import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar/navbar";
import SignedInNavbar from "../component/navbar/SignedInNavbar";

const GuestLayout = () => {
  return (
    <>
      <Navbar buttonText={"Sign In"} />
      <Outlet />
    </>
  );
};

export default GuestLayout;
