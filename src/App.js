import './App.css'
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../src/components/Header.jsx'
import Movies from './components/Movies.jsx'
import Form from './components/Form.jsx'
import Pag from './components/Pag.jsx'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component'
import styled from 'styled-components'
import { toggleSearch, nextPage, prevPage, setMaxPage } from './actions.js'
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
	const fetchMovies = () => {
		switch (search) {
			case true:
				return fetchSearch()

			case false:
				return fetchTopRatedMovies()
		}
		dispatch(toggleSearch())
	}

	const fetchSearch = () => {
		const url =
			searchInput === ''
				? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=${page}`
				: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}&include_adult=false`
		axios
			.get(url)
			.then(function (res) {
				if (searchInput !== '') {
					setSearchResults(res.data) // here it saves the response into the state
					dispatch(setMaxPage(res.data.total_pages))
				} else {
					//in case the searchInput is empty it shows the top rated movies again
					setDefResults(res.data)
					setSearchResults(null)
				}

				// dispatch(toggleSearch()) // here it toggles the search boolean

				setLoading(false) // here it toggles the loading boolean
				window.scrollTo({ top: 0, behavior: 'smooth' })
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
			dispatch(setMaxPage(res.data.total_pages))
			setLoading(false)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		})
	}
	useEffect(() => {
		fetchMovies()
	}, [search, searchInput, dispatch])
	return (
		<div className="App">
			<Header />
			<div className="container">
				<Form />

				<FilterLabel>Filter movies by rating</FilterLabel>
				<StarRating>
					<StarRatingComponent name="starRating" value={starRating} onStarClick={onStarClick} />
				</StarRating>
				{searchResults && ( // If we have a search result it shows it. Otherwise it shows the top rated movies
					<div>
						<h3>Search results:</h3>
						<Movies results={searchResults} loading={loading} voteAverage={voteAverage}></Movies>
					</div>
				)}
				{!searchResults && (
					<div>
						<h3>Top rated movies:</h3>
						<Movies results={defResults} loading={loading} voteAverage={voteAverage}></Movies>
					</div>
				)}
				<Pag handlePag={handlePag}></Pag>
			</div>
		</div>
	)
}

export default App
