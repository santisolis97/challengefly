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
import { setGenres, setMaxPage } from './actions.jsx'
import { useSelector, useDispatch } from 'react-redux'
import Logo from './components/Logo.jsx'
import GenreSelect from './components/GenreSelect'
// this requires the hidden API KEY
const API_KEY = process.env.REACT_APP_TMDB_API_KEY

//Styles
const StarRating = styled.div`
	font-size: 21px;
`
const FilterLabel = styled.p`
	padding-top: 5px;
	font-size: 18px;
	margin-bottom: 0;
	font-weight: lighter;
`
const P = styled.p`
	font-weight: lighter;
	font-size: 45px;
`

const Container = styled.div`
	margin-top: 100px;
`

const App = () => {
	const [starRating, setStarRating] = useState(0)
	const [results, setResults] = useState(null)
	const [loading, setLoading] = useState(true)
	const [voteAverage, setVoteAverage] = useState(0)
	const searchInput = useSelector((state) => state.searchInput)
	const page = useSelector((state) => state.page)
	const selectedGenre = useSelector((state) => state.selectedGenre)
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

	// this function handles the movie fetching either it is a search or the top rated movies
	const fetchMovies = () => {
		const url =
			searchInput === '' || searchInput === null
				? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=${page}`
				: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}&include_adult=false`
		axios
			.get(url)
			.then(function (res) {
				if (searchInput !== '') {
					// here it saves the search response into the state
					setResults(res.data)
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
	// this function fetches movie genres
	const fetchGenres = () => {
		const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
		axios
			.get(url)
			.then((res) => {
				const response = res.data.genres
				dispatch(setGenres(response))
			})
			.catch(function (error) {
				//here it catches and shows the error(in case there is one)
				console.log(error)
			})
	}
	useEffect(() => {
		fetchMovies()
		fetchGenres()
	}, [searchInput, page])

	return (
		<div className="App">
			<Header />
			<Container className="container">
				<Logo />
				<Form />
				{searchInput !== '' ? <P>Search results:</P> : <P>Top rated movies:</P>}
				<div className="row">
					<div className="col-6 d-flex justify-content-start">
						<FilterLabel className="text-left">Filter movies by rating</FilterLabel>
					</div>
				</div>
				<div className="row">
					<div className="col-6 d-flex justify-content-start">
						<StarRating>
							<StarRatingComponent name="starRating" value={starRating} onStarClick={onStarClick} />
						</StarRating>
					</div>
					<div className="col-6 d-flex justify-content-end">
						<GenreSelect />
					</div>
				</div>
				<Movies results={results} loading={loading} voteAverage={voteAverage} selectedGenre={selectedGenre}></Movies>
				<Pag />
			</Container>
		</div>
	)
}

export default App
