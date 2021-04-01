import React from 'react'
import Movie from './Movie'

// This component shows in a card every movie that is fetched.
function Movies(props) {
	return (
		<div>
			{props.loading && ( // here it checks if the content is loading or not, if loading it shows a spinner, otherwise it shows the movies
				<div className="text-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden"></span>
					</div>
				</div>
			)}
			{!props.loading && (
				<div>
					<div className="row">
						{props.results.results
							.filter(
								(movie) =>
									((movie.vote_average <= props.voteAverage && movie.vote_average > props.voteAverage - 2) ||
										props.voteAverage === 0) &&
									(movie.genre_ids.includes(props.selectedGenre) || props.selectedGenre === null)
							)
							// .filter(
							// 	//here it filters the movie by its rating.
							// 	(movie) =>
							// 		((movie.vote_average <= props.voteAverage && movie.vote_average > props.voteAverage - 2) ||
							// 		props.voteAverage === 0)
							// )
							.map((
								movie,
								index //here it maps every movie from the results, once it is filtered, to an instance of the Movie component
							) => (
								<div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
									{movie.genre_ids}
									<Movie result={movie} />
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Movies
