import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from '../../api/apitmdb.js';
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { toast, Toaster }  from "react-hot-toast";
import { useLocation, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import stylMoviePage from './MoviesPage.module.css'

function MoviesPage() {
  const [query, setQuery] = useState("");
  const [findMovies, setFindMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadMoreBtn, setIsLoadMoreBtn]= useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const queryparams = params.get("search");

// console.log(location.state)

  useEffect(() => {
    if (!queryparams) {
      return;
    }
   
    const getMovies = async () => {
      setIsLoader(true);
      setError(false);

      try {
        const { results } = await searchMovies(queryparams, page);
        setFindMovies((prevMovies) =>
          page === 1 ? results : [...prevMovies, ...results]
        );
        setIsLoadMoreBtn(results.length > 0);
      } catch (error) {
        setError(true);
        toast.error("Error searching movies, try again");
      } finally {
        setIsLoader(false);
      }
    };
    getMovies();
  }, [queryparams, page]);

  const handleOnChange = (event) => {
    setQuery(event.target.value);
  };

const handleClicMoreBtn = () => {
   setPage(page + 1);
 
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    if (!query.trim()) {
      toast.error("Search query is required");
      return;
    }

    setParams({ search: query });
    setPage(1);

    // if (findMovies.length === 0) {
    //   toast.error("Not found anything");
    // }
  };

   useEffect(() => {
        if (page === 1) return;
  
window.scrollBy({
      top: 550,
      behavior: 'smooth',
      });
 }, [page]);

 
  
  // console.log(location)
  return (
    <>
      
        <form onSubmit={handleSubmit}>
          <div className={stylMoviePage.container}>
        <input
          className={stylMoviePage.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter name of the film to search"
          value={query}
          onChange={handleOnChange}
        />
        <button className={stylMoviePage.btn} type="submit">
          Search
        </button>
         </div>
      </form>
     
 <Toaster position="top-rigth" /> 
      {isLoader && <Loader />}
      {error && <p>Error loading movies</p>}

      <MovieList
        movies={findMovies}
        state={{ from: location, queryparams, page }} 
      />
      {isLoadMoreBtn && <LoadMoreBtn handleClickMore={handleClicMoreBtn} />} 
    </>
  );
}

export default MoviesPage;