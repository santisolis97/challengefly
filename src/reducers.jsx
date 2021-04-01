const initialState = {
	searchInput: '',
	search: false,
	page: 1,
	genres: [],
	selectedGenre: null,
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
		case 'SETGENRES':
			return {
				...state,
				genres: action.payload,
			}
		case 'SETSELECTEDGENRE':
			return {
				...state,
				selectedGenre: action.payload,
			}
		default:
			return state
	}
}
