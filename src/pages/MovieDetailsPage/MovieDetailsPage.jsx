import GoBackBtn from '../../components/GoBackBtn/GoBackBtn.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import { useEffect, useState, useRef } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../api/apitmdb.js';
import stylMovDet from './MovieDetailsPage.module.css'

const MovieDetailsPage = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { movieId } = useParams()
  const location = useLocation()

  const goBack = useRef(location.state?.from ?? '/')
//  console.log(goBack)

  const defaultmovie = {
    movieImg: 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg',
    movieTitle: 'Title'
  }

  useEffect(() => {
     const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(movieId);
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId])
  // console.log(movies)
  // console.log(typeof(movies.genres) )
  return (
   <>
        <GoBackBtn path={goBack.current} >
          Back to previous page
        </GoBackBtn >
        {isLoading && <Loader/>}
        {error && <p>Something went wrong...</p>}
      <div className={stylMovDet.movieDetails}>
      <img src={
        movies.poster_path ?
          `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
        : defaultmovie.movieImg
} className={stylMovDet.movieImg}
width={250}
alt={movies.title|| defaultmovie.title}
      />
      <div className={stylMovDet.detailsMov}>
      <h2 className={stylMovDet.movieTitle}>{movies.title}</h2>
      <h3 className={stylMovDet.sectionTitle}>Overview</h3>
      <p className={stylMovDet.movieOverview}>{movies.overview}</p>
      
          <h3>Genres</h3> 
          <ul className={stylMovDet.ulDet}>
            {movies?.genres?.map((genres) => (
              <li key={genres.id} className={stylMovDet.liDet}> <p className={stylMovDet.lipDet}>{genres.name}</p></li>
            ))}  
            </ul>
      </div>
      </div>
      <h3 className={stylMovDet.sectionTitle}>Additional Infomation</h3>
       <nav className={stylMovDet.navBar}> 
          <NavLink className={stylMovDet.link} to="cast"> Cast</NavLink>
          <NavLink className={stylMovDet.link} to="reviews">Reviews</NavLink>
      </nav>
      <Outlet/>
      </>
  )
}
export default MovieDetailsPage;

