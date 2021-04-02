import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedGenre } from '../actions.jsx'
import styled from 'styled-components'

const Select = styled.select`
	font-weight: lighter;
`

function GenreSelect() {
	const dispatch = useDispatch() //dispatch hoook for react-redux
	const genres = useSelector((state) => state.genres)
	const handleGenreChange = (event) => {
		if (event.target.value === 'all') {
			dispatch(setSelectedGenre(null))
		} else {
			dispatch(setSelectedGenre(parseInt(event.target.value)))
		}
	}
	return (
		<div className="Form">
			<div>
				<Select className="custom-select" onChange={handleGenreChange}>
					<option value="all">Filter by genre</option>
					<option value="all">All</option>
					{genres.map((item, index) => (
						<option value={item.id} key={index}>
							{item.name}
						</option>
					))}
				</Select>
			</div>
		</div>
	)
}

export default GenreSelect
