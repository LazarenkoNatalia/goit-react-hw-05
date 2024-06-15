import axios from "axios";
const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzM2MGQyYThlMzdiMWFjMDNkZThhY2FmM2FlMjA0YyIsInN1YiI6IjY2NjQ1NjM1ZjcxM2ZlODE1YzZkZGZhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P2UylFvV-QPamRqHUoX2bAmnXn_G2RdTK2VLTcMJRPQ'
 
const BASE_URL = "https://api.themoviedb.org/3";

const options = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token,
  },
});

export const getMovies = async () => {
  const response = await options.get("/trending/movie/day");
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await options.get(`/movie/${movieId}`);
  return response.data;
};

export const getCast = async (movieId) => {
  const response = await options.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const getReview = async (movieId) => {
  const response = await options.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export const searchMovies = async (query, page ) => {
    const response = await options.get("/search/movie", {
        params: {
            query,
            page,
            language: "en-US",
            include_adult: true,
        },
    });

    return response.data;
};