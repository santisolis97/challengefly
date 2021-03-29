import './App.css'
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../src/components/Header.jsx'
import Movies from './components/Movies.jsx'
import Form from './components/Form.jsx'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component'
import styled from 'styled-components'
import { toggleSearch } from './actions'
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

function App() {
	const [starRating, setStarRating] = useState(0)
	const [defResults, setDefResults] = useState(null)
	const [searchResults, setSearchResults] = useState(null)
	const [loading, setLoading] = useState(true)
	const [voteAverage, setVoteAverage] = useState(0)
	const searchInput = useSelector((state) => state.searchInput)
	const search = useSelector((state) => state.search)
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

	useEffect(() => {
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
					? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1`
					: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=1&include_adult=false`
			axios
				.get(url)
				.then(function (res) {
					if (searchInput !== '') {
						setSearchResults(res.data) // here it saves the response into the state
					} else {
						//in case the searchInput is empty it shows the top rated movies again
						setDefResults(res.data)
						setSearchResults(null)
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
			const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1`
			axios.get(url).then((res) => {
				setDefResults(res.data) // here it saves the api response into the state

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
			</div>
		</div>
	)
}

export default App
