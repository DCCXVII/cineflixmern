import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import {
  BsFillPlayFill,
  BsThreeDots,
  BsFillPersonFill,
  BsHeartFill,
} from "react-icons/bs";
import { PiListPlusFill, PiBookmarkSimpleFill } from "react-icons/pi";
import { TbMovieOff } from "react-icons/tb";
import { useQuery } from "react-query";
import {
  fetchSerieDetails,
  fetchMoreLikeSeries,
  fetchSerieCredits,
} from "../../Apis/TmdbApi";
import { Link, useParams } from "react-router-dom";
import MoreLikeItems from "./MoreLikeItems";
import "../../Styles/CostumScrollBar.css";
import SwiperA from "../Slider/SwiperA";
import Comment from "./Comment";
import { BiSolidVideos } from "react-icons/bi";

const Serie = () => {
  const { serieId } = useParams();
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  // Fetch serie details using React Query
  const {
    data: serieData,
    isLoading: isLoadingserie,
    isError: isErrorserie,
    error: errorserie,
  } = useQuery(["serieDetails", serieId], () => fetchSerieDetails(serieId));

  // Fetch more like series using React Query
  const {
    data: moreLikeseries,
    isLoading: isLoadingMoreLike,
    isError: isErrorMoreLike,
    error: errorMoreLike,
  } = useQuery(["moreLikeseries", serieId], () => fetchMoreLikeSeries(serieId));

  // FETCH CREDITS  :

  const {
    data: serieCreditsData,
    isLoading: isLoadingserieCredits,
    isError: isErrorserieCredits,
    error: errorserieCredits,
  } = useQuery(["serieCredits", serieId], () => fetchSerieCredits(serieId));

  if (isLoadingserie || isLoadingMoreLike || isLoadingserieCredits) {
    return <div>Loading...</div>;
  }

  if (isErrorserie || isErrorMoreLike || isErrorserieCredits) {
    return <div>Error: {errorserie?.message || errorMoreLike?.message}</div>;
  }

  const percentage = (serieData.vote_average * 10).toFixed(2);
  const percentage_text = serieData.vote_average.toFixed(2);

  const TMDB_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const TMDB_BASE_BACK_URL = "https://image.tmdb.org/t/p/original";

  return (
    <>
      <div className="relative h-full font-Alber_Sans overflow-hidden  bg-curious-blue-900 ">
        <table className="w-full mt-20 ">
          <tr className="w-full">
            {/* Left Content */}
            <td className=" px-10">
              <div className="poster-section relative h-fit">
                <div className="section-1 flex flex-row space-x-5">
                  <img
                    src={`${TMDB_BASE_IMAGE_URL}${serieData.backdrop_path}`}
                    className="w-64 h-96 rounded-lg"
                  />
                  <div className="relative w-full">
                    <div className=" flex flex-col justify-start rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-20 backdrop-blur-lg   h-96  p-6">
                      <h1 className="poster-title font-Alber_Sans text-xl text-white-50">
                        <span className="text-white-200 ">Title : {"  "}</span>
                        {serieData.name}
                      </h1>
                      <div className="flex space-x-2 pt-4">
                        <span className="text-white-200 text-xl">
                          Genres : {"  "}
                        </span>
                        {serieData.genres.map((genre) => (
                          <button
                            key={genre.id}
                            className="text-white-50 bg-ebony-clay-400 bg-opacity-30 uppercase text-sm w-fit h-8 flex p-3 justify-center items-center border-none rounded-xl hover:bg-curious-blue-600 hover:text-curious-blue-100"
                          >
                            {genre.name}
                          </button>
                        ))}
                      </div>
                      <div className="flex pt-3">
                        <div className="text-xl font-Alber_Sans text-white-50">
                          <h1>
                            {" "}
                            <span className="text-white-200 ">
                              Year : {"  "}
                            </span>{" "}
                            {serieData.first_air_date.substring(0, 4)}
                          </h1>

                          <h1 className="text-xl pt-3 ">
                            <span className="text-white-200  ">
                              Season : {"  "}
                            </span>
                            {serieData.number_of_seasons}
                          </h1>

                          <h1 className="text-xl pt-3 text-white-200">
                            Language : {"  "}
                            {serieData.languages.map(
                              (spoken_language, spoken_languages_index) => (
                                <span
                                  className="text-white-50 text-xl  "
                                  key={spoken_languages_index}
                                >
                                  {spoken_language}{" "}
                                  <span className="text-medium-purple-700">
                                    {" "}
                                    -{" "}
                                  </span>
                                </span>
                              )
                            )}
                          </h1>

                          <div className="text-xl pt-3 flex flex-row text-white-200">
                            Rating : {"  "}
                            <div className="mx-3 text-ebony-clay-950  text-xl bg-buttercup-500 w-fit h-fit p-1 flex justify-center  items-center border rounded-lg border-none">
                              {percentage_text}{" "}
                              <span className="pl-1">
                                <AiFillStar />
                              </span>{" "}
                            </div>
                          </div>

                          <div className="text-xl pt-3   flex flex-row space-x-5">
                            {/* <h1 className="text-xl font-Alber_Sans text-white-200">
                              {" "}
                              Companies : {"  "}
                            </h1> */}

                            {serieData.production_companies.map(
                              (
                                production_companie,
                                production_companies_index
                              ) => (
                                <img
                                  className="text-white-50 bg-ebony-clay-400 bg-opacity-30  uppercase text-sm w-14 h-12 flex p-1 justify-center items-center border-none rounded-lg"
                                  key={production_companies_index}
                                  src={`https://image.tmdb.org/t/p/w92${production_companie.logo_path}`}
                                  alt={production_companie.name}
                                />
                              )
                            )}
                          </div>

                          <div className="absolute right-5 top-5 flex flex-col space-y-2">
                            <button className="bg-ebony-clay-600 text-red-700 p-2 rounded-xl">
                              <BsHeartFill />
                            </button>

                            <button className="bg-ebony-clay-600 text-curious-blue-300 p-2 rounded-xl">
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
                <tr>
                  <td className="w-1/2 pr-10">
                    <div className="description-wrapper relative  font-Alber_Sans rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg h-64  p-5">
                      <h1 className="font-bold text-xl text-curious-blue-400 pb-3">
                        Description
                      </h1>
                      <div className="overflow-y-scroll pr-2 custom-scroll-bar h-44 ">
                        <p className="text-medium-purple-100 w-fit text-left  font-thin ">
                          {serieData.overview}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="w-1/2 ">
                    <div className="actors-wrapper relative  rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg p-5 ">
                      <h1 className="text-curious-blue-400 text-xl font-bold pb-3">
                        Actors
                      </h1>
                      <div className="overflow-y-scroll pr-2 custom-scroll-bar h-44 ">
                        {" "}
                        {/* Add max-h-[64px] here */}
                        <div className="flex flex-col space-y-2 items-center justify-items-center h-auto">
                          {serieCreditsData.map((actor, index) => (
                            <Link
                              key={index}
                              to={`/c/actor/${actor.id}`}
                              className="w-full"
                            >
                              <div
                                key={actor.id}
                                className="flex items-center font-Alber_Sans w-full h-12 rounded-xl text-base text-white-50 bg-curious-blue-800 bg-opacity-30 backdrop-blur-lg shadow-sm  hover:bg-ebony-clay-400"
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
          </tr>

          <tr>
            <td className="px-10">
              <div className="seasons-section relative flex flex-col justify-start mt-5 w-[80rem] h-22 min-h[22rem]   rounded-lg p-6 text-white-50 bg-ebony-clay-400 bg-opacity-30 overflow-x-auto">
                {/* Add the code to display seasons here */}
                <h1 className="font-bold text-xl text-curious-blue-400 mb-3">
                  Seasons
                </h1>

                <div className="overflow-x-scroll  custom-scroll-bar  h-fit">
                  <div className="text-white-50 flex space-x-1 pb-3">
                    {serieData.seasons.map((season) => (
                      <Link
                        key={season}
                        to={`/c/season/${season.season_number}`}
                        className="w-full"
                      >
                        <button
                          key={season.id}
                          className="w-fit flex justify-center items-center p-3 h-fit rounded-xl text-base text-white-50 bg-curious-blue-800 bg-opacity-30 backdrop-blur-lg shadow-sm  hover:bg-ebony-clay-400 "
                        >
                          Season
                          <span className="font-bold text-xl pl-2">
                            {season.season_number}
                          </span>
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>

        <table className="w-full mt-5 mb-60">
          <tr>
            <td className="w-fit px-10">
              <div className="morelike-wrapper relative w-[80em]  rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg p-5 ">
                <h1 className="text-curious-blue-400 text-xl font-bold pb-3">
                  Similiar movies
                </h1>
                <SwiperA itemType={`Serie`} items={moreLikeseries.results} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="w-fit px-10 pt-5">
              <div className="comment-wrapper relative  rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg p-5 min-h-[50vh] h-fit">
                <h1 className="text-curious-blue-400 text-xl font-bold pb-3">
                  Comments
                </h1>
                <div className="overflow-y-scroll pr-2 custom-scroll-bar h-fit">
                  <Comment
                    commentaire={
                      "                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quia soluta reprehenderit commodi numquam nam quam incidunt nulla consequuntur voluptatem, quaerat unde dicta ipsa culpa, cupiditate asperiores inventore recusandae voluptas.                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit maxime vitae porro facere? Molestiae deleniti quas voluptas accusantium praesentium excepturi ab, assumenda, quod eligendi inventore repellendus placeat quasi qui at."
                    }
                    Username={`User num1`}
                    DateAdded={`2023 - 02 -23`}
                  />

                  <Comment
                    commentaire={
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit maxime vitae porro facere? Molestiae deleniti quas voluptas accusantium praesentium excepturi ab, assumenda, quod eligendi inventore repellendus placeat quasi qui at."
                    }
                    Username={`User num1`}
                    DateAdded={`2023 - 02 -23`}
                  />
                </div>

                <div className="relative w-full min-h-44 flex flex-col text-base text-white-50  bg-opacity-30 p-2 rounded-lg mt-7 mb-3  hover:backdrop-blur-lg hover:shadow-2xl">
                  <form>
                    <div className="relative w-full bg-transparent rounded-lg pb-3">
                      <textarea
                        className="w-full h-24 min-h-20 p-3 rounded-lg text-ebony-clay-950 overflow-y-auto custom-scroll-bar"
                        placeholder="Add a comment"
                        // value={comment}
                        // onChange={(e) => setComment(e.target.value)}
                      />
                    </div>

                    <div className="relative flex flex-row items-end w-fit mb-2">
                      <button
                        type="submit"
                        className="text-white-50 bg-curious-blue-600 uppercase text-sm w-fit h-fit mr-2 p-2 justify-center items-center border-none rounded-xl hover:bg-curious-blue-400 hover:text-curious-blue-100"
                      >
                        Add comment
                      </button>
                      <button
                        type="button"
                        // onClick={handleCancel}
                        className="text-white-50 bg-ebony-clay-400 bg-opacity-30 uppercase text-sm w-fit h-fit p-2 justify-center items-center text-center border-none rounded-xl hover:bg-curious-blue-600 hover:text-curious-blue-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Serie;
