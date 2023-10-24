import React, { useState } from "react";
import { BsFillPlayFill, BsThreeDots, BsFillPersonFill } from "react-icons/bs";
import { PiListPlusFill } from "react-icons/pi";
import { GoBookmark, GoBookmarkSlash } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { useQuery } from "react-query";
import {
  fetchMovieDetails,
  fetchMoreLikeMovies,
  fetchMovieCredits,
} from "../../Apis/TmdbApi";
import { Link, useParams } from "react-router-dom";
import MoreLikeItems from "./MoreLikeItems";
import "../../Styles/CostumScrollBar.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddItemMutation,
  useRemoveItemMutation,
} from "../../slices/userApiSlice";

const Movie = () => {
  const [addItem, { isLoadingadd }] = useAddItemMutation();
  const [removeItem, { isLoadingrem }] = useRemoveItemMutation();

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const { movieId } = useParams();

  // Fetch movie details using React Query
  const {
    data: movieData,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
    error: errorMovie,
  } = useQuery(["movieDetails", movieId], () => fetchMovieDetails(movieId));

  // Fetch more like movies using React Query
  const {
    data: moreLikeMovies,
    isLoading: isLoadingMoreLike,
    isError: isErrorMoreLike,
    error: errorMoreLike,
  } = useQuery(["moreLikeMovies", movieId], () => fetchMoreLikeMovies(movieId));

  // FETCH CREDITS  :

  const {
    data: movieCreditsData,
    isLoading: isLoadingMovieCredits,
    isError: isErrorMovieCredits,
    error: errorMovieCredits,
  } = useQuery(["movieCredits", movieId], () => fetchMovieCredits(movieId));

  if (isLoadingMovie || isLoadingMoreLike || isLoadingMovieCredits) {
    return <div>Loading...</div>;
  }

  if (isErrorMovie || isErrorMoreLike || isErrorMovieCredits) {
    return <div>Error: {errorMovie?.message || errorMoreLike?.message}</div>;
  }

  const percentage = (movieData.vote_average * 10).toFixed(2);
  const percentage_text = movieData.vote_average.toFixed(2);

  const TMDB_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const TMDB_BASE_BACK_URL = "https://image.tmdb.org/t/p/original";

  // Define the function to add item to watchlist
  const addToWatchlist = async () => {

    
    try {
      const { data, error } = await addItem({
        name: movieData.title,
        image: `${TMDB_BASE_IMAGE_URL}${movieData.poster_path}`,
        dateAdded: new Date(),
        TMDB_ID: movieData.id,
        Type: "Movie",
      });
      // Handle the response as needed
      if (data) {
        if (data.exists) {
          setIsInWatchlist(true);
        }
        // Set the state to indicate that the item is in the watchlist
        toast.success("Item has been added"); // Notify the user
      } else if (error) {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const removeFromWatchlist = async () => {
    try {
      const { data, error } = await removeFromWatchlist({
        TMDB_ID: movieData.id,
      });

      if (data) {
        if (!data.exists) {
          setIsInWatchlist(false);
        } // Set the state to indicate that the item is not in the watchlist
        toast.success("Item has been removed from watchlist"); // Notify the user
      } else if (error) {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <div className="relative h-screen w-screen font-blinker overflow-x-hidden overflow-y-scroll  custom-scroll-bar bg-curious-blue-950">
        {/* Movie Background Image */}
        <ToastContainer />

        <div className="relative flex justify-center items-center ">
          {movieData.backdrop_path ? (
            <img
              src={`${TMDB_BASE_BACK_URL}${movieData.backdrop_path}`}
              alt="Movie Background"
              className="relative w-3/4 h-[33rem] mt-14 rounded-b-3xl"
            />
          ) : (
            <div
              alt="Movie Background"
              className="relative flex justify-center items-center text-center bg-ebony-clay-800 w-3/4 h-[31rem] mt-14 rounded-b-3xl"
            >
              {" "}
              <span className=" font-blinker text-white-50 text-3xl flex justify-center items-center text-center">
                <TbMovieOff className="text-3xl text-curious-blue-600 mr-5" />{" "}
                Background not available
              </span>
            </div>
          )}
          {/* Absolute Items */}
          <div
            className="absolute 
           bottom-0 flex justify-between items-center 
          w-3/4 text-white-50 transform -translate-x-1/2 -translate-y-1/2 
          left-1/2 "
          >
            <div
              className="text-ebony-clay-950  text-lg bg-buttercup-500 
              w-fit
               h-9 p-2 flex justify-center 
              items-center border rounded-lg
              ml-10 border-none
              "
            >
              {percentage_text}{" "}
              <span className="pl-1">
                <AiFillStar />
              </span>{" "}
            </div>

            <div className="text-white text-base bg-ebony-clay-800 bg-opacity-90  w-24 h-9 flex justify-center items-center border-none rounded-xl">
              <BsFillPlayFill className="text-curious-blue-400 mr-3 text-xl" />{" "}
              Trailer
            </div>

            <div className="text-white text-base bg-ebony-clay-800 bg-opacity-90  w-10 h-9 flex justify-center items-center border-none rounded-xl mr-10">
              <button
                className=" item-menu relative text-ebony-clay-950  flex items-center justify-center w-10 h-9  duration-500 rounded-xl 
                  "
                onMouseEnter={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}
              >
                {/* <div className="w-fit inline-flex text-lg rounded-xl"></div> */}
                <BsThreeDots className="text-curious-blue-400 text-lg " />
                {isMenuHovered && (
                  <div className="absolute cursor-pointer bottom-9 right-0  bg-ebony-clay-800 bg-opacity-90 text-curious-blue-100 rounded-lg w-48 ">
                    <ul className="py-2 text-base">
                      <li className="hover:bg-ebony-clay-600">
                        <button className="flex items-center p-2">
                          {" "}
                          <PiListPlusFill className="mr-3 text-xl text-curious-blue-400" />{" "}
                          <span className="text-white text-base">
                            Add to list
                          </span>
                        </button>
                      </li>

                      <li className="hover:bg-ebony-clay-600 ">
                        <button
                          className="flex cursor-pointer items-center p-2"
                          onClick={
                            isInWatchlist ? removeFromWatchlist : addToWatchlist
                          }
                          // Disable the button when the mutation is in progress
                        >
                          {isLoadingadd && (
                            <div className="absolute inset-0 flex items-center justify-center bg-ebony-clay-600 bg-opacity-40">
                              <ImSpinner4 className="animate-spin text-4xl text-curious-blue-600" />
                            </div>
                          )}
                          <span className="text-white text-base">
                            {isInWatchlist ? (
                              <span>
                                <GoBookmarkSlash className="mr-3 text-lg text-curious-blue-400 " />{" "}
                                Remove Watchlist
                              </span> 
                            ) : (
                              <span>
                                <GoBookmark className="mr-3 text-lg text-curious-blue-400 " />{" "}
                                Add to Watchlist
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        <table className="w-full mt-10">
          <tr>
            {/* Left Content */}
            <td className="w-fit px-10">
              <div className="poster-section relative  ml-auto h-fit">
                <div className="section-1 flex justify-between">
                  <img
                    src={`${TMDB_BASE_IMAGE_URL}${movieData.poster_path}`}
                    className="w-30 h-56 rounded-lg rounded-r-none"
                  />
                  <div className="poster-title-wrapper flex flex-col justify-start rounded-lg rounded-l-none text-white-50 bg-ebony-clay-400 bg-opacity-20 backdrop-blur-lg w-full h-56 p-6">
                    <h1 className="poster-title font-blinker text-2xl text-white-50">
                      <span className="text-white-200 ">Title : {"  "}</span>
                      {movieData.title}
                    </h1>
                    <div className="flex space-x-2 pt-4">
                      <span className="text-white-200 text-2xl">
                        Genres : {"  "}
                      </span>
                      {movieData.genres.map((genre, g_index) => (
                        <button
                          key={g_index}
                          className="text-white-50 bg-ebony-clay-400 bg-opacity-30  uppercase text-sm w-fit h-8 flex p-3 justify-center items-center border-none rounded-xl hover:bg-curious-blue-600 hover:text-curious-blue-100"
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                    <div className="flex pt-3">
                      <div className="text-2xl font-blinker text-white-50">
                        <h1>
                          {" "}
                          <span className="text-white-200 ">
                            Year : {"  "}
                          </span>{" "}
                          {movieData.release_date.substring(0, 4)}
                        </h1>

                        <h1 className=" pt-3 ">
                          <span className="text-white-200  ">
                            Duration : {"  "}
                          </span>
                          {movieData.runtime} MIN
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <table className="w-fit  mt-5 ml-auto">
                <tr>
                  <td className="w-1/2 pr-10">
                    <div className="description-wrapper relative  font-Alber_Sans rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg h-64  p-5">
                      <h1 className="font-bold text-xl text-curious-blue-400 pb-3">
                        Description
                      </h1>
                      <div className="overflow-y-scroll pr-2 custom-scroll-bar h-44 min-h[11rem] max-h-[11rem]">
                        <p className="text-medium-purple-100 w-fit text-left  font-thin ">
                          {movieData.overview}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="w-1/2 ">
                    <div className="actors-wrapper relative  rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg p-5 ">
                      <h1 className="text-curious-blue-400 text-xl font-bold pb-3">
                        Actors
                      </h1>
                      <div className="overflow-y-scroll pr-2 custom-scroll-bar h-44 min-h[11rem] max-h-[11rem]">
                        {" "}
                        {/* Add max-h-[64px] here */}
                        <div className="flex flex-col space-y-2 items-center justify-items-center h-auto">
                          {movieCreditsData.map((actor, index) => (
                            <Link
                              key={index}
                              to={`/c/actor/${actor.id}`}
                              className="w-full"
                            >
                              <div
                                key={actor.id}
                                className="flex items-center font-Alber_Sans w-full h-12 rounded-xl text-base text-white-100 bg-ebony-clay-500 bg-opacity-30 backdrop-blur-lg shadow-2xl shadow-ebony-clay-950 hover:bg-ebony-clay-400"
                              >
                                {actor.profilePath ? (
                                  <img
                                    src={`https://image.tmdb.org/t/p/w200${actor.profilePath}`}
                                    alt={actor.name}
                                    className="w-12 h-12 rounded-xl rounded-r-none mr-2"
                                  />
                                ) : (
                                  <BsFillPersonFill className="w-12 h-12 rounded-xl rounded-r-none mr-2" />
                                )}
                                <h3>{actor.name}</h3>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>

            {/* Right Sidebar */}
            <td className="w-1/3 ">
              <div className="morelike-wrapper relative text-white-50 bg-ebony-clay-400 w-fit rounded-lg p-7  bg-opacity-10">
                <h1 className=" text-curious-blue-400 text-xl font-bold pb-3">
                  More Like This
                </h1>
                <div className="overflow-y-scroll  custom-scroll-bar h-fit max-h-[26rem] ">
                  <div className="grid grid-cols-1 gap-4 pr-3">
                    {moreLikeMovies.results.map((movie, m_index) => (
                      <Link
                        key={m_index} // Unique key for the Link component
                        to={`/movie/${movie.id}`}
                      >
                        <MoreLikeItems
                          key={m_index} // Unique key for the MoreLikeItems component
                          MoreLikeItemData={movie}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <ToastContainer />
      </div>
    </>
  );
};

export default Movie;
