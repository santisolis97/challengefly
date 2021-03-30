import React from 'react'
import { toggleSearch, nextPage, prevPage } from './actions.js'

function Pag() {
	const handlePag = (type) => {
		if (type === 'prev' && page > 1) {
			dispatch(prevPage())
		} else if (
			(type === 'next' && searchResults === null && page < defResults.total_pages) ||
			(type === 'next' && searchResults !== null && page < searchResults.total_pages)
		) {
			dispatch(nextPage())
		}
	}
	return (
		<div>
			<nav aria-label="Page navigation example">
					<ul className="pagination justify-content-center">
						<li className="page-item">
							<button className="page-link" onClick={() => handlePag('prev')}>
								Prev
							</button>
						</li>
						<li className="page-item disabled">
							<button className="page-link">{page}</button>
						</li>
						<li className="page-item">
							<button className="page-link" onClick={() => handlePag('next')}>
								Next
							</button>
						</li>
					</ul>
				</nav>
		</div>
	)
}

export default Pag
