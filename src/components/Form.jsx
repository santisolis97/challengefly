import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSearchInput, resetPage } from '../actions.jsx'
// This component is the Form that allows you to search for movies in the TMDb.
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
		dispatch(resetPage())
	}
	return (
		<div>
			<div className="Form">
				<div className="d-flex justify-content-center ">
					<form className="form-inline" onSubmit={handleSearch}>
						<div className="row">
							<div className="col-12">
								<input
									className="form-control mr-sm-2"
									type="search"
									defaultValue={searchInput}
									onChange={handleSearchInputChange}
									placeholder="Search movies"
									aria-label="Search"
								/>
								<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
									Search
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Form
