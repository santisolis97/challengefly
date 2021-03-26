import React from "react";

function Movie(props) {
  return (
    <div>
      <div className="card" styles="width: 18rem;">
        <img
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${props.result.poster_path}`}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <p className="card-text">{props.result.title}</p>
        </div>
      </div>
    </div>
  );
}

export default Movie;
