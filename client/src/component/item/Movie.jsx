import React, { useState } from "react";
import { BsFillPersonFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useQuery } from "react-query";
import {
  fetchMovieDetails,
  fetchMoreLikeMovies,
  fetchMovieCredits,
} from "../../Apis/TmdbApi";
import { Link, useParams } from "react-router-dom";
import "../../Styles/CostumScrollBar.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwiperA from "../Slider/SwiperA";
import Comment from "./Comment";
import { BiSolidVideos } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteList,
  removeFavoriteList,
} from "../../slices/favoriteListSlice";
import { addingComment } from "../../slices/commentSlice";
import {
  useAddToFavoriteListMutation,
  useRemoveFavoriteListMutation,
} from "../../slices/favoriteListApiSlice";

import { useAddCommentMutation } from "../../slices/commentApiSlice";
import Popup from "./Popup";


const Movie = () => {
  const { favoritelistItems } = useSelector((state) => state.favoriteList);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [comment, setComment] = useState("");

  const { movieId } = useParams();

  const dispatch = useDispatch();

  const [addItemToFavoriteList, { isAddLoading }] =
    useAddToFavoriteListMutation();

  const [removeItemFromFavoriteList, { isRemoveLoading }] =
    useRemoveFavoriteListMutation();

  const [addComment, { data: newComment, isLoading }] = useAddCommentMutation();

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

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

  const percentage_text = movieData.vote_average.toFixed(2);

  const TMDB_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  const handleAddToFavorites = async () => {
    try {
      const movie = await addItemToFavoriteList({
        name: movieData.title,
        tmdb_id: movieData.id,
        image: movieData.poster_path,
        type: "movie",
      }).unwrap();
      dispatch(addFavoriteList(movie));
      toast.success("Movie added to favorites");
    } catch (err) {
      toast.error(err?.data.message || err.error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      const deletedFavorite = await removeItemFromFavoriteList({
        name: movieData.title,
        tmdb_id: movieData.id,
        image: movieData.poster_path,
        type: "movie",
      }).unwrap();
      dispatch(removeFavoriteList(deletedFavorite.tmdb_id));
      toast.success("Movie removed from favorites");
    } catch (err) {
      toast.error(err?.data.message || err.error);
    }
  };

  const isInFavorites = favoritelistItems.some(
    (item) => String(item.tmdb_id) === String(movieData.id)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await addComment({
        content: comment,
        tmdb_id: movieData.id,
        type: "movie",
      }).unwrap();
      setComment("");
      dispatch(addingComment(newComment));
      toast.success("Comment added");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <div className="relative  w-full  font-Alber_Sans bg-slate-950 overflow-x-hidden">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <table className="w-full mt-20 ">
          <tbody>
            <tr className="w-full">
              {/* Left Content */}
              <td className=" px-10">
                <div className="poster-section relative h-fit">
                  <div className="section-1 flex flex-row space-x-5">
                    <img
                      src={`${TMDB_BASE_IMAGE_URL}${movieData.poster_path}`}
                      className="w-64 h-96 rounded-lg"
                    />
                    <div className="relative w-full">
                      <div className=" flex flex-col justify-start rounded-lg  font-Alber_Sans text-alabaster-50 bg-alabaster-50 bg-opacity-10 backdrop-blur-lg h-96 p-6">
                        <h1 className="poster-titletext-alabaster-50 font-Alber_Sans text-xl text-alabaster-50">
                          <span className="text-alabaster-50 font-Alber_Sans ">
                            Title : {"  "}
                          </span>
                          {movieData.title}
                        </h1>
                        <div className="flex space-x-2 pt-4">
                          <span className="text-alabaster-50 font-Alber_Sans text-xl">
                            Genres : {"  "}
                          </span>
                          {movieData.genres.map((genre, g_index) => (
                            <button
                              key={g_index}
                              className="text-alabaster-50 bg-slate-900 bg-opacity-40  uppercase text-sm w-fit h-8 flex p-3 justify-center items-center border-none rounded-lg hover:bg-slate-950 "
                            >
                              {genre.name}
                            </button>
                          ))}
                        </div>
                        <div className="flex pt-3">
                          <div className="text-xl font-Alber_Sans text-alabaster-50">
                            <h1>
                              {" "}
                              <span className="text-alabaster-50 font-Alber_Sans ">
                                Year : {"  "}
                              </span>{" "}
                              {movieData.release_date.substring(0, 4)}
                            </h1>

                            <h1 className="text-xl pt-3 ">
                              <span className="text-alabaster-50 font-Alber_Sans  ">
                                Duration : {"  "}
                              </span>
                              {movieData.runtime} MIN
                            </h1>

                            <h1 className="text-xl pt-3 text-alabaster-50 font-Alber_Sans">
                              Language : {"  "}
                              {movieData.spoken_languages.map(
                                (spoken_language, spoken_languages_index) => (
                                  <span
                                    className="text-alabaster-50 text-xl  "
                                    key={spoken_languages_index}
                                  >
                                    {spoken_language.name}{" "}
                                    <span className="text-medium-purple-700">
                                      {"  "}|{"  "}
                                    </span>
                                  </span>
                                )
                              )}
                            </h1>

                            <div className="text-xl pt-3 flex flex-row text-alabaster-200">
                              Rating : {"  "}
                              <div className="mx-3 text-ebony-clay-950  text-xl bg-buttercup-500 w-fit h-fit p-1 flex justify-center  items-center border rounded-lg border-none">
                                {percentage_text}
                                <span className="pl-1">
                                  <AiFillStar />
                                </span>{" "}
                              </div>
                            </div>

                            <div className="text-xl pt-3   flex flex-row space-x-5">
                              {movieData.production_companies.map(
                                (
                                  production_companie,
                                  production_companies_index
                                ) => (
                                  <img
                                    className="text-alabaster-50 bg-slate-900 bg-opacity-30  uppercase text-sm w-14 h-12 flex p-1 justify-center items-center border-none rounded-lg"
                                    key={production_companies_index}
                                    src={`https://image.tmdb.org/t/p/w92${production_companie.logo_path}`}
                                    alt={production_companie.name}
                                  />
                                )
                              )}
                            </div>

                            <div className="absolute right-5 top-5 flex flex-col space-y-2">
                              {isInFavorites ? (
                                <button
                                  className="bg-alabaster-100 text-red-700 p-2 rounded-lg"
                                  onClick={handleRemoveFromFavorites}
                                >
                                  <BsHeartFill />
                                </button>
                              ) : (
                                <button
                                  className="bg-alabaster-100 text-red-700 p-2 rounded-lg"
                                  onClick={handleAddToFavorites}
                                >
                                  <BsHeart />
                                </button>
                              )}

                              <button
                                className="bg-ebony-clay-950 text-alabaster-50 p-2 rounded-lg"
                                onClick={handleButtonClick}
                              >
                                <BiSolidVideos />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="w-full  mt-5 ">
                  <tbody>
                    <tr>
                      <td className="w-1/2 pr-10">
                        <div className="description-wrapper relative  font-Alber_Sans rounded-lg text-alabaster-50 bg-alabaster-50 bg-opacity-10 backdrop-blur-lg h-64  p-5">
                          <h1 className="font-Alber_Sans font-bold text-xl text-alabaster-50 pb-3">
                            Description
                          </h1>
                          <div className="overflow-y-scroll pr-2 custom-scroll-bar h-44 ">
                            <p className="font-Alber_Sans text-alabaster-200 w-fit text-left text-lg font-thin ">
                              {movieData.overview}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="w-1/2 ">
                        <div className="actors-wrapper relative  rounded-lg text-alabaster-50 bg-alabaster-50 bg-opacity-10 backdrop-blur-lg p-5 ">
                          <h1 className="font-Alber_Sans font-bold text-xl text-alabaster-50 pb-3">
                            Actors
                          </h1>
                          <div className="overflow-y-scroll pr-2 custom-scroll-bar h-44 ">
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
                                    className="flex items-center font-Alber_Sans w-full h-12 rounded-lg text-base text-alabaster-50 bg-alabaster-50 bg-opacity-10 backdrop-blur-lg shadow-sm  hover:bg-slate-950"
                                  >
                                    {actor.profilePath ? (
                                      <img
                                        src={`https://image.tmdb.org/t/p/w200${actor.profilePath}`}
                                        alt={actor.name}
                                        className="w-12 h-12 rounded-lg rounded-r-none mr-2"
                                      />
                                    ) : (
                                      <BsFillPersonFill className="w-12 h-12 rounded-lg rounded-r-none mr-2" />
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
                  </tbody>
                </table>
              </td>

              {/* Right Sidebar */}
            </tr>
          </tbody>
        </table>
        {/* <ToastContainer /> */}
        <table className="w-full mt-5 mb-60">
          <tbody>
            <tr>
              <td className="w-fit px-10">
                <div className="morelike-wrapper relative w-[80rem]  rounded-lg text-alabaster-50  bg-opacity-10 backdrop-blur-lg p-5 ">
                  <h1 className="text-alabaster-50 font-Alber_Sans text-xl font-bold pb-3">
                    Similiar movies
                  </h1>
                  <SwiperA itemType={`Movie`} items={moreLikeMovies.results} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="w-fit px-10 pt-5">
                <div className="actors-wrapper relative  rounded-lg text-alabaster-50 bg-alabaster-50 bg-opacity-10 backdrop-blur-lg p-5 min-h-[50vh] h-fit">
                  <h1 className="text-alabaster-50  text-xl font-bold pb-3">
                    Comments
                  </h1>

                  <div className="relative w-full min-h-44 flex flex-col text-base text-alabaster-50  bg-opacity-30 p-2 rounded-lg mt-7 mb-3 ">
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full bg-transparent rounded-lg pb-3">
                        <textarea
                          className="w-full h-24 min-h-20 p-3 rounded-lg text-ebony-clay-950 overflow-y-auto custom-scroll-bar text-lg"
                          placeholder="Add a comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>

                      <div className="relative flex flex-row items-end w-fit mb-2">
                        <button
                          type="submit"
                          className="text-alabaster-50 bg-slate-950 bg-opacity-80 duration-300 text-base w-fit h-fit mr-2 p-2 justify-center items-center border-none rounded-lg "
                        >
                          Comment
                        </button>
                        <button
                          type="button"
                          // onClick={handleCancel}
                          className="text-alabaster-950 bg-alabaster-50 text-base w-fit h-fit p-2 justify-center items-center text-center border-none rounded-lg hover:bg-alabaster-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="overflow-y-scroll pr-2 custom-scroll-bar h-fit">
                    {newComment && (
                      <Comment
                        commentaire={newComment.content}
                        Username={newComment.name}
                        DateAdded={newComment.createdAt}
                      />
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ToastContainer />
      </div>

      <Popup
        isOpen={isPopupOpen}
        handleClose={handlePopupClose}
        videoKey={movieData?.videos?.results?.[0]?.key}
        site={movieData?.videos?.results?.[0]?.site?.toLowerCase()}
      />
    </>
  );
};

export default Movie;
