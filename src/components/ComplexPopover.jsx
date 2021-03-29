import React, { useState } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import styled from 'styled-components'
const BoldTitle = styled.b`
	font-size: 22px;
`

//This component is the popover that opens when you click "See more info" button located in each movie card
function ComplexPopover(props) {
	const [popoverOpen, setPopoverOpen] = useState(false)
	const togglePopover = () => {
		// this functions toggles the popover from open to close and vice versa
		setPopoverOpen(!popoverOpen)
	}

	return (
		<div>
			<Button outline color={popoverOpen ? 'danger' : 'info'} id={'Popover-' + props.movie.result.id} type="button">
				{popoverOpen ? 'Close' : 'See more info'}
			</Button>

			<div>
				<Popover
					placement="bottom"
					isOpen={popoverOpen}
					target={'Popover-' + props.movie.result.id}
					toggle={togglePopover}
				>
					<PopoverHeader>
						<BoldTitle>{props.movie.result.title}</BoldTitle>
					</PopoverHeader>
					<PopoverBody>
						<b>Release date:</b>
						<p>{props.movie.result.release_date}</p>
						<b>Overview:</b>
						<p>{props.movie.result.overview}</p>
					</PopoverBody>
				</Popover>
			</div>
		</div>
	)
}

export default ComplexPopover
