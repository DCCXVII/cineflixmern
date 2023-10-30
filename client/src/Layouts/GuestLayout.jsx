import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar/navbar";
const GuestLayout = () => {
  return (
    <>
      <Navbar buttonText={"Sign In"} />
      <Outlet />
    </>
  );
};

export default GuestLayout;
