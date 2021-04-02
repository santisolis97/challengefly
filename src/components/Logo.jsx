import React from 'react'
import logo from '../assets/powered.png'
import styled from 'styled-components'

const Wrapper = styled.div`
	padding-top: 20px;
`
function Logo() {
	return (
		<Wrapper className="d-flex justify-content-center ">
			<img src={logo} className="d-flex justify-content-center " alt="logo" />
		</Wrapper>
	)
}

export default Logo
