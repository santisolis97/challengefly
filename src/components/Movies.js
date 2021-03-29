import React from 'react'
import Movie from './Movie'
function Movies(props) {
	// console.log("Entre: " + (props.voteAverage - 2) + " y: " + props.voteAverage);
	console.log(props)
	return (
		<div>
			{props.loading && (
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
									(movie.vote_average <= props.voteAverage && movie.vote_average > props.voteAverage - 2) ||
									props.voteAverage === 0
							)
							.map((item, index) => (
								<div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
									<Movie result={item} />
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Movies
