import GoBackBtn from '../../components/GoBackBtn/GoBackBtn.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getReview } from '../../api/apitmdb.js';
import stylRev from './MovieReviews.module.css'

const MovieReviews = () => {
  const [review, setReview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { movieId } = useParams()
  
  


  useEffect(() => {
     const fetchDataReview = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getReview(movieId);
        setReview(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataReview();
  }, [movieId])
  console.log(review)

  const locationRev = useLocation()
  
  
  const goBackRev = useRef(locationRev?.state ?? `/movies/${movieId}`)
  return (
    <>
      <div className={stylRev.containerRev}>
        <GoBackBtn path={goBackRev.current}>
          Back to details
        </GoBackBtn >
        {isLoading && <Loader/>}
        {error && <p>Something went wrong...</p>}
      
      {review.length === 0 ? (
        <p>No reviews available for this movie.</p>
      ) : (
        <ul className={stylRev.ulRev}>
          {review.map((rev) => (
            <li key={rev.id}  className={stylRev.liRev}>
              <h3>Author: {rev.author}</h3>
              {rev.author_details.rating && (
                <p>Author`s rating: {rev.author_details.rating}</p>
              )}
              <p>{rev.content}</p>
            </li>
          ))}
        </ul>
      )}
    
  
   </div>
 </> );
}
export default MovieReviews;

