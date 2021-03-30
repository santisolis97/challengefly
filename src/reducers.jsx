const initialState = {
	searchInput: '',
	search: false,
	page: 1,
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'UPDATESEARCHINPUT':
			return {
				...state,
				searchInput: action.payload,
			}
		case 'TOGGLESEARCH':
			return {
				...state,
				search: !state.search,
			}
		case 'NEXTPAGE':
			return {
				...state,
				page: state.page + 1,
			}
		case 'PREVPAGE':
			return {
				...state,
				page: state.page - 1,
			}
		case 'RESETPAGE':
			return {
				...state,
				page: 1,
			}
		case 'SETMAXPAGE':
			return {
				...state,
				maxPage: action.payload,
			}
		default:
			return state
	}
}
