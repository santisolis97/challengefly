const initialState = {
	searchInput: '',
	search: false,
	page: 1,
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'UPDATESEARCHINPUT':
			return {
				searchInput: action.payload,
				search: state.search,
				page: state.page,
			}
		case 'TOGGLESEARCH':
			return {
				searchInput: state.searchInput,
				search: !state.search,
				page: state.page,
			}
		case 'NEXTPAGE':
			return {
				searchInput: state.searchInput,
				search: !state.search,
				page: state.page + 1,
			}
		case 'PREVPAGE':
			return {
				searchInput: state.searchInput,
				search: !state.search,
				page: state.page - 1,
			}
		default:
			return state
	}
}
