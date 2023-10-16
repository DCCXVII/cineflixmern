import React from "react";
import { AiFillStar } from "react-icons/ai";
import "react-circular-progressbar/dist/styles.css";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { TbMovieOff } from "react-icons/tb";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import MoreLikeItems from "./MoreLikeItems";
import "../../Styles/CostumScrollBar.css";
import ItemCard from "./ItemCard";

const Season = () => {
  const { serieId } = useParams();
  const { seasonId } = useParams();

  // Fetch more like series using React Query
  const {
    data: EpisodesDetails,
    isLoading: isLoadingEpisodesDetails,
    isError: isErrorEpisodesDetails,
    error: errorEpisodesDetails,
  } = useQuery(["EpisodesDetails", {serieId, seasonId}], () => fetchMoreLikeSeries(serieId,seasonId));

  if (isLoadingEpisodesDetails) {
    return <div>Loading...</div>;
  }

  if (isErrorEpisodesDetails ) {
    return <div>Error: { errorEpisodesDetails?.message}</div>;
  }

  const percentage = (serieData.vote_average * 10).toFixed(2);
  const percentage_text = serieData.vote_average.toFixed(2);

  const TMDB_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const TMDB_BASE_BACK_URL = "https://image.tmdb.org/t/p/original";

  return (
    <>
      <div className="relative h-full font-blinker  m-auto">
        {/* Blue Background */}
        <div className="absolute inset-0 bg-curious-blue-950"></div>

        {/* serie Background Image */}
        <div className="relative flex justify-center items-center">
          {serieData.backdrop_path ? (
            <img
              src={`${TMDB_BASE_BACK_URL}${serieData.backdrop_path}`}
              alt="serie Background"
              className="relative w-3/4 h-[31rem] mt-14 rounded-b-3xl"
            />
          ) : (
            <div
              alt="serie Background"
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
              ml-10
              border-none
              "
            >
              {percentage_text}{" "}
              <span className="pl-1">
                <AiFillStar />
              </span>{" "}
            </div>

            <div className="text-white text-base bg-ebony-clay-800 bg-opacity-80  w-24 h-8 flex justify-center items-center border-none rounded-xl">
              <BsFillPlayFill className="text-curious-blue-400 mr-3 text-xl" />{" "}
              Trailer
            </div>

            <div className="text-white text-base bg-ebony-clay-800 bg-opacity-80 w-10 h-8 flex justify-center items-center border-none rounded-xl mr-10">
              <BsThreeDots className="text-curious-blue-400 text-base" />
            </div>
          </div>
        </div>

        <table className="justify-center items-center h-screen mx-auto mt-9">
          <tbody>
            <tr>
              {/* Left Content */}
              <td className="w-[54rem] h-screen ">
                <table className="w-[54rem]">
                  <tbody>
                    <tr>
                      <div className="poster-section relative w-[54rem]  h-fit">
                        <div className="section-1 flex justify-between">
                          {serieData.backdrop_path ? (
                            <img
                              src={`${TMDB_BASE_IMAGE_URL}${serieData.poster_path}`}
                              className="w-30 h-56 rounded-lg rounded-r-none"
                            />
                          ) : (
                            <div
                              alt="serie Background"
                              className="relative flex flex-col items-center justify-center text-center bg-ebony-clay-800 w-30 h-56 rounded-lg rounded-r-none"
                            >
                              <span className="font-blinker text-white-50 text-lg">
                                Background not available
                              </span>
                            </div>
                          )}
                          <div className="poster-title-wrapper flex flex-col justify-start rounded-lg rounded-l-none text-white-50 bg-ebony-clay-400 bg-opacity-30 w-full h-56 p-6">
                            <h1 className="poster-title font-blinker text-2xl text-white-50">
                              <span className="text-white-200 ">
                                Title : {"  "}
                              </span>{" "}
                              {serieData.name}
                            </h1>
                            <div className="flex space-x-2 pt-4">
                              <span className="text-white-200 text-2xl">
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
                            <div className="flex pt-5">
                              <div className="text-2xl font-blinker text-white-50">
                                <h1>
                                  <span className="text-white-200 text-2xl">
                                    First appear : {"  "}
                                  </span>
                                  {serieData.first_air_date.substring(0, 4)}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr>
                    <tr>
                      <div className="seasons-section relative flex flex-col justify-start mt-5  w-[54rem] h-22 min-h[22rem]   rounded-lg p-6 text-white-50 bg-ebony-clay-400 bg-opacity-30 overflow-x-auto">
                        {/* Add the code to display seasons here */}
                        <h1 className="font-bold text-xl text-curious-blue-400 mb-3">
                          Seasons
                        </h1>

                        <div className="overflow-x-scroll  custom-scroll-bar  h-fit">
                          <div className="text-white-50 flex space-x-2 pb-3">
                            {serieData.seasons.map((season) => (
                              <button
                                key={season.id}
                                className="w-fit flex justify-center items-center p-3 h-fit rounded-lg text-white-50 bg-ebony-clay-500 bg-opacity-30 shadow-2xl shadow-ebony-clay-950"
                              >
                                Season
                                <span className="font-bold text-xl pl-2">
                                  {EpisodesDetails}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </tr>
                    <tr>
                    <div className="seasons-section relative flex flex-col justify-start mt-5  w-[54rem] h-22 min-h[22rem]   rounded-lg p-6 text-white-50 bg-ebony-clay-400 bg-opacity-30 overflow-x-auto">
                        {/* Add the code to display seasons here */}
                        <h1 className="font-bold text-xl text-curious-blue-400 mb-3">
                          Episodes
                        </h1>

                        <div className="overflow-x-scroll  custom-scroll-bar  h-fit">
                          <div className="text-white-50 flex space-x-2 pb-3">
                            {EpisodesDetails.map((Episode) => (
                              <button
                                key={Episode.id}
                                className="w-fit flex justify-center items-center p-3 h-fit rounded-lg text-white-50 bg-ebony-clay-500 bg-opacity-30 shadow-2xl shadow-ebony-clay-950"
                              >
                                <ItemCard item={Episode}/>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>

                <table className="w-[54rem] mt-5 ">
                  <tr>
                    <td className="w-1/2 pr-10">
                      <div className="description-wrapper relative   rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg h-64  p-5">
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
                        <div className="overflow-y-scroll pr-2 custom-scroll-bar h-44  ">
                          {" "}
                          <div className="flex flex-col space-y-2 items-center justify-items-center h-auto">
                            {serieCreditsData.map((actor) => (
                              <div
                                key={actor.id}
                                className="flex items-center w-full h-10 rounded-full text-white-50 bg-ebony-clay-500 bg-opacity-30 backdrop-blur-lg shadow-2xl shadow-ebony-clay-950"
                              >
                                {actor.profilePath && (
                                  <img
                                    src={`https://image.tmdb.org/t/p/w200${actor.profilePath}`}
                                    alt={actor.name}
                                    className="w-10 h-10 rounded-full mr-2"
                                  />
                                )}
                                <h3>{actor.name}</h3>
                              </div>
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Season;
