import { createBrowserRouter } from "react-router-dom";
import Home from "./component/home/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import GuestLayout from "./Layouts/GuestLayout";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Movie from "./component/item/Movie";
import Serie from "./component/item/Serie";
import ResetPassword from "./pages/ResetPassword";
import Actor from "./component/item/Actor";
import Season from "./component/item/Season";
import UserLayout from "./Layouts/UserLayout";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "series",
        element: <Series />,
      },
    ],
  },
  {
    path: "/c/",
    element: <UserLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movie/:movieId",
        element: <Movie />,
      },

      {
        path: "series",
        element: <Series />,
      },
      {
        path: "serie/:serieId",
        element: <Serie />,
      },
      {
        path: "serie/:serieId/season/:seasonId",
        element: <Season />,
      },
      {
        path: "actor/:personId",
        element: <Actor />,
      },
    ],
  },
]);

export default router;
