import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSearchInput, toggleSearch } from '../actions.js'
function Form() {
	const searchInput = useSelector((state) => state.searchInput)
	const dispatch = useDispatch()
	const handleSearchInputChange = (event) => {
		dispatch(updateSearchInput(event.target.value))
	}

	const handleSearch = (event) => {
		event.preventDefault()
		dispatch(toggleSearch())
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
// const mapDispatchToProps = {
// 	updateSearchInput,
// 	toggleSearch,
// }
// function mapStateToProps(state) {
// 	return {
// 		searchInput: state.searchInput,
// 		search: state.search,
// 	}
// }

export default Form
