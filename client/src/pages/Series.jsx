import React from "react";
import Gallery from "../component/Gallery/Gallery";
import { useQuery } from "react-query";
import { useState } from "react";

import { fetchSeries, fetchTrendingSeries } from "../Apis/TmdbApi";
import Filter from "../component/Filter/Filter";

const Series = () => {
  const [filterParams, setFilterParams] = useState({
    genre: "",
    year: "",
    rating: "",
  });
  const [page, setPage] = useState(1);

  const {
    data: series,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery(["trendSeries", page], () => fetchSeries(page), {
    keepPreviousData: true, // To keep previous data while loading new data
  });

  const {
    data: trendingSeries,
    isLoading: isLoadingTrendingSeries,
    isError: isErrorTrendingSeries,
    error: errorTrendingSeries,
  } = useQuery("trendingSeries", fetchTrendingSeries);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading || isLoadingTrendingSeries) {
    return <div>Loading...</div>;
  }

  if (isError || isErrorTrendingSeries) {
    return (
      <div>
        Error: {error?.message}
        {errorTrendingSeries?.message}
      </div>
    );
  }

  return (
    <>
      <Gallery
        AutoSwiperTitle="Popular Series"
        highlight="Series"
        itemType="serie"
        items={series}
        trendingItems={trendingSeries}
        AutoSwiperItems={trendingSeries}
        handleLoadMore={loadMore}
        filterParams={filterParams}
      />
    </>
  );
};

export default Series;
