import React from "react";
import ComplexPopover from "./ComplexPopover";
import styled from "styled-components";

function Movie(props) {
  const Card = styled.div`
    margin-bottom: 20px;
  `;
  return (
    <div>
      <Card className="card">
        <img
          src={
            props.result.poster_path !== null
              ? `https://www.themoviedb.org/t/p/w220_and_h330_face${props.result.poster_path}`
              : "https://www.meme-arsenal.com/memes/73d32145bdc3c3defde8166c38bb50f3.jpg"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <p className="card-text">{props.result.title}</p>
          <ComplexPopover movie={props}></ComplexPopover>
        </div>
      </Card>
    </div>
  );
}

export default Movie;
