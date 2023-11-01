import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/Footer/Footer";
const GuestLayout = () => {
  return (
    <>
      <Navbar buttonText={"Sign In"} />
      <Outlet />
      <Footer/>

    </>
  );
};

export default GuestLayout;
