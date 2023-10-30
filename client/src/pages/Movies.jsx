import React, { useState, useEffect } from "react";
import Gallery from "../component/Gallery/Gallery";
import { useQuery } from "react-query";
import {
  fetchMovies,
  fetchTrendingMovies,
  fetchFilteredMovies,
} from "../Apis/TmdbApi";
import Filter from "../component/Filter/Filter";

const Movies = () => {
  const [filterParams, setFilterParams] = useState({
    genre: "",
    year: "",
    rating: "",
  });

  const [page, setPage] = useState(1);

  // Define a query key for fetching movies with filters
  const queryKey = ["filteredMovies", page, filterParams];

  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useQuery(queryKey, () => fetchFilteredMovies(page, filterParams), {
    keepPreviousData: true,
  });

  const {
    data: trendingMovies,
    isLoading: isLoadingTrendingMovies,
    isError: isErrorTrendingMovies,
    error: errorTrendingMovies,
  } = useQuery("trendingMovies", fetchTrendingMovies);

  const loadMore = async () => {
    const nextPage = page + 1;
    const { data: newMovies } = await fetchMovies(nextPage);
    setPage(nextPage);
    // Assuming you have a state variable called "setMovies" to update the movies data
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
  };

  // Update the filtered movies when filterParams change
  useEffect(() => {
    setPage(1); // Reset page when filters change to load from the first page
  }, [filterParams]);

  if (isLoading || isLoadingTrendingMovies) {
    return <div>Loading...</div>;
  }

  if (isError || isErrorTrendingMovies) {
    return (
      <div>
        Error: {error?.message}
        {errorTrendingMovies?.message}
      </div>
    );
  }

  return (
    <>
      
      <Gallery
        AutoSwiperTitle="Trending Movies"
        highlight="Movies"
        itemType="movie"
        items={movies?.results }
        trendingItems = {trendingMovies}
        handleLoadMore={loadMore}
      />
    </>
  );
};

export default Movies;
