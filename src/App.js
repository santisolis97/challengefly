import './App.css'
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../src/components/Header.jsx'
import Movies from './components/Movies.jsx'
import Form from './components/Form.jsx'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component'
import styled from 'styled-components'
import { toggleSearch, nextPage, prevPage } from './actions.js'
import { useSelector, useDispatch } from 'react-redux'
// this requires the hidden API KEY

const API_KEY = process.env.REACT_APP_TMDB_API_KEY
const StarRating = styled.div`
	font-size: 26px;
`
const FilterLabel = styled.div`
	padding-top: 5px;
	font-size: 20px;
`

const App = () => {
	const [starRating, setStarRating] = useState(0)
	const [defResults, setDefResults] = useState(null)
	const [searchResults, setSearchResults] = useState(null)
	const [loading, setLoading] = useState(true)
	const [voteAverage, setVoteAverage] = useState(0)
	const searchInput = useSelector((state) => state.searchInput)
	const search = useSelector((state) => state.search)
	const page = useSelector((state) => state.page)
	const dispatch = useDispatch()

	// this function handles the star rating component
	const onStarClick = (nextValue, prevValue) => {
		if (nextValue === prevValue) {
			// this way it sets the rating to 0 if you click the same star twice.
			setStarRating(0)
			setVoteAverage(0)
			return
		}
		// otherwise it sets its according rating
		setVoteAverage(nextValue * 2)
		setStarRating(nextValue)
	}
	const handlePag = (type) => {
		if (type === 'prev' && page > 1) {
			dispatch(prevPage())
		} else if (
			(type === 'next' && searchResults === null && page < defResults.total_pages) ||
			(type === 'next' && searchResults !== null && page < searchResults.total_pages)
		) {
			dispatch(nextPage())
		}
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		const fetchMovies = () => {
			// This function fetches the movies from TMDb API.
			if (search) {
				// If it is a search it fetches the movies according to the search input
				fetchSearch()
			} else {
				// If it is not a search it fetches the 20 top rated movies
				fetchTopRatedMovies()
			}
		}

		const fetchSearch = () => {
			// This is the search fetching function
			const url =
				searchInput === ''
					? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=${page}`
					: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}&include_adult=false`
			axios
				.get(url)
				.then(function (res) {
					if (searchInput !== '') {
						setSearchResults(res.data) // here it saves the response into the state
						console.log(res.data)
					} else {
						//in case the searchInput is empty it shows the top rated movies again
						setDefResults(res.data)
						setSearchResults(null)
						console.log(res.data)
					}
					dispatch(toggleSearch()) // here it toggles the search boolean

					setLoading(false) // here it toggles the loading boolean
				})
				.catch(function (error) {
					//here it catches and shows the error(in case there is one)
					console.log(error)
				})
		}
		const fetchTopRatedMovies = () => {
			//This function fetches the top rated movies.
			const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=${page}`
			axios.get(url).then((res) => {
				setDefResults(res.data) // here it saves the api response into the state
				console.log(res.data)

				setLoading(false)
			})
		}

		fetchMovies()
	}, [search, searchInput, dispatch])
	return (
		<div className="App">
			<Header />
			<div className="container">
				<Form />
				<div className="filter">
					<FilterLabel>Filter movies by rating</FilterLabel>
					<StarRating>
						<StarRatingComponent name="starRating" value={starRating} onStarClick={onStarClick} />
					</StarRating>
				</div>
				{searchResults && ( // If we have a search result it shows it. Otherwise it shows the top rated movies
					<div className="">
						<h3>Search results:</h3>
						<Movies results={searchResults} loading={loading} voteAverage={voteAverage}></Movies>
					</div>
				)}
				{!searchResults && (
					<div className="">
						<h3>Top rated movies:</h3>
						<Movies results={defResults} loading={loading} voteAverage={voteAverage}></Movies>
					</div>
				)}
				<nav aria-label="Page navigation example">
					<ul className="pagination justify-content-center">
						<li className="page-item">
							<button className="page-link" onClick={() => handlePag('prev')}>
								Prev
							</button>
						</li>
						<li className="page-item disabled">
							<button className="page-link">{page}</button>
						</li>
						<li className="page-item">
							<button className="page-link" onClick={() => handlePag('next')}>
								Next
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default App
