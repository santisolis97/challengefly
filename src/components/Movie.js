import React from "react";
import ComplexPopover from "./ComplexPopover";
import styled from "styled-components";

const Card = styled.div`
  margin-bottom: 20px;
  border: 2px solid #d8d8d8;
  min-height: 550px !important;
  border-radius: 25px;
`;
const CardBody = styled.div``;
const Titled = styled.p`
  min-height: 55px;
  font-weight: bold;
  font-size: 18px;
`;
const Img = styled.img`
  border-top-left-radius: 23px;
  border-top-right-radius: 23px;
`;
function Movie(props) {
  // console.log(props.result.vote_average);
  return (
    <div>
      <Card className="card">
        <Img
          src={
            props.result.poster_path !== null
              ? `https://www.themoviedb.org/t/p/w220_and_h330_face${props.result.poster_path}`
              : "https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
          }
          className="card-img-top"
          alt="..."
        />
        <CardBody className="card-body">
          <Titled className="card-text">{props.result.title}</Titled>
          <ComplexPopover movie={props}></ComplexPopover>
        </CardBody>
      </Card>
    </div>
  );
}

export default Movie;
