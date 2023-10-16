import axios from "axios";
require('dotenv').config();

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const API_KEY = process.env.API_KEY;
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});
// ok
export const fetchMovies = async (page) => {
  try {
    const response = await tmdbApi.get("/movie/popular", {
      params: { page },
    });
    // Return an array of movie objects containing the 'id'
    return response.data.results.map((movie) => ({ ...movie, id: movie.id }));
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    throw error;
  }
};
// ok
export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
    throw error;
  }
};

// ok
export const fetchMoreLikeMovies = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/similar`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch similar movies:", error);
    throw error;
  }
};

// ok
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    throw error;
  }
};

// ok
export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/credits?language=en-US`);
    const creditsData = response.data;

    // Extract the id, name, and profile path of the actors
    const actors = creditsData.cast.map((actor) => ({
      id: actor.id,
      name: actor.name,
      profilePath: actor.profile_path,
    }));

    return actors;
  } catch (error) {
    console.error("Failed to fetch movie credits:", error);
    throw error;
  }
};

// ok
export const fetchFilteredMovies = async (filterParams) => {
  try {
    const response = await tmdbApi.get("/discover/movie", {
      params: {
        ...filterParams,
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
};

export const fetchSeries = async (page) => {
  try {
    const response = await tmdbApi.get("/tv/popular", {
      params: { page }, // Add the page parameter to the API request
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch popular series:", error);
    throw error;
  }
};

export const fetchTrendingSeries = async () => {
  try {
    const response = await tmdbApi.get("/trending/tv/week");
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
    throw error;
  }
};

export const fetchSerieDetails = async (serieId) => {
  try {
    const response = await tmdbApi.get(`/tv/${serieId}`, {
      
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch TV series details:", error);
    throw error;
  }
}

export const fetchMoreLikeSeries = async (serieId) => {
  try {
    const response = await tmdbApi.get(`/tv/${serieId}/similar`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch similar series:", error);
    throw error;
  }
};

export const fetchSerieCredits = async (serieId) => {
  try {
    const response = await tmdbApi.get(`/tv/${serieId}/credits`, {
      params: {
        language: "en-US",
      },
    });

    // Extract the id, name, and profile path of the actors
    const actors = response.data.cast.map((actor) => ({
      id: actor.id,
      name: actor.name,
      profilePath: actor.profile_path,
    }));

    return actors;
  } catch (error) {
    console.error("Failed to fetch series credits:", error);
    throw error;
  }
};

export const fetchFilteredSeries = async (filterParams) => {
  try {
    const defaultParams = {
      include_adult: false,
      include_video: false,
      language: "en-US",
      page: 1,
      sort_by: "popularity.desc",
    };

    const response = await tmdbApi.get("/discover/tv", {
      params: { ...defaultParams, ...filterParams },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch series:", error);
    throw error;
  }
};
export const fetchPerson = async (page) => {
  try {
    const response = await tmdbApi.get("/person/popular", {
      params: { page }, // Add the page parameter to the API request
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch popular actors:", error);
    throw error;
  }
};

export const fetchPersonDetails = async (personId) => {
  try {
    const response = await tmdbApi.get(`/person/${personId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    throw error;
  }
};

export const fetchPersonCombinedCredits = async (personId) => {
  try {
    const response = await tmdbApi.get(`/person/${personId}/combined_credits`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch person combined credits:", error);
    throw error;
  }
};


export const fetchEpisodesDetails = async (serieId, seasonId) => {
  try {
    const response = await tmdbApi.get(`/tv/${serieId}/season/${seasonId}`, {
      params: {
        append_to_response: "images"
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch episode details:", error);
    throw error;
  }
};


