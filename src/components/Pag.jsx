import React from 'react'
import { useSelector } from 'react-redux'
// import styled from 'styled-components'

function Pag(props) {
	const page = useSelector((state) => state.page)
	const maxPage = useSelector((state) => state.maxPage)
	return (
		<div>
			<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					<li className={page === 1 ? 'page-item disabled' : 'page-item'}>
						<button className="page-link" onClick={() => props.handlePag(1)}>
							&laquo;
						</button>
					</li>
					<li className={page === 1 ? 'page-item disabled' : 'page-item'}>
						<button className="page-link" onClick={() => props.handlePag(page - 1)}>
							&lt;
						</button>
					</li>
					{page - 5 > 0 && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page - 5)}>
								<span className="">{page - 5}</span>
							</button>
						</li>
					)}
					{page - 4 > 0 && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page - 4)}>
								<span className="">{page - 4}</span>
							</button>
						</li>
					)}
					{page - 3 > 0 && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page - 3)}>
								<span className="">{page - 3}</span>
							</button>
						</li>
					)}
					{page - 2 > 0 && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page - 2)}>
								<span className="">{page - 2}</span>
							</button>
						</li>
					)}
					{page - 1 > 0 && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page - 1)}>
								<span className="">{page - 1}</span>
							</button>
						</li>
					)}
					<li className="page-item active" aria-current="page">
						<button className="page-link">
							<span className="">{page}</span>
						</button>
					</li>
					{page + 1 < maxPage && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page + 1)}>
								<span className="">{page + 1}</span>
							</button>
						</li>
					)}
					{page + 2 < maxPage && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page + 2)}>
								<span className="">{page + 2}</span>
							</button>
						</li>
					)}
					{page + 3 < maxPage && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page + 3)}>
								<span className="">{page + 3}</span>
							</button>
						</li>
					)}
					{page + 4 < maxPage && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page + 4)}>
								<span className="">{page + 4}</span>
							</button>
						</li>
					)}
					{page + 5 < maxPage && (
						<li className="page-item">
							<button className="page-link" onClick={() => props.handlePag(page + 5)}>
								<span className="">{page + 5}</span>
							</button>
						</li>
					)}

					<li className={page === maxPage ? 'page-item disabled' : 'page-item'}>
						<button className="page-link" onClick={() => props.handlePag(page + 1)}>
							&gt;
						</button>
					</li>
					<li className={page === maxPage ? 'page-item disabled' : 'page-item'}>
						<button className="page-link" onClick={() => props.handlePag(maxPage)}>
							&raquo;
						</button>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Pag
