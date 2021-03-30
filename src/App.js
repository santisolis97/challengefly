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
import { nextPage, prevPage, setMaxPage, lastPage, resetPage } from './actions.jsx'
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
	const [results, setResults] = useState(null)
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
		if (type === 'first' && page > 1) {
			dispatch(resetPage())
		}
		if (type === 'prev' && page > 1) {
			dispatch(prevPage())
		}
		if (type === 'next' && page < results.total_pages) {
			dispatch(nextPage())
		}
		if (type === 'last' && page < results.total_pages) {
			dispatch(lastPage(results.total_pages))
		}
	}
	const fetchMovies = () => {
		const url =
			searchInput === '' || searchInput === null
				? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=${page}`
				: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}&include_adult=false`
		axios
			.get(url)
			.then(function (res) {
				if (searchInput !== '') {
					setResults(res.data) // here it saves the response into the state
				} else {
					//in case the searchInput is empty it shows the top rated movies again
					setResults(res.data)
				}
				dispatch(setMaxPage(res.data.total_pages))
				setLoading(false) // here it toggles the loading boolean
				window.scrollTo({ top: 0, behavior: 'smooth' })
			})
			.catch(function (error) {
				//here it catches and shows the error(in case there is one)
				console.log(error)
			})
	}
	useEffect(() => {
		fetchMovies()
	}, [search, searchInput, dispatch, page])
	return (
		<div className="App">
			<Header />
			<div className="container">
				<Form />

				<FilterLabel>Filter movies by rating</FilterLabel>
				<StarRating>
					<StarRatingComponent name="starRating" value={starRating} onStarClick={onStarClick} />
				</StarRating>
				<div>
					<h3>Top rated movies:</h3>
					<Movies results={results} loading={loading} voteAverage={voteAverage}></Movies>
				</div>
				<Pag handlePag={handlePag}></Pag>
			</div>
		</div>
	)
}

export default App
