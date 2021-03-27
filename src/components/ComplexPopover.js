import React, { useState } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

function ComplexPopover(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };
  console.log(props);

  return (
    <div>
      <Button id={"Popover-" + props.movie.result.id} type="button">
        See more info.
      </Button>

      <div>
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target={"Popover-" + props.movie.result.id}
          toggle={togglePopover}
        >
          <PopoverHeader>
            <b>{props.movie.result.title}</b>
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
  );
}

export default ComplexPopover;
