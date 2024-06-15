import { Link } from "react-router-dom"
import stylList from './MovieList.module.css'
export default function MovieList({ movies, state  }) {
  // console.log(movies)
  //  console.log(state)
  return (
 movies?.map((movie) => (
                <div key={movie.id} className={stylList.container}>
     <Link to={`/movies/${movie.id}`} state={{ ...state, movie }}>
                       {movie.title}
                    </Link>
                    </div>
 ))
         )}
               
            
  


