import React from 'react'
import { useSelector } from 'react-redux'

function Pag(props) {
	const page = useSelector((state) => state.page)

	return (
		<div>
			<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					<li className="page-item">
						<button className="page-link" onClick={() => props.handlePag('prev')}>
							Prev
						</button>
					</li>
					<li className="page-item disabled">
						<button className="page-link">{page}</button>
					</li>
					<li className="page-item">
						<button className="page-link" onClick={() => props.handlePag('next')}>
							Next
						</button>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Pag
