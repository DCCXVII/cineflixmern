import { Outlet, useNavigate, Navigate } from "react-router-dom";
import SignedInNavbar from "../component/navbar/SignedInNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { eareseFavoriteList } from "../slices/favoriteListSlice";

import Footer from "../component/Footer/Footer";

const UserLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { favoritelistItems } = useSelector((state) => state.favoriteList);
  if (userInfo === null) {
    return <Navigate to="/login" />;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(eareseFavoriteList());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <SignedInNavbar userName={userInfo.name} loginOut={logoutHandler} favoriteList={favoritelistItems} />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
