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
				maxPage: state.maxPage,
			}
		case 'TOGGLESEARCH':
			return {
				searchInput: state.searchInput,
				search: !state.search,
				page: state.page,
				maxPage: state.maxPage,
			}
		case 'NEXTPAGE':
			return {
				searchInput: state.searchInput,
				search: !state.search,
				page: state.page + 1,
				maxPage: state.maxPage,
			}
		case 'PREVPAGE':
			return {
				searchInput: state.searchInput,
				search: !state.search,
				page: state.page - 1,
				maxPage: state.maxPage,
			}
		case 'RESETPAGE':
			return {
				searchInput: state.searchInput,
				search: state.search,
				page: 1,
				maxPage: state.maxPage,
			}
		case 'SETMAXPAGE':
			return {
				searchInput: state.searchInput,
				search: state.search,
				page: state.page,
				maxPage: action.payload,
			}
		default:
			return state
	}
}
