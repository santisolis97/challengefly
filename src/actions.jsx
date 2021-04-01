// This file define actions for redux
export const updateSearchInput = (payload) => ({
	//here it takes a payload and updates the inputSearch
	type: 'UPDATESEARCHINPUT',
	payload: payload,
})
export const setMaxPage = (payload) => ({
	type: 'SETMAXPAGE',
	payload: payload,
})
export const setNextPage = (payload) => ({
	type: 'SETNEXTPAGE',
	payload: payload,
})
export const setGenres = (payload) => ({
	type: 'SETGENRES',
	payload: payload,
})
export const setSelectedGenre = (payload) => ({
	type: 'SETSELECTEDGENRE',
	payload: payload,
})
