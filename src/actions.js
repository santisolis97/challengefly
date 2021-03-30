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
export const toggleSearch = () => ({
	//here it toggles the search boolean from on to of or viceversa
	type: 'TOGGLESEARCH',
})
export const nextPage = () => ({
	type: 'NEXTPAGE',
})
export const prevPage = () => ({
	type: 'PREVPAGE',
})
export const resetPage = () => ({
	type: 'RESETPAGE',
})
