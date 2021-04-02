import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo192.png'
const Anchor = styled.span`
	font-size: 20px;
	font-weight: 300;
	/* text-shadow: 1px 1px 1px grey; */
`
const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 7px;
`
const Span = styled.span`
	font-size: 18px;
	font-weight: 300;
`
const Icon = styled.i`
	font-size: 20px;
`
// const Nav = styled.nav`
// 	background-color: #d8d8d8;
// `
// const Container = styled.div`
// 	margin-bottom: 15px;
// `
// this is the Header component.
function Header() {
	return (
		<nav className="navbar navbar-dark bg-dark fixed-top navbar-expand">
			<Img src={logo} alt="logo" />
			<Anchor href="/" className="navbar-brand">
				Movie Theater
			</Anchor>
			<div id="navbar" className="navbar-collapse collapse">
				<ul className="nav navbar-nav ml-auto">
					<li>
						<div>
							<Span className="navbar-brand">Author: Santiago Solis</Span>
						</div>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/santiago-hernan-solis-b5a427183/"
							target="_blank"
							rel="noopener noreferrer"
							className="nav-link"
						>
							<Icon className="fab fa-linkedin"></Icon>
						</a>
					</li>
					<li>
						<a href="https://github.com/santisolis97/" target="_blank" rel="noopener noreferrer" className="nav-link">
							<Icon className="fab fa-github"></Icon>
						</a>
					</li>
					<li>
						<a href="mailto:santux09@gmail.com" target="_blank" rel="noopener noreferrer" className="nav-link">
							<Icon className="far fa-envelope"></Icon>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Header
