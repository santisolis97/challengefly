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
export const nextPage = () => ({
	type: 'NEXTPAGE',
})
export const prevPage = () => ({
	type: 'PREVPAGE',
})
export const lastPage = (payload) => ({
	type: 'LASTPAGE',
	payload: payload,
})
export const resetPage = () => ({
	type: 'RESETPAGE',
})
