// import { Link } from "react-router-dom"

export default function MovieDetails({title,poster }) {
 
  return (
  <div>
       <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt={title} />
        <p>{title} </p>           
                    </div>
               
            )}
  
