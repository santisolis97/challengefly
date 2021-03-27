import React from "react";
import ComplexPopover from "./ComplexPopover";
import styled from "styled-components";

const Card = styled.div`
  margin-bottom: 20px;
  border: 2px solid #d8d8d8;
  min-height: 550px;
`;
const Titled = styled.p`
  font-weight: bold;
  font-size: 18px;
`;
function Movie(props) {
  return (
    <div>
      <Card className="card">
        <img
          src={
            props.result.poster_path !== null
              ? `https://www.themoviedb.org/t/p/w220_and_h330_face${props.result.poster_path}`
              : "https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <Titled className="card-text">{props.result.title}</Titled>
          <ComplexPopover movie={props}></ComplexPopover>
        </div>
      </Card>
    </div>
  );
}

export default Movie;
