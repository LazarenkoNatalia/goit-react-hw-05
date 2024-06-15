import GoBackBtn from '../../components/GoBackBtn/GoBackBtn.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCast } from '../../api/apitmdb.js';
import stylCast from './MovieCast.module.css'

const MovieCast = () => {
  const [cast, setCast] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { movieId } = useParams()
  const location = useLocation()
  //  console.log(location?.state)
  const goBackCast = useRef(location.state?.from ?? `/movies/${movieId}`)


  const defaultCast = {
    castImg: 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg',
    castActor: 'Actor'
  }

  useEffect(() => {
     const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCast(movieId);
        setCast(data);
       
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId])
    // console.log(goBackCast.current)

  return (
   <div className={stylCast.containerCast}>
        <GoBackBtn path={goBackCast.current}>
          Back to details
        </GoBackBtn >
        {isLoading && <Loader/>}
        {error && <p>Something went wrong...</p>}
      
     
   
      <h2 className={stylCast.titleCast}>Movie Cast</h2>
     
    {cast.length === 0 ? (
        <p>No cast information available</p>
      ) : (
        <ul className={stylCast.listCast}>
          {cast.map((actor) => (
            <li key={actor.id} className={stylCast.itemCast}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : defaultCast.castImg 
                }
                alt={actor.name}
                className={stylCast.imgCast}
              />
              <div className={stylCast.infoCast}>
                <h3 className={stylCast.infoCast}>{actor.name}</h3>
                <p className={stylCast.infoCast}>Character: {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default MovieCast;

