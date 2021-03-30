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
		case 'LASTPAGE':
			return {
				...state,
				page: action.payload,
			}
		default:
			return state
	}
}
