import React, { useState, useEffect } from "react";

import Slider from "../Slider/Slider"; // Replace with the correct path
import SearchBar from "./SearchBar";
import { fetchMovies, fetchSeries, fetchPerson } from "../../Apis/TmdbApi";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    const fetchTrendMovies = async () => {
      try {
        const trendMovies = await fetchMovies();
        setMovies(trendMovies);
      } catch (error) {
        console.error("Failed to fetch trend movies:", error);
      }
    };
    fetchTrendMovies();
  }, []);

  useEffect(() => {
    const fetchTrendSeries = async () => {
      try {
        const trendSeries = await fetchSeries();
        setSeries(trendSeries);
      } catch (error) {
        console.error("Failed to fetch trend movies:", error);
      }
    };
    fetchTrendSeries();
  }, []);

  useEffect(() => {
    const fetchTrendPerson = async () => {
      try {
        const trendPerson = await fetchPerson();
        setPerson(trendPerson);
      } catch (error) {
        console.error("Failed to fetch trend movies:", error);
      }
    };
    fetchTrendPerson();
  }, []);

  return (
    <div class="relative  w-full   bg-slate-950 overflow-x-hidden">
      <div class="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div class="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="relative font-blinker h-96">
        <div className="relative h-full flex flex-col items-center justify-center mt-24 ">
          <div className="w-[26rem] my-10 items-center justify-items-center">
            <h1 className="text-6xl font-medium text-white-50 text-center">
              Movies & Series, <span className=""> Unlimited way.</span>
            </h1>
          </div>
          <SearchBar />

          <p className="mt-6 mb-14 text-center text-xl leading-6 text-neutral-200">
            easy-to-use, and powerful application for watching movies and TV
            shows.
          </p>
        </div>
      </div>

      <div className=" flex flex-col ">
        {/* Movies Part */}

        <div className=" relative font-blinker overflow-x-hidden ">
          <Slider
            items={movies}
            titre="Trend movies"
            moreLink="/c/movies"
            itemType="movie"
          />
        </div>

        {/* Series Part */}

        <div className=" relative font-blinker overflow-x-hidden">
          <Slider
            items={series}
            titre="Trend Series"
            moreLink="/c/series"
            itemType="serie"
          />
        </div>

        {/* Actorsa Part */}

        <div className=" relative font-blinker overflow-x-hidden">
          <Slider
            items={person}
            titre="Popular Actors"
            moreLink="/celebrities"
            itemType="actor"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
