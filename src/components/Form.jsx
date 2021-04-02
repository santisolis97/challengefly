import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSearchInput, setNextPage } from '../actions.jsx'
import styled from 'styled-components'
// This component is the Form that allows you to search for movies in the TMDb.

const Wrapper = styled.div`
	padding-top: 35px;
`

function Form() {
	const dispatch = useDispatch() //dispatch hoook for react-redux
	const [searchInput, setSearchInput] = useState('') //state to handle the input value
	// this function updates the value of searchInput everytime a letter is typed
	const handleSearchInputChange = (event) => {
		setSearchInput(event.target.value)
	}
	// this function handles everytyme the search button is pressed
	const handleSearch = (event) => {
		event.preventDefault()
		dispatch(updateSearchInput(searchInput))
		dispatch(setNextPage(1))
	}

	return (
		<Wrapper>
			<form onSubmit={handleSearch}>
				<div className="form-group container">
					<input
						className="form-control"
						type="search"
						defaultValue={searchInput}
						onChange={handleSearchInputChange}
						placeholder="Search movies"
						aria-label="Search"
					></input>
				</div>
				<button type="submit" className="btn btn-outline-success">
					Search
				</button>
			</form>
		</Wrapper>
	)
}

export default Form
