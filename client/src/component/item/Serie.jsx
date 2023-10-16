import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillPlayFill, BsThreeDots, BsFillPersonFill } from "react-icons/bs";
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

  const {UserId} = useParams();
  return (
    <>
      <div className="relative h-full font-blinker  m-auto bg-curious-blue-950">
        {/* Blue Background */}

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
              <div
                className="item-menu relative text-ebony-clay-950  flex items-center justify-center w-10 h-9  duration-500 rounded-xl 
                  "
                onMouseEnter={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}
              >
                {/* <div className="w-fit inline-flex text-lg rounded-xl"></div> */}
                <BsThreeDots className="text-curious-blue-400 text-lg " />
                {isMenuHovered && 
                (
                  <div className="absolute bottom-9 right-0  bg-ebony-clay-800 bg-opacity-90 text-curious-blue-100 rounded-lg w-32 ">
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
                        <button className="flex items-center p-2">
                          {" "}
                          <PiBookmarkSimpleFill className="mr-3 text-lg text-curious-blue-400 " />{" "}
                          <span className="text-white text-base">
                            {" "}
                            Watchlist
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
                              <Link
                                key={season}
                                to={`/user/${UserId}/season/${season.season_number}`}
                                className="w-full"
                              >
                                <button
                                  key={season.id}
                                  className="w-fit flex justify-center items-center p-3 h-fit rounded-lg text-white-50 bg-ebony-clay-500 bg-opacity-30 shadow-2xl shadow-ebony-clay-950"
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
                      <div className="overflow-y-scroll pr-2 custom-scroll-bar h-44 min-h[11rem] max-h-[11rem]">
                        {" "}
                        {/* Add max-h-[64px] here */}
                        <div className="flex flex-col space-y-2 items-center justify-items-center h-auto">
                          {serieCreditsData.map((actor) => (
                            <Link
                              key={actor}
                              to={`/user/${UserId}/actor/${actor.id}`}
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
              <td className="w-[28rem] pl-20  h-fit">
                <div className="morelike-wrapper relative text-white-50 bg-ebony-clay-400  rounded-lg p-4   bg-opacity-10">
                  <h1 className=" text-curious-blue-400 text-xl font-bold pb-3">
                    More Like This
                  </h1>
                  <div className="overflow-y-scroll overflow-x-hidden custom-scroll-bar h-[38rem] ">
                    <div className="grid grid-cols-1 gap-4">
                      {/* Replace the sample data with the actual moreLikeseries data */}
                      {moreLikeseries.results.map((serie) => (
                        <Link
                          key={serie.id}
                          to={`/user/${UserId}/serie/${serie.id}`}
                        >
                          <MoreLikeItems
                            key={serie.id}
                            MoreLikeItemData={serie}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Serie;
