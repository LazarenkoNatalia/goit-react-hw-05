import { useEffect,  useState } from 'react'
import { getMovies } from '../../api/apitmdb.js'
import { useLocation } from 'react-router-dom'
import MovieList from '../../components/MovieList/MovieList.jsx'
import Loader from '../../components/Loader/Loader.jsx'

export default function  HomePage ()  {
	const [movies, setMovies] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	// const [params, setParams] = useSearchParams()

	const location = useLocation()

	useEffect(() => {
		const getData = async () => {
			try {
				setIsLoading(true)
				const data = await getMovies()
				setMovies(data)
				
			} catch (error) {
				setError(true)
			} finally {
				setIsLoading(false)
			}
		}
		getData()
	}, [])
	// console.log(movies)
	// console.log(location)
	return (
		<div>
			{isLoading && <Loader />}
            {error && <p>some error</p>}
			{movies.length > 0 &&	<MovieList movies={movies} state={{ from: location }} />}
			
		</div>
	)
}

