import React, { useState } from "react";
import alpacino from "../../assets/alpacino.jpg";
import { BsInstagram, BsTwitter , BsFillPersonFill } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";
import MoreLikeItems from "./MoreLikeItems";
import { useQuery } from "react-query";
import {
  fetchPersonDetails,
  fetchPersonCombinedCredits,
} from "../../Apis/TmdbApi";
import { Link, useParams } from "react-router-dom";

const Actor = () => {
  const { personId } = useParams();
  let stgGender;

  const {
    data: personData,
    isLoading: isLoadingPerson,
    isError: isErrorPerson,
    error: errorPerson,
  } = useQuery(["personDetails", personId], () => fetchPersonDetails(personId));

  const {
    data: CombinedCreditsData,
    isLoading: isLoadingCombinedCredits,
    isError: isErrorCombinedCredits,
    error: errorCombinedCredits,
  } = useQuery(["CombinedCreditsDetails", personId], () =>
    fetchPersonCombinedCredits(personId)
  );

  const TMDB_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  if (!personData) {
    return <div>Loading...</div>; // You can display a loading indicator here
  }

  const movies = Array.isArray(CombinedCreditsData?.cast)
    ? CombinedCreditsData.cast
    : [];

  if (personData.gender === 1) {
    stgGender = "Female";
  } else if (personData.gender === 2) {
    stgGender = "Male";
  } else {
    stgGender = "Unknown"; // Handle unexpected gender values
  }

  const biographyText = personData.biography;
  const paragraphs = biographyText.split("\n\n");
  return (
    <>
      {/* Blue Background */}
      <div className="relative h-screen w-screen font-blinker overflow-x-hidden overflow-y-scroll  custom-scroll-bar bg-curious-blue-950">
        {/* Movie Background Image */}
        <div className="relative mt-20 ">
          <table className="relative">
            <tr>
              <td className="relative image-section w-1/4 align-top">
                {personData.profile_path ? (
                  <img
                    src={`${TMDB_BASE_IMAGE_URL}${personData.profile_path}`}
                    className="p-2 w-fit  h-[28.15rem] m-auto rounded-xl"
                    alt="person photo"
                  />
                ) : (
                <BsFillPersonFill className="p-2 w-fit  max-w-[18.1rem] h-[28.15rem]  m-auto rounded-xl text-white-100 bg-ebony-clay-500 bg-opacity-30" />
                )}

                <div className="mx-7 mb-7 mt-1 inline-flex max-w-[18.1rem] space-x-5 text-ebony-clay-200 text-2xl">
                  <Link>
                    <BsInstagram />
                  </Link>
                  <Link>
                    <BsTwitter />
                  </Link>
                  <Link>
                    <SiFacebook />
                  </Link>
                </div>
                <div className="mx-7 max-w-[18.1rem] rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 p-3">
                  <h1 className="font-bold text-xl text-curious-blue-400 pb-3">
                    Personal info
                  </h1>{" "}
                  <div className="flex flex-col space-x-5 text-ebony-clay-200 text-2xl">
                    <ul className=" item">
                      <li className="mb-2">
                        <h2 className="title-item text-lg text-ebony-clay-50">
                          Know For
                        </h2>
                        <h3 className="title-item text-base text-ebony-clay-200 font-Alber_Sans">
                          {personData.known_for_department}
                        </h3>
                      </li>
                      <li className="mb-2">
                        <h2 className="title-item text-lg text-ebony-clay-50 ">
                          BirthDay
                        </h2>
                        <h3 className="title-item text-base text-ebony-clay-200 font-Alber_Sans">
                          {personData.birthday}
                        </h3>
                      </li>

                      <li className="mb-2">
                        <h2 className="title-item text-lg text-ebony-clay-50 ">
                          Gender
                        </h2>
                        <h3 className="title-item text-base text-ebony-clay-200 font-Alber_Sans">
                          {stgGender}
                        </h3>
                      </li>

                      <li className="mb-2">
                        <h2 className="title-item text-lg text-ebony-clay-50">
                          Place of Birth
                        </h2>
                        <h3 className="title-item text-base text-ebony-clay-200 font-Alber_Sans">
                          {personData.place_of_birth}
                        </h3>
                      </li>

                      <li className="mb-2">
                        <h2 className="title-item text-lg text-ebony-clay-50">
                          Also known for
                        </h2>
                        <h3 className="title-item text-base text-ebony-clay-200 font-Alber_Sans">
                          {personData.also_known_as}
                        </h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>

              <td className="relative stuff-section h-fit align-top">
                <h1 className="text-4xl text-white-200 pb-3">
                  {personData.name}
                </h1>
                <div className="description-wrapper rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg h-fit w-fit min-w-[54rem] mr-10 mb-6 p-3">
                  <h1 className="font-bold text-xl text-curious-blue-400 pb-3">
                    Biography
                  </h1>
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-ebony-clay-100 w-fit text-left font-Alber_Sans   pb-3"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="Movies-wrapper rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg  mr-10 p-3 mb-6">
                  <h1 className="font-bold text-xl text-curious-blue-400 pb-3">
                    Known For
                  </h1>
                  <div className="overflow-x-scroll  custom-scroll-bar h-fit max-h-[26rem] ">
                    <div className="inline-flex space-x-20">
                      {/* Replace the sample data with the actual moreLikeMovies data */}
                      {movies.slice(0, 5).map((movie) => (
                        <Link key={movie.id} to={`/movie/${movie.id}`}>
                          <MoreLikeItems
                            key={movie.id}
                            MoreLikeItemData={movie}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="Acting-wrapper rounded-lg text-white-50 bg-ebony-clay-400 bg-opacity-10 backdrop-blur-lg  mr-10 p-3 mb-3">
                  <h1 className="font-bold text-xl text-curious-blue-400 pb-3">
                    Acting
                  </h1>
                  <div className="overflow-y-scroll  custom-scroll-bar h-fit max-h-[26rem] ">
                    <div className="grid grid-cols-1 space-y-3">
                      <ul>
                        <li className="mb-3">
                          <div className="inline-flex space-x-52">
                            <span className="year text-lg">2023</span>
                            <div className="movie-details relative flex flex-col">
                              <span className="text-lg">GodFather II</span>
                              <span className="personage-name text-base ml-5 text-ebony-clay-400">
                                as Tony Ja
                              </span>
                            </div>
                          </div>
                        </li>
                        <li className="mb-3">
                          <div className="inline-flex space-x-52">
                            <span className="year text-lg">2023</span>
                            <div className="movie-details relative flex flex-col">
                              <span className="text-lg">GodFather II</span>
                              <span className="personage-name text-base ml-5 text-ebony-clay-400">
                                as Tony Ja
                              </span>
                            </div>
                          </div>
                        </li>
                        <li className="mb-3">
                          <div className="inline-flex space-x-52">
                            <span className="year text-lg">2023</span>
                            <div className="movie-details relative flex flex-col">
                              <span className="text-lg">GodFather II</span>
                              <span className="personage-name text-base ml-5 text-ebony-clay-400">
                                as Tony Ja
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Actor;
