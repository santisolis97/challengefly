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
		case 'SETNEXTPAGE':
			return {
				...state,
				page: action.payload,
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
