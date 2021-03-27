import React, { useEffect, useState } from "react";
import Movie from "./Movie";
function Movies(props) {
  return (
    <div>
      {props.loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      )}
      {!props.loading && (
        <div>
          <div className="row">
            {props.results.results
              .filter((movie) => movie.vote_average > props.voteAverage)
              .map((item, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
                  <Movie result={item} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
