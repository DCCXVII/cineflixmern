import React, { useState , useEffect} from "react";
import backgroundImg from "../../assets/BACKGROUND.jpg";

import Slider from "../Slider/Slider"; // Replace with the correct path
import SearchBar from "./SearchBar";
import { fetchMovies , fetchSeries , fetchPerson } from "../../Apis/TmdbApi";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [series,setSeries] = useState([]);
  const [person, setPerson ] = useState([])

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

  useEffect(()=>{
    const fetchTrendSeries = async () =>{
      try{
        const trendSeries = await fetchSeries();
        setSeries(trendSeries);

      }catch(error){
        console.error("Failed to fetch trend movies:", error);
      }
    };
    fetchTrendSeries();
  },[]);

  useEffect(()=>{
    const fetchTrendPerson = async () =>{
      try{
        const trendPerson = await fetchPerson();
        setPerson(trendPerson);

      }catch(error){
        console.error("Failed to fetch trend movies:", error);
      }
    };
    fetchTrendPerson();
  },[]);


  

  return (
    <>
      <div
        className="relative font-blinker h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ebony-clay-950 to-curious-blue-600 opacity-70"></div>
        <div className="relative h-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-white-50">
            Your Gateway to Unlimited Movies and Series
          </h1>
          <div className="my-10">
            <p className="text-3xl font-thin text-white-50">
              Find what you're looking for
            </p>
          </div>
          <SearchBar />
        </div>
      </div>

      <div className=" relative font-blinker bg-curious-blue-900">
        {/* Movies Part */}

        <div className="overflow-x-hidden">
          <Slider items={movies} titre="Trend movies" moreLink="/c/movies" itemType="movie"/>
        </div>
      </div>

      <div className=" relative font-blinker bg-curious-blue-900">
        {/* Series Part */}

        <div className="overflow-x-hidden">
          <Slider items={series} titre="Trend Series" moreLink="/c/series" itemType="serie"/>
        </div>
      </div>

      <div className=" relative font-blinker bg-curious-blue-900">
        {/* Actorsa Part */}

        <div className="overflow-x-hidden">
          <Slider items={person} titre="Popular Actors" moreLink="/celebrities" itemType="actor"/>
        </div>
      </div>
    </>
  );
};

export default Home;
